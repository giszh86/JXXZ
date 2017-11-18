using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model
{
    /// <summary>
    /// 分页类
    /// </summary>
    public class Paging<T>
    {
        /// <summary>
        /// 数据
        /// </summary>
        public T Items { get; set; }

        /// <summary>
        /// 总数量
        /// </summary>
        public int Total { get; set; }

        /// <summary>
        /// 手机分页
        /// </summary>
        public int MobileCount { get; set; }

        /// <summary>
        /// 总页数
        /// </summary>
        public int PageCount
        {
            get
            {
                IEnumerable<object> list = Items as IEnumerable<object>;
                if (MobileCount != 0)
                    return MobileCount;
                else if (list.Count() == 0)
                {
                    return 0;
                }
                else
                {
                    int num = list.Count();
                    int page = (int)Math.Ceiling((double)Total / (double)num);
                    return page;

                }
            }
            set {
                MobileCount = value;
            }
        }
    }

    public class Pag<T>
    {
        public IEnumerable<T> Items { get; set; }

        public int Total { get; set; }
    }

    public class PagHelper
    {
        public static Pag<T> CreatePag<T>(IEnumerable<T> list, int total)
        {
            Pag<T> rst = new Pag<T>();
            rst.Items = list;
            rst.Total = total;
            return rst;
        }

        public static Pag<object> GetPagList(object obj, int start, int limit)
        {
            List<object> list = new List<object>();
            for (int i = 0; i < limit; i++)
            {
                list.Add(obj);
            }
            return PagHelper.CreatePag(list, limit * 3 - 2);

        }


        public static Pag<T> PagList<T>(IEnumerable<T> list, int total)
        {
            Pag<T> rst = new Pag<T>();
            rst.Items = list;
            rst.Total = total;
            return rst;
        }

        public static Pag<T> CreatPagList<T>(IOrderedEnumerable<T> list, int start, int limit)
        {
            Pag<T> rst = new Pag<T>();
            int total = list.Count();
            var rlist = list.Skip(start).Take(limit).ToList();
            rst.Items = rlist;
            rst.Total = total;
            return rst;
        }

    }


}
