Ext.define('TianZun.view.illegalconstruction.demolition.DemolitionList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.demolitionList',
    title: '违章建筑管理 > 拆迁管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.illegalconstruction.DemolitionList',
    ],
    controller: 'demolitionlist',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.illegalconstruction.DemolitionStore');
       
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
                        title: '拆迁管理',
                        xtype: 'panel',
                        name: 'todoPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '项目名称', dataIndex: 'projectname', flex: 1 },
                                    { header: '项目负责人', dataIndex: 'projectleader', flex: 1 },
                                    { header: '联系电话', dataIndex: 'contackphone', flex: 1 },
                                    { header: '项目启动时间', dataIndex: 'starttime', flex: 1 },
                                    { header: '项目结束时间', dataIndex: 'endtime', flex: 1 },
                                    { header: '地址', dataIndex: 'address', flex: 1 },
                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '编辑',
                                    handler: 'onEditcq',
                                 
                                },
                                {
                                    text: '查看',
                                    handler: 'onDetail',
                                   
                                },
                                '->',
                                {
                                    text: '搜索条件',
                                    handler: 'onQuerycq',
                                    handleMouseEvents: false
                                }
                            ],
                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true
                            },
                        }]
                    },
                   ],
                listeners:
                    {
                        afterrender: function (panel) {
                            var bar = panel.tabBar;
                            bar.insert(9, [
                            {
                                xtype: 'component',
                                flex: 1
                            },
                            Ext.create('Ext.button.Button', {
                                width: 100,
                                margin: "2 2 3 4",
                                text: "新增拆迁",
                                handler: 'onAddcq'
                            })
                            ]);
                        },
                    }
                
            }]

        this.callParent();
    }
});