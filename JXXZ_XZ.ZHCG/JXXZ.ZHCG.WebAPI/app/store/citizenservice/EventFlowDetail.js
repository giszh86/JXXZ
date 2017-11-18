Ext.define('TianZun.store.citizenservice.EventFlowDetail', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/CitizenEvent/GetSelectListItem',
    }
});