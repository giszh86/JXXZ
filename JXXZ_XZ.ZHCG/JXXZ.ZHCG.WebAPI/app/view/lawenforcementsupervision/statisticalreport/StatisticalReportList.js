Ext.define('TianZun.view.lawenforcementsupervision.statisticalreport.StatisticalReportList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.statisticalReportList',
    title: '执法对象监管 > 执法对象管理>监管对象',
    layout: 'fit',
    requires: [
        'TianZun.controller.lawenforcementsupervision.LawObject',
        'TianZun.ux.ExportExcelButton',
    ],
    controller: 'lawObject',

    border: false,
    bodyBorder: false,
    initComponent: function ()
    {
        var me = this;
        var store = Ext.create('TianZun.store.lawenforcementsupervision.StreetShopStore');
        store.getProxy().url = 'api/LawObject/GetStreeShopList?type=1';
        
        this.items = [
            {
                xtype: 'tabpanel',
                border: false,
                plain: true,
                bodyBorder: false,
                items: [
                    {
                        layout: 'fit',
                        border: false,
                        title: '执法对象统计',
                        xtype: 'panel',
                        name: 'todoPanel',
                        items: [{
                            xtype: 'panel',
                            html: '<iframe style="  overflow-x : hidden; " scrolling="auto" frameborder="0" width="100%" height="95%" src="/app/view/lawenforcementsupervision/statisticalreport/LowObject.html"></iframe>',
                            tbar: [
                               {
                                   xtype: 'exportbtn',
                                   text: '导出',
                                   webapi: 'api/LawObject/ExportExcel',
                                   excelname: '执法对象统计',
                                   exceltitle: '执法对象统计',
                                   isecharts:true
                               },
                            ],
                        },
                        ]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '黑名单统计',
                        xtype: 'panel',
                        name: 'finishPanel',
                        items: [{
                            xtype: 'panel',
                            html: '<iframe style="  overflow-x : hidden; " scrolling="auto" frameborder="0" width="100%" height="95%" src="/app/view/lawenforcementsupervision/statisticalreport/BlackList.html"></iframe>',
                            tbar: [
                                {
                                    xtype: 'exportbtn',
                                    text: '导出',
                                    webapi: 'api/LawObject/ExportExcel',
                                    excelname: '黑名单统计',
                                    exceltitle: '黑名单统计',
                                    isecharts: true
                                },
                            ],
                        }]
                    },
                ],
                listeners: {
                    //'tabchange': function (tabPanel, newStore, oldStore, eOpts)
                    //{
                    //    var contentGrid = newStore.down('grid');//grid
                    //    var contentBar = newStore.down('pagingtoolbar')//bbar
                    //    if (newStore.title == "沿街店家")
                    //    {
                    //        html = '<iframe style="  overflow-x : hidden; " scrolling="auto" frameborder="0" width="100%" height="95%" src="/app/view/lawenforcementsupervision/statisticalreport/LowObject.html"></iframe>';
                    //    }
                    //    if (newStore.title == "小摊小贩")
                    //    {
                    //        html = '<iframe style="  overflow-x : hidden; " scrolling="auto" frameborder="0" width="100%" height="95%" src="/app/view/lawenforcementsupervision/statisticalreport/BlackList.html"></iframe>';
                    //    }
                    //}
                }
            }
        ]

        this.callParent();
    }
});