Ext.define('TianZun.view.monitorproject.MonitorProAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.monitorProAdd',

    title: '添加监控专题',
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
                xtype: 'textfield',
                width: 255
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'path',
                    value: this.record.get('path'),
                },
                {
                    xtype: 'hidden',
                    name: 'unitid',
                    value: this.record.get('unitid'),
                },
                {
                    xtype: 'hidden',
                    name: 'parentid',
                    value: this.record.get('parentid'),
                },
                {
                    xtype: 'hidden',
                    name: 'seq',
                    value: this.record.get('seq'),
                },
                {
                    fieldLabel: '专题分组名称',
                    name: 'unitname',
                    allowBlank: false,
                },
                {
                    fieldLabel: '上级部门',
                    name: 'parentname',
                    editable: false,
                    readOnly:true,
                    value: this.record.get('parentname'),
                },
            ],
            buttons: [{
                text: '提交',
                handler: 'onAddRroOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});