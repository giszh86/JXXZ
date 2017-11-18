Ext.define('TianZun.view.uav.datamanagement.DataManagementList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dataManagementList',
    title: '无人机管理 > 数据管理',
    layout: 'fit',
    requires: [
       'TianZun.controller.uav.DataManagement',
    ],
    controller: 'dataManagement',
    initComponent: function () {
        var store = Ext.create('TianZun.store.uvas.UAVListStore');

        this.items = [
            {
                xtype: 'tabpanel',
                border: false,
                plain: true,
                bodyBorder: false,
                name: 'uavpanel',
                items: [
                    {
                        title: '视频列表',
                        layout: 'hbox',
                        border: false,
                        name: 'visitTab',
                        xtype: 'panel',
                        items: [
                            {
                                xtype: 'panel',
                                width: '20%',
                                height: '98%',
                                //overflowY:'auto',
                                margin: '20 5 20 20',
                                name: 'ACtreePanel',
                                listeners: {
                                    render: function (obj) {
                                        GetAjax({
                                            url: 'api/basicinfo/GetFolders',
                                            complete: function (jqXHR, textStatus, errorThrown) {
                                                if (textStatus == "success") {
                                                    var treeMenus = jQuery.parseJSON(jqXHR.responseText);
                                                    var treePanel = Ext.create('Ext.tree.Panel', {
                                                        border: false,
                                                        rootVisible: false,
                                                        name: 'treePanel',
                                                        collapsed: false,
                                                        root: {
                                                            children: treeMenus,
                                                        },
                                                        listeners: {
                                                            itemclick: function (itemObj, record, item, index) {
                                                                var store = this.up('panel[name=uavpanel]').down('grid').getStore();                                     
                                                                var filters = [];
                                                              
                                                                if (record.data.FullName != null) {
                                                                    var FullName = record.data.FullName;
                                                                   
                                                                    if ($.trim(FullName) != null && $.trim(FullName) != "") {
                                                                        filters.push({ property: "FullName", value: FullName });
                                                                    }
                                                                }

                                                                FilterStore(store, filters);
                                                                store.reload();
                                                            }
                                                        }
                                                    });
                                                    //treePanel.expandAll();
                                                    obj.add({
                                                        items: treePanel,
                                                        border: false,
                                                        overflowY: 'auto',
                                                    });
                                                }
                                            }
                                        })
                                    }
                                }
                            },
                            {
                                xtype: 'panel',
                                width: '2%',
                                height: '100%',
                                border: false,
                            },
                                {
                                    xtype: 'grid',
                                    columnLines: true,
                                    layout: 'fit',
                                    width: '76%',
                                    height: '100%',
                                    cellTip: true,
                                    stripeRows: true,
                                    name: 'right',
                                    margin: '20 0 0 0',
                                    columns: [
                                            { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                            { header: '上传时间', dataIndex: 'UploadTime', flex: 1 },
                                            { header: '附件信息', dataIndex: 'FileName', flex: 1 },
                                    ],
                                    store: store,
                                    tbar: [
                                        {
                                            text: '查看',
                                            handler: 'onLook',
                                            handleMouseEvents: false
                                        },
                                    ],
                                    bbar: {
                                        xtype: 'pagingtoolbar',
                                        displayInfo: true
                                    }
                                }
                        ]
                    }
                ]
            }
        ]

        this.callParent();
    }
});