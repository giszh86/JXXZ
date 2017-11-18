Ext.define('TianZun.view.conservation.conservationtask.TaskInfo', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.taskInfo',
    title: '任务详情',
    //layout: 'fit',
    requires: [
    'TianZun.ux.ImageShowPanel',
    ],
    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.conservation.YHAttrStore', { proxy: { type: 'ajax', extraParams: { yhtaskid: this.record.yhtaskid, wfdids: '2017040610570001' } } });
        var store1 = Ext.create('TianZun.store.conservation.YHAttrStore', { proxy: { type: 'ajax', extraParams: { yhtaskid: this.record.yhtaskid, wfdids: '2017040610570003' } } });
        this.items = [{
            xtype: 'tabpanel',
            border: false,
            plain: true,
            bodyBorder: false,
            bodyPadding: 10,
            items: [
                {
                    xtype: 'form',
                    border: false,
                    width: 950,
                    overflowY: 'auto',
                    title: '任务详情',
                    items: [
                          {
                              xtype: 'fieldset',
                              collapsible: true,
                              title: '基础信息',
                              margin: '0 30 20 10',
                              layout: {
                                  type: 'table',
                                  columns: 3,
                              },
                              fieldDefaults: {
                                  labelAlign: 'right',
                                  labelWidth: 90
                              },
                              defaults: {
                                  xtype: 'displayfield',
                                  width: 312
                              },
                              items: [
                                  {
                                      fieldLabel: '养护公司',
                                      xtype: 'displayfield',
                                      value: this.record.companyname,
                                  },
                                 {
                                     fieldLabel: '问题来源',
                                     xtype: 'displayfield',
                                     value: this.record.wtlyname,
                                 },
                                 {
                                     fieldLabel: '发现时间',
                                     xtype: 'displayfield',
                                     value: this.record.foundtime,
                                 },
                                 {
                                     fieldLabel: '案件编号',
                                     xtype: 'displayfield',
                                     value: this.record.yhtaskid,
                                 },
                                 {
                                     fieldLabel: '问题大类',
                                     xtype: 'displayfield',
                                     value: this.record.wtdlname,
                                 },
                                 {
                                     fieldLabel: '问题小类',
                                     xtype: 'displayfield',
                                     value: this.record.wtxlname,
                                 },
                                 {
                                     fieldLabel: '养护类型',
                                     xtype: 'displayfield',
                                     value: this.record.yhlxname,
                                 },
                                 {
                                     fieldLabel: '养护对象',
                                     xtype: 'displayfield',
                                     value: this.record.yhdxname,
                                 },
                                 {
                                     fieldLabel: '处理期限',
                                     xtype: 'displayfield',
                                     value: this.record.duetime + " 天",
                                 },
                                 {
                                     fieldLabel: '养护合同',
                                     xtype: 'displayfield',
                                     value: this.record.contractname,
                                 },
                                 {
                                     fieldLabel: '维修经费',
                                     xtype: 'displayfield',
                                     value: this.record.outlay + "元",
                                 },
                                 {
                                     fieldLabel: '工作量估算',
                                     xtype: 'displayfield',
                                     value: this.record.workload + " 人/天",
                                 },
                                 {
                                     fieldLabel: '当时天气',
                                     xtype: 'displayfield',
                                     value: this.record.weather,
                                 },
                                 {
                                     fieldLabel: '填报人',
                                     colspan: 2,
                                     xtype: 'displayfield',
                                     value: this.record.fileename,
                                 },

                                 {
                                     fieldLabel: '问题性质',
                                     xtype: 'displayfield',
                                     id: 'wtxzname',
                                     hidden: true,
                                     value: this.record.wtxzname,
                                 },
                                 {
                                     fieldLabel: '扣分',
                                     xtype: 'displayfield',
                                     hidden: true,
                                     id: 'points',
                                     value: this.record.points,
                                 },
                                {
                                    fieldLabel: '扣款',
                                    xtype: 'displayfield',
                                    hidden: true,
                                    id: 'debit',
                                    value: this.record.debit,
                                },
                                {
                                    fieldLabel: '下派人员',
                                    xtype: 'displayfield',
                                    hidden: true,
                                    id: 'sendusername',
                                    value: this.record.sendusername,
                                },
                             {
                                 fieldLabel: '下派意见',
                                 xtype: 'displayfield',
                                 colspan: 2,
                                 hidden: true,
                                 id: 'sendopinion',
                                 value: this.record.sendopinion,
                             },
                              {
                                  fieldLabel: '问题地址',
                                  xtype: 'displayfield',
                                  colspan: 3,
                                  width: "100%",
                                  value: this.record.wtaddress,
                              },
                             {
                                 fieldLabel: '问题描述',
                                 xtype: 'displayfield',
                                 colspan: 3,
                                 width: "100%",
                                 value: this.record.wtdescribe,
                             },
                              {
                                  xtype: 'imageshowpanel',
                                  store: store,
                                  titleNew: '处理前',
                                  path: configs.YhTaskOriginalPath,
                                  colspan: 3,
                                  width: '88%',
                              },

                              {
                                  xtype: 'imageshowpanel',
                                  store: store1,
                                  titleNew: '处理后',
                                  path: configs.YhTaskOriginalPath,
                                  colspan: 3,
                                  width: '88%',
                              },
                              ]
                          },

                    ],
                },
                     {
                         layout: 'fit',
                         border: false,
                         title: '历史记录',
                         items: {
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
                                 name: 'fieldsetHistory',
                                 layout: {
                                     type: 'table',
                                     columns: 3,
                                 },
                                 fieldDefaults: {
                                     labelAlign: 'right',
                                     labelWidth: 75
                                 },
                                 defaults: {
                                     xtype: 'displayfield',
                                     width: 312
                                 },
                             }]
                         },

                         listeners: {
                             render: function () {
                                 var myMask = new Ext.LoadMask(this, { msg: "正在加载数据..." });
                                 myMask.show();
                                 var fieldset = me.down('fieldset[name=fieldsetHistory]');
                                 Ext.Ajax.request({
                                     url: configs.WebApi + 'api/CitizenEvent/GetOldList?wfsid=' + me.record.wfsid,
                                     method: 'get',
                                     scope: this,
                                     success: function (response) {

                                         var datas = Ext.decode(response.responseText);
                                         for (data in datas)  // json数组的最外层对象  
                                         {
                                             Ext.each(datas[data], function (items) {
                                                 Ext.each(items, function (item) {
                                                     fieldset.add({
                                                         fieldLabel: '操作环节',
                                                         xtype: 'displayfield',
                                                         value: item.wfdname,
                                                     },
                                                     {
                                                         fieldLabel: '处理人',
                                                         xtype: 'displayfield',
                                                         value: item.username,
                                                     },
                                                     {
                                                         fieldLabel: '处理时间',
                                                         xtype: 'displayfield',
                                                         value: item.dealtime,
                                                     },
                                                     {
                                                         fieldLabel: '处理意见',
                                                         xtype: 'displayfield',
                                                         colspan: 3,
                                                         width: '100%',
                                                         margin: '-5 0 0 0',
                                                         value: item.content,
                                                     },
                                                     {
                                                         xtype: 'form',
                                                         width: 950,
                                                         height: 1,
                                                         colspan: 3
                                                     });
                                                 });
                                             });
                                         } myMask.hide();
                                     }
                                 });
                             }
                         }

                     }
            ],

            buttons: [{
                name: 'btnCancle',
                text: '取消',
                handler: 'onClose'
            }],

        }];

        this.callParent();
        if (this.record.sendusername != null) {
            Ext.getCmp('wtxzname').show(true);
            Ext.getCmp('points').show(true);
            Ext.getCmp('debit').show(true);
            Ext.getCmp('sendusername').show(true);
            Ext.getCmp('sendopinion').show(true);

        }

    }
});