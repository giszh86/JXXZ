Ext.define('TianZun.view.legalcasemanager.documents.DocumentIndex', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.documentIndex',
    layout: 'fit',

    requires: [
       'TianZun.controller.legalcasemanager.CaseSource',
    ],
    controllers: ['caseSource', 'simpleCase'],

    name: 'changePanel',
    width: '76%',
    height: '100%',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        this.items = [
            {
                xtype: 'panel',
                border: false,
                plain: true,
                bodyBorder: false,
                overflowY:'auto',
                listeners: {
                    afterrender: function (obj) {
                        var documentpanel = Ext.create('TianZun.view.legalcasemanager.documents.DocumentIndexCode', { wfsarecord: me.wfsarecord, wfdid:me.wfdid,wfsaid: me.wfsaid, caseid: me.caseid,phaseid:me.phaseid, ishandle: me.ishandle, sourcetable: me.sourcetable });
                        obj.add(documentpanel);
                    },
                },
            },
        ];

        this.callParent();

    },
})