Ext.define('TianZun.view.qwmanager.carduty.CarDutyList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.carDutyList',
    title: '人员勤务管理 > 排班计划管理 > 车辆任务管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.qwmanager.CarDuty',
    ],
    controller: 'carDuty',

    name: 'carDutyList',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        this.items = [{
            xtype: 'tabpanel',
            border: false,
            plain: true,
            bodyBorder: false,
            items: [
            {
                layout: 'fit',
                border: false,
                title: '日常排班',
                width: 1000,
                items: {
                    layout: 'fit',
                    xtype: 'form',
                    border: false,
                    bodyPadding: 10,
                    items: [
                    {
                        xtype: 'fieldset',
                        border: false,
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'hidden',
                                name: 'pagecount',
                                value: 0,
                            },
                            {
                                xtype: 'panel',
                                border: false,
                                html: '<table id="tableSignIn" cellspacing="0" border="0" cellpadding="1" style="width: 100%;">' +
                                    '<thead id="TableOne"></thead><tbody id="TableNext"></tbody></table>',
                                listeners: {
                                    render: 'onTheWeek',
                                },
                            }
                        ]
                    }],
                    tbar: [
                        {
                            xtype: 'fieldset',
                            border: 0,
                            layout: 'table',
                            margin: '0 20 0 0',
                            name: '',
                            items: [
                                {
                                    xtype: 'combo',
                                    fieldLabel: '请选择中队',
                                    labelAlign: 'right',
                                    labelWidth: 70,
                                    name: 'middleteam',
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
                                        change: function (obj) {
                                            var pgcmp = me.down('hidden[name=pagecount]').setValue(0);
                                            var timeParams = me.down('hidden[name=pagecount]').getValue();
                                            Ext.Ajax.request({
                                                url: configs.WebApi + 'api/CarDuty/GetCarDutyView?timeParams=' + timeParams + '&unitid=' + this.getValue(),
                                                method: 'get',
                                                scope: this,
                                                success: function (response) {
                                                    var records = JSON.parse(response.responseText);
                                                    $("#TableOne").html(records.GetTableOneMes);
                                                    $("#TableNext").html(records.GetTableContentMes);
                                                }
                                            });

                                            var cyCombo = obj.up().down('combo[name=group]');
                                            cyCombo.clearValue();
                                            cyStore = Ext.create('TianZun.store.sys.UnitGroup');
                                            cyStore.getProxy().url = 'api/Unit/GetUnitsChild?parentid=' + this.getValue();
                                            cyCombo.bindStore(cyStore, false);
                                            cyStore.load();
                                        },
                                    },
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: '请选择班组',
                                    labelAlign: 'right',
                                    labelWidth: 70,
                                    name: 'group',
                                    valueField: 'ID',
                                    displayField: 'Name',
                                    editable: false,
                                    listeners: {
                                        change: 'onTheWeek'
                                    },
                                },
                            ]
                        },
                        {
                            text: '上一周',
                            margin: '0 10 0 0',
                            handler: 'onPreviousWeek',
                            handleMouseEvents: false
                        },
                        {
                            text: '下一周',
                            handler: 'onNextWeek',
                            handleMouseEvents: false
                        },
                    ],
                }
            }]
        }];

        this.callParent();


    }
});


function AddCarTask(carnum, dtime, unitid) {
    var carlist = Ext.ComponentQuery.query('carDutyList')[0];
    var sszd = carlist.down('combo[name=middleteam]').getValue();
    var ssbc = carlist.down('combo[name=group]').getValue();

    var win = Ext.create('TianZun.view.qwmanager.carduty.CarDutyAdd', { carnum: carnum, unitid: unitid, sszd: sszd, ssbc: ssbc });
    var view = Ext.ComponentQuery.query('viewport')[0];
    var panel = view.items.getAt(3)
    panel.add(win);
    win.show();
}

function EditCarTask(carnum, dtime, unitid, carid) {
    Ext.Ajax.request({
        url: configs.WebApi + 'api/CarDuty/GetCarTask?carnum=' + carnum + '&sdate=' + dtime,
        method: 'get',
        success: function (response) {
            var records = JSON.parse(response.responseText);
            records.weeks = new Date(dtime).getDay();
            records['unitid'] = unitid;
            records['carnum'] = carnum;
            records['carid'] = carid;
            var win = Ext.create('TianZun.view.qwmanager.carduty.CarDutyEdit', { record: records });
            var view = Ext.ComponentQuery.query('viewport')[0];
            var panel = view.items.getAt(3)
            panel.add(win);
            win.show();
        }
    });

}