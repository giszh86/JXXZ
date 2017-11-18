Ext.define('TianZun.store.citizenservice.PunishType', {
    extend: 'Ext.data.Store',
    //proxy: {
    //    type: 'ajax',
    //    method: "GET",
    //    url: configs.WebApi + 'api/CitizenEvent/GetClassTypes',
    //},
    data: [{
        ID: 1, Name: '五水共治'
    }, {
        ID: 2, Name: '四化三边'
    }, {
        ID: 3, Name: '三改一拆'
    }, {
        ID: 4, Name: '五气共治'
    }, {
        ID: 5, Name: '小城镇环境卫生综合整治'
    }, {
        ID: 6, Name: '小城镇镇容镇貌管理'
    }, {
        ID: 7, Name: '社会治理综合整治'
    }]
});