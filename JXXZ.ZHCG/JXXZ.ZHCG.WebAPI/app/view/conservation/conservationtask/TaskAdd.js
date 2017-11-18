Ext.define('TianZun.view.conservation.conservationtask.TaskAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.taskAdd',
    title: '养护单位巡查上报',
    layout: 'fit',
    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 1000,
            height: 550,
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
                    labelWidth: 75,
                },
                defaults: {
                    xtype: 'textfield',
                    width: 300
                },
                items: [

                 {
                     xtype: 'hidden',
                     name: 'createuserid',
                     value: $.cookie("USER_ID")
                 },
                 {
                     fieldLabel: '<span style="color:red">*</span>养护单位',
                     xtype: 'combo',
                     store: Ext.create('TianZun.store.conservation.DWSourceList'),
                     displayField: 'Name',
                     valueField: 'ID',
                     name: "yhcompany",
                     editable: false,
                     allowBlank: false,
                 },
                {
                    fieldLabel: '<span style="color:red">*</span>填报人',
                    xtype: 'textfield',
                    name: 'fileename',
                    editable: false,
                    value: $.cookie("USER_NAME")
                },

                 {
                     fieldLabel: '<span style="color:red">*</span>问题来源',
                     xtype: 'combo',
                     editable: false,
                     allowBlank: false,
                     store: Ext.create('TianZun.store.sys.Dictionary', {
                         proxy: {
                             type: 'ajax',
                             method: "Get",
                             url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_yhrw_wtly',
                         }
                     }),
                     name: 'wtsource',
                     valueField: 'zd_id',
                     displayField: 'zd_name',

                 },

                  {
                      fieldLabel: '<span style="color:red">*</span>养护类型',
                      xtype: 'combo',
                      editable: false,
                      allowBlank: false,
                      store: Ext.create('TianZun.store.sys.Dictionary', {
                          proxy: {
                              type: 'ajax',
                              method: "Get",
                              url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_yhrw_yhlx',
                          }
                      }),
                      name: 'yhtype',
                      valueField: 'zd_id',
                      displayField: 'zd_name',

                  },
                 {
                     fieldLabel: '<span style="color:red">*</span>问题大类',
                     xtype: 'combo',
                     name: 'wtbigclass',
                     margin: '10 0 10 0',
                     //hidden: true,
                     store: Ext.create('TianZun.store.sys.Dictionary', {
                         proxy: {
                             type: 'ajax',
                             method: "Get",
                             url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_yhrw_wtdl',
                         }
                     }),
                     valueField: 'zd_id',
                     displayField: 'zd_name',
                     editable: false,
                     listeners: {
                         'change': function () {
                             var cyCombo = Ext.getCmp('wtsmallclass');
                             cyCombo.clearValue();
                             cyStore = Ext.create('TianZun.store.sys.DictionaryChild');
                             cyStore.getProxy().url = 'api/Dictionary/GetZdChildList?zd_type=type_yhrw_wtdl&zd_id=' + this.getValue();
                             cyCombo.bindStore(cyStore, false);
                             cyStore.load();
                         }
                     },
                 },
                            {
                                id: 'wtsmallclass',
                                xtype: 'combo',
                                fieldLabel: '<span style="color:red">*</span>问题小类',
                                name: 'wtsmallclass',
                                valueField: 'zd_id',
                                displayField: 'zd_name',
                                editable: false,
                                allowBlank: false
                            },
                 {
                     fieldLabel: '<span style="color:red">*</span>养护对象',
                     xtype: 'combo',
                     editable: false,
                     allowBlank: false,
                     store: Ext.create('TianZun.store.sys.Dictionary', {
                         proxy: {
                             type: 'ajax',
                             method: "Get",
                             url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_yhrw_yhdx',
                         }
                     }),
                     name: 'yhobject',
                     valueField: 'zd_id',
                     displayField: 'zd_name',

                 },
                 {
                     fieldLabel: '当时天气',
                     xtype: 'textfield',
                     name: 'weather',
                 },
                  {
                      fieldLabel: '处理期限（天）',
                      xtype: 'textfield',
                      name: 'duetime',
                  },
                   {
                       fieldLabel: '维修经费（元）',
                       xtype: 'textfield',
                       name: 'outlay',
                   },
                    {
                        fieldLabel: '工作量估算（人天）',
                        xtype: 'textfield',
                        name: 'workload',
                    },
                 {
                     fieldLabel: '<span style="color:red">*</span>养护合同',
                     xtype: 'combo',
                     store: Ext.create('TianZun.store.conservation.HTSourceList'),
                     displayField: 'Name',
                     valueField: 'ID',
                     name: "yhcontract",
                     editable: false,
                     allowBlank: false,
                 },
                  {
                      fieldLabel: '<span style="color:red">*</span>问题地址',
                      xtype: 'textfield',
                      name: 'wtaddress',
                      colspan: 2,
                      width: '98%',
                      allowBlank: false,
                  },
                   {
                       xtype: 'panel',
                       layout: 'hbox',
                       border: false,
                       //margin: '10 0 0 15',
                       width: 300,
                       items: [
                           //{
                           //    xtype: 'box',
                           //    html: '发现时间:',
                           //    margin: '0 0 0 15',
                           //    width: 65,
                           //    editable: false,
                           //},
                           //{
                           //    xtype: 'datefield',
                           //    allowBlank: false,
                           //    format: 'Y-m-d',
                           //    name: 'foundtime1',
                           //    width: 130,
                           //    value: new Date(),
                           //    editable: false,
                           //},
                           //{
                           //    xtype: 'timefield',
                           //    name: 'foundtime2',
                           //    allowBlank: false,
                           //    format: 'H:i',
                           //    increment: 10,
                           //    width: 80,
                           //    value: new Date(),
                           //    editable: false,
                           //},
                           {
                             xtype: 'datetimefield',
                             border: false,
                             name: 'foundtime',
                             editable: false,
                             allowBlank: false,
                             fieldLabel: '发现时间',
                             margin: '10 0 10 0',
                             format: 'Y-m-d H:i:s',
                         },
                       ]
                   },
                  {
                      fieldLabel: '问题描述',
                      xtype: 'textarea',
                      name: 'wtdescribe',
                      colspan: 3,
                      height: 30,
                      margin: '10 0 0 0',
                      width: '98%',
                  },
                  {
                      xtype: 'fieldset',
                      collapsible: true,
                      title: '上传附件',
                      colspan: 3,
                      width: '98%',
                      layout: 'fit',
                      items: [],
                      listeners: {
                          afterrender: function (obj) {
                              obj.add({
                                  xtype: 'uploadpanel',
                                  border: false,
                                  //title: 'UploadPanel for extjs 4.0',
                                  addFileBtnText: '选择文件...',
                                  uploadBtnText: '上传',
                                  removeBtnText: '移除所有',
                                  cancelBtnText: '取消上传',
                                  file_size_limit: 10000,//MB
                                  upload_url: 'api/Common/UploadFile',
                                  post_params: { 'path': configs.YhTaskOriginalPath },
                                  width: 500,
                                  height: 200,
                              })
                          }
                      }
                  },
                 {
                     xtype: 'panel',
                     border: false,
                     bodyBorder: false,
                     colspan: 3,
                     width: '100%',
                     layout: {
                         type: 'hbox',
                         align: 'left'
                     },
                     items: [{
                         xtype: 'label',
                         html: '地理位置:',
                         margin: '10 8 10 15'
                     },
                     {
                         id: 'EVENT_COORDINATE_ID_ADD',
                         name: 'geography84',
                         xtype: 'textfield',
                         margin: '10 0 10 0',
                         colspan: 3,
                         width: '91.3%',
                         autoShow: true,
                         listeners: {
                             render: function (p) {
                                 p.getEl().on('click', function (p) {
                                     CreateAarcgisMap('EVENT_COORDINATE_ID_ADD', '事件坐标', 1, 1, this.component.getValue());
                                 });
                             },
                         }
                     }]

                 },
                 {
                     fieldLabel: '问题性质',
                     xtype: 'combo',
                     id: 'wtxzname',
                     name: "wtnature",
                     editable: false,
                     hidden: true,
                     store: Ext.create('TianZun.store.sys.Dictionary', {
                         proxy: {
                             type: 'ajax',
                             method: "Get",
                             url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_yhrw_wtxz',
                         }
                     }),
                     valueField: 'zd_id',
                     displayField: 'zd_name',
                 },
                 {
                     fieldLabel: '扣分',
                     xtype: 'textfield',
                     id: 'points',
                     hidden: true,
                     name: 'points',
                 },
                  {
                      fieldLabel: '扣款',
                      xtype: 'textfield',
                      id: 'debit',
                      hidden: true,
                      name: 'debit',
                  },
                   {
                       fieldLabel: '下派人',
                       xtype: 'textfield',
                       id: 'sendusername',
                       hidden: true,
                       name: 'sendusername',
                   },
                  {
                      fieldLabel: '下派意见',
                      xtype: 'textfield',
                      name: 'sendopinion',
                      id: 'sendopinion',
                      hidden: true,
                      colspan: 2,
                      width: '97.3%',
                  },

                ]
            }],
            buttons: [{
                text: '提交',
                name: 'btnsubmit',
                handler: 'onAddOk',
            },
            {
                text: '取消',
                name: 'cancel',
                handler: 'onClose',
            }]
        }]
        this.callParent();
        if ($.cookie("UNIT_ID") == 8) {
            Ext.getCmp('wtxzname').show(true);
            Ext.getCmp('points').show(true);
            Ext.getCmp('debit').show(true);
            Ext.getCmp('sendusername').show(true);
            Ext.getCmp('sendopinion').show(true);

        }
    }
})