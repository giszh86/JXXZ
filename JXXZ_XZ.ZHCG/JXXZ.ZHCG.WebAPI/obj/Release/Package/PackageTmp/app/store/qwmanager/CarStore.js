Ext.define('TianZun.store.qwmanager.CarStore', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/CarDuty/GetCarsUnitList',
    },
});