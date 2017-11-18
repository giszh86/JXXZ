Ext.define('TianZun.store.reportcenter.H7N7controlWorkStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.H7N7controlWorkModel',
    groupField: 'project',
    sortInfo: {
        field: 'projectId',
        direction: "ASC"
    },
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/GetH7N7Report',
    },
    remoteSort: true,
    autoLoad: true,
    //data: [
    //            {
    //                projectId: 1, project: '乡镇', taskId: 101, unitname: '王店镇',
    //                xccs: 0, cdry: 0, cdcl: 0, ffxczl: 0, qlhqjy: 0, cchqjy: 0, czhqsl: 0, qt: '', drgzzf: '',
    //            },
    //            {
    //                projectId: 1, project: '乡镇', taskId: 102, unitname: '洪合镇',
    //                xccs: 0, cdry: 0, cdcl: 0, ffxczl: 0, qlhqjy: 0, cchqjy: 0, czhqsl: 0, qt: '', drgzzf: '',
    //            },
    //            {
    //                projectId: 1, project: '乡镇', taskId: 103, unitname: '新塍镇',
    //                xccs: 0, cdry: 0, cdcl: 0, ffxczl: 0, qlhqjy: 0, cchqjy: 0, czhqsl: 0, qt: '', drgzzf: '',
    //            },
    //            {
    //                projectId: 1, project: '乡镇', taskId: 104, unitname: '王江泾镇',
    //                xccs: 0, cdry: 0, cdcl: 0, ffxczl: 0, qlhqjy: 0, cchqjy: 0, czhqsl: 0, qt: '', drgzzf: '',
    //            },
    //            {
    //                projectId: 1, project: '乡镇', taskId: 105, unitname: '油车港镇',
    //                xccs: 0, cdry: 0, cdcl: 0, ffxczl: 0, qlhqjy: 0, cchqjy: 0, czhqsl: 0, qt: '', drgzzf: '',
    //            },
    //            {
    //                projectId: 2, project: '街道', taskId: 106, unitname: '新城镇',
    //                xccs: 0, cdry: 0, cdcl: 0, ffxczl: 0, qlhqjy: 0, cchqjy: 0, czhqsl: 0, qt: '', drgzzf: '',
    //            },
    //            {
    //                projectId: 2, project: '街道', taskId: 107, unitname: '高照镇',
    //                xccs: 0, cdry: 0, cdcl: 0, ffxczl: 0, qlhqjy: 0, cchqjy: 0, czhqsl: 0, qt: '', drgzzf: '',
    //            },
    //]
})