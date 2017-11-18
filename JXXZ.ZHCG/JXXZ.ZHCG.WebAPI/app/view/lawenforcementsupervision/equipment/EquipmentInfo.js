Ext.define('TianZun.view.lawenforcementsupervision.equipment.EquipmentInfo', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.equipmentInfo',
    title: '设备详情',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        var store1 = Ext.create('TianZun.store.lawenforcementsupervision.EquipmentInStore', {
            proxy: {
                extraParams: {
                    deviceid: this.record.deviceid
                }
            }
        });
        var store2 = Ext.create('TianZun.store.lawenforcementsupervision.EquipmentOut', {
            proxy: {
                extraParams: {
                    deviceid: this.record.deviceid
                }
            }
        });
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width: 1000,
            overflowY: 'auto',
            items: [{
                xtype: 'fieldset',
                collapsible: true,
                title: '基础信息',
                layout: {
                    type: 'table',
                    columns: 3
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelwidth: 100
                },
                defaults: {
                    xtype: 'textfield',
                    width: 280
                },
                items: [{
                    xtype: 'hidden',
                    name: 'createuserid',
                    vaalue: $.cookie("USER_ID")
                },
                {
                    xtype: 'hidden',
                    name: 'deviceid',
                    value: this.record.deviceid
                },
                {
                    fieldLabel: '<span style="color:red">*</span>设备名称',
                    xtype: 'displayfield',
                    value: this.record.devicename,
                },
                {
                    fieldLabel: '品牌',
                    xtype: 'displayfield',
                    value:this.record.brand,
                },
                {
                    fieldLabel: '型号',
                    xtype: 'displayfield',
                    value: this.record.model,
                },
                {
                    fieldLabel: '计量单位',
                    xtype: 'displayfield',
                    value: this.record.jldw
                },
                {
                    fieldLabel: '装备类别',
                    xtype: 'displayfield',
                    value: this.record.devicetypename
                },
                {
                    fieldLabel: '装备总数',
                    xtype: 'displayfield',
                    value: this.record.devicesum
                },
                {
                    fieldLabel: '库存总数',
                    xtype: 'displayfield',
                    colspan: 3,
                    value: this.record.stocknum
                },
                {
                    fieldLabel: '备注',
                    xtype: 'displayfield',
                    colspan: 3,
                    value: this.record.remark
                }]
            },
            {
                layout: 'fit',
                xtype: 'form',
                bordor: false,
                bodyPadding: 10,
                title: '设备入库',
                margin:'10 0 10 0',
                overflowY: 'auto',
                items: [{
                    xtype:'grid',
                    columnLines:true,
                    columns:[
                    { header: '设备名称', dataIndex: 'devicename', flex: 1 },
                    { header: '入库类型', dataIndex: 'storagetypename', flex: 1 },
                    { header: '入库设备数量', dataIndex: 'number', flex: 1 },
                    { header: '入库设备单价', dataIndex: 'price', flex: 1 },
                    { header: '处理人', dataIndex: 'processuserid', flex: 1 },
                    { header: '审核人', dataIndex: 'shuserid', flex: 1 },
                    { header: '入库时间', dataIndex: 'createtime', flex: 1 },
                    { header: '备注', dataIndex: 'remark', flex: 1 },
                    ],
                    store: store1,
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    },
                }],
               
            },
            {
                layout: 'fit',
                xtype: 'form',
                bordor: false,
                bodyPadding: 10,
                title: '设备出库',
                overflowY: 'auto',
                items: [{
                    xtype: 'grid',
                    columnLines: true,
                    columns: [
                    { header: '设备名称', dataIndex: 'devicename', flex: 1 },
                    { header: '出库类型', dataIndex: 'outtypename', flex: 1 },
                    { header: '出库设备数量', dataIndex: 'number', flex: 1 },
                    { header: '出库设备单价', dataIndex: 'price', flex: 1 },
                    { header: '处理人', dataIndex: 'process', flex: 1 },
                    { header: '审核人', dataIndex: 'shuser', flex: 1 },
                    { header: '出库时间', dataIndex: 'createtime', flex: 1 },
                    { header: '备注', dataIndex: 'remark', flex: 1 },
                    ],
                    store: store2,
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    },
                }],
            }],
            buttons: [
               {
                   text: '取消',
                   handler: 'onclose',
               }]

        }]
        this.callParent();

    }
})