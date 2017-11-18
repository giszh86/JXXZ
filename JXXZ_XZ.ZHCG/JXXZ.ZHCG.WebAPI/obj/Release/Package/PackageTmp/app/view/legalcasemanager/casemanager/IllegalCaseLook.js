Ext.define('TianZun.view.legalcasemanager.casemanager.IllegalCaseLook', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.illegalCaseLook',
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
                            labelWidth: 82
                        },
                        defaults: {
                            xtype: 'displayfield',
                            width: 312
                        },
                        items: [
                            {
                                fieldLabel: '车牌号',
                                name: 'consultPerson',
                                xtype: 'displayfield',
                                margin: '20 0 10 0',
                                value: this.record.car_num
                            },
                            {
                                fieldLabel: '车辆类型',
                                name: 'phone',
                                xtype: 'displayfield',
                                margin: '20 0 10 0',
                                value: this.record.car_typename
                            },
                            {
                                fieldLabel: '处理状态',
                                name: 'eventTitle',
                                xtype: 'displayfield',
                                margin: '20 0 10 0',
                                value: ((this.record.processstatus == "0") ? "未处理" : (this.record.processstatus == "1") ? "生效" : "作废")

                            },
                            {
                                fieldLabel: '违停时间',
                                xtype: 'displayfield',
                                name: 'visitTime',
                                margin: '0 0 10 0',
                                value: this.record.wt_time
                            },
                            {
                                fieldLabel: '违法地点',
                                xtype: 'displayfield',
                                allowBlank: false,
                                value: this.record.wt_address
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: '违法行为',
                                name: 'categoryID',
                                value: this.record.wfxw
                            },


                          {
                              fieldLabel: '处罚决定书号',
                              name: '',
                              xtype: 'displayfield',
                              margin: '0 0 10 0',
                              value: this.record.cfjdsh
                          },
                            {
                                fieldLabel: '采集单位',
                                name: 'phone',
                                xtype: 'displayfield',
                                margin: '0 0 10 0',
                                value: this.record.cjdw
                            },
                            {
                                fieldLabel: '采集人',
                                name: 'eventTitle',
                                xtype: 'displayfield',
                                margin: '0 0 10 0',
                                value: this.record.cjrname
                            },


                             {
                                 fieldLabel: '当事人',
                                 name: '',
                                 xtype: 'displayfield',
                                 margin: '0 0 10 0',
                                 value: this.record.dsr
                             },
                            {
                                fieldLabel: '当事人电话',
                                name: 'phone',
                                xtype: 'displayfield',
                                margin: '0 0 10 0',
                                value: this.record.dsr_phone
                            },
                            {
                                fieldLabel: '当事人地址',
                                name: 'eventTitle',
                                xtype: 'displayfield',
                                margin: '0 0 10 0',
                                value: this.record.dsr_address
                            },


                              {
                                  fieldLabel: '校对人',
                                  name: '',
                                  xtype: 'displayfield',
                                  margin: '0 0 10 0',
                                  value: this.record.jdr
                              },
                            {
                                fieldLabel: '校对时间',
                                name: 'phone',
                                xtype: 'displayfield',
                                colspan: 2,
                                margin: '0 0 10 0',
                                value: this.record.jdsj
                            },

                               {
                                   fieldLabel: '审核人',
                                   name: '',
                                   xtype: 'displayfield',
                                   margin: '0 0 10 0',
                                   value: this.record.shrname
                               },
                            {
                                fieldLabel: '审核时间',
                                name: 'phone',
                                xtype: 'displayfield',
                                colspan: 2,
                                margin: '0 0 10 0',
                                value: this.record.shsj
                            },

                             {
                                 fieldLabel: '意见',
                                 name: 'consultPerson',
                                 xtype: 'displayfield',
                                 margin: '0 0 10 0',
                                 value: this.record.zfreason
                             },
                            {
                                fieldLabel: '数据状态',
                                name: 'phone',
                                xtype: 'displayfield',
                                margin: '0 0 10 0',
                                value: this.record.datastatus
                            },
                            {
                                fieldLabel: '处理单位',
                                name: 'eventTitle',
                                xtype: 'displayfield',
                                margin: '0 0 10 0',
                                value: this.record.cldw
                            },


                             {
                                 fieldLabel: '罚款金额',
                                 name: 'consultPerson',
                                 xtype: 'displayfield',
                                 margin: '0 0 10 0',
                                 value: this.record.fkje
                             },
                            {
                                fieldLabel: '发票号码',
                                name: 'phone',
                                xtype: 'displayfield',
                                margin: '0 0 10 0',
                                value: this.record.fphm
                            },
                            {
                                fieldLabel: '处理人',
                                name: 'eventTitle',
                                xtype: 'displayfield',
                                margin: '0 0 10 0',
                                value: this.record.processuser
                            },

                            {
                                fieldLabel: '处理时间',
                                name: 'consultPerson',
                                xtype: 'displayfield',
                                margin: '0 0 10 0',
                                value: this.record.processtime
                            },
                            {
                                fieldLabel: '解锁人',
                                name: 'phone',
                                xtype: 'displayfield',
                                margin: '0 0 10 0',
                                value: this.record.jsr
                            },
                            {
                                fieldLabel: '解锁时间',
                                name: 'eventTitle',
                                xtype: 'displayfield',
                                margin: '0 0 10 0',
                                value: this.record.jssj
                            },
                            {
                                xtype: 'imageshowpanel',
                                store: store,
                                titleNew: '附件',
                                path: configs.WTCarOriginalPath,
                                colspan: 3,
                                width: '100%',
                            },
                        ]
                    }
            ],
            buttons: [{
                text: '返回',
                handler: 'onClose'
            }]
        }];

        this.callParent();

    }
});