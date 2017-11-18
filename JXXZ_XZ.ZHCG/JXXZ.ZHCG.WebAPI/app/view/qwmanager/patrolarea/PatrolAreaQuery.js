Ext.define('TianZun.view.qwmanager.patrolarea.PatrolAreaQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.patrolAreaQuery',

    title: '查询条件',
    layout: 'fit',

    initComponent: function () {
        var me = this;

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width:550,
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
                     fieldLabel: '所属中队',
                     name: 'sszd',
                     margin: '20 0 10 0',
                     xtype: 'combo',
                     store: Ext.create('TianZun.store.sys.UnitSquadron', {
                         proxy: { extraParams: { unittypeid: 2 } }
                     }),
                     valueField: 'ID',
                     displayField: 'Name',
                     editable: false,
                     readOnly: configs.TOWNID == null ? false : true,
                     listeners: {
                         render: function (obj) {
                             if (configs.TOWNID != null)
                                 obj.setValue(configs.TOWNID);
                         },
                         'change': function () {
                             var cyCombo = me.down('combo[name=ssbc]');
                             cyCombo.clearValue();
                             cyStore = Ext.create('TianZun.store.sys.UnitGroup');
                             cyStore.getProxy().url = 'api/Unit/GetUnitsChild?parentid=' + this.getValue();
                             cyCombo.bindStore(cyStore, false);
                             cyStore.load();
                         }
                     }
                 },
                {
                    fieldLabel: '所属班次',
                    xtype: 'combo',
                    name: 'ssbc',
                    margin: '20 0 10 0',
                    valueField: 'ID',
                    displayField: 'Name',
                    editable: false,
                },
                {
                    fieldLabel: '区域名称',
                    name: 'name',
                    xtype: 'textfield'
                },
               {
                   fieldLabel: '区域类型',
                   xtype: 'combo',
                   name: 'areatype',
                   margin: '0 0 10 0',
                   store: Ext.create('Ext.data.Store', {
                       data: [
                          { ID: 1, Name: '人员' },
                          { ID: 2, Name: '车辆' },
                       ]
                   }),
                   valueField: 'ID',
                   displayField: 'Name',
                   editable: false,
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