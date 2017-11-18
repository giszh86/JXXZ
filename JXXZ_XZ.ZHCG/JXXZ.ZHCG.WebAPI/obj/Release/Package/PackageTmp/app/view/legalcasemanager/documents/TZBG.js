Ext.define('TianZun.view.legalcasemanager.documents.TZBG', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.TZBG',
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
                                         name: 'tzstime',
                                         format: 'H:i',
                                         width: '20%',
                                         increment: 5,
                                         editable: false,
                                         value: me.record == null ? null : me.record.tzstime,
                                         listeners: {
                                             change: function (obj) {
                                                 ejctime = me.down('timefield[name=tzetime]');
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
                                         name: 'tzetime',
                                         format: 'H:i',
                                         width: '20%',
                                         increment: 5,
                                         editable: false,
                                         value: me.record == null ? null : me.record.tzetime,
                                         listeners: {
                                             change: function (obj) {
                                                 sjctime = me.down('timefield[name=tzstime]');
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
                                         fieldLabel: '听证主持人',
                                         name: 'tzzcr1',
                                         xtype: 'textfield',
                                         width: '98%',
                                         labelAlign: 'right',
                                         labelWidth: 80,
                                         value: me.record == null ? null : me.record.tzzcr1
                                     },
                                      {
                                          fieldLabel: '听证员',
                                          name: 'tzy1',
                                          xtype: 'textfield',
                                          width: '98%',
                                          labelAlign: 'right',
                                          labelWidth: 80,
                                          value: me.record == null ? null : me.record.tzy1
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
                                          fieldLabel: '法定代表人(负责人)',
                                          name: 'fddbr',
                                          xtype: 'textfield',
                                          width: '98%',
                                          labelAlign: 'right',
                                          labelWidth: 80,
                                          value: me.record == null ? null : me.record.fddbr
                                      },
                                       {
                                           fieldLabel: '委托代理人',
                                           name: 'wtdlr',
                                           xtype: 'textfield',
                                           width: '98%',
                                           labelAlign: 'right',
                                           labelWidth: 80,
                                           value: me.record == null ? null : me.record.wtdlr
                                       },
                              ]
                          },
                          {
                              name: 'ajdcr',
                              margin: '10 0 10 0',
                              fieldLabel: '案件调查人',
                              width: '99%',
                              value: me.record == null ? null : me.record.ajdcr
                          },
                          {
                              name: 'gzdw',
                              margin: '10 0 10 0',
                              fieldLabel: '工作单位',
                              width: '99%',
                              value: me.record == null ? null : me.record.gzdw
                          },
                           {
                               xtype: 'textarea',
                               name: 'tzhjbqk',
                               border: false,
                               fieldLabel: '听证会基本情况',
                               width: '99%',
                               colspan: 2,
                               margin: '10 0 10 0',
                               height: 80,
                               value: me.record == null ? null : me.record.tzhjbqk
                           },
                            {
                                xtype: 'textarea',
                                name: 'ajss',
                                border: false,
                                fieldLabel: '案件事实',
                                width: '99%',
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 80,
                                value: me.record == null ? null : me.record.ajss
                            },
                             {
                                 xtype: 'textarea',
                                 name: 'clyjjjy',
                                 border: false,
                                 fieldLabel: '处理意见及建议',
                                 width: '99%',
                                 colspan: 2,
                                 margin: '10 0 10 0',
                                 height: 80,
                                 value: me.record == null ? null : me.record.clyjjjy
                             },
                          {
                              name: 'tzzcr2',
                              margin: '10 0 10 0',
                              fieldLabel: '听证主持人',
                              width: '99%',
                              value: me.record == null ? null : me.record.tzzcr2
                          },
                          {
                              name: 'tzy2',
                              margin: '10 0 10 0',
                              fieldLabel: '听证员',
                              width: '99%',
                              value: me.record == null ? null : me.record.tzy2
                          },
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})