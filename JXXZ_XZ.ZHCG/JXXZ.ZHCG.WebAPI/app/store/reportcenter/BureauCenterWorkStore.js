Ext.define('TianZun.store.reportcenter.BureauCenterWorkStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.BureauCenterWorkModel',
    groupField: 'project',
    sortInfo: {
        field: 'projectId',
        direction: "ASC"
    },
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/GetBureauCenterWork',
    },
    remoteSort: true,
    autoLoad: true
    //data: [
    //     {
    //         projectId: 1, project: '当季', taskId: 101, name: '新城中队',
    //         xmsj: '当季', cdzfry: 0, czczmj: 0, czccmj: 0, czla: 0, czja: 0, czsjsjfmk: 0, czxzccmj: 0, czzsmj: 0, kzzfcs: 0, zlxqzgtzs: 0, qlczmj: 0, qlczsl: 0, xccs: 0, fxzghdwt: 0, gmczf: 0, shzf: 0, jgcsljfs: 0,
    //         dlczzwt: 0, dlla: '', dlsjsjfmk: '', ccyyczzwt: '', cccztsjb: '', ccyyla: '', ccsjsjfmk: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //     },
    //            {
    //                projectId: 1, project: '当季', taskId: 101, name: '高照中队',
    //                xmsj: '当季', cdzfry: 0, czczmj: 0, czccmj: 0, czla: 0, czja: 0, czsjsjfmk: 0, czxzccmj: 0, czzsmj: 0, kzzfcs: 0, zlxqzgtzs: 0, qlczmj: 0, qlczsl: 0, xccs: 0, fxzghdwt: 0, gmczf: 0, shzf: 0, jgcsljfs: 0,
    //                dlczzwt: 0, dlla: '', dlsjsjfmk: '', ccyyczzwt: '', cccztsjb: '', ccyyla: '', ccsjsjfmk: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当季', taskId: 102, name: '洪合中队',
    //                xmsj: '当季', cdzfry: 0, czczmj: 0, czccmj: 0, czla: 0, czja: 0, czsjsjfmk: 0, czxzccmj: 0, czzsmj: 0, kzzfcs: 0, zlxqzgtzs: 0, qlczmj: 0, qlczsl: 0, xccs: 0, fxzghdwt: 0, gmczf: 0, shzf: 0, jgcsljfs: 0,
    //                dlczzwt: 0, dlla: '', dlsjsjfmk: '', ccyyczzwt: '', cccztsjb: '', ccyyla: '', ccsjsjfmk: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当季', taskId: 103, name: '新塍中队',
    //                xmsj: '当季', cdzfry: 0, czczmj: 0, czccmj: 0, czla: 0, czja: 0, czsjsjfmk: 0, czxzccmj: 0, czzsmj: 0, kzzfcs: 0, zlxqzgtzs: 0, qlczmj: 0, qlczsl: 0, xccs: 0, fxzghdwt: 0, gmczf: 0, shzf: 0, jgcsljfs: 0,
    //                dlczzwt: 0, dlla: '', dlsjsjfmk: '', ccyyczzwt: '', cccztsjb: '', ccyyla: '', ccsjsjfmk: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当季', taskId: 104, name: '王江泾中队',
    //                xmsj: '当季', cdzfry: 0, czczmj: 0, czccmj: 0, czla: 0, czja: 0, czsjsjfmk: 0, czxzccmj: 0, czzsmj: 0, kzzfcs: 0, zlxqzgtzs: 0, qlczmj: 0, qlczsl: 0, xccs: 0, fxzghdwt: 0, gmczf: 0, shzf: 0, jgcsljfs: 0,
    //                dlczzwt: 0, dlla: '', dlsjsjfmk: '', ccyyczzwt: '', cccztsjb: '', ccyyla: '', ccsjsjfmk: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当季', taskId: 105, name: '油车港中队',
    //                xmsj: '当季', cdzfry: 0, czczmj: 0, czccmj: 0, czla: 0, czja: 0, czsjsjfmk: 0, czxzccmj: 0, czzsmj: 0, kzzfcs: 0, zlxqzgtzs: 0, qlczmj: 0, qlczsl: 0, xccs: 0, fxzghdwt: 0, gmczf: 0, shzf: 0, jgcsljfs: 0,
    //                dlczzwt: 0, dlla: '', dlsjsjfmk: '', ccyyczzwt: '', cccztsjb: '', ccyyla: '', ccsjsjfmk: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 106, name: '新城中队',
    //                xmsj: '累计', cdzfry: 0, czczmj: 0, czccmj: 0, czla: 0, czja: 0, czsjsjfmk: 0, czxzccmj: 0, czzsmj: 0, kzzfcs: 0, zlxqzgtzs: 0, qlczmj: 0, qlczsl: 0, xccs: 0, fxzghdwt: 0, gmczf: 0, shzf: 0, jgcsljfs: 0,
    //                dlczzwt: 0, dlla: '', dlsjsjfmk: '', ccyyczzwt: '', cccztsjb: '', ccyyla: '', ccsjsjfmk: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 107, name: '高照中队',
    //                xmsj: '累计', cdzfry: 0, czczmj: 0, czccmj: 0, czla: 0, czja: 0, czsjsjfmk: 0, czxzccmj: 0, czzsmj: 0, kzzfcs: 0, zlxqzgtzs: 0, qlczmj: 0, qlczsl: 0, xccs: 0, fxzghdwt: 0, gmczf: 0, shzf: 0, jgcsljfs: 0,
    //                dlczzwt: 0, dlla: '', dlsjsjfmk: '', ccyyczzwt: '', cccztsjb: '', ccyyla: '', ccsjsjfmk: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 108, name: '洪合中队',
    //                xmsj: '累计', cdzfry: 0, czczmj: 0, czccmj: 0, czla: 0, czja: 0, czsjsjfmk: 0, czxzccmj: 0, czzsmj: 0, kzzfcs: 0, zlxqzgtzs: 0, qlczmj: 0, qlczsl: 0, xccs: 0, fxzghdwt: 0, gmczf: 0, shzf: 0, jgcsljfs: 0,
    //                dlczzwt: 0, dlla: '', dlsjsjfmk: '', ccyyczzwt: '', cccztsjb: '', ccyyla: '', ccsjsjfmk: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 109, name: '新塍中队',
    //                xmsj: '累计', cdzfry: 0, czczmj: 0, czccmj: 0, czla: 0, czja: 0, czsjsjfmk: 0, czxzccmj: 0, czzsmj: 0, kzzfcs: 0, zlxqzgtzs: 0, qlczmj: 0, qlczsl: 0, xccs: 0, fxzghdwt: 0, gmczf: 0, shzf: 0, jgcsljfs: 0,
    //                dlczzwt: 0, dlla: '', dlsjsjfmk: '', ccyyczzwt: '', cccztsjb: '', ccyyla: '', ccsjsjfmk: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 110, name: '王江泾中队',
    //                xmsj: '累计', cdzfry: 0, czczmj: 0, czccmj: 0, czla: 0, czja: 0, czsjsjfmk: 0, czxzccmj: 0, czzsmj: 0, kzzfcs: 0, zlxqzgtzs: 0, qlczmj: 0, qlczsl: 0, xccs: 0, fxzghdwt: 0, gmczf: 0, shzf: 0, jgcsljfs: 0,
    //                dlczzwt: 0, dlla: '', dlsjsjfmk: '', ccyyczzwt: '', cccztsjb: '', ccyyla: '', ccsjsjfmk: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 111, name: '油车港中队',
    //                xmsj: '累计', cdzfry: 0, czczmj: 0, czccmj: 0, czla: 0, czja: 0, czsjsjfmk: 0, czxzccmj: 0, czzsmj: 0, kzzfcs: 0, zlxqzgtzs: 0, qlczmj: 0, qlczsl: 0, xccs: 0, fxzghdwt: 0, gmczf: 0, shzf: 0, jgcsljfs: 0,
    //                dlczzwt: 0, dlla: '', dlsjsjfmk: '', ccyyczzwt: '', cccztsjb: '', ccyyla: '', ccsjsjfmk: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //]
})