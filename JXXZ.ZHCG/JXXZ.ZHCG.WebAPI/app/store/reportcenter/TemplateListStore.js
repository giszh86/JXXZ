Ext.define('TianZun.store.reportcenter.TemplateListStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.TemplateListModel',
    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/GetTemplateList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        },
        extraParams: {
            userid: $.cookie('USER_ID'),
        },
    },
    autoLoad: true
    //data: [
    //   { reportName: '秀洲区综合行政执法局土地执法案件情况分类统计报表', createtime: '1月、2月、3月、4月、5月、6月、7月、8月、9月、10月、11月、12月', reportType: '月报', isActivated: '否', remark: '每月25日之前上传相关数据' },
    //    { reportName: '秀洲区综合行政执法局安全生产执法情况报表', createtime: '1月、2月、3月、4月、5月、6月、7月、8月、9月、10月、11月、12月', reportType: '月报', isActivated: '否', remark: '每月25日之前上传相关数据' },
    //    { reportName: '秀洲区综合行政执法局秸秆、城市垃圾露天焚烧执法管控情况报表', createtime: '1月、2月、3月、4月、5月、6月、7月、8月、9月、10月、11月、12月', reportType: '月报', isActivated: '否', remark: '每月25日之前上传相关数据' },
    //    { reportName: '秀洲区综合行政执法局规模养殖场执法管控情况报表', createtime: '1月、2月、3月、4月、5月、6月、7月、8月、9月、10月、11月、12月', reportType: '月报', isActivated: '否', remark: '每月25日之前上传相关数据' },
    //    { reportName: '秀洲区综合行政执法局水行政执法情况报表', createtime: '1月、2月、3月、4月、5月、6月、7月、8月、9月、10月、11月、12月', reportType: '月报', isActivated: '否', remark: '每月25日之前上传相关数据' },
    //    { reportName: '秀洲区综合行政执法局中心工作开展情况报表', createtime: '第一季度、第二季度、第三季度、第四季度', reportType: '季报', isActivated: '否', remark: '每月25日之前上传相关数据' },
    //    { reportName: 'H7N9疫情(活禽交易)防控工作信息日报表', createtime: '2017年5月15日至2017年5月15日14：47', reportType: '日报', isActivated: '否', remark: '每月25日之前上传相关数据' },
    //    { reportName: '特殊时期（互联网峰会）环境保障工作日报表', createtime: '2017年5月15日至2017年5月15日14：47', reportType: '日报', isActivated: '否', remark: '每月25日之前上传相关数据' },
    //]
})