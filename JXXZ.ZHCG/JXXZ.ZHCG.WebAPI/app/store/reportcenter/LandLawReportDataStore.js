Ext.define('TianZun.store.reportcenter.LandLawReportDataStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.LandLawReportDataModel',
   
    groupField: 'project',
    sortInfo: {
        field: 'projectId',
        direction: "ASC"
    },
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/GetLandLawReport',
    },
    remoteSort: true,
    autoLoad: true


    //data: [
    //     {
    //         projectId: 1, project: '总数', taskId: 101, unitid: 11, name: '新城中队',
    //         classname: '总数', wfydajzjs: 0, gtbmyss: 0, zhzfbmslyss: 0, xdcfjdsjs: 0, sqqzzxjs: 0, lacczjs: 0, sazmj: 1.2, qzgdmj: 0, fkje: 0, msmj: 0, ccwfjzmj: 0, mswfsd: 0, tccfjy: 0, sjcf: 0, cfqt: 0, ysgajg: 0,
    //         cqqzcs: 0, zjxszr: 0, zjxszrqt: 0, yjajs: 0, wjazjs: 0, nysd: 0, yysd: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //     },
    //            {
    //                projectId: 1, project: '总数', taskId: 102, unitid: 12, name: '高照中队',
    //                classname: '总数', wfydajzjs: 0, gtbmyss: 0, zhzfbmslyss: 0, xdcfjdsjs: 0, sqqzzxjs: 0, lacczjs: 0, sazmj: 1.2, qzgdmj: 0, fkje: 0, msmj: 0, ccwfjzmj: 0, mswfsd: 0, tccfjy: 0, sjcf: 0, cfqt: 0, ysgajg: 0,
    //                cqqzcs: 0, zjxszr: 0, zjxszrqt: 0, yjajs: 0, wjazjs: 0, nysd: 0, yysd: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '总数', taskId: 103, unitid: 14, name: '洪合中队',
    //                classname: '总数', wfydajzjs: 0, gtbmyss: 0, zhzfbmslyss: 0, xdcfjdsjs: 0, sqqzzxjs: 0, lacczjs: 0, sazmj: 1.2, qzgdmj: 0, fkje: 0, msmj: 0, ccwfjzmj: 0, mswfsd: 0, tccfjy: 0, sjcf: 0, cfqt: 0, ysgajg: 0,
    //                cqqzcs: 0, zjxszr: 0, zjxszrqt: 0, yjajs: 0, wjazjs: 0, nysd: 0, yysd: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '总数', taskId: 104, unitid: 15, name: '新塍中队',
    //                classname: '总数', wfydajzjs: 0, gtbmyss: 0, zhzfbmslyss: 0, xdcfjdsjs: 0, sqqzzxjs: 0, lacczjs: 0, sazmj: 1.2, qzgdmj: 0, fkje: 0, msmj: 0, ccwfjzmj: 0, mswfsd: 0, tccfjy: 0, sjcf: 0, cfqt: 0, ysgajg: 0,
    //                cqqzcs: 0, zjxszr: 0, zjxszrqt: 0, yjajs: 0, wjazjs: 0, nysd: 0, yysd: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '总数', taskId: 105, unitid: 16, name: '王江泾中队',
    //                classname: '总数', wfydajzjs: 0, gtbmyss: 0, zhzfbmslyss: 0, xdcfjdsjs: 0, sqqzzxjs: 0, lacczjs: 0, sazmj: 1.2, qzgdmj: 0, fkje: 0, msmj: 0, ccwfjzmj: 0, mswfsd: 0, tccfjy: 0, sjcf: 0, cfqt: 0, ysgajg: 0,
    //                cqqzcs: 0, zjxszr: 0, zjxszrqt: 0, yjajs: 0, wjazjs: 0, nysd: 0, yysd: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '总数', taskId: 106, unitid: 17, name: '油车港中队',
    //                classname: '总数', wfydajzjs: 0, gtbmyss: 0, zhzfbmslyss: 0, xdcfjdsjs: 0, sqqzzxjs: 0, lacczjs: 0, sazmj: 1.2, qzgdmj: 0, fkje: 0, msmj: 0, ccwfjzmj: 0, mswfsd: 0, tccfjy: 0, sjcf: 0, cfqt: 0, ysgajg: 0,
    //                cqqzcs: 0, zjxszr: 0, zjxszrqt: 0, yjajs: 0, wjazjs: 0, nysd: 0, yysd: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '卫片', taskId: 107, unitid: 11, name: '新城中队',
    //                classname: '卫片', wfydajzjs: 0, gtbmyss: 0, zhzfbmslyss: 0, xdcfjdsjs: 0, sqqzzxjs: 0, lacczjs: 0, sazmj: 1.2, qzgdmj: 0, fkje: 0, msmj: 0, ccwfjzmj: 0, mswfsd: 0, tccfjy: 0, sjcf: 0, cfqt: 0, ysgajg: 0,
    //                cqqzcs: 0, zjxszr: 0, zjxszrqt: 0, yjajs: 0, wjazjs: 0, nysd: 0, yysd: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '卫片', taskId: 108, unitid: 12, name: '高照中队',
    //                classname: '卫片', wfydajzjs: 0, gtbmyss: 0, zhzfbmslyss: 0, xdcfjdsjs: 0, sqqzzxjs: 0, lacczjs: 0, sazmj: 1.2, qzgdmj: 0, fkje: 0, msmj: 0, ccwfjzmj: 0, mswfsd: 0, tccfjy: 0, sjcf: 0, cfqt: 0, ysgajg: 0,
    //                cqqzcs: 0, zjxszr: 0, zjxszrqt: 0, yjajs: 0, wjazjs: 0, nysd: 0, yysd: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '卫片', taskId: 109, unitid: 14, name: '洪合中队',
    //                classname: '卫片', wfydajzjs: 0, gtbmyss: 0, zhzfbmslyss: 0, xdcfjdsjs: 0, sqqzzxjs: 0, lacczjs: 0, sazmj: 1.2, qzgdmj: 0, fkje: 0, msmj: 0, ccwfjzmj: 0, mswfsd: 0, tccfjy: 0, sjcf: 0, cfqt: 0, ysgajg: 0,
    //                cqqzcs: 0, zjxszr: 0, zjxszrqt: 0, yjajs: 0, wjazjs: 0, nysd: 0, yysd: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '卫片', taskId: 110, unitid: 15, name: '新塍中队',
    //                classname: '卫片', wfydajzjs: 0, gtbmyss: 0, zhzfbmslyss: 0, xdcfjdsjs: 0, sqqzzxjs: 0, lacczjs: 0, sazmj: 1.2, qzgdmj: 0, fkje: 0, msmj: 0, ccwfjzmj: 0, mswfsd: 0, tccfjy: 0, sjcf: 0, cfqt: 0, ysgajg: 0,
    //                cqqzcs: 0, zjxszr: 0, zjxszrqt: 0, yjajs: 0, wjazjs: 0, nysd: 0, yysd: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '卫片', taskId: 111, unitid: 16, name: '王江泾中队',
    //                classname: '卫片', wfydajzjs: 0, gtbmyss: 0, zhzfbmslyss: 0, xdcfjdsjs: 0, sqqzzxjs: 0, lacczjs: 0, sazmj: 1.2, qzgdmj: 0, fkje: 0, msmj: 0, ccwfjzmj: 0, mswfsd: 0, tccfjy: 0, sjcf: 0, cfqt: 0, ysgajg: 0,
    //                cqqzcs: 0, zjxszr: 0, zjxszrqt: 0, yjajs: 0, wjazjs: 0, nysd: 0, yysd: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '卫片', taskId: 112, unitid: 17, name: '油车港中队',
    //                classname: '卫片', wfydajzjs: 0, gtbmyss: 0, zhzfbmslyss: 0, xdcfjdsjs: 0, sqqzzxjs: 0, lacczjs: 0, sazmj: 1.2, qzgdmj: 0, fkje: 0, msmj: 0, ccwfjzmj: 0, mswfsd: 0, tccfjy: 0, sjcf: 0, cfqt: 0, ysgajg: 0,
    //                cqqzcs: 0, zjxszr: 0, zjxszrqt: 0, yjajs: 0, wjazjs: 0, nysd: 0, yysd: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //]
})