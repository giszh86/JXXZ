Ext.define('TianZun.view.monitorproject.MonitorProDetail', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.monitorProDetail',

    title: '查看监控专题',
    layout: 'fit',

    initComponent: function () {
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            layout: {
                type: 'table',
                columns: 2,
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 85
            },
            defaults: {
                xtype: 'displayfield',
                width: 255
            },
            items: [
                //{
                //    xtype: 'hidden',
                //    name: 'path',
                //    value: this.record.path
                //},
                {
                    fieldLabel: '专题分组名称',
                    name: 'unitname',
                    allowBlank: false,
                    value: this.record.get('unitname')
                },
                {
                    fieldLabel: '上级部门',
                    name:'parentname',
                    value: this.record.get('parentname')
                },
                //{
                //    fieldLabel: '排序',
                //    name: 'seq',
                //    value: this.record.seq
                //},
            ],
            buttons: [{
                text: '确定',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});