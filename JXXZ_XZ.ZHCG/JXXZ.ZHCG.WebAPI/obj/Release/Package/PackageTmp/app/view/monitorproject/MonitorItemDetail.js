Ext.define('TianZun.view.monitorproject.MonitorItemDetail', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.monitorItemDetail',

    title: '查看监控专题元素',
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
                labelWidth: 75
            },
            defaults: {
                xtype: 'displayfield',
                width: 255,
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'unitid',
                    value: this.record.get('unitid')
                },
                {
                    fieldLabel: '上级名称',
                    name: 'unitname',
                    allowBlank: false,
                    value: this.record.get('unitname')
                },
                {
                    fieldLabel: '监控名称',
                    name: 'cameraname',
                    allowBlank: false,
                    value: this.record.get('cameraname')
                },
                {
                    fieldLabel: '监控类型',
                    name:'cameratypename',
                    value: this.record.get('cameratypename')
                },
                {
                    fieldLabel: '排序',
                    name: 'seq',
                    value: this.record.get('seq')
                },
            ],
            buttons: [{
                text: '确定',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});