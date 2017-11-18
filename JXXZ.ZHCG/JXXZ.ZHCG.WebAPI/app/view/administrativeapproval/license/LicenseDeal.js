Ext.define('TianZun.view.administrativeapproval.license.LicenseDeal', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.licenseDeal',
    title: '行政审批处理',
    layout: 'fit',
    initComponent: function () {
        var me = this;
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
                xtype: 'textfield',
                width: 500,
                margin:"0 20 10 0",
                style: 'margin-bottom:15px'
            },
            items: [{
                xtype: 'radiogroup',
                fieldLabel: '审核结果',
                name: 'status',
                colspan: 2,
                items: [{
                    boxLabel: '同意',
                    name: 'shresult',
                    width:50,
                    id: 'aggree',
                    checked: 'true',
                    inputValue: '1',
                },
                    {
                        boxLabel: '不同意',
                        name: 'shresult',
                        id: 'disaggree',
                        width:70,
                        inputValue: '2'
                    }, {
                        xtype: 'hidden',
                        name: 'shuser',
                        value: $.cookie('USER_ID'),
                    },
                ],
                editable: false,
                value: me.record.get('status'),
            }, {
                xtype: 'hidden',
                fieldLabel: 'licensingid',
                name: 'licensingid',
                colspan:2,
                value: this.record.get('licensingid'),
            }, {
                fieldLabel: '审核意见',
                name: 'shopinion',
                allowBlank: false,
                xtype: 'textarea',
                colspan: 2,
                height: 30,
            },
            ], buttons: [{
                text: '提交',
                handler: 'onDealOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }]
        this.callParent();
    }
});