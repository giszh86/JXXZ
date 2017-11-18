using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model
{
    public class CaseSourceComparer : IEqualityComparer<Case_CaseSourcesModel>
    {
        public bool Equals(Case_CaseSourcesModel x,Case_CaseSourcesModel y)
        {
            if (Object.ReferenceEquals(x, y)) return true;
            if (Object.ReferenceEquals(x, null) || Object.ReferenceEquals(y, null))
                return false;  
            return x.caseid == y.caseid;
        }

        public int GetHashCode(Case_CaseSourcesModel model)
        {
            if (Object.ReferenceEquals(model, null)) return 0;
            int hashStudentName = (int?)model.caseid == null ? 0 : model.caseid.GetHashCode();
            return hashStudentName;
        }  
    }

    public class CaseSimpleComparer : IEqualityComparer<Case_SimpleCasesModel>
    {
        public bool Equals(Case_SimpleCasesModel x, Case_SimpleCasesModel y)
        {
            if (Object.ReferenceEquals(x, y)) return true;
            if (Object.ReferenceEquals(x, null) || Object.ReferenceEquals(y, null))
                return false;
            return x.simpleid == y.simpleid;
        }

        public int GetHashCode(Case_SimpleCasesModel model)
        {
            if (Object.ReferenceEquals(model, null)) return 0;
            int hashStudentName = (int?)model.simpleid == null ? 0 : model.simpleid.GetHashCode();
            return hashStudentName;
        }
    }
}
