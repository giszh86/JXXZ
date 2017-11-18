Ext.define('TianZun.view.illegalconstruction.illegallybuilt.IllegallyBuiltEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.illegallyBuiltEdit',
    title: '修改违建信息',
    layout: 'fit',
    requires: [
'TianZun.ux.ImageShowPanel',
    ],
    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.illegalconstruction.IllegallybuiltOldList', {
            proxy: {
                extraParams: {
                    parentid: this.record.parentid
                }
            }
        });
        var store1 = Ext.create('TianZun.store.illegalconstruction.GetFileUpload', { proxy: { type: 'ajax', extraParams: { id: this.record.wjid, type: 1 } } });

        this.items = [{
            xtype: 'tabpanel',
            border: false,
            plain: true,
            bodyBorder: false,
            bodyPadding: 10,
            items: [{
                xtype: 'form',
                border: false,

                width: 1000,
                overflowY: 'auto',
                layout: 'fit',
                border: false,
                title: '违建详情',
                items: [{

                    xtype: 'form',
                    border: false,
                    overflowY: 'auto',
                    items: [
                        {
                            xtype: 'fieldset',
                            collapsible: true,
                            title: '基本信息',
                            layout:
                              {
                                  type: 'table',
                                  columns: 3,
                              },
                            fieldDefaults: {
                                labelAlign: 'right',
                                labelWidth: 100
                            },
                            defaults: {
                                xtype: 'textfield',
                                width: 312
                            },
                            items: [
                                 {
                                     xtype: 'hidden',
                                     name: 'createuserid',
                                     value: $.cookie("USER_ID")
                                 },
                                 {
                                     xtype: 'hidden',
                                     name: 'parentid',
                                     value: this.record.parentid,
                                 },
                                    {
                                        fieldLabel: '户主（单位）',
                                        xtype: 'textfield',
                                        name: 'wjholder',
                                        allowBlank: false,
                                        margin: '20 0 10 0',
                                        value: this.record.wjholder,
                                    },
                                     {
                                         fieldLabel: '联系电话',
                                         xtype: 'textfield',
                                         name: 'contactphone',
                                         //allowBlank: false,
                                         margin: '20 0 10 0',
                                         value: this.record.contactphone,
                                     },
                                     {
                                         fieldLabel: '身份',
                                         xtype: 'textfield',
                                         name: 'holderidentity',
                                         //allowBlank: false,
                                         margin: '20 0 10 0',
                                         value: this.record.holderidentity,
                                     },
                                     {
                                         fieldLabel: '居住人口',
                                         xtype: 'textfield',
                                         name: 'householdnum',
                                         //allowBlank: false,
                                         margin: '0 0 10 0',
                                         value: this.record.householdnum,
                                     },
                                    {
                                        fieldLabel: '地址',
                                        xtype: 'textfield',
                                        name: 'address',
                                        //allowBlank: false,
                                        margin: '0 0 10 0',
                                        value: this.record.address,
                                    },
                                    {
                                        fieldLabel: '土地性质',
                                        xtype: 'textfield',
                                        name: 'landproperty',
                                        //allowBlank: false,
                                        margin: '0 0 10 0',
                                        value: this.record.landproperty,
                                    },
                                     {
                                         fieldLabel: '建成时间',
                                         xtype: 'datefield',
                                         name: 'completiontime',
                                         //allowBlank: false,
                                         margin: '0 0 10 0',
                                         value: new Date(this.record.completiontime),
                                         format: "Y-m-d"
                                     },
                                    {
                                        fieldLabel: '土地证号',
                                        xtype: 'textfield',
                                        name: 'landnum',
                                        //allowBlank: false,
                                        margin: '0 0 10 0',
                                        value: this.record.landnum,
                                    },
                                    {
                                        fieldLabel: '房产证号',
                                        xtype: 'textfield',
                                        name: 'propertynum',
                                        //allowBlank: false,
                                        margin: '0 0 10 0',
                                        value: this.record.propertynum,
                                    },
                                    {
                                        fieldLabel: '占地面积',
                                        xtype: 'textfield',
                                        name: 'coverarea',
                                        //allowBlank: false,
                                        margin: '0 0 10 0',
                                        value: this.record.coverarea,
                                    },
                                    {
                                        fieldLabel: '建筑面积',
                                        xtype: 'textfield',
                                        //allowBlank: false,
                                        name: 'buildarea',
                                        margin: '0 0 10 0',
                                        value: this.record.buildarea,
                                    },
                                    {
                                        fieldLabel: '建筑用途',
                                        xtype: 'textfield',
                                        name: 'builduse',
                                        //allowBlank: false,
                                        margin: '0 0 10 0',
                                        value: this.record.builduse,
                                    }, {
                                        fieldLabel: '建筑结构',
                                        xtype: 'textfield',
                                        name: 'buildstructure',
                                        //allowBlank: false,
                                        margin: '0 0 10 0',
                                        value: this.record.buildstructure,
                                    },
                                      {
                                          xtype: 'panel',
                                          border: false,
                                          colspan: 2,
                                          width: '100%',
                                          margin: '0 0 0 10',
                                          layout: 'hbox',
                                          items: [
                                              {
                                                  xtype: 'label',
                                                  border: false,
                                                  margin: '5 0 0 30',
                                                  text: '建筑层数:',
                                              },
                                              {
                                                  fieldLabel: '地上',
                                                  xtype: 'textfield',
                                                  margin: '2 0 0 0',
                                                  width: '20%',
                                                  //allowBlank: false,
                                                  labelWidth: 35,
                                                  name: 'buildlayers_up',
                                                  value: this.record.buildlayers_up,
                                              },
                                              {
                                                  fieldLabel: '地下',
                                                  xtype: 'textfield',
                                                  margin: '2 0 0 0',
                                                  width: '20%',
                                                  //allowBlank: false,
                                                  name: 'buildlayers_down',
                                                  labelWidth: 35,
                                                  value: this.record.buildlayers_down,
                                              }]
                                      },
                                      {
                                          xtype: 'panel',
                                          border: false,
                                          bodyBorder: false,
                                          colspan: 3,
                                          width: '95%',
                                          layout: {
                                              type: 'hbox',
                                              align: 'left'
                                          },
                                          items: [{
                                              xtype: 'label',
                                              html: '地理位置:',
                                              margin: '0 30 10 40'
                                          },
                                          {
                                              id: 'EVENT_COORDINATE_ID_EDIT',
                                              name: 'geography',
                                              value: this.record.geography,
                                              xtype: 'textfield',
                                              colspan: 3,
                                              width: '92%',
                                              autoShow: true,
                                              listeners: {
                                                  render: function (p) {
                                                      p.getEl().on('click', function (p) {
                                                          CreateAarcgisMap('EVENT_COORDINATE_ID_EDIT', '坐标', 3, 3, this.component.getValue());
                                                      });
                                                  },
                                              }
                                          }]
                                      }

                            ]
                        },
                         {
                             xtype: 'fieldset',
                             collapsible: true,
                             title: '违建信息',
                             layout:
                               {
                                   type: 'table',
                                   columns: 3,
                               },
                             fieldDefaults: {
                                 labelAlign: 'right',
                                 labelWidth: 100
                             },
                             defaults: {
                                 xtype: 'textfield',
                                 width: 312
                             },
                             items: [

                                  {
                                      fieldLabel: '违建类型',
                                      xtype: 'combo',
                                      editable: false,
                                      store: Ext.create('TianZun.store.sys.Dictionary', {
                                          proxy: {
                                              type: 'ajax',
                                              method: "Get",
                                              url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_wj_wjlx',
                                          }
                                      }),
                                      name: 'wj_wjtype',
                                      valueField: 'zd_id',
                                      displayField: 'zd_name',

                                      listeners: {
                                          beforerender: function (obj) {
                                              obj.setValue(me.record.wj_wjtype);
                                              this.getStore().load();
                                          },

                                      },
                                      //value: this.record.wj_wjtype,

                                  },
                                      //{
                                      //    fieldLabel: '违建类型',
                                      //    xtype: 'textfield',
                                      //    name: 'wj_wjtype',
                                      //    //allowBlank: false,
                                      //    margin: '20 0 10 0',
                                      //    value: this.record.wj_wjtype,

                                      //},
                                 {
                                     fieldLabel: '违建用途',
                                     xtype: 'textfield',
                                     //allowBlank: false,
                                     name: 'wj_use',
                                     margin: '20 0 10 0',
                                     value: this.record.wj_use,

                                 },
                                 {
                                     fieldLabel: '土地性质',
                                     xtype: 'textfield',
                                     name: 'wj_land',
                                     //allowBlank: false,
                                     margin: '0 0 10 0',
                                     value: this.record.wj_land,

                                 },
                                 {
                                     fieldLabel: '违建时间',
                                     xtype: 'datefield',
                                     name: 'wj_time',
                                     allowBlank: false,
                                     margin: '0 0 10 0',
                                     value:new Date(this.record.wj_time),
                                     format:'Y-m-d',
                                 },
                                 {
                                     fieldLabel: '占地面积',
                                     xtype: 'textfield',
                                     name: 'wj_landarea',
                                     //allowBlank: false,
                                     margin: '0 0 10 0',
                                     value: this.record.wj_landarea,
                                 },
                                 {
                                     fieldLabel: '违建面积',
                                     xtype: 'textfield',
                                     name: 'wj_wjarea',
                                     //allowBlank: false,
                                     margin: '0 0 10 0',
                                     value: this.record.wj_wjarea,
                                 },
                                 {
                                     fieldLabel: '建筑结构',
                                     xtype: 'textfield',
                                     name: 'wj_buildstructure',
                                     //allowBlank: false,
                                     margin: '0 0 10 0',
                                     value: this.record.wj_buildstructure,
                                 },
                                 {
                                     xtype: 'panel',
                                     border: false,
                                     colspan: 2,
                                     width: '100%',
                                     //margin: '0 0 0 10',
                                     layout: 'hbox',
                                     items: [
                                         {
                                             xtype: 'label',
                                             border: false,
                                             margin: '5 0 0 30',
                                             text: '建筑层数:',
                                         },
                                         {
                                             fieldLabel: '地上',
                                             xtype: 'textfield',
                                             margin: '2 0 0 0',
                                             width: '20%',
                                             labelWidth: 35,
                                             name: 'wj_layerup',
                                             //allowBlank: false,
                                             value: this.record.wj_layerup,
                                         },
                                         {
                                             fieldLabel: '地下',
                                             xtype: 'textfield',
                                             margin: '2 0 0 0',
                                             width: '20%',
                                             name: 'wj_layerdown',
                                             labelWidth: 35,
                                             //allowBlank: false,
                                             value: this.record.wj_layerdown,
                                         }]
                                 },
                                     {
                                         xtype: 'imageshowpanel',
                                         store: store1,
                                         titleNew: '附件',
                                         path: configs.IllegallyBuiltOriginalPath,
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
                                            afterRender: function (obj) {
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
                                                    post_params: { 'path': configs.IllegallyBuiltOriginalPath },
                                                    height: 200,
                                                })
                                            }

                                        },
                             ],
                         },
                          {
                              xtype: 'fieldset',
                              collapsible: true,
                              title: '处理结果',
                              layout:
                                {
                                    type: 'table',
                                    columns: 3,
                                },
                              fieldDefaults: {
                                  labelAlign: 'right',
                                  labelWidth: 75
                              },
                              defaults: {
                                  xtype: 'textfield',
                                  width: 312
                              },
                              items: [
                                    {
                                        fieldLabel: '<span style="color:red">*</span>处理结果',
                                        name: 'process',
                                        store: Ext.create('TianZun.store.illegalconstruction.IllegalllybuiltType'),
                                        displayField: 'Name',
                                        valueField: 'ID',
                                        xtype: 'combo',
                                        editable: false,
                                        allowBlank: false,
                                        value: this.record.process,
                                    },
                                    {
                                        fieldLabel: '是否归档',
                                        name: 'sfgd',
                                        xtype: 'radiogroup',
                                        //colspan: 2,
                                        items: [
                                            {
                                                boxLabel: '是',
                                                id: 'radioYes',
                                                name: 'isgd',
                                                inputValue: '1',
                                            },
                                            {
                                                boxLabel: '否',
                                                id: 'radioNo',
                                                name: 'isgd',
                                                inputValue: '0',
                                                //checked: true,
                                            }
                                        ],
                                        listeners: {
                                            render: function (obj) {
                                                if (me.record.isgd == 1)
                                                    Ext.getCmp('radioYes').setValue(true);
                                                else if (me.record.isgd == 0)
                                                    Ext.getCmp('radioNo').setValue(true);

                                            },
                                        }
                                    },
                                      {
                                          xtype: 'datetimefield',
                                          border: false,
                                          name: 'limittime',
                                          editable: false,
                                          //allowBlank: false,
                                          fieldLabel: '限办时间',
                                          margin: '10 0 10 0',
                                          format: 'Y-m-d H:i:s',
                                          value: new Date(this.record.limittime),
                                      },
                                    {
                                        fieldLabel: '上报人',
                                        xtype: 'textfield',
                                        name: 'reportuser',
                                        value: this.record.reportuser,
                                    },
                                      {
                                          xtype: 'datetimefield',
                                          border: false,
                                          name: 'reporttime',
                                          editable: false,
                                          //allowBlank: false,
                                          fieldLabel: '上报时间',
                                          margin: '10 0 10 0',
                                          format: 'Y-m-d H:i:s',
                                          value: new Date(this.record.reporttime),
                                      },
                                 //{
                                 //    xtype: 'panel',
                                 //    layout: 'hbox',
                                 //    border: false,
                                 //    //margin: '10 0 0 15',
                                 //    width: 300,
                                 //    items: [
                                 //        {
                                 //            xtype: 'box',
                                 //            html: '上报时间:',
                                 //            margin: '5 0 0 15',
                                 //            width: 65,
                                 //            editable: false,
                                 //        },
                                 //        {
                                 //            xtype: 'datefield',
                                 //            allowBlank: false,
                                 //            format: 'Y-m-d',
                                 //            name: 'reporttime1',
                                 //            width: 130,
                                 //            editable: false,
                                 //            value: new Date(this.record.reporttime),
                                 //        },
                                 //        {
                                 //            xtype: 'timefield',
                                 //            name: 'reporttime2',
                                 //            allowBlank: false,
                                 //            format: 'H:i',
                                 //            increment: 10,
                                 //            width: 80,
                                 //            editable: false,
                                 //            value: new Date(this.record.reporttime),
                                 //        },

                                 //    ]
                                 //},
                                   {
                                       xtype: 'datetimefield',
                                       border: false,
                                       name: 'foundtime',
                                       editable: false,
                                       //allowBlank: false,
                                       fieldLabel: '发现时间',
                                       margin: '10 0 10 0',
                                       format: 'Y-m-d H:i:s',
                                       value: new Date(this.record.foundtime),
                                   },
                                 //{
                                 //    xtype: 'panel',
                                 //    layout: 'hbox',
                                 //    border: false,
                                 //    //margin: '10 0 0 15',
                                 //    width: 300,
                                 //    items: [
                                 //        {
                                 //            xtype: 'box',
                                 //            html: '发现时间:',
                                 //            margin: '5 0 0 15',
                                 //            width: 65,
                                 //            editable: false,
                                 //        },
                                 //        {
                                 //            xtype: 'datefield',
                                 //            allowBlank: false,
                                 //            format: 'Y-m-d',
                                 //            name: 'foundtime1',
                                 //            width: 130,
                                 //            editable: false,
                                 //            value: new Date(this.record.foundtime),
                                 //        },
                                 //        {
                                 //            xtype: 'timefield',
                                 //            name: 'foundtime2',
                                 //            allowBlank: false,
                                 //            format: 'H:i',
                                 //            increment: 10,
                                 //            width: 80,
                                 //            editable: false,
                                 //            value: new Date(this.record.foundtime),
                                 //        },

                                 //    ]
                                 //},
                                 {
                                     fieldLabel: '备注',
                                     xtype: 'textarea',
                                     name: 'remark',
                                     colspan: 3,
                                     width: '96%',
                                     //allowBlank: false,
                                     margin: '0 0 10 0',
                                     value: this.record.remark,
                                 }
                              ],
                          },
                    ],
                },
                ],
            },
            {
                layout: 'fit',
                border: false,
                title: '历史记录',
                xtype: 'form',
                border: false,
                bodyPadding: 10,
                width: 800,
                overflowY: 'auto',
                items: {
                    xtype: 'grid',
                    columnLines: true,
                    columns: [
                            { header: '编辑时间', dataIndex: 'createtime', flex: 1 },
                            { header: '处理结果', dataIndex: 'process', flex: 1 },
                            { header: '是否归档', dataIndex: 'isgd', flex: 1 },
                            { header: '备注', dataIndex: 'remark', flex: 1 },
                    ],
                    store: store,
                    tbar: [
                              {
                                  text: '查看',
                                  handler: 'onLook',
                                  handleMouseEvents: false
                              },
                    ],
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    },
                },

            }],

            buttons: [{
                text: '提交',
                name: 'btnsubmit',
                handler: 'onEtidOK'
            }, {
                name: 'btnCancle',
                text: '取消',
                handler: 'onClose'
            }],

        }];

        this.callParent();
    }
});