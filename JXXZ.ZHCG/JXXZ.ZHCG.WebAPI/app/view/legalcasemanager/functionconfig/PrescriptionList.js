Ext.define('TianZun.view.legalcasemanager.functionconfig.PrescriptionList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.prescriptionList',
    title: '执法办案管理 > 配置管理 > 案件时效管理',
    layout: 'fit',

    requires: [
      'TianZun.controller.legalcasemanager.Prescription',
    ],
    controller: 'prescription',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.legalcasemanager.PrescriptionStore');

        this.items = [
            {
                xtype: 'tabpanel',
                border: false,
                plain: true,
                bodyBorder: false,

                items: [
                    {
                        layout: 'fit',
                        border: false,
                        title: '时效管理',
                        name: 'visitTab',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '流程编号', dataIndex: 'workid', flex: 1 },
                                    { header: '流程名称', dataIndex: 'workname', flex: 1 },
                                    { header: '处理期限(h)', dataIndex: 'term', flex: 1 },
                                 
                            ],
                            store: store,
                            tbar: [
                                  {
                                      text: '添加',
                                      handler: 'onAdd',
                                      handleMouseEvents: false
                                  },
                                  {
                                      text: '编辑',
                                      handler: 'onEdit',
                                      handleMouseEvents: false
                                  },
                               
                                
                            ],
                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true
                            }
                        }]
                    }
                ],
                listeners: {
                    afterrender: function (panel) {
                        var bar = panel.tabBar;
                        bar.insert(9, [
                        {
                            xtype: 'component', //撑开
                            flex: 1
                        },
                       
                        ]);
                    },
                }
            }
        ]

        this.callParent();
    }
});