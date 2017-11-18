Ext.define('TianZun.view.conservation.conservationcontract.ContractInfo', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.contractInfo',
    title: '养护合同详情',
    layout: 'fit',
    requires: [
'TianZun.ux.ImageShowPanel',
    ],
    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.conservation.GetFileUpload', { proxy: { type: 'ajax', extraParams: { id: this.record.contractid, type: 1 } } });
        this.items = [{
            xtype: 'form',
            border: false,
            autoScroll: true,
            bodyPadding: 10,
            width: 1000,
            items: [
                {
                    xtype: 'fieldset',
                    collapsible: true,
                    title: '基本信息',
                    margin: '10 0 10 10',
                    layout: {
                        type: 'table',
                        columns: 3,
                    },
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 120,
                    },
                    defaults: {
                        xtype: 'displayfield',
                        width: 295,
                        margin: '0 0 10 0',
                    },
                    items: [
                   {
                       fieldLabel: '<span style="color:red">*</span>养护合同名称',
                       name: 'contractname',
                       colspan: 3,
                       width: '98%',
                       alowblank: false,
                       value: this.record.contractname,
                   },
                   {
                       fieldLabel: '<span style="color:red">*</span>合同说明',
                       name: 'patrolexplain',
                       allowBlank: false,
                       xtype: 'displayfield',
                       height: 30,
                       colspan: 3,
                       width: '98%',
                       value: this.record.patrolexplain,
                   },
                   {
                       fieldLabel: '<span style="color:red">*</span>养护合同编号',
                       name: 'contractnum',
                       value: this.record.contractnum,
                   },
                   {
                       fieldLabel: '<span style="color:red">*</span>甲方单位',
                       name: 'jfdw',
                       value: this.record.jfdw,
                   },
                    {
                        fieldLabel: '<span style="color:red">*</span>甲方代表',
                        value: this.record.jfdb,
                        name: 'jfdb',
                    },
                     {
                         fieldLabel: '<span style="color:red">*</span>乙方单位',
                         name: 'yfdw',
                         value: this.record.yfdw,
                     },
                    {
                        fieldLabel: '<span style="color:red">*</span>乙方代表',
                        name: 'yfdb',
                        value: this.record.yfdb,
                    },
                     {
                         fieldLabel: '<span style="color:red">*</span>监理单位',
                         name: 'jldw',
                         value: this.record.jldw,
                     },
                    {
                        fieldLabel: '<span style="color:red">*</span>开始日期',
                        name: 'starttime',
                        xtype: 'displayfield',
                        value: Ext.util.Format.date(this.record.starttime,'Y-m-d'),
                        format: "Y-m-d",//日期的格式
                        //altFormats: "Y/m/d|Ymd",
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>结束日期',
                        name: 'endtime',
                        xtype: 'displayfield',
                        value: Ext.util.Format.date(this.record.endtime, 'Y-m-d'),
                        //altFormats: "Y/m/d|Ymd",
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>签订日期',
                        name: 'signdate',
                        xtype: 'displayfield',
                        value: Ext.util.Format.date(this.record.signdate, 'Y-m-d'),
                    },
                     {
                         fieldLabel: '<span style="color:red">*</span>巡查金额(元)',
                         name: 'patrolemoney',
                         xtype: 'displayfield',
                         value: this.record.patrolemoney,
                     },
                     {
                         fieldLabel: '<span style="color:red">*</span>养护金额(元)',
                         name: 'yhmoney',
                         xtype: 'displayfield',
                         value: this.record.yhmoney,
                     },
                     {
                         fieldLabel: '<span style="color:red">*</span>养护总额(元)',
                         name: 'summoney',
                         xtype: 'displayfield',
                         value: this.record.summoney,
                     },
                     {
                         fieldLabel: '<span style="color:red">*</span>合同执行状态',
                         name: 'htzxzt',
                         value: this.record.contractstate,
                     },
                      {
                          fieldLabel: '<span style="color:red">*</span>当前养护金额(元)',
                          name: 'currentmoney',
                          labelWidth: 120,
                          xtype: 'displayfield',
                          value: this.record.currentmoney,
                      },
                      {
                          fieldLabel: '<span style="color:red">*</span>合同结束时间',
                          name: 'contactendtime',
                          xtype: 'displayfield',
                          value: Ext.util.Format.date(this.record.contactendtime, 'Y-m-d'),
                      },
                       {
                           fieldLabel: '<span style="color:red">*</span>养护内容类型',
                           name: 'contacttype',
                           value: me.record.contacttypename,
                       },
                       {
                           fieldLabel: '<span style="color:red">*</span>养护合同类型',
                           colspan: 2,
                           name: 'contracttype',
                           value: me.record.contracttypename,
                       },
                    {
                        xtype: 'imageshowpanel',
                        store: store,
                        titleNew: '附件',
                        path: configs.ContractPath,
                        colspan: 3,
                        width: '96%',
                    },
                    ]
                }
            ], buttons: [{
                text: '取消',
                handler: 'onClose'
            }],
        }]
        this.callParent();
    }
});