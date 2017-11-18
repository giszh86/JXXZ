Ext.define('TianZun.store.lawenforcementsupervision.LevelType', {
    extend: 'Ext.data.Store',
    //proxy: {
    //    type: 'ajax',
    //    method: "GET",
    //    url: configs.WebApi + 'api/License/GetCertType',
    //},
    data: [{ ID: 1, Name: '一般' }, { ID: 2, Name: '紧急' },{ ID: 3, Name: '特急' }]
})