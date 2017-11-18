Ext.define('TianZun.view.lawenforcementsupervision.basicinformation.CarInfo', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.carInfo',
    title: '车辆详情',
    layout: 'fit',

    initComponent: function () {
        var me = this;

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 1000,
            overflowY: 'auto',
            items: [
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '基础信息',
                        name: 'visitwin',
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
                            width: 312
                        },
                        items: [

                            {
                                fieldLabel: '车辆编号',
                                name: 'code',
                                xtype: 'displayfield',
                                margin: '20 0 10 0',
                                value: this.record.code,
                            },
                           {
                               fieldLabel: '所属部门',
                               name: 'unitid',
                               xtype: 'displayfield',
                               margin: '20 0 10 0',
                               value: this.record.unitname
                           },
                            {
                                fieldLabel: '所属班次',
                                name: 'ssbc',
                                xtype: 'displayfield',
                                margin: '20 0 10 0',
                                value: this.record.ssbcname

                            },
                             {
                                 fieldLabel: '车牌号',
                                 name: 'carnumber',
                                 xtype: 'displayfield',
                                 margin: '0 0 10 0',
                                 value: this.record.carnumber

                             },
                           {
                               fieldLabel: '车辆类型',
                               name: 'carnumber',
                               xtype: 'displayfield',
                               margin: '0 0 10 0',
                               value: this.record.cartypename

                           },
                            {
                                fieldLabel: '终端号码',
                                name: 'carnumber',
                                xtype: 'displayfield',
                                margin: '0 0 10 0',
                                value: this.record.cartel

                            },
                              {
                                  fieldLabel: '车辆状态',
                                  name: 'carnumber',
                                  xtype: 'displayfield',
                                  margin: '0 0 10 0',
                                  value: (this.record.carstatus == 1) ? "报废" : '在用'

                              },
                        ]
                    }
            ],
            buttons: [
            //    {
            //    text: '提交',
            //    handler: 'onAddVisitOK'
            //},
            {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});