var gWndId = 0;
var nDirect = -1;
var nOper = -1;
var gXmlRecords;
var gRecordPath;
var bLogin = 0;
var szCameraId = "";
function switchTab(n) {
    //for(var i=1;i<=3;i++)
    //	{
    //		document.getElementById("tab_" + i).className = "";
    //		document.getElementById("tab_con_" + i).style.display = "none";
    //	}
    //	document.getElementById("tab_" + n).className = "on";
    //	document.getElementById("tab_con_" + n).style.display = "block";
}

function getStrLength(str) {
    var cArr = str.match(/[^\x00-\xff]/ig);
    return str.length + (cArr == null ? 0 : cArr.length);
}

function init() {

    //switchTab(1);
    var obj = document.getElementById("DPSDK_OCX");
    gWndId = obj.DPSDK_CreateSmartWnd(0, 0, 100, 100);
    ButtonLogin_onclick();
    ButtonCreateWnd_onclick(1);

    //var obj = document.getElementById("DPSDK_OCX");
    //ShowCallRetInfo(obj.DPSDK_Login("172.7.123.123", 9000, "1", "1"), "登录");
    //ShowCallRetInfo(obj.DPSDK_AsyncLoadDGroupInfo(), "异步加载组织结构");
    //var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    //ShowCallRetInfo(obj.DPSDK_DirectRealplayByWndNo(gWndId, nWndNo, "1000001$1$0$0", 1, 1, 1), "直接实时播放");
    for (var i = 1; i <= 4; i++) {
        obj.DPSDK_SetToolBtnVisible(i, false);
        obj.DPSDK_SetToolBtnVisible(7, false);
        obj.DPSDK_SetToolBtnVisible(9, false);
        obj.DPSDK_SetControlButtonShowMode(1, 0);
        obj.DPSDK_SetControlButtonShowMode(2, 0);
    }
    var url = window.location.search;
    var str = url.split("=")[1];
    ButtonStartRealplayByWndNo_onclick(str);
}
function SetLog() {
    var obj = document.getElementById("DPSDK_OCX");
    var fileSave = new ActiveXObject("MSComDlg.CommonDialog");
    fileSave.MaxFileSize = 128;
    fileSave.ShowSave();
    if (fileSave.fileName == "")
        return -1;
    return obj.DPSDK_SetLog(4, fileSave.fileName, true, true);
}
function ShowCallRetInfo(nRet, strInfo) {
    //if (nRet != 0)
    //{
    //    var obj = document.getElementById("DPSDK_OCX");
    //    alert(strInfo + ": ErrorCode = "+obj.DPSDK_GetLastError());
    //}

    var str = "";
    if (nRet == 0) {
        str = strInfo + " 成功！";
    }
    else {
        str = strInfo + "失败！错误码：" + nRet;
    }
}
function getDate(strDate) {
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
	function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    return date;
}

function ButtonCreateWnd_onclick(count) {
    var obj = document.getElementById("DPSDK_OCX");
    //修改窗口个数
    //var nWndCount = document.getElementById("textWndNum").value;
    obj.DPSDK_SetWndCount(gWndId, count);
    obj.DPSDK_SetSelWnd(gWndId, 0);
}

function ButtonSetCustomizedWndCount_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndCount = document.getElementById("textWndNum2").value;
    obj.DPSDK_SetCustomizedWndCount(gWndId, nWndCount);
    obj.DPSDK_SetSelWnd(gWndId, 0);
}

function ButtonLogin_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    //var szIp = document.getElementById("textIP").value;
    //var nPort = document.getElementById("textPort").value;
    //var szUsername = document.getElementById("textUser").value;
    //var szPassword = document.getElementById("textPassword").value;
    var szIp = "111.1.31.147";
    var nPort = "9000";
    var szUsername = "xzqxzzfj";
    var szPassword = "a82289823";
    var nRet = obj.DPSDK_Login(szIp, nPort, szUsername, szPassword);
    ShowCallRetInfo(nRet, "登录");
    if (nRet == 0) {
        bLogin = 1;
    }
    ButtonLoadDGroupInfo_onclick();
}

function ButtonLogout_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    if (bLogin == 1) {
        ShowCallRetInfo(obj.DPSDK_Logout(), "登出");
        bLogin = 0;
    }
}


function ButtonLoadDGroupInfo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    ShowCallRetInfo(obj.DPSDK_LoadDGroupInfo(), "加载组织结构");

}

function ButtonAsyncLoadDGroupInfo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    ShowCallRetInfo(obj.DPSDK_AsyncLoadDGroupInfo(), "异步加载组织结构");
    //alert(obj.DPSDK_GetDGroupStr());
}

function ButtonStartRealplayByWndNo_onclick(value) {
    szCameraId = value;
    var obj = document.getElementById("DPSDK_OCX");
    //szCameraId = document.getElementById("textCameraID").value;
    //var nStreamType = document.getElementById("selectStreamType").value;
    var nStreamType = 1;//1主码流或者2辅码流
    //var nMediaType = document.getElementById("selectMediaType").value;
    var nMediaType = 1;//1视频，2音频，3视频和音频
    //var nTransType = document.getElementById("selectTransType").value;
    var nTransType = 1;//1TCP,2UDP
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    ShowCallRetInfo(obj.DPSDK_StartRealplayByWndNo(gWndId, nWndNo, szCameraId, nStreamType, nMediaType, nTransType), "播放视频");
}

function ButtonStartRealplayByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    var szCameraId = document.getElementById("textCameraID").value;
    var nStreamType = document.getElementById("selectStreamType").value;
    var nMediaType = document.getElementById("selectMediaType").value;
    var nTransType = document.getElementById("selectTransType").value;

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    ShowCallRetInfo(obj.DPSDK_StartRealplayByHWND(hWnd, szCameraId, nStreamType, nMediaType, nTransType), "播放视频");
}

function ButtonStopRealplayByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    ShowCallRetInfo(obj.DPSDK_StopRealplayByWndNo(gWndId, nWndNo), "停止播放视频");
}

function ButtonStopRealplayByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    ShowCallRetInfo(obj.DPSDK_StopRealplayByHWND(hWnd), "停止播放视频");
}

function ButtonStartRecordByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var mydate = new Date();
    var reg = new RegExp(":", "g");
    var path = "c:\\dahuaVideo\\" + mydate.toLocaleString().replace(" ", "").replace("年", "").replace("月", "").replace("日", "").replace(reg, "") + ".dav";
    alert("存储路径：" + path)

    ShowCallRetInfo(obj.DPSDK_StartRealRecordByWndNo(gWndId, nWndNo, path), "实时视频录制");
}

function ButtonStartRecordByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    var mydate = new Date();
    var reg = new RegExp(":", "g");
    var path = "c:\\dahuaVideo\\" + mydate.toLocaleString().replace(" ", "").replace("年", "").replace("月", "").replace("日", "").replace(reg, "") + ".dav";
    alert("存储路径：" + path)

    ShowCallRetInfo(obj.DPSDK_StartRealRecordByHWND(hWnd, path), "实时视频录制");
}

function ButtonStopRecordByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    ShowCallRetInfo(obj.DPSDK_StopRealRecordByWndNo(gWndId, nWndNo), "停止实时视频录制");
}

function ButtonStopRecordByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    ShowCallRetInfo(obj.DPSDK_StopRealRecordByHWND(hWnd), "停止实时视频录制");
}

function ButtonSetOsdTxtByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var strOSD = document.getElementById("text7").value;
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    ShowCallRetInfo(obj.DPSDK_SetOsdTxtByWndNo(gWndId, nWndNo, strOSD), "OSD文本信息下发");
}

function ButtonSetOsdTxtByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var strOSD = document.getElementById("text7").value;
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    ShowCallRetInfo(obj.DPSDK_SetOsdTxtByHWND(hWnd, strOSD), "OSD文本信息下发");
}

function ButtonCleanUpOsdInfoByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    ShowCallRetInfo(obj.DPSDK_CleanUpOsdInfoByWndNo(gWndId, nWndNo), "清除osd信息");
}

function ButtonCleanUpOsdInfoByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    ShowCallRetInfo(obj.DPSDK_CleanUpOsdInfoByHWND(hWnd), "清除osd信息");
}

function ButtonCapturePictureByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var mydate = new Date();
    var reg = new RegExp(":", "g");
    var path = "c:\\dahuaphoto\\" + mydate.toLocaleString().replace(" ", "").replace("年", "").replace("月", "").replace("日", "").replace(reg, "") + ".bmp";
    alert("存储路径：" + path)
    ShowCallRetInfo(obj.DPSDK_CapturePictureByWndNo(gWndId, nWndNo, path), "抓图");
}

function ButtonCapturePictureByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    var mydate = new Date();
    var reg = new RegExp(":", "g");
    var path = "c:\\dahuaphoto\\" + mydate.toLocaleString().replace(" ", "").replace("年", "").replace("月", "").replace("日", "").replace(reg, "") + ".bmp";
    alert("存储路径：" + path)

    ShowCallRetInfo(obj.DPSDK_CapturePictureByHWND(hWnd, path), "抓图");
}

function ButtonCapturePictureByWndNoAndUpload_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var mydate = new Date();
    var reg = new RegExp(":", "g");
    var path = "c:\\dahuaphoto\\" + mydate.toLocaleString().replace(" ", "").replace("年", "").replace("月", "").replace("日", "").replace(reg, "") + ".bmp";
    alert("存储路径：" + path)
    ShowCallRetInfo(obj.DPSDK_CapturePictureByWndNo(gWndId, nWndNo, path), "抓图");

    var szCameraId = document.getElementById("textCameraID").value;
    var szIp = document.getElementById("textFtpIp").value;
    var szName = document.getElementById("textFtpName").value;
    var szPwd = document.getElementById("textFtpPwd").value;
    var timestamp = Date.parse(new Date()) / 1000;
    var nRet = obj.DPSDK_UploadFtpPic(szCameraId, timestamp, path, "ftp://" + szIp, szName, szPwd);
    if (nRet != 0)
        ShowCallRetInfo(nRet, "上传");
    else
        alert("已上传至ftp://" + szIp);
}

function ButtonCapturePictureByHWNDAndUpload_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    var mydate = new Date();
    var reg = new RegExp(":", "g");
    var path = "c:\\dahuaphoto\\" + mydate.toLocaleString().replace(" ", "").replace("年", "").replace("月", "").replace("日", "").replace(reg, "") + ".bmp";
    alert("存储路径：" + path)
    ShowCallRetInfo(obj.DPSDK_CapturePictureByHWND(hWnd, path), "抓图");

    var szCameraId = document.getElementById("textCameraID").value;
    var szIp = document.getElementById("textFtpIp").value;
    var szName = document.getElementById("textFtpName").value;
    var szPwd = document.getElementById("textFtpPwd").value;
    var timestamp = Date.parse(new Date()) / 1000;
    var nRet = obj.DPSDK_UploadFtpPic(szCameraId, timestamp, path, "ftp://" + szIp, szName, szPwd);
    if (nRet != 0)
        ShowCallRetInfo(nRet, "上传");
    else
        alert("已上传至ftp://" + szIp);
}

function ButtonGetAudioChannelsByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var ret = obj.DPSDK_GetAudioChannelsByWndNo(gWndId, nWndNo);
    document.getElementById("textAudioNum").innerText = ret;
}

function ButtonGetAudioChannelStateByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var index = document.getElementById("textAudioIndex").value;
    var ret = obj.DPSDK_GetAudioChannelStateByWndNo(gWndId, nWndNo, index);
    document.getElementById("textAudioState").innerText = (ret == true ? 1 : 0) + "";
}

function ButtonSetAudioChannelByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var index = document.getElementById("textAudioIndex").value;
    var strAudioState = document.getElementById("textAudioState").value;
    ShowCallRetInfo(obj.DPSDK_SetAudioChannelByWndNo(gWndId, nWndNo, index, strAudioState == 0 ? false : true), "设置音频状态");
}

function ButtonGetAudioChannelsByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);
    var ret = obj.DPSDK_GetAudioChannelsByHWND(hWnd);
    document.getElementById("textAudioNum").innerText = ret;
}

function ButtonGetAudioChannelStateByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);
    var index = document.getElementById("textAudioIndex").value;
    var ret = obj.DPSDK_GetAudioChannelStateByHWND(hWnd, index);
    document.getElementById("textAudioState").innerText = (ret == true ? 1 : 0) + "";
}

function ButtonSetAudioChannelByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);
    var index = document.getElementById("textAudioIndex").value;
    var strAudioState = document.getElementById("textAudioState").value;
    ShowCallRetInfo(obj.DPSDK_SetAudioChannelByHWND(hWnd, index, strAudioState == 0 ? false : true), "设置音频状态");
}

function ButtonStopRealplayByCameraId_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var strCameraID = document.getElementById("textCameraID").value;
    ShowCallRetInfo(obj.DPSDK_StopRealplayByCameraId(strCameraID), "关闭CAM");
}

function ButtonPtzDirection_onclick(nDirects) {
    var obj = document.getElementById("DPSDK_OCX");
    //var szCameraId = document.getElementById("textCameraID").value;
    nDirect = nDirects;
    var nStep = document.getElementById("selectPtzDirectionStep").value;
    ShowCallRetInfo(obj.DPSDK_PtzDirection(szCameraId, nDirect, nStep, 0), "方向控制");
}

function ButtonPtzDirection_onclickStop(bStop) {
    var obj = document.getElementById("DPSDK_OCX");
    //var szCameraId = document.getElementById("textCameraID").value;
    var nStep = document.getElementById("selectPtzDirectionStep").value;
    ShowCallRetInfo(obj.DPSDK_PtzDirection(szCameraId, nDirect, nStep, bStop), "方向控制");
}

function ButtonPtzCameraOperation_onclick(nOpers) {
    var obj = document.getElementById("DPSDK_OCX");
    //var szCameraId = document.getElementById("textCameraID").value;
    nOper = nOpers;
    var nStep = document.getElementById("selectCameraStep").value;
    ShowCallRetInfo(obj.DPSDK_PtzCameraOperation(szCameraId, nOper, nStep, 0), "镜头控制");
}

function ButtonPtzCameraOperation_onclickStop(bStop) {
    var obj = document.getElementById("DPSDK_OCX");
    //var szCameraId = document.getElementById("textCameraID").value;
    var nStep = document.getElementById("selectCameraStep").value;
    ShowCallRetInfo(obj.DPSDK_PtzCameraOperation(szCameraId, nOper, nStep, bStop), "镜头控制");
}

function ButtonPtzSit_onclick() {

    var obj = document.getElementById("DPSDK_OCX");

    var szCameraId = document.getElementById("textCameraID").value;
    var nXPosition = document.getElementById("textXPosition").value;
    var nYPosition = document.getElementById("textYPosition").value;
    var nStep = document.getElementById("selectPtzSitStep").value;

    ShowCallRetInfo(obj.DPSDK_PtzSit(szCameraId, nXPosition, nYPosition, nStep), "三维定位");

    var obj = document.getElementById("DPSDK_OCX");
}
function ButtonAddPrePoint_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var szCameraId = document.getElementById("textCameraID").value;
    var nPrePointNum = document.getElementById("textPrePointNum").value;
    var strPrePointName = document.getElementById("textPrePointName").value;
    ShowCallRetInfo(obj.DPSDK_PtzPrePointOperation(szCameraId, nPrePointNum, strPrePointName, 2), "增加预置点");
}

function ButtonDelPrePoint_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var szCameraId = document.getElementById("textCameraID").value;
    var nPrePointNum = document.getElementById("textPrePointNum").value;
    var strPrePointName = document.getElementById("textPrePointName").value;

    ShowCallRetInfo(obj.DPSDK_PtzPrePointOperation(szCameraId, nPrePointNum, strPrePointName, 3), "删除预置点");
}

function ButtonQueryPrePoint_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var szCameraId = document.getElementById("textCameraID").value;

    //alert(obj.DPSDK_QueryPrePoint(szCameraId));
}

function ButtonSeekPrePoint_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var szCameraId = document.getElementById("textCameraID").value;
    var nPrePointNum = document.getElementById("textPrePointNum").value;
    var strPrePointName = document.getElementById("textPrePointName").value;

    ShowCallRetInfo(obj.DPSDK_PtzPrePointOperation(szCameraId, nPrePointNum, strPrePointName, 1), "定位预置点");
}
function getDate(strDate) {
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
	function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    return date;
}

function ButtonQueryRecord_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var szCameraId = document.getElementById("textCameraID").value;
    var nRecordSource = document.getElementById("selectRecordSource").value;
    var nRecordType = document.getElementById("selectRecordType").value;
    var strStartTime = document.getElementById("textStartTime").value;
    var strEndTime = document.getElementById("textEndTime").value;
    var nStartTime = getDate(strStartTime).getTime() / 1000;
    //	alert(nStartTime);
    var nEndTime = getDate(strEndTime).getTime() / 1000;
    //	alert(nEndTime);

    //    ShowCallRetInfo(obj.DPSDK_QueryRecordInfo(szCameraId, nRecordSource, nRecordType, nStartTime, nEndTime), "查询录像");

    //	gXmlRecords = obj.DPSDK_QueryRecordInfo(szCameraId, nRecordSource, nRecordType, nStartTime, nEndTime);
    obj.DPSDK_QueryRecordInfo(szCameraId, nRecordSource, nRecordType, nStartTime, nEndTime);
}

function ButtonStartFilePlaybackByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var nFileIndex = document.getElementById("textFileIndex").value;
    ShowCallRetInfo(obj.DPSDK_StartFilePlaybackByWndNo(gWndId, nWndNo, nFileIndex), "按文件回放");
}

function ButtonStartFilePlaybackByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    var nFileIndex = document.getElementById("textFileIndex").value;
    ShowCallRetInfo(obj.DPSDK_StartFilePlaybackByHWND(hWnd, nFileIndex), "按文件回放");
}

function ButtonStartTimePlaybackByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var szCameraId = document.getElementById("textCameraID").value;
    var nRecordSource = document.getElementById("selectRecordSource").value;
    //   var nRecordType = document.getElementById("selectRecordType").value;
    var strStartTime = document.getElementById("textStartTime").value;
    var strEndTime = document.getElementById("textEndTime").value;
    var nStartTime = getDate(strStartTime).getTime() / 1000;
    var nEndTime = getDate(strEndTime).getTime() / 1000;

    ShowCallRetInfo(obj.DPSDK_StartTimePlaybackByWndNo(gWndId, nWndNo, szCameraId, nRecordSource, nStartTime, nEndTime), "按时间回放");
}

function ButtonStartTimePlaybackByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    var szCameraId = document.getElementById("textCameraID").value;
    var nRecordSource = document.getElementById("selectRecordSource").value;
    //   var nRecordType = document.getElementById("selectRecordType").value;
    var strStartTime = document.getElementById("textStartTime").value;
    var strEndTime = document.getElementById("textEndTime").value;
    var nStartTime = getDate(strStartTime).getTime() / 1000;
    var nEndTime = getDate(strEndTime).getTime() / 1000;

    ShowCallRetInfo(obj.DPSDK_StartTimePlaybackByHWND(hWnd, szCameraId, nRecordSource, nStartTime, nEndTime), "按时间回放");
}

function ButtonPausePlaybackByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    ShowCallRetInfo(obj.DPSDK_PausePlaybackByWndNo(gWndId, nWndNo), "暂停回放");
}

function ButtonPausePlaybackByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    ShowCallRetInfo(obj.DPSDK_PausePlaybackByHWND(hWnd), "暂停回放");
}

function ButtonResumePlaybackByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    ShowCallRetInfo(obj.DPSDK_ResumePlaybackByWndNo(gWndId, nWndNo), "继续回放");
}

function ButtonResumePlaybackByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    ShowCallRetInfo(obj.DPSDK_ResumePlaybackByHWND(hWnd), "继续回放");
}

function ButtonStopPlaybackByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    ShowCallRetInfo(obj.DPSDK_StopPlaybackByWndNo(gWndId, nWndNo), "停止回放");
}

function ButtonStopPlaybackByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    ShowCallRetInfo(obj.DPSDK_StopPlaybackByHWND(hWnd), "停止回放");
}

function ButtonSetPlaybackSpeedByWndNo_onclick(nPlaybackRate) {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    //var nPlaybackRate = document.getElementById("selectPlaybackRate").value;
    //alert(nPlaybackRate);
    var str = "设置 回放速度X" + nPlaybackRate / 8 + " ";
    ShowCallRetInfo(obj.DPSDK_SetPlaybackSpeedByWndNo(gWndId, nWndNo, nPlaybackRate), str);
}

function ButtonSetPlaybackSpeedByHWND_onclick(nPlaybackRate) {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);
    //var nPlaybackRate = document.getElementById("selectPlaybackRate").value;
    //alert(nPlaybackRate);
    var str = "设置 回放速度X" + nPlaybackRate / 8 + " ";
    ShowCallRetInfo(obj.DPSDK_SetPlaybackSpeedByHWND(hWnd, nPlaybackRate), str);
}

function ButtonDownloadRecordByFile_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var mydate = new Date();
    var reg = new RegExp(":", "g");
    gRecordPath = "c:\\dahuarecord\\" + mydate.toLocaleString().replace(" ", "").replace("年", "").replace("月", "").replace("日", "").replace(reg, "") + ".dav";
    var nFileIndex = document.getElementById("textFileIndex").value;
    alert("存储路径：" + gRecordPath);
    ShowCallRetInfo(obj.DPSDK_DownloadRecordByFile(gRecordPath, 0), "按文件下载");
}

function ButtonDownloadRecordByTime_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var szCameraId = document.getElementById("textCameraID").value;
    var nRecordSource = document.getElementById("selectRecordSource").value;
    //   var nRecordType = document.getElementById("selectRecordType").value;
    var strStartTime = document.getElementById("textStartTime").value;
    var strEndTime = document.getElementById("textEndTime").value;
    var nStartTime = getDate(strStartTime).getTime() / 1000;
    var nEndTime = getDate(strEndTime).getTime() / 1000;
    var mydate = new Date();
    var reg = new RegExp(":", "g");
    gRecordPath = "c:\\dahuarecord\\" + mydate.toLocaleString().replace(" ", "").replace("年", "").replace("月", "").replace("日", "").replace(reg, "") + ".dav";
    alert("存储路径：" + gRecordPath);
    ShowCallRetInfo(obj.DPSDK_DownloadRecordByTime(gRecordPath, szCameraId, nRecordSource, nStartTime, nEndTime), "按时间下载");
}

function ButtonPauseDownloadRecord_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var mydate = new Date();
    var reg = new RegExp(":", "g");
    //var path="c:\\dahuarecord\\"+mydate.toLocaleString().replace(" ","").replace("年","").replace("月","").replace("日","").replace(reg,"")+".dav";
    //alert("存储路径："+path);
    ShowCallRetInfo(obj.DPSDK_PauseDownloadRecord(gRecordPath), "暂停下载");
}

function ButtonResumeDownloadRecord_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var mydate = new Date();
    var reg = new RegExp(":", "g");
    //var path="c:\\dahuarecord\\"+mydate.toLocaleString().replace(" ","").replace("年","").replace("月","").replace("日","").replace(reg,"")+".dav";
    //alert("存储路径："+path);
    ShowCallRetInfo(obj.DPSDK_ResumeDownloadRecord(gRecordPath), "继续下载");
}

function ButtonStopDownloadRecord_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var mydate = new Date();
    var reg = new RegExp(":", "g");
    //var path="c:\\dahuarecord\\"+mydate.toLocaleString().replace(" ","").replace("年","").replace("月","").replace("日","").replace(reg,"")+".dav";
    //alert("存储路径："+path);
    ShowCallRetInfo(obj.DPSDK_StopDownloadRecord(gRecordPath), "停止下载");
}

function ButtonPlaybackCaptureByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var mydate = new Date();
    var reg = new RegExp(":", "g");
    var path = "c:\\dahuaphoto\\" + mydate.toLocaleString().replace(" ", "").replace("年", "").replace("月", "").replace("日", "").replace(reg, "") + ".bmp";
    alert("存储路径：" + path);
    ShowCallRetInfo(obj.DPSDK_CapturePictureByWndNo(gWndId, nWndNo, path), "抓图");
}

function ButtonPlaybackCaptureByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    var mydate = new Date();
    var reg = new RegExp(":", "g");
    var path = "c:\\dahuaphoto\\" + mydate.toLocaleString().replace(" ", "").replace("年", "").replace("月", "").replace("日", "").replace(reg, "") + ".bmp";
    alert("存储路径：" + path);
    ShowCallRetInfo(obj.DPSDK_CapturePictureByHWND(hWnd, path), "抓图");
}

function ButtonEnableAlarm_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var szDevID = document.getElementById("textDeviceID").value;
    var nVideoChannel = document.getElementById("textVideoChan").value;
    var nAlarmChannel = document.getElementById("textAlarmChan").value;
    var nAlarmType = document.getElementById("selectAlarmType2").value;

    ShowCallRetInfo(obj.DPSDK_EnableAlarm(szDevID, nVideoChannel, nAlarmChannel, nAlarmType), "布控");
}

function ButtonDisableAlarm_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    ShowCallRetInfo(obj.DPSDK_DisableAlarm(), "撤控");
}

function ButtonQueryAlarmInfo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var szCameraId = document.getElementById("textCameraID").value;
    var nAlarmType = document.getElementById("selectAlarmType").value;
    var strStartTime = document.getElementById("textAlarmStartTime").value;
    var strEndTime = document.getElementById("textAlarmEndTime").value;
    var nStartTime = getDate(strStartTime).getTime() / 1000;
    var nEndTime = getDate(strEndTime).getTime() / 1000;

    var nCount = obj.DPSDK_QueryAlarmCount(szCameraId, nAlarmType, nStartTime, nEndTime);

    if (nCount > 0) {
        var nIndex;
        var strAlarmInfo = obj.DPSDK_QueryAlarmInfo(szCameraId, nAlarmType, nStartTime, nEndTime, nIndex, 500);
        alert(strAlarmInfo);
    }
    else {
        alert("无报警信息！");
    }
}


//电视墙操作方法
function getWallCount() {
    var obj = document.getElementById("DPSDK_OCX");
    var count = obj.DPSDK_QueryTvWallList();
    writewall("获取电视墙总数:" + count);
    //alert("获取电视墙总数:"+count);
}
function writewall(info) {
    document.getElementById("wallinfoxml").innerText = info;
}
function getWallInfo() {
    var obj = document.getElementById("DPSDK_OCX");
    var allstr = obj.DPSDK_GetTvWallList();
    writewall("获取电视墙信息:" + allstr);
    var xmlDoc = loadXML(allstr);
    var elements = xmlDoc.getElementsByTagName("TvWall");
    var objSelect = document.getElementById("wallid");
    objSelect.options.length = 0;
    for (var i = 0; i < elements.length; i++) {
        var tvWallId = elements[i].getAttribute("tvWallId");
        var name = elements[i].getAttribute("name");
        //var tvWallId = elements[i].getElementsByTagName("TvWall").getAttribute("tvWallId").value;
        //var name = elements[i].getElementsByTagName("name")[0].firstChild.nodeValue;
        //alert(tvWallId+"----"+name);
        var varItem = new Option(name, tvWallId);
        objSelect.options.add(varItem);
    }
}

function getWallLayout() {
    var obj = document.getElementById("DPSDK_OCX");
    var wallid = document.getElementById("wallid").value;
    //alert(wallid);
    var allstr = obj.DPSDK_QueryTvWallLayout(wallid);
    writewall("获取电视墙布局:" + allstr);
}

function getOneWallLayout() {
    var obj = document.getElementById("DPSDK_OCX");
    var wallid = document.getElementById("wallid").value;
    var wallstr = obj.DPSDK_GetTvWallLayout(wallid);
    writewall("得到电视墙布局" + wallstr);
}

function CutWall() {
    var obj = document.getElementById("DPSDK_OCX");
    var wallid = document.getElementById("wallid").value;
    var nSplitCount = document.getElementById("textSplitCount").value;
    var nScreenId = document.getElementById("textScreenId").value;
    var statue = obj.DPSDK_SetTvWallScreenSplit(wallid, nScreenId, nSplitCount);
    ShowCallRetInfo(statue, "电视墙分割");
}

function wallset() {
    var obj = document.getElementById("DPSDK_OCX");
    var wallid = document.getElementById("wallid").value;
    var nScreenId = document.getElementById("textScreenId").value;
    var szCamId = document.getElementById("textCamId").value;
    var nWinNo = document.getElementById("textWndNo").value;
    var statue = obj.DPSDK_SetTvWallScreenWindowSource(wallid, nScreenId, nWinNo, szCamId, 1, 30);
    ShowCallRetInfo(statue, "设置电视墙");
}


function wallclose() {
    var obj = document.getElementById("DPSDK_OCX");
    var wallid = document.getElementById("wallid").value;
    var nScreenId = document.getElementById("textScreenId2").value;
    var nWinNo = document.getElementById("textWndNo").value;
    var statue = obj.DPSDK_CloseTvWallScreenWindowSource(wallid, nScreenId, nWinNo);
    ShowCallRetInfo(statue, "电视墙关闭");
}


function WallClean() {
    var obj = document.getElementById("DPSDK_OCX");
    var wallid = document.getElementById("wallid").value;
    var nSplitCount = document.getElementById("textSplitCount").value;
    var nScreenId = document.getElementById("textScreenId2").value;
    var statue = obj.DPSDK_ClearTvWallScreen(wallid);
    ShowCallRetInfo(statue, "电视墙清屏");
}

function ButtonQueryPictureRecord_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var szCameraId = document.getElementById("textCameraID").value;
    var strStartTime = document.getElementById("textStartTimePicture").value;
    var strEndTime = document.getElementById("textEndTimePicture").value;
    var nStartTime = getDate(strStartTime).getTime() / 1000;
    var nEndTime = getDate(strEndTime).getTime() / 1000;
    alert(obj.DPSDK_QueryFtpPicInfo(szCameraId, nStartTime, nEndTime));
    //ShowCallRetInfo(obj.DPSDK_QueryFtpPicInfo(szCameraId,nStartTime , nEndTime), "查询");
}

function ButtonDeletePictureRecord_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var path = document.getElementById("textPicturePath").value;

    ShowCallRetInfo(obj.DPSDK_DelFtpPic(path), "删除ftp图片");
}

function ButtonCloseAudioByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    ShowCallRetInfo(obj.DPSDK_OpenAudioByWndNo(gWndId, nWndNo, false), "关闭音频");
}

function ButtonCloseAudioByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    ShowCallRetInfo(obj.DPSDK_OpenAudioByHWND(hWnd, false), "关闭音频");
}

function ButtonOpenAudioByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    ShowCallRetInfo(obj.DPSDK_OpenAudioByWndNo(gWndId, nWndNo, true), "开启音频");
}

function ButtonOpenAudioByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    ShowCallRetInfo(obj.DPSDK_OpenAudioByHWND(hWnd, true), "开启音频");
}

function ButtonStartRealRecordByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var fileSave = new ActiveXObject("MSComDlg.CommonDialog");
    fileSave.MaxFileSize = 128;
    fileSave.ShowSave();
    if (fileSave.fileName == "")
        return -1;
    ShowCallRetInfo(obj.DPSDK_StartRealRecordByWndNo(gWndId, nWndNo, fileSave.fileName), "开始录像");
}

function ButtonStartRealRecordByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);
    var fileSave = new ActiveXObject("MSComDlg.CommonDialog");
    fileSave.MaxFileSize = 128;
    fileSave.ShowSave();
    if (fileSave.fileName == "")
        return -1;
    ShowCallRetInfo(obj.DPSDK_StartRealRecordByHWND(hWnd, fileSave.fileName), "开始录像");
}

function ButtonStopRealRecordByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);

    ShowCallRetInfo(obj.DPSDK_StopRealRecordByWndNo(gWndId, nWndNo), "停止录像");
}

function ButtonStopRealRecordByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    ShowCallRetInfo(obj.DPSDK_StopRealRecordByHWND(hWnd), "停止录像");
}

function ButtonSetOsdTxtByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var text = document.getElementById("textOsd").value;
    ShowCallRetInfo(obj.DPSDK_SetOsdTxtByWndNo(gWndId, nWndNo, text), "设置Osd信息");
}

function ButtonSetOsdTxtByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    var text = document.getElementById("textOsd").value;
    ShowCallRetInfo(obj.DPSDK_SetOsdTxtByHWND(hWnd, text), "设置Osd信息");
}

function ButtonCleanUpOsdInfoByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    ShowCallRetInfo(obj.DPSDK_CleanUpOsdInfoByWndNo(gWndId, nWndNo), "清除osd信息");
}

function ButtonCleanUpOsdInfoByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    ShowCallRetInfo(obj.DPSDK_CleanUpOsdInfoByHWND(hWnd), "清除osd信息");
}

function ButtonAdjustColorByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var nBrightness = document.getElementById("textBrightness").value;
    var nContract = document.getElementById("textContract").value;
    var nSaturation = document.getElementById("textSaturation").value;
    var nTone = document.getElementById("textTone").value;
    ShowCallRetInfo(obj.DPSDK_AdjustColorByWndNo(gWndId, nWndNo, nBrightness, nContract, nSaturation, nTone), "屏幕颜色调整");
}

function ButtonAdjustColorByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);

    var nBrightness = document.getElementById("textBrightness").value;
    var nContract = document.getElementById("textContract").value;
    var nSaturation = document.getElementById("textSaturation").value;
    var nTone = document.getElementById("textTone").value;
    ShowCallRetInfo(obj.DPSDK_AdjustColorByHWND(hWnd, nBrightness, nContract, nSaturation, nTone), "屏幕颜色调整");
}

function ButtonPtzLockCamera_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    //var szCameraId = document.getElementById("textCameraID").value;
    var nLock = document.getElementById("selectPtzLockCamera").value;

    ShowCallRetInfo(obj.DPSDK_PtzLockCamera(szCameraId, nLock), "锁定控制");
}

function ButtonStartTalk_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var szCameraId = document.getElementById("textCameraID").value;
    var nSampleType = document.getElementById("selectSampleType").value;
    var nBitType = document.getElementById("selectBitType").value;
    var nTransType = document.getElementById("selectTransType").value;
    var nAudioType = document.getElementById("selectAudioType").value;
    var nDevType = document.getElementById("selectDevType").value;

    ShowCallRetInfo(obj.DPSDK_StartTalk(szCameraId, nAudioType, nBitType, nSampleType, nDevType, nTransType), "开始语音对讲");
}

function ButtonStopTalk_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var szCameraId = document.getElementById("textCameraID").value;

    ShowCallRetInfo(obj.DPSDK_StopTalk(szCameraId), "停止语音对讲");
}

function ButtonQueryFtpPicInfo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var szCameraId = document.getElementById("textCameraID").value;

    var strStartTime = document.getElementById("textFtpStartTime").value;
    var strEndTime = document.getElementById("textFtpEndTime").value;
    var nStartTime = getDate(strStartTime).getTime() / 1000;
    var nEndTime = getDate(strEndTime).getTime() / 1000;

    alert(obj.DPSDK_QueryFtpPicInfo(szCameraId, nStartTime, nEndTime));
}

function ButtonDelFtpPic_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var strPicPath = document.getElementById("textFtpPic").value;

    ShowCallRetInfo(obj.DPSDK_DelFtpPic(strPicPath), "删除Ftp图片");
}

function ButtonStartPlaybackByLocalByWndNo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var fileSave = new ActiveXObject("MSComDlg.CommonDialog");
    fileSave.MaxFileSize = 128;
    fileSave.ShowOpen();
    if (fileSave.fileName == "")
        return -1;
    ShowCallRetInfo(obj.DPSDK_StartPlaybackByLocalByWndNo(gWndId, nWndNo, fileSave.fileName), "本地播放");
}

function ButtonStartPlaybackByLocalByHWND_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var hWnd = obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);
    var fileSave = new ActiveXObject("MSComDlg.CommonDialog");
    fileSave.MaxFileSize = 128;
    fileSave.ShowOpen();
    if (fileSave.fileName == "")
        return -1;
    ShowCallRetInfo(obj.DPSDK_StartPlaybackByLocalByHWND(hWnd, fileSave.fileName), "本地播放");
}

loadXML = function (xmlString) {
    var xmlDoc = null;
    //判断浏览器的类型
    //支持IE浏览器 
    if (!window.DOMParser && window.ActiveXObject) {   //window.DOMParser 判断是否是非ie浏览器
        var xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
        for (var i = 0; i < xmlDomVersions.length; i++) {
            try {
                xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                xmlDoc.async = false;
                xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                break;
            } catch (e) {
            }
        }
    }
        //支持Mozilla浏览器
    else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
        try {
            /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
             * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
             * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
             * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
             */
            domParser = new DOMParser();
            xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
        } catch (e) {
        }
    }
    else {
        return null;
    }

    return xmlDoc;
}

