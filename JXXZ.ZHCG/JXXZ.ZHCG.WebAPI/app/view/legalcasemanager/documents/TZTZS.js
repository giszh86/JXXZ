Ext.define('TianZun.view.legalcasemanager.documents.TZTZS', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.TZTZS',
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
                if (response.responseText != 'null')
                    wsbh = Ext.decode(response.responseText).casebh;
                else
                    wsbh = '';
            }
        });

        var xgsx =
      '&nbsp;&nbsp;如你（单位）认为主持人或者听证员与本案有直接利害关系的，有权申请回避。申请主持人或者听证员回避，可在听证举行前（ &nbsp;&nbsp; 月 &nbsp;&nbsp; 日前）向本机关提出申请并说明理由。<br/>' +
       '&nbsp;&nbsp;因特殊原因需申请延期举行的，应当在 &nbsp;&nbsp; 年 &nbsp;&nbsp; 月 &nbsp;&nbsp; 日前向本机关提出，由本机关决定是否延期。若无正当理由不按时参加听证，又不事先说明理由的，视为放弃听证权利，本机关将终止听证。<br/>' +
       '&nbsp;&nbsp;参加听证前，请你（单位）注意下列事项：<br/>' +
       '&nbsp;&nbsp;1、当事人可亲自参加听证，也可以委托1-2名代理人参加听证。委托代理人参加听证的，应在听证举行前提交由当事人或当事人的法定代表人签署的授权委托书，载明委托的事项、权限和期限。<br/>' +
       '&nbsp;&nbsp;2、参加听证时应携带当事人或委托代理人的身份证明原件及其复印件和有关证据材料。<br/>' +
       '&nbsp;&nbsp;3、当事人有证人出席作证的，应通知有关证人出席作证，并事先告知本机关联系人。';

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
                                readOnly:true,
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
                                name: 'sqsj',
                                editable: false,
                                //allowBlank: false,
                                fieldLabel: '申请时间',
                                margin: '10 0 10 0',
                                format: 'Y-m-d',
                                width: '99%',
                                value: me.record == null ? null : me.record.sqsj
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
                               xtype: 'datetimefield',
                               border: false,
                               name: 'tzsj',
                               editable: false,
                               fieldLabel: '听证时间',
                               margin: '10 0 10 0',
                               format: 'Y-m-d H:i:s',
                               width: '99%',
                               value: me.record == null ? null : me.record.tzsj
                           },
                            {
                                name: 'tzdd',
                                margin: '10 0 10 0',
                                fieldLabel: '听证地点',
                                width: '99%',
                                value: me.record == null ? null : me.record.tzdd
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
                                          name: 'tzy',
                                          xtype: 'textfield',
                                          width: '98%',
                                          labelAlign: 'right',
                                          labelWidth: 80,
                                          value: me.record == null ? null : me.record.tzy
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
                                xtype: 'htmleditor',
                                name: 'xgsx',
                                border: false,
                                fieldLabel: '相关事项',
                                width: 800,
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 180,
                                value: me.record == null ? xgsx : me.record.xgsx,
                                listeners: {
                                    render: function (obj) {
                                        obj.getToolbar().hide();
                                    }
                                }
                            },
                          {
                              name: 'lxr',
                              margin: '10 0 10 0',
                              fieldLabel: '联系人',
                              width: '99%',
                              value: me.record == null ? null : me.record.lxr
                          },
                          {
                              name: 'lxdh',
                              margin: '10 0 10 0',
                              fieldLabel: '联系电话',
                              width: '99%',
                              value: me.record == null ? null : me.record.lxdh
                          },
                          {
                              name: 'dz',
                              margin: '10 0 10 0',
                              fieldLabel: '地址',
                              width: '99%',
                              value: me.record == null ? null : me.record.dz
                          },
                          {
                              name: 'yzbm',
                              margin: '10 0 10 0',
                              fieldLabel: '邮政编码',
                              width: '99%',
                              value: me.record == null ? null : me.record.yzbm
                          },

                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})