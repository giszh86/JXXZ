Ext.define('TianZun.view.mechanicalassessment.assessment.AssessmentInfo', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.assessmentInfo',
    title: '考核详情',
    layout: 'fit',
    initComponent: function () {
        var me = this;
        var scorestore = Ext.create('TianZun.store.mechanicalassessment.ScoreListStore');
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
                    xtype: 'displayfield',
                    width: 280
                },
                items: [{
                    xtype: 'hidden',
                    name: 'userid',
                    value: $.cookie("USER_ID")
                },
                {
                    fieldLabel: '<span style="color:red">*&nbsp;</span>考核年月',
                    xtype: 'displayfield',
                    name: 'checkmonth',
                    renderer: Ext.util.Format.dateRenderer('Y-m'),
                    value: this.record.examinedate,
                },
                {
                    fieldLabel: '<span style="color:red">*&nbsp;</span>合计扣分',
                    xtype: 'displayfield',
                    name: 'sumscore',
                    value: this.record.sumscore,
                },
                {
                    fieldLabel: '<span style="color:red">*&nbsp;</span>综合得分',
                    xtype: 'displayfield',
                    name: 'score',
                    value: this.record.score,
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
                              value: this.record.companyname,
                              width: 420,
                          },
                           {
                               fieldLabel: '<span style="color:red">*&nbsp;</span>养护合同',
                               xtype: 'displayfield',
                               name: 'contractname',
                               value: this.record.contractname,
                               width: 420,
                           },
                     ]
                 },
                {
                    xtype: 'grid',
                    layout: 'fit',
                    colspan: 3,
                    width: 850,
                    margin: '10 0 10 0',
                    columnLines: true,
                    columns: [
                        { header: '考核细则', dataIndex: 'deail', flex: 1 },
                        { header: '具体扣分', dataIndex: 'deduct', flex: 1 },
                        { header: '考核人', dataIndex: 'deductusername', flex: 1 },
                        { header: '考核时间', dataIndex: 'examinetime', flex: 1 },
                    ],
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                    },
                    listeners:
                        {
                            render: function (obj)
                            {
                                scorestore.getProxy().url = 'api/MechanicalExam/getScoreList?examineid=' + me.record.examineid;
                                obj.setStore(scorestore);
                                scorestore.load();
                            }
                        }
                },
                ]
            }],
            buttons: [
            {
                text: '取消',
                handler: 'onClose',
            }]
        }]
        this.callParent();
    }

})