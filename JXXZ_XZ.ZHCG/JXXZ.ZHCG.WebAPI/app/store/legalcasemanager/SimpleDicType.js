﻿Ext.define('TianZun.store.sys.Dictionary', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/SimpleCase/GeDictoryType',
    },
})