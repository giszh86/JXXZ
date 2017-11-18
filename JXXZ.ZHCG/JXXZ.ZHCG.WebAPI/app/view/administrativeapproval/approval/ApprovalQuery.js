Ext.define('TianZun.view.administrativeapproval.approval.ApprovalQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.approvalQuery',

    title: '查询条件',
    layout: 'fit',

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            layout: {
                type: 'table',
                columns: 2,
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 90
            },
            defaults: {
                xtype: 'textfield',
                width: 255,
                margin: '10 10 10 0',
                style: 'margin-bottom:15px'
            },
            items: [{
                fieldLabel: '审批号',
                name: 'row_id',
                xtype: 'textfield',
            }, {
                fieldLabel: '审批类型',
                xtype: 'textfield',
                name: 'processversioninstancename',
            },
                {
                    fieldLabel: '审批日期从',
                    xtype: 'datefield',
                    margin: '0 0 10 0',
                    name: 'banjiedatefrom',
                    format: 'Y-m-d',
                    editable: false,
                },
                {
                    fieldLabel: '审批日期到',
                    xtype: 'datefield',
                    margin: '0 0 10 0',
                    name: 'banjiedateto',
                    format: 'Y-m-d',
                    editable: false,
                },
                {
                    fieldLabel: '审批地址',
                    name: 'address',
                    xtype: 'textfield',
                    colspan: 2,
                    width: 520,
                },
                {
                    fieldLabel: '申请单位名称',
                    name: 'applyername',
                    xtype: 'textfield',
                    colspan: 2,
                    width:520,
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
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});