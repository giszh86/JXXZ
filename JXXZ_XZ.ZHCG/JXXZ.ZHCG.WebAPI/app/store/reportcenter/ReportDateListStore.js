Ext.define('TianZun.store.reportcenter.ReportDateListStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.ReportDateListModel',
    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/GetReportList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        },
    },
    autoLoad: true,
    //data: [
    //    { reportName: '秀洲区综合行政执法局土地执法案件情况分类统计报表', reportTime: '2017年5月25日', reportSquadron: '新城中队、高照中队、洪合中队、新塍中队、王江泾中队、油车港中队' },
    //    { reportName: '秀洲区综合行政执法局安全生产执法情况报表', reportTime: '2017年5月25日', reportSquadron: '新城中队、高照中队、洪合中队、新塍中队、王江泾中队、油车港中队' },
    //    { reportName: '秀洲区综合行政执法局秸秆、城市垃圾露天焚烧执法管控情况报表', reportTime: '2017年5月25日', reportSquadron: '新城中队、高照中队、洪合中队、新塍中队、王江泾中队、油车港中队' },
    //    { reportName: '秀洲区综合行政执法局规模养殖场执法管控情况报表', reportTime: '2017年5月25日', reportSquadron: '新城中队、高照中队、洪合中队、新塍中队、王江泾中队、油车港中队' },
    //    { reportName: '秀洲区综合行政执法局水行政执法情况报表', reportTime: '2017年5月25日', reportSquadron: '新城中队、高照中队、洪合中队、新塍中队、王江泾中队、油车港中队' },
    //    { reportName: '秀洲区综合行政执法局中心工作开展情况报表', reportTime: '2017年5月25日', reportSquadron: '新城中队、高照中队、洪合中队、新塍中队、王江泾中队、油车港中队' },
    //    { reportName: 'H7N9疫情(活禽交易)防控工作信息日报表', reportTime: '2017年5月25日', reportSquadron: '新城中队、高照中队、洪合中队、新塍中队、王江泾中队、油车港中队' },
    //    { reportName: '特殊时期（互联网峰会）环境保障工作日报表', reportTime: '2017年5月25日', reportSquadron: '新城中队、高照中队、洪合中队、新塍中队、王江泾中队、油车港中队' },
    //]
});