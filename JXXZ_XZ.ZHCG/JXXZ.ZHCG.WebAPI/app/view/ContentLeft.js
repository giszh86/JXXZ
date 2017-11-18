Ext.define('TianZun.view.ContentLeft', {
    extend: 'Ext.Panel',
    alias: 'widget.contentLeft',

    requires: [
        'TianZun.controller.ContentLeft'
    ],

    controller: 'contentLeft',
    layout: 'accordion',
    listeners: {
        render: 'onShow'
    }
});