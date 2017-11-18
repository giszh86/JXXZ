Ext.define('TianZun.store.administrativeapproval.license.LicenseToApprove', {
    extend: 'Ext.data.Store',

    pageSize: configs.PageSize,
    remoteFilter: true,
    param:[],
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/License/GetPendingCaseSourcesList',
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