Ext.define('TianZun.store.qwmanager.PatrolAreaListByUnit', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/PatrolArea/GetPatrolAreasCom',
    },
});