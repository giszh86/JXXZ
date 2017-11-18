Ext.define('TianZun.view.conservation.conservationlog.LogList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.logList',
    title: '养护作业监管 > 养护日志管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.conservation.conservationlog',
        'TianZun.ux.ExportExcelButton'
    ],
    controller: 'conservationlog',

    border: false,
    bodyBorder: false,
    initComponent: function ()
    {
        var dt = new Date();
        var me = this;
        var wholeyear = dt.getFullYear();
        this.items = [
            {
                xtype: 'tabpanel',
                border: false,
                plain: true,
                bodyBorder: false,
                items: [
                    {
                        layout: 'fit',
                        title: '1月',
                        id:'1',
                        xtype: 'form',
                        border: false,
                        style: 'border-top: 0;',
                        width: 1000,
                        height: 550,
                        overflowY: 'auto',
                        items: [
                            {
                                xtype: 'grid',
                                selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                                multiSelect: true,
                                columnLines: true,
                                columns: [
                                        { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                        { header: '养护合同名称', dataIndex: 'yhcontractname', flex: 1, align: 'center' },
                                        { header: '巡查日期',dataIndex: 'patroltime', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d')},
                                        { header: '巡查说明', dataIndex: 'patrolexplain', flex: 1, align: 'center' },
                                        { header: '填报时间', dataIndex: 'createtime', flex: 1, align: 'center' },
                                        { header: '填报人', dataIndex: 'createusername', flex: 1, align: 'center' },
                                ],
                                tbar: [{
                                    text: '查看',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                },
                                    {
                                        xtype: 'exportbtn',
                                        text: '导出',
                                        name:'export1',
                                        webapi: 'api/YhLog/ExportExcel',
                                        excelname :wholeyear+ '年1月养护日志统计表',
                                        exceltitle :wholeyear+ '年1月养护日志统计表',
                                        extrapra: { month: 1, year: wholeyear },
                                        
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
                                listeners: {
                                    itemclick: 'cliclChangeFlow',
                                }
                            }
                        ]
                    },
                    {
                        layout: 'fit',
                        title: '2月',
                        id: '2',
                        xtype: 'form',
                        name: 'second',
                        border: false,
                        style: 'border-top: 0;',
                        width: 1000,
                        height: 550,
                        overflowY: 'auto',
                        items: [
                            {
                                xtype: 'grid',
                                selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                                multiSelect: true,
                                columnLines: true,
                                columns: [
                                        { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                        { header: '养护合同名称', dataIndex: 'yhcontractname', flex: 1, align: 'center' },
                                        { header: '巡查日期',dataIndex: 'patroltime', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d')},
                                        { header: '巡查说明', dataIndex: 'patrolexplain', flex: 1, align: 'center' },
                                        { header: '填报时间', dataIndex: 'createtime', flex: 1, align: 'center' },
                                        { header: '填报人', dataIndex: 'createusername', flex: 1, align: 'center' },
                                ],

                                tbar: [{
                                    text: '查看',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                },
                                    {
                                        xtype: 'exportbtn',
                                        text: '导出',
                                        name: 'export2',
                                        webapi: 'api/YhLog/ExportExcel',
                                        excelname:wholeyear+ '年2月养护日志统计表',
                                        exceltitle: wholeyear + '年2月养护日志统计表',
                                        extrapra: { month: 2, year: wholeyear },
                                        
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
                                listeners: {
                                    itemclick: 'cliclChangeFlow',
                                }
                            }
                        ]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '3月',
                        id: '3',
                        xtype: 'panel',
                        name: 'onePanel',
                        items: [
                            {
                                layout: 'fit',
                                xtype: 'form',
                                border: false,
                                style: 'border-top: 0;',
                                width: 1000,
                                height: 550,
                                overflowY: 'auto',
                                items: [
                                    {
                                        xtype: 'grid',
                                        selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                                        multiSelect: true,
                                        columnLines: true,
                                        columns: [
                                                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                                { header: '养护合同名称', dataIndex: 'yhcontractname', flex: 1, align: 'center' },
                                                { header: '巡查日期',dataIndex: 'patroltime', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d')},
                                                { header: '巡查说明', dataIndex: 'patrolexplain', flex: 1, align: 'center' },
                                                { header: '填报时间', dataIndex: 'createtime', flex: 1, align: 'center' },
                                                { header: '填报人', dataIndex: 'createusername', flex: 1, align: 'center' },
                                        ],

                                        tbar: [
                                            {
                                                text: '查看',
                                                handler: 'onDetail',
                                                handleMouseEvents: false
                                            },
                                            {
                                                xtype: 'exportbtn',
                                                text: '导出',
                                                name: 'export3',
                                                webapi: 'api/YhLog/ExportExcel',
                                                excelname:wholeyear+ '年3月养护日志统计表',
                                                exceltitle: wholeyear + '年3月养护日志统计表',
                                                extrapra: { month: 3, year: wholeyear },
                                                
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
                                        listeners: {
                                            itemclick: 'cliclChangeFlow',
                                        }
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '4月',
                        id: '4',
                        xtype: 'panel',
                        name: 'onePanel',
                        items: [
                            {
                                layout: 'fit',
                                xtype: 'form',
                                border: false,
                                style: 'border-top: 0;',
                                width: 1000,
                                height: 550,
                                overflowY: 'auto',
                                items: [
                                    {
                                        xtype: 'grid',
                                        selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                                        multiSelect: true,
                                        columnLines: true,
                                        columns: [
                                                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                                { header: '养护合同名称', dataIndex: 'yhcontractname', flex: 1, align: 'center' },
                                                { header: '巡查日期',dataIndex: 'patroltime', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d')},
                                                { header: '巡查说明', dataIndex: 'patrolexplain', flex: 1, align: 'center' },
                                                { header: '填报时间', dataIndex: 'createtime', flex: 1, align: 'center' },
                                                { header: '填报人', dataIndex: 'createusername', flex: 1, align: 'center' },
                                        ],

                                        tbar: [{
                                            text: '查看',
                                            handler: 'onDetail',
                                            handleMouseEvents: false
                                        },
                                            {
                                                xtype: 'exportbtn',
                                                text: '导出',
                                                name: 'export4',
                                                webapi: 'api/YhLog/ExportExcel',
                                                excelname:wholeyear+ '年4月养护日志统计表',
                                                exceltitle: wholeyear + '年4月养护日志统计表',
                                                extrapra: { month: 4, year: wholeyear },
                                                
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
                                        listeners: {
                                            itemclick: 'cliclChangeFlow',
                                        }
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '5月',
                        id: '5',
                        xtype: 'panel',
                        name: 'onePanel',
                        items: [
                            {
                                layout: 'fit',
                                xtype: 'form',
                                border: false,
                                style: 'border-top: 0;',
                                width: 1000,
                                height: 550,
                                overflowY: 'auto',
                                items: [
                                    {
                                        xtype: 'grid',
                                        selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                                        multiSelect: true,
                                        columnLines: true,
                                        columns: [
                                                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                                { header: '养护合同名称', dataIndex: 'yhcontractname', flex: 1, align: 'center' },
                                                { header: '巡查日期',dataIndex: 'patroltime', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d')},
                                                { header: '巡查说明', dataIndex: 'patrolexplain', flex: 1, align: 'center' },
                                                { header: '填报时间', dataIndex: 'createtime', flex: 1, align: 'center' },
                                                { header: '填报人', dataIndex: 'createusername', flex: 1, align: 'center' },
                                        ],

                                        tbar: [{
                                            text: '查看',
                                            handler: 'onDetail',
                                            handleMouseEvents: false
                                        },
                                           {
                                               xtype: 'exportbtn',
                                               text: '导出',
                                               name: 'export5',
                                               webapi: 'api/YhLog/ExportExcel',
                                               excelname:wholeyear+ '年5月养护日志统计表',
                                               exceltitle: wholeyear + '年5月养护日志统计表',
                                               extrapra: { month: 5, year: wholeyear },
                                               
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
                                        listeners: {
                                            itemclick: 'cliclChangeFlow',
                                        }
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '6月',
                        id: '6',
                        xtype: 'panel',
                        name: 'onePanel',
                        items: [
                            {
                                layout: 'fit',
                                xtype: 'form',
                                border: false,
                                style: 'border-top: 0;',
                                width: 1000,
                                height: 550,
                                overflowY: 'auto',
                                items: [
                                    {
                                        xtype: 'grid',
                                        selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                                        multiSelect: true,
                                        columnLines: true,
                                        columns: [
                                                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                                { header: '养护合同名称', dataIndex: 'yhcontractname', flex: 1, align: 'center' },
                                                { header: '巡查日期',dataIndex: 'patroltime', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d')},
                                                { header: '巡查说明', dataIndex: 'patrolexplain', flex: 1, align: 'center' },
                                                { header: '填报时间', dataIndex: 'createtime', flex: 1, align: 'center' },
                                                { header: '填报人', dataIndex: 'createusername', flex: 1, align: 'center' },

                                        ],

                                        tbar: [{
                                            text: '查看',
                                            handler: 'onDetail',
                                            handleMouseEvents: false
                                        },
                                            {
                                                xtype: 'exportbtn',
                                                text: '导出',
                                                name: 'export6',
                                                webapi: 'api/YhLog/ExportExcel',
                                                excelname:wholeyear+ '年6月养护日志统计表',
                                                exceltitle: wholeyear + '年6月养护日志统计表',
                                                extrapra: { month: 6, year: wholeyear },
                                                
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
                                        listeners: {
                                            itemclick: 'cliclChangeFlow',
                                        }
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '7月',
                        id: '7',
                        xtype: 'panel',
                        name: 'onePanel',
                        items: [
                            {
                                layout: 'fit',
                                xtype: 'form',
                                border: false,
                                style: 'border-top: 0;',
                                width: 1000,
                                height: 550,
                                overflowY: 'auto',
                                items: [
                                    {
                                        xtype: 'grid',
                                        selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                                        multiSelect: true,
                                        columnLines: true,
                                        columns: [
                                                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                                { header: '养护合同名称', dataIndex: 'yhcontractname', flex: 1, align: 'center' },
                                                { header: '巡查日期',dataIndex: 'patroltime', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d')},
                                                { header: '巡查说明', dataIndex: 'patrolexplain', flex: 1, align: 'center' },
                                                { header: '填报时间', dataIndex: 'createtime', flex: 1, align: 'center' },
                                                { header: '填报人', dataIndex: 'createusername', flex: 1, align: 'center' },
                                        ],

                                        tbar: [{
                                            text: '查看',
                                            handler: 'onDetail',
                                            handleMouseEvents: false
                                        },
                                             {
                                                 xtype: 'exportbtn',
                                                 text: '导出',
                                                 name: 'export7',
                                                 webapi: 'api/YhLog/ExportExcel',
                                                 excelname:wholeyear+ '年7月养护日志统计表',
                                                 exceltitle: wholeyear + '年7月养护日志统计表',
                                                 extrapra: { month: 7, year: wholeyear },
                                                 
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
                                        listeners: {
                                            itemclick: 'cliclChangeFlow',
                                        }
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '8月',
                        id: '8',
                        xtype: 'panel',
                        name: 'onePanel',
                        items: [
                            {
                                layout: 'fit',
                                xtype: 'form',
                                border: false,
                                style: 'border-top: 0;',
                                width: 1000,
                                height: 550,
                                overflowY: 'auto',
                                items: [
                                    {
                                        xtype: 'grid',
                                        selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                                        multiSelect: true,
                                        columnLines: true,
                                        columns: [
                                                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                                { header: '养护合同名称', dataIndex: 'yhcontractname', flex: 1, align: 'center' },
                                                { header: '巡查日期',dataIndex: 'patroltime', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d')},
                                                { header: '巡查说明', dataIndex: 'patrolexplain', flex: 1, align: 'center' },
                                                { header: '填报时间', dataIndex: 'createtime', flex: 1, align: 'center' },
                                                { header: '填报人', dataIndex: 'createusername', flex: 1, align: 'center' },
                                        ],

                                        tbar: [{
                                            text: '查看',
                                            handler: 'onDetail',
                                            handleMouseEvents: false
                                        },
                                             {
                                                 xtype: 'exportbtn',
                                                 text: '导出',
                                                 name: 'export8',
                                                 webapi: 'api/YhLog/ExportExcel',
                                                 excelname:wholeyear+ '年8月养护日志统计表',
                                                 exceltitle: wholeyear + '年8月养护日志统计表',
                                                 extrapra: { month: 8, year: wholeyear },
                                                 
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
                                        listeners: {
                                            itemclick: 'cliclChangeFlow',
                                        }
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '9月',
                        id: '9',
                        xtype: 'panel',
                        name: 'onePanel',
                        items: [
                            {
                                layout: 'fit',
                                xtype: 'form',
                                border: false,
                                style: 'border-top: 0;',
                                width: 1000,
                                height: 550,
                                overflowY: 'auto',
                                items: [
                                    {
                                        xtype: 'grid',
                                        selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                                        multiSelect: true,
                                        columnLines: true,
                                        columns: [
                                                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                                { header: '养护合同名称', dataIndex: 'yhcontractname', flex: 1, align: 'center' },
                                                { header: '巡查日期',dataIndex: 'patroltime', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d')},
                                                { header: '巡查说明', dataIndex: 'patrolexplain', flex: 1, align: 'center' },
                                                { header: '填报时间', dataIndex: 'createtime', flex: 1, align: 'center' },
                                                { header: '填报人', dataIndex: 'createusername', flex: 1, align: 'center' },
                                        ],

                                        tbar: [{
                                            text: '查看',
                                            handler: 'onDetail',
                                            handleMouseEvents: false
                                        },
                                             {
                                                 xtype: 'exportbtn',
                                                 text: '导出',
                                                 name: 'export9',
                                                 webapi: 'api/YhLog/ExportExcel',
                                                 excelname:wholeyear+ '年9月养护日志统计表',
                                                 exceltitle: wholeyear + '年9月养护日志统计表',
                                                 extrapra: { month: 9, year: wholeyear },
                                                 
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
                                        listeners: {
                                            itemclick: 'cliclChangeFlow',
                                        }
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '10月',
                        id: '10',
                        xtype: 'panel',
                        name: 'onePanel',
                        items: [
                            {
                                layout: 'fit',
                                xtype: 'form',
                                border: false,
                                style: 'border-top: 0;',
                                width: 1000,
                                height: 550,
                                overflowY: 'auto',
                                items: [
                                    {
                                        xtype: 'grid',
                                        selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                                        multiSelect: true,
                                        columnLines: true,
                                        columns: [
                                                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                                { header: '养护合同名称', dataIndex: 'yhcontractname', flex: 1, align: 'center' },
                                                { header: '巡查日期',dataIndex: 'patroltime', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d')},
                                                { header: '巡查说明', dataIndex: 'patrolexplain', flex: 1, align: 'center' },
                                                { header: '填报时间', dataIndex: 'createtime', flex: 1, align: 'center' },
                                                { header: '填报人', dataIndex: 'createusername', flex: 1, align: 'center' },
                                        ],

                                        tbar: [{
                                            text: '查看',
                                            handler: 'onDetail',
                                            handleMouseEvents: false
                                        },
                                            {
                                                xtype: 'exportbtn',
                                                text: '导出',
                                                name: 'export10',
                                                webapi: 'api/YhLog/ExportExcel',
                                                excelname:wholeyear+ '年10月养护日志统计表',
                                                exceltitle: wholeyear + '年10月养护日志统计表',
                                                extrapra: { month: 10, year: wholeyear },
                                                
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
                                        listeners: {
                                            itemclick: 'cliclChangeFlow',
                                        }
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '11月',
                        id: '11',
                        xtype: 'panel',
                        name: 'onePanel',
                        items: [
                            {
                                layout: 'fit',
                                xtype: 'form',
                                border: false,
                                style: 'border-top: 0;',
                                width: 1000,
                                height: 550,
                                overflowY: 'auto',
                                items: [
                                    {
                                        xtype: 'grid',
                                        selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                                        multiSelect: true,
                                        columnLines: true,
                                        columns: [
                                                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                                { header: '养护合同名称', dataIndex: 'yhcontractname', flex: 1, align: 'center' },
                                                { header: '巡查日期',dataIndex: 'patroltime', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d')},
                                                { header: '巡查说明', dataIndex: 'patrolexplain', flex: 1, align: 'center' },
                                                { header: '填报时间', dataIndex: 'createtime', flex: 1, align: 'center' },
                                                { header: '填报人', dataIndex: 'createusername', flex: 1, align: 'center' },
                                        ],

                                        tbar: [{
                                            text: '查看',
                                            handler: 'onDetail',
                                            handleMouseEvents: false
                                        },
                                             {
                                                 xtype: 'exportbtn',
                                                 text: '导出',
                                                 name: 'export11',
                                                 webapi: 'api/YhLog/ExportExcel',
                                                 excelname:wholeyear+ '年11月养护日志统计表',
                                                 exceltitle: wholeyear + '年11月养护日志统计表',
                                                 extrapra: { month: 11, year: wholeyear },
                                                 
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
                                        listeners: {
                                            itemclick: 'cliclChangeFlow',
                                        }
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '12月',
                        id: '12',
                        xtype: 'panel',
                        name: 'onePanel',
                        items: [
                            {
                                layout: 'fit',
                                xtype: 'form',
                                border: false,
                                style: 'border-top: 0;',
                                width: 1000,
                                height: 550,
                                overflowY: 'auto',
                                items: [
                                    {
                                        xtype: 'grid',
                                        selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                                        multiSelect: true,
                                        columnLines: true,
                                        columns: [
                                                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                                { header: '养护合同名称', dataIndex: 'yhcontractname', flex: 1, align: 'center' },
                                                { header: '巡查日期',dataIndex: 'patroltime', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d')},
                                                { header: '巡查说明', dataIndex: 'patrolexplain', flex: 1, align: 'center' },
                                                { header: '填报时间', dataIndex: 'createtime', flex: 1, align: 'center' },
                                                { header: '填报人', dataIndex: 'createusername', flex: 1, align: 'center' },
                                        ],

                                        tbar: [{
                                            text: '查看',
                                            handler: 'onDetail',
                                            handleMouseEvents: false
                                        },
                                            {
                                                xtype: 'exportbtn',
                                                text: '导出',
                                                name: 'export12',
                                                webapi: 'api/YhLog/ExportExcel',
                                                excelname:wholeyear+ '年12月养护日志统计表',
                                                exceltitle: wholeyear + '年12月养护日志统计表',
                                                extrapra: { month: 12, year: wholeyear },
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
                                        listeners: {
                                            itemclick: 'cliclChangeFlow',
                                        }
                                    }
                                ]
                            },
                        ]
                    }
                ],
                listeners: {
                    beforerender: function (panel, eOpts)
                    {
                        var year = dt.getFullYear();
                        var month = (parseInt(dt.getMonth()) + 1);
                        var store = Ext.create('TianZun.store.conservation.YhLogList');
                        store.getProxy().url = 'api/YhLog/GetYhLogList?year=' + year + '&month=' + month;
                        var contentGrid = panel.down('grid');
                        var contentBar = contentGrid.down('pagingtoolbar');
                        var tabbar = panel.up('tabpanel');
                        panel.setActiveTab(month);
                        contentGrid.setStore(store);
                        contentBar.setStore(store);
                        store.load();
                    },
                    afterrender: function (panel)
                    {
                        var bar = panel.tabBar;
                        bar.insert(13, [{
                            xtype: 'component',
                            flex: 1
                        },
                        Ext.create('Ext.form.field.ComboBox', {
                            width: 200,
                            labelWidth: 70,
                            margin: '2 2 3 4',
                            fieldLabel: '选择年份',
                            xtype: 'combo',
                            name: 'yyear',
                            id: 'yyear',
                            valueField: 'ID',
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
                                listeners: {
                                    render: function (obj)
                                    {
                                        this.getStore().reload();
                                    },
                                    change: function (obj)
                                    {
                                        var year = me.down('combo[name=yyear]').getValue();
                                        var month = obj.up('tabpanel').getActiveTab().id;
                                        if (Ext.ComponentQuery.query('[name=export' + month + ']')[0] != null&&month.length<=2)
                                        {
                                            var excelname = Ext.ComponentQuery.query('[name=export' + month + ']')[0].excelname;
                                            var exceltitle = Ext.ComponentQuery.query('[name=export' + month + ']')[0].exceltitle;
                                            var extraprayear = Ext.ComponentQuery.query('[name=export' + month + ']')[0].extrapra.year;
                                            Ext.ComponentQuery.query('[name=export' + month + ']')[0].excelname = year + excelname.substr(4, excelname.length - 4);
                                            Ext.ComponentQuery.query('[name=export' + month + ']')[0].exceltitle = year + exceltitle.substr(4, exceltitle.length - 4);
                                            Ext.ComponentQuery.query('[name=export' + month + ']')[0].extrapra.year = year;
                                        }
                                        var store = obj.up('tabpanel').getActiveTab().down('grid').getStore();
                                        store.getProxy().url = 'api/YhLog/GetYhLogList?year=' + year + '&month=' + month,
                                        store.reload();
                                    }
                                }
                            }),
                            Ext.create('Ext.button.Button', {
                                width: 100,
                                margin: '2 2 3 4',
                                text: '添加养护日志',
                                handler: 'onAdd',
                            }),
                        ])
                    },
                    'tabchange': function (tabPanel, newCard, oldCard, eOpts)
                    {
                        var contentGrid = newCard.down('grid');
                        var contentBar = newCard.down('pagingtoolbar');
                        var bar = newCard.down('tabpanel');
                        var year = dt.getFullYear();
                        var strMonths = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
                        for (var i = 0; i < strMonths.length; i++)
                        {
                            if (strMonths[i] == newCard.title)
                            {
                                var month = parseInt(dt.getMonth())+1;
                                if (strMonths[i].length == 2)
                                {
                                    month = strMonths[i].substr(0, 1);
                                }
                                else
                                {
                                    month = strMonths[i].substr(0, 2);
                                }
                                if (Ext.ComponentQuery.query('[name=export' + month + ']')[0] != null)
                                {
                                    var excelname = Ext.ComponentQuery.query('[name=export' + month + ']')[0].excelname;
                                    var exceltitle = Ext.ComponentQuery.query('[name=export' + month + ']')[0].exceltitle;
                                    var extraprayear = Ext.ComponentQuery.query('[name=export' + month + ']')[0].extrapra.year;
                                    Ext.ComponentQuery.query('[name=export' + month + ']')[0].excelname = year + excelname.substr(4, excelname.length - 4);
                                    Ext.ComponentQuery.query('[name=export' + month + ']')[0].exceltitle = year + exceltitle.substr(4, exceltitle.length - 4);
                                    Ext.ComponentQuery.query('[name=export' + month + ']')[0].extrapra.year = year;
                                }
                                var store = Ext.create('TianZun.store.conservation.YhLogList');
                                store.getProxy().url = 'api/YhLog/GetYhLogList?year=' + year + '&month=' + month;
                                contentGrid.setStore(store);
                                contentBar.setStore(store);
                                store.load();
                            }
                        }
                    }
                }
            }
        ]
        this.callParent();
    }
});