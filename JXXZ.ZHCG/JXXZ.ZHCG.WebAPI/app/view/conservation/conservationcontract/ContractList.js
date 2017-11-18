Ext.define('TianZun.view.conservation.conservationcontract.ContractList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contractList',
    title: '养护作业监管 > 养护合同管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.conservation.conservationcontract',
        'TianZun.ux.ExportExcelButton'
    ],
    controller: 'conservationcontract',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.conservation.nowConversation');

        this.items = [
            {
                xtype: 'tabpanel',
                border: false,
                plain: true,
                bodyBorder: false,
                items: [
                    {
                        layout: 'fit',
                        border: false,
                        title: '当前养护合同',
                        xtype: 'panel',
                        name: 'currentPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    {
                                        header: '合同状态', dataIndex: 'contractstate', flex: 1,
                                    },
                                    { header: '养护合同编号', dataIndex: 'contractnum', flex: 1 },
                                    { header: '养护合同名称', dataIndex: 'contractname', flex: 1 },
                                    { header: '养护内容类型', dataIndex: 'contacttypename', flex: 1 },
                                    { header: '甲方单位', dataIndex: 'jfdw', flex: 1 },
                                    { header: '甲方代表', dataIndex: 'jfdb', flex: 1 },
                                    { header: '乙方单位', dataIndex: 'yfdw', flex: 1 },
                                    { header: '乙方代表', dataIndex: 'yfdb', flex: 1 },
                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '删除',
                                    handler: 'onDelete',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '编辑',
                                    handler: 'onEdit',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                },
                                {
                                    xtype: 'exportbtn',
                                    text: '导出',
                                    webapi: 'api/Contract/ExportExcel',
                                    excelname: '当前养护合同统计表',
                                    exceltitle: '当前养护合同统计表',
                                    extrapra: { type: 1 },
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
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '历史养护合同',
                        xtype: 'panel',
                        name: 'historyPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            columns: [
                                      { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                      { header: '合同状态', dataIndex: 'contractstate', flex: 1 },
                                    { header: '养护合同编号', dataIndex: 'contractnum', flex: 1 },
                                    { header: '养护合同名称', dataIndex: 'contractname', flex: 1 },
                                    { header: '养护内容类型', dataIndex: 'contacttypename', flex: 1 },
                                    { header: '甲方单位', dataIndex: 'jfdw', flex: 1 },
                                    { header: '甲方代表', dataIndex: 'jfdb', flex: 1 },
                                    { header: '乙方单位', dataIndex: 'yfdw', flex: 1 },
                                    { header: '乙方代表', dataIndex: 'yfdb', flex: 1 },
                            ],

                            tbar: [
                                {
                                    text: '查看',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                }, {
                                    xtype: 'exportbtn',
                                    text: '导出',
                                    webapi: 'api/Contract/ExportExcel',
                                    excelname: '历史养护合同统计表',
                                    exceltitle: '历史养护合同统计表',
                                    extrapra: { type: 2 },
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
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                ],
                listeners: {
                    afterrender: function (panel) {
                        var bar = panel.tabBar;
                        bar.insert(9, [
                        {
                            xtype: 'component', //撑开
                            flex: 1
                        },
                        Ext.create('Ext.button.Button', {
                            width: 100,
                            margin: "2 2 3 4",
                            text: "添加合同",
                            handler: 'onAdd'
                        })
                        ]);
                    },
                    'tabchange': function (tabPanel, newyhht, oldyhht, eOpts) {
                        var contentGrid = newyhht.down('grid');
                        var contentBar = newyhht.down('pagingtoolbar')
                        if (newyhht.title == "当前养护合同") {
                            store = Ext.create('TianZun.store.conservation.nowConversation');
                            contentGrid.setStore(store);
                            contentBar.setStore(store);
                        } else if (newyhht.title == "历史养护合同") {
                            alreadyStore = Ext.create('TianZun.store.conservation.HistoryConversation');
                            contentGrid.setStore(alreadyStore);
                            contentBar.setStore(alreadyStore);
                            alreadyStore.load();
                        } 
                    }
                }
            }
        ]

        this.callParent();
    }
});