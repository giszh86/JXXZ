Ext.define('TianZun.view.citizenservice.citizenevent.EventMonitorAdd', {
    extend: 'Ext.Window',
    alias: 'widget.eventMonitorAdd',
    modal: true,
    title: '监控列表',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        var treestore = Ext.create('TianZun.store.monitorproject.CamerasTreeStore');
        this.items = [{
            xtype: 'form',
            border: false,
            width: 800,
            height:500,
            autoScroll: true,
            items: [
                {
                    xtype: 'treepanel',
                    border: false,
                    rootVisible: false,
                    region: 'center',
                    border: false,
                    animate: true,
                    checkModel: "single",
                    store: treestore,
                    style: {
                        background: '#ccc',
                    },
                    listeners: {
                        render: function (obj) {
                            myMask = new Ext.LoadMask(obj.up('form'), {
                                msg: "数据加载中...",
                                removeMask: true// 完成后移除
                            });
                            myMask.show();
                        },
                        load: function (me, node, records, successful, eOpts) {
                            myMask.hide();
                        },
                        checkchange: function (node, checked, obj) {
                            var checkedNodes = this.getChecked();
                            for (var i = 0; i < checkedNodes.length; i++) {
                                var n = checkedNodes[i];
                                if (node.get("id") != n.get("id")) {
                                    n.set("checked", false);
                                }
                            }
                            if (node.get('leaf'))
                            {
                                me.down('button[name=submit]').isleaf = true;
                                me.down('button[name=submit]').monitoraddress = node.get('text');
                                me.down('button[name=submit]').monitorgeomery = node.get('x84') + ',' + node.get('y84');
                            } else
                                me.down('button[name=submit]').isleaf = false;
                        }
                    },
                },               
            ],
            buttons: [{
                text: '确定',
                name:'submit',
                isleaf:false,
                monitoraddress:'',
                monitorgeomery:'',
                handler: 'onAddMonitorOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});