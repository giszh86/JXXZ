Ext.define('TianZun.view.legalcasemanager.documents.ZLXQGZTZS', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ZLXQGZTZS',
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
                    wsbh = wsbh.indexOf('秀综执立') >= 0 ? wsbh.replace('秀综执立', '秀综责改通字') : wsbh;
                } else
                    wsbh = '';
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
                                name: 'wsbh',
                                margin: '10 0 10 0',
                                fieldLabel: '文书编号',
                                width: '100%',
                                colspan: 2,
                                readOnly: true,
                                value: me.record == null ? wsbh : me.record.wsbh
                            },
                            {
                                name: 'dsr',
                                margin: '10 0 10 0',
                                fieldLabel: '当事人',
                                width: '100%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.dsr
                            },
                            {
                                xtype: 'datefield',
                                border: false,
                                name: 'afsj',
                                editable: false,
                                //allowBlank: false,
                                fieldLabel: '案发时间',
                                width: '100%',
                                margin: '10 0 10 0',
                                format: 'Y-m-d',
                                value: me.record == null ? null : me.record.afsj
                            },
                            {
                                name: 'afdz',
                                margin: '10 0 10 0',
                                width: '100%',
                                fieldLabel: '案发地址',
                                value: me.record == null ? null : me.record.afdz
                            },
                             {
                                 name: 'wfxw',
                                 margin: '10 0 10 0',
                                 fieldLabel: '违法行为',
                                 xtype: 'textarea',
                                 width: '100%',
                                 colspan: 2,
                                 height:80,
                                 value: me.record == null ? null : me.record.wfxw
                             },
                              {
                                  name: 'flyj',
                                  margin: '10 0 10 0',
                                  fieldLabel: '法律依据',
                                  xtype: 'textarea',
                                  width: '100%',
                                  colspan: 2,
                                  height: 80,
                                  value: me.record == null ? null : me.record.flyj
                              },
                               {
                                   name: 'gznr',
                                   margin: '10 0 10 0',
                                   fieldLabel: '改正内容 ',
                                   xtype: 'textarea',
                                   width: '100%',
                                   colspan: 2,
                                   height: 80,
                                   value: me.record == null ? null : me.record.gznr
                               },
                              {
                                  xtype: 'datetimefield',
                                  border: false,
                                  name: 'zlgzqx',
                                  editable: false,
                                  margin: '10 0 10 0',
                                  fieldLabel: '责令改正期限',
                                  width: '100%',
                                  margin: '10 0 10 0',
                                  format: 'Y-m-d H:i:s',
                                  value: me.record == null ? null : me.record.zlgzqx
                              },
                             {
                                 xtype: 'datefield',
                                 border: false,
                                 name: 'tzsj',
                                 editable: false,
                                 //allowBlank: false,
                                 fieldLabel: '通知时间',
                                 width: '100%',
                                 margin: '10 0 10 0',
                                 format: 'Y-m-d',
                                 value: me.record == null ? null : me.record.tzsj
                             },
                            {
                                name: 'zfry1',
                                width: '100%',
                                margin: '10 0 10 0',
                                fieldLabel: '执法人员1',
                                value: me.record == null ? null : me.record.zfry1
                            },
                             {
                                 name: 'zfzh1',
                                 width: '100%',
                                 margin: '10 0 10 0',
                                 fieldLabel: '执法证号1',
                                 value: me.record == null ? null : me.record.zfzh1
                             },
                             {
                                 name: 'zfry2',
                                 width: '100%',
                                 margin: '10 0 10 0',
                                 fieldLabel: '执法人员2',
                                 value: me.record == null ? null : me.record.zfry2
                             },
                             {
                                 name: 'zfzh2',
                                 width: '100%',
                                 margin: '10 0 10 0',
                                 fieldLabel: '执法证号2',
                                 value: me.record == null ? null : me.record.zfzh2
                             },
                              {
                                  name: 'lxdh',
                                  width: '100%',
                                  margin: '10 0 10 0',
                                  fieldLabel: '联系电话',
                                  value: me.record == null ? null : me.record.lxdh
                              },
                             {
                                 name: 'lxdz',
                                 width: '100%',
                                 margin: '10 0 10 0',
                                 fieldLabel: '联系地址',
                                 value: me.record == null ? null : me.record.lxdz
                             },

                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})