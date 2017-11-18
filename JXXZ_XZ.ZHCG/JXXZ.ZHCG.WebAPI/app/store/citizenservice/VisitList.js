Ext.define('TianZun.store.citizenservice.VisitList', {
    extend: 'Ext.data.Store',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/CizitenVisit/GetVisitsList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    fields: [
        {
            name: 'returnvisitstr', type: 'int', convert: function (value,record) {                
                var returnvisitstr = record.get('returnvisit') == 1 ? '电话' : record.get('returnvisit') == 2 ? '实地勘察' : '面谈';
                return returnvisitstr;
            }
        }, {
            name: 'satisfactionstr', type: 'int', convert: function (value, record) {
                var satisfactionstr = record.get('satisfaction') == 1 ? '满意' : record.get('satisfaction') == 2 ? '一般' : '不满意';
                return satisfactionstr;
            }
        },
        {
            name: 'processmode', type: 'int', convert: function (value) {
                var processmode = value == 1 ? '归档' : value == 2 ? '重新指派件' : '解释';
                return processmode;
            }
        }
    ],
    autoLoad: true
});