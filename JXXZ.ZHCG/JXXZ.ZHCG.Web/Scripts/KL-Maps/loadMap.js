//控件对象
var obj;
//地图对象
var threeMap;
//工具对象
var tools;
//定义layer数组
var layermap = new Array();
var addState = true;
var pos;
var transformate;
var addFeature;

function InitScene() {
    obj = document.getElementById("VPSDKCtrl");
    threeMap = obj.GetIMapMgrPtr();
    transformate = threeMap.CreateTransformation();
    var ret = obj.InitLic(threeMapUser.ipAddressPort);
    tools = obj.GetIToolsCOMPtr();
    addEvent(obj, "FireOnResponserNotify", FireOnResponserNotify);
}

function addEvent(obj, name, func)//添加事件
{
    if (obj.attachEvent)
    { obj.attachEvent('on' + name, func); }
    else if (obj.addEventListener)
    { obj.addEventListener(name, func, false); }
    else { alert("failed to attach event"); }
}

var responseStr;
function FireOnResponserNotify(x, y) {//拾取响应器触发
    var str = pickResp.GetResponserResult().GetConfigValueByKey("PickPointList");
    var PickName = pickResp.GetResponserResult().GetConfigValueByKey("PickName");
    if (PickName != "") {
        var array = PickName.split('@');
        var pointArray = str.split(',');
        //联合主键
        var longitude = pointArray[0];
        var latitude = pointArray[1];
        var leval = pointArray[2];
        var objcode = array[0];
        var type = array[1];
        showWegdit(longitude, latitude,leval, objcode, type);
    }
}
//加载c3s服务
var parseC3sTool = null;
function LoadC3SNew() {

    if (null != parseC3sTool) {
        console.log("重复加载同一图层!");
        return;
    }

    if (null != tools) {
        var tlo = tools.CreateToolsOptions("ToolsOption");
        if (null != tlo) {
            tlo.AddConfig("Url", threeMapUser.ipAddress);        //服务ip
            tlo.AddConfig("Port", threeMapUser.port);                 //服务端口
            tlo.AddConfig("Type", "gms");                //服务类型
            tlo.AddConfig("Name", threeMapUser.Name);              //服务用户名
            tlo.AddConfig("Password", threeMapUser.Password);          //服务密码
            tlo.AddConfig("ServerName", threeMapUser.ServerName);//服务名
            tlo.AddConfig("LocateState", "1");           //服务定位状态
            parseC3sTool = tools.CreateToolsObject("ParseModelWebData", tlo);      //加载服务的工具对象类名

            if (null != parseC3sTool) {
                var res = tools.ActiveTools(parseC3sTool);                         //激活对象工具
                // res = tools.DestoryTools(parseC3sTool);                         //销毁对象工具,在不使用时记得销毁
                Navagate(120.714452101, 30.7611711997, 58.4495655028);
                moveTo(rememberberId, rememberType, rememberberIconUrl, rememberX, remberY, rememberCameratitle, rememberCameratypeId, bjPath);
            }
        }

    } else {
        console.log("空工具无效句柄 ");
    }
}

//c3s定位
function C3sLocate() {
    if (null != parseC3sTool) {
        var mlo = tools.CreateToolsOptions("ToolsOption"); 	//创建工具配置项，名称不可任意
        mlo.AddConfig("LocateState", "1");                  //c3s定位
        parseC3sTool.UpdateToolsOption(mlo);                //更新工具配置项
    }
    Navagate(120.714452101, 30.7611711997, 58.4495655028);
    moveTo(rememberberId, rememberType, rememberberIconUrl, rememberX, remberY, rememberCameratitle, rememberCameratypeId);
}

//画线
var polyline = [];
/////////绘制线
function Draw2DPolyline() {
    //////创建图层配置信息
    var tlo = threeMap.CreateLayerOptions("polygon "); // 创建分析图层配置，给配置起个名称，任意名称
    tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); // 创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
    tlo.AddConfig("PointColor", "0.0,0.0,1.0,1.0"); //设置点击点的颜色透明度（RGBA） 1为不透明 0为透明
    tlo.AddConfig("PointSize", "5"); //设置点击点的大小
    tlo.AddConfig("DrawLineColor", "1.0,1.0,0.0,1.0"); //设置线的颜色（RGBA）
    tlo.AddConfig("VisiableLine", "true"); //是否绘制线框（顶点和线框是同时显示/隐藏的）
    tlo.AddConfig("LineWidth", "3");  //线宽
    tlo.AddConfig("DrawType", "3");  /////0 是矩形  1是圆   2是多边形   3是线
    tlo.AddConfig("LiftUp", "0"); /////抬高高度
    tlo.AddConfig("DataSourceTypeName", "as_draw2dobject"); /////// 数据源类型,代表2D对象，必须是此键值对
    //tlo.AddConfig("IsLoad", "true");
    //tlo.AddConfig("IsActive", "false");
    //tlo.AddConfig("Points", "120.205420708,30.2416892474,15.0748782353;120.20489575,30.2417527978,10;120.203420708,30.2416892474,15.0748782353;120.20289575//,30.2417527978,20;"); /////更新绘制线的坐标，当更新点时必须设置IsLoad配置项为true

    var polylines = threeMap.CreateLayer("AnalysisLayer", tlo); ////创建分析图层，第一项参数必须为AnalysisLayer
    threeMap.AddLayer(polylines); ///添加分析图层
    polyline.push(polylines);
}

var polygon=[];
/////////绘制多边形
function Draw2DPolygon() {
    //////创建图层配置信息
    var tlo = threeMap.CreateLayerOptions("polygon "); // 创建分析图层配置，给配置起个名称，任意名称
    tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); // 创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
    tlo.AddConfig("PointColor", "0.0,0.0,1.0,1.0"); //设置点击点的颜色透明度（RGBA） 1为不透明 0为透明
    tlo.AddConfig("PointSize", "5"); //设置点击点的大小
    tlo.AddConfig("DrawLineColor", "1.0,1.0,0.0,1.0"); //设置线的颜色（RGBA）
    tlo.AddConfig("DrawFaceColor", "1,0,0,0.3"); //设置面的颜色（RGBA）
    tlo.AddConfig("VisiableLine", "true"); //是否绘制线框（顶点和线框是同时显示/隐藏的）
    tlo.AddConfig("VisiableFace", "true"); //是否绘制面
    tlo.AddConfig("DrawType", "2");  /////0 是矩形  1是圆   2是多边形   3是线
    tlo.AddConfig("LiftUp", "0"); /////抬高高度
    tlo.AddConfig("DataSourceTypeName", "as_draw2dobject"); /////// 数据源类型,代表2D对象，必须是此键值对

    var polygons = threeMap.CreateLayer("AnalysisLayer", tlo); ////创建分析图层，第一项参数必须为AnalysisLayer
    threeMap.AddLayer(polygons);                          ///添加分析图层
    polygon.push(polygons);
}

var rectangle=[];
/////////绘制矩形
function Draw2DRectangle() {
    //////创建图层配置信息
    var tlo = threeMap.CreateLayerOptions("rectangle "); // 创建分析图层配置，给配置起个名称，任意名称
    tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); // 创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
    tlo.AddConfig("PointColor", "0.0,0.0,1.0,1.0"); //设置点击点的颜色透明度（RGBA） 1为不透明 0为透明
    tlo.AddConfig("PointSize", "5"); //设置点击点的大小
    tlo.AddConfig("DrawLineColor", "1.0,1.0,0.0,1.0"); //设置线的颜色（RGBA）
    tlo.AddConfig("DrawFaceColor", "1,0,0,0.3"); //设置面的颜色（RGBA）
    tlo.AddConfig("VisiableLine", "true"); //是否绘制线框（顶点和线框是同时显示/隐藏的）
    tlo.AddConfig("VisiableFace", "true"); //是否绘制面
    tlo.AddConfig("DrawType", "0");  /////0:矩形; 1:圆; 2:多边形; 3:线
    tlo.AddConfig("LiftUp", "0"); /////抬高高度
    tlo.AddConfig("DataSourceTypeName", "as_draw2dobject"); /////// 数据源类型,代表2D对象，必须是此键值对

    var rectangles = threeMap.CreateLayer("AnalysisLayer", tlo); ////创建分析图层，第一项参数必须为AnalysisLayer
    threeMap.AddLayer(rectangles); ///添加分析图层
    rectangle.push(rectangles);
}

var circle=[];
/////////绘制圆
function Draw2DCircle() {
    //////创建图层配置信息
    var tlo = threeMap.CreateLayerOptions("draw2dcircle"); // 创建分析图层配置，给配置起个名称，任意名称
    tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); // 创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
    tlo.AddConfig("PointColor", "0.0,0.0,1.0,1.0"); //设置点击点的颜色透明度（RGBA） 1为不透明 0为透明
    tlo.AddConfig("PointSize", "5"); //设置点击点的大小
    tlo.AddConfig("DrawLineColor", "1.0,1.0,0.0,1.0"); //设置线的颜色（RGBA）
    tlo.AddConfig("DrawFaceColor", "1,0,0,0.3"); //设置面的颜色（RGBA）
    tlo.AddConfig("VisiableLine", "true"); //是否绘制线框（顶点和线框是同时显示/隐藏的）
    tlo.AddConfig("VisiableFace", "true"); //是否绘制面
    tlo.AddConfig("SplitPointNum", "10"); //圆分割数量
    tlo.AddConfig("DrawType", "1");  /////0 是矩形  1是圆   2是多边形   3是线
    tlo.AddConfig("LiftUp", "0"); /////抬高高度
    tlo.AddConfig("DataSourceTypeName", "as_draw2dobject"); /////// 数据源类型,代表2D对象，必须是此键值对

    var circles = threeMap.CreateLayer("AnalysisLayer", tlo); ////创建分析图层，第一项参数必须为AnalysisLayer
    //layermap[circle.getlayerid()] = circle;
    threeMap.AddLayer(circles); ///添加分析图层
    circle.push(circles);
    circles.addObserver();
}

//测距
var distanceMesure=[];
function DistanceMeasure() {
    //////创建图层配置信息
    var tlo = threeMap.CreateLayerOptions("distanceMesure"); // 创建分析图层配置，给配置起个名称，任意名称
    tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); // 创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
    tlo.AddConfig("PointColor", "0.0,0.0,1.0,1.0"); //设置点击点的颜色透明度（RGBA） 1为不透明 0为透明
    tlo.AddConfig("PointSize", "1"); //设置点击点的大小
    tlo.AddConfig("TextVisible", "true"); ////文字是否被显示
    tlo.AddConfig("DistanceMeasureLineColor", "1.0,0.0,0.0,1.0"); //设置线的颜色（RGBA）
    tlo.AddConfig("LineWidth", "1"); ////线宽
    tlo.AddConfig("TextLiftUp", "0"); /////文字显示的抬高高度
    tlo.AddConfig("MeasureUnit", "0");		              //0-米； 1-公里；2-海里
    tlo.AddConfig("MeasureUnitLanguage", "1");		      //0-英文； 1-中文
    tlo.AddConfig("IsDepthTest", "false");	//是否开启深度测试。false不开启，结果会浮在场景上，true实际显示位置
    tlo.AddConfig("DataSourceTypeName", "as_distance");/////// 数据源类型,代表距离测量，必须是此键值对

    /////创建文字符号
    var pSymbol = threeMap.CreateSymbol("TextSymbol"); //创建文字符号，必须为TextSymbol字符串，当上面设置TextVisible设置为 true才创建并进行相应配置
    pSymbol.AddConfig("FillingColor", "1.0, 0.0, 0.0, 1.0"); //设置文字颜色（RGBA）
    pSymbol.AddConfig("Font", "C:\\WINDOWS\\Fonts\\STXIHEI.TTF"); //设置字体类型,字体文件一定要存在
    pSymbol.AddConfig("Size", "40"); ///字体精度大小
    pSymbol.AddConfig("CharacterSize", "20"); 	//文字大小
    pSymbol.AddConfig("CharacterMode", "1");// 取值 1 -- 始终朝向相机
    pSymbol.AddConfig("AlignmentMode", "5");// 文字对齐方式
    pSymbol.AddConfig("AxisAlignment", "6");// 旋转轴 0 - 7 ， 6: 自动
    pSymbol.AddConfig("RemoveDuplicateLabels", "false"); // 去重复
    pSymbol.AddConfig("IsEmbolden", "false");//字体是否加粗
    pSymbol.AddConfig("IsTransform", "true"); //字体是否为斜体
    pSymbol.AddConfig("IsUnderline", "false");//字体是否有下划线
    pSymbol.AddConfig("IsBack", "false");//是否设置背景色
    pSymbol.AddConfig("BackColor", "0,1.0,1.0,1"); //背景颜色，是否设置背景色为true有效

    /////创建样式
    var pStyle = threeMap.CreateStyle("Text");/////创建Style，名字可以任意
    pStyle.AddSymbol("TextSymbol", pSymbol.GetConfig()); ///添加文字符号到Style里，第一参必须为TextSymbol字符串，第二参为上面创建的文字符号的配置信息，通过 pSymbol.GetConfig()获取

    //////////将样式添加到图层配置里
    tlo.AddConfig("Style", pStyle.GetConfig()); ////第一参必须为Style字符串，第二参为上面创建的Style的配置信息，通过 pStyle.GetConfig()获取
    var distanceMesures = threeMap.CreateLayer("AnalysisLayer", tlo); ////创建分析图层，第一项参数必须为AnalysisLayer
    threeMap.AddLayer(distanceMesures); ///添加分析图层
    distanceMesure.push(distanceMesures);
}


var horizontalMesure=[];
/////////创建水平距离测量
function HorizontalMeasure() {
    //创建图层配置信息
    var tlo = threeMap.CreateLayerOptions("horizontalMeasure"); 		//创建分析图层配置，给配置起个名称，任意名称
    tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); 	//创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
    tlo.AddConfig("DataSourceTypeName", "as_horizontal");		//数据源类型,代表水平距离测量，必须是此键值对
    tlo.AddConfig("PointColor", "1.0,0.0,1.0,1.0"); 			//设置点击点的颜色透明度（RGBA） 1为不透明 0为透明
    tlo.AddConfig("PointSize", "2"); 							//设置点击点的大小
    tlo.AddConfig("HorizontalMeasureLineColor", "1.0,0.0,0.0,1.0"); //设置线的颜色（RGBA）
    tlo.AddConfig("LineWidth", "2"); 							//线宽
    tlo.AddConfig("MeasureUnit", "0");							//0-米； 1-公里；2-海里
    tlo.AddConfig("MeasureUnitLanguage", "1");					//0-英文； 1-中文
    tlo.AddConfig("IsDepthTest", "false");						//是否开启深度测试。false不开启，结果会浮在场景上，true实际显示位置

    //创建文字符号
    var pSymbol = threeMap.CreateSymbol("TextSymbol"); //创建文字符号，必须为TextSymbol字符串
    pSymbol.AddConfig("FillingColor", "1.0, 0.0, 0.0, 1.0"); //设置文字颜色（RGBA）
    pSymbol.AddConfig("Font", "C:\\WINDOWS\\Fonts\\STXIHEI.TTF"); //设置字体类型,字体文件一定要存在
    pSymbol.AddConfig("Size", "40"); 			//字体精度大小
    pSymbol.AddConfig("CharacterSize", "20"); 	//文字大小
    pSymbol.AddConfig("CharacterMode", "1");	//取值 1 -- 始终朝向相机
    pSymbol.AddConfig("AlignmentMode", "5");	//文字对齐方式
    pSymbol.AddConfig("AxisAlignment", "6");	//旋转轴 0 - 7 ， 6: 自动
    pSymbol.AddConfig("RemoveDuplicateLabels", "false"); //去重复
    pSymbol.AddConfig("IsEmbolden", "false");	//字体是否加粗
    pSymbol.AddConfig("IsTransform", "false"); 	//字体是否为斜体
    pSymbol.AddConfig("IsUnderline", "false");	//字体是否有下划线
    pSymbol.AddConfig("IsBack", "false");		//是否设置背景色
    pSymbol.AddConfig("BackColor", "0,1.0,1.0,1"); //背景颜色，是否设置背景色为true有效

    //创建样式
    var pStyle = threeMap.CreateStyle("Text");		//创建Style，名字可以任意
    pStyle.AddSymbol("TextSymbol", pSymbol.GetConfig()); //添加文字符号到Style里，第一参必须为TextSymbol字符串，第二参为上面创建的文字符号的配置信息，通过 pSymbol.GetConfig()获取
    //将样式添加到图层配置里
    tlo.AddConfig("Style", pStyle.GetConfig()); //第一参必须为Style字符串，第二参为上面创建的Style的配置信息，通过 pStyle.GetConfig()获取

    var horizontalMesures = threeMap.CreateLayer("AnalysisLayer", tlo); //创建分析图层，第一项参数必须为AnalysisLayer
    threeMap.AddLayer(horizontalMesures); 			//添加分析
    horizontalMesure.push(horizontalMesures);
}

var verticalMeasure=[];
/////////创建垂直距离测量
function VerticalMeasure() {
    //创建图层配置信息
    var tlo = threeMap.CreateLayerOptions("verticalMeasure"); 	//创建分析图层配置，给配置起个名称，任意名称
    tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); //创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
    tlo.AddConfig("DataSourceTypeName", "as_vertical"); 	//数据源类型,代表垂直距离测量，必须是此键值对
    tlo.AddConfig("PointColor", "0.0,0.0,1.0,1.0"); //设置点击点的颜色透明度（RGBA） 1为不透明 0为透明
    tlo.AddConfig("PointSize", "5"); 				//设置点击点的大小
    tlo.AddConfig("VerticalMeasureLineColor", "1.0,0.0,0.0,1.0"); //设置线的颜色（RGBA）
    tlo.AddConfig("LineWidth", "5"); 				//线宽
    tlo.AddConfig("MeasureUnit", "0");				//0-米； 1-公里；2-海里
    tlo.AddConfig("MeasureUnitLanguage", "1");		//0-英文； 1-中文
    tlo.AddConfig("IsDepthTest", "true");			//是否开启深度测试。false不开启，结果会浮在场景上，true实际显示位置

    //创建文字符号
    var pSymbol = threeMap.CreateSymbol("TextSymbol"); //创建文字符号，必须为TextSymbol字符串
    pSymbol.AddConfig("FillingColor", "1.0, 0.0, 0.0, 1.0"); //设置文字颜色（RGBA）
    pSymbol.AddConfig("Font", "C:\\WINDOWS\\Fonts\\STXIHEI.TTF"); //设置字体类型,字体文件一定要存在
    pSymbol.AddConfig("Size", "40"); 			//字体精度大小
    pSymbol.AddConfig("CharacterSize", "20"); 	//文字大小
    pSymbol.AddConfig("CharacterMode", "1"); 	//取值 1 -- 始终朝向相机
    pSymbol.AddConfig("AlignmentMode", "5"); 	//文字对齐方式
    pSymbol.AddConfig("AxisAlignment", "6"); 	//旋转轴 0 - 7 ， 6: 自动
    pSymbol.AddConfig("RemoveDuplicateLabels", "false"); // 去重复
    pSymbol.AddConfig("IsEmbolden", "false"); 	//字体是否加粗
    pSymbol.AddConfig("IsTransform", "true"); 	//字体是否为斜体
    pSymbol.AddConfig("IsUnderline", "false"); 	//字体是否有下划线
    pSymbol.AddConfig("IsBack", "false"); 		//是否设置背景色
    pSymbol.AddConfig("BackColor", "0,1.0,1.0,1"); //背景颜色，是否设置背景色为true有效

    //创建样式
    var pStyle = threeMap.CreateStyle("Text"); 		//创建Style，名字可以任意
    pStyle.AddSymbol("TextSymbol", pSymbol.GetConfig()); //添加文字符号到Style里，第一参必须为TextSymbol字符串，第二参为上面创建的文字符号的配置信息，通过 pSymbol.GetConfig()获取
    //将样式添加到图层配置里
    tlo.AddConfig("Style", pStyle.GetConfig()); //第一参必须为Style字符串，第二参为上面创建的Style的配置信息，通过 pStyle.GetConfig()获取

    var verticalMeasures = threeMap.CreateLayer("AnalysisLayer", tlo); //创建分析图层，第一项参数必须为AnalysisLayer
    threeMap.AddLayer(verticalMeasures); //添加分析图层
    verticalMeasure.push(verticalMeasures);
}

var areaMeasure=[];
/////////创建面积测量
function AreaMeasure() {
    //////创建图层配置信息
    var mlo = threeMap.CreateLayerOptions("areaMeasure ");      // 创建分析图层配置，给配置起个名称，任意名称
    mlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); // 创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
    mlo.AddConfig("DataSourceTypeName", "as_area");
    mlo.AddConfig("PointColor", "0,0.3,0.8,1.0");           //设置点击点的颜色透明度（RGBA） 1为不透明 0为透明
    mlo.AddConfig("PointSize", "7");
    mlo.AddConfig("AreaMeasureLineColor", "0,0.9,0.2,1.0"); //设置线的颜色（RGBA）
    mlo.AddConfig("PolygonColor", "0,0.7,0.4,0.5");         //设置面的颜色（RGBA）
    mlo.AddConfig("MeasureUnit", "10");		               //10-平方米； 11-公顷； 12-平方公里； 13-平方海里
    mlo.AddConfig("MeasureUnitLanguage", "1");		      //0-英文； 1-中文
    mlo.AddConfig("AreaMeasureType", "1");	               // 0-空间面积测量； 1-水平面积测量； 2-地形面积测量（暂无）

    /////创建文字符号
    var pSymbol = threeMap.CreateSymbol("TextSymbol");                  //创建文字符号，必须为TextSymbol字符串，当上面设置TextVisible设置为 true才创建并进行相应配置
    pSymbol.AddConfig("FillingColor", "1.0, 0.0, 0.0, 1.0");       	//设置文字颜色（RGBA）
    pSymbol.AddConfig("Font", "C:\\WINDOWS\\Fonts\\STXIHEI.TTF");  	//设置字体类型,字体文件一定要存在
    pSymbol.AddConfig("Size", "40"); 								//字体精度大小
    pSymbol.AddConfig("CharacterSize", "20"); 						//文字大小
    pSymbol.AddConfig("CharacterMode", "1"); 						//取值 1 -- 始终朝向相机
    pSymbol.AddConfig("AlignmentMode", "5");						//文字对齐方式
    pSymbol.AddConfig("AxisAlignment", "6");						//旋转轴 0 - 7 ， 6: 自动
    pSymbol.AddConfig("RemoveDuplicateLabels", "false");			//去重复
    pSymbol.AddConfig("IsEmbolden", "false");						//字体是否加粗
    pSymbol.AddConfig("IsTransform", "true");						//字体是否为斜体
    pSymbol.AddConfig("IsUnderline", "false");						//字体是否有下划线
    pSymbol.AddConfig("IsBack", "false");							//是否设置背景色
    pSymbol.AddConfig("BackColor", "0,1.0,1.0,1");					//背景颜色，是否设置背景色为true有效

    /////创建样式
    var pStyle = threeMap.CreateStyle("Text");                         //创建Style，名字可以任意
    pStyle.AddSymbol("TextSymbol", pSymbol.GetConfig());          //添加文字符号到Style里，第一参必须为TextSymbol字符串，第二参为上面创建的文字符号的配置信息，通过 pSymbol.GetConfig()获取
    //将样式添加到图层配置里
    mlo.AddConfig("Style", pStyle.GetConfig());                   ////第一参必须为Style字符串，第二参为上面创建的Style的配置信息，通过 pStyle.GetConfig()获取
    var areaMeasures = threeMap.CreateLayer("AnalysisLayer", mlo);          //创建分析图层，第一项参数必须为AnalysisLayer
    threeMap.AddLayer(areaMeasures);                                    //添加分析图层
    areaMeasure.push(areaMeasures);
}

//创建面要素拾取
var pickResp;
function CreatePickPolygon() {
    var pOption = threeMap.CreateResponserOptions("123"); 				     //创建响应器配置，参数任意名称
    // pOption.AddConfig("PickLayerIdList", polygoneditLayer.GetLayerID()); //拾取图层id

    pOption.AddConfig("PickLayerIdList", -1); //拾取图层id
    pOption.AddConfig("PickColor", "1.0,0,0,1.0");					     //拾取颜色
    pOption.AddConfig("IsChangeColor", "true");						     //是否变色
    //pickResp = threeMap.CreateResponser("PickVectorResponser", pOption);      //创建矢量拾取响应器，第一参必须为PickVectorResponser字符串

    pickResp = threeMap.CreateResponser("PickModelResponser", pOption);
    pickResp.AddObserver();
    threeMap.AddResponser(pickResp); 									     //添加响应器
}

var iconshpLayer;
var pSymbol;
function LoadPointAndIcon(x, y, z, iconUrl) {
    /////////////////////此部分是点在场景中显示的配置/////////////////
    pSymbol = threeMap.CreateSymbol("PointSymbol"); ////创建类型为PointSymbol的符号，必须为PointSymbol字符串
    pSymbol.AddConfig("Size", "10"); ////点大小，范围0-10
    pSymbol.AddConfig("Color", "1.0,1.0,0.0,1.0"); ////颜色值（RGBA）0-1，最后一位代表透明度，0为透明，1为不透
    /////////////////////此部分是点在场景中显示的配置/////////////////

    /////////////////////此部分是图片在场景中显示的配置/////////////////
    var tSymbol = threeMap.CreateSymbol("IconSymbol"); ////创建类型为IconSymbol的符号，必须为IconSymbol字符串
    tSymbol.AddConfig("Align", "5"); ////设置图片与要素的相对位置
    tSymbol.AddConfig("AxisAlignmentType", "0"); ////设置图片旋转模式
    tSymbol.AddConfig("CharacterMode", "1"); ////图片大小变化模式，0：随对象变化显示，1:随相机远近变化，2：随相机远近变化，同时不超过上限值Scale
    tSymbol.AddConfig("Scale", "0.1"); ////图片大小变化上限值
    tSymbol.AddConfig("XScale", "0.5"); ////图片x方向放大比例
    tSymbol.AddConfig("YScale", "0.5"); ////图片y方向放大比例
    tSymbol.AddConfig("ZScale", "0.5"); ////图片z方向放大比例
    tSymbol.AddConfig("LineColor", "1,1,1,1"); ////接地线颜色
    tSymbol.AddConfig("IsAddGroundLine", "false"); ////是否开启接地线
    tSymbol.AddConfig("Url", iconUrl); ////图标资源路径
    tSymbol.AddConfig("LibraryName", "reslib"); ////资源名称

    var res = threeMap.CreateResource("IconSymbol"); ////创建图标资源，此处必须为IconSymbol
    res.AddConfig("Uri", iconUrl); ////图标资源路径
    var reslib = threeMap.CreateResourceLibrary("reslib"); ////创建资源库，名称和图层配置LibraryName设置的名称对应
    reslib.AddResource(res); ////将资源添加至资源库
    /////////////////////此部分是图片在场景中显示的配置/////////////////

    var pStyle = threeMap.CreateStyle("Point"); ////创建名称为Point的样式，名称任意
    pStyle.SetName("point"); ////设置别名point
    pStyle.AddSymbol("PointSymbol", pSymbol.GetConfig()); ////将点符号配置添加到该样式，第一参必须为PointSymbol字符串
    //pStyle.AddFilterName("BuildGeometryFilter"); ////设置构建器符号为BuildGeometryFilter，必须为BuildGeometryFilter字符串
    pStyle.AddSymbol("IconSymbol", tSymbol.GetConfig()); ////将图片符号配置添加到该样式，第一参必须为IconSymbol字符串
    pStyle.AddFilterName("SubstituteModelFilter"); ////设置图片构建器符号为SubstituteModelFilter，此为图标符号化和模型符号化共有

    var styleSheet = threeMap.CreateStyleSheet(); ////创建样式表
    styleSheet.AddStyle(pStyle.GetConfig()); ////将样式配置添加至样式表
    styleSheet.AddResLib(reslib.GetConfig()); ////将资源库添加至样式表

    var tlo = threeMap.CreateLayerOptions("shp"); ////创建图层配置对象，名称任意
    tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions"); ////创建配置类型, FeatureModelLayerOptions代表矢量数据配置，必须是此键值对
    tlo.AddConfig("DataSourceTypeName", "fmgeom"); ////数据源类型,代表fmgeom插件，必须是此键值对
    tlo.AddConfig("Driver", "ESRI Shapefile"); ////数据驱动，针对shp、dxf数据源必须是ESRI Shapefile
    tlo.AddConfig("Url", "F:\\Zhumh\\演示测试数据\\point.shp"); ////数据存放位置，注意双斜杠
    tlo.AddConfig("FeatureSourceType", "ogr"); ////要素数据源类型，针对shp、dxf数据源必须是ogr
    tlo.AddConfig("TileSizeFactor", "1.0"); ////瓦片大小的影响因子，建议是1.0
    tlo.AddConfig("TileSize", "5000"); ////瓦片大小，根据数据实际情况设置，根据数据面积来，面积越大值越大
    tlo.AddConfig("LiftUp", "0"); ////抬升高度，任意值
    tlo.AddConfig("MaxRange", "100000.0"); ////最大显示范围，大于最小显示范围-无穷大
    tlo.AddConfig("MinRange", "0.0"); ////最小显示范围，0-无穷大

    tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); ////将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串

    iconshpLayer = threeMap.CreateLayer("FeatureModelLayer", tlo); ////创建矢量图层，第一项参数必须为FeatureModelLayer
    threeMap.AddLayer(iconshpLayer); ////添加矢量图层
    //iconshpLayer.Locate(); ////矢量图层定位（不建议，不精准）

    var id = iconshpLayer.GetLayerID();
    polygoneditLayer = threeMap.GetFeatureModelLayer(id);
    CreateFeature();
    addFeature.AddPoint(x, y, z);
    AddFeature();
    Navagate(x, y, z);
}

//************************
//要素编辑 以面符号化为例：
//***********************
//创建要素
var addFeature;
function CreateFeature() {
    addFeature = threeMap.CreateFeature();								//创建要素对象
    addFeature.SetGeometryType(1);									//设置要素几何类型(1:点; 2:线; 3:环; 4:面; 5:多结构)
    addFeature.SetComponentType(1);									//创建子几何类型（当GeometryType为5时生效）
    addState = true;
}

var featureId;
//添加要素
function AddFeature() {
    featureId = polygoneditLayer.GetMaxFeatureID();					//获取矢量图层要素最大ID
    addFeature.SetFeatureId(featureId + 1); 						//设置FeatureID
    polygoneditLayer.AddFeature(addFeature);						//添加到矢量图层
    addState = false;
}


//飞行定位
function Navagate(x, y, z) {
    var navigation = threeMap.CreateNavigation();
    var desP = threeMap.CreatePosition(x, y, z);
    navigation.FlyToDest(desP, 3.14, -0.25 * 3.14, 100, 2);
}

//弹出动态窗口
var webResp = null;
function showWegdit(x, y, z, objcode, type) {
    if (webResp) {
        threeMap.RemoveResponser("TipsDialogResponser");
        webResp = null;
    }
    var dataPath = obj.GetSDKPath().substring(0, 53) + "data\\texture\\close.bmp";
    var pOption = threeMap.CreateResponserOptions("123");
    pOption.AddConfig("Longitude", x);
    pOption.AddConfig("Latitude", y);
    pOption.AddConfig("PosHeight", z);
    //pOption.AddConfig("Longitude", llhpos.GetX());
    //pOption.AddConfig("Latitude", llhpos.GetY());
    //pOption.AddConfig("PosHeight", llhpos.GetZ());
    pOption.AddConfig("Widget", "250");
    pOption.AddConfig("Height", "150");
    //pOption.AddConfig("ArrowSize", "30");
    //pOption.AddConfig("Radial", "20");
    pOption.AddConfig("ArrowSize", "20");
    pOption.AddConfig("Radial", "10");
    pOption.AddConfig("Url", config.sidePath + tooltipPath.tooltip + "?objcode=" + objcode + "&type=" + type);
    pOption.AddConfig("MoveDelay", "1");
    pOption.AddConfig("CloseButtonState", "false");
    pOption.AddConfig("CloseButtonUrl", dataPath);
    pOption.AddConfig("BKColor", "24,47,70");

    pOption.AddConfig("CloseBtnPosX", "365");
    pOption.AddConfig("CloseBtnPosY", "10");
    pOption.AddConfig("CloseBtnPosW", "20");
    pOption.AddConfig("CloseBtnPosH", "20");

    webResp = threeMap.CreateResponser("TipsDialogResponser", pOption);
    threeMap.AddResponser(webResp);
}

//销毁动态窗口
function HideWegdit() {
    if (webResp) {
        threeMap.RemoveResponser("TipsDialogResponser");
        webResp = null;
    }
}


//移除定位
function removeIconSymbol() {
    threeMap.RemoveLayer(iconshpLayer); ////删除定位
}

//加载管线
function loadPipeline() {
    LoadWSLineShp();
    LoadYSLineShp();
}

//加载污水管线
var WSLineLayer;
function LoadWSLineShp() {
    var polygonSymbol = threeMap.CreateSymbol("PolygonSymbol");  //创建类型为PolygonSymbol的符号，必须为PolygonSymbol字符串
    polygonSymbol.AddConfig("Color", "0.0, 0.0, 1.0,1.0");  //颜色值0-1（RGBA），最后一位代表透明度，0为透明，1为不透
    var lStyle = threeMap.CreateStyle("polygonStyle"); 			//创建名称为PolygonStyle的样式，名称任意
    lStyle.AddSymbol("PolygonSymbol", polygonSymbol.GetConfig()); //将符号配置添加到该样式，第一参必须为PolygonSymbol字符串

    var extruSymbol = threeMap.CreateSymbol("LineExtrusionSymbol");//创建类型为LineExtrusionSymbol的符号,为线挤出符号，必须为LineExtrusionSymbol字符串
    extruSymbol.AddConfig("Casing", "true"); 				//是否使用套接样式
    extruSymbol.AddConfig("CurrentDirection", "true"); 		//是否使用默认流向(从起点流向终点)
    extruSymbol.AddConfig("SplitPointNum", "8"); 			//剖面多边形的顶点数,近似圆周circular(8 or 16，set nlExtrusion->Casing() = true),正方形rectangular(4);
    extruSymbol.AddConfig("Angle", 0); 						//剖面多边形的起点顶点的旋转角度(与局部x轴)，radian
    extruSymbol.AddConfig("Radius", "[15]"); 				//管线半径，单位mm	
    extruSymbol.AddConfig("StartDepth", "[27]"); 			//起点深度
    extruSymbol.AddConfig("EndDepth", "[28]"); 				//终点深度
    extruSymbol.AddConfig("SurfaceStyle", "polygonStyle");  //配置样式至表面样式，第二参与前面创建的表面样式名称要一致
    extruSymbol.AddConfig("CasingStyle", "CasingStyle");    //配置样式至套接样式，第二参与后面创建的套接样式名称要一致

    var eStyle = threeMap.CreateStyle("default"); 				//创建名称为ExtruStyle的样式，名称任意
    eStyle.AddSymbol("LineExtrusionSymbol", extruSymbol.GetConfig()); //将符号配置添加到该样式
    eStyle.AddFilterName("ExtrudeGeometryFilter"); 			//设置挤出符号为ExtrudeGeometryFilter，必须为ExtrudeGeometryFilter字符串

    //设置管线套接样式
    var SphereSymbol = threeMap.CreateSymbol("SphereSymbol");	//管线的套接样式--圆柱体符号
    SphereSymbol.AddConfig("LibraryName", "Library"); 		//库名称
    SphereSymbol.AddConfig("Visible", "true"); 				//是否可见
    SphereSymbol.AddConfig("Xscale", "1.0"); 				//X缩放因子
    SphereSymbol.AddConfig("Yscale", "1.0"); 				//Y缩放因子
    SphereSymbol.AddConfig("Zscale", "1.0"); 				//Z缩放因子
    SphereSymbol.AddConfig("Radius", "1.0"); 				//半径，m
    SphereSymbol.AddConfig("Segments", "8"); 				//分段数
    var CylinderSymbol = threeMap.CreateSymbol("CylinderSymbol");//管线的套接样式--圆柱体符号
    CylinderSymbol.AddConfig("LibraryName", "Library"); 	//库名称
    CylinderSymbol.AddConfig("Visible", "true"); 			//是否可见
    CylinderSymbol.AddConfig("Xscale", "1.0"); 				//X缩放因子
    CylinderSymbol.AddConfig("Yscale", "1.0"); 				//Y缩放因子
    CylinderSymbol.AddConfig("Zscale", "1.0"); 				//Z缩放因子
    CylinderSymbol.AddConfig("Radius", "1.0"); 				//半径，m
    CylinderSymbol.AddConfig("Segments", "8"); 				//分段数
    CylinderSymbol.AddConfig("Height", "5"); 				//高度

    var casingStyle = threeMap.CreateStyle("CasingStyle"); 		//创建名称为CasingStyle的样式，名称任意
    casingStyle.AddSymbol("SphereSymbol", SphereSymbol.GetConfig()); 		//将符号配置添加到该样式
    casingStyle.AddSymbol("CylinderSymbol", CylinderSymbol.GetConfig()); 	//将符号配置添加到该样式

    var SphereRes = threeMap.CreateResource("SphereSymbol");		//创建样式资源(该资源配置必须与SphereSymbol一样)
    SphereRes.AddConfig("Radius", "1.0");					//半径，m
    SphereRes.AddConfig("Segments", "8");					//分段数

    var CylinderRes = threeMap.CreateResource("CylinderSymbol");	//创建样式资源(该资源配置必须与CylinderSymbol一样)
    CylinderRes.AddConfig("Radius", "1.0");					//半径，m
    CylinderRes.AddConfig("Segments", "8");					//分段数
    CylinderRes.AddConfig("Height", "5"); 					//高度
    var reslib = threeMap.CreateResourceLibrary("Library"); 		//创建资源库，名称和图层配置LibraryName设置的名称对应
    reslib.AddResource(SphereRes); 							//将资源添加至资源库
    reslib.AddResource(CylinderRes); 						//将资源添加至资源库

    var styleSheet = threeMap.CreateStyleSheet(); 				//创建样式表
    styleSheet.AddStyle(eStyle.GetConfig()); 				//将样式配置添加至样式表
    styleSheet.AddStyle(lStyle.GetConfig()); 				//将样式配置添加至样式表
    styleSheet.AddStyle(casingStyle.GetConfig()); 			//将样式配置添加至样式表
    styleSheet.AddResLib(reslib.GetConfig()); 				//将样式配置添加至样式表

    var tlo = threeMap.CreateLayerOptions("shp"); 				//创建图层配置对象
    tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions"); //创建配置类型, FeatureModelLayerOptions代表矢量数据配置，必须是此键值对
    tlo.AddConfig("DataSourceTypeName", "fmgeom"); 			//数据源类型,代表fmgeom插件，必须是此键值对
    tlo.AddConfig("Driver", "ESRI Shapefile"); 				//数据驱动，针对shp、dxf数据源必须是ESRI Shapefile
    tlo.AddConfig("Url", "D:\\xzshp\\WS.shp"); //数据存放位置，注意双斜杠
    tlo.AddConfig("FeatureSourceType", "ogr"); 				//要素数据源类型，针对shp、dxf数据源必须是ogr
    tlo.AddConfig("TileSizeFactor", "1.0"); 				//瓦片大小的影响因子，建议是1.0
    tlo.AddConfig("TileSize", "5000"); 						//瓦片大小，根据数据实际情况设置，根据数据面积来，面积越大值越大
    tlo.AddConfig("LiftUp", "0"); 							//抬升高度，任意值
    tlo.AddConfig("MaxRange", "3000000.0"); 				//最大显示范围，大于最小显示范围-无穷大
    tlo.AddConfig("MinRange", "0.0"); 						//最小显示范围，0-无穷大
    tlo.AddConfig("RenderOrder", "-10"); 					//绘制顺序
    tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); 	//将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串

    WSLineLayer = threeMap.CreateLayer("FeatureModelLayer", tlo); //创建矢量图层，第一项参数必须为FeatureModelLayer
    threeMap.AddLayer(WSLineLayer); //添加矢量图层
    WSLineLayer.Locate(); //矢量图层定位（不建议，不精准）
}

//加载引水管线
var YSLineLayer;
function LoadYSLineShp() {
    var polygonSymbol = threeMap.CreateSymbol("PolygonSymbol");  //创建类型为PolygonSymbol的符号，必须为PolygonSymbol字符串
    polygonSymbol.AddConfig("Color", "1.0, 0.0, 0.0,1.0");  //颜色值0-1（RGBA），最后一位代表透明度，0为透明，1为不透
    var lStyle = threeMap.CreateStyle("polygonStyle"); 			//创建名称为PolygonStyle的样式，名称任意
    lStyle.AddSymbol("PolygonSymbol", polygonSymbol.GetConfig()); //将符号配置添加到该样式，第一参必须为PolygonSymbol字符串

    var extruSymbol = threeMap.CreateSymbol("LineExtrusionSymbol");//创建类型为LineExtrusionSymbol的符号,为线挤出符号，必须为LineExtrusionSymbol字符串
    extruSymbol.AddConfig("Casing", "true"); 				//是否使用套接样式
    extruSymbol.AddConfig("CurrentDirection", "true"); 		//是否使用默认流向(从起点流向终点)
    extruSymbol.AddConfig("SplitPointNum", "8"); 			//剖面多边形的顶点数,近似圆周circular(8 or 16，set nlExtrusion->Casing() = true),正方形rectangular(4);
    extruSymbol.AddConfig("Angle", 0); 						//剖面多边形的起点顶点的旋转角度(与局部x轴)，radian
    extruSymbol.AddConfig("Radius", "[15]"); 				//管线半径，单位mm	
    extruSymbol.AddConfig("StartDepth", "[27]"); 			//起点深度
    extruSymbol.AddConfig("EndDepth", "[28]"); 				//终点深度
    extruSymbol.AddConfig("SurfaceStyle", "polygonStyle");  //配置样式至表面样式，第二参与前面创建的表面样式名称要一致
    extruSymbol.AddConfig("CasingStyle", "CasingStyle");    //配置样式至套接样式，第二参与后面创建的套接样式名称要一致

    var eStyle = threeMap.CreateStyle("default"); 				//创建名称为ExtruStyle的样式，名称任意
    eStyle.AddSymbol("LineExtrusionSymbol", extruSymbol.GetConfig()); //将符号配置添加到该样式
    eStyle.AddFilterName("ExtrudeGeometryFilter"); 			//设置挤出符号为ExtrudeGeometryFilter，必须为ExtrudeGeometryFilter字符串

    //设置管线套接样式
    var SphereSymbol = threeMap.CreateSymbol("SphereSymbol");	//管线的套接样式--圆柱体符号
    SphereSymbol.AddConfig("LibraryName", "Library"); 		//库名称
    SphereSymbol.AddConfig("Visible", "true"); 				//是否可见
    SphereSymbol.AddConfig("Xscale", "1.0"); 				//X缩放因子
    SphereSymbol.AddConfig("Yscale", "1.0"); 				//Y缩放因子
    SphereSymbol.AddConfig("Zscale", "1.0"); 				//Z缩放因子
    SphereSymbol.AddConfig("Radius", "1.0"); 				//半径，m
    SphereSymbol.AddConfig("Segments", "8"); 				//分段数
    var CylinderSymbol = threeMap.CreateSymbol("CylinderSymbol");//管线的套接样式--圆柱体符号
    CylinderSymbol.AddConfig("LibraryName", "Library"); 	//库名称
    CylinderSymbol.AddConfig("Visible", "true"); 			//是否可见
    CylinderSymbol.AddConfig("Xscale", "1.0"); 				//X缩放因子
    CylinderSymbol.AddConfig("Yscale", "1.0"); 				//Y缩放因子
    CylinderSymbol.AddConfig("Zscale", "1.0"); 				//Z缩放因子
    CylinderSymbol.AddConfig("Radius", "1.0"); 				//半径，m
    CylinderSymbol.AddConfig("Segments", "8"); 				//分段数
    CylinderSymbol.AddConfig("Height", "5"); 				//高度

    var casingStyle = threeMap.CreateStyle("CasingStyle"); 		//创建名称为CasingStyle的样式，名称任意
    casingStyle.AddSymbol("SphereSymbol", SphereSymbol.GetConfig()); 		//将符号配置添加到该样式
    casingStyle.AddSymbol("CylinderSymbol", CylinderSymbol.GetConfig()); 	//将符号配置添加到该样式

    var SphereRes = threeMap.CreateResource("SphereSymbol");		//创建样式资源(该资源配置必须与SphereSymbol一样)
    SphereRes.AddConfig("Radius", "1.0");					//半径，m
    SphereRes.AddConfig("Segments", "8");					//分段数

    var CylinderRes = threeMap.CreateResource("CylinderSymbol");	//创建样式资源(该资源配置必须与CylinderSymbol一样)
    CylinderRes.AddConfig("Radius", "1.0");					//半径，m
    CylinderRes.AddConfig("Segments", "8");					//分段数
    CylinderRes.AddConfig("Height", "5"); 					//高度
    var reslib = threeMap.CreateResourceLibrary("Library"); 		//创建资源库，名称和图层配置LibraryName设置的名称对应
    reslib.AddResource(SphereRes); 							//将资源添加至资源库
    reslib.AddResource(CylinderRes); 						//将资源添加至资源库

    var styleSheet = threeMap.CreateStyleSheet(); 				//创建样式表
    styleSheet.AddStyle(eStyle.GetConfig()); 				//将样式配置添加至样式表
    styleSheet.AddStyle(lStyle.GetConfig()); 				//将样式配置添加至样式表
    styleSheet.AddStyle(casingStyle.GetConfig()); 			//将样式配置添加至样式表
    styleSheet.AddResLib(reslib.GetConfig()); 				//将样式配置添加至样式表

    var tlo = threeMap.CreateLayerOptions("shp"); 				//创建图层配置对象
    tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions"); //创建配置类型, FeatureModelLayerOptions代表矢量数据配置，必须是此键值对
    tlo.AddConfig("DataSourceTypeName", "fmgeom"); 			//数据源类型,代表fmgeom插件，必须是此键值对
    tlo.AddConfig("Driver", "ESRI Shapefile"); 				//数据驱动，针对shp、dxf数据源必须是ESRI Shapefile
    tlo.AddConfig("Url", "D:\\xzshp\\YS.shp"); //数据存放位置，注意双斜杠
    tlo.AddConfig("FeatureSourceType", "ogr"); 				//要素数据源类型，针对shp、dxf数据源必须是ogr
    tlo.AddConfig("TileSizeFactor", "1.0"); 				//瓦片大小的影响因子，建议是1.0
    tlo.AddConfig("TileSize", "5000"); 						//瓦片大小，根据数据实际情况设置，根据数据面积来，面积越大值越大
    tlo.AddConfig("LiftUp", "0"); 							//抬升高度，任意值
    tlo.AddConfig("MaxRange", "3000000.0"); 				//最大显示范围，大于最小显示范围-无穷大
    tlo.AddConfig("MinRange", "0.0"); 						//最小显示范围，0-无穷大
    tlo.AddConfig("RenderOrder", "-10"); 					//绘制顺序
    tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); 	//将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串

    YSLineLayer = threeMap.CreateLayer("FeatureModelLayer", tlo); //创建矢量图层，第一项参数必须为FeatureModelLayer
    threeMap.AddLayer(YSLineLayer); 	//添加矢量图层
    YSLineLayer.Locate(); 		//矢量图层定位（不建议，不精准）
}

//清除
function clearthreeMap() {
    for (var i = 0; i < polyline.length; i++) {
        //清除线
        threeMap.RemoveLayer(polyline[i]); ////删除线
    }

    for (var i = 0; i < polygon.length; i++) {
        //清除多边形
        threeMap.RemoveLayer(polygon[i]); ////删除多边形
    }

    for (var i = 0; i < rectangle.length; i++) {
        //清除方
        threeMap.RemoveLayer(rectangle[i]); ////删除方
    }

    for (var i = 0; i < circle.length; i++) {
        //清除圆
        threeMap.RemoveLayer(circle[i]); ////删除圆
    }

    for (var i = 0; i < distanceMesure.length; i++) {
        //清除直线测距
        threeMap.RemoveLayer(distanceMesure[i]); ////删除测距
    }

    for (var i = 0; i < horizontalMesure.length; i++) {
        //清除水平测距
        threeMap.RemoveLayer(horizontalMesure[i]); ////删除测距
    }

    for (var i = 0; i < verticalMeasure.length; i++) {
        //清除水平测距
        threeMap.RemoveLayer(verticalMeasure[i]); ////删除测距
    }

    for (var i = 0; i < areaMeasure.length; i++) {
        //清除水平测面
        threeMap.RemoveLayer(areaMeasure[i]); ////删除测面
    }
    if (iconshpLayer != null && iconshpLayer != "undefined" && iconshpLayer != "") {
        threeMap.RemoveLayer(iconshpLayer); ////删除定位
    }
    clearPipeline();
    removePick();
    HideWegdit();
}
//清除管线
function clearPipeline() {
    if (WSLineLayer) {
        threeMap.RemoveLayer(WSLineLayer); 		//删除污水管
    }
    if (YSLineLayer) {
        threeMap.RemoveLayer(YSLineLayer); 		//删除引水管
    }
}
//移除拾取
function removePick() {
    if (pickResp) {
        threeMap.RemoveResponser("PickModelResponser");
    }
}