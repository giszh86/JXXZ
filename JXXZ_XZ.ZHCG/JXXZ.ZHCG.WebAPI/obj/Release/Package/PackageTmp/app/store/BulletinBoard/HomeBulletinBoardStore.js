Ext.define('TianZun.store.BulletinBoard.HomeBulletinBoardStore', {
    extend: 'Ext.data.Store',

    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/BulletinBoard/GetBulletinBoardList',
        reader: {
            type: 'json',
            idProperty: 'ID'
        },
    },
    autoLoad: true
});