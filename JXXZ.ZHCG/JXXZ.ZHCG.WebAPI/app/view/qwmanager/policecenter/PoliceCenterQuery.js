Ext.define('TianZun.view.qwmanager.policecenter.PoliceCenterQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.policeCenterQuery',
    title: '条件查询',
    layout: 'fit',
    initComponent: function () {
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 625,
            overflowY: 'auto',
            items: [{
                xtype: 'fieldset',
                collapsible: true,
                layout: {
                    type: 'table',
                    columns: 2,
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 75
                },
                defaults: {
                    xtype: 'textfield',
                    width: 280
                },
                items: [
                    {
                        fieldLabel: '所属科室(中队)',
                        xtype: 'combo',
                        colspan: 2,
                        labelWidth: 105,
                        width:'98%',
                        name: 'unitid',
                        store: Ext.create('TianZun.store.sys.UnitSquadron', {
                            proxy: {
                                type: 'ajax',
                                method: "Get",
                                url: configs.WebApi + 'api/Unit/GetUnitsSquadron?unittypeid=2',
                            }
                        }),
                        valueField: 'ID',
                        displayField: 'Name',
                        editable: false,
                        readOnly: configs.TOWNID == null ? false : true,
                        allowBlank: false,
                        listeners: {
                            render: function (obj) {
                                if (configs.TOWNID != null)
                                    obj.setValue(configs.TOWNID);
                            },
                        }
                    },
                    {
                        fieldLabel: '队员名称',
                        name:'username',
                    },
                    {
                        fieldLabel: '报警类型',
                        name: 'bjlx',
                        xtype: 'combo',
                        store: Ext.create('TianZun.store.alarmdetail.bjlxStore'),
                        valueField: 'ID',
                        displayField: 'Name',
                   
                        editable:false
                    },
                    {
                        fieldLabel: '报警状态',
                        name: 'bjzt',
                        xtype: 'combo',
                        store: Ext.create('TianZun.store.alarmdetail.bjztStore'),
                        valueField: 'ID',
                        displayField: 'Name',
                        editable: false
                    },
                    {

                        fieldLabel: '申诉状态',
                        name: 'sszt',
                        xtype: 'combo',
                        store: Ext.create('TianZun.store.alarmdetail.ssztStire'),
                        valueField: 'ID',
                        displayField: 'Name',
                        editable: false
                    }
                ]
            }],
            buttons: [{
                text: '确定',
                handler: 'onQueryOK'
            }, {
                text: '清空',
                handler: 'onEmpty'
            }, {
                text: '关闭',
                handler: 'onclose'
            }]
        }]
        this.callParent();
    }
})