Ext.define('TianZun.view.legalcasemanager.casemanager.CommonCaseLeft', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.commonCaseLeft',
    title: '执法办案管理 > 案件管理 > 一般案件',
    layout: 'fit',

    requires: [
        'TianZun.controller.legalcasemanager.CommonCase',
    ],
    controller: 'commonCase',

    height: '100%',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        this.items = [
            {
                layout: 'hbox',
                border: false,
                xtype: 'panel',
                name: 'commonLeftPanel',
                items: [
                    {
                        xtype: 'panel',
                        width: '20%',                        
                        margin: '20 0 0 20',
                        layout: 'vbox',
                        maxHeight: window.innerHeight * 0.8,
                        overflowY: 'auto',
                        border: false,
                        items: [
                            {
                                xtype: 'button',
                                width: '100%',
                                //height: 40,
                                style: 'border:1px solid #3B6193;text-align: center;line-height: 40px;font-size: 14px;background: white;',
                                html: '<b style="color: #3B6193;">一般案件流程</b>',
                                handler: 'onReturnDetail',
                            },
                            {
                                xtype: 'panel',
                                width: '100%',
                                //minHeight: 0,
                                //maxHeight: 150,
                                //overflowY: 'auto',
                                margin: '10 0 0 0',
                                name:'infoPanel',
                                items: [
                                    {
                                        xtype: 'box',
                                        height: 'auto',
                                        width: '100%',
                                        style: 'line-height: 30px;font-size: 14px;border-bottom: 1px solid #c2c2c2;',
                                        html: '<b style="margin-left:20px;">概要信息</b>',
                                    },
                                    {
                                        xtype: 'box',
                                        height: 'auto',
                                        width: '100%',
                                        style: 'margin-top:5px;margin-bottom:5px;',
                                        html: '<label style="float: left;display: inline-block;margin-left:20px;">当前环节：</label><label id="leftdpywfdid" style="width:50%;display: inline-block;margin-right: 20px;">' + (me.record == null ? '提出立案申请' : me.record.get('wfsname')) + '</label>',
                                    },
                                    {
                                        xtype: 'box',
                                        height: 'auto',
                                        width: '100%',
                                        style: 'margin-bottom:5px;',
                                        html: '<label style="float: left;display: inline-block;margin-left:20px;">案件编号：</label><label id="leftdpywfsid" style="width:50%;display: inline-block;margin-right: 20px;">' + (me.record == null ? '' : me.record.get('casebh')) + '</label>',
                                    },
                                    {
                                        xtype: 'box',
                                        width: '100%',
                                        height: 'auto',
                                        style: 'margin-bottom:5px;',
                                        html: '<label style="float: left;display: inline-block;margin-left:20px;">案件名称：</label><label id="leftdpysourcename" style="width:50%;display: inline-block;margin-right: 20px;">' + (me.record == null ? '' : me.record.get('casename')) + '</label>',
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'leftwfsaid',
                                        value: me.record == null ? me.wfsaid : me.record.get('wfsaid')
                                    },
                                ]
                            },
                            {
                                xtype: 'panel',                                
                                width: '100%',
                                //overflowY: 'auto',
                                margin: '10 0 0 0',
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'box',
                                        height: 30,
                                        width: '100%',
                                        style: 'line-height: 30px;font-size: 14px;border-bottom: 1px solid #c2c2c2;',
                                        html: '<b style="margin-left:20px;">已有文书</b>',
                                    },
                                    {
                                        xtype: 'panel',
                                        width: '100%',
                                        name: 'existpanel',
                                        //minHeight: 0,
                                        //maxHeight: 150,
                                        border: false,
                                        //overflowX: 'auto',
                                        //overflowY: 'auto',
                                        listeners: {
                                            render: function (obj) {
                                                if ((me.record != null && me.record.get('wfsid') != null) || me.wfsid != null || me.cswfsid !=null) {
                                                    var urltemp = configs.WebApi + 'api/CommonCase/GetCaseDocList?ddtablename=case_cases&wfsid=' + (me.record == null ? me.wfsid : me.record.get('wfsid')) + '&wfsid2=' + (me.record == null ? me.wfsid2 : me.record.get('wfsid2'));
                                                    if (me.cswfsid != null)
                                                        urltemp = configs.WebApi + 'api/CommonCase/GetCaseDocList?ddtablename=case_casesources&wfsid=' + me.cswfsid;
                                                    Ext.Ajax.request({
                                                        url: urltemp,
                                                        method: 'get',
                                                        scope: this,
                                                        success: function (response) {
                                                            var records = JSON.parse(response.responseText);
                                                            this.ExistDoc = records;
                                                            var treepanel = Ext.create('Ext.tree.Panel', {
                                                                rootVisible: false,
                                                                border: false,
                                                                root: {
                                                                    children: records
                                                                },
                                                                listeners: {
                                                                    itemclick: 'onDocumentDetail'
                                                                }
                                                            })
                                                            this.add(treepanel);
                                                        }
                                                    });
                                                }    
                                            }
                                        }
                                    }
                                ],
                            },
                            {
                                xtype: 'panel',
                                width: '100%',
                                //minHeight: 0,
                                //maxHeight: 200,
                                //overflowY:'auto',
                                margin: '10 0 0 0',
                                hidden: me.ishandle == 1 ? false : true,
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'box',
                                        height: 30,
                                        width: '100%',
                                        style: 'line-height: 30px;font-size: 14px;border-bottom: 1px solid #c2c2c2;',
                                        html: '<b style="margin-left:20px;">操作面板</b>',
                                    },
                                ],
                                listeners: {
                                    render: function () {
                                        if (me.ishandle == 1) {
                                            Ext.Ajax.request({
                                                url: configs.WebApi + 'api/DucumentTemplet/GetDefinitionsList?wfdid=' + (me.record == null ? '2017030613500001' : me.record.get('wfdid')),
                                                method: 'get',
                                                scope: this,
                                                success: function (response) {
                                                    var records = JSON.parse(response.responseText);
                                                    for (var i = 0; i < records.length; i++) {
                                                        var panel = Ext.create('Ext.button.Button', {
                                                            border: false,
                                                            margin: '5 0 0 10',
                                                            style: 'background: white;font-size:14px;',
                                                            html: (records[i].isrequired == 0 && records[i].isunique == 0) ? '<div style="color:#3892d4;">' + records[i].name + '</div>' : (records[i].isrequired == 0 && records[i].isunique == 1) ? '<div><label style="color:#c27116;">*</label><label style="color:#3892d4;">' + records[i].name + '</label></div>' : (records[i].isrequired == 1 && records[i].isunique == 0) ? '<div><label style="color:red;">*</label><label style="color:#3892d4;">' + records[i].name + '</label></div>' : '<div><label style="color:red;">*</label><label style="color:#3892d4;">' + records[i].name + '</label></div>',
                                                            caseid: me.record != null ? me.record.get('caseid') : me.recordbaseinfo != null ? me.recordbaseinfo.caseid : me.caseid,
                                                            wfdid: me.record == null ? '2017030613500001' : me.record.get('wfdid'),
                                                            wfsarecord: records[i],
                                                            handler: 'onDocumentAction',
                                                        })
                                                        this.add(panel);
                                                    }

                                                }
                                            });
                                        }
                                    }
                                },
                            },
                        ]
                    },
                    {
                        xtype: 'panel',
                        width: '2%',
                        height: '100%',
                        border: false,
                    },
                ]
            }


        ]

        this.callParent();
    }
})