Ext.define('TianZun.view.sys.EditUser', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.userEdit',

    title: '修改用户',
    layout: 'fit',

    initComponent: function () {
        var store = Ext.create('Ext.data.TreeStore', { proxy: { url: '/api/Unit/GetCurrentTreeUnits', method: 'get', type: 'ajax', extraParams: { unitID: 1 } } });
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
                width: 255
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'ID',
                    value: this.record.get('ID')
                },
                {
                    xtype: 'hidden',
                    name: 'UnitID',
                    id: 'UnitID',
                    value: this.record.get('UnitID')
                },

                //{
                //    fieldLabel: '所属单位',
                //    disabled: true,
                //    value: this.record.get('UnitName')
                //},

                {
                    fieldLabel: '所属单位',
                    xtype: 'treepicker',
                    name: 'UnitName',
                    store: store,
                    displayField: 'Name',
                    valueField: 'ID',
                    checkModel:'single',
                    colspan: 2,
                    width: 510,
                    editable: false,
                    allowBlank: false,
                    value: me.unitid,
                   
                },
                 {
                     fieldLabel: '用户名称',
                     name: 'DisplayName',
                     allowBlank: false
                 },
                    {
                        fieldLabel: '用户类型',
                        xtype: 'combo',
                        name: 'UserTypeID',
                        store: Ext.create('TianZun.store.sys.UserTypeStore'),
                        valueField: 'ID',
                        displayField: 'Name',
                        editable: false,
                        allowBlank: false,
                        listeners: {
                            render: function (combo) {
                                this.getStore().load();
                            }
                        }
                    },
                 {
                     fieldLabel: '用户头像',
                     xtype: 'filefield',
                     name: 'file',
                     margin: '0 0 10 0',
                     colspan: 2,
                     width: 510,
                     buttonText: '选择文件',
                 },
              
                 {
                     fieldLabel: '登陆帐号',
                     name: 'LoginName',
                     allowBlank: false
                 },
                {
                    fieldLabel: '登陆密码',
                    name: 'Password',
                    //inputType: 'password',
                    //regex: /^(?![^a-zA-Z]+$)(?!\D+$).{6,15}$/,
                    //regexText: "密码必须用英文和字母6-15位字符组成！"
                },
                {
                    fieldLabel: '确认密码',
                    name: 'newPassword',
                    //inputType: 'password'
                },
                {
                    fieldLabel: '执法证编号',
                    name: 'Code',
                    //allowBlank: false
                },
                {
                    fieldLabel: '用户排序',
                    name: 'Sepon',
                    xtype: 'numberfield',
                    //hideTrigger: true,
                    minValue: 0,
                    value: 0,
                    colspan: 2,
                    allowBlank: false
                },
                {
                    fieldLabel: '手机号',
                    name: 'mobile',
                    //allowBlank: false
                },
                {
                    fieldLabel: '工作号',
                    name: 'phone',
                    //allowBlank: false
                },

                 {
                     fieldLabel: '短号',
                     name: 'shortnumber',
                     //allowBlank: false
                 },
                {
                    fieldLabel: '设备号',
                    name: 'remarks1',
                    //allowBlank: false
                },
                {
                    xtype: 'tagfield',
                    fieldLabel: '所属角色',
                    store: Ext.create('TianZun.store.sys.RoleStore'),
                    displayField: 'Name',
                    valueField: 'ID',
                    name: "RoleIDArr",
                    allowBlank: false,
                    colspan: 2,
                    width: 510,
                    height: 52,
                    listeners: {
                        render: function (combo) {
                            combo.getStore().on("load", function (store) {
                                combo.setValue(me.roleIDArr)
                            });
                            this.getStore().load();
                        }
                    }
                },
                {
                    fieldLabel: '创建时间',
                    value: Ext.Date.format(this.record.get('CreatedTime'), 'Y-m-d H:i'),
                    disabled: true
                },
                {
                    fieldLabel: '更新时间',
                    value: Ext.Date.format(this.record.get('UpdatedTime'), 'Y-m-d H:i'),
                    disabled: true
                }
            ],
            buttons: [{
                text: '确定',
                handler: 'onEditOK'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
        this.child('form').loadRecord(this.record);
    }
});