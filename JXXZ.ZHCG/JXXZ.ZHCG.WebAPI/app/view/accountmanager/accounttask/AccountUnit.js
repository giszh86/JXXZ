Ext.define('TianZun.view.accountmanager.accounttask.AccountUnit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.accountUnit',
    title: '台帐生成',
    layout: 'fit',
    initComponent: function () {
        var me = this;
        var record = this.record;
        var storeZD = eval("(" + this.storeZD + ")");
        // var storeType = Ext.create('Ext.data.Store', { data: eval("(" + this.storeType + ")") });
        var store;

        //if (record) {
        store = Ext.create('Ext.data.Store', { data: eval("(" + record + ")") });
        //}
        //else { store = Ext.create('TianZun.store.accountmanager.accounttask.AccountUnit'); }

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
                viewConfig: {
                    stripeRows: false,   //每行换颜色
                    //forceFit: true,
                    //enableTextSelection: true,
                    //scrollOffset: 0,
                },
                //columns: [
                //        { header: '', dataIndex: 'zd_name', width: 175 },
                //        {
                //            header: '机动中队', dataIndex: 'jdzd', align: 'center', flex: 1,
                //            renderer: 'SetCellImage'
                //        },
                //        {
                //            header: '新城中队', dataIndex: 'xczd', align: 'center', flex: 1,
                //            renderer: 'SetCellImage'
                //        },
                //        {
                //            header: '高照中队', dataIndex: 'gzzd', align: 'center', flex: 1,
                //            renderer: 'SetCellImage'
                //        },
                //        {
                //            header: '王店中队', dataIndex: 'wdzd', align: 'center', flex: 1,
                //            renderer: 'SetCellImage'
                //        },
                //        {
                //            header: '洪合中队', dataIndex: 'hhzd', align: 'center', flex: 1,
                //            renderer: 'SetCellImage'
                //        },
                //        {
                //            header: '新塍中队', dataIndex: 'xczdT', align: 'center', flex: 1,
                //            renderer: 'SetCellImage'
                //        },
                //        {
                //            header: '王江泾中队', dataIndex: 'wjjzd', align: 'center', flex: 1,
                //            renderer: 'SetCellImage'
                //        },
                //        {
                //            header: '油车港中队', dataIndex: 'ycgzd', align: 'center', flex: 1,
                //            renderer: 'SetCellImage'
                //        },
                //],
                store: store,
                listeners: {
                    'cellclick': function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                        if (cellIndex == 0) {
                            return
                        }
                        var columnName = this.getColumns()[cellIndex].dataIndex;
                        var value = record.get(columnName);
                        if (value == 1) {
                            record.set(columnName, 0);//<span>record.set(名称,值)</span>  
                            record.commit();//提交一下  
                        }
                        else {
                            record.set(columnName, 1);//<span>record.set(名称,值)</span>  
                            record.commit();//提交一下
                        }
                    }
                }
            }],
            buttons: [
                 {
                     xtype: 'box',
                     style: 'margin-left:20px',
                     html: '备注:可勾选对应的中队和台帐任务,管理中队台帐文件夹'
                 },
                ,
               '->', {
                   text: '确定',
                   handler: 'onUnitAddOK'
               }, {
                   text: '返回',
                   handler: 'onClose'
               }]
        }]
        this.callParent();
    }
})