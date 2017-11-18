Ext.define('TianZun.view.lawenforcementsupervision.basicinformation.CarList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.carList',
    title: '执法对象监管 > 基础信息管理 > 车辆管理',
    layout: 'fit',

    requires: [
      'TianZun.controller.lawenforcementsupervision.CarController',
    ],
    controller: 'carController',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.lawenforcementsupervision.CarStore');

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
                        title: '车辆管理',
                        name: 'visitTab',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '车辆编号', dataIndex: 'code', flex: 1 },
                                    { header: '所属部门', dataIndex: 'unitname', flex: 1 },
                                    { header: '车牌号', dataIndex: 'carnumber', flex: 1 },
                                    { header: '车辆类型', dataIndex: 'cartypename', flex: 1 },
                                    { header: '终端号码', dataIndex: 'cartel', flex: 1 },
                                    { header: '车辆状态', dataIndex: 'carstatus', flex: 1 },
                            ],
                            store: store,
                            tbar: [
                                  {
                                      text: '编辑',
                                      handler: 'onEdit',
                                      handleMouseEvents: false
                                  },
                                {
                                    text: '删除',
                                    handler: 'onDelete',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onDetail',
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
                        }]
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
                            text: "添加车辆",
                            handler: 'onAdd'
                        })
                        ]);
                    },
                }
            }
        ]

        this.callParent();
    }
});