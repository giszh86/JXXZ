Ext.define('TianZun.view.legalcasemanager.documents.CGD', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CGD',
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
                                 name: 'cgdw',
                                 margin: '10 0 10 0',
                                 fieldLabel: '抄告单位',
                                 width: '99%',
                                 colspan: 2,
                                 value: me.record == null ? null : me.record.cgdw
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
                                   xtype: 'datefield',
                                   border: false,
                                   name: 'xdzgtzsj',
                                   editable: false,
                                   //allowBlank: false,
                                   fieldLabel: '下达整改通知时间',
                                   margin: '10 0 10 0',
                                   format: 'Y-m-d',
                                   width: '99%',
                                   value: me.record == null ? null : me.record.xdzgtzsj
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
                                    value: me.record == null ? null : me.record.lasj
                                },
                            {
                                name: 'afdz',
                                margin: '10 0 10 0',
                                fieldLabel: '案发地址',
                                width: '99%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.afdz
                            },

                            {
                                xtype: 'textarea',
                                name: 'wfxwms',
                                border: false,
                                fieldLabel: '违法行为描述',
                                width: '99%',
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 80,
                                value: me.record == null ? null : me.record.wfxwms
                            },
                             {
                                 xtype: 'textarea',
                                 name: 'wfdgd',
                                 border: false,
                                 fieldLabel: '违反的规定',
                                 width: '99%',
                                 colspan: 2,
                                 margin: '10 0 10 0',
                                 height: 80,
                                 value: me.record == null ? null : me.record.wfdgd
                             },
                              {
                                  xtype: 'textarea',
                                  name: 'cgnr',
                                  border: false,
                                  fieldLabel: '抄告内容',
                                  width: '99%',
                                  colspan: 2,
                                  margin: '10 0 10 0',
                                  height: 80,
                                  value: me.record == null ? null : me.record.cgnr
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
                                   name: 'lxdz',
                                   margin: '10 0 10 0',
                                   fieldLabel: '联系地址',
                                   width: '99%',
                                   colspan: 2,
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