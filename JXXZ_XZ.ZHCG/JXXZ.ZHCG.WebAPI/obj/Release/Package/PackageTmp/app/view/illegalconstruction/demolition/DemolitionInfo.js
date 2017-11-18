Ext.define('TianZun.view.illegalconstruction.demolition.DemolitionInfo', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.demolitionInfo',
    title: '拆迁详情',


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
                            width: 312
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
                                name: 'code',
                                xtype: 'displayfield',
                                margin: '20 0 10 0',
                                value: this.record.projectname,
                            },
                           {
                               fieldLabel: '项目负责人',
                               name: 'code',
                               xtype: 'displayfield',
                               margin: '20 0 10 0',
                               value: this.record.projectleader,
                           },
                          {
                              fieldLabel: '联系电话',
                              name: 'code',
                              xtype: 'displayfield',
                              margin: '20 0 10 0',
                              value: this.record.contackphone,
                          },
                            {
                                fieldLabel: '拆迁面积',
                                name: 'code',
                                xtype: 'displayfield',
                                margin: '0 0 10 0',
                                value: this.record.cqarea,
                            },
                           {
                               fieldLabel: '启动时间',
                               name: 'code',
                               xtype: 'displayfield',
                               margin: '0 0 10 0',
                               value: this.record.starttime
                           },
                           {
                               fieldLabel: '结束时间',
                               name: 'code',
                               xtype: 'displayfield',
                               margin: '0 0 10 0',
                               value: this.record.endtime
                           },
                          {
                              fieldLabel: '所属区域',
                              name: 'code',
                              xtype: 'displayfield',
                              margin: '0 0 10 0',
                              value: this.record.ssqyname
                          },
                          {
                              fieldLabel: '拆迁地址',
                              name: 'code',
                              colspan: 3,
                              xtype: 'displayfield',
                              margin: '0 0 10 0',
                              value: this.record.address
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
                                   name: 'grometry',
                                   xtype: 'textfield',
                                   colspan: 3,
                                   value: this.record.geography,
                                   width: '93.5%',
                                   autoShow: true,
                                   listeners: {
                                       render: function (p) {
                                           p.getEl().on('click', function (p) {
                                               CreateAarcgisMap('EVENT_COORDINATE_ID', '坐标', 0, 3, this.component.getValue());
                                           });
                                       },
                                   }
                               }]
                           },
                            {
                                fieldLabel: '备注',
                                name: 'code',
                                colspan: 3,
                                xtype: 'displayfield',
                                margin: '0 0 10 0',
                                value: this.record.remark
                            },
                                {
                                    xtype: 'imageshowpanel',
                                    store: store,
                                    titleNew: '附件',
                                    path: configs.DemolitionOriginalPath,
                                    colspan: 3,
                                    width: '100%',
                                },

                        ]
                    }
            ],
            buttons: [{
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});