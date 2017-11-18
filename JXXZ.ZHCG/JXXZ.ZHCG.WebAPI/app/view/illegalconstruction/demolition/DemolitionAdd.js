Ext.define('TianZun.view.illegalconstruction.demolition.DemolitionAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.demolitionAdd',
    title: '新增拆迁项目',
    layout: 'fit',
    initComponent: function () {
        var me = this;
        //地图配置
        var model = 1;
        var minX = 120.082421100261;
        var minY = 30.1979580315871;
        var maxX = 120.280283961832;
        var maxY = 30.2858486565871;
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 1000,
            height: 550,
            overflowY: 'auto',
            items:
                [
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '新增拆迁项目',
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
                            width: 310
                        },
                        items:
                            [
                                {
                                    xtype: 'hidden',
                                    name: 'createuserid',
                                    value: $.cookie("USER_ID")
                                },
                                {
                                    fieldLabel: '<span style="color:red">*</span>项目名称',
                                    xtype: 'textfield',
                                    name: 'projectname',
                                    allowBlank: false,
                                },
                                {
                                    fieldLabel: '<span style="color:red">*</span>项目负责人',
                                    xtype: 'textfield',
                                    name: 'projectleader',
                                    allowBlank: false,
                                },
                                {
                                    fieldLabel: '联系电话',
                                    xtype: 'textfield',
                                    name: 'contackphone',
                                },
                                {
                                    fieldLabel: '拆迁面积',
                                    name: 'cqarea',
                                    xtype: 'textfield',
                                    margin: '0 0 10 0',
                                    blankText: '请填写拆迁面积',
                                    regex: /^\d+(\.\d{1,2})?$/,
                                    regexText: '请输入正确的数据类型'
                                },
                                 {
                                     fieldLabel: '项目启动时间',
                                     xtype: 'datefield',
                                     editable: false,
                                     name: 'starttime',
                                     format: "Y-m-d",//日期的格式
                                     altFormats: "Y/m/d|Ymd",
                                 },
                                  {
                                      fieldLabel: '项目结束时间',
                                      xtype: 'datefield',
                                      editable: false,
                                      name: 'endtime',
                                      format: "Y-m-d",//日期的格式
                                      altFormats: "Y/m/d|Ymd",
                                  },
                                  {
                                      fieldLabel: '所属区域',
                                      xtype: 'combo',
                                      editable: false,
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

                                  },
                                  {
                                      fieldLabel: '拆迁地址',
                                      xtype: 'textfield',
                                      name: 'address',
                                      colspan: 2,
                                      width:'99.2%',
                                  },
                                  {
                                      xtype: 'panel',
                                      border: false,
                                      bodyBorder: false,
                                      colspan: 3,
                                      margin:'10 0 10 0',
                                      width: '100%',
                                      layout: {
                                          type: 'hbox',
                                          align: 'left'
                                      },
                                      items: [{
                                          xtype: 'label',
                                          html: '地理位置:',
                                          margin: '0 8 10 40'
                                      },
                                      {
                                          id: 'EVENT_COORDINATE_ID',
                                          name: 'geography',
                                          xtype: 'textfield',
                                          colspan: 3,
                                          width: '93.3%',
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
                                      width: '99.6%',
                                      heigh: 30,
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
                                              post_params: { 'path': configs.DemolitionOriginalPath },
                                              width: 500,
                                              height: 200,
                                          })
                                      }
                                  },
                            ],
                    }],
            buttons: [
                {
                    text: '提交',
                    name: 'btnsubmit',
                    handler: 'onAddcqOk',
                },
           {
               text: '取消',
               handler: 'onClose'
           }]
        }];
        this.callParent();
    },
});