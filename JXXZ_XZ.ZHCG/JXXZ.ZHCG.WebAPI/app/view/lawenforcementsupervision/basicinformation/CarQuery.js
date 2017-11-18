Ext.define('TianZun.view.lawenforcementsupervision.basicinformation.CarQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.carQuery',

    title: '查询条件',
    layout: 'fit',

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            layout: {
                type: 'table',
                columns: 3,
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
                    fieldLabel: '车辆编号',
                    name: 'code'
                },
                {
                    fieldLabel: '车牌号',
                    name: 'carnumber'
                },
                {
                    fieldLabel: '车辆类型',
                    xtype: 'combo',
                    editable: false,
                    //allowBlank: false,
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: {
                            type: 'ajax',
                            method: "Get",
                            url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_car',
                        }
                    }),
                    name: 'cartypeid',
                    valueField: 'zd_id',
                    displayField: 'zd_name',

                },
                  {
                      fieldLabel: '所属中队',
                      name: 'unitid',
                      margin: '0 0 10 0',
                      xtype: 'combo',
                      store: Ext.create('TianZun.store.sys.UnitSquadron', {
                          proxy: { extraParams: { unittypeid: 2 } }
                      }),
                      valueField: 'ID',
                      displayField: 'Name',
                      editable: false,
                      readOnly: configs.TOWNID == null ? false : true,
                      //allowBlank: false,
                      listeners: {
                          render: function (obj) {
                              if (configs.TOWNID != null)
                                  obj.setValue(configs.TOWNID);
                          },
                          'change': function () {
                              var cyCombo = Ext.getCmp('ssbc');
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
                                id: 'ssbc',
                                name: 'ssbc',
                                margin: '0 0 10 0',
                                valueField: 'ID',
                                displayField: 'Name',
                                editable: false,
                                //allowBlank: false,
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