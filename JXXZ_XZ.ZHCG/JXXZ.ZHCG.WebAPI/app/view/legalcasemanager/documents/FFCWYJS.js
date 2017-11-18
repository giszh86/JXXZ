Ext.define('TianZun.view.legalcasemanager.documents.FFCWYJS', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.FFCWYJS',
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
        var jsonstr, jdsbh;
        var tablename = panel.title.indexOf('一般案件') >= 0 ? 'case_cases' : panel.title.indexOf('简易案件') >= 0 ? 'case_simplecases' : 'case_casesources';

        Ext.Ajax.request({
            url: "/api/CommonCase/GetCaseReasonNumber?caseid=" + caseid + "&tablename=" + tablename,
            method: 'get',
            scope: this,
            async: false,
            success: function (response) {
                if (response.responseText != 'null') {
                    jsonstr = Ext.decode(response.responseText);
                    jdsbh = jsonstr.casebh;
                    jdsbh = jdsbh.indexOf('秀综执立') >= 0 ? jdsbh.replace('秀综执立', '秀综执罚决字') : jdsbh;
                } else
                    jdsbh = '';
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
                                 name: 'yjdw',
                                 margin: '10 0 10 0',
                                 fieldLabel: '移交单位',
                                 width: '99%',
                                 colspan: 2,
                                 value: me.record == null ? null : me.record.yjdw
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
                                  name: 'wfsj',
                                  editable: false,
                                  //allowBlank: false,
                                  fieldLabel: '违法时间',
                                  margin: '10 0 10 0',
                                  format: 'Y-m-d',
                                  width: '99%',
                                  value: me.record == null ? null : me.record.wfsj
                              },
                              {
                                  name: 'wfdd',
                                  margin: '10 0 10 0',
                                  fieldLabel: '违法地点',
                                  width: '99%',
                                  colspan: 2,
                                  value: me.record == null ? null : me.record.wfdd
                              },

                            {
                                xtype: 'textarea',
                                name: 'rdwfssms',
                                border: false,
                                fieldLabel: '认定违法事实描述',
                                width: '99%',
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 80,
                                value: me.record == null ? null : me.record.rdwfssms
                            },
                             {
                                 xtype: 'textarea',
                                 name: 'wfdfl',
                                 border: false,
                                 fieldLabel: '违法的法律',
                                 width: '99%',
                                 colspan: 2,
                                 margin: '10 0 10 0',
                                 height: 80,
                                 value: me.record == null ? null : me.record.wfdfl
                             },
                            
                            {
                                xtype: 'datefield',
                                border: false,
                                name: 'jdskjrq',
                                editable: false,
                                //allowBlank: false,
                                fieldLabel: '决定书开具日期',
                                margin: '10 0 10 0',
                                format: 'Y-m-d',
                                width: '99%',
                                value: me.record == null ? null : me.record.jdskjrq
                            },
                             {
                                 name: 'jdsbh',
                                 margin: '10 0 10 0',
                                 fieldLabel: '决定书编号',
                                 width: '99%',
                                 readOnly:true,
                                 value: me.record == null ? jdsbh : me.record.jdsbh
                             },
                           
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})