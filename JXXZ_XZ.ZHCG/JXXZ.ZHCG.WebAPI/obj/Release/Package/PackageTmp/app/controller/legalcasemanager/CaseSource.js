Ext.define('TianZun.controller.legalcasemanager.CaseSource', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.caseSource',

    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("caseSourceQuery");

        if (!win) {
            win = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceQuery');
            this.getView().add(win);
        }

        win.show();
    },

    //查询
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var sourceid = form.getForm().findField("sourceid").getValue();
        var contact = form.getForm().findField("contact").getValue();
        var contactphone = form.getForm().findField("contactphone").getValue();
        var wfxwfsdz = form.getForm().findField("wfxwfsdz").getValue();

        var filters = [];

        if (typeof sourceid == "number") {
            filters.push({ property: "sourceid", value: sourceid });
        }

        if ($.trim(contact) != null && $.trim(contact) != "") {
            filters.push({ property: "contact", value: contact });
        }

        if ($.trim(contactphone) != null && $.trim(contactphone) != "") {
            filters.push({ property: "contactphone", value: contactphone });
        }

        if ($.trim(wfxwfsdz) != null && $.trim(wfxwfsdz) != "") {
            filters.push({ property: "wfxwfsdz", value: wfxwfsdz });
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

        var content = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceLeft', { record: record, wfdid: '2017022219200001', wfsname: '案源结束', wfsid: record.get('wfsid'), ishandle: 0 });
        var addpage = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceLook', { record: record, ishandle: 0,tabtitle:this.getView().down('tabpanel').getActiveTab().title });
        content.down('panel[name=sourceLeftPanel]').add(addpage);
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        view.remove(panel)
        content.region = 'center';
        view.add(content);
        if (this.getView())
            this.getView().destroy();
    },

    //处理待办案源
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

        var content = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceLeft', { record: record, wfdid: '2017022219200001', wfsname: '案源编辑', wfsid: record.get('wfsid'), ishandle: 1 });
        var addpage = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceLook', { record: record, ishandle: 1 });
        content.down('panel[name=sourceLeftPanel]').add(addpage);
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        view.remove(panel)
        content.region = 'center';
        view.add(content);
        if (this.getView())
            this.getView().destroy();
    },

    //案源登记
    onAdd: function (button, e) {
        var content = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceLeft', { wfdid: '2017022219200001', wfsname: '案源登记', ishandle: 1 });
        var addpage = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceAdd');
        content.down('panel[name=sourceLeftPanel]').add(addpage);
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        view.remove(panel)
        content.region = 'center';
        view.add(content);
        if (this.getView())
            this.getView().destroy();
    },

    //登记案源
    onAddOK: function (button, e) {
        var form = button.up('form');
        var formData = form.getValues();
        
        if (form.isValid()) {

            Ext.Msg.show({
                title: '正在提交',
                msg: '正在提交，请稍候...',
            });

            PostAjax({
                url: "/api/CaseSourceL/AddCaseSources",
                data: formData,
                complete: function (jqXHR, textStatus, errorThrown) {
                    Ext.Msg.close();
                    if (textStatus == "success") {
                        var jsonstr = JSON.parse(jqXHR.responseText);
                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                        if (formData['status'] == 1) {
                            var content, addpage;
                            var gridArr = Ext.ComponentQuery.query('viewport')[0].items.getAt(1).getEl().query('.x-grid-item');
                            gridArr[0].className = "x-grid-item";
                            if (formData['casetype'] == 2) {
                                content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseLeft', { wfdid: '2017030613500001', ishandle: 1, wfsname: '提出立案申请', casebh: '', casereason: '', wfsid2: jsonstr.wfsid, cswfsid: jsonstr.wfsid });
                                addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseHandler', { record: null, recordsource: jsonstr.wfsid, recordcaseid: jsonstr.caseid, recordtype: formData['sourceid'], recordaddress: formData['wfxwfsdz'], recordtime: formData['notetime'] });
                                content.down('panel[name=commonLeftPanel]').add(addpage)

                                gridArr[2].className = "x-grid-item x-grid-item-selected";//跳转到一般案件
                            } else {
                                content = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseLeft', { wfdid: '2017022219200001', wfsname: '登记', ishandle: 1, wfsid2: jsonstr.wfsid, cswfsid: jsonstr.wfsid });
                                addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseAdd', { recordsource: jsonstr.wfsid, recordcaseid: jsonstr.caseid, recordaddress: formData['wfxwfsdz'], recordtime: formData['notetime'] });
                                content.down('panel[name=simpleLeftPanel]').add(addpage)

                                gridArr[3].className = "x-grid-item x-grid-item-selected";//跳转到简易案件
                            }

                            var view = Ext.ComponentQuery.query('viewport')[0];
                            var panel = view.items.getAt(3)
                            view.remove(panel)
                            content.region = 'center';
                            view.add(content);                            
                        } else if (formData['status'] == 3) {
                            button.hide();
                            $('#leftdpywfsid').html(jsonstr.wfsid);
                            var caseSourceLeft = button.up('caseSourceLeft');
                            caseSourceLeft.wfsaid = jsonstr.wfsaid;
                            caseSourceLeft.caseid = jsonstr.caseid;
                            caseSourceLeft.wfsid = jsonstr.wfsid;
                            caseSourceLeft.down('hidden[name=leftwfsaid]').setValue(jsonstr.wfsaid);
                            $.each(caseSourceLeft.query('button[handler=onDocumentAction]'), function (key, item) {
                                item.caseid = jsonstr.caseid;
                            })
                        } else {
                            content = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceList');
                            var view = Ext.ComponentQuery.query('viewport')[0];
                            var panel = view.items.getAt(3)
                            view.remove(panel)
                            content.region = 'center';
                            view.add(content);
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

    //待处理案源类型单击事件
    onCaseSourceItemClick: function (obj) {
        var grid = obj.up('grid');
        var sm = grid.getSelectionModel();
        var record = sm.getSelection()[0];
        if (record.get('status') == 1) {
            this.getView().down('button[handler=onRegister]').show();
            this.getView().down('button[handler=onDispatch]').hide();
        } else {
            this.getView().down('button[handler=onDispatch]').show();
            this.getView().down('button[handler=onRegister]').hide();
        }
    },

    //处理案源
    onSubmitOK: function (obj) {
        var form = obj.up('panel[name=changePanel]').down('form');
        var formData = form.getValues();
        
        if (form.isValid()) {

            Ext.Msg.show({
                title: '正在提交',
                msg: '正在提交，请稍候...',
            });

            PostAjax({
                url: "/api/CaseSourceL/HandleCaseSources",
                data: formData,
                complete: function (jqXHR, textStatus, errorThrown) {
                    Ext.Msg.close();
                    if (textStatus == "success") {
                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));

                        if (formData['status'] == 1) {
                            var content, addpage;
                            var gridArr = Ext.ComponentQuery.query('viewport')[0].items.getAt(1).getEl().query('.x-grid-item');
                            gridArr[0].className = "x-grid-item";
                            if (formData['casetype'] == 2) {
                                content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseLeft', { wfdid: '2017030613500001', ishandle: 1, wfsname: '提出立案申请', casebh: '', casereason: '', wfsid2: formData['wfsid'], cswfsid: formData['wfsid'] });
                                addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseHandler', { record: null, recordsource: formData['wfsid'], recordcaseid: formData['caseid'], recordtype: formData['sourceid'], recordaddress: formData['wfxwfsdz'], recordtime: formData['notetime'] });
                                content.down('panel[name=commonLeftPanel]').add(addpage)

                                gridArr[2].className = "x-grid-item x-grid-item-selected";//跳转到一般案件
                            } else {
                                content = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseLeft', { wfdid: '2017022219200001', wfsname: '登记', ishandle: 1, wfsid2: formData['wfsid'], recordcaseid: formData['caseid'], cswfsid: formData['wfsid'] });
                                addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseAdd', { recordsource: formData['wfsid'], recordcaseid: formData['caseid'], recordaddress: formData['wfxwfsdz'], recordtime: formData['notetime'] });
                                content.down('panel[name=simpleLeftPanel]').add(addpage)

                                gridArr[3].className = "x-grid-item x-grid-item-selected";//跳转到简易案件
                            }
                            var view = Ext.ComponentQuery.query('viewport')[0];
                            var panel = view.items.getAt(3)
                            view.remove(panel)
                            content.region = 'center';
                            view.add(content);
                        } else {
                            var content = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceList');
                            var view = Ext.ComponentQuery.query('viewport')[0];
                            var panel = view.items.getAt(3)
                            view.remove(panel)
                            content.region = 'center';
                            view.add(content);
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

    //案源立案
    onRegister: function (obj) {
        var gridArr = Ext.ComponentQuery.query('viewport')[0].items.getAt(1).getEl().query('.x-grid-item');
        gridArr.length == 0?null:gridArr[0].className = "x-grid-item";

        var grid = obj.up('grid');
        var sm = grid.getSelectionModel();
        var record = sm.getSelection()[0];
        var content, addpage;

        if (record.get('casetype') == 2) {
            content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseLeft', { wfdid: '2017030613500001', ishandle: 1, wfsname: '提出立案申请', casebh: '', casereason: '', wfsaid: record.get('wfsaid'), wfsid2: record.get('wfsid'), cswfsid: record.get('wfsid') });
            addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseHandler', { record: null, recordbaseinfo: null, recordsource: record.get('wfsid'), recordcaseid: record.get('caseid'), recordtype: record.get('sourceid'), recordaddress: record.get('wfxwfsdz'), recordtime: record.get('notetime') });
            content.down('panel[name=commonLeftPanel]').add(addpage)

            gridArr.length == 0 ? null : gridArr[2].className = "x-grid-item x-grid-item-selected";//跳转到一般案件
        } else if (record.get('casetype') == 1) {
            content = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseLeft', { wfdid: '2017022219200001', wfsname: '登记', ishandle: 1, wfsid2: record.get('wfsid'), cswfsid: record.get('wfsid') });
            addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseAdd', { recordsource: record.get('wfsid'), recordcaseid: record.get('caseid'), recordaddress: record.get('wfxwfsdz'), recordtime: record.get('notetime') });
            content.down('panel[name=simpleLeftPanel]').add(addpage)

            gridArr.length == 0 ? null : gridArr[3].className = "x-grid-item x-grid-item-selected";//跳转到简易案件
        }

        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        content.region = 'center';
        view.add(content);
        view.remove(panel)
        if (this.getView())
            this.getView().destroy();
    },

    //左侧已有文书
    onDocumentDetail: function (obj, record, item, index) {
        if (record.get('leaf') == false)
            return;
        var wfsarecord = { wfsaid: record.get('wfsaid'), id: record.get('id'), ddid: record.get('ddid'), code: record.get('code'), name: record.get('name') };
        var content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndex', { wfsarecord: wfsarecord,phaseid:record.get('phaseid'), ishandle: 0 });
        var panel = obj.up('panel[name=sourceLeftPanel]');
        var oldpanel = obj.up('caseSourceLeft').down('panel[name=changePanel]');
        panel.remove(oldpanel);
        panel.add(content);
    },

    //左侧操作文书
    onDocumentAction: function (obj) {
        var leftwfsaid = obj.up('caseSourceLeft').down('hidden[name=leftwfsaid]').getValue();
        if (leftwfsaid != "") {
            var content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndex', { wfsarecord: obj.wfsarecord,wfdid:obj.wfdid, wfsaid: leftwfsaid, caseid: obj.caseid, ishandle: 1, sourcetable: 'case_casesources' });
            var panel = obj.up('panel[name=sourceLeftPanel]');
            var oldpanel = obj.up('caseSourceLeft').down('panel[name=changePanel]');
            panel.remove(oldpanel);
            panel.add(content);
        } else
            Ext.Msg.alert("提示", "请先提交一条案源");
    },

    //添加文书
    addFileButtonOK: function (obj) {
        var formbase = obj.up('form');
        var formbaseData = formbase.getValues();
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

        //是否有货物清单grid
        if (form.down('grid') != null && form.down('hidden[name=goodsValue]') !=null) {
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
            url: "/api/DucumentTemplet/GetWFSASList?wfsaid=" + form.getValues()['wfsaid'] + "&ddid=" + form.getValues()['ddid'] + "&wfdid=2017022219200001",
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

        if (formbaseData['actiontypeT'] == null) {
            Ext.Msg.alert("提示", "请选择操作方式!");
            return;
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
                        var caseSourceLeft = obj.up('caseSourceLeft');
                        var documentIndex = obj.up('documentIndex');
                        var uploadpanel = obj.up('form').down('uploadpanel');
                        if (uploadpanel != null)
                            uploadpanel.store.removeAll();

                        var content = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceLeft', { record: caseSourceLeft.record, wfdid: '2017022219200001', wfsname: '案源处理', wfsid: caseSourceLeft.record == null ? caseSourceLeft.wfsid : caseSourceLeft.record.get('wfsid'), wfsaid: caseSourceLeft.wfsaid, caseid: caseSourceLeft.caseid, ishandle: 1 });
                        var addpage = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndex', { wfsarecord: documentIndex.wfsarecord, wfsaid: documentIndex.wfsaid, caseid: documentIndex.caseid, ishandle: 1, sourcetable: 'case_casesources' });
                        content.down('panel[name=sourceLeftPanel]').add(addpage);
                        var view = Ext.ComponentQuery.query('viewport')[0];
                        var panel = view.items.getAt(3)
                        view.remove(panel)
                        content.region = 'center';
                        view.add(content);
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
                        var caseSourceLeft = obj.up('caseSourceLeft');
                        var documentIndex = obj.up('documentIndex');
                        var uploadpanel = obj.up('form').down('uploadpanel');
                        if (uploadpanel != null)
                            uploadpanel.store.removeAll();

                        var content = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceLeft', { record: caseSourceLeft.record, wfdid: '2017022219200001', wfsname: '案源处理', wfsid: caseSourceLeft.record == null ? caseSourceLeft.wfsid : caseSourceLeft.record.get('wfsid'), ishandle: 1 });
                        var addpage = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndex', { wfsarecord: documentIndex.wfsarecord, wfsaid: documentIndex.wfsaid, caseid: documentIndex.caseid, ishandle: 1, sourcetable: 'case_casesources' });
                        content.down('panel[name=sourceLeftPanel]').add(addpage);
                        var view = Ext.ComponentQuery.query('viewport')[0];
                        var panel = view.items.getAt(3)
                        view.remove(panel)
                        content.region = 'center';
                        view.add(content);
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

    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    },

    onHide: function (button) {
        var win = button.up('window');
        win.close();
    },

    onEmpty: function (button) {
        var panelTitle = this.getView().down('tabpanel').activeTab.title;
        var panelName = panelTitle == '待处理案源' ? 'todoPanel' : panelTitle == '已处理案源' ? 'finishPanel' : 'allPanel';
        button.up('form').reset();
        var grid = this.getView().down('panel[name=' + panelName + ']').child('gridpanel');
        var store = grid.getStore();
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
        var content = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceList');
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        view.remove(panel)
        content.region = 'center';
        view.add(content);
        if(button.tabtitle=='已处理案源')
            content.down('tabpanel').setActiveTab(1);
        else if(button.tabtitle=='全部案源')
            content.down('tabpanel').setActiveTab(2);
    },

    //返回到详情页面
    onReturnDetail: function (obj) {
        var caseSourceLeft = obj.up('caseSourceLeft');
        if (caseSourceLeft.record != null) {
            var view = Ext.ComponentQuery.query('viewport')[0];
            var panel = view.items.getAt(3)
            view.remove(panel)
            var content = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceLeft', { record: caseSourceLeft.record, wfdid: caseSourceLeft.wfdid, wfsname: caseSourceLeft.wfsname, wfsid: caseSourceLeft.wfsid, ishandle: caseSourceLeft.ishandle });
            var addpage = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceLook', { record: caseSourceLeft.record, ishandle: caseSourceLeft.ishandle });
            content.down('panel[name=sourceLeftPanel]').add(addpage);
            content.region = 'center';
            view.add(content);
        }
        else if (caseSourceLeft.record == null && caseSourceLeft.caseid != null) {
            var store = Ext.create('TianZun.store.legalcasemanager.TodoCaseSource', { proxy: { extraParams: { userid: $.cookie('USER_ID') } } });
            store.load({
                callback: function (records, operation, success) {
                    Ext.Array.each(records, function (item, key) {
                        if (item.get('caseid') == caseSourceLeft.caseid) {
                            var content = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceLeft', { record: item, wfdid: caseSourceLeft.wfdid, wfsname: caseSourceLeft.wfsname, wfsid: caseSourceLeft.wfsid, ishandle: caseSourceLeft.ishandle });
                            var addpage = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceLook', { record: item, ishandle: caseSourceLeft.ishandle });
                            content.down('panel[name=sourceLeftPanel]').add(addpage);
                            var view = Ext.ComponentQuery.query('viewport')[0];
                            var panel = view.items.getAt(3)
                            view.remove(panel)
                            content.region = 'center';
                            view.add(content);
                        }
                    })
                }
            })
        }
    }

});