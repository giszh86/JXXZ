Ext.define('TianZun.view.conservation.conservationlog.LogInfo', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.logInfo',
    title: '养护日志详情',
    layout: 'fit',
    requires: [
  'TianZun.ux.ImageShowPanel',
    ],

    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.conservation.GetFileUpload', { proxy: { type: 'ajax', extraParams: { id: this.record.yhlogid, type: 2 } } });
        this.items = [{
            xtype: 'form',
            border: false,
            autoScroll: true,
            bodyPadding: 10,
            width: 800,
            items: [
                {
                    xtype: 'fieldset',
                    collapsible: true,
                    title: '巡查日志',
                    margin: '10 0 0 0',
                    allowBlank:'auto',
                    layout: {
                        type: 'table',
                        columns: 3,
                    },
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 95,
                        margin: '10 10 10 0',
                    },
                    defaults: {
                        xtype: 'displayfield',
                        width: '97%',
                        editable: false,
                    },
                    items: [{
                        xtype: 'hidden',
                        name: 'yhlogid',
                        value: this.record.yhlogid,
                    }, {
                        fieldLabel: '<span style="color:red">*</span>养护合同名称',
                        name: 'yhcontract',
                        value: this.record.yhcontractname,
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>填报时间',
                        name: 'createtime',
                        xtype: 'displayfield',
                        format: 'Y-m-d H:i:s',
                        value: this.record.createtime,
                    }, {
                        fieldLabel: '<span style="color:red">*</span>巡查日期',
                        name: 'patroltime',
                        allowBlank: false,
                        xtype: 'displayfield',
                        editable: false,
                        renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                        value: this.record.patroltime,
                    }, {
                        fieldLabel: '填报人',
                        name: 'createusername',
                        colspan: 3,
                        editable: false,
                        value: $.cookie("USER_NAME"),
                    }, {
                        fieldLabel: '巡查说明',
                        name: 'patrolexplain',
                        allowBlank: false,
                        xtype: 'displayfield',
                        height:30,
                        colspan: 3,
                        width:'98%',
                        value: this.record.patrolexplain,
                    },
                    {
                        xtype: 'imageshowpanel',
                        store: store,
                        titleNew: '附件',
                        path: configs.YhLogOriginalPath,
                        colspan: 3,
                        width: '100%',
                    },
                    ]
                }
            ], buttons: [{
                text: '关闭',
                handler: 'onClose'
            }]
        }]
        this.callParent();
    }
});