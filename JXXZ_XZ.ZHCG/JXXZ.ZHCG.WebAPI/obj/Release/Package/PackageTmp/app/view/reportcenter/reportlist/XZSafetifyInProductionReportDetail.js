Ext.define('TianZun.view.reportcenter.reportlist.XZSafetifyInProductionReportDetail', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.XZSafetifyInProductionReportDetail',
    title: '秀洲区综合行政执法局安全生产执法情况报表',
    layout: 'fit',
    requires: ['TianZun.ux.ExportExcelButton'],
    initComponent: function ()
    {
        Ext.tip.QuickTipManager.init();
        var me = this;
        var reportdate = this.record.get("reportdate");
        var date = new Date(reportdate);
        var month = parseFloat(date.getMonth()) + 1;
        var year = parseFloat(date.getFullYear());
        var date = parseFloat(date.getDate());
        var width = window.innerWidth * 0.922;
        var store = Ext.create('TianZun.store.reportcenter.SafetifyInProductionStore');
        store.getProxy().url = "api/ReportCenter/GetSafetifyinProductionReport?reportdate=" + this.record.get("reportdate");
        var showSummary = true;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        Ext.Ajax.request({
            url: 'api/ReportCenter/GetSafetifyinProductionReport?reportdate=' + this.record.get("reportdate"),
            method: 'get',
            async: false,
            success: function (response)
            {
                jsonstr = Ext.decode(response.responseText);
            }
        });
        var remark = jsonstr[0].remark;
        var preparer = jsonstr[0].preparer;
        var preparerphone = jsonstr[0].preparerphone;
        var xzshuser = jsonstr[0].shuser;
        var isstatistics = jsonstr[0].isstatistics;
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            autoScroll: true,
            width: width,
            items: [
                {
                    layout: 'fit',
                    border: false,
                    xtype: 'panel',
                    name: '',
                    margin: '10 0 0 0',
                    layout: {
                        type: 'table',
                        columns: 2,
                    },
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 45,
                    },
                    defaults: {
                        xtype: 'textfield',
                        allowBlank: false,
                    },
                    items: [
                        {
                            xtype: 'exportbtn',
                            id: 'exportbtn',
                            text: '导出',
                            margin: '0 10 5 0',
                            width: 90,
                            webapi: 'api/ReportCenter/ExportExcel',
                            excelname: me.title,
                            exceltitle: me.title,
                            formsubmit: true,
                            extrapra: { reportid: 2, reportdate: reportdate, type: 1 },
                        },
                        //{
                        //    xtype: 'button',
                        //    text: '打印',
                        //    margin: '0 10 5 0',
                        //    handler: '',
                        //},
                    ],
                    listeners:
                       {
                           beforerender: function (obj)
                           {
                               if (isstatistics == 0 || isstatistics == null)
                               {
                                   Ext.getCmp('exportbtn').hidden = true;
                               }
                           },
                       }
                },
                {
                layout: 'fit',
                border: false,
                name: '',
                items: [
                    {
                        columnLines: true,
                        xtype: 'gridpanel',
                        gridautoScroll: true,
                        region: 'center',
                        store: store,
                        //enableColumnMove: false, //禁止拖放列 
                        //enableColumnResize: false, //禁止改变列宽度 
                        title: '<div style="text-align:center">秀洲区综合行政执法局安全生产执法情况报表</div>',
                        viewConfig: {
                            stripeRows: false,
                            forceFit: true,
                            scrollOffset: 0,
                        },
                        plugins: [this.cellEditing],
                        selModel: {
                            selType: 'cellmodel'
                        },
                        fieldDefaults: {
                            labelAlign: 'center',
                            align: 'center',
                        },
                        features: [{
                            id: 'group',
                            ftype: 'groupingsummary',
                            groupHeaderTpl: '{name}',
                            hideGroupedHeader: true,
                            enableGroupingMenu: false,
                        }],
                        columns: [
                               {
                                   header:  '<div style="text-align:left">填表单位：秀洲区综合行政执法局</div>',
                                   hideable: false,
                                   dataIndex: 'rate',
                                   columns: [
                                       {
                                           header: '中队名称',
                                           hideable: false,
                                           dataIndex: 'unitname',
                                           menuDisabled: true,
                                           summaryType: 'sum',
                                           sortable: false,
                                           align: 'center',
                                           width: 100,
                                           summaryRenderer: function (value, summaryData, dataIndex)
                                           {
                                               return "<font color='red' size='2'>累计：</font>";
                                           },
                                       },
                                       {
                                           header: '项目时间', dataIndex: 'classname', hideable: false, sortable: false, align: 'center',
                                           menuDisabled: true,
                                           summaryRenderer: function (value, summaryData)
                                           {
                                               var sumValue = parseFloat(value);
                                               return "<font color='red' size='2'>-</font>";
                                           },
                                       },
                                       {
                                           header: '执法情况',  hideable: false, sortable: false, align: 'center',
                                           menuDisabled: true,
                                           summaryType: 'sum',
                                           columns: [
                                               {
                                                   header: '出动执<br/>法人员<br/>（人次）', dataIndex: 'cdzfry', hideable: false, sortable: false, align: 'center',
                                                  
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               },
                                               {
                                                   header: '检查生<br/>产经营<br/>单位<br/>（家次）', dataIndex: 'jcscjydw', hideable: false, sortable: false, align: 'center',
                                                  
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               },
                                               {
                                                   header: '发现安<br/>全隐患<br/>或违法<br/>行为<br/>（个）', dataIndex: 'fxaqyh', hideable: false, sortable: false,
                                                   align: 'center',
                                                  
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               },
                                               {
                                                   header: '完成整<br/>改安全<br/>隐患或<br/>违法行为<br/>（个）', dataIndex: 'wczgaqyh', hideable: false, sortable: false,
                                                   align: 'center',
                                                  
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               }
                                           ]
                                       },
                                       {
                                           header: '执法文书使用情况', hideable: false, sortable: false, align: 'center',
                                           menuDisabled: true,
                                           summaryType: 'sum',
                                           columns: [
                                               {
                                                   header: '现场检<br/>查记录<br/>（份）', dataIndex: 'xcjcjl', hideable: false, sortable: false, align: 'center',
                                                  
                                                   menuDisabled: true, 
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               },
                                               {
                                                   header: '责令限<br/>期整改<br/>指令书<br/>（份）', dataIndex: 'zlxqzgzls', hideable: false, sortable: false, align: 'center',
                                                  
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               },
                                               {
                                                   header: '现场处<br/>理措施<br/>决定书<br/>（份）', dataIndex: 'xcclcsjds', hideable: false, sortable: false,
                                                   align: 'center',
                                                  
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               },
                                               {
                                                   header: '整改复<br/>查意见<br/>书（份）', dataIndex: 'zgfcyjs', hideable: false, sortable: false,
                                                   align: 'center',
                                                  
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               }
                                           ]
                                       },

                                   ]
                               },
                               {
                                   header: '<div style="text-align:left">填表时间：' + year + '年' + month + '月25日</div>',
                                   hideable: false,
                                   dataIndex: 'rate',
                                   columns: [
                                       {
                                           header: '案件办理情况', hideable: false, sortable: false, align: 'center',
                                           menuDisabled: true,
                                           columns: [
                                               {
                                                   header: '线索、案件移交情况', dataIndex: 'bbbbbbbbbbbb', hideable: false, sortable: false, align: 'center',
                                                  
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   columns: [
                                                    {
                                                        header: '接受移<br/>送(件)', dataIndex: 'jsys', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                        }
                                                    },
                                                    {
                                                        header: '检查发<br/>现(件)', dataIndex: 'jcfx', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                        }
                                                    },
                                                    {
                                                        header: '线索外<br/>移(件)', dataIndex: 'xswy', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                        }
                                                    },
                                                   ]
                                               },
                                               {
                                                   header: '行政处罚情况',hideable: false, sortable: false, align: 'center',
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   columns: [
                                                    {
                                                        header: '立案<br/>（起）', dataIndex: 'la', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                        }
                                                    },
                                                    {
                                                        header: '警告<br/>（起）', dataIndex: 'jg', hideable: false, sortable: false, align: 'center',

                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData) {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                        }
                                                    },
                                                     {
                                                         header: '决定罚<br/>款额<br/>（万元）', dataIndex: 'jdfke', hideable: false, sortable: false, align: 'center',
                                                         editor: { allowBlank: false, xtype: 'displayfield', decimalPrecision: 5, minValue: 0, },
                                                         menuDisabled: true,
                                                         summaryType: 'sum',
                                                         summaryRenderer: function (value, summaryData) {
                                                             var sumValue = parseFloat(value);
                                                             return "<font color='red' size='2'>" + value + "</font>";
                                                         },
                                                         field: {
                                                             xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                         }
                                                     },
                                                    {
                                                        header: '结案<br/>（起）', dataIndex: 'ja', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                        }
                                                    },
                                                    {
                                                        header: '实际<br/>收缴<br/>罚没<br/>款<br/>（万元）', dataIndex: 'sjsjfmk', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                        }
                                                    },
                                                    {
                                                        header: '停产<br/>停业<br/>整顿<br/>（家）', dataIndex: 'tctyzd', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                        }
                                                    },
                                                    {
                                                        header: '提请<br/>关闭<br/>（家）', dataIndex: 'tqgb', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5
                                                        }
                                                    },
                                                   ]
                                               },
                                           ]
                                       },
                                       {
                                           header: '案件办理分类情况', hideable: false, sortable: false, align: 'center',
                                           menuDisabled: true,
                                           summaryType: 'sum',
                                           columns: [
                                               {
                                                   header: '主要负责<br/>人不履行<br/>管理职责', dataIndex: 'zyfzr', hideable: false, sortable: false, align: 'center',
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData) {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5
                                                   }
                                               },
                                               {
                                                   header: '安全生产<br/>条件和机<br/>构人员<br/>配备', dataIndex: 'aqsctj', hideable: false, sortable: false, align: 'center',
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData) {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5
                                                   }
                                               },
                                               {
                                                   header: '培训和<br/>持证管<br/>理规定', dataIndex: 'pxhczglgd', hideable: false, sortable: false, align: 'center',
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData) {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5
                                                   }
                                               },
                                               {
                                                   header: '事故隐患<br/>排查和治理<br/>管理规定', dataIndex: 'sgyhpc', hideable: false, sortable: false, align: 'center',
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData) {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5
                                                   }
                                               },
                                               {
                                                   header: '“三同时<br/>”规定', dataIndex: 'stsgd', hideable: false, sortable: false, align: 'center',
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData) {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5
                                                   }
                                               },
                                               {
                                                   header: '设备管理<br/>和经营场<br/>所规定', dataIndex: 'sbglhjycsgd', hideable: false, sortable: false, align: 'center',
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData) {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5
                                                   }
                                               },
                                               {
                                                   header: '劳动保护<br/>、劳动合<br/>同管理', dataIndex: 'ldbhldhtgl', hideable: false, sortable: false, align: 'center',
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData) {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5
                                                   }
                                               },
                                               {
                                                   header: '有限空间<br/>作业、危<br/>险作业以<br/>及其他特<br/>别规定', dataIndex: 'yxkjzy', hideable: false, sortable: false, align: 'center',
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData) {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5
                                                   }
                                               },
                                               {
                                                   header: '单位拒绝<br/>、阻碍监<br/>督检查', dataIndex: 'dwjjzajdgl', hideable: false, sortable: false, align: 'center',
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData) {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5
                                                   }
                                               },
                                           ]
                                       },
                                       {
                                           header: '简要说明下列情况',  menuDisabled: true, hideable: false, sortable: false, columns: [{
                                               text: '主要工作亮点',
                                               menuDisabled: true, sortable: false, flex: 1,
                                               align: 'center',
                                               editor: {  xtype: 'textarea', minValue: 0, height: 60, readOnly: true, },
                                               dataIndex: 'zygzld',
                                           }, {
                                               text: '存在的主要问题',
                                               menuDisabled: true, sortable: false, flex: 1,
                                               align: 'center',
                                               editor: { xtype: 'textarea', minValue: 0, height: 60, readOnly: true, },
                                               dataIndex: 'czdzywt',
                                           }, {
                                               text: '面临的主要困难',
                                                menuDisabled: true, sortable: false,
                                                align: 'center', flex: 1,
                                               editor: {  xtype: 'textarea', minValue: 0, height: 60, readOnly: true, },
                                               dataIndex: 'mldzykn',
                                           }, {
                                               text: '相关的意见建议',
                                               menuDisabled: true, sortable: false, flex: 1,
                                               align: 'center',
                                               editor: { xtype: 'textarea', minValue: 0, height: 60, readOnly: true, },
                                               dataIndex: 'xgdyjjy',
                                           }, ]
                                       },
                                   ]
                               }
                        ]
                    },
                {
                }]
            },
           {
               layout: 'fit',
               border: false,
               xtype: 'form',
               name: '',
               margin: '10 0 0 0',
               layout: {
                   type: 'table',
                   columns: 3,
               },
               fieldDefaults: {
                   labelAlign: 'right',
                   labelWidth: 45,
               },
               defaults: {
                   xtype: 'textfield',
                   width: 500,
               },
               items: [
                   {
                       fieldLabel: '填表人',
                       width: 180,
                       name: 'preparer',
                       editable:false,
                       value: preparer,
                   },
                       {
                           fieldLabel: '审核人',
                           name: 'xzshuser',
                           width: 180,
                           editable: false,
                           value: xzshuser,
                       },
                       {
                           fieldLabel: '填表人联系电话',
                           labelWidth: 100,
                           name: 'preparerphone',
                           width: 280,
                           value: preparerphone,
                           editable:false,
                           validator: function (v) {
                               //手机号
                               var cell = /^1[34578]\d{9}$/;
                               //固定电话
                               var tel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
                               if (v.length > 0) {
                                   if (!(tel.test(v) || cell.test(v))) {
                                       return "固定电话或手机号有误，请核对！";
                                   }
                                   else {
                                       return true;
                                   }
                               }
                           }
                       },
                   {
                       fieldLabel: '备注',
                       colspan: 3,
                       xtype: 'textarea',
                       width: width * 0.97,
                       height: 50,
                       editable: false,
                       readOnly: true,
                       name: 'remark',
    //                   value: '1.检查生产经营单位：开具现场检查记录或整改复查意见书的一般工商贸领域生产经营单位数量；\r\n' +
    //'2.线索外移：执法检查发现不属于综合执法98项行政处罚权事项，并依法移送至具有监督管理职责部门的线索数量；\r\n' +
    //'3.结案：跨年度案件结案不计入，以当年立案案件结案为准；\r\n' +
    //'4.收缴罚没款：已实际收缴的罚没款总额。',
                       value: remark,
                   }
               ]
           }
            ], buttons: [{
                text: '确定',
                handler: 'onClose'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }]
        this.callParent();
       
    },
})