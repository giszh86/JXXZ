Ext.define('TianZun.view.legalcasemanager.statisticalreport.StatisticalReportList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.statisticalReportList',
    title: '执法办案管理 > 统计报表',
    layout: 'fit',

    requires: [
        'TianZun.controller.legalcasemanager.CaseStatisticalReport',
        'TianZun.ux.ExportExcelButton'
    ],
    controller: 'caseStatisticalReport',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        var dt = new Date();
        var monthStore = Ext.create('TianZun.store.citizenservice.StatisticalReport');
        var store = Ext.create('TianZun.store.legalcasemanager.SimpleCaseList', { proxy: { extraParams: { type: 2 } } });
        var commonstore = Ext.create('TianZun.store.legalcasemanager.StatisticalCommonCaseList');
        var simplestore = Ext.create('TianZun.store.legalcasemanager.StatisticalSimpleCaseList');

        this.items = [{
            xtype: 'tabpanel',
            border: false,
            plain: true,
            bodyBorder: false,
            items: [{
                layout: 'fit',
                border: false,
                title: '一般案件',
                xtype: 'panel',
                items: [{
                    xtype: 'grid',
                    selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                    columnLines: true,
                    columns: [
                        { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                        { header: '案件来源时间', dataIndex: 'ay_createtime' },
                        { header: '立案号', dataIndex: 'casebh'},
                        { header: '立案时间', dataIndex: 'sitedatetime' },
                        { header: '案件名称', dataIndex: 'casename' },
                        { header: '违法地点', dataIndex: 'caseaddress' },
                        {
                            header: '涉及认定或鉴定的', dataIndex: '',
                            columns: [
                                { header: '去函时间', dataIndex: 'ysh_ysrq' },
                                { header: '回函时间', dataIndex: 'ysh_hhsj' }
                            ]
                        },
                        { header: '调查终结时间', dataIndex: 'dczj_createtime' },
                        { header: '行政处罚事先告知时间', dataIndex: 'sxgz_createtime' },
                        {
                            header: '涉及申述申辩、听证的', dataIndex: '',
                            columns: [
                                { header: '陈述申辩时间', dataIndex: 'cssbtime' },
                                { header: '听证时间', dataIndex: 'tzcltime' }
                            ]
                        },
                        { header: '行政处罚时间', dataIndex: 'xzcfbgcltime' },
                        { header: '行政处罚送达时间', dataIndex: 'cfjd_createtime' },
                        { header: '处罚内容', dataIndex: 'xzcfnr' },
                        { header: '占地面积', dataIndex: 'zdmj' },
                        { header: '耕地面积', dataIndex: 'gdmj' },
                        { header: '国土建筑面积', dataIndex: 'gtjzmj'},
                        { header: '规划建筑面积', dataIndex: 'ghjzmj'},
                        { header: '涉及金额', dataIndex: 'xzcfje' },
                        { header: '罚款缴纳时间', dataIndex: 'fkjntime' },
                        { header: '罚没款发票编号', dataIndex: 'fkpjbh' },
                        {
                            header: '涉及移送的', dataIndex: '',
                            columns: [
                                { header: '移送公安时间', dataIndex: 'dw_ga' },
                                { header: '移送国资时间', dataIndex: 'dw_gz' },
                                { header: '移送纪委时间', dataIndex: 'dw_jw' },
                                { header: '移送法院时间', dataIndex: 'dw_fy' },
                            ]
                        },
                        {
                            header: '涉及执行的', dataIndex: '',
                            columns: [
                                { header: '催告时间', dataIndex: 'cgsj' },
                                { header: '申请时间', dataIndex: 'sqsj' },
                                { header: '执行时间', dataIndex: 'zxsj' },
                            ]
                        },
                        { header: '结案时间', dataIndex: 'ajja_createtime' },
                        { header: '所属中队', dataIndex: 'zbunitname' },
                        { header: '主办人', dataIndex: 'zbusername' },
                        { header: '协办人', dataIndex: 'xbusername' },
                        { header: '备注', dataIndex: 'remark' },

                    ],
                    store: commonstore,
                    tbar: [
                        '->',
                        {
                            layout: 'hbox',
                            xtype: 'panel',
                            border:false,
                            items: [
                                {
                                    xtype: 'combo',
                                    valueField: 'ID',
                                    displayField: 'Year',
                                    id: 'CommonCaseYear',
                                    editable: false,
                                    store: Ext.create('Ext.data.Store', {
                                        data: [
                                            { ID: dt.getFullYear(), Year: dt.getFullYear() },
                                            { ID: dt.getFullYear() - 1, Year: dt.getFullYear() - 1 },
                                            { ID: dt.getFullYear() - 2, Year: dt.getFullYear() - 2 },
                                            { ID: dt.getFullYear() - 3, Year: dt.getFullYear() - 3 },
                                            { ID: dt.getFullYear() - 4, Year: dt.getFullYear() - 4 },
                                        ]
                                    }),
                                    value: dt.getFullYear(),
                                },
                                {
                                    xtype: 'button',
                                    name: '',
                                    text: '查询',
                                    margin: '0 0 0 20',
                                    width: 50,
                                    handler: 'onQueryOK'
                                }
                            ]
                        },
                        '->',
                        {
                            text: '打印预览',
                            handler: 'onPrintMonth',
                            handleMouseEvents: false
                        },
                        {
                            xtype: 'exportbtn',
                            text: '导出',
                            webapi: 'api/CaseStatisticalReport/ExportExcel',
                            excelname: '一般案件统计表',
                            exceltitle: '一般案件统计表',
                            extrapra: { type: 1 },
                            formsubmit:true
                        },
                    ],
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    },
                }]
            },
            {
                layout: 'fit',
                border: false,
                title: '简易案件',
                xtype: 'panel',
                items: [{
                    xtype: 'grid',
                    selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                    columnLines: true,
                    columns: [
                            { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                            { header: '处罚决定书编号', dataIndex: 'cfjdsbh', flex: 1 },
                            { header: '案件名称', dataIndex: 'casereason', flex: 1 },
                            { header: '违法地点', dataIndex: 'caseaddress', flex: 1 },
                            { header: '当事人(单位)', dataIndex: 'pf_name', flex: 1 },
                            { header: '处罚内容', dataIndex: 'cf', flex: 1 },
                            { header: '处罚收据编号', dataIndex: 'fkpjbh', flex: 1 },
                            { header: '结案时间', dataIndex: 'createtime', flex: 1 },
                            { header: '备注', dataIndex: 'casecontent', flex: 1 },
                    ],
                    store: simplestore,
                    tbar: [
                        '->',
                        {
                            layout: 'hbox',
                            xtype: 'panel',
                            border: false,
                            items: [
                                {
                                    xtype: 'combo',
                                    valueField: 'ID',
                                    displayField: 'Year',
                                    id: 'SimpleCaseYear',
                                    editable: false,
                                    store: Ext.create('Ext.data.Store', {
                                        data: [
                                            { ID: dt.getFullYear(), Year: dt.getFullYear() },
                                            { ID: dt.getFullYear() - 1, Year: dt.getFullYear() - 1 },
                                            { ID: dt.getFullYear() - 2, Year: dt.getFullYear() - 2 },
                                            { ID: dt.getFullYear() - 3, Year: dt.getFullYear() - 3 },
                                            { ID: dt.getFullYear() - 4, Year: dt.getFullYear() - 4 },
                                        ]
                                    }),
                                    value: dt.getFullYear(),
                                },
                                {
                                    xtype: 'button',
                                    name: '',
                                    text: '查询',
                                    margin: '0 0 0 20',
                                    width: 50,
                                    handler: 'onQueryOK'
                                }
                            ]
                        },
                        '->',
                        {
                            text: '打印预览',
                            handler: 'onPrintMonth',
                            handleMouseEvents: false
                        },
                        {
                            xtype: 'exportbtn',
                            text: '导出',
                            webapi: 'api/CaseStatisticalReport/ExportExcel',
                            excelname: '简易案件统计表',
                            exceltitle: '简易案件统计表',
                            extrapra: { type: 2 },
                            formsubmit: true
                        },
                    ],
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    },
                }]
            },
            {
                layout: 'fit',
                border: false,
                title: '违停拍摄',
                xtype: 'panel',
                items: [{
                    xtype: 'grid',
                    selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                    columnLines: true,
                    columns: [
                            { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                            { header: '路面违停拍摄总数量', dataIndex: 'casereason', flex: 1 },
                            { header: '已处理缴款', dataIndex: 'caseaddress', flex: 1 },
                            { header: '未处理缴款', dataIndex: 'pf_name', flex: 1 },
                    ],
                    //store: store,
                    tbar: [
                        '->',
                        {
                            layout: 'hbox',
                            xtype: 'panel',
                            border: false,
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '统计时间',
                                    name: 'stime',
                                    id: 'illCamBgnTime',
                                    labelAlign:'right',
                                    editable: false,
                                    format:'Y-m-d'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '至',
                                    id: 'illCamEndTime',
                                    name: 'etime',
                                    labelAlign: 'right',
                                    labelWidth:25,
                                    editable: false,
                                    format: 'Y-m-d'
                                },
                                {
                                    xtype: 'button',
                                    name: '',
                                    text: '查询',
                                    margin: '0 0 0 20',
                                    width: 50,
                                    handler: 'onQueryOK'
                                }
                            ]
                        },
                        '->',
                        {
                            text: '打印预览',
                            handler: 'onPrintMonth',
                            handleMouseEvents: false
                        },
                        {
                            xtype: 'exportbtn',
                            text: '导出',
                            webapi: 'api/CaseStatisticalReport/ExportExcel',
                            excelname: '违停拍摄统计表',
                            exceltitle: '违停拍摄统计表',
                            extrapra: { type: 3 },
                            formsubmit: true
                        },
                    ],
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    },
                }]
            },
            {
                layout: 'fit',
                border: false,
                title: '违停处理',
                xtype: 'panel',
                items: [{
                    xtype: 'grid',
                    selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                    columnLines: true,
                    columns: [
                            { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                            { header: '窗口共处理', dataIndex: 'casereason', flex: 1 },
                            { header: '窗口合计', dataIndex: 'caseaddress', flex: 1 },
                    ],
                    //store: store,
                    tbar: [
                        '->',
                        {
                            layout: 'hbox',
                            xtype: 'panel',
                            border: false,
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '统计时间',
                                    name: 'stime',
                                    id: 'illStopBgnTime',
                                    labelAlign: 'right',
                                    editable: false,
                                    format: 'Y-m-d'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '至',
                                    id: 'illStopEndTime',
                                    name: 'etime',
                                    labelAlign: 'right',
                                    labelWidth: 25,
                                    editable: false,
                                    format: 'Y-m-d'
                                },
                                {
                                    xtype: 'button',
                                    name: '',
                                    text: '查询',
                                    margin: '0 0 0 20',
                                    width: 50,
                                    handler: 'onQueryOK'
                                }
                            ]
                        },
                        '->',
                        {
                            text: '打印预览',
                            handler: 'onPrintMonth',
                            handleMouseEvents: false
                        },
                        {
                            xtype: 'exportbtn',
                            text: '导出',
                            webapi: 'api/CaseStatisticalReport/ExportExcel',
                            excelname: '违停处理统计表',
                            exceltitle: '违停处理统计表',
                            extrapra: { type: 4 },
                            formsubmit: true
                        },
                    ],
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    },
                }]
            },
            {
                layout: 'fit',
                border: false,
                title: '违法建筑',
                xtype: 'panel',
                items: [{
                    xtype: 'grid',
                    selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                    columnLines: true,
                    columns: [
                            { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                            { header: '执法检查（次)', dataIndex: 'casereason', flex: 1 },
                            { header: '需要处置的违法建筑面积（㎡）', dataIndex: 'caseaddress', flex: 1 },
                            { header: '占地面积（㎡)', dataIndex: 'pf_name', flex: 1 },
                            { header: '实际处置的违法建筑面积（㎡）', dataIndex: 'sitedatetime', flex: 1 },
                            { header: '备注', dataIndex: 'sitedatetime', flex: 1 },
                    ],
                    //store: store,
                    tbar: [
                        '->',
                        {
                            layout: 'hbox',
                            xtype: 'panel',
                            border: false,
                            items: [
                                {
                                    xtype: 'combo',
                                    valueField: 'ID',
                                    id:'IllBuildYear',
                                    displayField: 'Year',
                                    editable: false,
                                    store: Ext.create('Ext.data.Store', {
                                        data: [
                                            { ID: dt.getFullYear(), Year: dt.getFullYear() },
                                            { ID: dt.getFullYear() - 1, Year: dt.getFullYear() - 1 },
                                            { ID: dt.getFullYear() - 2, Year: dt.getFullYear() - 2 },
                                            { ID: dt.getFullYear() - 3, Year: dt.getFullYear() - 3 },
                                            { ID: dt.getFullYear() - 4, Year: dt.getFullYear() - 4 },
                                        ]
                                    }),
                                    value: dt.getFullYear(),
                                },
                                {
                                    xtype: 'button',
                                    name: '',
                                    text: '查询',
                                    margin: '0 0 0 20',
                                    width: 50,
                                    handler: 'onQueryOK'
                                }
                            ]
                        },
                        '->',
                        {
                            text: '打印预览',
                            handler: 'onPrintMonth',
                            handleMouseEvents: false
                        },
                        {
                            xtype: 'exportbtn',
                            text: '导出',
                            webapi: 'api/CaseStatisticalReport/ExportExcel',
                            excelname: '违法建筑统计表',
                            exceltitle: '违法建筑统计表',
                            extrapra: { type: 5 },
                            formsubmit: true
                        },
                    ],
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    },
                }]
            }]
        }];

        this.callParent();
    }
});