Ext.define('TianZun.controller.legalcasemanager.CommonCase', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.commonCase',

    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("commonCaseQuery");

        if (!win) {
            win = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseQuery');
            this.getView().add(win);
        }

        win.show();
    },

    //查询
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var casename = form.getForm().findField("casename").getValue();
        var casetypeid = form.getForm().findField("casetypeid").getValue();
        var stime = form.getForm().findField("stime").getValue();
        var etime = form.getForm().findField("etime").getValue();
        var wfdid = form.getForm().findField("wfdid").getValue();

        if ($.trim(stime) != null && $.trim(stime) != "" && $.trim(etime) != null && $.trim(etime) != "" && stime > etime) {
            Ext.Msg.alert('提示', '开始时间不得晚于结束时间');
            return;
        }

        var filters = [];

        if ($.trim(casename) != null && $.trim(casename) != "") {
            filters.push({ property: "casename", value: casename });
        }

        if ($.trim(casetypeid) != null && $.trim(casetypeid) != "") {
            filters.push({ property: "casetypeid", value: casetypeid });
        }

        if ($.trim(stime) != null && $.trim(stime) != "") {
            filters.push({ property: "stime", value: stime });
        }

        if ($.trim(etime) != null && $.trim(etime) != "") {
            filters.push({ property: "etime", value: etime });
        }

        if ($.trim(wfdid) != null && $.trim(wfdid) != "") {
            filters.push({ property: "wfdid", value: wfdid });
        }

        FilterStore(store, filters);

        win.hide();
    },

    //查看详情
    onDetail: function (obj, e) {
        var grid = obj.up('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        //获取详情
        Ext.Ajax.request({
            url: "/api/CommonCase/GetCaseModel?wfsid=" + record.get('wfsid'),
            method: 'get',
            scope: this,
            async:false,
            success: function (response) {
                var jsonstr = Ext.decode(response.responseText);
                var recordbaseinfo = jsonstr;
                var content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseLeft', { record: record, recordbaseinfo: recordbaseinfo, ishandle: 0 });
                var addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseHandler', { record: record, recordbaseinfo: recordbaseinfo, ishandle: 0, tabtitle: this.getView().down('tabpanel').getActiveTab().title });
                content.down('panel[name=commonLeftPanel]').add(addpage);
                var view = Ext.ComponentQuery.query('viewport')[0];
                var panel = view.items.getAt(3)                
                content.region = 'center';
                view.add(content);
                view.remove(panel)
                if (this.getView())
                    this.getView().destroy();
            }
        });
    },

    //处理待办案件
    onDispatch: function (obj, e) {
        var grid = obj.up('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];

        if ((record.get('casemode') == 1 || (record.get('casemode') == null && record.get('wfdid') == '2017030613500001'))) {
            //暂存详情
            Ext.Ajax.request({
                url: "/api/CommonCase/GetSaveCommonCase?caseid=" + record.get('caseid')+'&issave=1',
                method: 'get',
                scope: this,
                success: function (response) {
                    var jsonstr = Ext.decode(response.responseText);
                    var recordbaseinfo = jsonstr;
                    var content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseLeft', { record: record, recordbaseinfo: recordbaseinfo, ishandle: 1 });
                    var addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseHandler', { record: null, recordbaseinfo: recordbaseinfo, ishandle: 1 });
                    content.down('panel[name=commonLeftPanel]').add(addpage);
                    var view = Ext.ComponentQuery.query('viewport')[0];
                    var panel = view.items.getAt(3)
                    content.region = 'center';
                    view.add(content);
                    view.remove(panel)
                    if (this.getView())
                        this.getView().destroy();
                }
            });
        } else {
            //获取详情
            Ext.Ajax.request({
                url: "/api/CommonCase/GetCaseModel?wfsid=" + record.get('wfsid'),
                method: 'get',
                scope: this,
                success: function (response) {
                    var jsonstr = Ext.decode(response.responseText);
                    var recordbaseinfo = jsonstr;

                    var content, addpage;
                    var content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseLeft', { record: record, recordbaseinfo: recordbaseinfo, ishandle: 1 });
                    var addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseHandler', { record: record, recordbaseinfo: recordbaseinfo, ishandle: 1 });
                    content.down('panel[name=commonLeftPanel]').add(addpage);
                    var view = Ext.ComponentQuery.query('viewport')[0];
                    var panel = view.items.getAt(3)
                    content.region = 'center';
                    view.add(content);
                    view.remove(panel)
                    if (this.getView())
                        this.getView().destroy();
                }
            });
        }

    },

    //案件登记
    onAdd: function (button, e) {
        var content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseLeft', {ishandle:1});
        var addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseHandler', { ishandle: 1 });
        content.down('panel[name=commonLeftPanel]').add(addpage);
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)        
        content.region = 'center';
        view.add(content);
        view.remove(panel)
        if (this.getView())
            this.getView().destroy();
    },

    //登记案件
    onAddOK: function (button, e) {
        var form = button.up('form');
        var formData = form.getValues();

        if (button.text != '暂存') {
            var formJC = form.up('commonCaseHandler').down('form[name=indexINFO]').down('form');
            if (!formJC.isValid())
                return;
            var formDataJC = formJC.getValues();
            formData = $.extend(formData, formDataJC);
            formData['issave'] = 0;
        }

        if (form.isValid()) {

            Ext.Msg.show({
                title: '正在提交',
                msg: '正在提交，请稍候...',
            });

            PostAjax({
                url: "/api/CommonCase/AddCommonCase",
                data: formData,
                async:false,
                complete: function (jqXHR, textStatus, errorThrown) {
                    Ext.Msg.close();
                    if (textStatus == "success") {
                        var jsonstr = JSON.parse(jqXHR.responseText);
                        if (!jsonstr.success)//文书编号重复
                        {
                            Ext.MessageBox.show({ title: "警告", msg: "立案编号重复，请刷新！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                            return;
                        }

                        if (formData['issave'] == 0) {
                            var content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseList');
                            var view = Ext.ComponentQuery.query('viewport')[0];
                            var panel = view.items.getAt(3)
                            view.remove(panel)
                            content.region = 'center';
                            view.add(content);
                        } else {
                            var commonCaseLeft = button.up('commonCaseLeft');
                            $("#leftdpywfdid").html(jsonstr.wfdname);
                            $("#leftdpywfsid").html(formData['casebh']);
                            $("#leftdpysourcename").html(formData['casename']);

                            //调整左侧菜单样式
                            var infoPanel = commonCaseLeft.down('panel[name=infoPanel]');
                            var clientheight = infoPanel.getEl().query('.x-autocontainer-outerCt')[0].clientHeight
                            commonCaseLeft.down('panel[name=infoPanel]').setHeight(clientheight);

                            var commonCaseAdd = button.up('commonCaseAdd');
                            commonCaseLeft.wfsaid = jsonstr.wfsaid;
                            commonCaseLeft.caseid = jsonstr.caseid;
                            commonCaseLeft.wfsid = jsonstr.wfsid;
                            commonCaseLeft.nextwfsaid = jsonstr.nextwfsaid;
                            if (jsonstr.caseid !=null) {
                                commonCaseAdd.down('hidden[name=caseid]').setValue(jsonstr.caseid);
                                commonCaseAdd.down('hidden[name=savewfsid]').setValue(jsonstr.wfsid);
                            }
                            commonCaseLeft.down('hidden[name=leftwfsaid]').setValue(jsonstr.nextwfsaid);
                            $.each(commonCaseLeft.query('button[handler=onDocumentAction]'), function (key, item) {
                                item.caseid = jsonstr.caseid;
                            })
                        }
                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                    } else {
                        Ext.Msg.show({
                            title: "错误提示",
                            icon: Ext.Msg.ERROR,
                            msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                        });
                    }
                }
            });

        }
    },

    //grid单击关联撤销
    revokeClick: function (obj) {
        var grid = obj.up('grid');
        var sm = grid.getSelectionModel();
        var record = sm.getSelection()[0];
        if (record.get('wfdid') == '2017030613500001')
            grid.down('button[handler=onRevoke]').show();
        else
            grid.down('button[handler=onRevoke]').hide();
    },

    //案件撤销
    onRevoke: function (obj, e) {
        var grid = obj.up('grid');
        var store = grid.getStore();
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];

        Ext.Msg.confirm("提示", "您确定要撤销本案件吗？", function (btn) {
            if (btn == "yes") {
                Ext.Msg.show({
                    title: '正在提交',
                    msg: '正在提交，请稍候...',
                });

                PostAjax({
                    url: "/api/CommonCase/RevokeCommonCase?",
                    data: { userid: $.cookie('USER_ID'), wfsid: record.get('wfsid'), wfsaid: record.get('wfsaid') },
                    complete: function (jqXHR, textStatus, errorThrown) {
                        Ext.Msg.close();
                        var result = JSON.parse(jqXHR.responseText);
                        if (result.success == true) {
                            Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                            grid.getSelectionModel().clearSelections();
                            store.reload();
                        } else {
                            Ext.Msg.show({
                                title: "错误提示",
                                icon: Ext.Msg.ERROR,
                                msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：数据已有关联的数据,无法删除"
                            }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                        }
                    }
                });
            }
        })
    },

    //左侧已有文书
    onDocumentDetail: function (obj, record, item, index) {
        if (record.get('leaf') == false)
            return;
        var wfsarecord = { wfsaid: record.get('wfsaid'), id: record.get('id'), ddid: record.get('ddid'), code: record.get('code'), name: record.get('name') };
        var changePanel = obj.up('commonCaseLeft').down('panel[name=changePanel]');
        var tabpanelcmp = changePanel.down('tabpanel');
        var tabdoc = tabpanelcmp.down('form[id=indexAJWS]');
        changePanel.isshowframe = 0;
        tabpanelcmp.setActiveTab(tabdoc);
        var indexcode = obj.up('commonCaseLeft').down('documentIndexCode');
        var casepdf = obj.up('commonCaseLeft').down('documentCommoncasePDF');
        if (indexcode != null) {
            indexcode.destroy();
        }
        if (casepdf != null) {
            casepdf.destroy();
        }

        var documentpanel = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndexCode', { wfsarecord: wfsarecord, phaseid:record.get('phaseid'), ishandle: 0 });
        tabdoc.add(documentpanel);
    },

    //左侧操作文书
    onDocumentAction: function (obj) {
        var leftwfsaid = obj.up('commonCaseLeft').down('hidden[name=leftwfsaid]').getValue();
        if (leftwfsaid != "") {
            var changePanel = obj.up('commonCaseLeft').down('panel[name=changePanel]');
            var tabpanelcmp = changePanel.down('tabpanel');
            var tabdoc = tabpanelcmp.down('form[id=indexAJWS]');

            changePanel.isshowframe = 0;
            tabpanelcmp.setActiveTab(tabdoc);
            var indexcode = obj.up('commonCaseLeft').down('documentIndexCode');
            var casepdf = obj.up('commonCaseLeft').down('documentCommoncasePDF');
            if (indexcode != null) {
                indexcode.destroy();
            }
            if (casepdf != null) {
                casepdf.destroy();
            }

            var documentpanel = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndexCode', { wfsarecord: obj.wfsarecord, wfsaid: leftwfsaid, caseid: obj.caseid, ishandle: 1,wfdid:obj.wfdid, sourcetable: 'case_cases' });
            tabdoc.add(documentpanel);
        } else
            Ext.Msg.alert("提示", "请先提交一条案件");
    },

    //添加文书
    addFileButtonOK: function (obj) {
        var viewing = this.getView();
        var formbase = obj.up('form');
        var formbaseData = formbase.getValues();
        var commonCaseLeft = obj.up('commonCaseLeft');

        var form;
        if (formbaseData['actiontypeT'] == 1)
            form = obj.up('form').down('form[name=form1]');
        else if (formbaseData['actiontypeT'] == 2)
            form = obj.up('form').down('form[name=form2]');
        else
            form = obj.up('form').down('form[name=form3]');

        var formData = form.getValues();

        //文书扫描件
        if (formData['documentname'] == '文书扫描件') {
            form = obj.up('form').down('form[name=form3]');
            formData = form.getValues();
            formData['actiontype'] = 4;
        }

        if (formbaseData['actiontypeT'] == null) {
            Ext.Msg.alert("提示", "请选择操作方式!");
            return;
        }

        //是否有货物清单grid
        if (form.down('grid') != null && form.down('hidden[name=goodsValue]') != null) {
            var gridarr = [];
            form.down('grid').getStore().each(function (obj) {
                gridarr.push(obj.getData());
            }, form.down('grid').getStore())
            formData['goodsValue'] = gridarr;
        }

        //检查当前文书是否唯一文书
        var isunique = 0;
        var isisuniquedpara = obj.up('documentIndexCode').wfsarecord.isunique;
        Ext.Ajax.request({
            url: "/api/DucumentTemplet/GetWFSASList?wfsaid=" + form.getValues()['wfsaid'] + "&ddid=" + form.getValues()['ddid'] + "&wfdid=" + (commonCaseLeft.record == null ? '2017030613500001' : commonCaseLeft.record.get('wfdid')),
            method: 'get',
            scope: this,
            async: false,
            success: function (response) {
                var jsonstr = Ext.decode(response.responseText);
                if (isisuniquedpara == 1 && jsonstr.length > 0)
                    isunique++;
            }
        })
        if (isunique > 0) {
            Ext.Msg.alert('警告', '本文书是唯一文书');
            return;
        }

        //暂存详情
        var jsonstrtemp;
        Ext.Ajax.request({
            url: "/api/CommonCase/GetSaveCommonCase?caseid=" + (commonCaseLeft.record != null ? commonCaseLeft.record.get('caseid') : commonCaseLeft.caseid) + '&issave=' + (commonCaseLeft.record != null ? ((commonCaseLeft.record.get('casemode') == 1 || (commonCaseLeft.record.get('casemode') == null && commonCaseLeft.record.get('wfdid') == '2017030613500001')) ? 1 : 0) : 1),
            method: 'get',
            async:false,
            success: function (response) {
                jsonstrtemp = Ext.decode(response.responseText);
            }
        });

        if (commonCaseLeft.record == null) {// || (commonCaseLeft.record != null && commonCaseLeft.record.get('casemode') == 1)
            formData["wfsaid"] = commonCaseLeft.nextwfsaid == null ? jsonstrtemp.wfsaid : commonCaseLeft.nextwfsaid;
        }

        if (form.isValid()) {
            Ext.Msg.show({
                title: '正在提交',
                msg: '正在提交，请稍候...',
            });

            PostAjax({
                url: "/api/Common/AddCaseDocument",
                method: 'post',
                data: formData,
                complete: function (jqXHR, textStatus, errorThrown) {
                    Ext.Msg.close();
                    if (textStatus == "success") {
                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                        var documentIndexCode = obj.up('documentIndexCode');
                        var uploadpanel = obj.up('form').down('uploadpanel');
                        if (uploadpanel != null)
                            uploadpanel.store.removeAll();

                        var content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseLeft', { record: commonCaseLeft.record, recordbaseinfo: jsonstrtemp, wfsaid: commonCaseLeft.record != null ? commonCaseLeft.wfsaid : commonCaseLeft.nextwfsaid == null ? jsonstrtemp.wfsaid : commonCaseLeft.nextwfsaid, caseid: commonCaseLeft.caseid, ishandle: commonCaseLeft.ishandle, wfsid: commonCaseLeft.wfsid, wfsid2: commonCaseLeft.wfsid2 });
                        var addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseHandler', { record: commonCaseLeft.record != null ? ((commonCaseLeft.record.get('casemode') == 1 || (commonCaseLeft.record.get('casemode') == null && commonCaseLeft.record.get('wfdid') == '2017030613500001')) ? null : commonCaseLeft.record) : null, recordbaseinfo: jsonstrtemp, recordsource: jsonstrtemp.cswfsid, recordcaseid: jsonstrtemp.tzcsid, ishandle: commonCaseLeft.ishandle, sourcetable: 'case_cases' });

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
                        var documentpanel = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndexCode', { wfsarecord: documentIndexCode.wfsarecord, wfsaid: documentIndexCode.wfsaid, caseid: documentIndexCode.caseid, ishandle: documentIndexCode.ishandle, sourcetable: documentIndexCode.sourcetable });
                        tabdoc.add(documentpanel);

                        content.down('panel[name=commonLeftPanel]').add(addpage);
                        var view = Ext.ComponentQuery.query('viewport')[0];
                        var panel = view.items.getAt(3)
                        view.remove(panel)
                        content.region = 'center';
                        view.add(content);

                        var middleteam = content.down('commonCaseHandler').down('combo[name=middleteam]');
                        if (middleteam == null) {
                            content.down('commonCaseHandler').down('tabpanel').setActiveTab(0);
                        }
                    } else {
                        Ext.Msg.show({
                            title: "错误提示",
                            icon: Ext.Msg.ERROR,
                            msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！"
                        });
                    }
                }
            });

        }
    },

    //编辑文书
    editFileButtonOK: function (obj) {
        var form = obj.up('form');

        //是否有货物清单grid
        var formData = form.getValues();
        if (form.down('grid') != null && form.down('hidden[name=goodsValue]') != null) {
            var gridarr = [];
            form.down('grid').getStore().each(function (obj) {
                gridarr.push(obj.getData());
            }, form.down('grid').getStore())
            formData['goodsValue'] = gridarr;
        }

        if (form.isValid()) {
            Ext.Msg.show({
                title: '正在提交',
                msg: '正在提交，请稍候...',
            });

            PostAjax({
                url: "/api/Common/EditCaseDocument",
                method: 'post',
                data: formData,
                complete: function (jqXHR, textStatus, errorThrown) {
                    Ext.Msg.close();
                    if (textStatus == "success") {
                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                        var commonCaseLeft = obj.up('commonCaseLeft');

                        var documentIndexCode = obj.up('documentIndexCode');
                        var uploadpanel = obj.up('form').down('uploadpanel');
                        if (uploadpanel != null)
                            uploadpanel.store.removeAll();

                        var content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseLeft', { record: commonCaseLeft.record, recordbaseinfo: commonCaseLeft.recordbaseinfo, wfsaid: commonCaseLeft.wfsaid, caseid: commonCaseLeft.caseid, ishandle: commonCaseLeft.ishandle, wfsid: commonCaseLeft.wfsid });
                        var addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseHandler', { record: commonCaseLeft.record != null ? ((commonCaseLeft.record.get('casemode') == 1 || (commonCaseLeft.record.get('casemode') == null && commonCaseLeft.record.get('wfdid') == '2017030613500001')) ? null : commonCaseLeft.record) : null, recordbaseinfo: commonCaseLeft.recordbaseinfo, ishandle: commonCaseLeft.ishandle, sourcetable: 'case_cases' });

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
                        var documentpanel = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndexCode', { wfsarecord: documentIndexCode.wfsarecord, wfsaid: documentIndexCode.wfsaid, caseid: documentIndexCode.caseid, ishandle: documentIndexCode.ishandle, sourcetable: documentIndexCode.sourcetable });
                        tabdoc.add(documentpanel);

                        content.down('panel[name=commonLeftPanel]').add(addpage);
                        var view = Ext.ComponentQuery.query('viewport')[0];
                        var panel = view.items.getAt(3)
                        view.remove(panel)
                        content.region = 'center';
                        view.add(content);

                        var middleteam = content.down('commonCaseHandler').down('combo[name=middleteam]');
                        if (middleteam == null) {
                            content.down('commonCaseHandler').down('tabpanel').setActiveTab(0);
                        }
                    } else {
                        Ext.Msg.show({
                            title: "错误提示",
                            icon: Ext.Msg.ERROR,
                            msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                        });
                    }
                }
            });

        }
    },

    //流程暂存
    onFlowSaveOK: function (button, e) {
        var form = button.up('form');
        var formData = form.getValues();

        if (form.isValid()) {

            Ext.Msg.show({
                title: '正在提交',
                msg: '正在提交，请稍候...',
            });

            PostAjax({
                url: "/api/CommonCase/CommonCaseHandlerSave",
                data: formData,
                complete: function (jqXHR, textStatus, errorThrown) {
                    Ext.Msg.close();
                    if (textStatus == "success") {
                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                    } else {
                        Ext.Msg.show({
                            title: "错误提示",
                            icon: Ext.Msg.ERROR,
                            msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                        });
                    }
                }
            });

        }
    },

    //流程处理事件
    onHandleFlowOK: function (button) {
        var form = button.up('form');
        var formData = form.getValues();

        var formJC = form.up('commonCaseHandler').down('form[name=indexINFO]').down('form');
        var formDataJC = formJC.getValues();
        formData = $.extend(formData, formDataJC);

        if (formData['isreuserid'] == 1) {
            formData['dealuserid'] = $.cookie('USER_ID');
        }
        if (formData['casesource'] != null && formJC.down('combo[name=casesource]') != null) {
            formData['casesource'] = formJC.down('combo[name=casesource]').getRawValue();
        }

        if (formData['message'] != undefined && formData['message'] == "on") {
            formData['isSendMsg'] = 1;
        }
        else {
            formData['isSendMsg'] = 0;
        }

        if (form.isValid()) {
            //检查当前环节是否有必填文书
            var existarr = button.up('commonCaseLeft').down('panel[name=existpanel]').ExistDoc;
            var newexistarr = [];
            var isrequired = 0;
            var recordarrlength = 0;
            Ext.each(existarr, function (value, key) {
                if (value.children.length > 0) {
                    Ext.each(value.children, function (valuechild, keychild) {
                        newexistarr.push(valuechild.ddid);
                    })
                }
            })
            Ext.Ajax.request({
                url: 'api/DocumentConfig/GetRequireWfdddrsList',
                params: { wfdid: formData['wfdid'] },
                method: 'get',
                async: false,
                success: function (response) {
                    var recordarr = eval('(' + response.responseText + ')');
                    recordarrlength = recordarr.length;
                    Ext.each(recordarr, function (value, key) {
                        if (newexistarr.indexOf(value['ddid']) > 0)
                            isrequired++;
                    })
                }
            })

            if (isrequired != recordarrlength) {
                Ext.Msg.alert('警告', '本环节有必填的文书尚未书写');
                return;
            }

            var wspage = Ext.ComponentQuery.query('viewport')[0].items.getAt(3).down('commonCaseAdd');
            if (wspage != null && wspage.record != null) {
                formData['wfsid'] = wspage.record.wfsid;
                formData['wfsaid'] = wspage.record.wfsaid;
            }

            Ext.Msg.show({
                title: '正在提交',
                msg: '正在提交，请稍候...',
            });

            PostAjax({
                url: "/api/CommonCase/CommonCaseHandler",
                data: formData,
                complete: function (jqXHR, textStatus, errorThrown) {
                    Ext.Msg.close();
                    if (textStatus == "success") {
                        var content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseList');
                        var view = Ext.ComponentQuery.query('viewport')[0];
                        var panel = view.items.getAt(3)
                        view.remove(panel)
                        content.region = 'center';
                        view.add(content);
                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                    } else {
                        Ext.Msg.show({
                            title: "错误提示",
                            icon: Ext.Msg.ERROR,
                            msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                        });
                    }
                }
            });

        }
    },

    //流程回复事件
    onReply: function (button) {
        var form = button.up('form');
        var formData = form.getValues();

        if (form.isValid()) {

            Ext.Msg.show({
                title: '正在提交',
                msg: '正在提交，请稍候...',
            });

            PostAjax({
                url: "/api/CommonCase/CommonCaseReply",
                data: formData,
                complete: function (jqXHR, textStatus, errorThrown) {
                    Ext.Msg.close();
                    if (textStatus == "success") {
                        var content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseList');
                        var view = Ext.ComponentQuery.query('viewport')[0];
                        var panel = view.items.getAt(3)
                        view.remove(panel)
                        content.region = 'center';
                        view.add(content);
                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                    } else {
                        Ext.Msg.show({
                            title: "错误提示",
                            icon: Ext.Msg.ERROR,
                            msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                        });
                    }
                }
            });

        }
    },

    //关联案由列表
    onDJCaseSource: function (button, e) {
        var win = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseSourceList');
        this.getView().add(win);
        win.show();
    },

    //关联案源列表
    onCaseSource: function (button, e) {
        var win = Ext.create('TianZun.view.legalcasemanager.casemanager.CaseSourceFieldList');
        this.getView().add(win);
        win.show();
    },

    //关联案由事件
    onWrite: function (button, e) {
        var win = button.up('window');
        var grid = win.down('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        var sm = grid.getSelectionModel();
        var record = sm.getSelection()[0];

        this.getView().down('textfield[name=fromcasesource]').setValue(record.get('wfsid'));

        win.close();
    },    

    //文书编号刷新
    onReflush: function (button) {
        Ext.Ajax.request({
            url: "/api/CommonCase/GetCaseDocumentNumberByUnitId?unitid=" + $.cookie('UNIT_ID'),
            method: 'get',
            scope: this,
            async: false,
            success: function (response) {
                var wsbh = Ext.decode(response.responseText);
                button.up('panel').down('textfield[name=casebh]').setValue(wsbh);
            }
        });
    },

    //关闭弹窗
    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    },

    //隐藏弹窗
    onHide: function (obj) {
        var win = obj.up('window');
        win.hide();
    },

    //重置搜索条件
    onEmpty: function (button) {
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();
        var filter = [{

        }];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.close();
    },

    //返回到列表页面
    onReturnList: function (button) {
        var content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseList');
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        view.remove(panel)
        content.region = 'center';
        view.add(content);
        if (button.tabtitle == '已办案件')
            content.down('tabpanel').setActiveTab(1);
        else if (button.tabtitle == '撤销案件')
            content.down('tabpanel').setActiveTab(2);
        else if (button.tabtitle == '案件中心')
            content.down('tabpanel').setActiveTab(3);
    },

    //返回到详情页面
    onReturnDetail: function (obj) {
        var commonCaseLeft = obj.up('commonCaseLeft');
        if (commonCaseLeft.record != null) {
            var content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseLeft', { record: commonCaseLeft.record, recordbaseinfo: commonCaseLeft.recordbaseinfo, ishandle: commonCaseLeft.ishandle });
            var addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseHandler', { record: commonCaseLeft.ishandle == 1?null:commonCaseLeft.record, recordbaseinfo: commonCaseLeft.recordbaseinfo, ishandle: commonCaseLeft.ishandle });
            content.down('panel[name=commonLeftPanel]').add(addpage);
            var view = Ext.ComponentQuery.query('viewport')[0];
            var panel = view.items.getAt(3)
            view.remove(panel)
            content.region = 'center';
            view.add(content);
        }
        else if (commonCaseLeft.record == null && commonCaseLeft.caseid != null) {
            var store = Ext.create('TianZun.store.legalcasemanager.CommonCaseList',
            { proxy: { extraParams: { userid: $.cookie('USER_ID'), status: 1 } } });//待处理案件
            store.load({
                callback: function (records, operation, success) {
                    Ext.Array.each(records, function (item, key) {
                        if (item.get('caseid') == commonCaseLeft.caseid) {
                            //获取案件详情
                            Ext.Ajax.request({
                                url: "/api/CommonCase/GetSaveCommonCase?caseid=" + item.get('caseid') + '&issave=1',
                                method: 'get',
                                scope: this,
                                async: false,
                                success: function (response) {
                                    var jsonstr = Ext.decode(response.responseText);
                                    var recordbaseinfo = jsonstr;
                                    var content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseLeft', { record: item, recordbaseinfo: recordbaseinfo, ishandle: 1 });
                                    var addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseHandler', { record: null, recordbaseinfo: recordbaseinfo, ishandle: 1 });
                                    content.down('panel[name=commonLeftPanel]').add(addpage);
                                    var view = Ext.ComponentQuery.query('viewport')[0];
                                    var panel = view.items.getAt(3)
                                    view.remove(panel)
                                    content.region = 'center';
                                    view.add(content);                                    
                                }
                            });
                        }
                    })
                }
            })
        }
    }

});