Ext.define('TianZun.view.qwmanager.patrolarea.PatrolAreaDetail', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.patrolAreaDetail',
    title: '巡查区域详情',
    layout: 'fit',

    initComponent: function () {
        var me = this;

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 700,
            items: [
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '基础信息',

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
                            width: 312
                        },
                        items: [
                             {
                                 xtype: 'hidden',
                                 name: 'userid',
                                 value: $.cookie("USER_ID")
                             },
                            {
                                fieldLabel: '所属中队',
                                name: 'sszd',
                                margin: '20 0 10 0',
                                readOnly:true,
                                value:me.record.get('sszdname'),
                            },
                            {
                                fieldLabel: '所属班次',
                                name: 'ssbc',
                                margin: '20 0 10 0',
                                readOnly: true,
                                value: me.record.get('ssbcname'),
                            },
                            {
                                fieldLabel: '区域名称',
                                name: 'name',
                                margin: '10 0 10 0',
                                readOnly: true,
                                value: me.record.get('name'),
                            },
                            {
                                fieldLabel: '区域类型',
                                xtype: 'combo',
                                name: 'areatype',
                                margin: '10 0 10 0',
                                store: Ext.create('Ext.data.Store', {
                                    data: [
                                       { ID: '1', Name: '人员' },
                                       { ID: '2', Name: '车辆' },
                                    ]
                                }),
                                valueField: 'ID',
                                displayField: 'Name',
                                readOnly: true,
                                value: me.record.get('areatype'),
                                listeners: {
                                    render: function (obj) {
                                        obj.getStore().reload();
                                    },
                                }
                            },
                            {
                                fieldLabel: '区域说明',
                                name: 'explain',
                                xtype: 'textarea',
                                colspan: 2,
                                width: '97.5%',
                                margin: '10 0 10 0',
                                readOnly: true,
                                value: me.record.get('explain'),
                                allowBlank: false,
                            },
                            {
                                id: 'EVENT_COORDINATE_ID',
                                name: 'grometry',
                                fieldLabel: '巡查位置',
                                margin: '10 0 10 0',
                                colspan: 2,
                                width: '97.5%',
                                autoShow: true,
                                value: me.record.get('grometry'),
                                listeners: {
                                    render: function (p) {
                                        p.getEl().on('click', function (p) {
                                            CreateAarcgisMap('EVENT_COORDINATE_ID', '巡查区域', 0, 3, this.component.getValue());
                                        });
                                    },
                                }
                            },
                        ]
                    }
            ],
            buttons: [{
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();

    }
});