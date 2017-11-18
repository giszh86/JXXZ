Ext.define('TianZun.store.legalcasemanager.CaseSourceInherit', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/CommonCase/GetInheritCaseSource',
    },
});