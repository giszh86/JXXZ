Ext.define('TianZun.store.qwmanager.PatrolLogs', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.qwmanager.PatrolLogs',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/PatrolLog/GetPatrolLogsList' + (configs.TOWNID == null ? '' : '?filter=[{"property":"unitid","value":' + configs.TOWNID + '}]'),
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'logid'
        }
    },
    autoLoad: true
});