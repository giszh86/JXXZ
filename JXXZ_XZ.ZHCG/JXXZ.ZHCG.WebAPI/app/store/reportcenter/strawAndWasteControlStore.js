Ext.define('TianZun.store.reportcenter.strawAndWasteControlStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.strawAndWasteControlModel',
    groupField: 'project',
    sortInfo: {
        field: 'projectId',
        direction: "ASC"
    },
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/GetStrawAndWasteControlReport',
    },
    remoteSort: true,
    autoLoad: true





    //data: [
    //     {
    //         projectId: 1, project: '当月', taskId: 101, name: '新城中队',
    //         xmsj: '当月', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, kzzfdccs: 0, kzzfxccs: 0, fxczmhd: 0, ghmj: 0, fxysjtd: 0, fxczs: 0, ltfsjgla: 0, ltfsjgja: 0, ltfsjgsjsjfk: 0, nyjyla: 0, nyjyja: 0, nyjysjsjfmk: 0, fscsljla: 0, fscsljja: 0,
    //         fscsljsjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //     },
    //            {
    //                projectId: 1, project: '当月', taskId: 101, name: '高照中队',
    //                xmsj: '当月', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, kzzfdccs: 0, kzzfxccs: 0, fxczmhd: 0, ghmj: 0, fxysjtd: 0, fxczs: 0, ltfsjgla: 0, ltfsjgja: 0, ltfsjgsjsjfk: 0, nyjyla: 0, nyjyja: 0, nyjysjsjfmk: 0, fscsljla: 0, fscsljja: 0,
    //                fscsljsjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当月', taskId: 102, name: '洪合中队',
    //                xmsj: '当月', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, kzzfdccs: 0, kzzfxccs: 0, fxczmhd: 0, ghmj: 0, fxysjtd: 0, fxczs: 0, ltfsjgla: 0, ltfsjgja: 0, ltfsjgsjsjfk: 0, nyjyla: 0, nyjyja: 0, nyjysjsjfmk: 0, fscsljla: 0, fscsljja: 0,
    //                fscsljsjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当月', taskId: 103, name: '新塍中队',
    //                xmsj: '当月', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, kzzfdccs: 0, kzzfxccs: 0, fxczmhd: 0, ghmj: 0, fxysjtd: 0, fxczs: 0, ltfsjgla: 0, ltfsjgja: 0, ltfsjgsjsjfk: 0, nyjyla: 0, nyjyja: 0, nyjysjsjfmk: 0, fscsljla: 0, fscsljja: 0,
    //                fscsljsjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当月', taskId: 104, name: '王江泾中队',
    //                xmsj: '当月', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, kzzfdccs: 0, kzzfxccs: 0, fxczmhd: 0, ghmj: 0, fxysjtd: 0, fxczs: 0, ltfsjgla: 0, ltfsjgja: 0, ltfsjgsjsjfk: 0, nyjyla: 0, nyjyja: 0, nyjysjsjfmk: 0, fscsljla: 0, fscsljja: 0,
    //                fscsljsjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当月', taskId: 105, name: '油车港中队',
    //                xmsj: '当月', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, kzzfdccs: 0, kzzfxccs: 0, fxczmhd: 0, ghmj: 0, fxysjtd: 0, fxczs: 0, ltfsjgla: 0, ltfsjgja: 0, ltfsjgsjsjfk: 0, nyjyla: 0, nyjyja: 0, nyjysjsjfmk: 0, fscsljla: 0, fscsljja: 0,
    //                fscsljsjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 106, name: '新城中队',
    //                xmsj: '累计', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, kzzfdccs: 0, kzzfxccs: 0, fxczmhd: 0, ghmj: 0, fxysjtd: 0, fxczs: 0, ltfsjgla: 0, ltfsjgja: 0, ltfsjgsjsjfk: 0, nyjyla: 0, nyjyja: 0, nyjysjsjfmk: 0, fscsljla: 0, fscsljja: 0,
    //                fscsljsjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 107, name: '高照中队',
    //                xmsj: '累计', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, kzzfdccs: 0, kzzfxccs: 0, fxczmhd: 0, ghmj: 0, fxysjtd: 0, fxczs: 0, ltfsjgla: 0, ltfsjgja: 0, ltfsjgsjsjfk: 0, nyjyla: 0, nyjyja: 0, nyjysjsjfmk: 0, fscsljla: 0, fscsljja: 0,
    //                fscsljsjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 108, name: '洪合中队',
    //                xmsj: '累计', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, kzzfdccs: 0, kzzfxccs: 0, fxczmhd: 0, ghmj: 0, fxysjtd: 0, fxczs: 0, ltfsjgla: 0, ltfsjgja: 0, ltfsjgsjsjfk: 0, nyjyla: 0, nyjyja: 0, nyjysjsjfmk: 0, fscsljla: 0, fscsljja: 0,
    //                fscsljsjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 109, name: '新塍中队',
    //                xmsj: '累计', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, kzzfdccs: 0, kzzfxccs: 0, fxczmhd: 0, ghmj: 0, fxysjtd: 0, fxczs: 0, ltfsjgla: 0, ltfsjgja: 0, ltfsjgsjsjfk: 0, nyjyla: 0, nyjyja: 0, nyjysjsjfmk: 0, fscsljla: 0, fscsljja: 0,
    //                fscsljsjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 110, name: '王江泾中队',
    //                xmsj: '累计', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, kzzfdccs: 0, kzzfxccs: 0, fxczmhd: 0, ghmj: 0, fxysjtd: 0, fxczs: 0, ltfsjgla: 0, ltfsjgja: 0, ltfsjgsjsjfk: 0, nyjyla: 0, nyjyja: 0, nyjysjsjfmk: 0, fscsljla: 0, fscsljja: 0,
    //                fscsljsjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 111, name: '油车港中队',
    //                xmsj: '累计', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, kzzfdccs: 0, kzzfxccs: 0, fxczmhd: 0, ghmj: 0, fxysjtd: 0, fxczs: 0, ltfsjgla: 0, ltfsjgja: 0, ltfsjgsjsjfk: 0, nyjyla: 0, nyjyja: 0, nyjysjsjfmk: 0, fscsljla: 0, fscsljja: 0,
    //                fscsljsjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //]
})