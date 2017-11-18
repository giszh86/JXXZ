Ext.define('TianZun.model.legalcase.SimpleCase', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'pf_name', type: 'string', convert: function (value, record) {
                var persontype = record.get('persontype');
                var pf_name = persontype == 'type_zrr' ? record.get('p_name') : record.get('f_name');
                return pf_name;
            }
        },
        {
            name: 'isovertime', type: 'string', convert: function (value, record) {
                var nowtime = new Date();
                var overtime = record.get('etime') == null ? new Date(record.get('overtime')) : new Date(record.get('etime'));
                return overtime < nowtime ? '<img src="../../Images/images/红.png" title="已超期" style="height:12px;margin-left: 5px;" />' : '<img src="../../Images/images/绿.png" title="未超期" style="height:12px;margin-left: 5px;" />';
            }
        },
        {
            name: 'etime', type: 'string', convert: function (value, record) {
                var etime = record.get('etime');
                return etime == null ? record.get('overtime') : record.get('etime');
            }
        },
        {
            name: 'dealusername', type: 'string', convert: function (value, record) {
                if (record.get('dealunitname') == '法制科')
                    return '法制科科长';
                else
                    return value;
            }
        },
    ]
});