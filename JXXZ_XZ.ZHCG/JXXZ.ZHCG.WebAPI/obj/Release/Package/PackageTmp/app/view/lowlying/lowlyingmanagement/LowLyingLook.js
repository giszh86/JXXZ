Ext.define('TianZun.view.lowlying.lowlyingmanagement.LowlyingLook', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.lowlyingLook',
    title: '查看详情',
    layout: 'fit',

    initComponent: function () {
        var store = Ext.create('TianZun.store.lowlying.LowLyingOldListStore', { proxy: { type: 'ajax', extraParams: { id: this.record.id } } });
        this.items = [{
            //xtype: 'form',
            //border: false,
            //bodyPadding: 10,
            //width: 1000,
            //items: [
            //        {
                        xtype: 'tabpanel',
                        layout: 'fit',
                        border: false,
                        plain: true,
                        bodyBorder: false,
                        items: [
                            {
                                layout: 'fit',
                                border: false,
                                width: 800,
                                bodyPadding: 10,
                                overflowY: 'auto',
                                title: '详情编辑',
                                name: 'lowlyingListTab',
                                items: [{
                                    xtype: 'fieldset',
                                    collapsible: true,
                                    title: '基础信息',
                                    layout: {
                                        type: 'table',
                                        columns: 3,
                                    },
                                    fieldDefaults: {
                                        labelAlign: 'right',
                                        labelWidth: 105,
                                        margin: '0 0 10 0',
                                    },
                                    defaults: {
                                        xtype: 'textfield',
                                        width: '98%',
                                    },
                                    items: [

                                        {
                                            fieldLabel: '编号',
                                            xtype: 'displayfield',
                                            value: this.record.id,
                                        },
                                        {
                                            fieldLabel: '监测点名称',
                                            xtype: 'displayfield',
                                            value: this.record.get('jkdmc')
                                        },
                                        {
                                            fieldLabel: '状态',
                                            xtype: 'displayfield',
                                            value: this.record.get('zt')
                                        },
                                        {
                                            fieldLabel: '维护单位',
                                            xtype: 'displayfield',
                                            value: this.record.get('whdw')
                                        },
                                        //{
                                        //    fieldLabel: '维护人员',
                                        //    xtype: 'displayfield',
                                        //    value: this.record.get('whry')
                                        //},
                                        {
                                            fieldLabel: '报警临界值',
                                            xtype: 'displayfield',
                                            value: this.record.get('bjljz')
                                        },
                                        {
                                            fieldLabel: '历史报警信息',
                                            xtype: 'displayfield',
                                            value: this.record.get('lsbjsl')
                                        },
                                        {
                                            fieldLabel: '地址',
                                            xtype: 'displayfield',
                                            colspan: 2,
                                            width: '99%',
                                            value: this.record.get('dz')

                                        },

                                    ]
                                }
                                ],
                                buttons: [
                                {
                                    text: '关闭',
                                    handler: 'onClose'
                                }]
                            },
                           
                            {
                                layout: 'fit',
                                border: false,
                                title: '报警历史',
                                xtype: 'form',
                                border: false,
                                bodyPadding: 10,
                                width: 800,
                                overflowY: 'auto',
                                name: 'lowlyingListTab',
                                items: [
                                    {
                                        xtype: 'grid',
                                        multiSelect: true,
                                        columnLines: true,
                                        columns: [
                                                { header: '报警时间', dataIndex: 'cjsj', flex: 1 },
                                                { header: '报警值', dataIndex: 'bjz', flex: 1 },
                                                { header: '报警临界值', dataIndex: 'bjljz', flex: 1 },
                                                { header: '处理情况', dataIndex: 'clqk', flex: 1 },
                                        ],
                                        store: store,
                                        bbar: {
                                            xtype: 'pagingtoolbar',
                                            displayInfo: true
                                        },
                                    }
                                ],
                                buttons: [{
                                    text: '返回',
                                    handler: 'onClose'
                                }]
                            }
                        ]
                    }
            ]
        //}];

        this.callParent();
    }
});