Ext.define('TianZun.view.reportcenter.template.TemplateEnableMonth', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.templateEnableMonth',
    title: '启用模板',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        var date = new Date();
        var year = parseInt(date.getFullYear());
        var month=parseInt(date.getMonth())+1;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width: 800,
            items: [{
                xtype: 'fieldset',
                collapsible: true,
                title: '基本信息',
                margin: '10 0 0 0',
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
                    name: 'reportid',
                    value: this.record.get("reportid")
                }, {
                    fieldLabel: '报表模板',
                    name: 'reportname',
                    xtype: 'displayfield',
                    value: this.record.get("reportname"),
                    width: 800,
                    colspan: 3,
                },
                {
                    fieldLabel: '报表类型',
                    xtype: 'displayfield',
                    name: 'reporttypename',
                    value: this.record.get("reporttypename"),
                    value: '月报',
                    editable: false,
                    colspan: 3,
                },
                {
                    fieldLabel: '统计年度',
                    xtype: 'displayfield',
                    value:year,
                    editable: false,
                    colspan: 3,
                },
                {
                    xtype: 'hidden',
                    name: 'statistics',
                },
                {
                    //统计月份
                    layout: 'hbox',
                    xtype: 'fieldcontainer',
                    fieldLabel: '统计月份',
                    colspan: 3,
                    width: 800,
                    defaultType: 'checkboxfield',
                    items: [
                        {
                            boxLabel: '1月',
                            name: 'month',
                            margin:'0 10 0 0',
                            id: '1'
                        }, {
                            boxLabel: '2月',
                            name: 'month',
                            margin: '0 10 0 0',
                            id: '2'
                        }, {
                            boxLabel: '3月',
                            name: 'month',
                            margin: '0 10 0 0',
                            margin: '0 10 0 0',
                            id: '3',
                        },
                        {
                            boxLabel: '4月',
                            name: 'month',
                            margin: '0 10 0 0',
                            id: '4'
                        }, {
                            boxLabel: '5月',
                            name: 'month',
                            margin: '0 10 0 0',
                            id: '5'
                        }, {
                            boxLabel: '6月',
                            name: 'month',
                            margin: '0 10 0 0',
                            id: '6'
                        }, {
                            boxLabel: '7月',
                            name: 'month',
                            margin: '0 10 0 0',
                            id: '7'
                        }, {
                            boxLabel: '8月',
                            name: 'month',
                            margin: '0 10 0 0',
                            id: '8'
                        }, {
                            boxLabel: '9月',
                            name: 'month',
                            margin: '0 10 0 0',
                            id: '9'
                        },  {
                            boxLabel: '10月',
                            name: 'month',
                            margin: '0 10 0 0',
                            id: '10'
                        }, {
                            boxLabel: '11月',
                            name: 'month',
                            margin: '0 10 0 0',
                            id: '11'
                        }, {
                            boxLabel: '12月',
                            name: 'month',
                            margin: '0 10 0 0',
                            id: '12'
                        }, {
                            boxLabel: '全选',
                            name: 'month',
                            id: '13',
                            listeners: {
                                change: function (obj)
                                {
                                    if (Ext.getCmp(13).checked)
                                    {
                                        for (var i = 1; i <= 13; i++)
                                        {
                                            Ext.getCmp(i).setValue(true);
                                        }
                                    }
                                    else
                                    {
                                        for (var i = 1; i <= 13; i++)
                                        {
                                            Ext.getCmp(i).setValue(false);
                                        }
                                        //Ext.getCmp(month).setValue(true);
                                    }
                                },
                            }
                        },
                    ],
                    listeners: {
                        afterrender: function (obj)
                        {
                            var list = me.record.get("statistics");
                            var listArray = list.split(',');
                            if (listArray.length == 14)
                            {
                                Ext.getCmp(13).setValue(true);
                            }
                            var j = 1;
                            if (listArray.length > 1)
                            {
                                for (var i = 1; i <= 12; i++)
                                {
                                    if (listArray[j].length > 0)
                                    {
                                        if (i == listArray[j])
                                        {
                                            Ext.getCmp(i).setValue(true);
                                            j++;
                                        }
                                        else
                                        {
                                            continue;
                                        }
                                    }
                                }
                            }
                        },
                    }
                },
                {
                    //是否启用
                    fieldLabel: '是否启用',
                    layout: 'hbox',
                    xtype: 'radiogroup',
                    colspan: 3,
                    width: 280,
                    name: 'status',
                    items: [{
                        boxLabel: '是',
                        name: 'isenable',
                        width: 50,
                        id: 'aggree',
                        checked: 'true',
                        inputValue: '1',
                    },
                    {
                       boxLabel: '否',
                       name: 'isenable',
                            id: 'disaggree',
                            width: 70,
                            inputValue: '2'
                        }, 
                    ],
                    editable: false,
                },
                {
                    //备注
                    fieldLabel: '备&nbsp;&nbsp;注',
                    name: 'remark',
                    colspan: 3,
                    xtype: 'textarea',
                    value: this.record.get("remark"),
                    width: 750,
                    margin:'0 0 10 0',
                }
                ],
            }],
            buttons: [{
                text: '确认',
                handler: 'onQiyongOK',
            },
            {
                text: '取消',
                handler: 'onclose',
            }]
        }]
        this.callParent();
    }
})