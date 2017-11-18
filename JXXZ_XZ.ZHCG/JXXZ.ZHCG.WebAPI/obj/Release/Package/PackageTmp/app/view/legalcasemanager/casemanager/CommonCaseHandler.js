Ext.define('TianZun.view.legalcasemanager.casemanager.CommonCaseHandler', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.commonCaseHandler',

    requires: [
        'TianZun.controller.legalcasemanager.CommonCase',
    ],
    controller: 'commonCase',

    margin: '20 0 0 0',
    id: 'changePanel',
    name: 'changePanel',
    width: '76%',
    height: '100%',
    border: false,
    bodyBorder: false,
    overflowY: 'auto',
    initComponent: function () {
        var me = this;

        this.items = [
            {
                xtype: 'tabpanel',
                border: false,
                plain: true,
                id: 'allTab',
                bodyBorder: false,
                items: [
                    {
                        xtype: 'form',
                        name: 'indexINFO',
                        border: false,
                        title: '立案审批表',
                        width: '94%',
                        items: {
                            xtype: 'panel',
                            border: false,                            
                            listeners: {
                                afterrender: function (obj) {
                                    var content;
                                    if (me.record != null) {
                                        if (configs.AJDCZJBGARR.indexOf(me.record.get('wfdid')) >= 0) {
                                            obj.up('form').setTitle('案件调查终结报告');
                                            content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentCommoncaseHJWSJCB', { record: me.record, recordbaseinfo: me.recordbaseinfo, ishandle: me.ishandle });
                                        }
                                        else if (configs.GZSPBARR.indexOf(me.record.get('wfdid')) >= 0) {
                                            obj.up('form').setTitle('告知审批表');
                                            content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentCommoncaseHJWSJCB', { record: me.record, recordbaseinfo: me.recordbaseinfo, ishandle: me.ishandle });
                                        }
                                        else if (me.record.get('wfdid') == '2017030613500014') {
                                            obj.up('form').setTitle('开具并送达行政处罚报告');
                                            content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentCommoncaseXZCFJDBG', { record: me.record, recordbaseinfo: me.recordbaseinfo, ishandle: me.ishandle });
                                        }
                                        else if (me.record.get('wfdid') == '2017030613500015') {
                                            obj.up('form').setTitle('当事人意见反馈');
                                            content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentCommoncaseDSRYJFK', { record: me.record, recordbaseinfo: me.recordbaseinfo, ishandle: me.ishandle });
                                        }
                                        else if (me.record.get('wfdid') == '2017030613500016') {
                                            obj.up('form').setTitle('法制科听证结果上报');
                                            content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentCommoncaseFZKTZJGSB', { record: me.record, recordbaseinfo: me.recordbaseinfo, ishandle: me.ishandle });
                                        }
                                        else if (configs.CFJDSARR.indexOf(me.record.get('wfdid')) >= 0) {
                                            obj.up('form').setTitle('行政处罚决定');
                                            content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentCommoncaseHJWSJCB', { record: me.record, recordbaseinfo: me.recordbaseinfo, ishandle: me.ishandle });
                                        }                                        
                                        else if (me.record.get('wfdid') == '2017030613500022') {
                                            obj.up('form').setTitle('开具行政处罚决定书');
                                            content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentCommoncaseXZCFJDS', { record: me.record, recordbaseinfo: me.recordbaseinfo, ishandle: me.ishandle });
                                        }
                                        else if (configs.AJJABGARR.indexOf(me.record.get('wfdid')) >= 0) {
                                            obj.up('form').setTitle('案件结案报告');
                                            content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentCommoncaseHJWSJCB', { record: me.record, recordbaseinfo: me.recordbaseinfo, ishandle: me.ishandle });
                                        }
                                        else if (configs.QTSPSXARR.indexOf(me.record.get('wfdid')) >= 0) {
                                            obj.up('form').setTitle('相关事项审批表');
                                            content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentCommoncaseHJWSJCB', { record: me.record, recordbaseinfo: me.recordbaseinfo, ishandle: me.ishandle });
                                        }
                                        else {
                                            content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentCommoncaseDetail', { record: me.record, recordbaseinfo: me.recordbaseinfo,tabtitle:me.tabtitle });
                                        }
                                    } else if (me.record == null) {
                                        content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseAdd', { record: me.recordbaseinfo, recordsource: me.recordsource, recordcaseid: me.recordcaseid, recordtype: me.recordtype, recordaddress: me.recordaddress, recordtime: me.recordtime });
                                    }
                                    //加载页面
                                    obj.add(content);
                                }
                            }
                        },
                    },
                    {
                        xtype: 'form',
                        id: 'indexAJCL',
                        name: 'indexAJCL',
                        width: '100%',
                        border: false,
                        title: '案件处理',
                        listeners: {
                            afterrender: function (obj) {
                                var content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentCommoncaseDispose', { record: me.record, recordbaseinfo:me.recordbaseinfo,caseid: me.recordbaseinfo == null ? null : me.recordbaseinfo.caseid, ishandle: me.ishandle });
                                obj.add(content);
                            }
                        }
                    },
                    {
                        xtype: 'form',
                        width: '100%',
                        id: 'indexAJWS',
                        name: 'indexAJWS',
                        border: false,
                        title: '案件文书',
                        listeners: {
                            afterrender: function (obj) {
                                if (me.isshowframe != 0 && me.recordbaseinfo != null && me.recordbaseinfo.lastpdfpath != null && me.recordbaseinfo.lastpdfpath != '') {
                                    var content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentCommoncasePDF', { lastpdfpath: me.recordbaseinfo.lastpdfpath });
                                    obj.add(content);
                                }
                            }
                        }
                    },
                    {
                        xtype: 'form',
                        width: '100%',
                        id: 'indexLZRZ',
                        name: 'indexLZRZ',
                        border: false,
                        title: '流转日志',
                        listeners: {
                            afterrender: function (obj) {
                                if (me.record != null || me.recordbaseinfo != null) {
                                    var content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentCommoncaseNote', { wfsid: me.record == null ? me.recordbaseinfo.wfsid : me.record.get('wfsid') });
                                    obj.add(content);
                                } else {
                                    obj.add(Ext.create('Ext.form.Label', {                                        
                                        border: false,
                                        html: '<div style="text-align:center;font-size:16px;">暂无数据</div>',
                                    }));
                                }
                            }
                        }
                    },
                ],
                listeners: {
                    render: function (obj) {
                        if (me.ishandle == 0)
                            obj.tabBar.items.items[1].hide();
                    },
                    'tabchange': function (tabPanel, newCard, oldCard, eOpts) {
                        if (newCard.title == '案件处理' && me.record != null) {
                            var nextwfdid = null;
                            var cyCombo = Ext.getCmp('nextwfdid');
                            if (me.record.get('wfdid') == '2017030613500005') {
                                nextwfdid = Ext.getCmp('ajdx').getValue().ajdx;
                            }
                            if (me.record.get('wfdid') == '2017030613500015') {
                                nextwfdid = Ext.getCmp('dsryj').getValue().dsryj;
                                if (nextwfdid != '2017030613500016')
                                    nextwfdid = nextwfdid.split(',')[0];
                            }
                            if (me.record.get('wfdid') == '2017030613500022') {
                                nextwfdid = Ext.getCmp('dsrzxfs').getValue().dsrzxfs;
                                if (nextwfdid != '2017030613500027')
                                    nextwfdid = nextwfdid.split(',')[0];
                            }
                            if (cyCombo != null && nextwfdid != null) {
                                cyCombo.clearValue();
                                var nextdata = [];
                                var dataobj = cyCombo.getStore().data.items;
                                nextdata.push({ nextid: nextwfdid, nextname: '下一步' });
                                if (me.record.get('wfdid') != '2017030613500022')
                                    nextdata.push({ nextid: dataobj[1].data.nextid, nextname: '回退' });
                                cyStore = Ext.create('Ext.data.Store', { data: nextdata });
                                cyCombo.bindStore(cyStore, false);
                                cyStore.load();
                            }

                        }
                        if (newCard.title == "案件文书") {
                            var indexcode = tabPanel.down('documentIndexCode');
                            if (indexcode != null && me.isshowframe != 0) {
                                indexcode.destroy();
                                if (me.isshowframe != 0 && me.recordbaseinfo != null && me.recordbaseinfo.lastpdfpath != null && me.recordbaseinfo.lastpdfpath != '') {
                                    var content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentCommoncasePDF', { lastpdfpath: me.recordbaseinfo.lastpdfpath });
                                    tabPanel.down('form[name=indexAJWS]').add(content);
                                }
                            }
                        } else {
                            me.isshowframe = 1;
                        }
                    }
                }
            }
        ]


        this.callParent();
    }
})