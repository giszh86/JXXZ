Ext.define('TianZun.store.monitorproject.CamerasTreeStore', {
    extend: 'Ext.data.TreeStore',
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Monitor/GetTreeMonitor',
    },
    autoLoad: true,
});