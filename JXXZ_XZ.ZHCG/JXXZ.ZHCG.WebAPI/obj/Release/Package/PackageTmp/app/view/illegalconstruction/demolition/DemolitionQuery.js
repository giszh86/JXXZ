Ext.define('TianZun.view.illegalconstruction.demolition.DemolitionQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.demolitionQuery',

    title: '查询条件',
    layout: 'fit',

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            bodorPadding: 10,
            width:535,
            margin:'10 0 0 0',
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
                   fieldLabel: '项目名称',
                   name: 'projectname',
                   //allowBlank: false,
               },
            {
                fieldLabel: '项目负责人',
                name: 'projectleader',
                //allowBlank: false,
            },
             {
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
                fieldLabel: '所属区域',
                xtype: 'combo',
                editable: false,
                //allowBlank: false,
                store: Ext.create('TianZun.store.sys.Dictionary', {
                    proxy: {
                        type: 'ajax',
                        method: "Get",
                        url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_cq',
                    }
                }),
                name: 'ssqy',
                valueField: 'zd_id',
                displayField: 'zd_name',

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