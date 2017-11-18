using JXXZ.ZHCG.BLL.LowLyingBLL;
using JXXZ.ZHCG.Model.LowLyingModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.LowLying
{
    public class LowLying
    {
        private LowLyingBLL llbll = new LowLyingBLL();
        public void LowLyingPolice()
        {
            LowLyingModel llmodel = new LowLyingModel();
            LowLyingOldModel llomodel = new LowLyingOldModel();

            List<glxxModel> glxxlist = llbll.GetGlxxList();
            foreach (var glxxitem in glxxlist)
            {
                List<glxxModel> glxxChildrenlist = llbll.getGlxxChildren(glxxitem.id);
                foreach (var sbxxitem in glxxChildrenlist)
                {
                    List<sbxxModel> getSbxxList = llbll.getSbxxList(sbxxitem.id);
                    foreach (var lsjltemp in getSbxxList)
                    {
                        LowLyingModel model = llbll.GetLowLyingModel(lsjltemp.id);
                        if (model != null)
                        {
                            model.id = lsjltemp.id;
                            model.jkdmc = lsjltemp.name;
                            model.zt = lsjltemp.isenabled == "是" ? "启用" : "未启用";
                            model.whdw = glxxitem.name;
                            model.whry = "";
                            model.dz = sbxxitem.name;
                            llbll.Edit(model);
                            lsjlModel getOldRecordingList = llbll.getOldRecordingList(lsjltemp.id);
                            llomodel.lowid = lsjltemp.id;
                            llomodel.bjz = getOldRecordingList.waterlevel.ToString();
                            llomodel.bjljz = model.bjljz;
                            llomodel.cjsj = getOldRecordingList.recordingtime;
                            llomodel.clqk = "";
                            decimal bjljz = Convert.ToDecimal(model.bjljz);
                            if (bjljz > getOldRecordingList.waterlevel)
                                llomodel.sfbj = 0;
                            else
                                llomodel.sfbj = 1;
                            llbll.AddPolice(llomodel);
                        }
                        else
                        {

                            llmodel.id = lsjltemp.id;
                            llmodel.jkdmc = lsjltemp.name;
                            llmodel.zt = lsjltemp.isenabled == "是" ? "启用" : "未启用";
                            llmodel.whdw = glxxitem.name;
                            llmodel.whry = "";
                            llmodel.bjljz = "0";
                            llmodel.dz = sbxxitem.name;
                            llbll.Add(llmodel);
                        }


                    }

                }

            }


        }
    }
}
