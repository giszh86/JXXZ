Ext.define('TianZun.view.mechanicalassessment.assessment.AssessmentList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.assessmentList',
    title: '机械考核管理 > 机械考核管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.mechanicalassessment.Assessment',
    ],
    controller: 'assessment',

    border: false,
    bodyBorder: false,
    initComponent: function ()
    {
        var dt = new Date();
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
                        title: '1月',
                        xtype: 'panel',
                        name: 'onePanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '合同名称', dataIndex: 'contractname', flex: 1, align: 'center' },
                                    {
                                        header: '考核年月', dataIndex: 'examinedate', flex: 1, align: 'center',
                                        renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                                    },
                                    { header: '被考核养护单位', dataIndex: 'companyname', flex: 1, align: 'center' },
                                    { header: '合计扣分', dataIndex: 'sumscore', flex: 1, align: 'center' },
                                    { header: '综合得分', dataIndex: 'score', flex: 1, align: 'center' },
                                    { header: '是否发布', dataIndex: 'IsRelease', flex: 1, align: 'center' },
                            ],

                            tbar: [
                                 {
                                     text: '编辑',
                                     handler: 'onEdit',
                                     handleMouseEvents: false
                                 },
                                {
                                    text: '查看',
                                    handler: 'onlook',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '发布',
                                    handler: 'onRelease',
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
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '2月',
                        xtype: 'panel',
                        name: 'twoPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '合同名称', dataIndex: 'contractname', flex: 1, align: 'center' },
                                    { header: '考核年月', dataIndex: 'examinedate', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d'),},
                                    { header: '被考核养护单位', dataIndex: 'companyname', flex: 1, align: 'center' },
                                    { header: '合计扣分', dataIndex: 'sumscore', flex: 1, align: 'center' },
                                    { header: '综合得分', dataIndex: 'score', flex: 1, align: 'center' },
                                    { header: '是否发布', dataIndex: 'IsRelease', flex: 1, align: 'center' },
                            ],

                            tbar: [
                                {
                                    text: '编辑',
                                    handler: 'onEdit',
                                    handleMouseEvents: false
                                },
                                 {
                                     text: '查看',
                                     handler: 'onlook',
                                     handleMouseEvents: false
                                 },
                                 {
                                     text: '发布',
                                     handler: 'onRelease',
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
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '3月',
                        xtype: 'panel',
                        name: 'threePanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '合同名称', dataIndex: 'contractname', flex: 1, align: 'center' },
                                    { header: '考核年月', dataIndex: 'examinedate', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d'),},
                                    { header: '被考核养护单位', dataIndex: 'companyname', flex: 1, align: 'center' },
                                    { header: '合计扣分', dataIndex: 'sumscore', flex: 1, align: 'center' },
                                    { header: '综合得分', dataIndex: 'score', flex: 1, align: 'center' },
                                    { header: '是否发布', dataIndex: 'IsRelease', flex: 1, align: 'center' },
                            ],
                            tbar: [
                                {
                                    text: '编辑',
                                    handler: 'onEdit',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onlook',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '发布',
                                    handler: 'onRelease',
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
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '4月',
                        xtype: 'panel',
                        name: 'fourPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '合同名称', dataIndex: 'contractname', flex: 1, align: 'center' },
                                    { header: '考核年月', dataIndex: 'examinedate', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d'),},
                                    { header: '被考核养护单位', dataIndex: 'companyname', flex: 1, align: 'center', },
                                    { header: '合计扣分', dataIndex: 'sumscore', flex: 1, align: 'center' },
                                    { header: '综合得分', dataIndex: 'score', flex: 1, align: 'center' },
                                    { header: '是否发布',dataIndex: 'IsRelease',flex: 1,align: 'center',},
                            ],

                            tbar: [
                                {
                                    text: '编辑',
                                    handler: 'onEdit',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onlook',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '发布',
                                    handler: 'onRelease',
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
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '5月',
                        xtype: 'panel',
                        name: 'fivePanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '合同名称', dataIndex: 'contractname', flex: 1, align: 'center' },
                                    { header: '考核年月', dataIndex: 'examinedate', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d'),},
                                    { header: '被考核养护单位', dataIndex: 'companyname', flex: 1, align: 'center' },
                                    { header: '合计扣分', dataIndex: 'sumscore', flex: 1, align: 'center' },
                                    { header: '综合得分', dataIndex: 'score', flex: 1, align: 'center' },
                                    { header: '是否发布', dataIndex: 'IsRelease', flex: 1, align: 'center' },
                            ],

                            tbar: [
                                {
                                    text: '编辑',
                                    handler: 'onEdit',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onlook',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '发布',
                                    handler: 'onRelease',
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
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '6月',
                        xtype: 'panel',
                        name: 'sixPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '合同名称', dataIndex: 'contractname', flex: 1, align: 'center' },
                                    { header: '考核年月', dataIndex: 'examinedate', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d'),},
                                    { header: '被考核养护单位', dataIndex: 'companyname', flex: 1, align: 'center' },
                                    { header: '合计扣分', dataIndex: 'sumscore', flex: 1, align: 'center' },
                                    { header: '综合得分', dataIndex: 'score', flex: 1, align: 'center' },
                                    { header: '是否发布', dataIndex: 'IsRelease', flex: 1, align: 'center' },
                            ],

                            tbar: [
                                {
                                    text: '编辑',
                                    handler: 'onEdit',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onlook',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '发布',
                                    handler: 'onRelease',
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
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '7月',
                        xtype: 'panel',
                        name: 'sevenPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '合同名称', dataIndex: 'contractname', flex: 1, align: 'center' },
                                    { header: '考核年月', dataIndex: 'examinedate', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d'),},
                                    { header: '被考核养护单位', dataIndex: 'companyname', flex: 1, align: 'center' },
                                    { header: '合计扣分', dataIndex: 'sumscore', flex: 1, align: 'center' },
                                    { header: '综合得分', dataIndex: 'score', flex: 1, align: 'center' },
                                    { header: '是否发布', dataIndex: 'IsRelease', flex: 1, align: 'center' },
                            ],

                            tbar: [
                                {
                                    text: '编辑',
                                    handler: 'onEdit',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onlook',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '发布',
                                    handler: 'onRelease',
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
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '8月',
                        xtype: 'panel',
                        name: 'eghitPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '合同名称', dataIndex: 'contractname', flex: 1, align: 'center' },
                                    { header: '考核年月', dataIndex: 'examinedate', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d'),},
                                    { header: '被考核养护单位', dataIndex: 'companyname', flex: 1, align: 'center' },
                                    { header: '合计扣分', dataIndex: 'sumscore', flex: 1, align: 'center' },
                                    { header: '综合得分', dataIndex: 'score', flex: 1, align: 'center' },
                                    { header: '是否发布', dataIndex: 'IsRelease', flex: 1, align: 'center' },
                            ],

                            tbar: [
                                {
                                    text: '编辑',
                                    handler: 'onEdit',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onlook',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '发布',
                                    handler: 'onRelease',
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
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '9月',
                        xtype: 'panel',
                        name: 'ninePanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                   { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '合同名称', dataIndex: 'contractname', flex: 1, align: 'center' },
                                    { header: '考核年月', dataIndex: 'examinedate', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d'),},
                                    { header: '被考核养护单位', dataIndex: 'companyname', flex: 1, align: 'center' },
                                    { header: '合计扣分', dataIndex: 'sumscore', flex: 1, align: 'center' },
                                    { header: '综合得分', dataIndex: 'score', flex: 1, align: 'center' },
                                    { header: '是否发布', dataIndex: 'IsRelease', flex: 1, align: 'center' },
                            ],

                            tbar: [
                                {
                                    text: '编辑',
                                    handler: 'onEdit',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onlook',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '发布',
                                    handler: 'onRelease',
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
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '10月',
                        xtype: 'panel',
                        name: 'tenPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '合同名称', dataIndex: 'contractname', flex: 1, align: 'center' },
                                    { header: '考核年月', dataIndex: 'examinedate', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d'),},
                                    { header: '被考核养护单位', dataIndex: 'companyname', flex: 1, align: 'center' },
                                    { header: '合计扣分', dataIndex: 'sumscore', flex: 1, align: 'center' },
                                    { header: '综合得分', dataIndex: 'score', flex: 1, align: 'center' },
                                    { header: '是否发布', dataIndex: 'IsRelease', flex: 1, align: 'center' },
                            ],

                            tbar: [
                                {
                                    text: '编辑',
                                    handler: 'onEdit',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onlook',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '发布',
                                    handler: 'onRelease',
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
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '11月',
                        xtype: 'panel',
                        name: 'elevenPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                   { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '合同名称', dataIndex: 'contractname', flex: 1, align: 'center' },
                                    { header: '考核年月', dataIndex: 'examinedate', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d'),},
                                    { header: '被考核养护单位', dataIndex: 'companyname', flex: 1, align: 'center' },
                                    { header: '合计扣分', dataIndex: 'sumscore', flex: 1, align: 'center' },
                                    { header: '综合得分', dataIndex: 'score', flex: 1, align: 'center' },
                                    { header: '是否发布', dataIndex: 'IsRelease', flex: 1, align: 'center' },
                            ],

                            tbar: [
                                {
                                    text: '编辑',
                                    handler: 'onEdit',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onlook',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '发布',
                                    handler: 'onRelease',
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
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '12月',
                        xtype: 'panel',
                        name: 'twelvePanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '合同名称', dataIndex: 'contractname', flex: 1, align: 'center' },
                                    { header: '考核年月', dataIndex: 'examinedate', flex: 1, align: 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d'),},
                                    { header: '被考核养护单位', dataIndex: 'companyname', flex: 1, align: 'center' },
                                    { header: '合计扣分', dataIndex: 'sumscore', flex: 1, align: 'center' },
                                    { header: '综合得分', dataIndex: 'score', flex: 1, align: 'center' },
                                    { header: '是否发布', dataIndex: 'IsRelease', flex: 1, align: 'center' },
                            ],

                            tbar: [
                                {
                                    text: '编辑',
                                    handler: 'onEdit',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onlook',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '发布',
                                    handler: 'onRelease',
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
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    }
                ],
                listeners: {
                    beforerender: function (panel, eOpts)
                    {
                        var year = dt.getFullYear();
                        var month = (parseInt(dt.getMonth()) + 1);
                        var store = Ext.create('TianZun.store.mechanicalassessment.AssessmentStore');
                        store.getProxy().url = 'api/MechanicalExam/GetMechExamList?year=' + year + '&month=' + month;
                        var contentGrid = panel.down('grid');
                        var contentBar = contentGrid.down('pagingtoolbar');
                        var tabbar = panel.up('tabpanel');
                        panel.setActiveTab(month - 1);
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
                                    var month = parseInt(dt.getMonth()) + 1;
                                    var store = obj.up('tabpanel').getActiveTab().down('grid').getStore();
                                    store.getProxy().url = 'api/MechanicalExam/GetMechExamList?year=' + year + '&month=' + month;
                                    store.reload();
                                }
                            }
                        }),
                        Ext.create('Ext.button.Button', {
                            width: 100,
                            margin: "2 2 3 4",
                            text: "添加考核",
                            handler: 'onAdd'
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
                                var month = strMonths[i].substr(0, 1);
                                var store = Ext.create('TianZun.store.mechanicalassessment.AssessmentStore');
                                store.getProxy().url = 'api/MechanicalExam/GetMechExamList?year=' + year + '&month=' + month;
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