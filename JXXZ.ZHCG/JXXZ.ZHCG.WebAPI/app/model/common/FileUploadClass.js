Ext.define('TianZun.model.common.FileUploadClass', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'OriginalPath', type: 'string' },
        { name: 'OriginalName', type: 'string' },
        { name: 'OriginalType', type: 'string' },
        { name: 'size', type: 'float' },
    ]
});