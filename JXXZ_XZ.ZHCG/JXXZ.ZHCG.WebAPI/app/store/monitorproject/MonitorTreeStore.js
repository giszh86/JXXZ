Ext.define('TianZun.store.monitorproject.MonitorTreeStore', {
    extend: 'Ext.data.TreeStore',
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/MonitorProject/GetMonitoreTreeList',
    },
    autoLoad: true,
});