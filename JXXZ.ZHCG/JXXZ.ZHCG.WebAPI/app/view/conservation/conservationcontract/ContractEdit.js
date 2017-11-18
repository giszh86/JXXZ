Ext.define('TianZun.view.conservation.conservationcontract.ContractEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.contractEdit',
    title: '修改养护合同信息',
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
                    title: '巡查日志',
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
                        xtype: 'textfield',
                        width: 295,
                        margin: '0 0 10 0',
                        allowBlank: false,
                    },
                    items: [
                   {
                       xtype: 'hidden',
                       name: 'contractid',
                       value: this.record.contractid,
                   },
                   {
                       fieldLabel: '<span style="color:red">*</span>养护合同名称',
                       name: 'contractname',
                       colspan: 3,
                       width: '98%',
                       allowBlank: false,
                       value: this.record.contractname,
                   },
                   {
                       fieldLabel: '<span style="color:red">*</span>巡查说明',
                       name: 'patrolexplain',
                       allowBlank: false,
                       xtype: 'textarea',
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
                        xtype: 'datefield',
                        editable: false,
                        alowblank:false,
                        value: new Date(this.record.starttime),
                        format: "Y-m-d",//日期的格式
                        altFormats: "Y/m/d|Ymd",
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>结束日期',
                        name: 'endtime',
                        xtype: 'datefield',
                        editable: false,
                        allowBlank: false,
                        value: new Date(this.record.endtime),
                        format: "Y-m-d",//日期的格式
                        altFormats: "Y/m/d|Ymd",
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>签订日期',
                        name: 'signdate',
                        xtype: 'datefield',
                        editable: false,
                        allowBlank: false,
                        value: new Date(this.record.signdate),
                        format: "Y-m-d",//日期的格式
                        altFormats: "Y/m/d|Ymd",
                    },
                     {
                         fieldLabel: '<span style="color:red">*</span>巡查金额(元)',
                         name: 'patrolemoney',
                         xtype: 'numberfield',
                         minValue: 0,
                         value: this.record.patrolemoney,
                     },
                     {
                         fieldLabel: '<span style="color:red">*</span>养护金额(元)',
                         name: 'yhmoney',
                         xtype: 'numberfield',
                         minValue: 0,
                         value: this.record.yhmoney,
                     },
                     {
                         fieldLabel: '<span style="color:red">*</span>养护总额(元)',
                         name: 'summoney',
                         xtype: 'numberfield',
                         minValue: 0,
                         value: this.record.summoney,
                     },
                     {
                         fieldLabel: '合同执行状态',
                         name: 'htzxzt',
                         editable:false,
                         xtype:'combo',
                         store: Ext.create('TianZun.store.conservation.ContractExecState'),
                         valueField: 'ID',
                         displayField: 'Name',
                         listeners: {
                             beforerender: function (obj) {
                                 obj.setValue(me.record.htzxzt);
                                 this.getStore().load();
                             },
                         },
                     },
                      {
                          fieldLabel: '<span style="color:red">*</span>当前养护金额(元)',
                          name: 'currentmoney',
                          labelWidth: 120,
                          xtype: 'numberfield',
                          minValue: 0,
                          value: this.record.currentmoney,
                      },
                      {
                          fieldLabel: '<span style="color:red">*</span>合同结束时间',
                          name: 'contactendtime',
                          xtype: 'datefield',
                          editable: false,
                          allowBlank: false,
                          value: new Date(this.record.contactendtime),
                          format: "Y-m-d",//日期的格式
                          altFormats: "Y/m/d|Ymd",
                      },
                       {
                           fieldLabel: '<span style="color:red">*</span>养护内容类型',
                           xtype: 'combo',
                           editable: false,
                           name: 'contacttype',
                           store: Ext.create('TianZun.store.sys.Dictionary', {
                               proxy: {
                                   type: 'ajax',
                                   method: "Get",
                                   url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_yhht_yhnr',
                               }
                           }),
                           valueField: 'zd_id',
                           displayField: 'zd_name',
                           listeners: {
                               beforerender: function (obj) {
                                   obj.setValue(me.record.contacttype);
                                   this.getStore().load();
                               },
                           },
                       },
                       {
                           fieldLabel: '<span style="color:red">*</span>养护合同类型',
                           colspan: 2,
                           editable: false,
                           allowBlank: false,
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
                           listeners: {
                               beforerender: function (obj) {
                                   obj.setValue(me.record.contracttype);
                                   this.getStore().load();
                               },
                           },
                       },
                   {
                       xtype: 'imageshowpanel',
                       store: store,
                       titleNew: '附件',
                       path: configs.ContractPath,
                       colspan: 3,
                       width: '96%',
                   },
                      {
                          xtype: 'fieldset',
                          collapsible: true,
                          title: '上传附件',
                          colspan: 3,
                          width: '97%',
                          margin: '0 10 10 0',
                          id: 'sc',
                          layout: 'fit',
                          items: [],
                          afterRender: function () {
                              Ext.getCmp('sc').add({
                                  xtype: 'uploadpanel',
                                  border: false,
                                  addFileBtnText: '选择文件...',
                                  uploadBtnText: '上传',
                                  removeBtnText: '移除所有',
                                  cancelBtnText: '取消上传',
                                  file_size_limit: 10000,
                                  upload_url: 'api/Common/UploadFile',
                                  post_params: { 'path': configs.ContractPath },
                                  height: 200,
                              })
                          }
                      }
                    ]
                }
            ], buttons: [{
                text: '提交',
                handler: 'onEditOK'
            },
            //{
            //    text: '续约',
            //    handler: 'onClose'
            //},
            {
                text: '取消',
                handler: 'onClose'
            }],
        }]
        this.callParent();
    }
});