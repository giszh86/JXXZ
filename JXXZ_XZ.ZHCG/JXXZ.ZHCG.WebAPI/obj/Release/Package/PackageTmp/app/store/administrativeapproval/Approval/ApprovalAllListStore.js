Ext.define('TianZun.store.administrativeapproval.Approval.ApprovalAllListStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.administrativeapproval.ApprovalModel',
    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Approval/GetTheAllApprovalList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        },
    },
    autoLoad: true
});