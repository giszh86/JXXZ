Ext.define('TianZun.store.legalcasemanager.CaseFlow', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/DocumentConfig/GetDefinitionClass',
    },
});