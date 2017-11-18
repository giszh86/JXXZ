Ext.define('TianZun.view.legalcasemanager.documents.CYQZTZS', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CYQZTZS',
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
                }else
                    wsbh = '';
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
                                xtype: 'hidden',
                                name: 'goodsValue'
                            },
                             {
                                 name: 'wsbh',
                                 margin: '10 0 10 0',
                                 fieldLabel: '文书编号',
                                 width: '99%',
                                 colspan: 2,
                                 readOnly: true,
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
                                  name: 'tzsj',
                                  editable: false,
                                  fieldLabel: '通知时间',
                                  margin: '10 0 10 0',
                                  format: 'Y-m-d',
                                  width: '99%',
                                  value: me.record == null ? null : me.record.tzsj
                              },
                             
                              {
                                  xtype: 'textarea',
                                  name: 'wfxw',
                                  border: false,
                                  fieldLabel: '违法行为',
                                  width: '99%',
                                  colspan: 2,
                                  margin: '10 0 10 0',
                                  height: 80,
                                  value: me.record == null ? null : me.record.wfxw
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
                                 name: 'cydz',
                                 margin: '10 0 10 0',
                                 fieldLabel: '抽样地址',
                                 width: '99%',
                                 colspan: 2,
                                 value: me.record == null ? null : me.record.cydz
                             },

                            {
                                xtype: 'grid',
                                name: 'goodsgrid',
                                layout: 'fit',
                                colspan: 2,
                                width: '99%',
                                margin: '0 0 20 0',
                                plugins: [
                                    { ptype: 'cellediting', clicksToEdit: 2 }
                                ],
                                columnLines: true,
                                columns: [
                                    { header: '名称', dataIndex: 'goodsname', flex: 1, editor: 'textfield' },
                                    {
                                        header: '数量', dataIndex: 'goodscount', flex: 1, editor: {
                                            xtype: 'numberfield',
                                            minValue: 1
                                        },
                                    },
                                    { header: '品级', dataIndex: 'goodspj', flex: 1, editor: 'textfield' },
                                    { header: '规格', dataIndex: 'goodsgg', flex: 1, editor: 'textfield' },
                                    { header: '型号', dataIndex: 'goodsxh', flex: 1, editor: 'textfield' },
                                    { header: '形态', dataIndex: 'goodsxt', flex: 1, editor: 'textfield' },
                                    { header: '处理状态', dataIndex: 'goodsremark', flex: 1, editor: 'textfield' },
                                    {
                                        header: '<b style="cursor:pointer;">添加</b>', dataIndex: '', flex: 1, listeners: {
                                            headerclick: function () {
                                                var rec = new Ext.data.Record({
                                                    id: null,
                                                    goodsname: '',
                                                    goodscount: 1,
                                                    goodspj: '',
                                                    goodsgg: '',
                                                    goodsxh: '',
                                                    goodsxt: '',
                                                    goodsremark: ''
                                                });
                                                var grid = me.down('grid');
                                                var store = grid.getStore();
                                                var count = store.getCount();
                                                store.insert(count, rec);
                                            }
                                        },
                                        xtype: 'actioncolumn',
                                        width: 50,
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
                                            Ext.each(me.record.goodslist, function (value, key) {
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
                            },
                             {
                                 name: 'bcyqzr',
                                 margin: '10 0 10 0',
                                 fieldLabel: '被抽样取证人',
                                 width: '99%',
                                 value: me.record == null ? null : me.record.bcyqzr
                             },
                              {
                                  xtype: 'datefield',
                                  border: false,
                                  name: 'tztime',
                                  editable: false,
                                  fieldLabel: '通知时间',
                                  margin: '10 0 10 0',
                                  format: 'Y-m-d',
                                  width: '99%',
                                  value: me.record == null ? null : me.record.tztime
                              },
                             {
                                 name: 'zfry',
                                 margin: '10 0 10 0',
                                 fieldLabel: '执法人员',
                                 width: '99%',
                                 value: me.record == null ? null : me.record.zfry
                             },
                              {
                                  xtype: 'datefield',
                                  border: false,
                                  name: 'zfsj',
                                  editable: false,
                                  fieldLabel: '执法时间',
                                  margin: '10 0 10 0',
                                  format: 'Y-m-d',
                                  width: '99%',
                                  value: me.record == null ? null : me.record.zfsj
                              },
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})