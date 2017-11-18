Ext.define('TianZun.view.specialrectification.taskmanagement.TaskQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.taskQuery',
    title: '条件搜索',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 550,
            overflowY: 'auto',
            layout: {
                type: 'table',
                columns: 2,
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 100
            },
            defaults: {
                xtype: 'displayfield',
                width: 250
            },
            items: [{
                xtype: 'hidden',
                name: 'userid',
                value: $.cookie("USER_ID")
            },
            {
                fieldLabel: '任务标题',
                xtype: 'textfield',
                name: 'title',
            },
            {
                fieldLabel: '当前环节',
                xtype: 'combo',
                store: Ext.create('TianZun.store.citizenservice.EventFlowDetail', { proxy: { extraParams: { wfsid: '2017041214100001' } } }),
                valueField: 'id',
                displayField: 'name',
                editable:false,
                name: 'wfdid',
            },
            {
                fieldLabel: '任务类型',
                name: 'tasktype',
                xtype: 'combo',
                store: Ext.create('TianZun.store.citizenservice.PunishType'),
                valueField: 'ID',
                displayField: 'Name',
                margin: '0 0 10 0',
                editable: false,
            },
              {
                  fieldLabel: '紧急程度',
                  name: 'level',
                  xtype: 'combo',
                  store: Ext.create('TianZun.store.lawenforcementsupervision.LevelType'),
                  valueField: 'ID',
                  displayField: 'Name',
                  margin: '0 0 10 0',
                  editable: false,
              },
            {
                fieldLabel: '任务区域',
                xtype: 'textfield',
                name: 'region',
            },
            {
                fieldLabel: '发起人',
                xtype: 'textfield',
                name: 'fqr',
                margin: '0 0 10 0',
            },
            {
                fieldLabel: '开始时间',
                xtype: 'datefield',
                name: 'stime',
                margin: '0 0 10 0',
                format: 'Y-m-d',
                editable: false,
            },
            {
                fieldLabel: '结束时间',
                xtype: 'datefield',
                name: 'etime',
                margin: '0 0 10 0',
                format: 'Y-m-d',
                editable: false,
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
                handler:'onClose',
            }]
        }]
        this.callParent();
    }
})