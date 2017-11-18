Ext.define('TianZun.view.legalcasemanager.documents.DocumentCommoncaseNote', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.documentCommoncaseNote',
    layout: 'fit',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.legalcasemanager.CommonCaseHistoryFlow', {
            proxy: { extraParams: { wfsid: me.wfsid } }
        });

        store.filterBy(function (record, id) {
            return record.get('content') != '';
        }, this)

        store.load({
            callback: function (records, operation, success) {
                //records[records.length - 1].set('remark', '提交');
                var laststr = records[records.length - 1].remark;
                for (var i = 0; i < records.length - 1; i++) {
                    var firstnum = parseInt(records[i].get('wfdid').substr(14, 2));
                    var secondnum = parseInt(records[i + 1].get('wfdid').substr(14, 2));
                    if (firstnum == secondnum) {
                        var k = 0;
                        for (var j = i + 1; (records[j + 1]!=null && records[j].get('wfdid') == records[j + 1].get('wfdid')); j++) {
                            k++;
                        }
                        if (records[i + k + 2] != null && records[i + k + 1] != null) {
                            if (parseInt(records[i + k + 2].get('wfdid').substr(14, 2)) > parseInt(records[i + k + 1].get('wfdid').substr(14, 2))) {
                                records[i].set('remark', '提交');
                            } else {
                                records[i].set('remark', '回退');
                            }
                        }
                        i = i + k+1;
                        continue;
                    }
                    if (secondnum > firstnum) {
                        records[i].set('remark', '提交');
                    } else {
                        records[i].set('remark', '回退');
                    }
                }
            }
        });

        this.items = [
            {
                xtype: 'grid',
                multiSelect: true,
                columnLines: true,
                viewConfig:{ markDirty:false },
                plugins: [
                    { ptype: 'cellediting', clicksToEdit: 1 }
                ],
                columns: [
                        { header: '案件环节', dataIndex: 'wfdname', flex: 1, editor: {xtype:'textfield',readOnly:true} },
                        { header: '处理队员', dataIndex: 'username', flex: 1, editor: { xtype: 'textfield', readOnly: true } },
                        { header: '处理意见', dataIndex: 'content', flex: 1, editor: { xtype: 'textfield', readOnly: true } },
                        { header: '开始时间', dataIndex: 'createtime', flex: 1, editor: { xtype: 'textfield', readOnly: true } },
                        { header: '结束时间', dataIndex: 'dealtime', flex: 1, editor: { xtype: 'textfield', readOnly: true } },
                        { header: '流程状态', dataIndex: 'remark', flex: 1, editor: { xtype: 'textfield', readOnly: true } },
                ],
                store: store,
            }
        ]

        this.callParent();
    }
})