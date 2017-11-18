Ext.define('TianZun.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    padding: 0,

    requires: [
        'TianZun.view.ContentLeft',
        'TianZun.view.ContentCenter'
    ],

    initComponent: function ()
    {
        this.items = [{
            region: 'north',
            border: false,
            height: 64,
            contentEl: "title",
        }, {
            region: 'west',
            width: 220,
            title: '功能导航',
            id: 'IndexLeft',
            collapsible: true,
            split: true,
            floatable: false,
            xtype: 'contentLeft'
        },
        {
            region: 'center',
            xtype: 'contentCenter',
            title: '首页',
        }
        ];

        this.callParent();
    }
});