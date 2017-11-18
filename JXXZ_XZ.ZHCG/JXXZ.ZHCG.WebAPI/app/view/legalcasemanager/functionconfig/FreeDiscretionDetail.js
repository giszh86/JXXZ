Ext.define('TianZun.view.legalcasemanager.functionconfig.FreeDiscretionDetail', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.freeDiscretionDetail',
    title: '自由裁量详情',
    layout: 'fit',

    initComponent: function ()
    {
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 800,
            overflowY: 'auto',
            items: [
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '基础信息',
                        name: 'visitwin',
                        layout: {
                            type: 'table',
                            columns: 1,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 70
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 280,
                            readOnly:true,
                        },
                        items: [
                            {
                                fieldLabel: '权利编号',
                                name: 'code',
                                value:this.record.get('code'),
                            },
                            {
                                fieldLabel: '权利事项',
                                name: 'powername',
                                xtype: 'textarea',
                                width: '100%',
                                height: 30,
                                value: this.record.get('powername'),
                            },
                            {
                                fieldLabel: '法律法规',
                                name: 'flfg',
                                xtype: 'textarea',
                                width: '100%',
                                height: 30,
                                value: this.record.get('flfg'),
                            },
                            {
                                fieldLabel: '数量依据',
                                name: 'clyj',
                                xtype: 'textarea',
                                height: 30,
                                width: '100%',
                                value: this.record.get('clyj'),
                            },
                            {
                                fieldLabel: '违法情形',
                                name: 'wfqx',
                                xtype: 'textarea',
                                height: 30,
                                width: '100%',
                                value: this.record.get('wfqx'),
                            },
                            {
                                fieldLabel: '处罚情况',
                                name: 'cf',
                                xtype: 'textarea',
                                height: 30,
                                width: '100%',
                                value: this.record.get('cf'),
                            },
                        ]
                    }
            ],
            buttons: [ {
                text: '返回',
                handler: 'onClose'
            }]
        }];

        this.callParent();

    }
});