using JXXZ.ZHCG.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace JXXZ.ZHCG.WebAPI.Attributes
{
    public class LoggingFilterAttribute : ActionFilterAttribute
    {
        // 方法执行时记录日志
        public override void OnActionExecuting(HttpActionContext filterContext)
        {
            string uri = filterContext.Request.RequestUri.ToString();

            string param = "";
            foreach (var item in filterContext.ActionArguments)
            {
                param += string.Format("{0}:{1},", item.Key, item.Value);
            }

            string message = string.Format("访问地址：{0}参数：{1}", uri, param);

            LogHelper.WriteInfo(message);
        }

        // 捕捉异常日志
        public override void OnActionExecuted(HttpActionExecutedContext filterContext)
        {
            if (filterContext.Exception == null)
            {
                return;
            }
            else
            {
                Exception ex = filterContext.Exception;
                LogHelper.WriteErrorInfo(ex);
            }
        }
    }
}