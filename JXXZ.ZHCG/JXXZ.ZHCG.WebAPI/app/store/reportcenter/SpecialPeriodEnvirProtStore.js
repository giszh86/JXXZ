Ext.define('TianZun.store.reportcenter.SpecialPeriodEnvirProtStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.SpecialPeriodEnvirProtModel',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/GetSpecialReport',
    },
    remoteSort: true,
    autoLoad: true,
    //data: [
    //     {
    //         projectId: 1, project: '', taskId: 101, unitname: '新城中队',
    //         dccs: 0, cdrs: 0, cdcc: 0, fxs: 0, zgwcs: 0, xzzf: 0, fkje: 0, ffxcgzs: 0, ghzmj: 0, zgzmj: 0, wzqyjzlj: 0, wagdsjqyjzlj: 0, syqdjzlj: 0, gdzbcsctfy: 0, fkjey: 0, zg: 0, qd: 0,
    //     },
    //            {
    //                projectId: 1, project: '', taskId: 101, unitname: '高照中队',
    //                dccs: 0, cdrs: 0, cdcc: 0, fxs: 0, zgwcs: 0, xzzf: 0, fkje: 0, ffxcgzs: 0, ghzmj: 0, zgzmj: 0, wzqyjzlj: 0, wagdsjqyjzlj: 0, syqdjzlj: 0, gdzbcsctfy: 0, fkjey: 0, zg: 0, qd: 0,
    //            },
    //            {
    //                projectId: 1, project: '', taskId: 102, unitname: '洪合中队',
    //                dccs: 0, cdrs: 0, cdcc: 0, fxs: 0, zgwcs: 0, xzzf: 0, fkje: 0, ffxcgzs: 0, ghzmj: 0, zgzmj: 0, wzqyjzlj: 0, wagdsjqyjzlj: 0, syqdjzlj: 0, gdzbcsctfy: 0, fkjey: 0, zg: 0, qd: 0,
    //            },
    //            {
    //                projectId: 1, project: '', taskId: 103, unitname: '新塍中队',
    //                dccs: 0, cdrs: 0, cdcc: 0, fxs: 0, zgwcs: 0, xzzf: 0, fkje: 0, ffxcgzs: 0, ghzmj: 0, zgzmj: 0, wzqyjzlj: 0, wagdsjqyjzlj: 0, syqdjzlj: 0, gdzbcsctfy: 0, fkjey: 0, zg: 0, qd: 0,
    //            },
    //            {
    //                projectId: 1, project: '', taskId: 104, unitname: '王江泾中队',
    //                dccs: 0, cdrs: 0, cdcc: 0, fxs: 0, zgwcs: 0, xzzf: 0, fkje: 0, ffxcgzs: 0, ghzmj: 0, zgzmj: 0, wzqyjzlj: 0, wagdsjqyjzlj: 0, syqdjzlj: 0, gdzbcsctfy: 0, fkjey: 0, zg: 0, qd: 0,
    //            },
    //            {
    //                projectId: 1, project: '', taskId: 105, unitname: '油车港中队',
    //                dccs: 0, cdrs: 0, cdcc: 0, fxs: 0, zgwcs: 0, xzzf: 0, fkje: 0, ffxcgzs: 0, ghzmj: 0, zgzmj: 0, wzqyjzlj: 0, wagdsjqyjzlj: 0, syqdjzlj: 0, gdzbcsctfy: 0, fkjey: 0, zg: 0, qd: 0,
    //            },
    //]
})