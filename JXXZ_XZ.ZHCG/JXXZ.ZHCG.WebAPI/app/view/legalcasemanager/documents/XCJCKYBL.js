Ext.define('TianZun.view.legalcasemanager.documents.XCJCKYBL', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.XCJCKYBL',
    layout: 'fit',
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
                                xtype: 'panel',
                                layout: 'hbox',
                                width: '100%',
                                margin: '10 0 10 0',
                                colspan: 2,
                                border: false,
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
                                        xtype: 'label',
                                        margin: '10 5 10 10',
                                        html: '检查(勘验)时间:',
                                    },
                                    {
                                        xtype: 'datefield',
                                        margin: '10 0 10 0',
                                        width: 350,
                                        name: 'jcdate',
                                        format: 'Y-m-d',
                                        editable: false,
                                        value: me.record == null ? null : me.record.jcdate
                                    },
                                    {
                                        xtype: 'timefield',
                                        margin: '10 0 10 50',
                                        name: 'sjctime',
                                        format: 'H:i',
                                        increment: 5,
                                        editable: false,
                                        value: me.record == null ? null : me.record.sjctime,
                                        listeners: {
                                            change: function (obj) {
                                                ejctime = me.down('timefield[name=ejctime]');
                                                if (ejctime.getValue() != null && obj.getValue() > ejctime.getValue()) {
                                                    Ext.Msg.alert('提示', '结束时间不能早于开始时间');
                                                    ejctime.clearValue();
                                                }
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '10 20 10 20',
                                        html: '至',
                                    },
                                    {
                                        xtype: 'timefield',
                                        margin: '10 0 10 0',
                                        name: 'ejctime',
                                        format: 'H:i',
                                        increment: 5,
                                        editable: false,
                                        value: me.record == null ? null : me.record.ejctime,
                                        listeners: {
                                            change: function (obj) {
                                                sjctime = me.down('timefield[name=sjctime]');
                                                if (sjctime.getValue() != null && obj.getValue() < sjctime.getValue()) {
                                                    Ext.Msg.alert('提示','结束时间不能早于开始时间');
                                                    sjctime.clearValue();
                                                }
                                            }
                                        }
                                    },
                                ]
                            },
                            {
                                name: 'jcplace',
                                margin: '10 0 10 0',
                                fieldLabel: '检查(勘验)地点',
                                width: '100%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.jcplace
                            },
                            {
                                name: 'zkyr',
                                margin: '10 0 10 0',
                                fieldLabel: '勘验人',
                                value: me.record == null ? null : me.record.zkyr
                            },
                            {
                                name: 'zdwzw',
                                margin: '10 0 10 0',
                                fieldLabel: '单位及职务',
                                value: me.record == null ? null : me.record.zdwzw
                            },
                            {
                                name: 'xkyr',
                                margin: '10 0 10 0',
                                fieldLabel: '勘验人',
                                value: me.record == null ? null : me.record.xkyr
                            },
                            {
                                name: 'xdwzw',
                                margin: '10 0 10 0',
                                fieldLabel: '单位及职务',
                                value: me.record == null ? null : me.record.xdwzw
                            },
                            {
                                name: 'dsr',
                                margin: '10 0 10 0',
                                fieldLabel: '当事人',
                                value: me.record == null ? null : me.record.dsr
                            },
                            {
                                name: 'dsrdwzw',
                                margin: '10 0 10 0',
                                fieldLabel: '单位及职务',
                                value: me.record == null ? null : me.record.dsrdwzw
                            },
                            {
                                name: 'xcfzr',
                                margin: '10 0 10 0',
                                fieldLabel: '现场负责人',
                                value: me.record == null ? null : me.record.xcfzr
                            },
                            {
                                name: 'xcdwzw',
                                margin: '10 0 10 0',
                                fieldLabel: '单位及职务',
                                value: me.record == null ? null : me.record.xcdwzw
                            },
                            {
                                name: 'byqr',
                                margin: '10 0 10 0',
                                fieldLabel: '被邀请人',
                                value: me.record == null ? null : me.record.byqr
                            },
                            {
                                name: 'byqdwzw',
                                margin: '10 0 10 0',
                                fieldLabel: '单位及职务',
                                value: me.record == null ? null : me.record.byqdwzw
                            },
                            {
                                name: 'jlr',
                                margin: '10 0 10 0',
                                fieldLabel: '记录人',
                                value: me.record == null ? null : me.record.jlr
                            },
                            {
                                name: 'jlrdwzw',
                                margin: '10 0 10 0',
                                fieldLabel: '单位及职务',
                                value: me.record == null ? null : me.record.jlrdwzw
                            },
                            {
                                name: 'zzfry',
                                margin: '10 0 10 0',
                                fieldLabel: '执法人员',
                                value: me.record == null ? null : me.record.zzfry
                            },
                            {
                                name: 'zzjhm',
                                margin: '10 0 10 0',
                                fieldLabel: '证件号码',
                                value: me.record == null ? null : me.record.zzjhm
                            },
                            {
                                name: 'xzfry',
                                margin: '10 0 10 0',
                                fieldLabel: '执法人员',
                                value: me.record == null ? null : me.record.xzfry
                            },
                            {
                                name: 'xzjhm',
                                margin: '10 0 10 0',
                                fieldLabel: '证件号码',
                                value: me.record == null ? null : me.record.xzjhm
                            },
                            {
                                name: 'jzr',
                                margin: '10 0 10 0',
                                colspan: 2,
                                fieldLabel: '见证人',
                                value: me.record == null ? null : me.record.jzr
                            },
                            {
                                xtype: 'textarea',
                                name: 'xcqk',
                                fieldLabel: '现场情况',
                                width: '100%',
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 40,
                                value: me.record == null ? null : me.record.xcqk
                            },
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})