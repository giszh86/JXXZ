Ext.define('TianZun.store.alarmdetail.AlarmDetailStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.alarmdetail.AlarmDetailModel',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/AlarmDetail/GetAlarmDetailCount' + (configs.TOWNID == null ? '' : '?filter=[{"property":"unitid","value":' + configs.TOWNID + '}]'),
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});