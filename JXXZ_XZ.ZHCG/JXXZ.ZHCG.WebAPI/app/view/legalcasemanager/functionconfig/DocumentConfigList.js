Ext.define('TianZun.view.legalcasemanager.functionconfig.DocumentConfigList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.documentConfigList',
    title: '执法办案管理 > 配置管理 > 文书配置管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.legalcasemanager.DocumentConfig',
    ],
    controller: 'documentConfig',

    border: false,
    bodyBorder: false,
    initComponent: function () {

        this.items = [
            {
                layout: 'hbox',
                border: false,
                xtype: 'panel',
                name: 'documentConfigPanel',
                items: [
                    {
                        xtype: 'panel',
                        width: '25%',
                        height: '100%',
                        layout: 'vbox',
                        margin: '20 0 0 20',
                        items: [{
                            xtype: 'box',
                            html: '<label style="font-size:15px;line-height:30px;">操作面板</label>',
                            width: '100%',
                            style: 'text-align:center;',
                            height: 30,
                        }, {
                            xtype: 'panel',
                            width: '100%',
                            height: '95%',
                            border: false,
                            overflowX: 'auto',
                            overflowY: 'auto',
                            listeners: {
                                render: function (obj) {
                                    GetAjax({
                                        url: 'api/DocumentConfig/GetCaseLinkList',
                                        complete: function (jqXHR, textStatus, errorThrown) {
                                            if (textStatus == "success") {
                                                var treeMenus = jQuery.parseJSON(jqXHR.responseText);
                                                var treePanel = Ext.create('Ext.tree.Panel', {
                                                    border: false,
                                                    rootVisible: false,
                                                    root: {
                                                        children: treeMenus
                                                    },
                                                    listeners: {
                                                        itemclick: function (itemObj, record, item, index) {
                                                            var store = this.up('panel[name=documentConfigPanel]').down('grid').getStore();
                                                            var filters = [];

                                                            if (record.data.wfid == null) {
                                                                var wfdid = record.data.id;
                                                                if ($.trim(wfdid) != null && $.trim(wfdid) != "") {
                                                                    filters.push({ property: "wfdid", value: wfdid });
                                                                }
                                                            }
                                                            else {
                                                                var phaseid = record.data.id;
                                                                if (typeof phaseid == "number") {
                                                                    filters.push({ property: "phaseid", value: phaseid });
                                                                }
                                                            }
                                                            FilterStore(store, filters);
                                                        }
                                                    }
                                                });

                                                obj.add({
                                                    items: treePanel,
                                                    border: false,
                                                });
                                            }
                                        }
                                    })
                                }
                            }

                        }]

                    },
                    {
                        xtype: 'panel',
                        width: '2%',
                        height: '100%',
                        border: false,
                    },
                    {
                        layout: 'fit',
                        xtype: 'panel',
                        width: '70%',
                        height: '100%',
                        margin: '20 0 0 0',
                        border: false,
                        items: {
                            xtype: 'grid',
                            columnLines: true,
                            selModel: Ext.create('Ext.selection.CheckboxModel'),
                            multiSelect: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '环节名称', dataIndex: 'wfdname', flex: 1 },
                                    { header: '文书名称', dataIndex: 'ddname', flex: 1 },
                                    {
                                        header: '是否必填', dataIndex: 'isrequired', flex: 1, renderer: function (value) {
                                            return value == 0 ? '否' : '是'
                                        }
                                    },
                            ],
                            store: Ext.create('TianZun.store.legalcasemanager.DocumentConfig'),
                            tbar: [
                                {
                                    text: '新增',
                                    handler: 'onAdd',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '删除',
                                    handler: 'onDelete',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '编辑',
                                    handler: 'onEdit',
                                    handleMouseEvents: false
                                },
                                '->',
                                {
                                    text: '搜索条件',
                                    handler: 'onQuery',
                                    handleMouseEvents: false
                                }
                            ],
                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true
                            },
                        }
                    }
                ]
            }


        ]

        this.callParent();
    }
})