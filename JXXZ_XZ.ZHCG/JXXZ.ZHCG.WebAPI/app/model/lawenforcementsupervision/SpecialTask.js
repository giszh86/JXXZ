Ext.define('TianZun.model.lawenforcementsupervision.SpecialTask', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'setime', type: 'string', convert: function (value, record) {
                if (record.get('starttime') != null && record.get('endtime') != null)
                    return Ext.Date.format(new Date(record.get('starttime')), "Y-m-d") + '---' + Ext.Date.format(new Date(record.get('endtime')), "Y-m-d")
                else
                    return
            },
        },
        {
            name: 'levelstr', type: 'number', convert: function (value, record) {
                return record.get('level') == 1 ? '一般' : record.get('level') == 2 ? '紧急' : '特急';
            },
        }
    ]
});