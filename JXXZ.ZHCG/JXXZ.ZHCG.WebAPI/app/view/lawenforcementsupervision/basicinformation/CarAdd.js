Ext.define('TianZun.view.lawenforcementsupervision.basicinformation.CarAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.carAdd',
    title: '添加车辆',
    layout: 'fit',

    initComponent: function () {
        var me = this;

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 1000,
            overflowY: 'auto',
            items: [
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '基础信息',
                        name: 'visitwin',
                        layout: {
                            type: 'table',
                            columns: 3,
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
                                name: 'createuserid',
                                value: $.cookie('USER_ID'),
                            },
                            {
                                xtype: 'hidden',
                                name: 'carstatus',
                                value: 0,
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>车辆编号',
                                name: 'code',
                                xtype: 'textfield',
                                allowBlank: false,
                                margin: '20 0 10 0',
                            },
                             {
                                 fieldLabel: '<span style="color:red">*</span>所属中队',
                                 name: 'unitid',
                                 margin: '20 0 10 0',
                                 xtype: 'combo',
                                 store: Ext.create('TianZun.store.sys.UnitSquadron', {
                                     proxy: { extraParams: { unittypeid: 2 } }
                                 }),
                                 valueField: 'ID',
                                 displayField: 'Name',
                                 editable: false,
                                 readOnly: configs.TOWNID == null ? false : true,
                                 allowBlank: false,
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
                                fieldLabel: '所属班次',
                                xtype: 'combo',
                                id: 'ssbc',
                                name: 'ssbc',
                                margin: '20 0 10 0',
                                valueField: 'ID',
                                displayField: 'Name',
                                editable: false,
                                //allowBlank: false,
                            },
                             {
                                 fieldLabel: '<span style="color:red">*</span>车牌号',
                                 name: 'carnumber',
                                 xtype: 'textfield',
                                 allowBlank: false,
                                 margin: '0 0 10 0',
                             },
                             {
                                 fieldLabel: '<span style="color:red">*</span>车辆类型',
                                 xtype: 'combo',
                                 editable: false,
                                 allowBlank: false,
                                 store: Ext.create('TianZun.store.sys.Dictionary', {
                                     proxy: {
                                         type: 'ajax',
                                         method: "Get",
                                         url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_car',
                                     }
                                 }),
                                 name: 'cartypeid',
                                 valueField: 'zd_id',
                                 displayField: 'zd_name',
                                
                             },
                             {
                                 fieldLabel: '<span style="color:red">*</span>终端号码',
                                 name: 'cartel',
                                 xtype: 'textfield',
                                 allowBlank: false,
                                 margin: '0 0 10 0',
                             },
                        ]
                    }
            ],
            buttons: [{
                text: '提交',
                handler: 'onAddVisitOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();

    }
});