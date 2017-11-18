Ext.define('TianZun.view.qwmanager.patrolarea.PatrolAreaAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.patrolAreaAdd',
    title: '添加巡查区域',
    layout: 'fit',

    initComponent: function () {
        var me = this;

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 700,
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
                            labelWidth: 75
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 312
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
                                fieldLabel: '<span style="color:red">*</span>区域名称',
                                name: 'name',
                                xtype: 'textfield',
                                allowBlank: false,
                                margin: '10 0 10 0',
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>区域类型',
                                xtype: 'combo',
                                name: 'areatype',
                                margin: '10 0 10 0',
                                store: Ext.create('Ext.data.Store', {
                                    data: [
                                       { ID: '1', Name: '人员' },
                                       { ID: '2', Name: '车辆' },
                                    ]
                                }),
                                valueField: 'ID',
                                displayField: 'Name',
                                editable: false,
                                allowBlank: false,
                            },                          
                            {
                                fieldLabel: '<span style="color:red">*</span>区域说明',
                                name: 'explain',
                                xtype: 'textarea',
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 80,
                                width: '97.3%',
                                allowBlank: false,
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>巡查位置',
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
                                            CreateAarcgisMap('EVENT_COORDINATE_ID', '巡查区域', 3, 3, this.component.getValue());
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