Ext.define('TianZun.view.conservation.conservationunit.UnitList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.unitList',
    title: '养护作业监管 > 养护单位管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.conservation.conservationunit',
        'TianZun.ux.ExportExcelButton'
    ],
    controller: 'conservationunit',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.conservation.ConservationunitStore');

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
                        title: '养护单位管理',
                        xtype: 'panel',
                        name: 'todoPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '是否启用', dataIndex: 'isenadlename', flex: 1 },
                                    { header: '公司名称', dataIndex: 'companyname', flex: 1 },
                                    { header: '公司类型', dataIndex: 'companytypename', flex: 1 },
                                    { header: '法人', dataIndex: 'legal', flex: 1 },
                                    { header: '联系人', dataIndex: 'contact', flex: 1 },
                                    { header: '联系方式', dataIndex: 'mobilephone', flex: 1 },
                                    { header: '联系地址', dataIndex: 'address', flex: 1 },
                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '编辑',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '删除',
                                    handler: 'onDelete',
                                    handleMouseEvents: false
                                },
                                {
                                    xtype: 'exportbtn',
                                    text: '导出',
                                    webapi: 'api/Company/ExportExcel',
                                    excelname: '养护单位管理统计表',
                                    exceltitle: '养护单位管理统计表',
                                    extrapra: { },
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
                        }]
                    },
                   
                ],
                listeners: {
                    afterrender: function (panel) {
                        var bar = panel.tabBar;
                        bar.insert(9, [{
                            xtype: 'component',
                            flex:1
                        },
                        Ext.create('Ext.button.Button', {
                            width: 100,
                            margin: '2 2 3 4',
                            text: '新增',
                            handler: 'onAdd',
                        })
                        ])
                    }
                },
            }]

        this.callParent();
    }
});