Ext.define('TianZun.store.qwmanager.SignAreaListByUnit', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/SignArea/GetSigninAreasCom',
    },
});