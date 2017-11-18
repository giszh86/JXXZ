Ext.define('TianZun.ux.ImageShowPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'imageshowpanel',
    layout: 'fit',
    border: false,
    items: [
        {
            xtype: 'fieldset',
            collapsible: true,
            title: '附件',

            layout: {
                type: 'table',
                columns: 4,
            },
            items: [
                {
                    xtype: 'hidden',
                },
            ]
        },
    ],
    listeners: {
        beforerender: function (obj) {
            var hidecmp = obj.down('fieldset');
            var titleNew = obj.titleNew;
            if (titleNew && titleNew != null && titleNew != undefined) {
                hidecmp.setTitle(obj.titleNew);
            }
            var store = obj.store;
            var path = obj.path;
            var tablename = obj.tablename;
            var wordname = obj.wordname;
            var isedit = obj.isedit;
            //取附件列表
            var filelist = obj.filelist;

            if (store != null)
            {
                store.on('load', function (objarr)
                {
                    if (objarr.getCount() > 0)
                    {
                        for (var i = 0; i < objarr.getCount() ; i++)
                        {
                            var record = objarr.getAt(i);
                            var OriginalName = record.get('OriginalName');
                            var OriginalType = record.get('OriginalType');
                            var OriginalPath = record.get('OriginalPath');
                            var size = record.get('size');
                            var isimage = OriginalType == '.jpg' ? 1 : OriginalType == '.png' ? 1 : OriginalType == '.bmp' ? 1 : OriginalType == '.gif' ? 1 : 2;
                            hidecmp.add({
                                xtype: 'panel',
                                layout: 'hbox',
                                width: 200,
                                margin: 10,
                                items: [
                                    {
                                        xtype: 'image',
                                        margin: 10,
                                        width: 49,
                                        height: 48,
                                        src: isimage == 1 ? '/GetPictureFile.ashx?PicPath=' + path + OriginalPath : '/Images/images/PDF.png',
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'vbox',
                                        margin: '10 0 10 0',
                                        border: false,
                                        items: [
                                            {
                                                xtype: 'panel',
                                                width: 120,
                                                border: false,
                                                name: 'panel1',
                                                html: '<div style="width:120px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">' + record.get('OriginalName') + '</div>',
                                            },
                                            {
                                                xtype: 'panel',
                                                margin: '10 0 0 0',
                                                border: false,
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        xtype: 'panel',
                                                        border: false,
                                                        name: 'panel2',
                                                        html: size + 'kb',
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        text: isimage == 1 ? '查看' : '下载',
                                                        margin: '0 0 0 50',
                                                        valuepath: OriginalPath,
                                                        valuename: OriginalName,
                                                        listeners: {
                                                            click: function (obj)
                                                            {
                                                                if (obj.text == "查看")
                                                                {
                                                                    var imageWindow = new Ext.Window({
                                                                        layout: 'center',
                                                                        title: '查看大图',
                                                                        width: 800,
                                                                        height: 500,
                                                                        items: [{
                                                                            xtype: 'image',
                                                                            fullscreen: true,
                                                                            src: '/GetPictureFile.ashx?PicPath=' + path + obj.valuepath,
                                                                            style: 'margin: 4; cursor: pointer; max-width: 800px; max-height: 500px',
                                                                        }]
                                                                    });
                                                                    imageWindow.show();
                                                                }
                                                                else
                                                                {
                                                                    location.href = '/FileDownLoad.ashx?FilePath=' + path + OriginalPath + '&FileName=' + obj.valuename;
                                                                }
                                                            }
                                                        }
                                                    }
                                                ],
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'image',
                                        margin: '0 0 0 -20',
                                        hidden: true,
                                        name: 'imagexx',
                                        width: 20,
                                        height: 20,
                                        style: 'cursor:pointer;',
                                        src: '/Images/images/chacha.png',
                                        fileid: record.get('fileid'),
                                        listeners: {
                                            render: function (obj)
                                            {
                                                obj.getEl().on('click', function (p)
                                                {
                                                    Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn)
                                                    {
                                                        if (btn == "yes")
                                                        {

                                                            Ext.Msg.show({
                                                                title: '正在提交',
                                                                msg: '正在提交，请稍候...',
                                                            });

                                                            GetAjax({
                                                                url: "/api/Common/DeleteWorkFlowPictures?tablename=" + tablename + "&wordname=" + wordname + "&id=" + obj.fileid,
                                                                complete: function (jqXHR, textStatus, errorThrown)
                                                                {
                                                                    Ext.Msg.close();
                                                                    if (textStatus == "success")
                                                                    {
                                                                        obj.up('panel').destroy();
                                                                        if (hidecmp.down('panel') == null)
                                                                            hidecmp.destroy();
                                                                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                                                                    } else
                                                                    {
                                                                        Ext.Msg.show({
                                                                            title: "错误提示",
                                                                            icon: Ext.Msg.ERROR,
                                                                            msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    })
                                                });
                                            },
                                        }
                                    }
                                ],
                                listeners: {
                                    render: function (obj)
                                    {
                                        obj.getEl().on('mouseenter', function (p)
                                        {
                                            if (isedit)
                                                obj.down('image[name=imagexx]').show();
                                        });
                                        obj.getEl().on('mouseleave', function (p)
                                        {
                                            if (isedit)
                                                obj.down('image[name=imagexx]').hide();
                                        });
                                    },
                                }

                            });
                        }
                    } else
                        obj.hide();
                });
            }
           
            //处理行政审批附件
            if (filelist != null && filelist.length > 0)
            {
                for (var k = 0; k < filelist.length; k++)
                {
                    var OriginalName = filelist[k].OriginalName;
                    var OriginalType = filelist[k].OriginalType;
                    var OriginalPath = filelist[k].OriginalPath;
                    var size = filelist[k].size;
                    var isimage = OriginalType == '.jpg' ? 1 : OriginalType == '.png' ? 1 : OriginalType == '.bmp' ? 1 : OriginalType == '.gif' ? 1 : 2;
                    hidecmp.add({
                        xtype: 'panel',
                        layout: 'hbox',
                        width: 200,
                        margin: 10,
                        items: [
                            {
                                xtype: 'image',
                                margin: 10,
                                width: 49,
                                height: 48,
                                src: isimage == 1 ? '/GetPictureFile.ashx?PicPath=' + path + OriginalPath : '/Images/images/PDF.png',
                            },
                            {
                                xtype: 'panel',
                                layout: 'vbox',
                                margin: '10 0 10 0',
                                border: false,
                                items: [
                                    {
                                        xtype: 'panel',
                                        width: 120,
                                        border: false,
                                        name: 'panel1',
                                        html: '<div style="width:120px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">' + OriginalName + '</div>',
                                    },
                                    {
                                        xtype: 'panel',
                                        margin: '10 0 0 0',
                                        border: false,
                                        layout: 'hbox',
                                        items: [
                                            {
                                                xtype: 'panel',
                                                border: false,
                                                name: 'panel2',
                                                html: size + 'kb',
                                            },
                                            {
                                                xtype: 'button',
                                                text: isimage == 1 ? '查看' : '下载',
                                                margin: '0 0 0 50',
                                                valuepath: OriginalPath,
                                                valuename: OriginalName,
                                                listeners: {
                                                    click: function (obj)
                                                    {
                                                        if (obj.text == "查看")
                                                        {
                                                            var imageWindow = new Ext.Window({
                                                                layout: 'center',
                                                                title: '查看大图',
                                                                width: 800,
                                                                height: 500,
                                                                items: [{
                                                                    xtype: 'image',
                                                                    fullscreen: true,
                                                                    src: '/GetPictureFile.ashx?PicPath=' + path + obj.valuepath,
                                                                    style: 'margin: 4; cursor: pointer; max-width: 800px; max-height: 500px',
                                                                }]
                                                            });
                                                            imageWindow.show();
                                                        }
                                                        else
                                                        {
                                                            location.href = '/FileDownLoad.ashx?FilePath=' + path + OriginalPath + '&FileName=' + obj.valuename;
                                                        }
                                                    }
                                                }
                                            }
                                        ],
                                    }
                                ]
                            },
                            {
                                xtype: 'image',
                                margin: '0 0 0 -10',
                                hidden: true,
                                name: 'imagexx',
                                width: 20,
                                height: 20,
                                style: 'cursor:pointer;',
                                src: '/Images/images/chacha.png',
                                fileid: filelist[k].fileid,
                                listeners: {
                                    render: function (obj)
                                    {
                                        obj.getEl().on('click', function (p)
                                        {
                                            Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn)
                                            {
                                                if (btn == "yes")
                                                {

                                                    Ext.Msg.show({
                                                        title: '正在提交',
                                                        msg: '正在提交，请稍候...',
                                                    });

                                                    GetAjax({
                                                        url: "/api/Common/DeleteWorkFlowPictures?tablename=" + tablename + "&wordname=" + wordname + "&id=" + obj.fileid,
                                                        complete: function (jqXHR, textStatus, errorThrown)
                                                        {
                                                            Ext.Msg.close();
                                                            if (textStatus == "success")
                                                            {
                                                                obj.up('panel').destroy();
                                                                if (hidecmp.down('panel') == null)
                                                                    hidecmp.destroy();
                                                                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                                                            } else
                                                            {
                                                                Ext.Msg.show({
                                                                    title: "错误提示",
                                                                    icon: Ext.Msg.ERROR,
                                                                    msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                                                                });
                                                            }
                                                        }
                                                    });
                                                }
                                            })
                                        });
                                    },
                                }
                            }
                        ],
                        listeners: {
                            render: function (obj)
                            {
                                obj.getEl().on('mouseenter', function (p)
                                {
                                    if (isedit)
                                        obj.down('image[name=imagexx]').show();
                                });
                                obj.getEl().on('mouseleave', function (p)
                                {
                                    if (isedit)
                                        obj.down('image[name=imagexx]').hide();
                                });
                            },
                        }

                    });
                }
            }
        },
    }
})