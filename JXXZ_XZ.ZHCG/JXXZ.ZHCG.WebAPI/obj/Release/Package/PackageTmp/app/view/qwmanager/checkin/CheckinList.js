Ext.define('TianZun.view.qwmanager.checkin.CheckinList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.checkinList',
    title: '人员勤务管理 > 签到管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.qwmanager.Checkin',
           'TianZun.ux.ExportExcelButton'
    ],
    controller: 'checkin',
    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.qwmanager.Checkin');
        this.items = [{
            xtype: 'tabpanel',
            border: false,
            plain: true,
            bodyBorder: false,
            items: [
                {
                    title: '签到管理',
                    xtype: 'panel',
                    layout: 'fit',
                    name: 'qdpanel',
                    items: [{
                        xtype: 'grid',
                        selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                        multiSelect: true,
                        columnLines: true,
                        columns: [
                            { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                            { header: '所属中队', dataIndex: 'name', flex: 1, align: 'center' },
                            { header: '姓名', dataIndex: 'displayname', flex: 1, align: 'center' },
                            { header: '签到日期', dataIndex: 'signdate', flex: 1, align: 'center' },
                            { header: '计划签到时间', dataIndex: 'planchecktime', flex: 1, align: 'center' },
                            { header: '计划签退时间', dataIndex: 'plansignback', flex: 1, align: 'center' },
                            { header: '实际签到时间', dataIndex: 'actualcheckin', flex: 1, align: 'center', },
                            { header: '实际签退时间', dataIndex: 'actualsignback', flex: 1, align: 'center' },
                            { header: '签到状态', dataIndex: 'checkinstate', flex: 1, align: 'center' },
                            { header: '签退状态', dataIndex: 'signbackstate', flex: 1, align: 'center' },
                        ],
                        store: store,
                        tbar: [
                            {
                                xtype: 'exportbtn',
                                text: '导出',
                                webapi: 'api/Checkin/ExportExcel',
                                excelname: '队员签到统计表',
                                exceltitle: '队员签到统计表',
                                extrapra: { type: 1 },
                                timeclose: 3000,
                                formsubmit: true
                            },
                            '->',
                            {
                                text: '查询条件',
                                handler: 'onqueryable',
                            }],
                        bbar: {
                            xtype: 'pagingtoolbar',
                            displayInfo: true
                        }
                    }]
                }]
        }]
        this.callParent();
    }
})