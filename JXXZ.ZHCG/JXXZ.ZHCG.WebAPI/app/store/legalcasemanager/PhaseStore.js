Ext.define('TianZun.store.legalcasemanager.PhaseStore', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/DucumentTemplet/GetPhaseList',
    },
})