Ext.define('TianZun.view.legalcasemanager.casemanager.IllegalCaseQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.illegalCaseQuery',

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
                    fieldLabel: '车牌号码',
                    name: 'car_num'
                },
                {
                    fieldLabel: '违法地点',
                    name: 'wt_address'
                }, {
                    fieldLabel: '开始时间',
                    xtype: 'datefield',
                    name: 'stime'
                },
                {
                    fieldLabel: '结束时间',
                    xtype: 'datefield',
                    name: 'etime'
                },
                {
                    fieldLabel: '车辆类型',
                    xtype: 'combo',
                    editable: false,
                    colspan: 2,
                    width:510,
                    //allowBlank: false,
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: {
                            type: 'ajax',
                            method: "Get",
                            url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=case_type_car',
                        }
                    }),
                    name: 'car_type',
                    valueField: 'zd_id',
                    displayField: 'zd_name',

                },
                  {
                      fieldLabel: '处罚决定书号',
                      labelWidth:90,
                      name: 'cfjdsh',
                      colspan: 2,
                      width: 510,
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