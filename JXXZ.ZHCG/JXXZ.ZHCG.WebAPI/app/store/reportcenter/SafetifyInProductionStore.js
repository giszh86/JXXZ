Ext.define('TianZun.store.reportcenter.SafetifyInProductionStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.SafetifyInProductionModel',

    groupField: 'project',
    sortInfo: {
        field: 'projectId',
        direction: "ASC"
    },
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/GetSafetifyinProductionReport',
    },
    remoteSort: true,
    autoLoad: true




 //   data: [
 //        {
 //            projectId: 1, project: '当月', taskId: 101, name: '新城中队',
 //            xmsj: '当月', cdzfry: 0, jcscjydw: 0, fxaqyh: 0, wczgaqyh: 0, xcjcjl: 0, zlxqzgzls: 0, xcclcsjds: 0, zgfcyjs: 0, jsys: 0, jcfx: 0, xswy: 0, la: 0, ja: 0,jg:0, sjsjfmk: 0, tctyzd: 0, tqgb: 0,
 //zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
 //        },
 //               {
 //                   projectId: 1, project: '当月', taskId: 101, name: '高照中队',
 //                   xmsj: '当月', cdzfry: 0, jcscjydw: 0, fxaqyh: 0, wczgaqyh: 0, xcjcjl: 0, zlxqzgzls: 0, xcclcsjds: 0, zgfcyjs: 0, jsys: 0, jcfx: 0, xswy: 0, la: 0, ja: 0, jg: 0, sjsjfmk: 0, tctyzd: 0, tqgb: 0,
 //                   zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
 //               },
 //               {
 //                   projectId: 1, project: '当月', taskId: 102, name: '洪合中队',
 //                   xmsj: '当月', cdzfry: 0, jcscjydw: 0, fxaqyh: 0, wczgaqyh: 0, xcjcjl: 0, zlxqzgzls: 0, xcclcsjds: 0, zgfcyjs: 0, jsys: 0, jcfx: 0, xswy: 0, la: 0, ja: 0, jg: 0, sjsjfmk: 0, tctyzd: 0, tqgb: 0,
 //                   zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
 //               },
 //               {
 //                   projectId: 1, project: '当月', taskId: 103, name: '新塍中队',
 //                   xmsj: '当月', cdzfry: 0, jcscjydw: 0, fxaqyh: 0, wczgaqyh: 0, xcjcjl: 0, zlxqzgzls: 0, xcclcsjds: 0, zgfcyjs: 0, jsys: 0, jcfx: 0, xswy: 0, la: 0, ja: 0, jg: 0, sjsjfmk: 0, tctyzd: 0, tqgb: 0,
 //                   zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
 //               },
 //               {
 //                   projectId: 1, project: '当月', taskId: 104, name: '王江泾中队',
 //                   xmsj: '当月', cdzfry: 0, jcscjydw: 0, fxaqyh: 0, wczgaqyh: 0, xcjcjl: 0, zlxqzgzls: 0, xcclcsjds: 0, zgfcyjs: 0, jsys: 0, jcfx: 0, xswy: 0, la: 0, ja: 0, jg: 0, sjsjfmk: 0, tctyzd: 0, tqgb: 0,
 //                   zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
 //               },
 //               {
 //                   projectId: 1, project: '当月', taskId: 105, name: '油车港中队',
 //                   xmsj: '当月', cdzfry: 0, jcscjydw: 0, fxaqyh: 0, wczgaqyh: 0, xcjcjl: 0, zlxqzgzls: 0, xcclcsjds: 0, zgfcyjs: 0, jsys: 0, jcfx: 0, xswy: 0, la: 0, ja: 0, jg: 0, sjsjfmk: 0, tctyzd: 0, tqgb: 0,
 //                   zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
 //               },
 //               {
 //                   projectId: 2, project: '累计', taskId: 106, name: '新城中队',
 //                   xmsj: '累计', cdzfry: 0, jcscjydw: 0, fxaqyh: 0, wczgaqyh: 0, xcjcjl: 0, zlxqzgzls: 0, xcclcsjds: 0, zgfcyjs: 0, jsys: 0, jcfx: 0, xswy: 0, la: 0, ja: 0, jg: 0, sjsjfmk: 0, tctyzd: 0, tqgb: 0,
 //                   zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
 //               },
 //               {
 //                   projectId: 2, project: '累计', taskId: 107, name: '高照中队',
 //                   xmsj: '累计', cdzfry: 0, jcscjydw: 0, fxaqyh: 0, wczgaqyh: 0, xcjcjl: 0, zlxqzgzls: 0, xcclcsjds: 0, zgfcyjs: 0, jsys: 0, jcfx: 0, xswy: 0, la: 0, ja: 0, jg: 0, sjsjfmk: 0, tctyzd: 0, tqgb: 0,
 //                   zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
 //               },
 //               {
 //                   projectId: 2, project: '累计', taskId: 108, name: '洪合中队',
 //                   xmsj: '累计', cdzfry: 0, jcscjydw: 0, fxaqyh: 0, wczgaqyh: 0, xcjcjl: 0, zlxqzgzls: 0, xcclcsjds: 0, zgfcyjs: 0, jsys: 0, jcfx: 0, xswy: 0, la: 0, ja: 0, jg: 0, sjsjfmk: 0, tctyzd: 0, tqgb: 0,
 //                   zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
 //               },
 //               {
 //                   projectId: 2, project: '累计', taskId: 109, name: '新塍中队',
 //                   xmsj: '累计', cdzfry: 0, jcscjydw: 0, fxaqyh: 0, wczgaqyh: 0, xcjcjl: 0, zlxqzgzls: 0, xcclcsjds: 0, zgfcyjs: 0, jsys: 0, jcfx: 0, xswy: 0, la: 0, ja: 0, jg: 0, sjsjfmk: 0, tctyzd: 0, tqgb: 0,
 //                   zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
 //               },
 //               {
 //                   projectId: 2, project: '累计', taskId: 110, name: '王江泾中队',
 //                   xmsj: '累计', cdzfry: 0, jcscjydw: 0, fxaqyh: 0, wczgaqyh: 0, xcjcjl: 0, zlxqzgzls: 0, xcclcsjds: 0, zgfcyjs: 0, jsys: 0, jcfx: 0, xswy: 0, la: 0, ja: 0, jg: 0, sjsjfmk: 0, tctyzd: 0, tqgb: 0,
 //                   zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
 //               },
 //               {
 //                   projectId: 2, project: '累计', taskId: 111, name: '油车港中队',
 //                   xmsj: '累计', cdzfry: 0, jcscjydw: 0, fxaqyh: 0, wczgaqyh: 0, xcjcjl: 0, zlxqzgzls: 0, xcclcsjds: 0, zgfcyjs: 0, jsys: 0, jcfx: 0, xswy: 0, la: 0, ja: 0, jg: 0, sjsjfmk: 0, tctyzd: 0, tqgb: 0,
 //                   zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
 //               },
 //   ]
})