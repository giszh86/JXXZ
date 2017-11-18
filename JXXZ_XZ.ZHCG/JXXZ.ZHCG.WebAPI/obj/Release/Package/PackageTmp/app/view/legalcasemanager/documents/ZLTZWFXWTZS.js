Ext.define('TianZun.view.legalcasemanager.documents.ZLTZWFXWTZS', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ZLTZWFXWTZS',
    layout: 'fit',
    width: '100%',
    height: '100%',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        //添加文书时获取文书编号
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        var wfsaid = panel.record.get('wfsaid') != null ? panel.record.get('wfsaid') : panel.record.get('currentwfsaid')        
        var wsbh;
        Ext.Ajax.request({
            url: "/api/DucumentTemplet/GetZLTZWFXWTZSNumber?ddid=22&wfsaid=" + wfsaid,
            method: 'get',
            scope: this,
            async: false,
            success: function (response) {
                wsbh = Ext.decode(response.responseText);
            }
        });

        this.items = [
            {
                xtype: 'form',
                width: '100%',
                border: false,
                overflowY: 'auto',
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
                                fieldLabel: '文书编号',
                                name: 'wsbh',
                                margin: '10 0 10 0',
                                colspan: 2,
                                readOnly:true,
                                value: me.record == null ? wsbh : me.record.wsbh
                            },
                            {
                                fieldLabel: '当事人',
                                name: 'dsr',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.dsr
                            },
                            {
                                fieldLabel: '案发时间',
                                xtype: 'datefield',
                                format: 'Y-m-d',
                                editable:false,
                                name: 'afsj',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.afsj
                            },
                            {
                                fieldLabel: '案发地址',
                                name: 'afdz',
                                margin: '0 0 10 0',
                                colspan: 2,
                                value: me.record == null ? null : me.record.afdz
                            },
                            {
                                fieldLabel: '违法行为',
                                xtype: 'textarea',
                                name: 'wfxw',
                                width: '100%',
                                colspan: 2,
                                margin: '0 0 10 0',
                                height: 50,
                                value: me.record == null ? null : me.record.wfxw
                            },
                            {
                                fieldLabel: '违法规定',
                                xtype: 'textarea',
                                name: 'wfgd',
                                width: '100%',
                                colspan: 2,
                                margin: '0 0 10 0',
                                height: 50,
                                value: me.record == null ? null : me.record.wfgd
                            },
                            {
                                fieldLabel: '执法人员',
                                name: 'zfry1',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.zfry1
                            },
                            {
                                fieldLabel: '执法证件',
                                name: 'zfzh1',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.zfzh1
                            },
                            {
                                fieldLabel: '执法人员',
                                name: 'zfry2',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.zfry2
                            },
                            {
                                fieldLabel: '执法证件',
                                name: 'zfzh2',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.zfzh2
                            },
                            {
                                fieldLabel: '联系电话',
                                name: 'lxdh',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.lxdh
                            },
                            {
                                fieldLabel: '联系地址',
                                name: 'lxdz',
                                margin: '0 0 10 0',
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