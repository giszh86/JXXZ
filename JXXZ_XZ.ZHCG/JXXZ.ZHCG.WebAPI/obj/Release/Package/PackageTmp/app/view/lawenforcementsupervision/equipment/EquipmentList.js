Ext.define('TianZun.view.lawenforcementsupervision.equipment.EquipmentList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.equipmentList',
    title: '执法对象监管 > 设备管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.lawenforcementsupervision.Equipment',
        'TianZun.ux.ExportExcelButton'
    ],
    controller: 'equipment',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.lawenforcementsupervision.Equipment');

        this.items = [
            {
                xtype: 'tabpanel',
                border: false,
                plain: true,
                bodyBorder: false,
                items: [{
                    layout: 'fit',
                    bordor: false,
                    title: '设备管理',
                    xtype: 'panel',
                    name: 'sbgl',
                    items:[{
                        layout: 'fit',
                        xtype: 'grid',
                        selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                        multiSelect: true,
                        columnLines: true,
                        columns: [
                                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                { header: '设备名称', dataIndex: 'devicename', flex: 1 },
                                { header: '品牌', dataIndex: 'brand', flex: 1 },
                                { header: '型号', dataIndex: 'model', flex: 1 },
                                { header: '设备类别', dataIndex: 'zd_name', flex: 1 },
                                { header: '设备数量', dataIndex: 'devicesum', flex: 1 },
                                { header: '库存数', dataIndex: 'stocknum', flex: 1 },
                                { header: '更新时间', dataIndex: 'updatetime', flex: 1 },
                        ],
                        store: store,
                        tbar: [
                            {
                                text: '查看',
                                handler:'onLook',
                            },
                            {
                                text: '编辑',
                                handler: 'onEdit',
                                handleMouseEvents: false
                            },
                             {
                                 text: '设备入库',
                                 handler: 'onrkDispatch',
                                 handleMouseEvents: false
                             },
                              {
                                  text: '设备出库',
                                  handler: 'onckDispatch',
                                  handleMouseEvents: false
                              },
                               {
                                   xtype: 'exportbtn',
                                   text: '导出',
                                   webapi: 'api/Equipment/ExportExcel',
                                   excelname: '设备管理统计表',
                                   exceltitle: '设备管理统计表',
                                   extrapra: { },
                               },
                            '->',
                            {
                                text: '搜索条件',
                                handler: 'onQuerysb',
                                handleMouseEvents: false
                            }
                        ],
                        bbar: {
                            xtype: 'pagingtoolbar',
                            displayInfo: true
                        },
                    }],
                }
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
                            text: "新增",
                            handler: 'onAdd'
                        })
                        ]);
                    },
                }
            }]
        this.callParent();
    }
});