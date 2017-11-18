Ext.define('TianZun.view.illegalconstruction.illegallybuilt.IllegallyBuiltInfoinfo', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.illegallyBuiltInfoinfo',
    title: '违建详情',
    layout: 'fit',

    requires: [
'TianZun.ux.ImageShowPanel',
    ],
    initComponent: function () {
        var me = this;
        var store1 = Ext.create('TianZun.store.illegalconstruction.GetFileUpload', { proxy: { type: 'ajax', extraParams: { id: this.record.wjid, type: 1 } } });
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
                    width: 280
                },
                items: [
                     {
                         xtype: 'hidden',
                         name: 'userid',
                         value: $.cookie("USER_ID")
                     },
                        {
                            fieldLabel: '户主（单位）',
                            xtype: 'displayfield',
                            name: 'code',
                            margin: '10 0 10 0',
                            value: this.record.wjholder,
                        },
                         {
                             fieldLabel: '联系电话',
                             xtype: 'displayfield',
                             name: 'code',
                             margin: '10 0 10 0',
                             value: this.record.contactphone,
                         },
                         {
                             fieldLabel: '身份',
                             xtype: 'displayfield',
                             name: 'code',
                             margin: '10 0 10 0',
                             value: this.record.holderidentity,
                         },
                         {
                             fieldLabel: '居住人口',
                             xtype: 'displayfield',
                             name: 'code',
                             margin: '0 0 10 0',
                             value: this.record.householdnum,
                         },
                        {
                            fieldLabel: '地址',
                            xtype: 'displayfield',
                            name: 'code',
                            margin: '0 0 10 0',
                            value: this.record.address,
                        },
                        {
                            fieldLabel: '土地性质',
                            xtype: 'displayfield',
                            name: 'code',
                            margin: '0 0 10 0',
                            value: this.record.landproperty,
                        },
                         {
                             fieldLabel: '建成时间',
                             xtype: 'displayfield',
                             name: 'code',
                             margin: '0 0 10 0',
                             value: Ext.Date.format(new Date(this.record.completiontime), "Y-m-d"),
                         },
                        {
                            fieldLabel: '土地证号',
                            xtype: 'displayfield',
                            name: 'code',
                            margin: '0 0 10 0',
                            value: this.record.landnum,
                        },
                        {
                            fieldLabel: '房产证号',
                            xtype: 'displayfield',
                            name: 'code',
                            margin: '0 0 10 0',
                            value: this.record.propertynum,
                        },
                        {
                            fieldLabel: '占地面积',
                            xtype: 'displayfield',
                            name: 'code',
                            margin: '0 0 10 0',
                            value: this.record.coverarea,
                        },
                        {
                            fieldLabel: '建筑面积',
                            xtype: 'displayfield',
                            name: 'code',
                            margin: '0 0 10 0',
                            value: this.record.buildarea,
                        },
                        {
                            fieldLabel: '建筑用途',
                            xtype: 'displayfield',
                            name: 'code',
                            margin: '0 0 10 0',
                            value: this.record.builduse,
                        }, {
                            fieldLabel: '建筑结构',
                            xtype: 'displayfield',
                            name: 'code',
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
                                      xtype: 'displayfield',
                                      margin: '2 0 0 0',
                                      width: '20%',
                                      labelWidth: 35,
                                      name: 'code',
                                      value: this.record.buildlayers_up,
                                  },
                                  {
                                      fieldLabel: '地下',
                                      xtype: 'displayfield',
                                      margin: '2 0 0 0',
                                      width: '20%',
                                      name: 'code',
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
                                  id: 'EVENT_COORDINATE_ID_INFO',
                                  name: 'grometry',
                                  value: this.record.geography,
                                  xtype: 'textfield',
                                  colspan: 3,
                                  width: '92%',
                                  autoShow: true,
                                  listeners: {
                                      render: function (p) {
                                          p.getEl().on('click', function (p) {
                                              CreateAarcgisMap('EVENT_COORDINATE_ID_INFO', '坐标', 0, 3, this.component.getValue());
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
                                 width: 280
                             },
                             items: [
                                      {
                                          fieldLabel: '违建类型',
                                          xtype: 'displayfield',
                                          name: 'code',
                                          margin: '20 0 10 0',
                                          value: this.record.zd_name,

                                      },
                                 {
                                     fieldLabel: '建筑用途',
                                     xtype: 'displayfield',
                                     name: 'code',
                                     margin: '20 0 10 0',
                                     value: this.record.wj_use,

                                 },
                                 {
                                     fieldLabel: '土地性质',
                                     xtype: 'displayfield',
                                     name: 'code',
                                     margin: '20 0 10 0',
                                     value: this.record.wj_land,

                                 },
                                 {
                                     fieldLabel: '违建时间',
                                     xtype: 'displayfield',
                                     name: 'code',
                                     margin: '0 0 10 0',
                                     value: Ext.Date.format(new Date(this.record.wj_time), "Y-m-d"),

                                 },
                                 {
                                     fieldLabel: '占地面积',
                                     xtype: 'displayfield',
                                     name: 'code',
                                     margin: '0 0 10 0',
                                     value: this.record.wj_landarea,
                                 },
                                 {
                                     fieldLabel: '违建面积',
                                     xtype: 'displayfield',
                                     name: 'code',
                                     margin: '0 0 10 0',
                                     value: this.record.wj_wjarea,
                                 },
                                 {
                                     fieldLabel: '建筑结构',
                                     xtype: 'displayfield',
                                     name: 'code',
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
                                             xtype: 'displayfield',
                                             margin: '2 0 0 0',
                                             width: '20%',
                                             labelWidth: 35,
                                             name: 'code',
                                             value: this.record.wj_layerup,
                                         },
                                         {
                                             fieldLabel: '地下',
                                             xtype: 'displayfield',
                                             margin: '2 0 0 0',
                                             width: '20%',
                                             name: 'code',
                                             labelWidth: 35,
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
                                  width: 280
                              },
                              items: [
                                    {
                                        fieldLabel: '处理结果',
                                        xtype: 'displayfield',
                                        name: 'code',
                                        margin: '20 0 10 0',
                                        value: (this.record.process == 0) ? "未拆除" : (this.record.process == 1) ? "拆除中" : "已拆除",
                                    },
                                    {
                                        fieldLabel: '是否归档',
                                        xtype: 'displayfield',
                                        name: 'code',
                                        //colspan: 2,
                                        margin: '20 0 10 0',
                                        value: (this.record.isgd == 0) ? "未归档" : "已归档",
                                    },
                                     {
                                         fieldLabel: '限办时间',
                                         xtype: 'displayfield',
                                         name: 'limittime',
                                         margin: '0 0 10 0',
                                         value: this.record.limittime,
                                     },
                                    {
                                        fieldLabel: '上报人',
                                        xtype: 'displayfield',
                                        name: 'code',
                                        margin: '0 0 10 0',
                                        value: this.record.reportuser,
                                    },
                                 {
                                     fieldLabel: '上报时间',
                                     xtype: 'displayfield',
                                     name: 'code',
                                     margin: '0 0 10 0',
                                     value: this.record.reporttime,
                                 },
                                 {
                                     fieldLabel: '发现时间',
                                     xtype: 'displayfield',
                                     name: 'code',
                                     margin: '0 0 10 0',
                                     value: this.record.foundtime,
                                 }, {
                                     fieldLabel: '备注',
                                     xtype: 'displayfield',
                                     name: 'code',
                                     width: '98%',
                                     colspan: 3,
                                     margin: '0 0 10 0',
                                     value: this.record.remark,
                                 }
                              ],
                          },
            ],
            buttons: [{
                text: '关闭',
                handler: 'onClose'
            }]
        }]
        this.callParent();
    }
})