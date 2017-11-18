Ext.define('TianZun.view.administrativeapproval.bags.BagsInfo', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.bagsInfo',
    title: '详情',
    layout: 'fit',
    requires: [
'TianZun.ux.ImageShowPanel',
    ],
    initComponent: function () {
        var store = Ext.create('TianZun.store.administrativeapproval.GetFileUpload', { proxy: { type: 'ajax', extraParams: { id: this.record.storeid, type: 1 } } });
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            autoScroll: true,
            bodyPadding: 10,
            width: 1000,
            items: [{
                xtype: 'fieldset',
                collapsible: true,
                title: '基础信息',
                margin: '10 0 0 0',
                layout: {
                    type: 'table',
                    columns: 3,
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 75,
                    margin: '0 0 10 0',
                },
                defaults: {
                    xtype: 'displayfield',
                    editable: false,
                    alowblank:false,
                    width: '100%',
                },
                items: [{
                    fieldLabel: '<span style="color:red">*</span>店家名称',
                    name: 'storename',
                    colspan: 2,
                    allowBlank: false,
                    value: this.record.storename,
                }, {
                    fieldLabel: '<span style="color:red">*</span>店家类型',
                    name: 'storetype',
                    allowBlank: false,
                    value: this.record.storetypename,
                }, {
                    fieldLabel: '<span style="color:red">*</span>负责人',
                    name: 'person',
                    allowBlank: false,
                    value: this.record.person,
                }, {
                    fieldLabel: '<span style="color:red">*</span>证件号',
                    name: 'card',
                    allowBlank: false,
                    value: this.record.card,
                }, {
                    fieldLabel: '<span style="color:red">*</span>联系电话',
                    name: 'contactphone',
                    allowBlank: false,
                    value: this.record.contactphone,
                }, {
                    fieldLabel: '<span style="color:red">*</span>地址',
                    name: 'address',
                    colspan: 3,
                    allowBlank: false,
                    value: this.record.address,
                }, {
                    id: 'EVENT_COORDINATE_ID',
                    name: 'geography',
                    xtype: 'textfield',
                    allowBlank: false,
                    fieldLabel: '地理位置',
                    width: '97%',
                    colspan: 3,
                    autoShow: true,
                    value:this.record.geography,
                    listeners: {
                        render: function (p) {
                            p.getEl().on('click', function (p) {
                                CreateAarcgisMap('EVENT_COORDINATE_ID', '事件坐标', 0, 1, this.component.getValue());
                            });
                        },
                    }
                }, {
                    fieldLabel: '备注:',
                    name: 'remark',
                    allowBlank: false,
                    xtype: 'displayfield',
                    colspan: 3,
                    height: 30,
                    labelWidth: 60,
                    margin: '20 0 10 10',
                    width: '99%',
                    value: this.record.remark,
                }, {
                    xtype: 'imageshowpanel',
                    store: store,
                    titleNew: '附件',
                    path: configs.ThreeBagsPath,
                    colspan: 3,
                    margin: '10 0 10 19 ',
                    width: 918,
                },]
            }], buttons: [{
                text: '返回',
                handler: 'onDetailOK'
            }]
        }]
        this.callParent();
    }
});