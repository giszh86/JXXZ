Ext.define('TianZun.store.qwmanager.CarDutyList', {
    extend: 'Ext.data.Store',
    //model: 'TianZun.model.legalcase.CaseSource',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/CarDuty/GetCarDutyList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});