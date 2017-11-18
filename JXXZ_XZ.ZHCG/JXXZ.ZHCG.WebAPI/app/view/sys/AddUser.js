Ext.define('TianZun.view.sys.AddUser', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.userAdd',

    title: '添加用户',
    layout: 'fit',

    initComponent: function () {
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
                    name: 'UnitID',
                    value: this.record.get('ID')
                },

                 {
                     fieldLabel: '所属单位',
                     disabled: true,
                     value: this.record.get('Name')
                 },
                {
                    fieldLabel: '用户名称',
                    name: 'DisplayName',
                    allowBlank: false
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
                    fieldLabel: '用户类型',
                    xtype: 'combo',
                    name: 'UserTypeID',
                    store: Ext.create('TianZun.store.sys.UserTypeStore'),
                    valueField: 'ID',
                    displayField: 'Name',
                    editable: false,
                    allowBlank: false
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
                    //regexText: "密码必须用英文和字母6-15位字符组成！",
                    allowBlank: false
                },
                {
                    fieldLabel: '确认密码',
                    name: 'newPassword',
                    //inputType: 'password',
                    allowBlank: false
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
                    //colspan: 2,
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
                    store: Ext.create('TianZun.store.sys.RoleManageStore'),
                    displayField: 'Name',
                    valueField: 'ID',
                    name: "RoleIDArr",
                    allowBlank: false,
                    colspan: 2,
                    width: 510,
                    height: 52
                }
            ],
            buttons: [{
                text: '确定',
                handler: 'onAddOK'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});