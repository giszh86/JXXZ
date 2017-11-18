Ext.define('TianZun.view.legalcasemanager.documents.DocumentCommoncasePDF', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.documentCommoncasePDF',
    width: '100%',
    height: '100%',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        this.items = [
            {
                xtype: 'panel',
                border: false,                
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    ui: 'footer',
                    style: 'background:white;',
                    items: [
                        '->',
                        {
                            text: '编辑',
                            hidden:me.ishandle == 1?false:true,
                            handler: function (obj) {
                                if (me.wfsarecord.filetyoe == 3) {
                                    Ext.Ajax.request({
                                        url: configs.WebApi + 'api/Common/GetWFSADocumentInfo?id=' + me.wfsarecord.documentid + '&tablename=' + me.wfsarecord.filename,
                                        method: 'get',
                                        scope: this,
                                        success: function (response) {
                                            var records = JSON.parse(response.responseText);
                                            var page = obj.up('documentCommoncasePDF');
                                            var pageframe = page.down('panel[name=framepanel]');
                                            if (page.down(me.wfsarecord.doccode) != null)
                                                page.down(me.wfsarecord.doccode).destroy();
                                            if (pageframe != null)
                                                pageframe.destroy();
                                            var buttonpanel = obj.up('documentIndexCode').down('panel[name=buttonPanel]');
                                            buttonpanel.show();
                                            buttonpanel.down('button[name=btnsubmit]').hide();
                                            buttonpanel.down('button[name=btnedit]').show();
                                            var content = Ext.create('TianZun.view.legalcasemanager.documents.' + me.wfsarecord.doccode, { record: records, dwfsasid: me.wfsarecord == null ? null : me.wfsarecord.dwfsasid });
                                            page.add(content);
                                        }
                                    });
                                    
                                }
                            },
                        }, {
                            text: '删除',
                            hidden: me.ishandle == 1 ? false : true,
                            handler: function (obj) {
                                Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
                                    if (btn == "yes") {

                                        Ext.Ajax.request({
                                            url: configs.WebApi + 'api/Common/DeleteCaseDocument?dwfsasid=' + me.wfsarecord.dwfsasid,
                                            method: 'get',
                                            scope: this,
                                            success: function (response) {
                                                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                                                var caseSourceLeft = obj.up('caseSourceLeft');
                                                var simpleCaseLeft = obj.up('simpleCaseLeft');
                                                var commonCaseLeft = obj.up('commonCaseLeft');

                                                var documentIndex = obj.up('documentIndex');
                                                var uploadpanel = obj.up('form').down('uploadpanel');
                                                if (uploadpanel != null)
                                                    uploadpanel.store.removeAll();

                                                var content, addpage;
                                                if (caseSourceLeft != null) {//案源
                                                    content = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceLeft', { record: caseSourceLeft.record, wfdid: '2017022219200001', wfsname: '案源处理', wfsid: caseSourceLeft.record.get('wfsid'), ishandle: 1 });
                                                    addpage = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndex', { wfsarecord: documentIndex.wfsarecord, wfsaid: documentIndex.wfsaid, caseid: documentIndex.caseid, ishandle: 1, sourcetable: 'case_casesources' });
                                                    content.down('panel[name=sourceLeftPanel]').add(addpage);
                                                }
                                                else if (simpleCaseLeft != null) {//简易案件
                                                    content = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseLeft', { record: simpleCaseLeft.record, wfdid: '2017022219200001', wfsname: '简易案件结束', wfsid1: simpleCaseLeft.record.get('wfsid1'), wfsid2: simpleCaseLeft.record.get('wfsid2'), ishandle: 1 });
                                                    addpage = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndex', { wfsarecord: documentIndex.wfsarecord, wfsaid: documentIndex.wfsaid, caseid: documentIndex.caseid, ishandle: 1, sourcetable: 'case_simplecases' });
                                                    content.down('panel[name=simpleLeftPanel]').add(addpage);
                                                }
                                                else {//一般案件
                                                    content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseLeft', { record: commonCaseLeft.record, recordbaseinfo: commonCaseLeft.recordbaseinfo, ishandle: commonCaseLeft.ishandle });
                                                    addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseHandler', { record: commonCaseLeft.record, recordbaseinfo: commonCaseLeft.recordbaseinfo, ishandle: commonCaseLeft.ishandle, sourcetable: 'case_cases' });

                                                    var tabpanelcmp = addpage.down('tabpanel');
                                                    var tabdoc = tabpanelcmp.down('form[id=indexAJWS]');
                                                    addpage.isshowframe = 0;
                                                    tabpanelcmp.setActiveTab(tabdoc);
                                                    var indexcode = obj.up('commonCaseLeft').down('documentIndexCode');
                                                    var casepdf = obj.up('commonCaseLeft').down('documentCommoncasePDF');
                                                    if (indexcode != null) {
                                                        indexcode.destroy();
                                                    }
                                                    if (casepdf != null) {
                                                        casepdf.destroy();
                                                    }
                                                    var documentpanel = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndexCode', { wfsarecord: indexcode.wfsarecord, wfsaid: indexcode.wfsaid, caseid: indexcode.caseid, ishandle: indexcode.ishandle, sourcetable: indexcode.sourcetable });
                                                    tabdoc.add(documentpanel);

                                                    content.down('panel[name=commonLeftPanel]').add(addpage);                                                   
                                                }

                                                var view = Ext.ComponentQuery.query('viewport')[0];
                                                var panel = view.items.getAt(3)
                                                view.remove(panel)
                                                content.region = 'center';
                                                view.add(content);
                                            }
                                        });
                                    }

                                })
                            },
                        }, {
                            text: '文档下载',
                            handler: function (obj) {
                                me.filename = me.filename.replace(/\s+/g, "");
                                var url = '/FileDownLoad.ashx?FileName=' + me.filename + '.docx&FilePath=' + configs.LegalCasePath+me.lastwordpath;
                                window.location.href = url;
                            }
                        }
                    ]
                }]
            },            
            {
                xtype: 'panel',
                name: 'framepanel',
                html: '<iframe width="100%" height="100%" scrolling="no"  frameborder="0" height="100%" src="/GetPDFFile.ashx?PathClass=LegalCasePath&DocPath=' + me.lastpdfpath + '"></iframe>',
                listeners: {
                    afterrender: function (obj) {
                        var dicheight = 0;
                        if (obj.up('documentIndexCode') != null)
                            dicheight = obj.up('documentIndexCode').down('panel[name=fieldsetInfo]').getHeight()+45;
                        var panelheight = document.documentElement.clientHeight - obj.getPosition()[1] - dicheight;
                        obj.setSize('100%', panelheight);
                        obj.setHtml('<iframe width="100%" height="100%" scrolling="no"  frameborder="0" height="100%" src="/GetPDFFile.ashx?PathClass=LegalCasePath&DocPath=' + me.lastpdfpath + '"></iframe>');
                    }
                }
            }
        ]

        this.callParent();
    }
})