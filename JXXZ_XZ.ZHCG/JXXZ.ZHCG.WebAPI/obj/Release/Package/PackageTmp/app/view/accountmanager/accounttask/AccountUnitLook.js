Ext.define('TianZun.view.accountmanager.accounttask.AccountUnitLook', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.accountUnitLook',
    title: '台帐生成',
    layout: 'fit',
    initComponent: function () {
        var me = this;
        var record = this.record;
        var storeZD = eval("(" + this.storeZD + ")");
        var store;
        store = Ext.create('Ext.data.Store', { data: eval("(" + record + ")") });

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 950,
            layout: {
                type: 'fit',
            },
            items: [{
                xtype: 'grid',
                multiSelect: true,
                columnLines: true,
                name: 'gridtop',
                columns: storeZD,
                store: store,
                viewConfig: {
                    stripeRows: false,   //每行换颜色
                    //forceFit: true,
                    //enableTextSelection: true,
                    //scrollOffset: 0,
                },
            }],
            buttons: [
               '->', {
                   text: '返回',
                   handler: 'onClose'
               }]
        }]
        this.callParent();
    }
})