Ext.define('TianZun.view.monitorproject.MonitorItemEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.monitorItemEdit',

    title: '修改监控专题',
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
                width: 255
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'unitid',
                    value: this.record.get('unitid')
                },
                {
                    xtype: 'hidden',
                    name: 'cameraid',
                    value: this.record.get('cameraid')
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
                   readOnly:true,
                   value: this.record.get('cameraname')
               },
               {
                   fieldLabel: '监控类型',
                   name: 'cameratypename',
                   readOnly: true,
                   value: this.record.get('cameratypename'),
               },
               {
                   fieldLabel: '排序',
                   name: 'seq',
                   xtype:'numberfield',
                   value: this.result.seq,
               },
            ],
            buttons: [{
                text: '提交',
                handler: 'onEditItemOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});