using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
using OpenMas;

namespace JXXZ.ZHCG.Utility
{
   public class SMS_Messages
    {

       public void SendMessage(string[] phones , string megContent)
       {
           string OpenMasUrl = System.Configuration.ConfigurationManager.AppSettings["OpenMasUrl"];                   //OpenMas二次开发接口
           string ExtendCode = System.Configuration.ConfigurationManager.AppSettings["ExtendCode"];                   //扩展号
           string ApplicationID = System.Configuration.ConfigurationManager.AppSettings["ApplicationID"];             //应用账号
           string Password = System.Configuration.ConfigurationManager.AppSettings["Password"];                       //应用密码

           //创建OpenMas二次开发接口的代理类
           Sms client = new Sms(OpenMasUrl);
           string messageId = client.SendMessage(phones, megContent, ExtendCode, ApplicationID, Password);
       }
    }
}
