Ext.define('TianZun.view.qwmanager.teamduty.TeamDutyEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.teamDutyEdit',
    title: '修改队员排班',
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
                                name: 'usertaskid',
                                value: me.record.usertaskid
                            },
                             {
                                 xtype: 'hidden',
                                 name: 'userid',
                                 value: me.record.userid
                             },
                             {
                                 xtype: 'hidden',
                                 name: 'weeks',
                                 value: me.record.weeks,
                             },
                             {
                                 xtype: 'tagfield',
                                 fieldLabel: '<span style="color:red">*</span>选择队员',
                                 store: Ext.create('TianZun.store.sys.UserStore', {
                                     proxy: { extraParams: { UnitID: me.record.unitid } }
                                 }),
                                 displayField: 'DisplayName',
                                 editable: false,
                                 valueField: 'ID',
                                 name: "fuserid",
                                 margin: '20 0 10 0',
                                 readOnly:true,
                                 value: me.record.userid,
                                 allowBlank: false,
                                 colspan: 4,
                                 width: 920,
                                 height: 50,
                                 listeners: {
                                     render: function (obj) {
                                         this.getStore().load();
                                     }
                                 },
                             },
                             {
                                 xtype: 'textfield',
                                 fieldLabel: '<span style="color:red">*</span>开始日期',
                                 name: 'taskstarttime1',
                                 allowBlank: false,
                                 editable: false,
                                 value: Ext.Date.format(new Date(me.record.taskstarttime), "Y-m-d"),
                             },
                             {
                                 xtype: 'textfield',
                                 fieldLabel: '<span style="color:red">*</span>结束日期',
                                 name: 'taskendtime1',
                                 allowBlank: false,
                                 editable: false,
                                 value: Ext.Date.format(new Date(me.record.taskendtime), "Y-m-d"),
                             },
                               {
                                   xtype: 'textfield',
                                   fieldLabel: '<span style="color:red">*</span>开始时间',
                                   name: 'taskstarttime2',
                                   allowBlank: false,
                                   editable: false,
                                   value: Ext.Date.format(new Date(me.record.taskstarttime), "H:i"),
                               },
                             {
                                 xtype: 'textfield',
                                 fieldLabel: '<span style="color:red">*</span>结束时间',
                                 name: 'taskendtime2',
                                 allowBlank: false,
                                 editable: false,
                                 value: Ext.Date.format(new Date(me.record.taskendtime), "H:i"),
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
                                 readOnly: true,
                                 editable:false,
                                 value: me.record.weeks,
                                 name: "fweeks",
                                 margin: '20 0 10 0',
                                 allowBlank: false,
                                 colspan: 4,
                                 width: 920,
                                 listeners: {
                                     render: function (obj) {
                                         this.getStore().load();
                                     }
                                 },
                             },
                            {
                                fieldLabel: '<span style="color:red">*</span>签到区域',
                                xtype: 'combo',
                                name: 'signinareaid',
                                colspan: 4,
                                width:400,
                                margin: '20 0 10 0',
                                store: Ext.create('TianZun.store.qwmanager.SignAreaListByUnit', {
                                    proxy: { extraParams: { sszd: me.record.sszd, ssbc: me.ssbc == null ? 0 : me.ssbc } }
                                }),
                                valueField: 'signinareaid',
                                displayField: 'name',
                                editable: false,
                                allowBlank: false,
                                value: me.record.signinareaid,
                                listeners: {
                                    render: function (obj) {                                        
                                        this.getStore().load();
                                    },
                                    change: function (obj) {
                                        var placedetail = obj.up().down('textfield[name=signplace]');
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
                                    html: '<span style="color:red">*</span>签到位置:',
                                    margin: '5 8 10 10'
                                },
                                {
                                    id: 'SIGNAREA_ID',
                                    name: 'signplace',
                                    xtype: 'textfield',
                                    allowBlank: false,
                                    editable: false,
                                    width: 840,
                                    autoShow: true,
                                    value: me.record.signingrometry,
                                    listeners: {
                                        render: function (p) {
                                            p.getEl().on('click', function (p) {
                                                CreateAarcgisMap('SIGNAREA_ID', '签到区域', 0, 3, this.component.getValue());
                                            });
                                        },
                                    }
                                }]
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>巡查区域',
                                xtype: 'combo',
                                name: 'patrolid',
                                colspan: 4,
                                width: 400,
                                margin: '20 0 10 0',
                                store: Ext.create('TianZun.store.qwmanager.PatrolAreaListByUnit', {
                                    proxy: { extraParams: { sszd: me.record.sszd, ssbc: me.ssbc == null ? 0 : me.ssbc } }
                                }),
                                valueField: 'patrolid',
                                displayField: 'name',
                                editable: false,
                                allowBlank: false,
                                value: me.record.patrolid,
                                listeners: {
                                    render: function (obj) {
                                        this.getStore().load();
                                    },
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
                                    name: 'patrolplace',
                                    xtype: 'textfield',
                                    allowBlank: false,
                                    editable: false,
                                    width: 840,
                                    autoShow: true,
                                    value: me.record.patrolgrometry,
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
                                value: me.record.taskexplain,
                            },
                        ]
                    }
            ],
            buttons: [{
                text: '修改',
                handler: 'onEditOK'
            }, {
                text: '删除',
                handler: 'onDeleteOK'
            },{
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();

    }
});