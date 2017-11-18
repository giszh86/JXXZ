var config = {
    //前台网络地址
    sidePath: 'http://localhost:7041/',
    //接口网络地址
    webApi: 'http://localhost:14195/api/',
    //接口网络地址用来请求图片
    PathAshx: 'http://localhost:14195/',
    //车辆对接平台网络地址
    carPath: 'http://116.247.83.157/',
    //带tabbar切换的菜单栏显示数据条数
    pageSize: 11,
    //不带tabbar菜单栏显示数据条数
    pagetwoSize: 12,
    //低洼地段报警历史数据显示条数
    lowLyingHistoryPageSize: 7,
    //实时请求秒数(单位秒)
    ajaxsecond: 1000,
}

//车辆平台对接账号密码
var carCode = {
    /*高照账号密码*/
    gz_accout: 'gz',
    gz_password: '000000',
}


/*=========================*/
/*========-三维配置处==============*/
/*=========================*/
/*发布项目的磁盘路径*/
var threeMapUser = {
    //IP地址
    ipAddress: '10.80.2.156',
    //端口
    port: '9091',
    //IP地址和端口
    ipAddressPort: '10.80.2.156@9091@',
    //账号
    Name: 'admin',
    //密码
    Password: 'admin',
    //服务名
    ServerName: 'xiuzhou',
}

var diskPath = {
    diskIconPath: "D:\\work\\嘉兴秀洲\\JXXZ.ZHCG\\JXXZ.ZHCG\\JXXZ.ZHCG.Web"
}

var tooltipPath = {
    tooltip: '/kl-tip/departTip.html'
}

var IconPath = {
    //人员定位
    peopleIcon: "\\Image\\localtion\\people.png",
    //车辆定位
    carIcon: "\\Image\\localtion\\car.png",
    //监控定位
    cameraIcon: "\\Image\\localtion\\camera.png",
    //事件定位
    eventIcon: "\\Image\\localtion\\event.png",
    //案件定位
    caseIcon: "\\Image\\localtion\\case.png",
    //违停案件
    IllegallyIcon: "\\Image\\localtion\\wtaj.png",
    //沿街店家
    streetIcon: "\\Image\\localtion\\street.png",
    //小摊小贩
    hawkerIcon: "\\Image\\localtion\\hawker.png",
    //审批
    approvalIcon: "\\Image\\localtion\\politics.png"
}

var configajaxUrl = {
    //人员列表
    peoplelist: '/User/GetZDUserList',
    //人员详情
    peopledetails: '/User/GetUserById',
    //人员今日上报事件
    todayeventbyuser: '/CitizenEvent/GetCitizenModel',
    //人员轨迹回放
    userTrack: '/Track/GetPlayTrack',
    //人员周边
    userPeriphery: '/FrontDesk/GetPeriphery',
    //一般案件列表接口
    ajlisturl: '/CommonCase/GetDateAllCaseListApi',
    //简易案件详情接口
    simpleCase: '/SimpleCase/GetSimpleCaseModel',
    //一般案件详情接口
    ajdetailurl: '/CommonCase/GetCaseModel',
    //一般案件环节
    ajlink: '/CommonCase/GetCaseOidList',
    //违停案件列表接口
    wtajlisturl: '/Violated/GetDateAllCaseWtajsList',
    //违停案件详情接口
    wtajdetailurl: '/Violated/GetcaseModel',
    //事件列表接口
    eventlisturl: '/CitizenEvent/GetDateAllCitizenServicesList',
    //事件详情接口
    eventlistdetails: '/CitizenEvent/GetCitizenServiceModel',
    //事件处理流程
    eventlinklist: '/CitizenEvent/GetOldList',
    //事件处理图片
    eventpicture:'/CitizenEvent/GetCitizenServicesAttr',
    //监控树
    cameraTree: '/Monitor/GetTreeMonitorApi',
    //监控专题
    cameratopics:'/receptionMonitor/GetMonitoreTreeList',
    //养护合同列表
    curingcontractlist: '/Contract/GetContractList',
    //养护详情接口
    curingcontractdetails: '/Contract/GetContractModel',
    //养护考核信息
    curingAssessmentInfo: '/Contract/GetExaminesModel',
    //养护考核扣分记录
    curingAssessmentPoints: '/Contract/GetFractionList',
    //违建列表
    nobuildlist: '/IllegallyBuilt/GetwzjzList',
    //违建详情
    nobuilddetails: '/IllegallyBuilt/GetWzjzModel',
    //拆迁列表
    demolitionlist: '/Demolition/GetCqxmList',
    //拆迁详情
    demolitiondetails: '/Demolition/GetCqxmModel',
    //轨迹回放
    palyTrackaddress: '/Track/GetPlayTrack',
    //事件前台底部数据
    receptionevent: '/receptionEvent/eventAll',
    //首页前台调用
    firstPage: '/receptionFirstPage/GetFirstPage',
    //前台案件接口
    caseBottom: '/receptionCases/getreceptionCase',
    //前台监控接口
    monitorBottom: '/receptionMonitor/MonitorAll',
    //前台养护底部接口
    curringPieBottom: '/receptionExamine/GetExamine',
    curringCenterBottom: '/receptionExamine/GetExamineList',
    //人员前台底部接口
    personBottom: '/User/GetTodayOnlineByTeam',
    personOnlineBottom: '/User/GetTodayOnlineCount',
    //报表中心案件统计
    caseCountStatistics: '/receptionCases/getCase',
    caseSixtypeStatistics: '/receptionCases/getCaseBytype',
    caseTypeStatistics: '/receptionCases/GetCaseTypeStatistics',
    caseStatusStatistics: '/receptionCases/GetCaseStatus',
    //报表中心事件统计
    eventReportStatistics: '/receptionEvent/getEvent',
    eventOnWeekStatistics: '/receptionEvent/getEventTrend',
    eventMiddleStatistics: '/receptionEvent/getEventProfile',
    eventClassAnalysis: '/receptionEvent/getEventProfile',
    //部件列表数据
    partlist: '/Part/GetPartList',
    partdetails: 'Part/GetPartDetail',
    //全部定位
    alllocation: '/FrontDesk/GetALLPeriphery',
    //框选
    allPointSelect: '/FrontDesk/getcamera',
    //事件个数
    eventNumber: '/FrontDesk/getSjCount',
    //案件个数
    caseNumber: '/FrontDesk/getAjCount',
    //其他底部所有数据
    ontherBottom: '/FrontDesk/GetMenuCount',
    //无人机
    uavList: '/basicinfo/GetFoldersForWeb',
    //事件大类分析
    getEventBytype: '/receptionEvent/getEventBytype',
    //专项整治
    renovation: '/SpecialTask/GetAllSpecialTaskList',
    renovationdetails: '/SpecialTask/GetSpecialTaskModel',
    getEventBytype: '/receptionEvent/getEventBytype',
    unitName:'/Unit/GetUnitName',
    //部件小摊小贩 沿街店家
    getStreeShopList: '/LawObject/GetStreeShopList',
    //部件黑名单
    getBlackList: '/LawObject/GetBlackList',
    //部件小摊小贩 查看详情
    getStreetShopsInf: '/LawObject/GetStreetShopsInf',
    //部件沿街店家 查看详情
    getHawkerInf: '/LawObject/GetHawkerInf',
    //车辆列表
    carlist: '/Car/GetCarList',
    cardetails: '/Car/GetCarInfo',
    //低洼地段报警接口
    callPolice: '/FrontDesk/GetDwddIsPolice',
    callPoliceToValue: '/FrontDesk/GetDwddPoliceCount',
    //部件底部数据
    partsBottom: '/FrontDesk/GetBj',
    //标点接口
    addPoints: '/Customs/AddCustoms',
    singlePoints: '/Customs/GetCustomModel',
    allPoints: '/Customs/GetCustomList',
    deletePoints: '/Customs/DeleteCustomModel',
    //巡查任务
    PatrolMission: '/TeamDuty/GetApiUserTaskList',
    //低洼地段列表
    lowLyingAreaList: '/LowLying/GetApiLowLyinglist',
    lowLyingOutline: '/LowLying/GetLowLyingModel',
    lowLyingHistory: '/LowLying/GetLowLyingCaveatList',
    //行政审批列表
    toExamineList: '/Approval/GetAllApprovalList',
    toExamineDetails: '/Approval/ApprovalDetail',
    toExamineLocation: '/Approval/GetApprovalDetail',
    //网格区域接口
    gridAreaPlaygon: '/UnitGrid/GetUnitGridModel',
    gridsingle: '/UnitGrid/GetUnitGrid',
    //三维部件选取接口
    threeMapDepar: '/Part/GetPartDetailCode',
    //车辆平台对接登录接口
    carloginInterface: '/StandardApiAction_login.action',
    //车辆平台gps定位接口
    carlocationInterface: '/StandardApiAction_getDeviceStatus.action',
    //车辆平台gps历史轨迹
    carHistoryTrack: '/StandardApiAction_queryTrackDetail.action',
    //车辆平台视频
    carVideoAddRess: '/808gps/open/player/video.html',
}

var configType = {
    ybaj: 'ybaj',
    ybajsc: 'ybajsc', //执法案件一般搜索
    ybajgsc: 'ybajgsc',//执法案件高级筛选
    wtaj: 'wtaj',       //违停案件
    wtajsc: 'wtajsc',   //违停案件一般搜索
    wtajgsc: 'wtajgsc', //违停案件高级筛选
    event: 'sj',
    eventoc: 'sjoc',   //事件左下角点击筛选
    eventAS:'sjgj',
    camera: 'jk',
    people: 'ry',
    curringContract: 'yh',
    curringContractsc: 'yhsc',
    nobuild: 'wc',
    nobuildsc: 'wcsc',
    demolition: 'cq',
    demolitionsc: 'cqsc',
    partlist: 'bj',
    buttonPartStore: 'buttonPartStore',//部件右下角  沿街店家
    buttonPartStoresc: 'buttonPartStoresc',//部件右下角  沿街店家搜索
    buttonPartStalls: 'buttonPartStalls',//部件右下角  小摊小贩
    buttonPartStallssc: 'buttonPartStallssc',//部件右下角  小摊小贩
    buttonBlackListStore: 'buttonBlackListStore',//沿街店家黑名单
    buttonPartStoreblacksc: 'buttonPartStoreblacksc',//沿街店家黑名单搜索
    buttonBlackListStalls: 'buttonBlackListStalls',//小摊小贩黑名单
    buttonPartStallsblacksc: 'buttonPartStallsblacksc',//小摊小贩黑名单搜索
    renovation: 'zz',
    cartype: 'cl',
    lowLyingType: 'jsd',
    toExamine:'sp',
}

