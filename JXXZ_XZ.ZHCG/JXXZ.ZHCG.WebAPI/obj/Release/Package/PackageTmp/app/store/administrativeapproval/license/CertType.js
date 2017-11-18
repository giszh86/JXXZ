Ext.define('TianZun.store.administrativeapproval.license.CertType', {
    extend: 'Ext.data.Store',
    //proxy: {
    //    type: 'ajax',
    //    method: "GET",
    //    url: configs.WebApi + 'api/License/GetApproveType',
    //},
    data: [{ ID: 1, Name: '身份证' }, { ID: 2, Name: '护照' }, { ID: 3, Name: '签证' }]
})