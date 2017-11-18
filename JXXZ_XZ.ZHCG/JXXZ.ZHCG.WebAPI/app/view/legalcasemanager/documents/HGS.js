Ext.define('TianZun.view.legalcasemanager.documents.HGS', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.HGS',
    width: '100%',
    height: '100%',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        var nrsm =
       '<br/><br/>依据《违反土地管理规定行为处分办法》第十条的规定，现移送你单位对相关责任人进一步调查处理。<br/>' +
        '特此函告。<br/>' +
        '附件：1、行政处罚决定书';

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
                                  name: 'hgsj',
                                  editable: false,
                                  //allowBlank: false,
                                  fieldLabel: '函告时间',
                                  margin: '10 0 10 0',
                                  format: 'Y-m-d',
                                  value: me.record == null ? null : me.record.hgsj
                              },
                            //{
                            //    name: 'bdcuser',
                            //    margin: '10 0 10 0',
                            //    fieldLabel: '函告时间',
                            //    value: me.record == null ? null : me.record.bdcuser
                            //},
                            {
                                name: 'lxr',
                                margin: '10 0 10 0',
                                fieldLabel: '联系人',
                                value: me.record == null ? null : me.record.lxr
                            },
                             {
                                 name: 'lxdh',
                                 margin: '10 0 10 0',
                                 fieldLabel: '联系电话',
                                 value: me.record == null ? null : me.record.lxdh
                             },
                            {
                                name: 'lxdz',
                                margin: '10 0 10 0',
                                fieldLabel: '联系地址',
                                value: me.record == null ? null : me.record.lxdz
                            },
                            {
                                xtype: 'htmleditor',
                                name: 'nrsm',
                                border: false,
                                fieldLabel: '内容说明',
                                width: 800,
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 180,
                                value: me.record == null ? nrsm : me.record.nrsm,
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