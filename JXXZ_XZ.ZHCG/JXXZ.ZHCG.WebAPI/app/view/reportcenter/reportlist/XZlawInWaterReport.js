/// <reference path="XZlawInWaterReportDetail.js" />
Ext.define('TianZun.view.reportcenter.reportlist.XZlawInWaterReport', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.XZlawInWaterReport',
    title: '秀洲区综合行政执法局水行政执法情况报表',
    layout: 'fit',

    initComponent: function ()
    {
        Ext.tip.QuickTipManager.init();
        var me = this;
        var date = new Date();
        var month = parseFloat(date.getMonth()) + 1;
        var year = parseFloat(date.getFullYear());
        if (window.innerWidth > 1366) {
            var width = window.innerWidth * 0.8135;
        }
        else {
            var width = window.innerWidth * 0.95;
        }

        Ext.Ajax.request({
            url: 'api/ReportCenter/GetLawInWater?reportdate='+ this.record.get("reportdate").split(' ')[0],
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
        var store = Ext.create('TianZun.store.reportcenter.lawInWaterStore');
        store.getProxy().url = "api/ReportCenter/GetLawInWater?reportdate=" + this.record.get("reportdate");
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        var showSummary = true;
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
                     xtype: 'form',
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
                             xtype: 'button',
                             text: '统计',
                             width: 80,
                             margin: '0 10 5 0',
                             handler: 'onStaticsReport',
                         },
                     ]
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
                        title: '<div style="text-align:center">秀洲区综合行政执法局水行政执法情况报表</div>',
                        plugins: [this.cellEditing],
                        selModel: {
                            selType: 'cellmodel'
                        },
                        viewConfig: {
                            stripeRows: false,
                            forceFit: true,
                            scrollOffset: 0,
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
                                   header: '<div style="text-align:left">填表单位：秀洲区综合行政执法局<span style="padding-left:300px">填表时间：' + year + '年' + month + '月25日</span></div>',
                                   hideable: false,
                                   dataIndex: 'rate',
                                   columns: [
                                       {
                                           header: '中队名称', dataIndex: 'unitname', hideable: false, sortable: false, align: 'center',
                                           width: 100,
                                            menuDisabled: true,
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
                                           header: '执法情况', hideable: false, sortable: false, align: 'center',
                                           menuDisabled: true,
                                           columns: [
                                               {
                                                   header: '出动执<br/>法人员<br/>（人）', dataIndex: 'cdzfry', hideable: false, sortable: false, align: 'center',
                                                   editor: { allowBlank: false, xtype: 'numberfield', minValue: 0, },
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'numberfield',  minValue: 0,
                                                   }
                                               },
                                               {
                                                   header: '出动执<br/>法车辆<br/>（车）', dataIndex: 'cdzfcl', hideable: false, sortable: false, align: 'center',
                                                   editor: { allowBlank: false, xtype: 'numberfield', minValue: 0, },
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'numberfield',  minValue: 0,
                                                   }
                                               },
                                               {
                                                   header: '开展执<br/>法巡查<br/>次数<br/>（次）', dataIndex: 'kzzfxccs', hideable: false, sortable: false, align: 'center',
                                                   editor: { allowBlank: false, xtype: 'numberfield', minValue: 0, },
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'numberfield',  minValue: 0,
                                                   }
                                               },
                                               {
                                                   header: '责令限<br/>期整改<br/>通知书<br/>（份）', dataIndex: 'zlxqzgtzs', hideable: false, sortable: false, align: 'center',
                                                   editor: { allowBlank: false, xtype: 'numberfield', minValue: 0, },
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'numberfield',  minValue: 0,
                                                   }
                                               },
                                               {
                                                   header: '发现涉<br/>水问题<br/>（个）', dataIndex: 'fxsswt', hideable: false, sortable: false, align: 'center',
                                                   editor: { allowBlank: false, xtype: 'numberfield', minValue: 0, },
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'numberfield',  minValue: 0,
                                                   }
                                               },
                                               {
                                                   header: '完成整<br/>改涉水<br/>问题<br/>（个）', dataIndex: 'wczgsswt', hideable: false, sortable: false, align: 'center',
                                                   editor: { allowBlank: false, xtype: 'numberfield', minValue: 0, },
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'numberfield',  minValue: 0,
                                                   }
                                               },
                                           ]
                                       },
                                        {
                                            header: '案件办理情况', hideable: false, sortable: false, align: 'center',
                                            menuDisabled: true,
                                            columns: [
                                                {
                                                    header: '违法线索情况', hideable: false, sortable: false, align: 'center',
                                                    columns: [
                                                        {
                                                            header: '接受<br/>移送<br/>(件)', dataIndex: 'jsys', hideable: false, sortable: false, align: 'center',
                                                            editor: { allowBlank: false, xtype: 'numberfield',  minValue: 0, },
                                                            menuDisabled: true,
                                                            summaryType: 'sum',
                                                            summaryRenderer: function (value, summaryData)
                                                            {
                                                                var sumValue = parseFloat(value);
                                                                return "<font color='red' size='2'>" + value + "</font>";
                                                            },
                                                            field: {
                                                                xtype: 'numberfield',  minValue: 0,
                                                            }
                                                        },
                                                        {
                                                            header: '检查<br/>发现<br/>(件)', dataIndex: 'jcfx', hideable: false, sortable: false, align: 'center',
                                                            editor: { allowBlank: false, xtype: 'numberfield',  minValue: 0, },
                                                            menuDisabled: true,
                                                            summaryType: 'sum',
                                                            summaryRenderer: function (value, summaryData)
                                                            {
                                                                var sumValue = parseFloat(value);
                                                                return "<font color='red' size='2'>" + value + "</font>";
                                                            },
                                                            field: {
                                                                xtype: 'numberfield',  minValue: 0,
                                                            }
                                                        },
                                                        {
                                                            header: '投诉<br/>举报<br/>(件)', dataIndex: 'tsjb', hideable: false, sortable: false, align: 'center',
                                                            editor: { allowBlank: false, xtype: 'numberfield',  minValue: 0, },
                                                            menuDisabled: true,
                                                            summaryType: 'sum',
                                                            summaryRenderer: function (value, summaryData)
                                                            {
                                                                var sumValue = parseFloat(value);
                                                                return "<font color='red' size='2'>" + value + "</font>";
                                                            },
                                                            field: {
                                                                xtype: 'numberfield',  minValue: 0,
                                                            }
                                                        },
                                                    ]
                                                },
                                                {
                                                    header: '行政处罚情况', hideable: false, sortable: false, align: 'center',
                                                    columns: [
                                                        {
                                                            header: '总立<br/>案数<br/>(起)', dataIndex: 'zlas', hideable: false, sortable: false, align: 'center',
                                                            editor: { allowBlank: false, xtype: 'numberfield',  minValue: 0, },
                                                            menuDisabled: true,
                                                            summaryType: 'sum',
                                                            summaryRenderer: function (value, summaryData)
                                                            {
                                                                var sumValue = parseFloat(value);
                                                                return "<font color='red' size='2'>" + value + "</font>";
                                                            },
                                                            field: {
                                                                xtype: 'numberfield',  minValue: 0,
                                                            }
                                                        },
                                                        {
                                                            header: '①河道管理类', hideable: false, sortable: false, align: 'center',
                                                            columns: [
                                                                {
                                                                    header: '建设妨<br/>碍行洪<br/>的建<br/>（构）<br/>筑物', dataIndex: 'jsfaxhdjzw', hideable: false, sortable: false, align: 'center',
                                                                    editor: { allowBlank: false, xtype: 'numberfield',  minValue: 0, },
                                                                    menuDisabled: true,
                                                                    summaryType: 'sum',
                                                                    summaryRenderer: function (value, summaryData)
                                                                    {
                                                                        var sumValue = parseFloat(value);
                                                                        return "<font color='red' size='2'>" + value + "</font>";
                                                                    },
                                                                    field: {
                                                                        xtype: 'numberfield',  minValue: 0,
                                                                    }
                                                                },
                                                                {
                                                                    header: '弃置、<br/>倾倒抬<br/>高河床<br/>、缩窄<br/>河道废<br/>弃物', dataIndex: 'hdfqw', hideable: false, sortable: false, align: 'center',
                                                                    editor: { allowBlank: false, xtype: 'numberfield',  minValue: 0, },
                                                                    menuDisabled: true,
                                                                    summaryType: 'sum',
                                                                    summaryRenderer: function (value, summaryData)
                                                                    {
                                                                        var sumValue = parseFloat(value);
                                                                        return "<font color='red' size='2'>" + value + "</font>";
                                                                    },
                                                                    field: {
                                                                        xtype: 'numberfield',  minValue: 0,
                                                                    }
                                                                },
                                                                {
                                                                    header: '抛撒垃<br/>圾、动<br/>物尸体<br/>等', dataIndex: 'pslj', hideable: false, sortable: false, align: 'center',
                                                                    editor: { allowBlank: false, xtype: 'numberfield',  minValue: 0, },
                                                                    menuDisabled: true,
                                                                    summaryType: 'sum',
                                                                    summaryRenderer: function (value, summaryData)
                                                                    {
                                                                        var sumValue = parseFloat(value);
                                                                        return "<font color='red' size='2'>" + value + "</font>";
                                                                    },
                                                                    field: {
                                                                        xtype: 'numberfield',  minValue: 0,
                                                                    }
                                                                },
                                                            ]
                                                        },
                                                {
                                                    header: '②水资源类', hideable: false, sortable: false, align: 'center',
                                                    columns: [
                                                        {
                                                            header: '农村供<br/>水类', dataIndex: 'ncgsl', hideable: false, sortable: false, align: 'center',
                                                            editor: { allowBlank: false, xtype: 'numberfield',  minValue: 0, },
                                                            menuDisabled: true,
                                                            summaryType: 'sum',
                                                            summaryRenderer: function (value, summaryData)
                                                            {
                                                                var sumValue = parseFloat(value);
                                                                return "<font color='red' size='2'>" + value + "</font>";
                                                            },
                                                            field: {
                                                                xtype: 'numberfield',  minValue: 0,
                                                            }
                                                        },
                                                        {
                                                            header: '城市供<br/>水类', dataIndex: 'csgsl', hideable: false, sortable: false, align: 'center',
                                                            editor: { allowBlank: false, xtype: 'numberfield',  minValue: 0, },
                                                            menuDisabled: true,
                                                            summaryType: 'sum',
                                                            summaryRenderer: function (value, summaryData)
                                                            {
                                                                var sumValue = parseFloat(value);
                                                                return "<font color='red' size='2'>" + value + "</font>";
                                                            },
                                                            field: {
                                                                xtype: 'numberfield',  minValue: 0,
                                                            }
                                                        },
                                                    ]
                                                },
                                                {
                                                    header: '③排水<br/>与污水<br/>处理类', dataIndex: 'psywscll', hideable: false, sortable: false, align: 'center',
                                                    editor: { allowBlank: false, xtype: 'numberfield',  minValue: 0, },
                                                    menuDisabled: true,
                                                    summaryType: 'sum',
                                                    summaryRenderer: function (value, summaryData)
                                                    {
                                                        var sumValue = parseFloat(value);
                                                        return "<font color='red' size='2'>" + value + "</font>";
                                                    },
                                                    field: {
                                                        xtype: 'numberfield',  minValue: 0,
                                                    }
                                                },
                                                 {
                                                     header: '结案数<br/>(起)', dataIndex: 'jas', hideable: false, sortable: false, align: 'center',
                                                     editor: { allowBlank: false, xtype: 'numberfield',  minValue: 0, },
                                                     menuDisabled: true,
                                                     summaryType: 'sum',
                                                     summaryRenderer: function (value, summaryData)
                                                     {
                                                         var sumValue = parseFloat(value);
                                                         return "<font color='red' size='2'>" + value + "</font>";
                                                     },
                                                     field: {
                                                         xtype: 'numberfield',  minValue: 0,
                                                     }
                                                 },
                                                  {
                                                      header: '实际收<br/>缴罚没<br/>款(元)', dataIndex: 'sjsjfmk', hideable: false, sortable: false, align: 'center',
                                                      editor: { allowBlank: false, xtype: 'numberfield',  minValue: 0, },
                                                      menuDisabled: true,
                                                      summaryType: 'sum',
                                                      summaryRenderer: function (value, summaryData)
                                                      {
                                                          var sumValue = parseFloat(value);
                                                          return "<font color='red' size='2'>" + value + "</font>";
                                                      },
                                                      field: {
                                                          xtype: 'numberfield',  minValue: 0,
                                                      }
                                                  },
                                                    ]
                                                },
                                                {
                                                    header: '简要说明下列情况',  menuDisabled: true, hideable: false, sortable: false, columns: [{
                                                        text: '主要工作<br/>亮点',
                                                         menuDisabled: true, align: 'center', sortable: false,
                                                        editor: { allowBlank: true, xtype: 'textarea', minValue: 0, height: 60, text: '说明' }, dataIndex: 'zygzld',
                                                    }, {
                                                        text: '存在的主<br/>要问题', sortable: false,
                                                        menuDisabled: true, align: 'center', editor: { allowBlank: true, xtype: 'textarea', minValue: 0, height: 60 }, dataIndex: 'czdzywt',
                                                    }, {
                                                        text: '面临的主<br/>要困难', sortable: false,
                                                        menuDisabled: true, align: 'center', editor: { allowBlank: true, xtype: 'textarea', minValue: 0, height: 60 }, dataIndex: 'mldzykn',
                                                    }, {
                                                        text: '相关的意<br/>见建议', sortable: false,
                                                        menuDisabled: true, align: 'center', editor: { allowBlank: true, xtype: 'textarea', minValue: 0, height: 60 }, dataIndex: 'xgdyjjy',
                                                    }, ]
                                                },
                                            ]
                                        },
                                   ]
                               },
                        ]
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
                             value: preparer,
                         },
                       {
                           fieldLabel: '审核人',
                           name: 'xzshuser',
                           width: 180,
                           value: xzshuser,
                       },
                       {
                           fieldLabel: '填表人联系电话',
                           labelWidth: 100,
                           name: 'preparerphone',
                           width: 280,
                           value: preparerphone,
                           validator: function (v)
                           {
                               //手机号
                               var cell = /^1[34578]\d{9}$/;
                               //固定电话
                               var tel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
                               if (v.length>0)
                               {
                                   if (!(tel.test(v) || cell.test(v)))
                                   {
                                       return "固定电话或手机号有误，请核对！";
                                   }
                                   else
                                   {
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
                            name: 'remark',
          //                  value: '1.①②③项目：填写立案数\r\n' +
          //'2.结案数：跨年度案件结案不计入，以当年立案案件结案为准；\r\n' +
          //'3.实际收缴罚没款：实际收缴的罚没款总额。',
                            value: remark,
                        }
                    ]
                }]
            , buttons: [{
                text: '提交',
                handler: 'onAddLawInWaterOk'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }]
        this.callParent();
    },
})