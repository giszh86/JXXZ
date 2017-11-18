Ext.define('TianZun.view.sys.BulletinBoardDetail', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.bulletinBoardDetail',

    title: '查看公告信息',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            overflowY: 'auto',
            height: 550,
            bodyPadding: 10,
            layout: {
                type: 'table',
                columns: 3,
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 75
            },
            defaults: {
                xtype: 'textfield',
                width: 245
            },
            items: [
                 {
                     xtype: 'hidden',
                     name: 'id',
                     value: this.record.id,
                 },
                 {
                     xtype: 'hidden',
                     id: 'hidcontent',
                     name: 'hidcontent',
                 },
                {
                    name: 'title',
                    xtype: 'label',
                    html: '<div style="text-align:center;font-weight:600;font-size:1.5em;margin-top:20px;">' + this.record.title + '</div>',
                    colspan: 3,
                    margin: '30 10 30 0',
                    width: 755,
                },
                {
                    name: 'author',
                    xtype: 'label',
                    html: '<span>创建人：' + this.record.author + '</span>',
                    margin: '10 0 20 75',
                    width: 200,
                },
                {
                    name: 'createtime',
                    xtype: 'label',
                    margin: '10 0 20 0',
                    colspan: 2,
                    width: 200,
                    html: '<span>创建时间：' + Ext.util.Format.date(this.record.createtime, 'Y-m-d H:i') + '</span>',
                },
                {
                    xtype: 'displayfield',
                    region: 'center',
                    name: 'content',
                    id: 'content',
                    anchor: '90%',
                    border: false,
                    colspan: 3,
                    width: 695,
                    margin: '10 20 10 75',
                    value: this.record.content,
                },
                {
                    id: 'LoadFile',
                    xtype: 'label',
                    name: 'fileNewName',
                    colspan: 3,
                    margin: '10 0 20 75',
                    width: 765,
                    listeners: {
                        beforerender: function () {
                            if (me.record.filename == null) {
                                me.down("label[name=fileNewName]").html = '';
                            }
                            else {
                                me.down("label[name=fileNewName]").html = '附件:<span style="color:blue">' + me.record.filename + '</span>';
                            }
                        },
                        render: function () {
                            var url = '/FileDownLoad.ashx?FilePath='+me.record.filepath+'&FileName=' + me.record.filename;
                            Ext.get("LoadFile").on('click', function (e, t) {
                                Ext.Ajax.request({
                                    url: url,
                                    success: function (res) {
                                        window.location.href = url;
                                        //window.open(url, "download");
                                    }
                                });
                            })
                        }
                    }
                },
            ],
            buttons: [{
                text: '关闭',
                handler: function (obj) {
                    var win = obj.up('window');
                    win.close();
                }
            }]
        }];

        this.callParent();
    }
});