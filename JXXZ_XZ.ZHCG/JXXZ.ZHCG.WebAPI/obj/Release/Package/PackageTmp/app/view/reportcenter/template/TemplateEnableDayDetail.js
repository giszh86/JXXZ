Ext.define('TianZun.view.reportcenter.template.TemplateEnableDayDetail', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.templateEnableDayDetail',
    title: '查看模板',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        var date = new Date();
        var year = parseInt(date.getFullYear());
        var month = parseInt(date.getMonth()) + 1;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width: 800,
            items: [{
                xtype: 'fieldset',
                collapsible: true,
                title: '基本信息',
                margin: '10 0 0 0',
                layout: {
                    type: 'table',
                    columns: 3,
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 85,
                },
                defaults: {
                    xtype: 'textfield',
                    width: 280,
                },
                items: [{
                    xtype: 'hidden',
                    name: 'reportid',
                    value: this.record.get("reportid"),
                }, {
                    fieldLabel: '报表模板',
                    name: 'reportname',
                    value: this.record.get("reportname"),
                    xtype: 'displayfield',
                    width: 800,
                    colspan:3,
                },
                {
                    fieldLabel: '报表类型',
                    xtype: 'displayfield',
                    name: 'reporttypename',
                    value: this.record.get("reporttypename"),
                    value: '日报',
                    editable: false,
                    width: 280,
                    colspan: 3,
                },
                {
                    fieldLabel: '统计年度',
                    xtype: 'displayfield',
                    value:year,
                    editable: false,
                    width: 280,
                    colspan: 3,
                },
                {
                    layout: 'hbox',
                    xtype: 'fieldcontainer',
                    fieldLabel: '选择统计时间',
                    colspan: 3,
                    width: 800,
                    defaultType: 'datefield',
                    items: [
                        {
                            fieldLabel: '',
                            name: 'starttime',
                            allowBlank: false,
                            format: 'Y-m-d',
                            id: 'st',
                            width: 180,
                            editable: false,
                            readOnly : true ,
                            value: Ext.util.Format.date(this.record.get("starttime"), "Y-m-d"),
                        }, {
                            fieldLabel: '至',
                            labelWidth: 30,
                            name: 'whattime',
                            editable: false,
                            xtype: 'datetimefield',
                            width: 200,
                            format: 'Y-m-d H:i:s',
                            readOnly: true,
                            allowBlank: false,
                            margin:'0 20 0 0',
                            value: Ext.util.Format.date(this.record.get("whattime"), "Y-m-d H:i:s"),
                        },
                    ],
                },
                {
                    //是否启用
                    fieldLabel: '是否启用',
                    layout: 'hbox',
                    xtype: 'radiogroup',
                    colspan: 3,
                    width: 800,
                    name: 'status',
                    items: [{
                        boxLabel: '是',
                        name: 'isenable',
                        readOnly: true,
                        width: 50,
                        id: 'aggree',
                        checked: 'true',
                        inputValue: '1',
                    },
                    {
                        boxLabel: '否',
                        name: 'isenable',
                        readOnly: true,
                        id: 'disaggree',
                        width: 70,
                        inputValue: '2'
                    },
                    ],
                    editable: false,
                },
                {
                    //备注
                    fieldLabel: '备&nbsp;&nbsp;注',
                    name: 'remark',
                    colspan: 3,
                    value: this.record.get("remark"),
                    readOnly: true,
                    xtype: 'textarea',
                    width: 750,
                    margin: '0 0 10 0',
                }
                ],
            }],
            buttons: [{
                text: '确定',
                handler: 'onclose',
            }]
        }]
        this.callParent();
    }
})