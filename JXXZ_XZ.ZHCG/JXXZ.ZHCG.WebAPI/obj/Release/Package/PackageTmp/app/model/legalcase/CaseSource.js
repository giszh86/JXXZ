Ext.define('TianZun.model.legalcase.CaseSource', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'statusname', type: 'string', convert: function (value,record) {
                var status = record.get('status');
                var statusname = status == 1 ?(record.get('lastatus')==1? '已立案':'待立案') : status == 2 ? '不予立案' : status == 3 ? '暂存' : '移交';
                return statusname;
            }
        },
        {
            name: 'lazt', type: 'string', convert: function (value, record) {
                return record.get('status') == 1 ? '待立案' : '待处理';
            }
        }
    ]
});
