Ext.define('TianZun.model.mechanicalassessment.AssessmentModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'examinedate', type: 'string', convert: function (value, record)
            {
                var status = record.get('examinedate');
                var statusname = status == 1 ? '立案' : status == 2 ? '不予立案' : status == 3 ? '暂存' : '移交';
                return statusname;
            }
        },
    ]
});
