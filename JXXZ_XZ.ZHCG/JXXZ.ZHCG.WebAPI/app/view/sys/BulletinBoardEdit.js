Ext.define('TianZun.view.sys.BulletinBoardEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.bulletinBoardEdit',

    title: '编辑公告信息',
    layout: 'fit',

    initComponent: function () {
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
                     value:this.record.id,
                 },
                 {
                     xtype: 'hidden',
                     id: 'hidcontent',
                     name: 'hidcontent',
                 },
                {
                    fieldLabel: '公告标题',
                    name: 'title',
                    allowBlank: false,
                    colspan: 3,
                    margin: '10 20 10 0',
                    width: 765,
                    value:this.record.title,
                },
                {
                    fieldLabel: '作者',
                    name: 'author',
                    allowBlank: false,
                    value: this.record.author,
                },
                {
                    fieldLabel: '日期',
                    name: 'createtime',
                    editable: false,
                    xtype: 'datetimefield',
                    format: 'Y-m-d H:i:s',
                    allowBlank: false,
                    value: new Date(this.record.createtime),
                },
                {
                    fieldLabel: '排序',
                    xtype: 'numberfield',
                    name: 'seq',
                    minValue: 1,
                    value: this.record.seq,
                },
                {
                    layout: 'hbox',
                    xtype: 'fieldcontainer',
                    fieldLabel: '',
                    colspan: 3,
                    width: 765,
                    items: [
                        {
                            fieldLabel: '选择附件',
                            xtype: 'filefield',
                            id: 'LoadFile',
                            name: 'fileNewName',
                            width: 690,
                            buttonText: '选择附件',
                            rawValue: this.record.filename,
                        },
                 {
                     xtype: 'button',
                     width: 70,
                     margin: '0 0 0 5',
                     text: '删除附件',
                     listeners: {
                         click: function () {
                             Ext.getCmp("LoadFile").setRawValue('');
                         }
                     }
                 },
                    ]
                },
                 {
                     xtype: 'hidden',
                     id: 'filepath',
                     name: 'filepath',
                     value: this.record.filepath,
                 },
                {
                    fieldLabel: '内容',
                    xtype: 'textareafield',
                    region: 'center',
                    name: 'content',
                    id: 'content',
                    anchor: '90%',
                    colspan: 3,
                    width: 765,
                    height: 380,
                    margin: '10 20 10 0',
                    listeners: {
                        'render': function (f) {
                            setTimeout(function () {
                                if (KindEditor) {
                                    Nceditor = KindEditor.create('#content-inputEl', {
                                        cssPath: 'Scripts/kindeditor/plugins/code/prettify.css',
                                        resizeType: 1,
                                        resizeMode: 0,
                                        allowFileManager: true
                                    });
                                }
                            }, 500);
                        }
                    },
                    value:this.record.content,
                },
            ],
            buttons: [{
                text: '提交',
                handler: 'onEditOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});