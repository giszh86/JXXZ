Ext.define('TianZun.view.legalcasemanager.casemanager.CaseSourceFieldList', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.caseSourceFieldList',

    title: '案源列表',
    layout: 'fit',

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 880,
            overFlowY: 'auto',
            items: [
                {
                    xtype: 'grid',
                    columnLines: true,
                    layout: 'fit',
                    width: '100%',
                    columns: [
                            { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                            { header: '案件来源', dataIndex: 'sourcename', flex: 1 },
                            { header: '联系人', dataIndex: 'contact', flex: 1 },
                            { header: '联系电话', dataIndex: 'contactphone', flex: 1 },
                            { header: '案发地址', dataIndex: 'wfxwfsdz', flex: 1 },
                            { header: '状态', dataIndex: 'statusname', flex: 1 },
                    ],
                    store: Ext.create('TianZun.store.legalcasemanager.AllCaseSource', { pageSize: 10 }),
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    }
                }
            ],
            buttons: [{
                text: '确定',
                handler: 'onWrite'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});