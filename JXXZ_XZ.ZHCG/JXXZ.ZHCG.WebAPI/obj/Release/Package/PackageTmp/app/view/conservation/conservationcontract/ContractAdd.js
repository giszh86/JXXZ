Ext.define('TianZun.view.conservation.conservationcontract.ContractAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.contractAdd',
    title: '养护合同信息',
    layout: 'fit',

    initComponent: function () {
        var me = this;
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
                    title: '养护合同',
                    margin: '10 0 10 10',
                    layout: {
                        type: 'table',
                        columns: 3,
                    },
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 130,
                    },
                    defaults: {
                        xtype: 'textfield',
                        width: 295,
                       allowBlank: false,
                        margin:'0 0 10 0',
                    },
                    items: [
                   {
                       fieldLabel: '<span style="color:red">*</span>养护合同名称',
                       name: 'contractname',
                       id: 'contractname',
                       colspan: 3,
                       width: '98%',
                       allowBlank: false,
                   },
                   {
                       fieldLabel: '<span style="color:red">*</span>合同说明',
                       name: 'patrolexplain',
                       id: 'patrolexplain',
                       allowBlank: false,
                       xtype: 'textarea',
                       height: 30,
                       colspan: 3,
                       width: '98%',
                   },
                   {
                       fieldLabel: '<span style="color:red">*</span>养护合同编号',
                       allowBlank: false,
                       name: 'contractnum',
                   },
                   {
                       fieldLabel: '<span style="color:red">*</span>甲方单位',
                       allowBlank: false,
                       name: 'jfdw',
                       id: 'jfdw',
                   },
                    {
                        fieldLabel: '<span style="color:red">*</span>甲方代表',
                        name: 'jfdb',
                       allowBlank: false,
                        id: 'jfdb',
                    },
                     {
                         fieldLabel: '<span style="color:red">*</span>乙方单位',
                         name: 'yfdw',
                        allowBlank: false,
                         id: 'yfdw',
                     },
                    {
                        fieldLabel: '<span style="color:red">*</span>乙方代表',
                        name: 'yfdb',
                       allowBlank: false,
                        id: 'yfdb',
                    },
                     {
                         fieldLabel: '<span style="color:red">*</span>监理单位',
                        allowBlank: false,
                         name: 'jldw',
                     },
                    {
                        fieldLabel: '<span style="color:red">*</span>开始时间',
                        name: 'starttime',
                        xtype: 'datefield',
                        format: "Y-m-d",//日期的格式
                        altFormats: "Y/m/d|Ymd",
                        editable: false,
                       allowBlank: false,
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>结束时间',
                        name: 'endtime',
                        xtype: 'datefield',
                        format: "Y-m-d",//日期的格式
                        altFormats: "Y/m/d|Ymd",
                        editable: false,
                       allowBlank: false,
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>签订日期',
                        name: 'signdate',
                        xtype: 'datefield',
                        format: "Y-m-d",//日期的格式
                        altFormats: "Y/m/d|Ymd",
                        editable: false,
                       allowBlank: false,
                    },
                     {
                         fieldLabel: '<span style="color:red">*</span>巡查金额(元)',
                         xtype: 'numberfield',
                         //hideTrigger: true,
                         minValue:0,
                         name: 'patrolemoney',
                         id: 'patrolemoney',
                         allowBlank: false,
                         value:0,
                         listeners: {
                             'change': function (obj) {
                                 var sumValue1 = parseInt(obj.lastValue);
                                 var sumValue2 = parseInt(me.down('numberfield[name=yhmoney]').lastValue);
                                 me.down('numberfield[name=summoney]').setValue(sumValue1 + sumValue2);
                                 
                             },
                         }
                     },
                     {
                         fieldLabel: '<span style="color:red">*</span>养护金额(元)',
                         xtype: 'numberfield',
                         minValue: 0,
                         name: 'yhmoney',
                         id: 'yhmoney',
                         value: 0,
                         allowBlank: false,
                         listeners: {
                             'change': function (obj) {
                                 var sumValue1 = parseInt(obj.lastValue);
                                 var sumValue2= parseInt(me.down('numberfield[name=patrolemoney]').lastValue);
                                 me.down('numberfield[name=summoney]').setValue(sumValue1 + sumValue2);
                             },
                         }
                     },
                     {
                         fieldLabel: '<span style="color:red">*</span>养护总额(元)',
                         xtype: 'numberfield',
                         name: 'summoney',
                         //hideTrigger: true,
                         minValue: 0,
                         id: 'summoney',
                         editable: false,
                         value: 0,
                         allowBlank: false,
                        
                     },
                     {
                         fieldLabel: '<span style="color:red">*</span>合同执行状态',
                         name: 'htzxzt',
                         xtype: 'combo',
                         editable: false,
                        allowBlank: false,
                         store: Ext.create('TianZun.store.conservation.ContractExecState'),
                         valueField: 'ID',
                         displayField: 'Name',
                     },
                      //{
                      //    fieldLabel: '<span style="color:red">*</span>当前养护金额(元)',
                      //    xtype: 'numberfield',
                      //    name: 'currentmoney',
                      //    minValue: 0,
                      //    hideTrigger:true,
                      //    labelWidth: 120,
                      //    id: 'currentmoney',
                      //   allowBlank: false,
                      //},
                      //{
                      //    fieldLabel: '<span style="color:red">*</span>合同结束时间',
                      //    name: 'contactendtime',
                      //    xtype: 'datefield',
                      //    format: "Y-m-d",//日期的格式
                      //    altFormats: "Y/m/d|Ymd",
                      //    editable: false,
                      //   allowBlank: false,
                      //},
                       {
                           fieldLabel: '<span style="color:red">*</span>养护内容类型',
                           xtype: 'combo',
                           editable: false,
                           name: 'contacttype',
                           editable: false,
                           allowBlank: false,
                           store: Ext.create('TianZun.store.sys.Dictionary', {
                               proxy: {
                                   type: 'ajax',
                                   method: "Get",
                                   url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_yhht_yhnr',
                               }
                           }),
                           name: 'contacttype',
                           valueField: 'zd_id',
                           displayField: 'zd_name',
                       },
                       {
                           fieldLabel: '<span style="color:red">*</span>养护合同类型',
                           colspan: 2,
                           editable: false,
                           xtype: 'combo',
                           editable: false,
                           allowBlank: false,
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
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '上传附件',
                        colspan: 3,
                        width: '97%',
                        margin:'0 10 10 0',
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
                handler: 'onAddOk'
            }, {
                text: '取消',
                handler: 'onClose'
            }],
        }]
        this.callParent();
    }
});