Ext.define('TianZun.view.legalcasemanager.documents.XZCFJTTLJL', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.XZCFJTTLJL',
    width: '100%',
    height: '100%',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;


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
                                width: '100%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.ajmc
                            },
                             {
                                 xtype: 'datetimefield',
                                 border: false,
                                 name: 'kssj',
                                 editable: false,
                                 fieldLabel: '讨论开始时间',
                                 margin: '10 0 10 0',
                                 format: 'Y-m-d H:i:s',
                                 width: '100%',
                                 value: me.record == null ? null : me.record.kssj
                             },
                             {
                                 xtype: 'datetimefield',
                                 border: false,
                                 name: 'jssj',
                                 editable: false,
                                 fieldLabel: '结束时间',
                                 margin: '10 0 10 0',
                                 format: 'Y-m-d H:i:s',
                                 width: '100%',
                                 value: me.record == null ? null : me.record.jssj,
                                 validator: function ()
                                 {
                                     var kssj = me.down("datetimefield[name=kssj]").getValue();
                                     var jssj = me.down("datetimefield[name=jssj]").getValue();
                                     if (kssj > jssj)
                                     {
                                         return '讨论开始时间不得晚于结束时间!';
                                     }
                                     else
                                     {
                                         return true;
                                     }
                                 }
                             },

                            {
                                name: 'dd',
                                margin: '10 0 10 0',
                                fieldLabel: '地点',
                                width: '100%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.dd
                            },
                          {
                              xtype: 'fieldset',
                              name: '',
                              border: false,
                              layout: 'table',
                              width: '100%',
                              margin: '10 0 10 25',
                              colspan: 2,
                              items: [
                                     {
                                         fieldLabel: '主持人',
                                         name: 'zcr',
                                         xtype: 'textfield',
                                         width: '93%',
                                         labelAlign: 'right',
                                         labelWidth: 65,
                                         value: me.record == null ? null : me.record.zcr
                                     },
                                      {
                                          fieldLabel: '汇报人',
                                          name: 'hbr',
                                          xtype: 'textfield',
                                          width: '93%',
                                          labelAlign: 'right',
                                          labelWidth: 65,
                                          value: me.record == null ? null : me.record.hbr
                                      },
                                       {
                                           fieldLabel: '记录人',
                                           name: 'jlr',
                                           xtype: 'textfield',
                                           width: '93%',
                                           labelAlign: 'right',
                                           labelWidth: 65,
                                           value: me.record == null ? null : me.record.jlr
                                       },
                               ]
                           },
                            {
                                xtype: 'textarea',
                                name: 'cxryxmjzw',
                                border: false,
                                fieldLabel: '出席人员姓名及职务',
                                width: '100%',
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 80,
                                value: me.record == null ? null : me.record.cxryxmjzw
                            },
                             {
                                 xtype: 'textarea',
                                 name: 'tlnr',
                                 border: false,
                                 fieldLabel: '讨论内容',
                                 width: '100%',
                                 colspan: 2,
                                 margin: '10 0 10 0',
                                 height: 80,
                                 value: me.record == null ? null : me.record.tlnr
                             },
                              {
                                  xtype: 'textarea',
                                  name: 'tljl',
                                  border: false,
                                  fieldLabel: '讨论记录',
                                  width: '100%',
                                  colspan: 2,
                                  margin: '10 0 10 0',
                                  height: 80,
                                  value: me.record == null ? null : me.record.tljl
                              },
                              {
                                  xtype: 'textarea',
                                  name: 'zjxyj',
                                  border: false,
                                  fieldLabel: '结论性意见',
                                  width: '100%',
                                  colspan: 2,
                                  margin: '10 0 10 0',
                                  height: 80,
                                  value: me.record == null ? null : me.record.zjxyj
                              },
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})