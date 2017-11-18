Ext.define('TianZun.view.citizenservice.citizenevent.EventOrderSheet', {
    extend: 'Ext.Window',
    alias: 'widget.eventOrderSheet',
    modal: true,
    title: '市民事件交办单',
    layout: 'fit',

    initComponent: function () {        
        var me = this;
        var pdfpath;

        Ext.Ajax.request({
            url: configs.WebApi + 'api/CitizenEvent/GetCitizenServicesAttr?wfdid=2017021410240004,2017021410240005&citizenid=' + me.citizenid,
            method: 'get',
            async:false,
            scope: this,
            success: function (response) {
                var record = JSON.parse(response.responseText);
                pdfpath = record[0].OriginalPath;
            }
        })


        this.items = [{
            layout: 'fit',
            border: false,
            items: [{
                xtype: 'panel',
                name: 'framepanel',
                width: 800,
                height:450,
                html: '<iframe width="100%" height="100%" scrolling="no"  frameborder="0" height="100%" src="/GetPDFFile.ashx?PathClass=CitizenServiceOriginalPath&DocPath=' + pdfpath + '"></iframe>',
            }],
            buttons: [
                {
                    text: '关闭',
                    handler: function (obj) {
                        obj.up('window').close();
                    }
                }
            ]
        }]

        this.callParent();
    }
});