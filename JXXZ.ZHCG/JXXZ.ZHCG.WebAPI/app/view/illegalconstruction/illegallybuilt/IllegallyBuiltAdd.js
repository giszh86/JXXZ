Ext.define('TianZun.view.illegalconstruction.illegallybuilt.IllegallyBuiltAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.illegallyBuiltAdd',
    title: '新增违建信息',
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
                items: [{
                    xtype: 'hidden',
                    name: 'createuserid',
                    value: $.cookie("USER_ID")
                },
                {
                    fieldLabel: '<span style="color:red">*</span>户主（单位）',
                    xtype: 'textfield',
                    name: 'wjholder',
                    allowBlank: false,
                },
                {
                    fieldLabel: '联系电话',
                    xtype: 'textfield',
                    name: 'contactphone',
                },
                {
                    fieldLabel: '身份',
                    xtype: 'textfield',
                    name: 'holderidentity',
                },
                {
                    fieldLabel: '居住人口',
                    xtype: 'textfield',
                    name: 'householdnum',
                },
                {
                    fieldLabel: '地址',
                    xtype: 'textfield',
                    name: 'address',
                },
               
                {
                    fieldLabel: '土地性质',
                    xtype: 'textfield',
                    name: 'landproperty',
                },
                  {
                      fieldLabel: '建成时间',
                      name: 'completiontime',
                      xtype: 'datefield',
                      margin: '0 0 10 0',
                      value: new Date(),
                      editable: true,
                      format: "Y-m-d",//日期的格式
                      altFormats: "Y/m/d|Ymd",
                  },
                {
                    fieldLabel: '土地证号',
                    xtype: 'textfield',
                    name: 'landnum',
                },
                {
                    fieldLabel: '房产证号',
                    xtype: 'textfield',
                    name: 'propertynum',
                },
                {
                    fieldLabel: '占地面积',
                    xtype: 'textfield',
                    name: 'coverarea',
                },
                {
                    fieldLabel: '建筑面积',
                    xtype: 'textfield',
                    name: 'buildarea',
                },
                {
                    fieldLabel: '建筑用途',
                    xtype: 'textfield',
                    name: 'builduse',
                },
                {
                    fieldLabel: '建筑结构',
                    margin: '10 0 10 0',
                    xtype: 'textfield',
                    name: 'buildstructure',
                },
                {
                    xtype: 'panel',
                    border: false,
                    layout: 'hbox',
                    colspan: 2,
                    width: '100%',
                    items: [
                        {
                            xtype: 'label',
                            border: false,
                            margin: '10 0 0 20',
                            text: '建筑层数:',
                        },
                        {
                            fieldLabel: '地上',
                            xtype: 'textfield',
                            margin: '5 0 0 0',
                            width: '19%',
                            labelWidth: 35,
                            name: 'buildlayers_up',
                        },
                        {
                            fieldLabel: '地下',
                            xtype: 'textfield',
                            margin: '5 0 0 0',
                            width: '19%',
                            labelWidth: 35,
                            name: 'buildlayers_down',
                        }]
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
                        margin: '0 8 10 20'
                    },
                    {
                        id: 'EVENT_COORDINATE_ID',
                        name: 'geography',
                        xtype: 'textfield',
                        colspan: 3,
                        width: '93%',
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

                     },


                //{
                //    fieldLabel: '违建类型',
                //    xtype: 'textfield',
                //    name: 'wj_wjtype',
                //},
                {
                    fieldLabel: '违建用途',
                    xtype: 'textfield',
                    name: 'wj_use',
                },
                 {
                     fieldLabel: '土地性质',
                     xtype: 'textfield',
                     name: 'wj_land',
                 },
              
                {
                    fieldLabel: '违建时间',
                    name: 'wj_time',
                    xtype: 'datefield',
                    margin: '0 0 10 0',
                    value: new Date(),
                    editable: true,
                    format: "Y-m-d",//日期的格式
                    altFormats: "Y/m/d|Ymd",
                },
                {
                    fieldLabel: '占地面积',
                    xtype: 'textfield',
                    name: 'wj_landarea',
                },
                {
                    fieldLabel: '违建面积',
                    xtype: 'textfield',
                    name: 'wj_wjarea',
                },
                {
                    fieldLabel: '建筑结构',
                    xtype: 'textfield',
                    magrin: '10 0 0 0',
                    name: 'wj_buildstructure',
                },
                {
                    xtype: 'panel',
                    border: false,
                    colspan: 2,
                    width: '100%',
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
                            width: '19%',
                            labelWidth: 35,
                            name: 'wj_layerup',
                        },
                        {
                            fieldLabel: '地下',
                            xtype: 'textfield',
                            margin: '2 0 0 0',
                            width: '19%',
                            labelWidth: 35,
                            name: 'wj_layerdown',
                        }]
                },
                 {
                     xtype: 'fieldset',
                     collapsible: true,
                     title: '上传附件',
                     colspan: 3,
                     width: '98%',
                     id: 'sc',
                     layout: 'fit',
                     items: [],
                     afterRender: function () {
                         Ext.getCmp('sc').add({
                             xtype: 'uploadpanel',
                             border: false,
                             //title: 'UploadPanel for extjs 4.0',
                             addFileBtnText: '选择文件...',
                             uploadBtnText: '上传',
                             removeBtnText: '移除所有',
                             cancelBtnText: '取消上传',
                             file_size_limit: 10000,//MB
                             upload_url: 'api/Common/UploadFile',
                             post_params: { 'path': configs.IllegallyBuiltOriginalPath },
                             width: 500,
                             height: 200,
                         })
                     }
                 },
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
                   fieldLabel: '处理结果',
                   name: 'process',
                   store: Ext.create('TianZun.store.illegalconstruction.IllegalllybuiltType'),
                   displayField: 'Name',
                   valueField: 'ID',
                   xtype: 'combo',
                   editable: false,

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
                            checked: true,
                        }
                    ],
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
                      value: new Date(),
                  },
                {
                    fieldLabel: '上报人',
                    xtype: 'textfield',
                    name: 'reportuser',
                    editable: false,
                    value: $.cookie("USER_NAME")
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
                     value: new Date(),
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
                 //            format: 'Y-m-d',
                 //            name: 'reporttime1',
                 //            width: 130,
                 //            editable: false,
                 //            value:new Date()
                 //        },
                 //        {
                 //            xtype: 'timefield',
                 //            name: 'reporttime2',
                 //            format: 'H:i',
                 //            increment: 10,
                 //            width: 80,
                 //            editable: false,
                 //            value: new Date()
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
                      value: new Date(),
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
                 //            format: 'Y-m-d',
                 //            name: 'foundtime1',
                 //            width: 130,
                 //            editable: false,
                 //        },
                 //        {
                 //            xtype: 'timefield',
                 //            name: 'foundtime2',
                 //            format: 'H:i',
                 //            increment: 10,
                 //            width: 80,
                 //            editable: false,
                 //        },

                 //    ]
                 //},
                 {
                     fieldLabel: '备注',
                     name: 'remark',
                     xtype: 'textarea',
                     colspan: 3,
                     height: 30,
                     width: '95%',

                 }
                ]
            }
            ],
            buttons: [{
                text: '提交',
                name: 'btnsubmit',
                handler: 'onAddOK'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }]
        this.callParent();
    }
})