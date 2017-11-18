using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;

namespace JXXZ.ZHCG.DAL.ServiceManagementDAL
{
    public class QW_UserLastPositionsDAL
    {
        /// <summary>
        /// 用户最后位置
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int QW_UserLastPositions(QW_UserLastPositionsModel model)
        {
            using (Entities db = new Entities())
            {
                qw_userlastpositions qwmodel = db.qw_userlastpositions.FirstOrDefault(a => a.userid == model.userid);
                if (qwmodel != null)
                {

                    qwmodel.x84 = model.x84;
                    qwmodel.y84 = model.y84;

                    qwmodel.x2000 = model.x2000;
                    qwmodel.y2000 = model.y2000;
                    qwmodel.positiontime = DateTime.Now;
                    qwmodel.imeicode = model.imeicode;
                    qwmodel.addresses = model.address;
                }
                else
                {
                    qw_userlastpositions qu = new qw_userlastpositions();
                    qu.userid = model.userid;
                    qu.x84 = model.x84;
                    qu.y84 = model.y84;
                    qu.x2000 = model.x2000;
                    qu.y2000 = model.y2000;
                    qu.positiontime = DateTime.Now;
                    qu.imeicode = model.imeicode;
                    qu.addresses = model.address;
                    db.qw_userlastpositions.Add(qu);
                }
                return db.SaveChanges();
            }
        }

        public int AddHelp(int userid, string remarks) {
            using (Entities db=new Entities())
            {
                  qw_userlastpositions qwmodel = db.qw_userlastpositions.FirstOrDefault(a => a.userid == userid);
                  if (qwmodel != null)
                  {
                      qwmodel.ishelp = 1;
                      qwmodel.helptime = DateTime.Now;
                      qwmodel.remarks1 = remarks;
                  }
                return db.SaveChanges();
            }
        }

        public int EditHelp(int userid) {
            using (Entities db = new Entities())
            {
                qw_userlastpositions qwmodel = db.qw_userlastpositions.FirstOrDefault(a => a.userid == userid);
                if (qwmodel != null)
                {
                    qwmodel.ishelp = 0;
                }
                return db.SaveChanges();
            }
        
        }

    }
}
