Ext.define('TianZun.view.legalcasemanager.documents.YSAJSAWPQD', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.YSAJSAWPQD',
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
                                xtype: 'hidden',
                                name: 'goodsValue'
                            },
                            {
                                fieldLabel: '移送单位',
                                name: 'ysdw',
                                margin: '10 0 10 0',
                                colspan: 2,
                                value: me.record == null ? null : me.record.ysdw
                            },
                            {
                                fieldLabel: '移送案件接收人',
                                name: 'ysajjsr',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.ysajjsr
                            },
                            {
                                fieldLabel: '接收时间',
                                xtype: 'datefield',
                                format: 'Y-m-d',
                                editable: false,
                                name: 'jssj',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.jssj,
                            },
                            {
                                fieldLabel: '移送案件移送人',
                                name: 'ysajysr',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.ysajysr
                            },
                            {
                                fieldLabel: '移送时间',
                                xtype: 'datefield',
                                format: 'Y-m-d',
                                editable: false,
                                name: 'yssj',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.yssj,
                                validator: function ()
                                {
                                    var jssj = me.down("datefield[name=jssj]").getValue();
                                    var yssj = me.down("datefield[name=yssj]").getValue();
                                    if (jssj < yssj)
                                    {
                                        return '接收时间不得早于移送时间!';
                                    }
                                    else
                                    {
                                        return true;
                                    }
                                }
                            },
                            {
                                xtype: 'grid',
                                name:'goodsgrid',
                                layout: 'fit',
                                colspan: 2,
                                width: '100%',
                                margin:'0 0 20 0',
                                plugins: [
                                    { ptype: 'cellediting', clicksToEdit: 2 }
                                ],
                                columnLines: true,
                                columns: [
                                    { header: '名称', dataIndex: 'goodsname', flex: 1, editor: 'textfield'},
                                    {
                                        header: '数量', dataIndex: 'goodscount', flex: 1, editor: {
                                            xtype: 'numberfield',
                                            minValue:1
                                        },
                                    },
                                    { header: '品级', dataIndex: 'goodspj', flex: 1, editor: 'textfield'},
                                    { header: '规格', dataIndex: 'goodsgg', flex: 1, editor: 'textfield'},
                                    { header: '型号', dataIndex: 'goodsxh', flex: 1, editor: 'textfield'},
                                    { header: '形态', dataIndex: 'goodsxt', flex: 1, editor: 'textfield'},
                                    { header: '备注', dataIndex: 'goodsremark', flex: 1, editor: 'textfield'},
                                    { 
                                        header: '<button style="cursor:pointer;">添加</button>', dataIndex: '', flex: 1, listeners: {
                                            headerclick: function () {
                                                var rec = new Ext.data.Record({
                                                    id:null,
                                                    goodsname: '',
                                                    goodscount: 1,
                                                    goodspj: '',
                                                    goodsgg: '',
                                                    goodsxh: '',
                                                    goodsxt: '',
                                                    goodsremark:''
                                                });
                                                var grid = me.down('grid');
                                                var store = grid.getStore();
                                                var count = store.getCount();
                                                store.insert(count, rec);
                                            }
                                        },
                                        xtype: 'actioncolumn',
                                        width: 80,
                                        menuDisabled: true,
                                        align: 'center',
                                        items: [{
                                            tooltip: '删除',
                                            icon: '/Images/images/delete.gif',
                                            handler: function (grid, rowIndex) {
                                                Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
                                                    if (btn == "yes") {
                                                        grid.getStore().removeAt(rowIndex);
                                                    }
                                                });
                                            }
                                        }]
                                    },
                                ],
                                listeners: {
                                    render: function (obj) {
                                        me.down('grid').getStore().reload();
                                        if (me.record != null && me.record.goodslist.length > 0) {
                                            Ext.each(me.record.goodslist,function (value, key) {
                                                var rec = new Ext.data.Record({
                                                    id: null,
                                                    goodsname: value['goodsname'],
                                                    goodscount: value['goodscount'],
                                                    goodspj: value['goodspj'],
                                                    goodsgg: value['goodsgg'],
                                                    goodsxh: value['goodsxh'],
                                                    goodsxt: value['goodsxt'],
                                                    goodsremark: value['goodsremark']
                                                });
                                                var grid = me.down('grid');
                                                var store = grid.getStore();
                                                var count = store.getCount();
                                                store.insert(count, rec);
                                            })
                                        }
                                    }
                                }
                            }
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})