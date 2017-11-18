Ext.define('TianZun.store.reportcenter.scaleFarmsControlStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.scaleFarmsControlModel',
    groupField: 'project',
    sortInfo: {
        field: 'projectId',
        direction: "ASC"
    },
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/GetScaleFarmsControl',
    },
    remoteSort: true,
    autoLoad: true
    //data: [
    //     {
    //         projectId: 1, project: '当月', taskId: 101, name: '新城中队',
    //         xmsj: '当月', szcyl: 0, szzfjccs: 0, szzfjcjl: 0, szxqzgtzs: 0, szzgyzwt: 0, szla: 0, szja: 0, szsjjffmk: 0, szyjsfjg: 0, qtj: 0, qty: 0, qtry: 0, qtqt: 0, qtzfjccs: 0, qtzfjcjl: 0, qtkjxqzgtzs: 0, qtla: 0,
    //         qtsjsjfmk: 0, qtts: '', tqgb: '', qtcc: '', qtccwjmj: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //     },
    //            {
    //                projectId: 1, project: '当月', taskId: 101, name: '高照中队',
    //                xmsj: '当月', szcyl: 0, szzfjccs: 0, szzfjcjl: 0, szxqzgtzs: 0, szzgyzwt: 0, szla: 0, szja: 0, szsjjffmk: 0, szyjsfjg: 0, qtj: 0, qty: 0, qtry: 0, qtqt: 0, qtzfjccs: 0, qtzfjcjl: 0, qtkjxqzgtzs: 0, qtla: 0,
    //                qtsjsjfmk: 0, qtts: '', tqgb: '', qtcc: '', qtccwjmj: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当月', taskId: 102, name: '洪合中队',
    //                xmsj: '当月', szcyl: 0, szzfjccs: 0, szzfjcjl: 0, szxqzgtzs: 0, szzgyzwt: 0, szla: 0, szja: 0, szsjjffmk: 0, szyjsfjg: 0, qtj: 0, qty: 0, qtry: 0, qtqt: 0, qtzfjccs: 0, qtzfjcjl: 0, qtkjxqzgtzs: 0, qtla: 0,
    //                qtsjsjfmk: 0, qtts: '', tqgb: '', qtcc: '', qtccwjmj: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当月', taskId: 103, name: '新塍中队',
    //                xmsj: '当月', szcyl: 0, szzfjccs: 0, szzfjcjl: 0, szxqzgtzs: 0, szzgyzwt: 0, szla: 0, szja: 0, szsjjffmk: 0, szyjsfjg: 0, qtj: 0, qty: 0, qtry: 0, qtqt: 0, qtzfjccs: 0, qtzfjcjl: 0, qtkjxqzgtzs: 0, qtla: 0,
    //                qtsjsjfmk: 0, qtts: '', tqgb: '', qtcc: '', qtccwjmj: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当月', taskId: 104, name: '王江泾中队',
    //                xmsj: '当月', szcyl: 0, szzfjccs: 0, szzfjcjl: 0, szxqzgtzs: 0, szzgyzwt: 0, szla: 0, szja: 0, szsjjffmk: 0, szyjsfjg: 0, qtj: 0, qty: 0, qtry: 0, qtqt: 0, qtzfjccs: 0, qtzfjcjl: 0, qtkjxqzgtzs: 0, qtla: 0,
    //                qtsjsjfmk: 0, qtts: '', tqgb: '', qtcc: '', qtccwjmj: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 1, project: '当月', taskId: 105, name: '油车港中队',
    //                xmsj: '当月', szcyl: 0, szzfjccs: 0, szzfjcjl: 0, szxqzgtzs: 0, szzgyzwt: 0, szla: 0, szja: 0, szsjjffmk: 0, szyjsfjg: 0, qtj: 0, qty: 0, qtry: 0, qtqt: 0, qtzfjccs: 0, qtzfjcjl: 0, qtkjxqzgtzs: 0, qtla: 0,
    //                qtsjsjfmk: 0, qtts: '', tqgb: '', qtcc: '', qtccwjmj: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 106, name: '新城中队',
    //                xmsj: '累计', szcyl: 0, szzfjccs: 0, szzfjcjl: 0, szxqzgtzs: 0, szzgyzwt: 0, szla: 0, szja: 0, szsjjffmk: 0, szyjsfjg: 0, qtj: 0, qty: 0, qtry: 0, qtqt: 0, qtzfjccs: 0, qtzfjcjl: 0, qtkjxqzgtzs: 0, qtla: 0,
    //                qtsjsjfmk: 0, qtts: '', tqgb: '', qtcc: '', qtccwjmj: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 107, name: '高照中队',
    //                xmsj: '累计', szcyl: 0, szzfjccs: 0, szzfjcjl: 0, szxqzgtzs: 0, szzgyzwt: 0, szla: 0, szja: 0, szsjjffmk: 0, szyjsfjg: 0, qtj: 0, qty: 0, qtry: 0, qtqt: 0, qtzfjccs: 0, qtzfjcjl: 0, qtkjxqzgtzs: 0, qtla: 0,
    //                qtsjsjfmk: 0, qtts: '', tqgb: '', qtcc: '', qtccwjmj: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 108, name: '洪合中队',
    //                xmsj: '累计', szcyl: 0, szzfjccs: 0, szzfjcjl: 0, szxqzgtzs: 0, szzgyzwt: 0, szla: 0, szja: 0, szsjjffmk: 0, szyjsfjg: 0, qtj: 0, qty: 0, qtry: 0, qtqt: 0, qtzfjccs: 0, qtzfjcjl: 0, qtkjxqzgtzs: 0, qtla: 0,
    //                qtsjsjfmk: 0, qtts: '', tqgb: '', qtcc: '', qtccwjmj: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 109, name: '新塍中队',
    //                xmsj: '累计', szcyl: 0, szzfjccs: 0, szzfjcjl: 0, szxqzgtzs: 0, szzgyzwt: 0, szla: 0, szja: 0, szsjjffmk: 0, szyjsfjg: 0, qtj: 0, qty: 0, qtry: 0, qtqt: 0, qtzfjccs: 0, qtzfjcjl: 0, qtkjxqzgtzs: 0, qtla: 0,
    //                qtsjsjfmk: 0, qtts: '', tqgb: '', qtcc: '', qtccwjmj: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 110, name: '王江泾中队',
    //                xmsj: '累计', szcyl: 0, szzfjccs: 0, szzfjcjl: 0, szxqzgtzs: 0, szzgyzwt: 0, szla: 0, szja: 0, szsjjffmk: 0, szyjsfjg: 0, qtj: 0, qty: 0, qtry: 0, qtqt: 0, qtzfjccs: 0, qtzfjcjl: 0, qtkjxqzgtzs: 0, qtla: 0,
    //                qtsjsjfmk: 0, qtts: '', tqgb: '', qtcc: '', qtccwjmj: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //            {
    //                projectId: 2, project: '累计', taskId: 111, name: '油车港中队',
    //                xmsj: '累计', szcyl: 0, szzfjccs: 0, szzfjcjl: 0, szxqzgtzs: 0, szzgyzwt: 0, szla: 0, szja: 0, szsjjffmk: 0, szyjsfjg: 0, qtj: 0, qty: 0, qtry: 0, qtqt: 0, qtzfjccs: 0, qtzfjcjl: 0, qtkjxqzgtzs: 0, qtla: 0,
    //                qtsjsjfmk: 0, qtts: '', tqgb: '', qtcc: '', qtccwjmj: '', zygzld: '', czdzywt: '', mldzykn: '', xgdyjjy: '',
    //            },
    //]
})