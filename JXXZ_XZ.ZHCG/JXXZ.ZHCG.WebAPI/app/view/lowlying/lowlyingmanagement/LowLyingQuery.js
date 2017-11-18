Ext.define('TianZun.view.lowlying.lowlyingmanagement.LowlyingQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.lowlyingQuery',

    title: '查询条件',
    layout: 'fit',

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
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
                width: 255,
                style: 'margin-bottom:15px'
            },
            items: [
                {
                    fieldLabel: '监测点名称',
                    name: 'title',
                    xtype: 'textfield'
                },
                {
                    fieldLabel: '地址',
                    xtype: 'combo',
                    name: 'bigtypeid',
                    store: Ext.create('TianZun.store.citizenservice.BigQuestion'),
                    valueField: 'ID',
                    displayField: 'Name',
                    editable: false
                },
                {
                    fieldLabel: '维护单位',
                    name: 'contact',
                    xtype: 'textfield'
                },
                {
                    fieldLabel: '维护人员',
                    name: 'consultuser',
                    xtype: 'textfield'
                },
                {
                    fieldLabel: '报警临界值',
                    name: 'stime',
                    xtype: 'textfield'
                },
                {
                    fieldLabel: '报警次数',
                    name: 'etime',
                    xtype: 'textfield'
                },
            ],
            buttons: [{
                text: '确定',
                handler: 'onAddOK'
            }, {
                text: '清空',
                handler: 'onEmpty'
            }, {
                text: '关闭',
                handler: 'onHide'
            }]
        }];

        this.callParent();
    }
});