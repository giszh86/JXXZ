using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.administrativeapprovalModel;
using JXXZ.ZHCG.Model.lawenforcementsupervisionModel;
using JXXZ.ZHCG.Model.PeripheryModel;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.PeripheryDAL
{
    public class PeripheryDAL
    {

        /// <summary>
        /// 获取周边人员
        /// </summary>
        /// <param name="x84"></param>
        /// <param name="y84"></param>
        /// <param name="radius"></param>
        /// <returns></returns>
        public List<PeripheryModel> GetPeripheryUser(double x84, double y84, double radius, int userid)
        {
            List<PeripheryModel> list = new List<PeripheryModel>();
            DateTime time = DateTime.Now.AddMinutes(-15);
            using (Entities db = new Entities())
            {
                //string sql = string.Format(@"select * from qw_userlastpositions where (6371.004*ACOS(SIN({0}/180*PI())*SIN(Y84/180*PI())+COS({1}/180*PI())*COS(Y84/180*PI())*COS(({2}-X84)/180*PI())))<{3} and userid<>{4} and userid<>0", y84, y84, x84, radius, userid);
                //IEnumerable<QW_UserLastPositionsModel> query = db.Database.SqlQuery<QW_UserLastPositionsModel>(sql);
                //if (query.Count() > 0)
                //{
                //    IEnumerable<PeripheryModel> queryable = from a in query
                //                                            join b_join in db.base_users on a.userid equals b_join.id into btmp
                //                                            from b in btmp.DefaultIfEmpty()
                //                                            join c_join in db.base_units on b.unitid equals c_join.id into ctmp
                //                                            from c in ctmp.DefaultIfEmpty()
                //                                            where c.unittypeid == 2 || c.unittypeid == 4
                //                                            select new PeripheryModel
                //                                            {
                //                                                userid = a.userid,
                //                                                x84 = a.x84,
                //                                                x2000 = a.x2000,
                //                                                y84 = a.y84,
                //                                                y2000 = a.y2000,
                //                                                phone = b.mobile,
                //                                                username = (b == null ? "" : b.displayname),
                //                                                unitid = b.unitid,
                //                                                unitname = (c == null ? "" : c.name)
                //                                            };
                //    list = queryable.ToList();
                //}
                string sql = string.Format(@"select tab.userid,tab.x84,tab.x2000,tab.y84,tab.y2000,tab.positiontime,tab.ishelp,tab.helptime,tab.remarks1,bu.mobile as phone, bu.displayname as username,but.name as unitname ,bu.shortnumber from
(select * from qw_userlastpositions 
where (6371.004*ACOS(SIN({0}/180*PI())*SIN(Y84/180*PI())+COS({1}/180*PI())*COS(Y84/180*PI())*COS(({2}-X84)/180*PI())))<{3} and userid<>{4} and userid<>0
) tab
LEFT JOIN base_users bu on tab.userid=bu.id
left join base_units but on bu.unitid=but.id
where (but.unittypeid=2 or but.unittypeid=4)", y84, y84, x84, radius, userid);
                IEnumerable<PeripheryModel> query = db.Database.SqlQuery<PeripheryModel>(sql);
                list = query.Where(a => a.positiontime > time).ToList();
            }
            return list;
        }

        public string GetSoSContent(int userid)
        {
            using (Entities db = new Entities())
            {
                string str = db.qw_userlastpositions.FirstOrDefault(t => t.userid == userid).remarks1;
                return str;
            }
        }

        /// <summary>
        /// 获取周边人员求助数量
        /// </summary>
        /// <param name="x84"></param>
        /// <param name="y84"></param>
        /// <param name="radius"></param>
        /// <returns></returns>
        public int GetPeripheryUserCount(double x84, double y84, double radius, int userid)
        {
            List<PeripheryModel> list = new List<PeripheryModel>();
            DateTime time = DateTime.Now;
            DateTime d1 = time.AddMinutes(-15);
            DateTime d2 = time.AddMinutes(-30);
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select tab.userid,tab.x84,tab.x2000,tab.y84,tab.y2000,tab.positiontime,tab.ishelp,tab.helptime,tab.remarks1,bu.mobile,	bu.displayname as username,but.name as unitname from
(select * from qw_userlastpositions 
where (6371.004*ACOS(SIN({0}/180*PI())*SIN(Y84/180*PI())+COS({1}/180*PI())*COS(Y84/180*PI())*COS(({2}-X84)/180*PI())))<{3} and userid<>{4} and userid<>0
) tab
LEFT JOIN base_users bu on tab.userid=bu.id
left join base_units but on bu.unitid=but.id
where (but.unittypeid=2 or but.unittypeid=4)", y84, y84, x84, radius, userid);
                IEnumerable<PeripheryModel> query = db.Database.SqlQuery<PeripheryModel>(sql);
                query = query.Where(a => a.positiontime > d1 && a.ishelp == 1 && a.helptime > d2);
                return query.Count();

            }
        }


        /// <summary>
        /// 获取周边人员
        /// </summary>
        /// <param name="x84"></param>
        /// <param name="y84"></param>
        /// <param name="radius"></param>
        /// <returns></returns>
        public List<PeripheryApi> GetApiPeripheryUser(double x84, double y84, double radius, int userid)
        {
            List<PeripheryApi> list = new List<PeripheryApi>();
            DateTime time = DateTime.Now.AddMinutes(-5);
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from qw_userlastpositions where (6371.004*ACOS(SIN({0}/180*PI())*SIN(Y84/180*PI())+COS({1}/180*PI())*COS(Y84/180*PI())*COS(({2}-X84)/180*PI())))<{3} and userid<>{4} and userid<>0 and positiontime>=str_to_date('{5}','%Y/%m/%d %H:%i:%s')", y84, y84, x84, radius, userid, time);
                IEnumerable<QW_UserLastPositionsModel> query = db.Database.SqlQuery<QW_UserLastPositionsModel>(sql);
                if (query.Count() > 0)
                {
                    IEnumerable<PeripheryApi> queryable = from a in query
                                                          join b_join in db.base_users on a.userid equals b_join.id into btmp
                                                          from b in btmp.DefaultIfEmpty()
                                                          join c_join in db.base_units on b.unitid equals c_join.id into ctmp
                                                          from c in ctmp.DefaultIfEmpty()
                                                          select new PeripheryApi
                                                            {
                                                                userid = a.userid,
                                                                x84 = a.x84,
                                                                x2000 = a.x2000,
                                                                y84 = a.y84,
                                                                y2000 = a.y2000,
                                                                phone = b.mobile,
                                                                username = (b == null ? "" : b.displayname),
                                                                unitid = b.unitid,
                                                                unitname = (c == null ? "" : c.name)
                                                            };
                    list = queryable.ToList();
                }
            }
            return list;
        }

        #region 计算两点之间距离

        //地球半径，单位米
        private const double EARTH_RADIUS = 6378137;

        /// <summary>
        /// 计算两点位置的距离，返回两点的距离，单位 米
        /// 该公式为GOOGLE提供，误差小于0.2米
        /// </summary>
        /// <param name="lat1">第一点纬度</param>
        /// <param name="lng1">第一点经度</param>
        /// <param name="lat2">第二点纬度</param>
        /// <param name="lng2">第二点经度</param>
        /// <returns></returns>
        public double GetDistance(double lat1, double lng1, double lat2, double lng2)
        {

            double radLat1 = Rad(lat1);

            double radLng1 = Rad(lng1);

            double radLat2 = Rad(lat2);

            double radLng2 = Rad(lng2);

            double a = radLat1 - radLat2;

            double b = radLng1 - radLng2;

            double result = 2 * Math.Asin(Math.Sqrt(Math.Pow(Math.Sin(a / 2), 2) + Math.Cos(radLat1) * Math.Cos(radLat2) * Math.Pow(Math.Sin(b / 2), 2))) * EARTH_RADIUS;

            return result;

        }

        /// <summary>
        /// 经纬度转化成弧度
        /// </summary>
        /// <param name="d"></param>
        /// <returns></returns>
        private double Rad(double d)
        {
            return (double)d * Math.PI / 180d;
        }

        #endregion



        #region 获取沿街店家小摊小贩周边
        /// <summary>
        /// 获取沿街店家小摊小贩周边
        /// </summary>
        /// <param name="lat2"></param>
        /// <param name="lng2"></param>
        /// <param name="radius"></param>
        /// <returns></returns>
        public List<PeripheryInspection> GetMqsbList(List<Filter> filters, double lat2, double lng2, double radius, int type, int start, int limit)
        {
            List<Zfdx_LawStreetStoreModel> list = new List<Zfdx_LawStreetStoreModel>();
            List<PeripheryInspection> pilist = new List<PeripheryInspection>();

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select shop.*,CONCAT(SUBSTR(shop.s_licence FROM 1 FOR 10),'至',SUBSTR(shop.e_licence FROM 1 FOR 10)) validtime,zds.zd_name sourceareaname from zfdx_streetshops shop left join base_users users on shop.createuserid=users.id
left join base_zds zds on shop.sourcearea =zds.zd_id and zds.zd_type='type_yjdj_ssqy' left join zfdx_shopblacks blacks on shop.zfdx_shopid =blacks.shopid where blacks.isblack=0 and shop.sstype=" + type);
                IEnumerable<Zfdx_LawStreetStoreModel> queryable = db.Database.SqlQuery<Zfdx_LawStreetStoreModel>(sql);

                list = queryable.ToList();
            }
            foreach (var item in list)
            {
                PeripheryInspection model = new PeripheryInspection();
                string lat1 = "";//Y
                string lng1 = "";//X
                double distance = 0;
                if (!string.IsNullOrEmpty(item.grometry))
                {
                    string[] map = item.grometry.Split(',');
                    lng1 = map[0];
                    lat1 = map[1];
                    distance = GetDistance(double.Parse(lat1), double.Parse(lng1), lat2, lng2);
                    if (radius == 0)
                    {
                        model.id = item.zfdx_shopid;
                        model.name = type == 1 ? item.shopname : item.person;
                        model.distance = Math.Round(distance, 2);
                        model.explain = item.hawkertype;
                        pilist.Add(model);
                    }
                    else if (radius > distance)
                    {
                        model.id = item.zfdx_shopid;
                        model.name = type == 1 ? item.shopname : item.person;
                        model.distance = Math.Round(distance, 2);
                        model.explain = item.hawkertype;
                        pilist.Add(model);
                    }

                }
            }
            if (filters != null && filters.Count > 0)
            {
                foreach (Filter filter in filters)
                {
                    string value = filter.value;
                    switch (filter.property)
                    {
                        case "name":
                            if (!string.IsNullOrEmpty(value))
                                pilist = pilist.Where(t => t.name.Contains(value)).ToList();
                            break;
                    }
                }
            }
            pilist = pilist.Skip(start).Take(limit).ToList();
            return pilist;
        }

        public int GetMqsbCount(List<Filter> filters, double lat2, double lng2, double radius, int type)
        {
            int Count = GetMqsbList(filters, lat2, lng2, radius, type, 0, 999999999).Count();
            return Count;
        }
        #endregion
    }
}
