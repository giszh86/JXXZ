Ext.define('TianZun.view.qwmanager.checkin.CheckinQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.checkinQuery',
    title: '条件查询',
    layout: 'fit',


    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            overflowY: 'auto',
            items: [{
                xtype: 'fieldset',
                collapsible: true,
                layout: {
                    type: 'table',
                    columns: 2,
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 100
                },
                defaults: {
                    xtype: 'textfield',
                    width: 350
                },
                items: [{
                    fieldLabel: '所属中队',
                    xtype: 'combo',
                    name: 'sszd',
                    store: Ext.create('TianZun.store.sys.UnitSquadron', {
                        proxy: {
                            type: 'ajax',
                            method: "Get",
                            url: configs.WebApi + 'api/Unit/GetUnitsSquadron?unittypeid=2',
                        }
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
                    }
                },
                {
                    fieldLabel: '姓名',
                    xtype: 'textfield',
                    name: 'displayname',
                },
                {
                    fieldLabel: '签到日期',
                    xtype: 'datefield',
                    name: 'taskstarttime',
                },
                {
                    fieldLabel: '签到状态',
                    xtype: 'combo',
                    name: 'stime',
                    store: Ext.create('TianZun.store.qwmanager.Qdzt'),
                    valueField: 'ID',
                    displayField: 'Name',
                    editable: false
                },
                {
                    fieldLabel: '签退状态',
                    xtype: 'combo',
                    name: 'etime',
                    store: Ext.create('TianZun.store.qwmanager.Qtzt'),
                    valueField: 'ID',
                    displayField: 'Name',
                    editable: false
                }, ]
            }],
            buttons: [{
                text: '提交',
                handler: 'onsubmit',
            },
           {
               text: '清空',
               handler: 'onEmpty',
           },
           {
               text: '取消',
               handler: 'onclose',
           }]
        }];
        this.callParent();
    }
})
