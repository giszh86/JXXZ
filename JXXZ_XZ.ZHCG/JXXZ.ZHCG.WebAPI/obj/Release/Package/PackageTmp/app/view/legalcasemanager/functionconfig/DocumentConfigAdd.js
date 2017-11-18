Ext.define('TianZun.view.legalcasemanager.functionconfig.DocumentConfigAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.documentConfigAdd',
    title: '新增文书配置',
    layout: 'fit',

    initComponent: function () {
        var me = this;

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width:450,
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
                            width: 400
                        },
                        items: [
                            {
                                fieldLabel: '<span style="color:red">*</span>案件环节',
                                margin:'10 0 10 0',
                                name: 'wfdid',
                                xtype: 'combo',
                                store: Ext.create('TianZun.store.legalcasemanager.CaseFlow'),
                                valueField: 'id',
                                displayField: 'name',
                                editable: false,
                                allowBlank: false,
                                //listeners: {//展开左侧对应树节点
                                //    change: function (obj) {                                     
                                //        var treepanel = me.up('documentConfigList').down('treepanel');
                                //        Ext.each(treepanel.getRootNode().get('children'), function (value, key) {
                                //            Ext.each(value.children, function (record, key2) {
                                //                if (record.id == obj.getValue())
                                //                    treepanel.getRootNode().getChildAt(value.id).expand(true);
                                //            })
                                //        })
                                //    }
                                //}
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>选择文书',
                                name: 'ddid',
                                xtype: 'combo',
                                store: Ext.create('TianZun.store.legalcasemanager.DucumentTemplet', {pageSize:999}),
                                valueField: 'ddid',
                                displayField: 'ddname',
                                editable: false,
                                allowBlank: false
                            },
                            {
                                fieldLabel: '排序',
                                xtype: 'numberfield',
                                margin:'10 0 10 0',
                                name: 'seq',
                                width: 150,
                                minValue: 1,
                            },
                            {
                                fieldLabel: '是否必填',
                                xtype: 'radiogroup',
                                name: 'isrequired',
                                width: 200,
                                items: [
                                    {
                                        boxLabel: '是',
                                        name: 'isrequired',
                                        inputValue: 1
                                    },
                                    {
                                        boxLabel: '否',
                                        name: 'isrequired',
                                        inputValue: 0,
                                        checked: true,
                                    },
                                ]
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