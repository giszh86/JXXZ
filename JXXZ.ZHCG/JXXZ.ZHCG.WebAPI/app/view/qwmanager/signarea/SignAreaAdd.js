Ext.define('TianZun.view.qwmanager.signarea.SignAreaAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.signAreaAdd',
    title: '添加签到区域',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 950,
            overflowY: 'auto',
            items: [
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '基础信息',

                        layout: {
                            type: 'table',
                            columns: 2,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 101
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 429
                        },
                        items: [
                             {
                                 xtype: 'hidden',
                                 name: 'userid',
                                 value: $.cookie("USER_ID")
                             },
                            {
                                fieldLabel: '<span style="color:red">*</span>所属中队',
                                name: 'sszd',
                                margin: '20 0 10 0',
                                xtype: 'combo',
                                store: Ext.create('TianZun.store.sys.UnitSquadron', {
                                    proxy: { extraParams: { unittypeid: 2 } }
                                }),
                                valueField: 'ID',
                                displayField: 'Name',
                                editable: false,
                                allowBlank: false,
                                readOnly: configs.TOWNID == null ? false : true,
                                listeners: {
                                    render: function (obj) {
                                        if (configs.TOWNID != null)
                                            obj.setValue(configs.TOWNID);
                                    },
                                    'change': function () {
                                        var cyCombo = Ext.getCmp('ssbc');
                                        cyCombo.clearValue();
                                        cyStore = Ext.create('TianZun.store.sys.UnitGroup');
                                        cyStore.getProxy().url = 'api/Unit/GetUnitsChild?parentid=' + this.getValue();
                                        cyCombo.bindStore(cyStore, false);
                                        cyStore.load();
                                    }
                                }
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>所属班次',
                                xtype: 'combo',
                                id: 'ssbc',
                                name: 'ssbc',
                                margin: '20 0 10 0',
                                valueField: 'ID',
                                displayField: 'Name',
                                editable: false,
                                allowBlank: false,
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>签到区域名称',
                                name: 'name',
                                xtype: 'textfield',
                                colspan:2,
                                allowBlank: false,
                                margin: '10 0 10 0',
                                width:877,
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>签到区域说明',
                                name: 'explain',
                                xtype: 'textarea',
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 80,
                                width: 877,
                                allowBlank: false,
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                margin: '10 0 10 8',
                                border: false,
                                width: 420,
                                items: [
                                    {
                                        xtype: 'box',
                                        html: '<span style="color:red">*</span>签到时间:',
                                        margin:'5 5 0 30',
                                    },
                                    {
                                        xtype: 'timefield',
                                        name: 'start_stime',
                                        allowBlank: false,
                                        format: 'H:i',
                                        increment: 10,
                                        width: 120,
                                    },
                                    {
                                        xtype: 'box',
                                        html: '至',
                                        margin:'5 10 0 10',
                                    },
                                    {
                                        xtype: 'timefield',
                                        name: 'start_etime',
                                        allowBlank: false,
                                        format: 'H:i',
                                        increment: 10,
                                        width: 120,
                                    },
                                ]
                            },
                            {
                                xtype:'panel',
                                layout: 'hbox',
                                margin: '10 0 10 50',
                                border: false,
                                width: 420,
                                items: [
                                    {
                                        xtype: 'box',
                                        html: '<span style="color:red">*</span>签退时间:',
                                        margin: '5 5 0 0',
                                    },
                                    {
                                        xtype: 'timefield',
                                        name: 'end_stime',
                                        allowBlank: false,
                                        format: 'H:i',
                                        increment: 10,
                                        width:120,

                                    },
                                    {
                                        xtype: 'box',
                                        html: '至',
                                        margin: '5 10 0 10',
                                    },
                                    {
                                        xtype: 'timefield',
                                        name: 'end_etime',
                                        allowBlank: false,
                                        format: 'H:i',
                                        increment: 10,
                                        width: 120,
                                    },
                                ]
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>签到位置',
                                id: 'EVENT_COORDINATE_ID',
                                name: 'grometry',
                                xtype: 'textfield',
                                allowBlank: false,
                                colspan: 2,
                                width: '97.3%',
                                margin: '10 0 10 0',
                                autoShow: true,
                                listeners: {
                                    render: function (p) {
                                        p.getEl().on('click', function (p) {
                                            CreateAarcgisMap('EVENT_COORDINATE_ID', '签到区域', 3, 3, this.component.getValue());
                                        });
                                    },
                                }
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