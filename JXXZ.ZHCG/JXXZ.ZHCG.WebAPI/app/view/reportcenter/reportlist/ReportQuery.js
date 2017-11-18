Ext.define('TianZun.view.reportcenter.reportlist.ReportQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.reportQuery',
    title: '搜索条件',
    layout: 'fit',

    initComponent: function ()
    {
        var me = this;
        var dt = new Date();
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width: 550,
            height:150,
            layout: {
                type: 'table',
                columns: 1
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 75
            },
            defaults: {
                xtype: 'textfield',
                width: 280,
            },
            items: [{
                fieldLabel: '报表名称',
                name: 'reportname',
                xtype: 'textfield',
                width:'100%',
            },
            {
                fieldLabel: '填报时间',
                name: 'reportdate',
                xtype: 'datefield',
                format: 'Y-m-d',
                editable: false,
            },
            {
                fieldLabel: '年度',
                name: 'reportyear',
                xtype: 'combo',
                editable: false,
                valueField: 'ID',
                displayField: 'Year',
                store: Ext.create('Ext.data.Store', {
                    data: [
                        { ID: dt.getFullYear(), Year: dt.getFullYear() },
                        { ID: dt.getFullYear() - 1, Year: dt.getFullYear() - 1 },
                        { ID: dt.getFullYear() - 2, Year: dt.getFullYear() - 2 },
                        { ID: dt.getFullYear() - 3, Year: dt.getFullYear() - 3 },
                        { ID: dt.getFullYear() - 4, Year: dt.getFullYear() - 4 },
                    ]
                }),
                value: dt.getFullYear(),
                listeners: {
                    render: function () {
                        if (me.title == "累计报表") {
                            me.down('datefield[name=reportdate]').hide();
                        }
                        else {
                            me.down('textfield[name=reportyear]').hide();
                        }
                    }
                }
            }
            ],
            buttons: [{
                text: '确定',
                handler: 'onQueryOK',
            },
            {
                text: '清空',
                handler: 'onEmpty',
            },
            {
                text: '关闭',
                handler: 'onClose',
            }]
        }]
        this.callParent();
    }
})