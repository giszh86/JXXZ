Ext.define('TianZun.view.legalcasemanager.functionconfig.DocumentConfigEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.documentConfigEdit',
    title: '编辑文书配置',
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
                        border: false,
                        layout: {
                            type: 'table',
                            columns: 1,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 75
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 250
                        },
                        items: [
                            {
                                xtype: 'hidden',
                                name: 'dwdid',
                                value: this.record.get('dwdid'),
                            },
                            {
                                xtype: 'hidden',
                                name: 'ddid',
                                value: this.record.get('ddid'),
                            },
                            {
                                xtype: 'hidden',
                                name: 'wfdid',
                                value: this.record.get('wfdid'),
                            },
                            {
                                fieldLabel: '案件环节',
                                xtype: 'displayfield',
                                value: this.record.get('wfdname')
                            },
                            {
                                fieldLabel: '选择文书',
                                xtype: 'displayfield',
                                value: this.record.get('ddname')
                            },
                            {
                                fieldLabel: '排序',
                                xtype: 'numberfield',
                                name: 'seq',
                                width: 150,
                                minValue: 1,
                                value: this.record.get('seq'),
                            },
                            {
                                fieldLabel: '是否必填',
                                xtype: 'radiogroup',
                                name: 'isrequired',
                                width: 200,
                                items: [
                                    {
                                        boxLabel: '是',
                                        id: 'radioYes',
                                        name: 'isrequired',
                                        inputValue: 1
                                    },
                                    {
                                        boxLabel: '否',
                                        id: 'radioNo',
                                        name: 'isrequired',
                                        inputValue: 0,
                                    },
                                ],
                                listeners: {
                                    render: function (obj) {
                                        if (me.record.get('isrequired') == 1)
                                            Ext.getCmp('radioYes').setValue(true);
                                        else
                                            Ext.getCmp('radioNo').setValue(true);
                                    }
                                }
                            },
                        ]
                    }
            ],
            buttons: [{
                text: '提交',
                handler: 'onEditOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();

    }
});