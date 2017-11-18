Ext.define('TianZun.view.legalcasemanager.leaderhandle.HisLeader', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.hisLeader',
    title: '督办详情',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'panel',
            border: false,
            bodyPadding: 10,
            width: 850,
            maxHeight: 400,
            overflowY: 'auto',
            items: [],
            listeners: {
                beforerender: function (obj) {
                    Ext.Ajax.request({
                        url: configs.WebApi + 'api/Leadersupervise/GetHistoryLeader?caseid=' + me.record.get('caseid'),
                        method: 'get',
                        scope: this,
                        success: function (response) {
                            var datas = Ext.decode(response.responseText);
                            for (data in datas)  // json数组的最外层对象  
                            {
                                Ext.each(datas[data], function (items) {
                                    Ext.each(items, function (item) {
                                        obj.add({
                                            xtype: 'fieldset',
                                            collapsible: true,
                                            fieldDefaults: {
                                                labelAlign: 'right',
                                                labelWidth: 75
                                            },
                                            layout: {
                                                type: 'table',
                                                columns: 2,
                                            },
                                            defaults: {
                                                xtype: 'displayfield',
                                                width: '98%',
                                            },
                                            title: item.suptime,
                                            items: [
                                                {
                                                    fieldLabel: '督办人',
                                                    xtype: 'displayfield',
                                                    value: item.dbrname,
                                                },
                                                {
                                                    fieldLabel: '督办时间',
                                                    xtype: 'displayfield',
                                                    value: item.suptime,
                                                },
                                                {
                                                    fieldLabel: '紧急程度',
                                                    xtype: 'displayfield',
                                                    value: item.level == 1 ? "一般" : item.level == 2 ? "紧急" : "特急",
                                                },
                                                {
                                                    fieldLabel: '短信提醒',
                                                    xtype: 'displayfield',
                                                    value: item.username + "(" + item.mobile + ")",
                                                },
                                                {
                                                    fieldLabel: '督办意见',
                                                    xtype: 'displayfield',
                                                    colspan: 2,
                                                    value: item.supopinion,
                                                }
                                            ]
                                        });
                                    });
                                });
                            }
                        }
                    });
                }
            }
        },
        ]

        this.callParent();
    }
});