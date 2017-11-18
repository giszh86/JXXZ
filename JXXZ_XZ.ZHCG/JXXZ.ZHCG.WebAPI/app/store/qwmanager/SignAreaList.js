Ext.define('TianZun.store.qwmanager.SignAreaList', {
    extend: 'Ext.data.Store',
    //model: 'TianZun.model.legalcase.CaseSource',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/SignArea/GetSigninAreasList' + (configs.TOWNID == null ? '' : '?filter=[{"property":"sszd","value":' + configs.TOWNID + '}]'),
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    fields: [
        {
            name: 'start_stime', type: 'string', convert: function (value) {
                var start_stime = Ext.Date.format(new Date(value), "H:i");
                return start_stime;
            }
        },
        {
            name: 'start_etime', type: 'string', convert: function (value) {
                var start_etime = Ext.Date.format(new Date(value), "H:i");
                return start_etime;
            }
        },
        {
            name: 'end_stime', type: 'string', convert: function (value) {
                var end_stime = Ext.Date.format(new Date(value), "H:i");
                return end_stime;
            }
        },
        {
            name: 'end_etime', type: 'string', convert: function (value) {
                var end_etime = Ext.Date.format(new Date(value), "H:i");
                return end_etime;
            }
        },
    ],
    autoLoad: true
});