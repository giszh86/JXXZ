Ext.define('TianZun.view.legalcasemanager.documents.CGS', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CGS',
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
                    wsbh = wsbh.indexOf('秀综执立') >= 0 ? wsbh.replace('秀综执立', '秀综执催字') : wsbh;
                } else
                    wsbh = '';
            }
        });

        var cgnr =
      '<br/><br/><br/>本机关责令你（单位）在收到本催告书之日起十日（十个工作日）内履行行政处罚决定相关义务，如对履行该义务有陈述、申辩意见，请在该期限内向本机关提出。逾期仍未履行的，本机关将依法申请人民法院强制执行（如不可采取改正措施的违法建筑案件有自行强制执行权的可以写“申请秀洲区人民政府责成有关部门强制执行”）。';
     

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
                                  name: 'cgsj',
                                  editable: false,
                                  //allowBlank: false,
                                  fieldLabel: '催告时间',
                                  margin: '10 0 10 0',
                                  format: 'Y-m-d',
                                  width: '99%',
                                  value: me.record == null ? null : me.record.cgsj
                              },
                               {
                                   xtype: 'htmleditor',
                                   name: 'cgnr',
                                   border: false,
                                   fieldLabel: '催告内容',
                                   width: 800,
                                   colspan: 2,
                                   margin: '10 0 10 0',
                                   height: 180,
                                   value: me.record == null ? cgnr : me.record.cgnr,
                                   listeners: {
                                       render: function (obj) {
                                           obj.getToolbar().hide();
                                       }
                                   }
                               },


                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})