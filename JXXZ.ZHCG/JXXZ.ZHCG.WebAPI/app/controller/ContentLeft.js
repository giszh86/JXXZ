Ext.define('TianZun.controller.ContentLeft', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contentLeft',

    onShow: function (obj, eOpts) {
        GetPermissions(function () {
            GetAjax({
                url: 'api/Menu/GetTreeMenus?userID=' + $.cookie("USER_ID") + '&roleID=' + (ValueInArr($.cookie("ROLE_IDS").split(','), configs.SGYCRoleid, 1) ? configs.SGYCRoleid : null),
                complete: function (jqXHR, textStatus, errorThrown) {
                    if (textStatus == "success") {
                        var treeMenus = jQuery.parseJSON(jqXHR.responseText);

                        for (var i in treeMenus) {
                            var mainMenu = treeMenus[i];

                            var treePanel = Ext.create('Ext.tree.Panel', {
                                border: false,
                                rootVisible: false,
                                root: {
                                    children: mainMenu.children
                                },
                                listeners: {
                                    itemclick: function (itemObj, record, item, index) {
                                        var gridArr = Ext.ComponentQuery.query('viewport')[0].items.getAt(1).getEl().query('.x-grid-item');
                                        $.each(gridArr, function (a, b) {
                                            b.className = "x-grid-item";
                                        })
                                        item.className = "x-grid-item x-grid-item-selected";

                                        var url = record.get("Url");

                                        if (url != null && url != "") {
                                            var content = Ext.create(url);
                                            var view = Ext.ComponentQuery.query('viewport')[0];
                                            var panel = view.items.getAt(3);
                                            view.remove(panel)
                                            content.region = 'center';
                                            view.add(content);
                                        }
                                    },
                                },
                            });

                            obj.add({
                                title: mainMenu.text,
                                items: treePanel,
                                overflowY:'auto',
                            });

                        }
                    }
                }
            })
        })
    },
});
