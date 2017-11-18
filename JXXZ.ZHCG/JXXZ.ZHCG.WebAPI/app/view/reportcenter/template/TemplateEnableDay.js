Ext.define('TianZun.view.reportcenter.template.TemplateEnableDay', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.templateEnableDay',
    title: '启用模板',
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
            autoScroll: true,
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
                    value: this.record.get("reportid")
                }, {
                    fieldLabel: '报表模板',
                    xtype: 'displayfield',
                    name: 'reportname',
                    value: this.record.get("reportname"),
                    width: 800,
                    colspan:3,
                },
                {
                    fieldLabel: '报表类型',
                    name: 'reporttypename',
                    value: this.record.get("reporttypename"),
                    xtype: 'displayfield',
                    editable: false,
                    width: 280,
                    colspan: 3,
                },
                {
                    fieldLabel: '统计年度',
                    xtype: 'displayfield',
                    value: year,
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
                    defaultType: 'datetimefield',
                    items: [
                        {
                            fieldLabel: '',
                            xtype:'datefield',
                            name: 'starttime',
                            allowBlank: false,
                            id:'st',
                            format: 'Y-m-d',
                            width:180,
                            editable: false,
                            value: this.record.get("starttime") == null ? new Date() : Ext.util.Format.date(this.record.get("starttime"), "Y-m-d"),
                        }, {
                            fieldLabel: '至',
                            labelWidth: 30,
                            name: 'whattime',
                            xtype: 'datetimefield',
                            editable: false,
                            format: 'Y-m-d H:i:s',
                            width: 200,
                            allowBlank: false,
                            margin: '0 20 0 0',
                            value: this.record.get("endtime") == null ? new Date() : Ext.util.Format.date(this.record.get("whattime"), "Y-m-d H:i:s"),
                            validator: function (v)
                            {
                                var starttime = Ext.getCmp('st').getValue();
                                var month = parseInt(starttime.getMonth()) + 1;
                                starttime = starttime.getFullYear() + "-" + month + "-" + starttime.getDate();
                                var start = new Date(starttime);
                                var end = new Date(v);
                                if (start > end)
                                {
                                    return "结束日期要大于或等于开始日期";
                                }
                                else
                                {
                                    return true;
                                }
                            }
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
                        width: 50,
                        id: 'aggree',
                        checked: 'true',
                        inputValue: '1',
                    },
                    {
                       boxLabel: '否',
                       name: 'isenable',
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
                    xtype: 'textarea',
                    value: this.record.get("remark"),
                    width: 750,
                    margin:'0 0 10 0',
                }
                ],
            }],
            buttons: [{
                text: '确认',
                handler: 'onQiyongOK',
            },
            {
                text: '取消',
                handler: 'onclose',
            }]
        }]
        this.callParent();
    }
})