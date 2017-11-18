Ext.define('TianZun.view.specialrectification.taskmanagement.TaskUserReportInfo', {
    extend: 'Ext.Window',
    alias: 'widget.taskUserReportInfo',
    modal:true,
    title: '信息过程上报详情',
    layout: 'fit',
    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 1000,
            overflowY: 'auto',
            fieldDefaults: {
                labelAlign: 'right',
            },
            items: [{
                xtype: 'fieldset',
                collapsible: true,
                title: '基础信息',
                layout: {
                    type: 'table',
                    columns: 1,
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 100
                },
                items: [{
                    fieldLabel: '所属中队',
                    xtype: 'displayfield',
                    name: 'code',
                    value: $.cookie('UNIT_NAME'),
                },
                {
                    fieldLabel: '行动说明',
                    xtype: 'textarea',
                    width: '100%',
                    name: 'dealcontent',
                    value: me.record.get('content')
                }]
            },
            {
                xtype: 'imageshowpanel',
                store: Ext.create('TianZun.store.lawenforcementsupervision.GetSpecialReportImages', {
                    proxy: { extraParams: { wfsuid: me.record.get('wfsuid') } }
                }),
                margin: '0 10 10 0',
                colspan: 3,
                width: '100%',
                path: configs.SpecialTaskPath,
            }],
            buttons: [
            {
                text: '返回',
                handler: 'onClose',
            }]
        }]
        this.callParent();
    }
})