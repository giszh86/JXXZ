Ext.define('TianZun.view.qwmanager.inspectionlog.InspectionLogQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.inspectionLogQuery',
    title: '查询',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            overflowY: 'auto',
            items: [{
                xtype: 'fieldset',
                collapsible: true,
                layout: {
                    type: 'table',
                    columns: 2,
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 100
                },
                defaults: {
                    xtype: 'textfield',
                    width: 350
                },
                items: [{

                    fieldLabel: '所属中队',
                    xtype: 'combo',
                    name: 'unitid',
                    store: Ext.create('TianZun.store.sys.UnitSquadron', {
                        proxy: {
                            type: 'ajax',
                            method: "Get",
                            url: configs.WebApi + 'api/Unit/GetUnitsSquadron?unittypeid=2',
                        }
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
                    }
                },
                {
                    fieldLabel: '巡查队员',
                    xtype: 'textfield',
                    name: 'username',
                },
               {
                   fieldLabel: '开始时间',
                   xtype: 'datefield',
                   editable: false,
                   format: "Y-m-d",//日期的格式
                   name: 'stime'
               },
                {
                    fieldLabel: '结束时间',
                    xtype: 'datefield',
                    editable: false,
                    format: "Y-m-d",//日期的格式
                    name: 'etime'

                },
                {
                    fieldLabel: '检查项',
                    xtype: 'combo',
                    name: 'checkid',
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: {
                            type: 'ajax',
                            method: "Get",
                            url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_xcrz_jcx',
                        }
                    }),
                    valueField: 'zd_id',
                    displayField: 'zd_name',
                    editable: false
                },
                //{
                //    fieldLabel: '是否发现问题',
                //    name: 'isffound',
                //    xtype: 'radiogroup',
                //    colspan: 2,
                //    items: [{
                //        boxLabel: '是',
                //        id: 'radioYes',
                //        name: 'isfound',
                //        inputValue: '1',
                //    },
                //    {
                //        boxLabel: '否',
                //        id: 'radioNo',
                //        name: 'isfound',
                //        inputValue: '0',

                //    }]
                //},

                ]
            }],
            buttons: [{
                text: '提交',
                handler: 'onsubmit',
            },
            {
                text: '清空',
                handler: 'onEmpty',
            },
            {
                text: '取消',
                handler: 'onclose',
            }]
        }]
        this.callParent();
    }
})