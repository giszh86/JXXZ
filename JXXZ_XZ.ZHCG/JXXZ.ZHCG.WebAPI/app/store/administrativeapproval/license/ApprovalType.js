Ext.define('TianZun.store.administrativeapproval.license.ApprovalType', {
    extend: 'Ext.data.Store',
    //proxy: {
    //    type: 'ajax',
    //    method: "GET",
    //    url: configs.WebApi + 'api/License/GetCertType',
    //},
    data: [{ ID: 1, Name: '道路挖掘' }, { ID: 2, Name: '房屋建造' }]
})