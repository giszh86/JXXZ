Ext.define('TianZun.view.accountmanager.accountregister.AccountRegisterList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.accountRegisterList',
    title: '台帐统计管理>台帐登记管理',
    layout: 'fit',
    requires: [
      'TianZun.controller.accountmanager.AccountRegister',
    ],
    controller: 'accountRegister',

    initComponent: function ()
    {
        var store = Ext.create('TianZun.store.accountmanager.accountregister.AccountRegisterList');
        store.getProxy().url = "api/AccountRegister/GetAccountRegisterList?type=1";
        var comboxstore = Ext.create('TianZun.store.sys.UnitSquadron', { proxy: { type: 'ajax', extraParams: { unittypeid: 2 } } });
        var dt = new Date();
        var year = dt.getFullYear();
        Ext.Ajax.request({
            url: 'api/Unit/GetUnitsSquadron?unittypeid=2',
            method: 'get',
            async: false,
            success: function (response)
            {
                jsonstr = Ext.decode(response.responseText);
            }
        });
        var comboxfirst = jsonstr[0].ID;

        this.items = [
            {
                xtype: 'tabpanel',
                border: false,
                plain: true,
                bodyBorder: false,
                name: 'accountpanel',
                items: [
                    {
                        title: year+'年台账登记',
                        layout: 'hbox',
                        border: false,
                        name: 'visitTab',
                        xtype: 'panel',
                        items: [
                            {
                                xtype: 'panel',
                                width: '20%',
                                height: '100%',
                                layout: 'vbox',
                                margin: '20 0 0 20',
                                items: [{
                                    //xtype: 'box',
                                    //html: '<label style="font-size:15px;line-height:30px;">直属中队</label>',
                                    //width: '100%',
                                    //style: 'text-align:center;',
                                    //height: 30,
                                    fieldLabel: '',
                                    width: '100%',
                                    height: '5%',
                                    name: 'unitid',
                                    xtype: 'combo',
                                    store: comboxstore,
                                    valueField: 'ID',
                                    displayField: 'Name',
                                    border: false,
                                    editable: false,
                                    listeners: {
                                        afterRender: function (combo)
                                        {
                                            if ($.cookie("UNIT_TYPE") == 2)
                                            {
                                                combo.setValue($.cookie("UNIT_ID"));
                                            } else
                                            {
                                                combo.setValue(comboxfirst);
                                            }
                                        },

                                        change: function (objj)
                                        {
                                            //级联下方面板数据及刷新
                                            var ACtreePanel = objj.up('panel').down('panel[name=ACtreePanel]');
                                            if (ACtreePanel)
                                            {
                                                ACtreePanel.destroy();
                                            }
                                            objj.up('panel').add({
                                                xtype: 'panel',
                                                width: '100%',
                                                name: 'ACtreePanel',
                                                border: false,
                                                listeners: {
                                                    render: function (obj)
                                                    {
                                                        GetAjax({
                                                            url: 'api/AccountRegister/GetUnitsAccountRegister?unitID=' + objj.getValue(),
                                                            complete: function (jqXHR, textStatus, errorThrown)
                                                            {
                                                                if (textStatus == "success")
                                                                {
                                                                    var treeMenus = jQuery.parseJSON(jqXHR.responseText);
                                                                    var treePanel = Ext.create('Ext.tree.Panel', {
                                                                        border: false,
                                                                        rootVisible: false,
                                                                        name: 'treePanel',
                                                                        collapsed: false,
                                                                        root: {
                                                                            children: treeMenus,
                                                                        },
                                                                        listeners: {
                                                                            itemclick: function (itemObj, record, item, index)
                                                                            {
                                                                                var store = this.up('panel[name=accountpanel]').getActiveTab().down('grid').getStore();
                                                                                var filters = [];
                                                                                if (record.data.id != null)
                                                                                {
                                                                                    var year = record.data.year;
                                                                                    var month = record.data.month;
                                                                                    var unitid = objj.getValue();
                                                                                    var taskclassid = record.data.parentId;
                                                                                    if ($.trim(year) != null && $.trim(month) != "")
                                                                                    {
                                                                                        filters.push({ property: "year", value: year });
                                                                                        filters.push({ property: "month", value: month });
                                                                                    }
                                                                                    if ($.trim(unitid) != null && $.trim(unitid) != "")
                                                                                    {
                                                                                        filters.push({ property: "unitid", value: unitid });
                                                                                    }
                                                                                    if ($.trim(taskclassid) != null && $.trim(taskclassid) != "")
                                                                                    {
                                                                                        filters.push({ property: "taskclassid", value: taskclassid });
                                                                                    }
                                                                                }

                                                                                FilterStore(store, filters);
                                                                                store.reload();
                                                                            }
                                                                        }
                                                                    });
                                                                    treePanel.expandAll();
                                                                    obj.add({
                                                                        items: treePanel,
                                                                        border: false,
                                                                        //overflowY: 'auto',
                                                                    });
                                                                }
                                                            }
                                                        })
                                                    }
                                                }

                                            })
                                        }
                                    }
                                },
                                ]

                            },
                    {
                        xtype: 'panel',
                        width: '2%',
                        height: '100%',
                        border: false,
                    },
                    {
                        xtype: 'grid',
                        columnLines: true,
                        layout: 'fit',
                        width: '76%',
                        height: '100%',
                        cellTip: true,
                        stripeRows: true,
                        autoExpandColumn: '生成台账',
                        name: 'right',
                        margin: '20 0 0 0',
                        columns: [
                                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                { header: '台账标题', dataIndex: 'title', flex: 1 },
                                { header: '台账任务分类', dataIndex: 'typeName', flex: 1 },
                                { header: '台账上报时间', dataIndex: 'registertime', flex: 1 },
                                { header: '台账上报人', dataIndex: 'createuserName', flex: 1 },
                                { header: '生成台账', dataIndex: 'wordname', flex: 1 }
                        ],
                        store: store,
                        tbar: [
                            {
                                text: '查看',
                                handler: 'onLook',
                                handleMouseEvents: false
                            },
                            {
                                text: '编辑',
                                handler: 'onEdit',
                                handleMouseEvents: false
                            },
                            {
                                text: '下载',
                                handler: 'onDownLoad',
                                handleMouseEvents: false
                            },
                            '->',
                            {
                                text: '搜索条件',
                                handler: 'onQuery',
                                handleMouseEvents: false
                            }
                        ],
                        bbar: {
                            xtype: 'pagingtoolbar',
                            displayInfo: true
                        }
                    }
                        ]
                    },
                    {
                        title:  '历史台账登记',
                        layout: 'hbox',
                        border: false,
                        name: 'visitTab',
                        xtype: 'panel',
                        items: [
                            {
                                xtype: 'panel',
                                width: '20%',
                                height: '100%',
                                layout: 'vbox',
                                margin: '20 0 0 20',
                                items: [{
                                    fieldLabel: '',
                                    width: '100%',
                                    height: '5%',
                                    name: 'unitid',
                                    xtype: 'combo',
                                    store: comboxstore,
                                    valueField: 'ID',
                                    displayField: 'Name',
                                    border: false,
                                    editable: false,
                                    listeners: {
                                        beforeRender: function (combo)
                                        {
                                            if ($.cookie("UNIT_TYPE") == 2)
                                            {
                                                combo.setValue($.cookie("UNIT_ID"));
                                            }else
                                            {
                                                combo.setValue(comboxfirst);
                                            }
                                        },

                                        change: function (objj)
                                        {
                                            //级联下方面板数据及刷新
                                            var ACHistreePanel = objj.up('panel').down('panel[name=ACHistreePanel]');
                                            if (ACHistreePanel)
                                            {
                                                ACHistreePanel.destroy();
                                            }
                                            objj.up('panel').add({
                                                xtype: 'panel',
                                                width: '100%',
                                                name: 'ACHistreePanel',
                                                border: false,
                                                listeners: {
                                                    render: function (obj)
                                                    {
                                                        GetAjax({
                                                            url: 'api/AccountRegister/GetUnitsAccountRegister?unitID=' + objj.getValue(),
                                                            complete: function (jqXHR, textStatus, errorThrown)
                                                            {
                                                                if (textStatus == "success")
                                                                {
                                                                    var treeMenus = jQuery.parseJSON(jqXHR.responseText);
                                                                    var treePanel = Ext.create('Ext.tree.Panel', {
                                                                        border: false,
                                                                        rootVisible: false,
                                                                        name: 'treePanel',
                                                                        collapsed: false,
                                                                        root: {
                                                                            children: treeMenus,
                                                                        },
                                                                        listeners: {
                                                                            itemclick: function (itemObj, record, item, index)
                                                                            {
                                                                                var store = this.up('panel[name=accountpanel]').getActiveTab().down('grid').getStore();
                                                                                var filters = [];
                                                                                if (record.data.id != null)
                                                                                {
                                                                                    var year = record.data.year;
                                                                                    var month = record.data.month;
                                                                                    var unitid = objj.getValue();
                                                                                    var taskclassid = record.data.parentId;
                                                                                    if ($.trim(month) != "")
                                                                                    {
                                                                                        filters.push({ property: "month", value: month });
                                                                                    }
                                                                                    if ($.trim(unitid) != null && $.trim(unitid) != "")
                                                                                    {
                                                                                        filters.push({ property: "unitid", value: unitid });
                                                                                    }
                                                                                    if ($.trim(taskclassid) != null && $.trim(taskclassid) != "")
                                                                                    {
                                                                                        filters.push({ property: "taskclassid", value: taskclassid });
                                                                                    }
                                                                                }

                                                                                FilterStore(store, filters);
                                                                                store.reload();
                                                                            }
                                                                        }
                                                                    });
                                                                    treePanel.expandAll();
                                                                    obj.add({
                                                                        items: treePanel,
                                                                        border: false,
                                                                        //overflowY: 'auto',
                                                                    });
                                                                }
                                                            }
                                                        })
                                                    }
                                                }

                                            })
                                        }
                                    }
                                },
                                ]

                            },
                    {
                        xtype: 'panel',
                        width: '2%',
                        height: '100%',
                        border: false,
                    },
                    {
                        xtype: 'grid',
                        columnLines: true,
                        layout: 'fit',
                        width: '76%',
                        height: '100%',
                        cellTip: true,
                        stripeRows: true,
                        autoExpandColumn: '生成台账',
                        name: 'right',
                        margin: '20 0 0 0',
                        columns: [
                                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                { header: '台账标题', dataIndex: 'title', flex: 1 },
                                { header: '台账任务分类', dataIndex: 'typeName', flex: 1 },
                                { header: '台账上报时间', dataIndex: 'registertime', flex: 1 },
                                { header: '台账上报人', dataIndex: 'createuserName', flex: 1 },
                                { header: '生成台账', dataIndex: 'wordname', flex: 1 }
                        ],
                        store: store,
                        tbar: [
                            {
                                text: '查看',
                                handler: 'onLook',
                                handleMouseEvents: false
                            },
                            //{
                            //    text: '编辑',
                            //    handler: 'onEdit',
                            //    handleMouseEvents: false
                            //},
                            {
                                text: '下载',
                                handler: 'onDownLoad',
                                handleMouseEvents: false
                            },
                            '->',
                            {
                                text: '搜索条件',
                                handler: 'onQuery',
                                handleMouseEvents: false
                            }
                        ],
                        bbar: {
                            xtype: 'pagingtoolbar',
                            displayInfo: true
                        },

                    }
                        ],
                    },
                ],
                listeners: {
                    afterrender: function (panel)
                    {
                        var bar = panel.tabBar;
                        bar.insert(9, [
                        {
                            xtype: 'component', //撑开
                            flex: 1
                        },
                        Ext.create('Ext.form.field.ComboBox', {
                            width: 200,
                            labelWidth: 70,
                            margin: '2 10 3 4',
                            fieldLabel: '选择年份',
                            xtype: 'combo',
                            name: 'yyear',
                            id: 'yyear',
                            valueField: 'ID',
                            displayField: 'Year',
                            editable: false,
                            store: Ext.create('Ext.data.Store', {
                                data: [
                                    { ID: '', Year: '' },
                                    { ID: dt.getFullYear(), Year: dt.getFullYear() },
                                    { ID: dt.getFullYear() - 1, Year: dt.getFullYear() - 1 },
                                    { ID: dt.getFullYear() - 2, Year: dt.getFullYear() - 2 },
                                    { ID: dt.getFullYear() - 3, Year: dt.getFullYear() - 3 },
                                    { ID: dt.getFullYear() - 4, Year: dt.getFullYear() - 4 },
                                ]
                            }),
                            value: '',
                            listeners: {
                                render: function (obj)
                                {
                                    Ext.getCmp('yyear').hide();
                                    this.getStore().reload();   
                                },
                                change: function (obj)
                                {
                                    var year = Ext.getCmp('yyear').getValue();
                                    var store = this.up('panel[name=accountpanel]').getActiveTab().down('grid').getStore();
                                    var filters = [];
                                    if ($.trim(year) != null)
                                    {
                                        filters.push({ property: "year", value: year });
                                    }
                                    FilterStore(store, filters);
                                    store.reload();
                                    var yearstore = Ext.getCmp('yyear').getStore();
                                }
                            }
                        }),
                        Ext.create('Ext.button.Button', {
                            width: 100,
                            id:'addAcountbtn',
                            margin: "2 2 3 4",
                            text: "添加台账",
                            handler: 'onAdd'
                        }),

                        ]);

                    },
                    'tabchange': function (tabPanel, newCard, oldCard, eOpts)
                    {
                        var contentGrid = newCard.down('grid');
                        var contentBar = newCard.down('pagingtoolbar');
                        var bar = newCard.down('tabpanel');
                        var store = Ext.create('TianZun.store.accountmanager.accountregister.AccountRegisterList');
                        if (newCard.title == year + "年台账登记")
                        {
                            store.getProxy().url = "api/AccountRegister/GetAccountRegisterList?type=1";
                            Ext.getCmp('yyear').hide();
                            Ext.getCmp('addAcountbtn').show();
                        }
                        else
                        {
                            store.getProxy().url = "api/AccountRegister/GetAccountRegisterList?type=2";
                            Ext.getCmp('yyear').show();
                            Ext.getCmp('addAcountbtn').hide();
                        }
                        contentGrid.setStore(store);
                        contentBar.setStore(store);
                        store.load();
                    }
                }
            }
        ]

        this.callParent();
    }
});