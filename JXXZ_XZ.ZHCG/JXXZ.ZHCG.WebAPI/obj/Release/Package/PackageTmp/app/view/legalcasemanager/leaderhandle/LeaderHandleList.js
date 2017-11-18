Ext.define('TianZun.view.legalcasemanager.leaderhandle.LeaderHandleList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.leaderHandleList',
    title: '执法办案管理> 领导督办',
    requires: [
      'TianZun.controller.legalcasemanager.leaderHandle',
      'TianZun.ux.ExportExcelButton'
    ],
    controller: 'leaderHandle',
    layout: 'fit',
    sortable: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.legalcasemanager.LeaderList');

        this.items = [
            {
                xtype: 'form',
                layout: 'fit',
                border: false,
                items: {
                    xtype: 'grid',
                    layout: 'fit',
                    selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                    columns: [
                        { width: 35, dataIndex: 'State',},
                        { header: '案件编号', dataIndex: 'casebh', flex: 1, },
                        { header: '案件名称', dataIndex: 'casename', flex: 1 },
                        { header: '案件来源', dataIndex: 'sourcename', flex: 1 },
                        { header: '提交时间', dataIndex: 'dealtime', flex: 1 },
                        { header: '超期时间', dataIndex: 'etime', flex: 1 },
                        { header: '当前环节', dataIndex: 'wfsname', flex: 1 },
                        { header: '案件类型', dataIndex: 'zd_name', flex: 1 },
                        { header: '处理人', dataIndex: 'dealname', flex: 1 },
                        { header: '所属中队', dataIndex: 'unitname', flex: 1 },
                        { header: '督办状态', dataIndex: 'supid', flex: 1 }
                    ],
                    store: store,
                    tbar: [
                        {
                            text: '查看详情',
                            handler: 'LookCaseDetail'
                        },
                        {
                            text: '督办',
                            handler: 'onSupervise'
                        },
                        {
                            xtype: 'exportbtn',
                            text: '导出',
                            webapi: 'api/Leadersupervise/ExportExcel',
                            excelname: '领导督办统计表',
                            exceltitle: '领导督办统计表',
                            extrapra: { userid: $.cookie('USER_ID'), status: 2 }
                        },
                        {
                            text: '查看历史',
                            handler: 'onLookOld'
                        },
                       '->',
                        {
                            text: '搜索条件',
                            handler: 'onQueryld',
                            handleMouseEvents: false
                        }
                    ],
                    bbar: {
                        xtype: 'pagingtoolbar',
                        store: store,
                        displayInfo: true
                    },                    
                },                
            },
            
        ]

        this.callParent();
    },
   
});