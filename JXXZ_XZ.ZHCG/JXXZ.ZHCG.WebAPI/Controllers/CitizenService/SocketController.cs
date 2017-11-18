using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.WebSockets;
using JXXZ.ZHCG.Model.SoketEntity;
using JXXZ.ZHCG.BLL.CitizenServiceBLL;
using JXXZ.ZHCG.Model.echarts;
using Newtonsoft.Json;

namespace JXXZ.ZHCG.WebAPI.Controllers.CitizenService
{
    public class SocketController : ApiController
    {
        //用户连接池
        private static Dictionary<string, WebSocket> CONNECT_POOL = new Dictionary<string, WebSocket>();
        //离线消息池
        private static Dictionary<string, List<MessageInfo>> MESSAGE_POOL = new Dictionary<string, List<MessageInfo>>();

        public HttpResponseMessage Get()
        {
            if (HttpContext.Current.IsWebSocketRequest)
            {
                HttpContext.Current.AcceptWebSocketRequest(ProcessWSChat);
            }
            return new HttpResponseMessage(HttpStatusCode.SwitchingProtocols);
        }

        private async Task ProcessWSChat(AspNetWebSocketContext context)
        {
            WebSocket socket = context.WebSocket;
            string user = context.QueryString["user"].ToString().Trim();
            try
            {
                #region 用户添加连接池
                //不存在添加
                if (!CONNECT_POOL.ContainsKey(user))
                    CONNECT_POOL.Add(user, socket);
                else
                    //当前对象不一致,更新
                    if (socket != CONNECT_POOL[user])
                        CONNECT_POOL[user] = socket;
                #endregion

                #region 离线消息处理
                if (MESSAGE_POOL.ContainsKey(user))
                {
                    List<MessageInfo> msgs = MESSAGE_POOL[user];
                    foreach (MessageInfo item in msgs)
                    {
                        await socket.SendAsync(item.MsgContent, WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                    //移除离线消息
                    MESSAGE_POOL.Remove(user);
                }
                #endregion

                while (true)
                {
                    if (socket.State == WebSocketState.Open)
                    {
                        ArraySegment<byte> buffer = new ArraySegment<byte>(new byte[2048]);
                        WebSocketReceiveResult result = await socket.ReceiveAsync(buffer, CancellationToken.None);
                        #region 消息处理（字符截取、消息转发）
                        try
                        {
                            #region 关闭Socket处理，删除连接池
                            //连接关闭
                            if (socket.State != WebSocketState.Open)
                            {
                                //删除连接池
                                if (CONNECT_POOL.ContainsKey(user)) CONNECT_POOL.Remove(user);
                                break;
                            }
                            #endregion

                            string userMsg = Encoding.UTF8.GetString(buffer.Array, 0, result.Count);//发送过来的消息
                            var array = userMsg.Split(',');
                            string type = array[0];
                            string thisusers = array[1];
                            //目的用户
                            string descUser = thisusers.Trim();
                            string thisdata = "";
                            string alldata = "";
                            //死循环保证服务器一直刷新发送数据到客户端
                            for (int i = 1; i < 2; --i)
                            {
                                switch (type)
                                {
                                    case "sj":
                                        SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
                                        List<spiderMap> list = bll.getEventData();
                                        string radardata = JsonConvert.SerializeObject(list).ToString();
                                        List<string> listlegend = bll.GetEventLinelegend();
                                        string linelegend = JsonConvert.SerializeObject(listlegend).ToString();
                                        List<int> eventReporred = bll.GetEventLineReportedData();
                                        string eventReporredLine = JsonConvert.SerializeObject(eventReporred).ToString();
                                        List<int> eventInProcess = bll.GetEventLineInProcess();
                                        string eventInProcessLine = JsonConvert.SerializeObject(eventInProcess).ToString();
                                        List<int> eventFinished = bll.GetEventLineFinished();
                                        string eventFinishedLine = JsonConvert.SerializeObject(eventFinished).ToString();
                                        List<JXXZ.ZHCG.Model.CitizenServiceModel.EventModel> eventlist = bll.GetAllByNowDay();
                                        string eventlists = JsonConvert.SerializeObject(eventlist).ToString();
                                        alldata = radardata + "|" + linelegend + "|" + eventReporredLine + "|" + eventInProcessLine + "|" + eventFinishedLine + "|" + eventlists;
                                        buffer = new ArraySegment<byte>(Encoding.UTF8.GetBytes(alldata));
                                        break;
                                }

                                //string[] msgList = userMsg.Split('|');
                                //if (msgList.Length == 2)
                                //{
                                //    if (msgList[0].Trim().Length > 0)
                                //        descUser = msgList[0].Trim();//记录消息目的用户
                                //    buffer = new ArraySegment<byte>(Encoding.UTF8.GetBytes(msgList[1]));
                                //}
                                //else
                                //    buffer = new ArraySegment<byte>(Encoding.UTF8.GetBytes(userMsg));
                                //判断客户端是否在线
                                if (CONNECT_POOL.ContainsKey(descUser) && thisdata != alldata)
                                {
                                    thisdata = alldata;
                                    WebSocket destSocket = CONNECT_POOL[descUser];//目的客户端
                                    if (destSocket != null && destSocket.State == WebSocketState.Open)
                                        await destSocket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);

                                }
                                //else
                                //{
                                //    //Task.Run(() =>
                                //    //{
                                //    //    if (!MESSAGE_POOL.ContainsKey(descUser))//将用户添加至离线消息池中
                                //    //        MESSAGE_POOL.Add(descUser, new List<MessageInfo>());
                                //    //    MESSAGE_POOL[descUser].Add(new MessageInfo(DateTime.Now, buffer));//添加离线消息
                                //    //});
                                    
                                //}
                            }
                        }
                        catch (Exception ex)
                        {
                            //消息转发异常处理，本次消息忽略 继续监听接下来的消息
                            Console.Write(ex.Message);
                        }
                        #endregion
                    }
                }
            }
            catch (Exception ex)
            {
                //整体异常处理
                if (CONNECT_POOL.ContainsKey(user)) CONNECT_POOL.Remove(user);
            }

        }
    }
}
