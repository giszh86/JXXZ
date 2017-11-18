Ext.define('TianZun.view.qwmanager.inspectionlog.InspectionLogList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.inspectionLogList',
    title: '人员勤务管理 > 巡查日志管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.qwmanager.PatrolLog'
    ],
    controller: 'patrolLog',
    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.qwmanager.PatrolLogs');
        this.items = [{
            xtype: 'panel',
            layout: 'fit',
            name: 'xcpanel',
            items: [{
                xtype: 'grid',
                columnLines: true,
                columns: [
                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                    { header: '所属中队', dataIndex: 'unitname', flex: 1 ,align:'center'},
                    { header: '巡查队员', dataIndex: 'username', flex: 1, align: 'center' },
                    { header: '检查项', dataIndex: 'checkname', flex: 1, align: 'center' },
                    { header: '是否发现问题', dataIndex: 'isfound', flex: 1, align: 'center' },
                    { header: '填报时间', dataIndex: 'reporttime', flex: 1, align: 'center' },
                    { header: '备注', dataIndex: 'remark', flex: 1, align: 'center' }
                ],
                store:store,
                tbar: [
                    '->',
                    {
                        text: '查询条件',
                        handler:'onqueryable',
                    }],
                bbar: {
                    xtype: 'pagingtoolbar',
                    displayInfo: true
                }
            }]
        }]
        this.callParent();
    }
})