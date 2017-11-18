Ext.define('TianZun.view.uav.basicinformation.InformationDetail', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.informationDetail',
    title: '详情',
    layout: 'fit',

    initComponent: function ()
    {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width: 550,
            overflowY: 'auto',
            layout: {
                type: 'table',
                columns: 2,
            },
            fieldDefaults: {
                labelAlign: "right",
                labelWidth: 100,
            },
            defaults: {
                xtype: 'displayfield',
                width: 250
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'createuserid',
                    value: $.cookie("USER_ID")
                },
                {
                    fieldLabel: '<span style="color:red">*</span>编号',
                    name: 'ovanum',
                    value: this.record.ovanum
                },
                {
                    fieldLabel: '<span style="color:red">*</span>设备名称',
                    name: 'ovaname',
                    value: this.record.ovaname,
                },
                {
                    fieldLabel: '终端编号',
                    name: 'device',
                    value: this.record.device,
                },
                {
                    fieldLabel: '管理部门',
                    name: 'unit',
                    value: this.record.unit,
                }
            ],
            buttons: [{
                text: '确定',
                handler: 'onClose',
            },
            ]
        }]
        this.callParent();
    }

})