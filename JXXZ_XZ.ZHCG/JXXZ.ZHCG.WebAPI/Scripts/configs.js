var configs =
{
    WebApi: '',
    PageSize: 20,
    TOWNID: 13,//乡镇主标识,11.新城,13.王店,14.洪合,16.王江泾,17.油车港

    ApprovalPath: 'C:\\JXXZ\\JXXZFile\\ApprovalPath\\',//行政许可
    AccountTaskPath: 'C:\\JXXZ\\JXXZFile\\AccountTaskPath\\',//台帐任务图片
    AccountRegisterPath: 'C:\\JXXZ\\JXXZFile\\AccountRegisterPath\\',//台帐登记图片
    AccountRegisterWordPath: 'C:\\JXXZ\\JXXZFile\\AccountRegisterWordPath\\',//台帐登记word
    LegalCasePath: 'C:\\JXXZ\\JXXZFile\\LegalCasePath\\',
    ThreeBagsPath: 'C:\\JXXZ\\JXXZFile\\ThreeBagsPath\\',//门前三包
    CitizenServiceOriginalPath: 'C:\\JXXZ\\JXXZImage\\CitizenServicePath\\sourse\\',//市民服务图片
    YhTaskOriginalPath: 'C:\\JXXZ\\JXXZImage\\YhTaskOriginalPath\\sourse\\',//养护任务
    SpecialTaskPath: 'C:\\JXXZ\\JXXZFile\\SpecialTaskPath\\',//专项整治文件路径
    ContractPath: 'C:\\JXXZ\\JXXZFile\\ContractPath\\',//养护合同路径
    YhLogOriginalPath:'C:\\JXXZ\\JXXZImage\\YhLogOriginalPath\\sourse\\',//养护日志
    DemolitionOriginalPath: 'C:\\JXXZ\\JXXZImage\\DemolitionOriginalPath\\sourse\\',//拆迁
    IllegallyBuiltOriginalPath: 'C:\\JXXZ\\JXXZImage\\IllegallyBuiltOriginalPath\\sourse\\',//违建
    YhlogPath: 'C:\\JXXZ\\JXXZFile\\YhlogPath\\',//养护日志路径
    YhlogPath: 'C:\\JXXZ\\JXXZFile\\YhlogPath\\',//文书模版下载路径
    AdministratorApproval: 'C:\\JXXZ\\JXXZFile\\AdministratorApproval\\',//行政审批
    WTCarOriginalPath:'C:\\JXXZ\\JXXZImage\\WTCarOriginalPath\\sourse\\',//违停案件

    KYRoleid: 13,//科员角色 
    SGYCRoleid: 19,//三改一拆角色
    KYLookWorkFlow: ["2017030613500003", "2017030613500006", "2017030613500008", "2017030613500012", "2017030613500016", "2017030613500019", "2017030613500025", "2017030613500029"],//科员查看环节流程
    AJDCZJBGARR: ['2017030613500005', '2017030613500006', '2017030613500007', '2017030613500008', '2017030613500009'],//案件调查终结报告关联环节
    GZSPBARR: ['2017030613500010', '2017030613500011', '2017030613500012', '2017030613500013'],//告知审批表关联环节    
    CFJDSARR: ['2017030613500017', '2017030613500018', '2017030613500019', '2017030613500020'],//处罚决定书关联环节
    AJJABGARR: ['2017030613500023', '2017030613500024', '2017030613500025', '2017030613500026', '2017030613500031'],//案件结案报告关联环节
    QTSPSXARR: ['2017030613500027', '2017030613500028', '2017030613500029', '2017030613500030'],//其他审批事项关联环节
    DYZJWSARR: ['2017030613500005', '2017030613500010', '2017030613500017', '2017030613500023', '2017030613500027'],//允许队员填写信息关联环节
    GETXZNAME: function (townid) {
        if (configs.TOWNID == 11 || townid == 11)
            return '新城';
        else if (configs.TOWNID == 13 || townid == 13)
            return '王店';
        else if (configs.TOWNID == 14 || townid == 14)
            return '洪合';
        else if (configs.TOWNID == 16 || townid == 16)
            return '王江泾';
        else if (configs.TOWNID == 17 || townid == 17)
            return '油车港';
        else
            return null;
    }
};


