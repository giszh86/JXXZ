Ext.define('TianZun.view.legalcasemanager.functionconfig.PrescriptionAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.prescriptionAdd',
    title: '添加实效',
    layout: 'fit',

    initComponent: function () {
        var me = this;

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            items: [
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '基础信息',
                        name: 'visitwin',
                        layout: {
                            type: 'table',
                            columns: 1,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 100
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 400
                        },
                        items: [

                           
                            {
                                fieldLabel: '案件环节',
                                name: 'workid',
                                xtype: 'combo',
                                store: Ext.create('TianZun.store.legalcasemanager.CaseFlow'),
                                valueField: 'id',
                                displayField: 'name',
                                editable: false,
                                allowBlank: false,
                            },
                            {
                                fieldLabel: '处理期限(小时)',
                                name: 'term',
                                xtype: 'textfield',
                                allowBlank: false,
                                margin: '0 0 10 0',
                                blankText: '请填写拆迁面积',
                                allowBlank: false,
                                regex: /^\d+(\.\d{1,2})?$/,
                                regexText: '请输入正确的数据类型'
                            },
                            
                          
                        ]
                    }
            ],
            buttons: [{
                text: '提交',
                handler: 'onAddOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();

    }
});