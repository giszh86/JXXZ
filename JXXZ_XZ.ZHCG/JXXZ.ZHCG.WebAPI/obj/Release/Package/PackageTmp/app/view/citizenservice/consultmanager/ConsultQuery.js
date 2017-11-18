Ext.define('TianZun.view.citizenservice.consultmanager.ConsultQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.consultQuery',

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
                //{
                //    fieldLabel: '咨询编号',
                //    name: 'consultid',
                //    xtype: 'textfield'
                //},
                {
                    fieldLabel: '事件标题',
                    name: 'title',
                    xtype: 'textfield'
                },
                {
                    fieldLabel: '事件大类',
                    xtype: 'combo',
                    name: 'bigtypeid',
                    store: Ext.create('TianZun.store.citizenservice.BigQuestion'),
                    valueField: 'ID',
                    displayField: 'Name',
                    editable: false
                },
                {
                    fieldLabel: '联系电话',
                    name: 'contact',
                    xtype: 'textfield'
                },
                {
                    fieldLabel: '咨询人',
                    name: 'consultuser',
                    xtype: 'textfield'
                },
                //{
                //    fieldLabel: '处理人',
                //    name: 'createusername',
                //    xtype: 'textfield'
                //},
                {
                    fieldLabel: '开始时间',
                    name: 'stime',
                    xtype: 'datefield'
                },
                {
                    fieldLabel: '结束时间',
                    name: 'etime',
                    xtype: 'datefield'
                },
            ],
            buttons: [{
                text: '确定',
                handler: 'onQueryOK'
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