Ext.define('TianZun.view.conservation.conservationcontract.ContractQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.contractQuery',
    title: '条件搜索',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            autoScroll: true,
            bodyPadding: 10,
            width: 600,
            items: [
                {
                    xtype: 'fieldset',
                    collapsible: true,
                    title: '查询条件',
                    margin: '10 0 10 10',
                    layout: {
                        type: 'table',
                        columns: 2,
                    },
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 90,
                    },
                    defaults: {
                        xtype: 'textfield',
                        width: 260,
                        margin:'0 10 10 0'
                    },
                    items: [
                   {
                       fieldLabel: '养护合同名称',
                       name: 'contractname',
                   },
                   {
                       fieldLabel: '合同编号',
                       name: 'contractnum',
                   },
                   {
                       fieldLabel: '养护合同类型',
                       //colspan: 2,
                       editable: false,
                       xtype: 'combo',
                       store: Ext.create('TianZun.store.sys.Dictionary', {
                           proxy: {
                               type: 'ajax',
                               method: "Get",
                               url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_yhht_yhht',
                           }
                       }),
                       name: 'contracttype',
                       valueField: 'zd_id',
                       displayField: 'zd_name',
                   },
                     {
                         fieldLabel: '合同签订时间',
                         name: 'signdate',
                         editable: false,
                         format: 'Y-m-d',
                         xtype: 'datefield',
                     },
                    {
                        fieldLabel: '开始时间',
                        name: 'starttime',
                        xtype: 'datefield',
                        editable: false,
                        format:'Y-m-d',
                    },
                    {
                        fieldLabel: '结束时间',
                        name: 'endtime',
                        editable: false,
                        format: 'Y-m-d',
                        xtype: 'datefield',
                    },
                  
                    ]
                }
            ], buttons: [{
                text: '确定',
                handler: 'onQueryOK'
            },
            {
                text: '清空',
                handler:'onEmpty',
            },
            {
                text: '取消',
                handler: 'onClose'
            }],
        }]
        this.callParent();
    }
});
