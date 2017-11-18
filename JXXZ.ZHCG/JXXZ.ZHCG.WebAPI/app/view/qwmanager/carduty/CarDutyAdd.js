Ext.define('TianZun.view.qwmanager.carduty.CarDutyAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.carDutyAdd',
    title: '添加车辆排班',
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

                        layout: {
                            type: 'table',
                            columns: 4,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 75
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 220
                        },
                        items: [
                             {
                                 xtype: 'hidden',
                                 name: 'userid',
                                 value: $.cookie("USER_ID")
                             },
                             {
                                 xtype: 'hidden',
                                 name: 'carnum',
                                 value: this.carnum,
                             },
                             {
                                 xtype: 'tagfield',
                                 fieldLabel: '<span style="color:red">*</span>选择车辆',
                                 store: Ext.create('TianZun.store.qwmanager.CarStore', {
                                     proxy: { extraParams: { UnitID: me.unitid } }
                                 }),
                                 displayField: 'carnumber',
                                 valueField: 'carid',
                                 name: "carids",
                                 margin: '10 0 10 0',
                                 allowBlank: false,
                                 editable: false,
                                 colspan: 4,
                                 width: 920,
                                 height: 50,
                             },
                           {
                                 xtype: 'datefield',
                                 fieldLabel: '<span style="color:red">*</span>开始日期',
                                 name: 'taskstarttime1',
                                 allowBlank: false,
                                 editable: false,
                                 format: 'Y-m-d'
                             },
                             {
                                 xtype: 'datefield',
                                 fieldLabel: '<span style="color:red">*</span>结束日期',
                                 name: 'taskendtime1',
                                 allowBlank: false,
                                 editable: false,
                                 format: 'Y-m-d'
                             },
                              {
                                  xtype: 'timefield',
                                  fieldLabel: '<span style="color:red">*</span>开始时间',
                                  name: 'taskstarttime2',
                                  allowBlank: false,
                                  editable: false,
                                  format: 'H:i'
                              },
                             {
                                 xtype: 'timefield',
                                 fieldLabel: '<span style="color:red">*</span>结束时间',
                                 name: 'taskendtime2',
                                 allowBlank: false,
                                 editable: false,
                                 format: 'H:i'
                             },
                             {
                                 xtype: 'tagfield',
                                 fieldLabel: '<span style="color:red">*</span>选择星期',
                                 store: Ext.create('Ext.data.Store', {
                                     data: [
                                         { ID: 1, Name: '星期一' },
                                         { ID: 2, Name: '星期二' },
                                         { ID: 3, Name: '星期三' },
                                         { ID: 4, Name: '星期四' },
                                         { ID: 5, Name: '星期五' },
                                         { ID: 6, Name: '星期六' },
                                         { ID: 0, Name: '星期日' },
                                     ]
                                 }),
                                 displayField: 'Name',
                                 valueField: 'ID',
                                 name: "weeks",
                                 margin: '0 0 10 0',
                                 allowBlank: false,
                                 colspan: 4,
                                 width: 920,
                             },
                            {
                                fieldLabel: '<span style="color:red">*</span>巡查区域',
                                xtype: 'combo',
                                name: 'patrolid',
                                colspan:4,
                                margin: '0 0 10 0',
                                store: Ext.create('TianZun.store.qwmanager.PatrolAreaListByUnit', {
                                    proxy: { extraParams: { sszd: me.sszd, ssbc: me.ssbc == null ? 0 : me.ssbc } }
                                }),
                                valueField: 'patrolid',
                                displayField: 'name',
                                width: 400,
                                editable: false,
                                allowBlank: false,
                                listeners: {
                                    change: function (obj) {
                                        var placedetail = obj.up().down('textfield[name=patrolplace]');
                                        placedetail.setValue(obj.findRecordByValue(obj.getValue()).get('grometry'));
                                    },
                                },
                            },
                            {
                                xtype: 'panel',
                                border: false,
                                bodyBorder: false,
                                colspan: 4,
                                width: '100%',
                                margin: '10 0 0 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'left'
                                },
                                items: [{
                                    xtype: 'label',
                                    html: '<span style="color:red">*</span>巡查位置:',
                                    margin: '5 8 10 10'
                                },
                                {
                                    id: 'PATROLAREA_ID',
                                    xtype: 'textfield',
                                    name: 'patrolplace',
                                    allowBlank: false,
                                    width: 840,
                                    autoShow: true,
                                    listeners: {
                                        render: function (p) {
                                            p.getEl().on('click', function (p) {
                                                CreateAarcgisMap('PATROLAREA_ID', '巡查区域', 0, 3, this.component.getValue());
                                            });
                                        },
                                    }
                                }]
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>任务内容',
                                name: 'taskexplain',
                                xtype: 'textarea',
                                colspan: 4,
                                margin: '10 0 10 0',
                                height: 80,
                                width: 920,
                                allowBlank: false,
                            },
                        ]
                    }
            ],
            buttons: [{
                text: '提交',
                handler: 'onAddOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();

    }
});