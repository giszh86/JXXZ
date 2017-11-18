Ext.define('TianZun.store.legalcasemanager.TransferUnit', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/CaseSourceL/GetYjdwClass',
    },
});