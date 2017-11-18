Ext.define('TianZun.view.citizenservice.visitmanager.VisitEvent', {
    extend: 'Ext.Window',
    alias: 'widget.visitEvent',
    modal:true,
    title: '关联相关市民事件',
    layout: 'fit',

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 880,
            overFlowY:'auto',
            layout: {
                type: 'table',
                columns: 4,
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 75
            },
            defaults: {
                xtype: 'textfield',
                width: 250,
                style: 'margin-bottom:15px'
            },
            items: [
                {
                    fieldLabel: '事件标题',
                    name: 'eventtitle',
                    xtype: 'textfield'
                },
                {
                    fieldLabel: '事件地址',
                    xtype: 'textfield',
                    name: 'eventaddress',
                },
                {
                    fieldLabel: '事件来源',
                    xtype: 'combo',
                    name: 'sourceid',
                    store: Ext.create('TianZun.store.citizenservice.EventSource'),
                    valueField: 'ID',
                    displayField: 'Name',
                    editable: false
                },                
                {
                    xtype: 'button',
                    text: '查询',
                    width: 50,
                    margin:'-11 0 0 10',
                    handler: 'onQueryEvent'
                },
                {
                    xtype: 'grid',
                    columnLines: true,
                    colspan: 4,
                    layout: 'fit',
                    width:'100%',
                    columns: [
                            { header: '事件标题', dataIndex: 'eventtitle', flex: 1 },
                            { header: '事件地址', dataIndex: 'eventaddress', flex: 1 },
                            { header: '事件来源', dataIndex: 'sourcename', flex: 1 },
                            { header: '联系人', dataIndex: 'complainant', flex: 1 },
                            { header: '联系电话', dataIndex: 'contactphone', flex: 1 },
                            { header: '事发时间', dataIndex: 'createtime', flex: 1 },
                            { header: '处理结果', dataIndex: 'suggest', flex: 1 },
                    ],
                    store: Ext.create('TianZun.store.citizenservice.AllEvent', {pageSize:10}),
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    },
                    listeners: {
                        itemdblclick: 'onWrite'
                    }
                }
            ],
            buttons: [{
                text: '确定',
                handler: 'onWrite'
            }, {
                text: '重置',
                handler: 'onReseat'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});