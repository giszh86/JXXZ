Ext.define('TianZun.view.legalcasemanager.documents.TZBL', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.TZBL',
    width: '100%',
    height: '100%',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        //添加文书时获取文书编号
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        var caseid = me.caseid != null ? me.caseid : panel.caseid != null ? panel.caseid : panel.record.get('caseid') != null ? panel.record.get('caseid') : null;
        var ajbh;
        var tablename = panel.title.indexOf('一般案件') >= 0 ? 'case_cases' : panel.title.indexOf('简易案件') >= 0 ? 'case_simplecases' : 'case_casesources';

        Ext.Ajax.request({
            url: "/api/CommonCase/GetCaseReasonNumber?caseid=" + caseid + "&tablename=" + tablename,
            method: 'get',
            scope: this,
            async: false,
            success: function (response) {
                if (response.responseText != 'null')
                    ajbh = Ext.decode(response.responseText).casebh;
                else
                    ajbh = '';
            }
        });

        this.items = [
            {
                xtype: 'form',
                width: '100%',
                border: false,
                items: [
                    {
                        xtype: 'fieldset',
                        layout: {
                            type: 'table',
                            columns: 2,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 100
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 450
                        },
                        items: [
                            {
                                xtype: 'hidden',
                                name: 'edituserid',
                                value: $.cookie('USER_ID'),
                            },
                            {
                                xtype: 'hidden',
                                name: 'dwfsasid',
                                value: me.dwfsasid == null ? null : me.dwfsasid,
                            },
                            {
                                name: 'ajmc',
                                margin: '10 0 10 0',
                                fieldLabel: '案件名称',
                                width: '99%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.ajmc
                            },
                            {
                                name: 'ajbh',
                                margin: '10 0 10 0',
                                fieldLabel: '案件编号',
                                width: '99%',
                                colspan: 2,
                                readOnly:true,
                                value: me.record == null ? ajbh : me.record.ajbh
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                width: '98%',
                                margin: '10 0 10 20',
                                colspan: 2,
                                border: false,
                                items: [
                                    {
                                        xtype: 'label',
                                        margin: '13 5 10 20',
                                        html: '听证时间:',
                                    },
                                    {
                                        xtype: 'datefield',
                                        margin: '10 0 10 0',
                                        width: '45%',
                                        name: 'tzrq',
                                        format: 'Y-m-d',
                                        editable: false,
                                        value: me.record == null ? null : me.record.tzrq
                                    },
                                    {
                                        xtype: 'timefield',
                                        margin: '10 0 10 50',
                                        name: 'tzkssj',
                                        format: 'H:i',
                                        width: '20%',
                                        increment: 5,
                                        editable: false,
                                        value: me.record == null ? null : me.record.tzkssj,
                                        listeners: {
                                            change: function (obj) {
                                                ejctime = me.down('timefield[name=tzjssj]');
                                                if (ejctime.getValue() != null && obj.getValue() > ejctime.getValue()) {
                                                    Ext.Msg.alert('提示', '结束时间不能早于开始时间');
                                                    ejctime.clearValue();
                                                }
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '10 20 10 20',
                                        html: '至',
                                    },
                                    {
                                        xtype: 'timefield',
                                        margin: '10 0 10 0',
                                        name: 'tzjssj',
                                        format: 'H:i',
                                        width: '20%',
                                        increment: 5,
                                        editable: false,
                                        value: me.record == null ? null : me.record.tzjssj,
                                        listeners: {
                                            change: function (obj) {
                                                sjctime = me.down('timefield[name=tzkssj]');
                                                if (sjctime.getValue() != null && obj.getValue() < sjctime.getValue()) {
                                                    Ext.Msg.alert('提示', '结束时间不能早于开始时间');
                                                    sjctime.clearValue();
                                                }
                                            }
                                        }
                                    },
                                ]
                            },
                          {
                              name: 'tzdd',
                              margin: '10 0 10 0',
                              fieldLabel: '听证地点',
                              width: '99%',
                              value: me.record == null ? null : me.record.tzdd
                          },
                          {
                              name: 'tzfs',
                              margin: '10 0 10 0',
                              fieldLabel: '听证方式',
                              width: '99%',
                              value: me.record == null ? null : me.record.tzfs
                          },
                          {
                              xtype: 'fieldset',
                              name: '',
                              border: false,
                              layout: 'table',
                              width: '99%',
                              margin: '10 0 10 18',
                              colspan: 2,
                              items: [
                                     {
                                         fieldLabel: '听证申请人',
                                         name: 'tzsqr',
                                         xtype: 'textfield',
                                         width: '98%',
                                         labelAlign: 'right',
                                         labelWidth: 80,
                                         value: me.record == null ? null : me.record.tzsqr
                                     },
                                      {
                                          fieldLabel: '负责人',
                                          name: 'fzr',
                                          xtype: 'textfield',
                                          width: '98%',
                                          labelAlign: 'right',
                                          labelWidth: 80,
                                          value: me.record == null ? null : me.record.fzr
                                      },
                                       {
                                           fieldLabel: '性别',
                                           name: 'xb',
                                           xtype: 'textfield',
                                           width: '98%',
                                           labelAlign: 'right',
                                           labelWidth: 80,
                                           value: me.record == null ? null : me.record.xb
                                       },
                              ]
                          },
                          {
                              xtype: 'fieldset',
                              name: '',
                              border: false,
                              layout: 'table',
                              width: '99%',
                              margin: '10 0 10 18',
                              colspan: 2,
                              items: [
                                     {
                                         fieldLabel: '工作单位',
                                         name: 'gzdw',
                                         xtype: 'textfield',
                                         width: '98%',
                                         labelAlign: 'right',
                                         labelWidth: 80,
                                         value: me.record == null ? null : me.record.gzdw
                                     },
                                      {
                                          fieldLabel: '职务或职业',
                                          name: 'zwhzy',
                                          xtype: 'textfield',
                                          width: '98%',
                                          labelAlign: 'right',
                                          labelWidth: 80,
                                          value: me.record == null ? null : me.record.zwhzy
                                      },
                                       {
                                           fieldLabel: '身份证号',
                                           name: 'sfzh',
                                           xtype: 'textfield',
                                           width: '98%',
                                           labelAlign: 'right',
                                           labelWidth: 80,
                                           value: me.record == null ? null : me.record.sfzh
                                       },
                              ]
                          },

                           {
                               xtype: 'fieldset',
                               name: '',
                               border: false,
                               layout: 'table',
                               width: '99%',
                               margin: '10 0 10 18',
                               colspan: 2,
                               items: [
                                      {
                                          fieldLabel: '住址（住所）',
                                          name: 'zzhzs',
                                          xtype: 'textfield',
                                          width: '98%',
                                          labelAlign: 'right',
                                          labelWidth: 80,
                                          value: me.record == null ? null : me.record.zzhzs
                                      },
                                       {
                                           fieldLabel: '邮编',
                                           name: 'yb',
                                           xtype: 'textfield',
                                           width: '98%',
                                           labelAlign: 'right',
                                           labelWidth: 80,
                                           value: me.record == null ? null : me.record.yb
                                       },
                                        {
                                            fieldLabel: '电话',
                                            name: 'dh',
                                            xtype: 'textfield',
                                            width: '98%',
                                            labelAlign: 'right',
                                            labelWidth: 80,
                                            value: me.record == null ? null : me.record.dh
                                        },
                               ]
                           },

                             {
                                 xtype: 'fieldset',
                                 name: '',
                                 border: false,
                                 layout: 'table',
                                 width: '99%',
                                 margin: '10 0 10 18',
                                 colspan: 2,
                                 items: [
                                        {
                                            fieldLabel: '委托代理人',
                                            name: 'wtdlr1',
                                            xtype: 'textfield',
                                            width: '98%',
                                            labelAlign: 'right',
                                            labelWidth: 80,
                                            value: me.record == null ? null : me.record.wtdlr1
                                        },
                                         {
                                             fieldLabel: '性别',
                                             name: 'xb1',
                                             xtype: 'textfield',
                                             width: '98%',
                                             labelAlign: 'right',
                                             labelWidth: 80,
                                             value: me.record == null ? null : me.record.xb1
                                         },
                                          {
                                              fieldLabel: '身份证号',
                                              name: 'sfzh1',
                                              xtype: 'textfield',
                                              width: '98%',
                                              labelAlign: 'right',
                                              labelWidth: 80,
                                              value: me.record == null ? null : me.record.sfzh1
                                          },
                                 ]
                             },
                        {
                            xtype: 'fieldset',
                            name: '',
                            border: false,
                            layout: 'table',
                            width: '99%',
                            margin: '10 0 10 18',
                            colspan: 2,
                            items: [
                                   {
                                       fieldLabel: '工作单位',
                                       name: 'gzdw1',
                                       xtype: 'textfield',
                                       width: '98%',
                                       labelAlign: 'right',
                                       labelWidth: 80,
                                       value: me.record == null ? null : me.record.gzdw1
                                   },
                                    {
                                        fieldLabel: '职务',
                                        name: 'zw1',
                                        xtype: 'textfield',
                                        width: '98%',
                                        labelAlign: 'right',
                                        labelWidth: 80,
                                        value: me.record == null ? null : me.record.zw1
                                    },
                                     {
                                         fieldLabel: '电话',
                                         name: 'dh1',
                                         xtype: 'textfield',
                                         width: '98%',
                                         labelAlign: 'right',
                                         labelWidth: 80,
                                         value: me.record == null ? null : me.record.dh1
                                     },
                            ]
                        },
                                    {
                                        xtype: 'fieldset',
                                        name: '',
                                        border: false,
                                        layout: 'table',
                                        width: '99%',
                                        margin: '10 0 10 18',
                                        colspan: 2,
                                        items: [
                                               {
                                                   fieldLabel: '委托代理人',
                                                   name: 'wtdlr2',
                                                   xtype: 'textfield',
                                                   width: '98%',
                                                   labelAlign: 'right',
                                                   labelWidth: 80,
                                                   value: me.record == null ? null : me.record.wtdlr2
                                               },
                                                {
                                                    fieldLabel: '性别',
                                                    name: 'xb2',
                                                    xtype: 'textfield',
                                                    width: '98%',
                                                    labelAlign: 'right',
                                                    labelWidth: 80,
                                                    value: me.record == null ? null : me.record.xb2
                                                },
                                                 {
                                                     fieldLabel: '身份证号',
                                                     name: 'sfzh2',
                                                     xtype: 'textfield',
                                                     width: '98%',
                                                     labelAlign: 'right',
                                                     labelWidth: 80,
                                                     value: me.record == null ? null : me.record.sfzh2
                                                 },
                                        ]
                                    },
                        {
                            xtype: 'fieldset',
                            name: '',
                            border: false,
                            layout: 'table',
                            width: '99%',
                            margin: '10 0 10 18',
                            colspan: 2,
                            items: [
                                   {
                                       fieldLabel: '工作单位',
                                       name: 'gzdw2',
                                       xtype: 'textfield',
                                       width: '98%',
                                       labelAlign: 'right',
                                       labelWidth: 80,
                                       value: me.record == null ? null : me.record.gzdw2
                                   },
                                    {
                                        fieldLabel: '职务',
                                        name: 'zw2',
                                        xtype: 'textfield',
                                        width: '98%',
                                        labelAlign: 'right',
                                        labelWidth: 80,
                                        value: me.record == null ? null : me.record.zw2
                                    },
                                     {
                                         fieldLabel: '电话',
                                         name: 'dh2',
                                         xtype: 'textfield',
                                         width: '98%',
                                         labelAlign: 'right',
                                         labelWidth: 80,
                                         value: me.record == null ? null : me.record.dh2
                                     },
                            ]
                        },


                          {
                              name: 'qtcjr',
                              margin: '10 0 10 0',
                              fieldLabel: '其他参加人',
                              width: '99%',
                              colspan: 2,
                              value: me.record == null ? null : me.record.qtcjr
                          },

                           {
                               name: 'ajdcr1',
                               margin: '10 0 10 0',
                               fieldLabel: '案件调查人',
                               width: '99%',
                               value: me.record == null ? null : me.record.ajdcr1
                           },
                          {
                              name: 'gzdwjzw1',
                              margin: '10 0 10 0',
                              fieldLabel: '工作单位及职务',
                              width: '99%',
                              value: me.record == null ? null : me.record.gzdwjzw1
                          },
                          {
                              name: 'ajdcr2',
                              margin: '10 0 10 0',
                              fieldLabel: '案件调查人',
                              width: '99%',
                              value: me.record == null ? null : me.record.ajdcr2
                          },
                          {
                              name: 'gzdwjzw2',
                              margin: '10 0 10 0',
                              fieldLabel: '工作单位及职务',
                              width: '99%',
                              value: me.record == null ? null : me.record.gzdwjzw2
                          },

                          {
                              xtype: 'fieldset',
                              name: '',
                              border: false,
                              layout: 'table',
                              width: '99%',
                              margin: '10 0 10 18',
                              colspan: 2,
                              items: [
                                     {
                                         fieldLabel: '听证主持人',
                                         name: 'tzzcr',
                                         xtype: 'textfield',
                                         width: '98%',
                                         labelAlign: 'right',
                                         labelWidth: 80,
                                         value: me.record == null ? null : me.record.tzzcr
                                     },
                                      {
                                          fieldLabel: '听证员',
                                          name: 'tzr',
                                          xtype: 'textfield',
                                          width: '98%',
                                          labelAlign: 'right',
                                          labelWidth: 80,
                                          value: me.record == null ? null : me.record.tzr
                                      },
                                       {
                                           fieldLabel: '记录人',
                                           name: 'jlr',
                                           xtype: 'textfield',
                                           width: '98%',
                                           labelAlign: 'right',
                                           labelWidth: 80,
                                           value: me.record == null ? null : me.record.jlr
                                       },
                              ]
                          },

                          {
                              name: 'gzdw3',
                              margin: '10 0 10 0',
                              fieldLabel: '工作单位',
                              width: '99%',
                              colspan: 2,
                              value: me.record == null ? null : me.record.gzdw3
                          },


                           {
                               xtype: 'textarea',
                               name: 'tzbl',
                               border: false,
                               fieldLabel: '听证笔录（正文）',
                               width: '99%',
                               colspan: 2,
                               margin: '10 0 10 0',
                               height: 80,
                               value: me.record == null ? null : me.record.tzbl
                           },

                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})