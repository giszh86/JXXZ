Ext.define('TianZun.view.lawenforcementsupervision.blacklist.BlackList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.blackList',
    title: '执法对象监管 > 执法对象管理>监管对象',
    layout: 'fit',

    requires: [
        'TianZun.controller.lawenforcementsupervision.LawObject',
         'TianZun.ux.ExportExcelButton'
    ],
    controller: 'lawObject',

    border: false,
    bodyBorder: false,
    initComponent: function ()
    {
        var store = Ext.create('TianZun.store.lawenforcementsupervision.BlackListStore');
        store.getProxy().url = 'api/LawObject/GetBlackList?type=1';

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
                        title: '沿街店家',
                        xtype: 'panel',
                        name: 'todoPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '名称', dataIndex: 'shopname', flex: 1, align: 'center', align: 'center' },
                                    { header: '许可证', dataIndex: 'licencecard', flex: 1, align: 'center' },
                                    { header: '许可证有效时间', dataIndex: 'validtime', flex: 1, align: 'center' },
                                    { header: '负责人', dataIndex: 'person', flex: 1, align: 'center' },
                                    { header: '联系电话', dataIndex: 'contactphone', flex: 1, align: 'center' },
                                    { header: '地址', dataIndex: 'address', flex: 1, align: 'center' },
                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '查看',
                                    handler: 'onLookdj',
                                    handleMouseEvents: false
                                },
                                 {
                                     xtype: 'exportbtn',
                                     text: '导出',
                                     webapi: 'api/LawObject/ExportExcel',
                                     excelname: '沿街店家统计表',
                                     exceltitle: '沿街店家统计表',
                                     extrapra: { type: 1 },
                                 },
                                '->',
                                {
                                    text: '搜索条件',
                                    handler: 'onQuerydj',
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
                    {
                        layout: 'fit',
                        border: false,
                        title: '小摊小贩',
                        xtype: 'panel',
                        name: 'finishPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            columns: [
                                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                     { header: '姓名', dataIndex: 'person', flex: 1, align: 'center' },
                                    { header: '联系电话', dataIndex: 'contactphone', flex: 1, align: 'center' },
                                    { header: '类型', dataIndex: 'hawkertype', flex: 1, align: 'center' },
                                    { header: '地点描述', dataIndex: 'sourceareaname', flex: 1, align: 'center' },
                            ],

                            tbar: [
                                {
                                    text: '查看',
                                    handler: 'onLookxf',
                                    handleMouseEvents: false
                                },
                                {
                                    xtype: 'exportbtn',
                                    text: '导出',
                                    webapi: 'api/LawObject/ExportExcel',
                                    excelname: '小摊小贩统计表',
                                    exceltitle: '小摊小贩统计表',
                                    extrapra: { type: 2 },
                                },
                                '->',
                                {
                                    text: '搜索条件',
                                    handler: 'onQueryxf',
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
                    'tabchange': function (tabPanel, newStore, oldStore, eOpts)
                    {
                        var contentGrid = newStore.down('grid');//grid
                        var contentBar = newStore.down('pagingtoolbar')//bbar
                        if (newStore.title == "沿街店家")
                        {
                            store = Ext.create('TianZun.store.lawenforcementsupervision.BlackListStore');
                            store.getProxy().url = 'api/LawObject/GetBlackList?type=1';
                            contentGrid.setStore(store);
                            contentBar.setStore(store);
                            store.load();
                        } else if (newStore.title == "小摊小贩")
                        {
                            store.getProxy().url = 'api/LawObject/GetBlackList?type=2';
                            contentGrid.setStore(store);
                            contentBar.setStore(store);
                            store.load();
                        }
                    }
                }
            }
        ]

        this.callParent();
    }
});