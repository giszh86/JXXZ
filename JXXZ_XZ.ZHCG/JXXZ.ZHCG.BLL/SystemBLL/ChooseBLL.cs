using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL
{
    public class ChooseBLL
    {
        public ChooseDAL dal = new ChooseDAL();


        public List<SiginDetail> GetSignInListById(DateTime date, int num, int userId)
        {
            var list = dal.GetSignInListById(date, num, userId);
            DateTime lastDate = date.Date.AddDays(1);
            DateTime startDate = lastDate;
            if (list.Count > 0)
            {
                startDate = list[list.Count - 1].taskTime.Date;
            }
            var signList = dal.GetUserSign(userId, startDate, lastDate);
            foreach (var item in signList)
            {
                DateTime sDate = item.signintime.Date;
                var model = list.FirstOrDefault(t => t.taskTime.Date == sDate);
                if (model != null)
                {
                    model.signList.Add(item);
                }
            }
            return list;
        }

        public List<SelectItem> GetMiddleTeam()
        {
            var list = dal.GetMiddleTeam();
            var rst = list.Select(t => new SelectItem(t.id, t.name));
            return rst.ToList();
        }

        public List<SelectItem> GetTeamGroup(int teamID)
        {
            var list = dal.GetTeamGroup(teamID);
            var rst = list.Select(t => new SelectItem(t.id, t.name));
            return rst.ToList();
        }

        public IEnumerable<SelectItem> GetPerson(int groupId)
        {
            var list = dal.GetPerson(groupId);
            var rst = list.Select(t => new SelectItem(t.id, t.displayname));
            return rst;
        }

        /// <summary>
        /// 获取中队下所有的班组+队员
        /// </summary>
        /// <param name="unitId"></param>
        /// <returns></returns>
        public IEnumerable<SelectItem> GetGroupAndPerson(int unitId)
        {
            var list = dal.GetGroupAndPerson(unitId);
            var rst = GetList(list);
            return rst;
        }

        /// <summary>
        /// 获取大小类
        /// </summary>
        /// <returns></returns>
        public List<SelectItem> GetClassType()
        {
            var list = dal.GetClassType().Select(t =>
                new SelectItems(t.classid, t.classname, t.parentid));
            List<SelectItem> rst = new List<SelectItem>();
            var cList = list.Where(t => t.parentId == null);
            foreach (var item in cList)
            {
                add(list, item, rst);
            }
            return rst;

        }

        //获取银行账户.
        public List<SelectValue> GetBank()
        {
            List<SelectValue> rst = new List<SelectValue>();
            var list = dal.GetBank();

            var cList = list.Where(t => t.zd_type == "type_bank");
            foreach (var item in cList)
            {
                add(list, item, rst);
            }

            return rst;
        }

        //证件类型
        public IEnumerable<SelectItem> GetZds(string type)
        {
            var rst = dal.GetTypeList(type)
                .Select(t => new SelectItem(t.zd_id, t.zd_name));
            return rst;

        }

        /// <summary>
        /// 返回2级列表.
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        private List<SelectItem> GetList(IEnumerable<FatherSelectItem> list)
        {
            List<SelectItem> rst = new List<SelectItem>();
            foreach (var item in list)
            {
                SelectItem model;
                model = rst.FirstOrDefault(t => t.value == item.value);
                if (model == null)
                {
                    model = new SelectItem()
                    {
                        value = item.value,
                        text = item.text
                    };
                    rst.Add(model);
                }
                SelectItem children = new SelectItem(item.childrenValue, item.childrenText);
                model.children.Add(children);
            }
            return rst;
        }

        private void add(IEnumerable<case_zds> list, case_zds model, List<SelectValue> rst)
        {
            SelectValue item = new SelectValue(model.zd_id, model.zd_name, model.zd_type);
            rst.Add(item);
            int? id = int.Parse(model.zd_id);
            var cList = list.Where(t => t.remark == model.zd_type && t.parentid == id);
            foreach (var temp in cList)
            {
                add(list, temp, item.children);
            }
        }

        private void add(IEnumerable<SelectItems> list, SelectItems model, List<SelectItem> rst)
        {
            SelectItem item = new SelectItem(model.value, model.text);
            rst.Add(item);
            var cList = list.Where(t => (t.parentId ?? 0) == model.value);
            foreach (var temp in cList)
            {
                add(list, temp, item.children);
            }

        }


        public object GetVersion()
        {
            phone_version version = dal.GetVersion();
            if (version == null) version = new phone_version();
            return version;

        }
    }
}
