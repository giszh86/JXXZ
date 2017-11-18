Ext.define('TianZun.view.lowlying.lowlyingmanagement.LowLyingList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.lowlyingList',
    title: '低洼地段管理 > 基础信息',
    layout: 'fit',

    requires: [
        'TianZun.controller.lowlyingmanager.LowlyingTask',
    ],
    controller: 'lowlyingTask',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.lowlying.LowLyingListStore');
       
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
                        title: '管理列表',
                        name: 'lowlyingMgnTab',
                        items: [
                            {
                                xtype: 'grid',
                                selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                                multiSelect: true,
                                columnLines: true,
                                columns: [
                                        { header: '编号', dataIndex: 'id', flex: 1 },
                                        { header: '监测点名称', dataIndex: 'jkdmc', flex: 1 },
                                        { header: '地址', dataIndex: 'dz', flex: 1 },
                                        { header: '维护单位', dataIndex: 'whdw', flex: 1 },
                                        //{ header: '维护人员', dataIndex: 'whry', flex: 1 },
                                        { header: '报警临界值', dataIndex: 'bjljz', flex: 1 },
                                        { header: '报警次数', dataIndex: 'lsbjsl', flex: 1 },
                                ],
                                store: store,
                                tbar: [
                                    {
                                        text: '查看',
                                        handler: 'onDetail',
                                        handleMouseEvents: false
                                    },
                                    {
                                        text: '编辑',
                                        handler: 'onEdit',
                                        handleMouseEvents: false
                                    },
                                    //'->',
                                    //{
                                    //    text: '搜索条件',
                                    //    handler: 'onQuery',
                                    //    handleMouseEvents: false
                                    //}
                                ],
                                bbar: {
                                    xtype: 'pagingtoolbar',
                                    displayInfo: true
                                }
                            }
                        ]
                    }
                ]
            }]
        this.callParent();
    }
});