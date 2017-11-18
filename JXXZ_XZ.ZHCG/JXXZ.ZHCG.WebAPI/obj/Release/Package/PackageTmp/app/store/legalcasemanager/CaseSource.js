Ext.define('TianZun.store.legalcasemanager.CaseSource', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/CaseSourceL/GetSourcesClass',
    },
});