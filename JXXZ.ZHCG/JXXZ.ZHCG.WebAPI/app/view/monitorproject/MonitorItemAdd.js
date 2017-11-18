Ext.define('TianZun.view.monitorproject.MonitorItemAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.monitorItemAdd',

    title: '添加监控专题元素',
    layout: 'fit',

    initComponent: function ()
    {
        var treestore = Ext.create('TianZun.store.monitorproject.CamerasTreeStore');
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 800,
            autoScroll: true,
            border: false,
            items: [
                {
                    xtype: 'fieldset',
                    collapsible: true,
                    title: '监控专题',
                    layout: 'border',
                    height: 600,
                    items: [
                        {
                            xtype: 'treepanel',
                            border: false,
                            rootVisible: false,
                            region: 'center',
                            border: false,
                            animate: true,
                            id: 'treeMenuId',
                            store: treestore,
                            style: {
                                background: '#ccc',
                            },
                            tbar: [
                                '->',
                                {
                                    text: '搜索条件',
                                    handler: 'onMonitorItemQuery',
                                    handleMouseEvents: false
                                }
                            ],
                            listeners: {
                                checkchange: function (node, checked, obj)
                                {
                                    node.cascadeBy(function (n) { n.set('checked', checked); });
                                    //checkParent(node);
                                    function checkParent(node)
                                    {
                                        node = node.parentNode;
                                        if (!node)
                                        {
                                            return;
                                        }
                                        var checkP = false;
                                        node.cascadeBy(function (n)
                                        {
                                            if (n != node)
                                            {
                                                if (n.get('checked') == true && n.get('leaf'))
                                                {
                                                    checkP = true;
                                                }
                                            }
                                        });
                                        node.set('checked', checkP);
                                        checkParent(node);
                                    }
                                }
                            },
                        },
                    ]
                },
            ],
            buttons: [{
                text: '提交',
                handler: 'onAddItemOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});