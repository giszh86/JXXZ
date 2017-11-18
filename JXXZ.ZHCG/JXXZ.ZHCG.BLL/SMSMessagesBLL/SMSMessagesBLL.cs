using JXXZ.ZHCG.DAL.SMSMessagesDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.SMSMessagesBLL
{
   public class SMSMessagesBLL
    {
       private SMSMessagesDAL dal=new SMSMessagesDAL();
       public void SendMessage(string[] phones, string megContent)
       {
           dal.SendMessage(phones, megContent);
       }
    }
}
