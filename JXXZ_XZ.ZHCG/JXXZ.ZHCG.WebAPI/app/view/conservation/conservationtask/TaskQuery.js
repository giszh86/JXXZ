Ext.define('TianZun.view.conservation.conservationtask.TaskQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.taskQuery',
    title: '搜索条件',
    layout: 'fit',
    initComponent: function () {
        this.items = [{
            xtype: 'form',
            border: false,
            bordorPadding: 20,
            margin:'20 0 0 0',
            width: 530,
            overflowY: 'auto',
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
            //    {
            //    fieldLabel: '当前步骤',
            //    name: 'wfdname'
            //},
            {
                fieldLabel: '养护公司',
                xtype: 'combo',
                store: Ext.create('TianZun.store.conservation.DWSourceList'),
                valueField: 'ID',
                displayField: 'Name',
                editable:false,
                name: 'companyname'
            },
            {
                fieldLabel: '养护合同',
                xtype: 'combo',
                store: Ext.create('TianZun.store.conservation.HTSourceList'),
                displayField: 'Name',
                valueField: 'ID',
                name: "contractname",
                editable: false
            },
            {
                fieldLabel: '问题来源',
                xtype: 'combo',
                store: Ext.create('TianZun.store.sys.Dictionary', {
                    proxy: {
                        type: 'ajax',
                        method: "Get",
                        url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_yhrw_wtly',
                    }
                }),
                displayField: 'zd_name',
                valueField: 'zd_id',
                name: "wtlyname",
                editable: false
            },
            {
                fieldLabel: '问题地址',
                name: 'wtaddress'
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
                handler: 'onClose'
            }]
            }]
        this.callParent();
    }
})