Ext.define('TianZun.view.legalcasemanager.casemanager.IllegalCaseReview', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.illegalCaseReview',
    title: '违停案件详情',
    layout: 'fit',
    requires: [
        'TianZun.ux.ImageShowPanel',
    ],

    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.legalcasemanager.GetFileUpload', { proxy: { type: 'ajax', extraParams: { wtid: this.record.wtid } } });
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 1000,
            overflowY:'auto',
            items: [
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '基础信息',

                        layout: {
                            type: 'table',
                            columns: 3,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 75
                        },
                        defaults: {
                            xtype: 'displayfield',
                            width: 312
                        },
                        items: [
                             {
                                 xtype: 'hidden',
                                 name: 'shr',
                                 value: $.cookie('USER_ID'),
                             },
                            {
                                xtype: 'hidden',
                                name: 'wtid',
                                value: this.record.wtid
                            },
                            {
                                fieldLabel: '车牌号',
                                name: 'car_num',
                                xtype: 'displayfield',
                                margin: '20 0 10 0',
                                value: this.record.car_num
                            },
                            {
                                fieldLabel: '车辆类型',
                                name: 'car_typename',
                                xtype: 'displayfield',
                                margin: '20 0 10 0',
                                value: this.record.car_typename
                            },
                            {
                                fieldLabel: '处理状态',
                                name: 'processstatus',
                                xtype: 'displayfield',
                                margin: '20 0 10 0',
                                value: ((this.record.processstatus == "0") ? "未处理" : (this.record.processstatus == "1") ? "生效" : "作废")
                            },

                            {
                                fieldLabel: '违停时间',
                                xtype: 'displayfield',
                                name: 'wt_time',
                                margin: '0 0 10 0',
                                value: this.record.wt_time
                            },
                            {
                                fieldLabel: '违法地点',
                                xtype: 'displayfield',
                                colspan: 2,
                                margin: '0 0 10 0',
                                allowBlank: false,
                                value: this.record.wt_address
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: '违法行为',
                                colspan: 3,
                                margin: '0 0 10 0',
                                name: 'categoryID',
                                value: this.record.wfxw
                            },
                           {
                               fieldLabel: '采集单位',
                               name: 'consultPerson',
                               xtype: 'displayfield',
                               margin: '0 0 10 0',
                               value: this.record.cjdw
                           },
                            {
                                fieldLabel: '采集人',
                                name: 'phone',
                                xtype: 'displayfield',
                                margin: '0 0 10 0',
                                colspan: 2,
                                value: this.record.cjr
                            },
                              {
                                  xtype: 'imageshowpanel',
                                  store: store,
                                  titleNew: '附件',
                                  path: configs.WTCarOriginalPath,
                                  colspan: 3,
                                  width: '95%',
                              },
                                {
                                    fieldLabel: '审核结果',
                                    name: 'leadercheck',
                                    xtype: 'radiogroup',
                                    margin: '10 0 10 0',
                                    colspan: 3,
                                    hidden: false,
                                    hideLabels: false,
                                    defaults: {
                                        flex: 1
                                    },
                                    layout: 'hbox',
                                    items: [
                                        {
                                            boxLabel: '生效',
                                            name: 'processstatus',
                                            inputValue: '1',
                                            checked: true,
                                        },
                                        {
                                            boxLabel: '作废',
                                            name: 'processstatus',
                                            inputValue: '2'
                                        }
                                    ]
                                },
                                 {
                                     fieldLabel: '意见',
                                     name: 'zfreason',
                                     hidden: false,
                                     xtype: 'textarea',
                                     colspan: 3,
                                     height: 30,
                                     width: '96%',
                                 },
                        ]
                    }
            ],
            buttons: [{
                text: '确定',
                name: 'btnsubmit',
                handler: 'onAddOK'
            }, {
                text: '返回',
                handler: 'onClose'
            }]
        }];

        this.callParent();

    }
});