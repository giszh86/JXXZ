Ext.define('TianZun.view.conservation.conservationunit.UnitInfo', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.unitInfo',
    title: '公司详情',
    layout: 'fit',
    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bordorPadding: 10,
            width: 1000,
            overflowY: 'auto',
            items: [{
                xtype: 'fieldset',
                collapsible: true,
                title: '公司信息',
                layout: {
                    type: 'table',
                    columns: 3,
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 75,
                },
                defaults: {
                    xtype: 'textfield',
                    width: 280,
                },
                items: [{
                    xtype: 'hidden',
                    name: 'createuserid',
                    value: $.cookie("USER_ID")
                },
                {
                    fieldLabel: '公司名称',
                    xtype: 'displayfield',
                    name: 'companyname',
                    value:this.record.get('companyname'),
                },
                {
                    fieldLabel: '法人',
                    xtype: 'displayfield',
                    name: 'companylperson',
                    value: this.record.get('legalperson'),
                },
                { 
                    fieldLabel: '联系人',
                    xtype: 'displayfield',
                    name: 'companylxperson',
                    value: this.record.get('lxperson'),
                },
                {
                    fieldLabel: '移动电话',
                    xtype: 'displayfield',
                    name: 'companyctelephone',
                    value: this.record.get('contactphone'),
                },
                {
                    fieldLabel: '固定电话',
                    xtype: 'displayfield',
                    name: 'companytelephone',
                    value: this.record.get('fixedtelephone'),
                },
                {
                    fieldLabel: '传真号码',
                    xtype: 'displayfield',
                    name: 'companynumber',
                    value: this.record.get('faxnumber'),
                },
                {
                    fieldLabel: '电子邮箱',
                    xtype: 'displayfield',
                    name: 'companyemail',
                    value: this.record.get('cemail'),
                },
                {
                    fieldLabel: '公司类型',
                    xtype: 'displayfield',
                    name: 'companytp',
                    value: this.record.get('companytype'),
                },
                {
                    fieldLabel: '联系地址',
                    xtype: 'displayfield',
                    name: 'companyaddress',
                    value: this.record.get('lxaddress'),
                },
                {
                    fieldLabel: '是否启用',
                    xtype: 'displayfield',
                    name: 'sfqy',
                    value: this.record.get('car_num'),
                },
                ]
            }],
            buttons: [{
                text: '取消',
                handler: 'onClose',
            }]
        }]
        this.callParent();
    }
})