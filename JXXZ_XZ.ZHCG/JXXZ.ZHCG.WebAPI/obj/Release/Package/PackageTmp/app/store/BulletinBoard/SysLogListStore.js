Ext.define('TianZun.store.BulletinBoard.SysLogListStore', {
    extend: 'Ext.data.Store',

    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/BulletinBoard/GetSysLogList',
        reader: {
            type: 'json',
            idProperty: 'ID'
        },
    },
    autoLoad: true
});