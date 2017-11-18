Ext.define('TianZun.view.legalcasemanager.casemanager.SimpleCaseSourceList', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.simpleCaseSourceList',

    title: '案由列表',
    layout: 'fit',

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 880,
            overFlowY: 'auto',
            //layout: {
            //    type: 'table',
            //    columns: 4,
            //},
            layout:'fit',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 75
            },
            defaults: {
                xtype: 'textfield',
                width: 255,
                style: 'margin-bottom:15px'
            },
            items: [
                //{
                //    fieldLabel: '标题',
                //    name: 'eventtitle',
                //    xtype: 'textfield'
                //},
                //{
                //    fieldLabel: '事件地址',
                //    xtype: 'textfield',
                //    name: 'eventaddress',
                //},
                //{
                //    fieldLabel: '事件来源',
                //    xtype: 'combo',
                //    name: 'sourceid',
                //    store: Ext.create('TianZun.store.citizenservice.EventSource'),
                //    valueField: 'ID',
                //    displayField: 'Name',
                //    editable: false
                //},
                //{
                //    xtype: 'button',
                //    text: '查询',
                //    width: 50,
                //    margin: '-11 0 0 20',
                //    handler: 'onQueryEvent'
                //},
                {
                    xtype: 'grid',
                    columnLines: true,
                    colspan: 4,
                    layout: 'fit',
                    width: '100%',
                    columns: [
                            { header: '事件标题', dataIndex: 'eventtitle', flex: 1 },
                            { header: '事件地址', dataIndex: 'eventaddress', flex: 1 },
                            { header: '事件来源', dataIndex: 'sourcename', flex: 1 },
                            { header: '联系人', dataIndex: 'complainant', flex: 1 },
                            { header: '联系电话', dataIndex: 'contactphone', flex: 1 },
                            { header: '事发时间', dataIndex: 'createtime', flex: 1 },
                    ],
                    store: Ext.create('TianZun.store.citizenservice.AllEvent', { pageSize: 10 }),
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    }
                }
            ],
            buttons: [{
                text: '确定',
                handler: 'onDJWrite'
            },
            //{
            //    text: '清空',
            //    handler: 'onEmpty'
            //},
            {
                text: '关闭',
                handler: 'onHide'
            }]
        }];

        this.callParent();
    }
});