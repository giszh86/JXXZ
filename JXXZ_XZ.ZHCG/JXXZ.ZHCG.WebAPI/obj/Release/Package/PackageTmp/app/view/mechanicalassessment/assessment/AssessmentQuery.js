Ext.define('TianZun.view.mechanicalassessment.assessment.AssessmentQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.assessmentQuery',
    title: '搜索',
    layout: 'fit',
    initComponent: function () {
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width:580,
            overflowY: 'auto',
            layout: {
                type: 'table',
                columns: 2,
            },
            fieldDefaults: {
                labelAlign: "right",
                labelWidth: 120,
            },
            defaults: {
                xtype: 'textfield',
                width: 255
            },
            items: [{
                fieldLabel: '养护合同',
                xtype: 'combo',
                name: 'contractname',
                store: Ext.create('TianZun.store.conservation.HTSourceList'),
                displayField: 'Name',
                valueField: 'Name',
                margin: '20 0 10 0',
                editable: false,
            },
            {
                fieldLabel: '被考核养护单位',
                xtype: 'combo',
                name: 'companyname',
                margin: '20 0 10 0',
                store: Ext.create('TianZun.store.conservation.DWSourceList'),
                displayField: 'Name',
                valueField: 'Name',
                editable: false,
            },
            //{
            //    fieldLabel: '开始考核时间',
            //    xtype: 'datefield',
            //    margin: '0 0 10 0',
            //    name: 'starttime',
            //    format: 'Y-m-d',
            //    editable: false,
            //},
            //{
            //    fieldLabel: '结束考核时间',
            //    xtype: 'datefield',
            //    margin: '0 0 10 0',
            //    name: 'endtime',
            //    format: 'Y-m-d',
            //    editable: false,
            //}
            ],
            buttons: [{
                text: '确定',
                handler: 'onQueryOK'
            }, {
                text: '清空',
                handler: 'onEmpty'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }]
        this.callParent();
    }

})