using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.SMSMessagesDAL
{
    public class SMSMessagesDAL
    {


        public void SendMessage(string[] phones, string megContent)
        {
            try
            {
                using (OpenMasEntities sqldb = new OpenMasEntities())
                {

                    string OpenMasUrl = "http://jx017.openmas.net:9080/OpenMasService";                   //OpenMas二次开发接口
                    int ExtendCode = 2;                   //扩展号

                    foreach (string item in phones)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            Guid MessageID = Guid.NewGuid();
                            DateTime time = DateTime.Now;
                            string sql = string.Format(@"insert into COM_SmsSent_2(MessageID,MessageContent,ExtendCode,DestinationAddress,SendType,SendTime,IsWapPush,WapUrl,CreateTime) 
values ('{0}','{1}','{2}','{3}',0,'{4}',0,'{5}','{6}')", MessageID, megContent, ExtendCode, item, time, OpenMasUrl, time);
                            sqldb.Database.ExecuteSqlCommand(sql);
                        }

                    }
                }

            }
            catch (Exception e)
            {
                //处理短信发送异常
            }

        }
    }
}
