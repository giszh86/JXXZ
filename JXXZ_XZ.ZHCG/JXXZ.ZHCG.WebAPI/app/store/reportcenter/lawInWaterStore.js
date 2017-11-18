Ext.define('TianZun.store.reportcenter.lawInWaterStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.lawInWaterModel',
    groupField: 'project',
    sortInfo: {
        field: 'projectId',
        direction: "ASC"
    },
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/GetLawInWater',
    },
    remoteSort: true,
    autoLoad: true,
    //data: [
    //     {
    //         projectId: 1, project: '当月', taskId: 101, name: '新城中队',
    //         xmsj: '当月', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, zlxqzgtzs: 0, fxsswt: 0, wczgsswt: 0, jsys: 0, jcfx: 0, tsjb: 0, zlas: 0, jsfaxhdjzw: 0, hdfqw: 0, pslj: 0, ncgsl: 0, csgsl: 0, psywscll: 0, jas: 0,
    //         sjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //     },
    //            {
    //                projectId: 1, project: '当月', taskId: 101, name: '高照中队',
    //                xmsj: '当月', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, zlxqzgtzs: 0, fxsswt: 0, wczgsswt: 0, jsys: 0, jcfx: 0, tsjb: 0, zlas: 0, jsfaxhdjzw: 0, hdfqw: 0, pslj: 0, ncgsl: 0, csgsl: 0, psywscll: 0, jas: 0,
    //                sjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当月', taskId: 102, name: '洪合中队',
    //                xmsj: '当月', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, zlxqzgtzs: 0, fxsswt: 0, wczgsswt: 0, jsys: 0, jcfx: 0, tsjb: 0, zlas: 0, jsfaxhdjzw: 0, hdfqw: 0, pslj: 0, ncgsl: 0, csgsl: 0, psywscll: 0, jas: 0,
    //                sjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当月', taskId: 103, name: '新塍中队',
    //                xmsj: '当月', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, zlxqzgtzs: 0, fxsswt: 0, wczgsswt: 0, jsys: 0, jcfx: 0, tsjb: 0, zlas: 0, jsfaxhdjzw: 0, hdfqw: 0, pslj: 0, ncgsl: 0, csgsl: 0, psywscll: 0, jas: 0,
    //                sjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当月', taskId: 104, name: '王江泾中队',
    //                xmsj: '当月', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, zlxqzgtzs: 0, fxsswt: 0, wczgsswt: 0, jsys: 0, jcfx: 0, tsjb: 0, zlas: 0, jsfaxhdjzw: 0, hdfqw: 0, pslj: 0, ncgsl: 0, csgsl: 0, psywscll: 0, jas: 0,
    //                sjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当月', taskId: 105, name: '油车港中队',
    //                xmsj: '当月', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, zlxqzgtzs: 0, fxsswt: 0, wczgsswt: 0, jsys: 0, jcfx: 0, tsjb: 0, zlas: 0, jsfaxhdjzw: 0, hdfqw: 0, pslj: 0, ncgsl: 0, csgsl: 0, psywscll: 0, jas: 0,
    //                sjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 106, name: '新城中队',
    //                xmsj: '累计', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, zlxqzgtzs: 0, fxsswt: 0, wczgsswt: 0, jsys: 0, jcfx: 0, tsjb: 0, zlas: 0, jsfaxhdjzw: 0, hdfqw: 0, pslj: 0, ncgsl: 0, csgsl: 0, psywscll: 0, jas: 0,
    //                sjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 107, name: '高照中队',
    //                xmsj: '累计', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, zlxqzgtzs: 0, fxsswt: 0, wczgsswt: 0, jsys: 0, jcfx: 0, tsjb: 0, zlas: 0, jsfaxhdjzw: 0, hdfqw: 0, pslj: 0, ncgsl: 0, csgsl: 0, psywscll: 0, jas: 0,
    //                sjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 108, name: '洪合中队',
    //                xmsj: '累计', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, zlxqzgtzs: 0, fxsswt: 0, wczgsswt: 0, jsys: 0, jcfx: 0, tsjb: 0, zlas: 0, jsfaxhdjzw: 0, hdfqw: 0, pslj: 0, ncgsl: 0, csgsl: 0, psywscll: 0, jas: 0,
    //                sjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 109, name: '新塍中队',
    //                xmsj: '累计', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, zlxqzgtzs: 0, fxsswt: 0, wczgsswt: 0, jsys: 0, jcfx: 0, tsjb: 0, zlas: 0, jsfaxhdjzw: 0, hdfqw: 0, pslj: 0, ncgsl: 0, csgsl: 0, psywscll: 0, jas: 0,
    //                sjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 110, name: '王江泾中队',
    //                xmsj: '累计', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, zlxqzgtzs: 0, fxsswt: 0, wczgsswt: 0, jsys: 0, jcfx: 0, tsjb: 0, zlas: 0, jsfaxhdjzw: 0, hdfqw: 0, pslj: 0, ncgsl: 0, csgsl: 0, psywscll: 0, jas: 0,
    //                sjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 111, name: '油车港中队',
    //                xmsj: '累计', cdzfry: 0, cdzfcl: 0, kzzfxccs: 0, zlxqzgtzs: 0, fxsswt: 0, wczgsswt: 0, jsys: 0, jcfx: 0, tsjb: 0, zlas: 0, jsfaxhdjzw: 0, hdfqw: 0, pslj: 0, ncgsl: 0, csgsl: 0, psywscll: 0, jas: 0,
    //                sjsjfmk: 0, zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //]
})