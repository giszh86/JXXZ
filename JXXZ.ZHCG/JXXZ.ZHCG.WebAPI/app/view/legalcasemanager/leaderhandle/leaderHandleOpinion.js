Ext.define('TianZun.view.legalcasemanager.leaderhandle.LeaderHandleOpinion', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.LeaderHandleOpinion',
    title: '领导督办',
    layout: 'fit',
    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width: 800,
            overflowY: 'auto',
            items: [{
                xtype: 'fieldset',
                collapsible: true,
                items: [{
                    xtype: 'hidden',
                    name: 'createuserid',
                    value: $.cookie("USER_ID")
                },
                {
                    xtype: 'hidden',
                    name: 'caseid',
                    value: this.record.get('caseid')
                },
                 {
                     xtype: 'hidden',
                     name: 'workflowid',
                     value: this.record.get('wfdid')
                 },
                 {
                     xtype: 'hidden',
                     name: 'userid',
                     value: this.record.get('clrid')
                 },
                {
                    fieldLabel: '领导督办意见',
                    xtype: 'textarea',
                    labelAlign: 'right',
                    allowBlank: false,
                    height: 30,
                    width: '100%',
                    name: 'supopinion',
                },
                {
                    xtype: 'panel',
                    border: false,
                    margin: '0 0 10 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            fieldLabel: '紧急程度',
                            xtype: 'combo',
                            store: Ext.create('TianZun.store.common.LevelStore'),
                            valueField: 'ID',
                            displayField: 'Name',
                            value: 1,
                            labelAlign: 'right',
                            editable: false,
                            name: 'level',
                            width: 200,
                        },
                {
                    xtype: 'checkbox',
                    margin: '10 0 0 20',
                    name: 'message',
                    boxLabel: "短信提醒  （" + this.record.get("dealname")+"：" + (this.record.get("phone") == null ? "暂无工作号" : this.record.get("phone").length > 0 ? this.record.get("phone") : "暂无工作号") + "）",
                    width: 280,
                    checked: true,
                },
                {
                    xtype: 'hidden',
                    name: 'createusernmae',
                    value: $.cookie("USER_NAME")
                },
                {
                    xtype: 'hidden',
                    name: 'casename',   //案件名称
                    value: this.record.get('casename'),
                },
                {
                    xtype: 'hidden',
                    name: 'phone',
                    value: this.record.get("phone"),
                },
                    ]
                },
                ]
            }],
            buttons: [{
                text: '确定',
                handler: 'onSupOk'
            },
            {
                text: '取消',
                handler: 'onclose',
            }]
        }]
        this.callParent();
    }
})