Ext.define('TianZun.view.accountmanager.accountregister.CitizenEventList', {
    extend: 'Ext.Window',
    alias: 'widget.citizenEventList',
    modal:true,
    layout: 'fit',
    title: '关联相关市民事件',
    initComponent: function () {
        var store = Ext.create('TianZun.store.accountmanager.accountregister.EventList');

        this.items = [
            {
                layout: 'fit',
                border: false,
                name: 'doctemp',
                items: [{
                    xtype: 'grid',
                    selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                    columnLines: true,
                    width: 800,
                    height: 400,
                    columns: [
                            { header: '事件标题', dataIndex: 'eventtitle', flex: 1 },
                            { header: '事件来源', dataIndex: 'sourcename', flex: 1 },
                            { header: '事件地址', dataIndex: 'eventaddress', flex: 1 },
                            { header: '联系人', dataIndex: 'complainant', flex: 1 },
                            { header: '联系电话', dataIndex: 'contactphone', flex: 1 },
                            { header: '事发时间', dataIndex: 'foundtime', flex: 1 },
                            { header: '事件ID', dataIndex: 'citizenid', hidden: true },
                    ],
                    store: store,
                    tbar: [
                        {
                            xtype: 'form',
                            border: 0,
                            layout: 'table',
                            name: '',
                            fieldDefaults: {
                                labelAlign: 'right',
                                labelWidth: 60
                            },
                            items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '事件标题',
                            name:'eventtitle'
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: '事件来源',
                            name: 'sourceid',
                            store: Ext.create('TianZun.store.citizenservice.EventSource'),
                            valueField: 'ID',
                            displayField: 'Name',
                            editable: false
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '事件地址',
                            name: 'eventaddress'
                        },
                        {
                            xtype:'button',
                            text: '查询',
                            margin:'-5 0 0 10',
                            handler: 'onEventQueryOK',
                            handleMouseEvents: false
                        }]
                        }
                    ],
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    }
                }
                ],
                    buttons: [{
                        text: '确定',
                        handler: 'onCitizenEventSelectOK'
                    }, {
                        text: '清空',
                        handler: 'onEmptyEvent'
                    },
                    {
                        text: '关闭',
                        handler: 'onClose'
                    }]
            }
        ]

        this.callParent();
    }
});