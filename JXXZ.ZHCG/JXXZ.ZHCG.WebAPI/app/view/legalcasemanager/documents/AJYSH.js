Ext.define('TianZun.view.legalcasemanager.documents.AJYSH', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.AJYSH',
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
        var wsbh;
        var tablename = panel.title.indexOf('一般案件') >= 0 ? 'case_cases' : panel.title.indexOf('简易案件') >= 0 ? 'case_simplecases' : 'case_casesources';

        Ext.Ajax.request({
            url: "/api/CommonCase/GetCaseReasonNumber?caseid=" + caseid + "&tablename=" + tablename,
            method: 'get',
            scope: this,
            async: false,
            success: function (response) {
                if (response.responseText != 'null') {
                    wsbh = Ext.decode(response.responseText).casebh;
                    wsbh = wsbh.indexOf('秀综执立') >= 0 ? wsbh.replace('秀综执立', '秀综移送字') : wsbh;
                }else
                    wsbh = '';
            }
        });

        var ajxgzl =
       '<br/><br/>1、案件有关材料    件；<br/>' +
        '（1）<br/>' +
        '（2）<br/>' +
        '2、移送案件涉案物品清单';

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
                             name: 'wsbh',
                             margin: '10 0 10 0',
                             fieldLabel: '文书编号',
                             colspan: 2,
                             width: '99%',
                             readOnly: true,
                             value: me.record == null ? wsbh : me.record.wsbh
                         },
                            {
                                name: 'dsr',
                                margin: '10 0 10 0',
                                fieldLabel: '当事人',
                                width: '99%',
                                value: me.record == null ? null : me.record.dsr
                            },

                              {
                                  xtype: 'datefield',
                                  border: false,
                                  name: 'lasj',
                                  editable: false,
                                  //allowBlank: false,
                                  fieldLabel: '立案时间',
                                  margin: '10 0 10 0',
                                  format: 'Y-m-d',
                                  width: '99%',
                                  value: me.record == null ? null : me.record.lasj,
                                  validator: function ()
                                  {
                                      var jssj = me.down("datefield[name=lasj]").getValue();
                                      var yssj = me.down("datefield[name=ysrq]").getValue();
                                      if (jssj > yssj)
                                      {
                                          return '立案时间不得晚于移送时间!';
                                      }
                                      else
                                      {
                                          return true;
                                      }
                                  }
                              },
                           {
                               name: 'ay',
                               margin: '10 0 10 0',
                               fieldLabel: '案由',
                               width: '99%',
                               colspan: 2,
                               value: me.record == null ? null : me.record.ay
                           },
                            {
                                name: 'ysly',
                                margin: '10 0 10 0',
                                fieldLabel: '移送理由',
                                width: '99%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.ysly
                            },
                            {
                                name: 'yjdflgd',
                                margin: '10 0 10 0',
                                fieldLabel: '依据的法律规定',
                                width: '99%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.yjdflgd
                            },
                            {
                                xtype: 'htmleditor',
                                name: 'ajxgzl',
                                border: false,
                                fieldLabel: '案件相关资料',
                                width: 800,
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 180,
                                value: me.record == null ? ajxgzl : me.record.ajxgzl,
                                listeners: {
                                    render: function (obj) {
                                        obj.getToolbar().hide();
                                    }
                                }
                            },
                            {
                                xtype: 'datefield',
                                border: false,
                                name: 'ysrq',
                                editable: false,
                                fieldLabel: '移送日期',
                                margin: '10 0 10 0',
                                format: 'Y-m-d',
                                width: '99%',
                                value: me.record == null ? new Date() : me.record.ysrq,
                            },
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})