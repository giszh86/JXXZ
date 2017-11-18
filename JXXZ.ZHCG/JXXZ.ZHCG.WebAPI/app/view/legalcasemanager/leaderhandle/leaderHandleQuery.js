Ext.define('TianZun.view.legalcasemanager.leaderhandle.LeaderHandleQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.leaderHandleQuery',
    title: '搜索条件',
    layout: 'fit',

    initComponent: function () {
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width:540,
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
            },
            items: [{
                fieldLabel: '案件编号',
                name: 'casebh',
                xtype: 'textfield',
            },
            {
                fieldLabel: '处理人',
                name: 'dealname',
                xtype: 'textfield',
            },            
            {
                fieldLabel: '案件来源',
                xtype: 'combo',
                name: 'sourceid',
                store: Ext.create('TianZun.store.legalcasemanager.CaseSource'),
                valueField: 'id',
                displayField: 'name',
                editable: false,
                allowBlank: false,
            },
            {
                fieldLabel: '案件类型',
                xtype: 'combo',
                name: 'casetypeid',
                store: Ext.create('TianZun.store.sys.Dictionary', {
                    proxy: { extraParams: { zd_type: 'type_case' } }
                }),
                valueField: 'zd_id',
                displayField: 'zd_name',
                editable: false,
            },
            {
                fieldLabel: '案由',
                name: 'casereason',
                colspan: 2,
                width: '99%',
                xtype: 'textfield',
            },
            {
                fieldLabel: '当前环节',
                name: 'wfdid',
                colspan: 2,
                width: '99%',
                xtype: 'combo',
                store: Ext.create('TianZun.store.legalcasemanager.CaseFlow'),
                valueField: 'id',
                displayFiled: 'name',
                editable: false,
            },
            {
                fieldLabel: '开始时间',
                name: 'stime',
                xtype: 'datefield',
                editable:false
            },
            {
                fieldLabel: '结束时间',
                name: 'etime',
                xtype: 'datefield',
                editable: false
            },
            ],
            buttons: [{
                text: '提交',
                handler: 'onQueryOK',
            },
            {
                text: '清空',
                handler:'onEmpty',
            },
            {
                text: '取消',
                handler:'onclose',
            }]
        }]
        this.callParent();
    }
})