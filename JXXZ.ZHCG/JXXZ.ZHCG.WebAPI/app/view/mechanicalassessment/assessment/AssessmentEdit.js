Ext.define('TianZun.view.mechanicalassessment.assessment.AssessmentEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.assessmentEdit',
    title: '编辑考核',
    layout: 'fit',
    initComponent: function ()
    {
        var me = this;
        var scorestore = Ext.create('TianZun.store.mechanicalassessment.ScoreListStore', {
            autoSave: true,
            field: ["deail", "deduct", "deductuserid", "examinetime"],
            proxy: {
                type: 'ajax',
                method: "GET",
                url: configs.WebApi + 'api/MechanicalExam/getScoreList?examineid=' + me.record.examineid,
                reader: {
                    type: 'json',
                }
            },
            sorters: [{
                property: 'examinetime',
                direction: 'DESC'
            }]
        });
        var i = 1;

        me.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1,
        });
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width: 900,
            overflowY: 'auto',
            items: [{
                xtype: 'fieldset',
                collapsible: true,
                title: '基础信息',

                layout: {
                    type: 'table',
                    columns: 3,
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 120
                },
                defaults: {
                    xtype: 'textfield',
                    width: 280
                },
                items: [{
                    xtype: 'hidden',
                    name: 'createuserid',
                    value: $.cookie("USER_ID")
                },
                {
                    xtype: 'hidden',
                    name: 'examineid',
                    value: this.record.examineid,
                },
                {
                    fieldLabel: '<span style="color:red">*&nbsp;</span>考核年月',
                    xtype: 'displayfield',
                    name: 'examinedate',
                    readOnly: true,
                    renderer: Ext.util.Format.dateRenderer('Y-m'),
                    value: Ext.util.Format.date(this.record.examinedate,"Y-m"),
                },
                 {
                     fieldLabel: '<span style="color:red">*&nbsp;</span>合计扣分',
                     xtype: 'textfield',
                     name: 'sumscore',
                     editable: false,
                     readOnly: true,
                     minValue: 0,
                     maxValue: 100,
                     value: this.record.sumscore,
                     labelWidth: 80,
                     width: 210,
                 },
                {
                    fieldLabel: '<span style="color:red">*&nbsp;</span>综合得分',
                    xtype: 'textfield',
                    name: 'score',
                    allowBlank: false,
                    editable: false,
                    minValue: 0,
                    maxValue: 100,
                    value: this.record.score,
                    labelWidth: 80,
                    width: 210,
                },
                {
                    layout: 'hbox',
                    xtype: 'fieldcontainer',
                    fieldLabel: '',
                    colspan: 3,
                    width: 900,
                    items: [
                         {
                             fieldLabel: '<span style="color:red">*&nbsp;</span>被考核养护单位',
                             xtype: 'displayfield',
                             name: 'companyname',
                             readOnly: true,
                             value: this.record.companyname,
                             width: 420,
                         },
                          {
                              fieldLabel: '<span style="color:red">*&nbsp;</span>养护合同',
                              xtype: 'displayfield',
                              name: 'contractname',
                              readOnly: true,
                              colspan: 2,
                              value: this.record.contractname,
                              width: 420,
                          },
                    ]
                },
                {
                    xtype: 'button',
                    text: '添加',
                    colspan: 3,
                    style: 'float:right;margin-right:50px',
                    width: 100,
                    handler: me.onAddClick,
                },
                {
                    xtype: 'grid',
                    layout: 'fit',
                    colspan: 3,
                    width: 850,
                    height: 200,
                    autoScroll: true,
                    id: 'scoretable',
                    margin: '10 0 10 0',
                    plugins: [this.cellEditing],
                    columnLines: true,
                    store: scorestore,
                    features: [{
                        ftype: 'summary'
                    }],
                    columns: [

                        {
                            header: '考核细则',
                            dataIndex: 'deail',
                            id: 'deail',
                            flex: 1,
                            width: 130,
                            editor: {
                                allowBlank: false,
                                xtype: 'textfield',
                            },
                        },
                        {
                            header: '具体扣分', dataIndex: 'deduct', flex: 1,
                            width: 70,
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                minValue: 0,
                                maxValue: 100,
                            },
                            summaryType: 'sum',
                            summaryRenderer: function (value, summaryData, dataIndex)
                            {
                                var sumValue = parseInt(value);
                                if (sumValue > 100)
                                {
                                    Ext.Msg.alert('提示', '合计扣分已经超过100分，请确认后重新输入！');
                                }
                                me.down('textfield[name=sumscore]').setValue(sumValue);
                                me.down('textfield[name=score]').setValue(100 - sumValue);
                                return "<font color='red' size='2'>合计:" + sumValue + "</font>";
                            }
                        },
                        {
                            header: '考核人', dataIndex: 'deductusername', flex: 1,
                            width: 90,
                            editor: {
                                allowBlank: false,
                                xtype: 'textfield',
                                editable: false,
                            }
                        },
                        {
                            header: '考核时间', dataIndex: 'examinetime', flex: 1,
                            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
                            width: 95,
                            editable: false,
                            editor: {
                                xtype: 'textfield',
                                format: 'Y-m-d H:i:s',
                                minValue: '1901-01-01',
                                editable: false,
                            }
                        },
                         {
                             xtype: 'actioncolumn',
                             width: 40,
                             sortable: false,
                             menuDisabled: true,
                             items: [{
                                 tooltip: 'Delete',
                                 scope: this,
                                 icon: '/Images/images/delete.gif',
                                 handler: me.onRemoveClick,
                             }]
                         }],
                    selModel: {
                        selType: 'cellmodel'
                    },
                    plugins: [this.cellEditing],
                },
                ]
            }],
            buttons: [
                 {
                     text: '提交',
                     handler: 'onEditOk',
                 },
                {
                    text: '取消',
                    handler: 'onClose',
                }]
        }]
        this.callParent();
    },
    onAddClick: function (obj)
    {
        // Create a model instance
        var rec = new Ext.data.Record({
            deduct: 0,
            deail: '',
            deductusername: $.cookie("USER_NAME"),
            examinetime: Ext.util.Format.date(new Date(), "Y-m-d H:i:s"),//月日时分秒
        });
        var count = obj.up('panel').down('grid').getStore().getCount();
        obj.up('panel').down('grid').getStore().insert(count, rec);
        obj.up('panel').up('window').cellEditing.startEditByPosition({
            row: 0,
            column: 0
        });
    },
    onRemoveClick: function (grid, rowIndex)
    {
        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn)
        {
            if (btn == "yes")
            {
                grid.getStore().removeAt(rowIndex);
            }
        });
    }
})