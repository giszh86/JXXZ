Ext.define('TianZun.view.uav.basicinformation.InformationList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.informationList',
    title: '无人机管理 > 基本信息',
    layout: 'fit',
    requires: [
        'TianZun.controller.uav.BasicinFormAtion',
    ],
    controller: 'basicinFormAtion',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.uvas.basicinfoListStore');
        var me = this;
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
                        title: '基本信息',
                        xtype: 'panel',
                        name: 'todoPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '编号', dataIndex: 'ovanum', flex: 1 },
                                    { header: '设备名称', dataIndex: 'ovaname', flex: 1 },
                                    { header: '设备终端', dataIndex: 'device', flex: 1 },
                                    { header: '管理单位', dataIndex: 'unit', flex: 1 },
                            ],
                            store: store,
                            tbar: [
                                //{
                                //    text: '删除',
                                //    handler: 'onDelete',
                                //    handleMouseEvents: false
                                //},
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
                        }],
                    }],
                listeners: {
                    afterrender: function (panel) {
                        var bar=panel.tabBar;
                        bar.insert(9,[
                            {
                            xtype: 'component',
                            flex:1
                            },
                            Ext.create('Ext.button.Button', {
                            width: 100,
                            margin: '2 2 3 4',
                            text: "新增",
                            handler:'onAdd',
                        })
                        ])
                    }
                }
         }]
        this.callParent();
    }
});