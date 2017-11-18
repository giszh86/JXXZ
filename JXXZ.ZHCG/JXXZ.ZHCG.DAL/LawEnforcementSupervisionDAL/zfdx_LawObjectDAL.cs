using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.lawenforcementsupervisionModel;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace JXXZ.ZHCG.BLL.LawEnforcementSupervisionDAL
{
    public class zfdx_LawObjectDAL
    {
        #region 沿街店家列表
        public Paging<List<Zfdx_LawStreetStoreModel>> GetStreeShopList(List<Filter> filters, int start, int limit, int type)
        {
            Paging<List<Zfdx_LawStreetStoreModel>> paging = new Paging<List<Zfdx_LawStreetStoreModel>>();
            List<Zfdx_LawStreetStoreModel> list = new List<Zfdx_LawStreetStoreModel>();
            using (Entities db = new Entities())
            {
                string sql = "";
                if (type == 1)
                {
                    sql = string.Format(@"select shop.*,CONCAT(SUBSTR(shop.s_licence FROM 1 FOR 10),'至',SUBSTR(shop.e_licence FROM 1 FOR 10)) validtime,zds.remark unitid,zds.zd_name sourceareaname ,zds1.zd_name as shoptypename from zfdx_streetshops shop left join base_users users on shop.createuserid=users.id
left join base_zds zds on shop.sourcearea =zds.zd_id and zds.zd_type='type_yjdj_ssqy' 
left join base_zds zds1 on shop.shoptype =zds1.zd_id and zds1.zd_type='type_djlx' left join zfdx_shopblacks blacks on shop.zfdx_shopid =blacks.shopid where blacks.isblack=0 and shop.sstype=" + type);
                }
                else
                {
                    sql = string.Format(@"select shop.*,CONCAT(SUBSTR(shop.s_licence FROM 1 FOR 10),'至',SUBSTR(shop.e_licence FROM 1 FOR 10)) validtime,zds.remark unitid,zds.zd_name sourceareaname from zfdx_streetshops shop left join base_users users on shop.createuserid=users.id
left join base_zds zds on shop.sourcearea =zds.zd_id and zds.zd_type='type_yjdj_ssqy' left join zfdx_shopblacks blacks on shop.zfdx_shopid =blacks.shopid where blacks.isblack=0 and shop.sstype=" + type);
                }



                IEnumerable<Zfdx_LawStreetStoreModel> queryable = db.Database.SqlQuery<Zfdx_LawStreetStoreModel>(sql);
                //筛选条件
                if (filters != null && filters.Count > 0)
                {
                    if (type == 1)
                    {
                        foreach (Filter filter in filters)
                        {
                            string value = filter.value;
                            switch (filter.property)
                            {
                                case "unitid":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.unitid == value);
                                    }
                                    break;
                                case "shopname":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.shopname.Contains(value));
                                    }
                                    break;
                                case "person":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.person.Contains(value));
                                    break;
                                case "address":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.address != null && t.address.Contains(value));
                                    break;
                            }
                        }
                    }
                    if (type == 2)
                    {
                        foreach (Filter filter in filters)
                        {
                            string value = filter.value;
                            switch (filter.property)
                            {
                                case "unitid":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.unitid == value);
                                    }
                                    break;
                                case "contactphone":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.contactphone.Contains(value));
                                    }
                                    break;
                                case "person":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.person.Contains(value));
                                    break;
                                case "hawkertype":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.hawkertype != null && t.hawkertype.Contains(value));
                                    break;
                            }
                        }
                    }
                }
                paging.Total = queryable.Count();
                list = queryable.OrderByDescending(a => a.zfdx_shopid).Skip(start).Take(limit).ToList();
                paging.Items = list;

                return paging;
            }
        }

        public int GetStreeShopCount(List<Filter> filters, int type)
        {
            using (Entities db = new Entities())
            {
                string sql = "";
                if (type == 1)
                {
                    sql = string.Format(@"select shop.*,CONCAT(SUBSTR(shop.s_licence FROM 1 FOR 10),'至',SUBSTR(shop.e_licence FROM 1 FOR 10)) validtime,zds.zd_name sourceareaname ,zds1.zd_name as shoptypename from zfdx_streetshops shop left join base_users users on shop.createuserid=users.id
left join base_zds zds on shop.sourcearea =zds.zd_id and zds.zd_type='type_yjdj_ssqy' 
left join base_zds zds1 on shop.shoptype =zds1.zd_id and zds1.zd_type='type_djlx' left join zfdx_shopblacks blacks on shop.zfdx_shopid =blacks.shopid where blacks.isblack=0 and shop.sstype=" + type);
                }
                else
                {
                    sql = string.Format(@"select shop.*,CONCAT(SUBSTR(shop.s_licence FROM 1 FOR 10),'至',SUBSTR(shop.e_licence FROM 1 FOR 10)) validtime,zds.zd_name sourceareaname from zfdx_streetshops shop left join base_users users on shop.createuserid=users.id
left join base_zds zds on shop.sourcearea =zds.zd_id and zds.zd_type='type_yjdj_ssqy' left join zfdx_shopblacks blacks on shop.zfdx_shopid =blacks.shopid where blacks.isblack=0 and shop.sstype=" + type);
                }



                IEnumerable<Zfdx_LawStreetStoreModel> queryable = db.Database.SqlQuery<Zfdx_LawStreetStoreModel>(sql);
                //筛选条件
                if (filters != null && filters.Count > 0)
                {
                    if (type == 1)
                    {
                        foreach (Filter filter in filters)
                        {
                            string value = filter.value;
                            switch (filter.property)
                            {
                                case "shopname":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.shopname.Contains(value));
                                    }
                                    break;
                                case "person":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.person.Contains(value));
                                    break;
                                case "address":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.address != null && t.address.Contains(value));
                                    break;
                            }
                        }
                    }
                    if (type == 2)
                    {
                        foreach (Filter filter in filters)
                        {
                            string value = filter.value;
                            switch (filter.property)
                            {
                                case "contactphone":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.contactphone.Contains(value));
                                    }
                                    break;
                                case "person":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.person.Contains(value));
                                    break;
                                case "hawkertype":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.hawkertype != null && t.hawkertype.Contains(value));
                                    break;
                            }
                        }
                    }
                }
               int num = queryable.Count();
               return num;
            }
        }
        #endregion

        #region 沿街店家新增
        public int AddStreetShop(Zfdx_LawStreetStoreModel model)
        {
            using (Entities db = new Entities())
            {
                zfdx_streetshops shops = new zfdx_streetshops();
                shops.address = model.address;
                shops.businessarea = model.businessarea;
                shops.card = model.card;
                shops.contactphone = model.contactphone;
                shops.createtime = DateTime.Now;
                shops.createuserid = model.createuserid;
                shops.e_business = model.e_business;
                if (model.e_licence != null && model.s_licence != null)
                {
                    shops.e_licence = Convert.ToDateTime(model.e_licence.ToString().Split(' ')[0]);
                    shops.s_licence = Convert.ToDateTime(model.s_licence.ToString().Split(' ')[0]);
                }
                shops.grometry = model.grometry;
                shops.hawkertype = model.hawkertype;
                shops.licencecard = model.licencecard;
                shops.person = model.person;
                shops.remark = model.remark;
                shops.s_business = model.s_business;
                shops.shopname = model.shopname;
                shops.shoptype = model.shoptype;
                shops.sourcearea = model.sourcearea;
                shops.sstype = 1;
                shops.staffsum = model.staffsum;
                db.zfdx_streetshops.Add(shops);
                db.SaveChanges();

                //店铺-黑名单关系表
                zfdx_shopblacks shopblacks = new zfdx_shopblacks();
                shopblacks.shopid = shops.zfdx_shopid;
                shopblacks.isblack = 0;  //是否黑名单(0否1是)
                shopblacks.createtime = DateTime.Now;
                shopblacks.createuserid = shops.createuserid;
                shopblacks.reason = "";
                db.zfdx_shopblacks.Add(shopblacks);

                return db.SaveChanges();
            }
        }
        #endregion

        #region 沿街店家修改
        public int ModifyStreetShopInf(Zfdx_LawStreetStoreModel model)
        {
            using (Entities db = new Entities())
            {
                zfdx_streetshops shops = db.zfdx_streetshops.FirstOrDefault(a => a.zfdx_shopid == model.zfdx_shopid && a.sstype == 1);
                if (shops != null)
                {
                    shops.address = model.address;
                    shops.businessarea = model.businessarea;
                    shops.card = model.card;
                    shops.contactphone = model.contactphone;
                    shops.e_business = model.e_business;
                    shops.e_licence = model.e_licence;
                    shops.grometry = model.grometry;
                    shops.hawkertype = model.hawkertype;
                    shops.licencecard = model.licencecard;
                    shops.person = model.person;
                    shops.remark = model.remark;
                    shops.s_business = model.s_business;
                    shops.s_licence = model.s_licence;
                    shops.shopname = model.shopname;
                    shops.shoptype = model.shoptype;
                    shops.sourcearea = model.sourcearea;
                    shops.staffsum = model.staffsum;
                    return db.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }
        #endregion

        #region 沿街店家删除
        public int DeleteStreetShopsInf(int shopid)
        {
            using (Entities db = new Entities())
            {
                zfdx_streetshops model = db.zfdx_streetshops.SingleOrDefault(t => t.zfdx_shopid == shopid);
                zfdx_shopblacks blacks = db.zfdx_shopblacks.SingleOrDefault(a => a.shopid == shopid);
                if (model != null)
                {
                    db.zfdx_streetshops.Remove(model);
                }
                if (blacks != null)
                {
                    db.zfdx_shopblacks.Remove(blacks);

                }
                return db.SaveChanges();
            }
        }
        #endregion

        #region 沿街店家查看详情
        public Zfdx_LawStreetStoreModel GetStreetShopsInf(int shopid)
        {
            Zfdx_LawStreetStoreModel model = new Zfdx_LawStreetStoreModel();
            using (Entities db = new Entities())
            {
                IQueryable<Zfdx_LawStreetStoreModel> queryable = from a in db.zfdx_streetshops
                                                                 join b_join in db.base_zds.Where(a => a.zd_type == "type_djlx") on a.shoptype equals b_join.zd_id into bTmp
                                                                 from b in bTmp.DefaultIfEmpty()
                                                                 join c_join in db.base_zds.Where(a => a.zd_type == "type_yjdj_ssqy") on a.sourcearea equals c_join.zd_id into cTmp
                                                                 from c in cTmp.DefaultIfEmpty()
                                                                 where a.zfdx_shopid == shopid && a.sstype == 1
                                                                 select new Zfdx_LawStreetStoreModel
                                                                 {
                                                                     zfdx_shopid = a.zfdx_shopid,
                                                                     address = a.address,
                                                                     businessarea = a.businessarea,
                                                                     card = a.card,
                                                                     contactphone = a.contactphone,
                                                                     e_business = a.e_business,
                                                                     e_licence = a.e_licence,
                                                                     grometry = a.grometry,
                                                                     hawkertype = a.hawkertype,
                                                                     licencecard = a.licencecard,
                                                                     person = a.person,
                                                                     remark = a.remark,
                                                                     s_business = a.s_business,
                                                                     s_licence = a.s_licence,
                                                                     shopname = a.shopname,
                                                                     shoptype = a.shoptype,
                                                                     sourcearea = a.sourcearea,
                                                                     sstype = a.sstype,
                                                                     staffsum = a.staffsum,
                                                                     createtime = a.createtime,
                                                                     createuserid = a.createuserid,
                                                                     shoptypename = b.zd_name,
                                                                     sourceareaname = c.zd_name,
                                                                 };
                model = queryable.FirstOrDefault();
                return model;
            }
        }
        #endregion

        #region 沿街店家设为黑名单
        public int AddStoreInBlackList(int zfdx_shopid)
        {
            using (Entities db = new Entities())
            {
                zfdx_shopblacks model = db.zfdx_shopblacks.FirstOrDefault(a => a.shopid == zfdx_shopid);
                if (model != null)
                {
                    model.isblack = 1;  //是否黑名单(0否1是)
                    model.createtime = DateTime.Now;
                }
                return db.SaveChanges();
            }
        }
        #endregion

        #region 添加小摊小贩信息
        public int AddHawker(Zfdx_LawStreetStoreModel model)
        {
            using (Entities db = new Entities())
            {
                zfdx_streetshops shops = new zfdx_streetshops();
                shops.address = model.address;
                shops.card = model.card;
                shops.contactphone = model.contactphone;
                shops.createtime = DateTime.Now;
                shops.createuserid = model.createuserid;
                shops.grometry = model.grometry;
                shops.hawkertype = model.hawkertype;
                shops.remark = model.remark;
                shops.sourcearea = model.sourcearea;
                shops.person = model.person;
                shops.sstype = 2;
                db.zfdx_streetshops.Add(shops);
                db.SaveChanges();

                //店铺-黑名单关系表
                zfdx_shopblacks shopblacks = new zfdx_shopblacks();
                shopblacks.shopid = shops.zfdx_shopid;
                shopblacks.isblack = 0;  //是否黑名单(0否1是)
                shopblacks.createtime = DateTime.Now;
                shopblacks.createuserid = shops.createuserid;
                shopblacks.reason = "";
                db.zfdx_shopblacks.Add(shopblacks);
                return db.SaveChanges();

            }
        }
        #endregion

        #region 小摊小贩信息修改
        public int Editxf(Zfdx_LawStreetStoreModel model)
        {
            using (Entities db = new Entities())
            {
                zfdx_streetshops shops = db.zfdx_streetshops.FirstOrDefault(a => a.zfdx_shopid == model.zfdx_shopid && a.sstype == 2);
                if (shops != null)
                {
                    shops.address = model.address;
                    shops.businessarea = model.businessarea;
                    shops.card = model.card;
                    shops.contactphone = model.contactphone;
                    shops.e_business = model.e_business;
                    shops.e_licence = model.e_licence;
                    shops.grometry = model.grometry;
                    shops.hawkertype = model.hawkertype;
                    shops.licencecard = model.licencecard;
                    shops.person = model.person;
                    shops.remark = model.remark;
                    shops.s_business = model.s_business;
                    shops.s_licence = model.s_licence;
                    shops.shopname = model.shopname;
                    shops.shoptype = model.shoptype;
                    shops.sourcearea = model.sourcearea;
                    shops.staffsum = model.staffsum;
                    return db.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }
        #endregion

        #region 小摊小贩查看详情
        public Zfdx_LawStreetStoreModel GetHawkerInf(int shopid)
        {
            Zfdx_LawStreetStoreModel model = new Zfdx_LawStreetStoreModel();
            using (Entities db = new Entities())
            {
                IQueryable<Zfdx_LawStreetStoreModel> queryable = from a in db.zfdx_streetshops
                                                                 join c_join in db.base_zds.Where(a => a.zd_type == "type_yjdj_ssqy") on a.sourcearea equals c_join.zd_id into cTmp
                                                                 from c in cTmp.DefaultIfEmpty()
                                                                 where a.zfdx_shopid == shopid && a.sstype == 2
                                                                 select new Zfdx_LawStreetStoreModel
                                                                 {
                                                                     zfdx_shopid = a.zfdx_shopid,
                                                                     address = a.address,
                                                                     businessarea = a.businessarea,
                                                                     card = a.card,
                                                                     contactphone = a.contactphone,
                                                                     e_business = a.e_business,
                                                                     e_licence = a.e_licence,
                                                                     grometry = a.grometry,
                                                                     hawkertype = a.hawkertype,
                                                                     licencecard = a.licencecard,
                                                                     person = a.person,
                                                                     remark = a.remark,
                                                                     s_business = a.s_business,
                                                                     s_licence = a.s_licence,
                                                                     shopname = a.shopname,
                                                                     shoptype = a.shoptype,
                                                                     sourcearea = a.sourcearea,
                                                                     sstype = a.sstype,
                                                                     staffsum = a.staffsum,
                                                                     createtime = a.createtime,
                                                                     createuserid = a.createuserid,
                                                                     sourceareaname = c.zd_name,
                                                                 };
                model = queryable.FirstOrDefault();
                return model;
            }
        }
        #endregion

        #region 黑名单列表
        public List<Zfdx_LawStreetStoreModel> GetBlackList(List<Filter> filters, int start, int limit, int type)
        {
            List<Zfdx_LawStreetStoreModel> list = new List<Zfdx_LawStreetStoreModel>();
            using (Entities db = new Entities())
            {
                string sql = "";
                if (type == 1)
                {
                    sql = string.Format(@"select shop.zfdx_shopid,shop.shopname,shop.shoptype,shop.person,shop.card,shop.contactphone,shop.staffsum,shop.e_licence,
shop.s_licence,shop.licencecard,shop.s_business,shop.e_business,shop.businessarea,shop.address,shop.sourcearea,shop.grometry,
shop.createuserid,shop.createtime,shop.sstype,shop.hawkertype,shop.remark,CONCAT(SUBSTR(shop.s_licence FROM 1 FOR 10),'至',SUBSTR(shop.e_licence FROM 1 FOR 10)) validtime,zds.zd_name sourceareaname,zds1.zd_name as shoptypename
 from zfdx_shopblacks blacks
left join zfdx_streetshops shop on blacks.shopid=shop.zfdx_shopid
left join base_users users on shop.createuserid=users.id
left join base_zds zds on shop.sourcearea =zds.zd_id and zds.zd_type='type_yjdj_ssqy'
left join base_zds zds1 on shop.shoptype =zds1.zd_id and zds1.zd_type='type_djlx' where  blacks.isblack=1 and shop.sstype=" + type);
                }
                else
                {
                    sql = string.Format(@"select shop.zfdx_shopid,shop.shopname,shop.shoptype,shop.person,shop.card,shop.contactphone,shop.staffsum,shop.e_licence,shop.s_licence,shop.licencecard,shop.s_business,shop.e_business,shop.businessarea,shop.address,shop.sourcearea,shop.grometry,shop.createuserid,shop.createtime,shop.sstype,shop.hawkertype,shop.remark,CONCAT(SUBSTR(shop.s_licence FROM 1 FOR 10),'至',SUBSTR(shop.e_licence FROM 1 FOR 10)) validtime,zds.zd_name sourceareaname
 from zfdx_shopblacks blacks
left join zfdx_streetshops shop on blacks.shopid=shop.zfdx_shopid
left join base_users users on shop.createuserid=users.id
left join base_zds zds on shop.sourcearea =zds.zd_id and zds.zd_type='type_yjdj_ssqy'
 where  blacks.isblack=1 and shop.sstype=" + type);
                }

                IEnumerable<Zfdx_LawStreetStoreModel> queryable = db.Database.SqlQuery<Zfdx_LawStreetStoreModel>(sql);
                //筛选条件
                if (filters != null && filters.Count > 0)
                {
                    if (type == 1)
                    {
                        foreach (Filter filter in filters)
                        {
                            string value = filter.value;
                            switch (filter.property)
                            {
                                case "shopname":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.shopname.Contains(value));
                                    }
                                    break;
                                case "person":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.person.Contains(value));
                                    break;
                                case "address":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.address != null && t.address.Contains(value));
                                    break;
                            }
                        }
                    }
                    if (type == 2)
                    {
                        foreach (Filter filter in filters)
                        {
                            string value = filter.value;
                            switch (filter.property)
                            {
                                case "contactphone":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.contactphone.Contains(value));
                                    }
                                    break;
                                case "person":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.person.Contains(value));
                                    break;
                                case "hawkertype":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.hawkertype != null && t.hawkertype.Contains(value));
                                    break;
                            }
                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.createtime).Skip(start).Take(limit).ToList();
                return list;
            }
        }

        public int GetBlackCount(List<Filter> filters, int type)
        {
            using (Entities db = new Entities())
            {
                string sql = "";
                if (type == 1)
                {
                    sql = string.Format(@"select shop.zfdx_shopid,shop.shopname,shop.shoptype,shop.person,shop.card,shop.contactphone,shop.staffsum,shop.e_licence,
shop.s_licence,shop.licencecard,shop.s_business,shop.e_business,shop.businessarea,shop.address,shop.sourcearea,shop.grometry,
shop.createuserid,shop.createtime,shop.sstype,shop.hawkertype,shop.remark,CONCAT(SUBSTR(shop.s_licence FROM 1 FOR 10),'至',SUBSTR(shop.e_licence FROM 1 FOR 10)) validtime,zds.zd_name sourceareaname,zds1.zd_name as shoptypename
 from zfdx_shopblacks blacks
left join zfdx_streetshops shop on blacks.shopid=shop.zfdx_shopid
left join base_users users on shop.createuserid=users.id
left join base_zds zds on shop.sourcearea =zds.zd_id and zds.zd_type='type_yjdj_ssqy'
left join base_zds zds1 on shop.shoptype =zds1.zd_id and zds1.zd_type='type_djlx' where  blacks.isblack=1 and shop.sstype=" + type);
                }
                else
                {
                    sql = string.Format(@"select shop.zfdx_shopid,shop.shopname,shop.shoptype,shop.person,shop.card,shop.contactphone,shop.staffsum,shop.e_licence,shop.s_licence,shop.licencecard,shop.s_business,shop.e_business,shop.businessarea,shop.address,shop.sourcearea,shop.grometry,shop.createuserid,shop.createtime,shop.sstype,shop.hawkertype,shop.remark,CONCAT(SUBSTR(shop.s_licence FROM 1 FOR 10),'至',SUBSTR(shop.e_licence FROM 1 FOR 10)) validtime,zds.zd_name sourceareaname
 from zfdx_shopblacks blacks
left join zfdx_streetshops shop on blacks.shopid=shop.zfdx_shopid
left join base_users users on shop.createuserid=users.id
left join base_zds zds on shop.sourcearea =zds.zd_id and zds.zd_type='type_yjdj_ssqy'
 where  blacks.isblack=1 and shop.sstype=" + type);
                }

                IEnumerable<Zfdx_LawStreetStoreModel> queryable = db.Database.SqlQuery<Zfdx_LawStreetStoreModel>(sql);
                //筛选条件
                if (filters != null && filters.Count > 0)
                {
                    if (type == 1)
                    {
                        foreach (Filter filter in filters)
                        {
                            string value = filter.value;
                            switch (filter.property)
                            {
                                case "shopname":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.shopname.Contains(value));
                                    }
                                    break;
                                case "person":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.person.Contains(value));
                                    break;
                                case "address":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.address != null && t.address.Contains(value));
                                    break;
                            }
                        }
                    }
                    if (type == 2)
                    {
                        foreach (Filter filter in filters)
                        {
                            string value = filter.value;
                            switch (filter.property)
                            {
                                case "contactphone":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.contactphone.Contains(value));
                                    }
                                    break;
                                case "person":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.person.Contains(value));
                                    break;
                                case "hawkertype":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.hawkertype != null && t.hawkertype.Contains(value));
                                    break;
                            }
                        }
                    }
                }
               int num = queryable.Count();
               return num;
            }
        }
        #endregion

        #region 解除黑名单
        public int RemoveStoreInBlackList(int zfdx_shopid)
        {
            using (Entities db = new Entities())
            {
                zfdx_shopblacks model = db.zfdx_shopblacks.FirstOrDefault(a => a.shopid == zfdx_shopid);
                if (model != null)
                {
                    model.isblack = 0;  //是否黑名单(0否1是)
                }
                return db.SaveChanges();
            }
        }
        #endregion

        #region 获取不同地区人数
        //获取不同地区沿街店家和小摊小贩人数
        public List<int> GetDiffTypeCount(int type, int isBlack)
        {
            using (Entities db = new Entities())
            {
                int num = (from a in db.base_zds.Where(b => b.zd_type == "type_yjdj_ssqy") select a).Count();

                List<int> list = new List<int>();
                for (int i = 1; i <= num; i++)
                {
                    var j = i.ToString();
                    var sum = 0;
                    if (isBlack == 0)
                    {
                        sum = (from a in db.zfdx_streetshops.Where(b => b.sstype == type && b.sourcearea == j)
                               join b_join in db.zfdx_shopblacks.Where(t => t.isblack == 0) on a.zfdx_shopid equals b_join.shopid
                               select a).Count();
                    }
                    else
                    {
                        sum = (from a in db.zfdx_streetshops.Where(b => b.sstype == type && b.sourcearea == j)
                               join b_join in db.zfdx_shopblacks.Where(b => b.isblack == 1) on a.zfdx_shopid equals b_join.shopid
                               select a).Count();
                    }
                    list.Add(sum);
                }
                return list;
            }
        }
        #endregion

        #region 获取报表最多人数
        public int GetMaxNum(int isBlack)
        {
            using (Entities db = new Entities())
            {
                int num = (from a in db.zfdx_streetshops select a).Count();
                return num;
            }
        }
        #endregion

        #region 报表导出
        public List<Zfdx_LawStreetStoreModel> GetBlackListExcel(int type, List<Filter> filters = null)
        {
            List<Zfdx_LawStreetStoreModel> list = new List<Zfdx_LawStreetStoreModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select shop.zfdx_shopid,shop.shopname,shop.shoptype,shop.person,shop.card,shop.contactphone,shop.staffsum,shop.e_licence,shop.s_licence,shop.licencecard,shop.s_business,shop.e_business,shop.businessarea,shop.address,shop.sourcearea,shop.grometry,shop.createuserid,shop.createtime,shop.sstype,shop.hawkertype,shop.remark,CONCAT(SUBSTR(shop.s_licence FROM 1 FOR 10),'至',SUBSTR(shop.e_licence FROM 1 FOR 10)) validtime,zds.zd_name sourceareaname
 from zfdx_shopblacks blacks
left join zfdx_streetshops shop on blacks.shopid=shop.zfdx_shopid
left join base_users users on shop.createuserid=users.id
left join base_zds zds on shop.sourcearea =zds.zd_id and zds.zd_type='type_yjdj_ssqy'
 where  blacks.isblack=1 and shop.sstype=" + type);
                IEnumerable<Zfdx_LawStreetStoreModel> queryable = db.Database.SqlQuery<Zfdx_LawStreetStoreModel>(sql);
                //筛选条件
                if (filters != null && filters.Count > 0)
                {
                    if (type == 1)
                    {
                        foreach (Filter filter in filters)
                        {
                            string value = filter.value;
                            switch (filter.property)
                            {
                                case "shopname":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.shopname.Contains(value));
                                    }
                                    break;
                                case "person":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.person.Contains(value));
                                    break;
                                case "address":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.address != null && t.address.Contains(value));
                                    break;
                            }
                        }
                    }
                    if (type == 2)
                    {
                        foreach (Filter filter in filters)
                        {
                            string value = filter.value;
                            switch (filter.property)
                            {
                                case "contactphone":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.contactphone.Contains(value));
                                    }
                                    break;
                                case "person":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.person.Contains(value));
                                    break;
                                case "hawkertype":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.hawkertype != null && t.hawkertype.Contains(value));
                                    break;
                            }
                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.zfdx_shopid).ToList();
            }
            return list;
        }
        #endregion


        #region API
        public List<int> GetLawObjectNum()
        {
            List<int> list = new List<int>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select zs.sstype ,zss.isblack  from zfdx_streetshops zs left join zfdx_shopblacks zss on zs.zfdx_shopid = zss.shopid");
                IEnumerable<LawObjectNum> queryable = db.Database.SqlQuery<LawObjectNum>(sql);

                //沿街店家
                int yjdj = queryable.Count(a => a.isblack == 0 && a.sstype == 1);
                list.Add(yjdj);
                //小摊小贩
                int xtxf = queryable.Count(a => a.isblack == 0 && a.sstype == 2);
                list.Add(xtxf);
                //黑名单
                int hmd = queryable.Count(a => a.isblack == 1);
                list.Add(hmd);
            }
            return list;
        }
        #endregion
    }
}
