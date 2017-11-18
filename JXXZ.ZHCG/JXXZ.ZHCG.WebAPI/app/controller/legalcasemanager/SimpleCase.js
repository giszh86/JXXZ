Ext.define('TianZun.controller.legalcasemanager.SimpleCase', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.simpleCase',

    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("simpleCaseQuery");

        if (!win) {
            win = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseQuery');
            this.getView().add(win);
        }

        win.show();
    },

    //查询
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var casereason = form.getForm().findField("casereason").getValue();
        var caseaddress = form.getForm().findField("caseaddress").getValue();
        var pf_name = form.getForm().findField("pf_name").getValue();
        var stime = form.getForm().findField("stime").getValue();
        var etime = form.getForm().findField("etime").getValue();
        var filters = [];

        if ($.trim(stime) != null && $.trim(stime) != "" && $.trim(etime) != null && $.trim(etime) != "" && stime > etime) {
            Ext.Msg.alert('提示', '开始时间不得晚于结束时间');
            return;
        }

        if ($.trim(casereason) != null && $.trim(casereason) != "") {
            filters.push({ property: "casereason", value: casereason });
        }

        if ($.trim(caseaddress) != null && $.trim(caseaddress) != "") {
            filters.push({ property: "caseaddress", value: caseaddress });
        }

        if ($.trim(pf_name) != null && $.trim(pf_name) != "") {
            filters.push({ property: "pf_name", value: pf_name });
        }

        if ($.trim(stime) != null && $.trim(stime) != "") {
            filters.push({ property: "stime", value: stime });
        }

        if ($.trim(etime) != null && $.trim(etime) != "") {
            filters.push({ property: "etime", value: etime });
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
        var tab = this.getView().down('tabpanel').getActiveTab();
        var tabtitle = tab.title;
        var content = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseLeft', { record: record, wfdid: '2017022316250002', wfsname: '结束', wfsid1: record.get('wfsid1'), wfsid2: record.get('wfsid2'), ishandle: 0, tabtitle: tabtitle });
        var addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseLook', { record: record, ishandle: 0, tabtitle: tabtitle });
        content.down('panel[name=simpleLeftPanel]').add(addpage);
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        view.remove(panel)
        content.region = 'center';
        view.add(content);
        if (this.getView())
            this.getView().destroy();
    },

    //编辑
    onEdit: function (obj, e) {
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

        var content = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseLeft', { record: record, wfdid: '2017022316250001', wfsname: '编辑', ishandle: 1 });
        var addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseAdd', { record: record, ishandle: 1 });
        content.down('panel[name=simpleLeftPanel]').add(addpage);
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        view.remove(panel)
        content.region = 'center';
        view.add(content);
        if (this.getView())
            this.getView().destroy();
    },

    //编辑
    onEditOK: function (obj, e) {
        var form = obj.up('form');
        var formData = form.getValues();

        if (form.isValid()) {

            Ext.Msg.show({
                title: '正在提交',
                msg: '正在提交，请稍候...',
            });

            PostAjax({
                url: "/api/SimpleCase/EditSimpleCase",
                data: formData,
                complete: function (jqXHR, textStatus, errorThrown) {
                    Ext.Msg.close();
                    if (textStatus == "success") {
                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                        var content = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseList');
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

    //案件登记
    onAdd: function (button, e) {
        var content = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseLeft', { wfdid: '2017022316250001', wfsname: '登记', ishandle: 1 });
        var addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseAdd');
        content.down('panel[name=simpleLeftPanel]').add(addpage);
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        view.remove(panel)
        content.region = 'center';
        view.add(content);
        if (this.getView())
            this.getView().destroy();
    },

    //登记案件
    onAddOK: function (button, e) {
        var form = button.up().up().up();
        var formData = form.getValues();

        if (form.isValid()) {

            Ext.Msg.show({
                title: '正在提交',
                msg: '正在提交，请稍候...',
            });

            PostAjax({
                url: "/api/SimpleCase/AddSimpleCase",
                data: formData,
                complete: function (jqXHR, textStatus, errorThrown) {
                    Ext.Msg.close();
                    if (textStatus == "success") {
                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                        var content = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseList');
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

    //左侧已有文书
    onDocumentDetail: function (obj, record, item, index) {
        if (record.get('leaf') == false)
            return;
        var wfsarecord = { wfsaid: record.get('wfsaid'), id: record.get('id'), ddid: record.get('ddid'), code: record.get('code'), name: record.get('name') };
        var content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndex', { wfsarecord: wfsarecord,phaseid:record.get('phaseid'), ishandle: 0 });
        var panel = obj.up('panel[name=simpleLeftPanel]');
        var oldpanel = obj.up('simpleCaseLeft').down('panel[name=changePanel]');
        panel.remove(oldpanel);
        panel.add(content);
    },

    //左侧操作文书
    onDocumentAction: function (obj) {
        var leftwfsaid = obj.up('simpleCaseLeft').down('hidden[name=leftwfsaid]').getValue();
        if (leftwfsaid != "") {
            var content = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndex', { wfsarecord: obj.wfsarecord,wfdid:obj.wfdid, wfsaid: leftwfsaid, caseid: obj.caseid, ishandle: 1, sourcetable: 'case_simplecases' });
            var panel = obj.up('panel[name=simpleLeftPanel]');
            var oldpanel = obj.up('simpleCaseLeft').down('panel[name=changePanel]');
            panel.remove(oldpanel);
            panel.add(content);
        } else
            Ext.Msg.alert("提示", "请先提交一条简易案件");
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
            url: "/api/DucumentTemplet/GetWFSASList?wfsaid=" + form.getValues()['wfsaid'] + "&ddid=" + form.getValues()['ddid'] + "&wfdid=2017022316250001",
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
                        var simpleCaseLeft = obj.up('simpleCaseLeft');
                        var documentIndex = obj.up('documentIndex');
                        var uploadpanel = obj.up('form').down('uploadpanel');
                        if (uploadpanel != null)
                            uploadpanel.store.removeAll();

                        var content = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseLeft', { record: simpleCaseLeft.record, wfdid: '2017022316250001', wfsname: '简易案件结束', wfsid1: simpleCaseLeft.record.get('wfsid1'), wfsid2: simpleCaseLeft.record.get('wfsid2'), ishandle: 1 });
                        var addpage = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndex', { wfsarecord: documentIndex.wfsarecord, wfsaid: documentIndex.wfsaid, caseid: documentIndex.caseid, ishandle: 1, sourcetable: 'case_simplecases' });
                        content.down('panel[name=simpleLeftPanel]').add(addpage);
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
                        var simpleCaseLeft = obj.up('simpleCaseLeft');
                        var documentIndex = obj.up('documentIndex');
                        var uploadpanel = obj.up('form').down('uploadpanel');
                        if (uploadpanel != null)
                            uploadpanel.store.removeAll();

                        var content = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseLeft', { record: simpleCaseLeft.record, wfdid: '2017022316250001', wfsname: '简易案件结束', wfsid1: simpleCaseLeft.record.get('wfsid1'), wfsid2: simpleCaseLeft.record.get('wfsid2'), ishandle: 1 });
                        var addpage = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndex', { wfsarecord: documentIndex.wfsarecord, wfsaid: documentIndex.wfsaid, caseid: documentIndex.caseid, ishandle: 1, sourcetable: 'case_simplecases' });
                        content.down('panel[name=simpleLeftPanel]').add(addpage);
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
    onDJWrite: function (button, e) {
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

        this.getView().down('textfield[name=casereason]').setValue(record.get('eventtitle'));
        this.getView().down('textfield[name=fromcasesource]').setValue(record.get('wfsid'));

        win.close();
    },

    //关联案源事件
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

    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    },

    onHide: function (button) {
        var win = button.up('window');
        win.close();
    },

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
        var content = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseList');
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        view.remove(panel)
        content.region = 'center';
        view.add(content);
        if (button.tabtitle == '全部案件')
            content.down('tabpanel').setActiveTab(1);
    },

    //返回到详情页面
    onReturnDetail: function (obj) {
        var simpleCaseLeft = obj.up('simpleCaseLeft');
        if (simpleCaseLeft.record != null) {
            var view = Ext.ComponentQuery.query('viewport')[0];
            var panel = view.items.getAt(3)
            view.remove(panel)
            var content = Ext.create('TianZun.view.legalcasemanager.casemanager.SimpleCaseLeft', { record: simpleCaseLeft.record, wfdid: simpleCaseLeft.wfdid, wfsname: simpleCaseLeft.wfsname, wfsid: simpleCaseLeft.wfsid, wfsid2: simpleCaseLeft.wfsid2, ishandle: simpleCaseLeft.ishandle });
            var addpage = Ext.create(simpleCaseLeft.ishandle == 0 ? 'TianZun.view.legalcasemanager.casemanager.SimpleCaseLook' : 'TianZun.view.legalcasemanager.casemanager.SimpleCaseAdd', { record: simpleCaseLeft.record, ishandle: simpleCaseLeft.ishandle });
            content.down('panel[name=simpleLeftPanel]').add(addpage);
            content.region = 'center';
            view.add(content);
        }
    }

});