Ext.define('TianZun.view.legalcasemanager.functionconfig.DucumentTempletAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.ducumentTempletAdd',
    title: '新增文书模版',
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
                        border:false,
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
                            width: 350
                        },
                        items: [
                            {
                                xtype: 'hidden',
                                name: 'userid',
                                value:$.cookie('USER_ID')
                            },
                            {
                                fieldLabel: '文书名称',
                                name: 'ddname',
                                xtype: 'textfield',
                                margin: '0 0 10 0',
                                allowBlank: false,
                            },
                            {
                                fieldLabel: '文书编码',
                                name: 'doccode',
                                xtype: 'textfield',
                                margin: '0 0 10 0',
                                allowBlank: false,
                            },
                            {
                                fieldLabel: '文书模版',
                                xtype: 'filefield',
                                name: 'file',
                                margin: '0 0 10 0',
                                buttonText: '选择文件',
                                allowBlank: false,
                            },
                            {
                                fieldLabel: '是否唯一',
                                xtype: 'radiogroup',
                                name: 'isunique',
                                items: [
                                    {
                                        boxLabel: '是',
                                        name: 'isunique',
                                        inputValue:1
                                    },
                                    {
                                        boxLabel: '否',
                                        name: 'isunique',
                                        inputValue: 0,
                                        checked:true,
                                    },
                                ]
                            },
                            {
                                fieldLabel: '排序',
                                name: 'seq',
                                xtype: 'numberfield',
                                width: 180,
                                allowBlank: false,
                                minValue: 1,
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