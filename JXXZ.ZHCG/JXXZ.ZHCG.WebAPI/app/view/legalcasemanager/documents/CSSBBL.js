Ext.define('TianZun.view.legalcasemanager.documents.CSSBBL', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CSSBBL',
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
                                 xtype: 'datetimefield',
                                 border: false,
                                 name: 'sbsj',
                                 editable: false,
                                 fieldLabel: '申辩时间',
                                 margin: '10 0 10 0',
                                 format: 'Y-m-d H:i:s',
                                 width: '99%',
                                 value: me.record == null ? null : me.record.sbsj
                             },
                           
                            {
                                name: 'sbdd',
                                margin: '10 0 10 0',
                                fieldLabel: '申辩地点',
                                width: '99%',
                                value: me.record == null ? null : me.record.sbdd
                            },
                         
                            {
                                xtype: 'textarea',
                                name: 'dsrjbqk',
                                border: false,
                                fieldLabel: '当事人基本情况',
                                width: '99%',
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 80,
                                value: me.record == null ? null : me.record.dsrjbqk
                            },
                             {
                                 xtype: 'textarea',
                                 name: 'sx',
                                 border: false,
                                 fieldLabel: '事项',
                                 width: '99%',
                                 colspan: 2,
                                 margin: '10 0 10 0',
                                 height: 80,
                                 value: me.record == null ? null : me.record.sx
                             },
                              {
                                  xtype: 'textarea',
                                  name: 'cssbnr',
                                  border: false,
                                  fieldLabel: '陈述申辩内容',
                                  width: '99%',
                                  colspan: 2,
                                  margin: '10 0 10 0',
                                  height: 80,
                                  value: me.record == null ? null : me.record.cssbnr
                              },
                             
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})