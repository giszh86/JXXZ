using JXXZ.ZHCG.DAL.DataDictionaryDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.DataDictionaryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.DataDictionaryBLL
{
    public class DataDictionaryBLL
    {
        private DataDictionaryDAL dal = new DataDictionaryDAL();

        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<DataDictionaryModel>> GetDataDictionaryList(List<Filter> filters, int start, int limit)
        {
            List<DataDictionaryModel> items = dal.GetDataDictionaryList(filters, start, limit).ToList();
            int total = dal.GetDataDictionaryCount(filters);
            Paging<List<DataDictionaryModel>> paging = new Paging<List<DataDictionaryModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 获取类型
        /// </summary>
        /// <returns></returns>
        public List<DataDictionaryType> GetDataDictionaryTypeList()
        {
            return dal.GetDataDictionaryTypeList();
        }

        /// <summary>
        /// 获取类型数据
        /// </summary>
        /// <param name="zdtype"></param>
        /// <returns></returns>
        public List<DataDictionaryType> GetDataDictionaryNameList(string zdtype)
        {
            return dal.GetDataDictionaryNameList(zdtype);
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddDataDictionary(DataDictionaryModel model)
        {
            return dal.AddDataDictionary(model);
        }

        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int EditDataDictionary(DataDictionaryModel model)
        {
            return dal.EditDataDictionary(model);
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="type"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteDataDictionary(string type, string id)
        {
            return dal.DeleteDataDictionary(type, id);
        }



        public List<DataDictionaryType> GetTree()
        {
            //查询根节点
            List<DataDictionaryType> dataList = dal.GetDataDictionaryTypeList().ToList();
            List<DataDictionaryType> dataListChildren = dal.GetDataDictionary().ToList();
            List<DataDictionaryType> list = new List<DataDictionaryType>();

            if (dataList.Count > 0)
            {
                for (int i = 0; i < dataList.Count; i++)
                {
                    DataDictionaryType item = dataList[i];

                    if (item.remark == null || item.remark == "")
                    {
                        item = GetUnitChildren(dataListChildren, item);
                        item.leaf = false;
                        list.Add(item);
                    }
                }
            }
            return list;
        }


        private DataDictionaryType GetUnitChildren(List<DataDictionaryType> dataList, DataDictionaryType item,int? isdg = null)
        {
            List<DataDictionaryType> list = new List<DataDictionaryType>();
            DataDictionaryType model = new DataDictionaryType();

            for (int i = 0; i < dataList.Count; i++)
            {
                DataDictionaryType childrenItem = dataList[i];
                if (childrenItem.ddid != null && childrenItem.ddid == item.ddid)
                {
                    List<DataDictionaryType> cameras = dal.GetDataDictionaryChildren(childrenItem.ddid, childrenItem.zdid);
                    childrenItem = GetUnitChildren(cameras, childrenItem,1);
                    if (childrenItem.children.Count() == 0)
                    {
                        foreach (var cam in cameras)
                        {
                            cam.leaf = true;
                            cam.parentname = childrenItem.text;
                            childrenItem.children.Add(cam);
                        }
                        if (cameras.Count() == 0)
                            childrenItem.leaf = true;
                    }
                    childrenItem.parentname = item.text;
                    list.Add(childrenItem);
                }
                if (isdg != null)
                {
                    List<DataDictionaryType> cameras = dal.GetDataDictionaryChildren(childrenItem.ddid, childrenItem.zdid);
                    childrenItem.children = new List<DataDictionaryType>();
                    foreach (var cam in cameras)
                    {
                        cam.leaf = true;
                        if (cam.parentid == childrenItem.zdid)
                        {
                            cam.parentname = childrenItem.text;
                            childrenItem.children.Add(cam);
                        }
                    }
                    if (cameras.Count() == 0)
                        childrenItem.leaf = true;
                    childrenItem.parentname = item.text;
                    list.Add(childrenItem);
                }
            }
            item.children = list;
            return item;
        }


    }
}
