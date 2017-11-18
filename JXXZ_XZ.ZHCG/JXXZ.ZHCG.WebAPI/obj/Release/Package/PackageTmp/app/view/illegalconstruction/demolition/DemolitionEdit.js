Ext.define('TianZun.view.illegalconstruction.demolition.DemolitionEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.demolitionEdit',
    title: '拆迁信息编辑',
    layout: 'fit',

    requires: [
  'TianZun.ux.ImageShowPanel',
    ],

    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.illegalconstruction.GetFileUpload', { proxy: { type: 'ajax', extraParams: { id: this.record.cqid, type: 2 } } });

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 1000,
            overflowY: 'auto',
            items: [
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '基础信息',
                        name: 'visitwin',
                        layout: {
                            type: 'table',
                            columns: 3,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 75
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 301
                        },
                        items: [

                            {
                                xtype: 'hidden',
                                name: 'createuserid',
                                value: $.cookie('USER_ID'),
                            },
                             {
                                 xtype: 'hidden',
                                 name: 'cqid',
                                 value: this.record.cqid,
                             },
                            {
                                fieldLabel: '项目名称',
                                name: 'projectname',
                                xtype: 'textfield',
                                allowBlank: false,
                                margin: '20 0 10 0',
                                value: this.record.projectname,
                            },
                             {
                                 fieldLabel: '项目负责人',
                                 name: 'projectleader',
                                 xtype: 'textfield',
                                 allowBlank: false,
                                 margin: '20 0 10 0',
                                 value: this.record.projectleader,
                             },
                               {
                                   fieldLabel: '联系电话',
                                   name: 'contackphone',
                                   xtype: 'textfield',
                                   allowBlank: false,
                                   margin: '20 0 10 0',
                                   value: this.record.contackphone,
                               },
                               {
                                   fieldLabel: '拆迁面积',
                                   name: 'cqarea',
                                   xtype: 'textfield',
                                   allowBlank: false,
                                   margin: '0 0 10 0',
                                   value: this.record.cqarea,
                                   blankText: '请填写拆迁面积',
                                   allowBlank: false,
                                   regex: /^\d+(\.\d{1,2})?$/,
                                   regexText: '请输入正确的数据类型'
                               },
                                 {
                                     fieldLabel: '启动时间',
                                     name: 'starttime',
                                     xtype: 'datefield',
                                     allowBlank: false,
                                     margin: '0 0 10 0',
                                     value: new Date(this.record.starttime),
                                     editable: true,
                                     format: "Y-m-d",//日期的格式
                                     altFormats: "Y/m/d|Ymd",
                                 },

                             {
                                 fieldLabel: '结束时间',
                                 name: 'endtime',
                                 xtype: 'datefield',
                                 allowBlank: false,
                                 margin: '0 0 10 0',
                                 value: new Date(this.record.endtime),
                                 editable: true,
                                 format: "Y-m-d",//日期的格式
                                 altFormats: "Y/m/d|Ymd",
                             },
                            {
                                fieldLabel: '所属区域',
                                xtype: 'combo',
                                editable: false,
                                allowBlank: false,
                                store: Ext.create('TianZun.store.sys.Dictionary', {
                                    proxy: {
                                        type: 'ajax',
                                        method: "Get",
                                        url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_cq',
                                    }
                                }),
                                name: 'ssqy',
                                valueField: 'zd_id',
                                displayField: 'zd_name',
                                listeners: {
                                    beforerender: function (obj) {
                                        obj.setValue(me.record.ssqy);
                                        this.getStore().load();
                                    },

                                },
                            },
                             {
                                 fieldLabel: '拆迁地址',
                                 name: 'address',
                                 xtype: 'textfield',
                                 allowBlank: false,
                                 colspan: 3,
                                 margin: '0 0 10 0',
                                 value: this.record.address,
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
                                      margin: '0 8 10 15'
                                  },
                                  {
                                      id: 'EVENT_COORDINATE_ID',
                                      name: 'geography',
                                      xtype: 'textfield',
                                      colspan: 3,
                                      value: this.record.geography,
                                      width: '92%',
                                      autoShow: true,
                                      listeners: {
                                          render: function (p) {
                                              p.getEl().on('click', function (p) {
                                                  CreateAarcgisMap('EVENT_COORDINATE_ID', '坐标', 3, 3, this.component.getValue());
                                              });
                                          },
                                      }
                                  }]
                              },
                                {
                                    fieldLabel: '备注',
                                    xtype: 'textarea',
                                    name: 'remark',
                                    colspan: 3,
                                    margin: '0 0 10 0',
                                    width: '98%',
                                    heigh: 30,
                                    value: this.record.remark,
                                },
                                  {
                                      xtype: 'imageshowpanel',
                                      store: store,
                                      titleNew: '附件',
                                      path: configs.DemolitionOriginalPath,
                                      colspan: 3,
                                      width: '100%',
                                  },
                                  {
                                      xtype: 'fieldset',
                                      collapsible: true,
                                      title: '新增附件',
                                     //collapsed: true,
                                      margin: '10 0 10 0 ',
                                      colspan: 3,
                                      id: 'cnm',
                                      layout: 'fit',
                                      width: '100%',
                                      item: [],
                                      afterRender: function (obj)
                                              {
                                                 Ext.getCmp('cnm').add({
                                                 id: "cnm_up",
                                                 xtype: 'uploadpanel',
                                                 border: false,
                                                 file_types: '*.*',
                                                 addFileBtnText: '选择文件...',
                                                 uploadBtnText: '上传',
                                                 removeBtnText: '移除所有',
                                                 cancelBtnText: '取消上传',
                                                 file_size_limit: 10000,//MB
                                                 upload_url: 'api/Common/UploadFile',
                                                 post_params: { 'path': configs.DemolitionOriginalPath },
                                                 height: 200,
                                               })
                             }

                         },
                        ]
                    }
            ],
            buttons: [{
                text: '提交',
                handler: 'onEditOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});