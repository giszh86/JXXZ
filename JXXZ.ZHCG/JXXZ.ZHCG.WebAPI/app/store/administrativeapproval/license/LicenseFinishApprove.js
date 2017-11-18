Ext.define('TianZun.store.administrativeapproval.license.LicenseFinishApprove', {
    extend: 'Ext.data.Store',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/License/GetFinishCaseSourcesList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        },
        extraParams: {
            userid: $.cookie('USER_ID'),
        },
    },
    autoLoad: true
});