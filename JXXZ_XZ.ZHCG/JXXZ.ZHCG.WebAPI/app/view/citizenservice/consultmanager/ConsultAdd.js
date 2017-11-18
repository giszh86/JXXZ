Ext.define('TianZun.view.citizenservice.consultmanager.ConsultAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.consultAdd',
    title: '咨询登记',
    layout: 'fit',

    initComponent: function () {
        var me = this;

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 1000,
            items: [
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '基础信息',

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
                            width: 319
                        },
                        items: [
                             {
                                 xtype: 'hidden',
                                 name: 'userid',
                                 value: $.cookie("USER_ID")
                             },
                            {
                                fieldLabel: '咨询人',
                                name: 'consultPerson',
                                xtype: 'textfield',
                                margin: '20 0 10 0',
                            },
                            {
                                fieldLabel: '联系方式',
                                name: 'phone',
                                xtype: 'textfield',
                                margin: '20 0 10 0',
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>事件标题',
                                name: 'eventTitle',
                                xtype: 'textfield',
                                allowBlank: false,
                                margin: '20 0 10 0',
                            },
                            {
                                xtype: 'datetimefield',
                                border: false,
                                name: 'visitTime',
                                editable: false,
                                fieldLabel: '受理时间',
                                margin: '0 0 10 0',
                                format: 'Y-m-d H:i:s',
                            },
                           {
                               fieldLabel: '<span style="color:red">*</span>事件大类',
                               xtype: 'combo',
                               editable: false,
                               name: 'bigtypeid',
                               store: Ext.create('TianZun.store.citizenservice.BigQuestion'),
                               valueField: 'ID',
                               displayField: 'Name',
                               allowBlank: false,
                               listeners: {
                                   'change': function () {
                                       var cyCombo = Ext.getCmp('ACSmallTypeID');
                                       cyCombo.clearValue();
                                       cyStore = Ext.create('TianZun.store.citizenservice.BigQuestion');
                                       cyStore.getProxy().url = 'api/CitizenEvent/GetClassTypes?parentid=' + this.getValue();
                                       cyCombo.bindStore(cyStore, false);
                                       cyStore.load();
                                   }
                               }
                           },
                            {
                                id: 'ACSmallTypeID',
                                xtype: 'combo',
                                fieldLabel: '<span style="color:red">*</span>事件小类',
                                name: 'smalltypeid',
                                valueField: 'ID',
                                colspan: 2,
                                width: '100%',
                                editable: false,
                                displayField: 'Name',
                                allowBlank: false
                            },
                            {
                                fieldLabel: '咨询内容',
                                name: 'consultContent',
                                xtype: 'textarea',
                                colspan: 3,
                                margin: '0 0 10 0',
                                height: 80,
                                width: '100%'
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