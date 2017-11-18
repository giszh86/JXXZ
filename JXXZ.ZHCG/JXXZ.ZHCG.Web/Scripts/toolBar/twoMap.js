//2维画线
function drawtwoLine() {
    addInteraction("LineString",null);
}
//2维画面
function drawNoodle() {
    addInteraction("Polygon",null);
}
//2维画圆
function drawCircle() {
    addInteraction("Circle", null);
}
//测距
function ranging() {
    addInteraction("LineString", 'cj');
}

//测面
function testSurface() {
    addInteraction("Polygon", 'cm');
}

//框选
function frameSelection() {
    var html = '<tr><td><input type="checkbox" id="kxcheckall" name="chkkx" onclick="checkAllSelection()" /><label for="kxcheckall">全部</label></td><td><input type="checkbox" name="chkkx" id="chkry" value="ry" /><label for="chkry">人员</label></td><td><input type="checkbox" name="chkkx" id="chkcl" value="cl" /><label for="chkcl">车辆</label></td></tr><tr><td><input type="checkbox" name="chkkx" id="chksj" value="sj" /><label for="chksj">事件</label></td><td><input type="checkbox" name="chkkx" id="chkaj" value="aj" /><label for="chkaj">案件</label></td><td><input type="checkbox" name="chkkx" id="chkjk" value="jk" /><label for="chkjk">监控</label></td></tr><tr><td><input type="checkbox" name="chkkx" id="chkbj" value="bj" /><label for="chkbj">部件</label></td><td><input type="checkbox" name="chkkx" id="chksp" value="sp" /><label for="chksp">审批</label></td></tr>';
    var btnhtml = '<div class="btn-location" onclick="drawBoxFameSelection()">确定</div>';
    var titleText = "高级框选面板";
    showframeSelection(html, btnhtml, titleText);
}

//框选获取条件
function drawBoxFameSelection() {
    hideframeSelection();
    drawBox();
}

//网格
function showGridPanel() {
    var html = '<tr><td><input id="unitGrid" type="radio" name="grid" value="1" /><label for="unitGrid">单元网格</label></td><td><input id="superviseGrid" type="radio" name="grid" value="2" /><label for="superviseGrid">监督网格</label></td></tr><tr><td><input id="communityGrid" type="radio" name="grid" value="3" /><label for="communityGrid">社区网格</label></td><td><input id="streetGrid" type="radio" name="grid" value="4" /><label for="streetGrid">街道网格</label></td></tr>';
    var btnhtml = '<div class="btn-location" onclick="sure_showGrid()">确定</div>';
    var titleText = "网格区域选择";
    showframeSelection(html, btnhtml, titleText);
}

//网格显示
function sure_showGrid() {
    hideframeSelection();
    //获取选中radio值
    var typeid;
    var checklist = $('input:radio[name="grid"]');
    for (var i = 0; i < checklist.length; ++i) {
        if (checklist[i].checked == true) {
            typeid = checklist[i].value;
        }
    }
    var url = config.webApi + configajaxUrl.gridAreaPlaygon + "?typeid=" + typeid;
    $.ajax({
        url: url,
        async:true,
        type: 'get',
        timeout:10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            //清除覆盖物
            clearMulch();
            $.each(data, function (i, n) {
                var postionsList = [];
                var postions = [];
                var newgrometry = n.grometry.split(';');
                for (var i = 0; i < newgrometry.length - 1; i++) {
                    var points = newgrometry[i].split(',');
                    var x = parseFloat(points[0]);
                    var y = parseFloat(points[1]);
                    postions.push([x, y]);
                }
                postionsList.push(postions);
                if (n.colour != "" && n.colour != null) {
                    var noodleColor = n.colour.colorRgb();
                    createTextNoodle(n.id, 'polygon', postionsList, noodleColor, '#18D8F9', 2, n.gridname, '#FF0F00');
                } else {
                    createTextNoodle(n.id, 'polygon', postionsList, 'rgba(240, 19, 23, 0.4)', '#18D8F9', 2, n.gridname, '#FF0F00');
                }
            });
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    });
}

//网格详情
function grid_Details(id) {
    var url=config.webApi+configajaxUrl.gridsingle+"?id="+id;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout:10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            $("#gridNameInfo").text(data.gridname);
            $("#gridTypeInfo").text(data.typename);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//清除
function CleartwoMap() {
    clearMulch();
}
//显示标点气泡提示窗
var isHidden = true;
function showtooltipPints() {
    if (isHidden) {
        $("#toolbar-tip-show").show();
        isHidden = false;
    } else {
        $("#toolbar-tip-show").hide();
        isHidden = true;
    }
}
 
//标点
function addDrawPoints() {
    hideAllBottom();
    hideremarkPanel();
    document.getElementById("first").style.visibility = "visible";
    var drawPoints = new ol.interaction.Draw({ //创建画笔
        features: [],
        type: 'Point',
        style: new ol.style.Style({ //样式
            image: new ol.style.Icon({ //自定义图片
                anchor: [0.5, 1],
                src: 'Image/toolbar/2DRight/addPoints.png'
            })
        })
    });
    drawPoints.on('drawend', function (evt) {
        var geometry = evt.feature.getGeometry().getCoordinates();
        map.removeInteraction(drawPoints);
        var x = parseFloat(geometry[0]);
        var y = parseFloat(geometry[1]);
        addMark('add', x, y, 'Image/toolbar/2DRight/addPoints.png', 1, 'bd', null);
    });
    map.addInteraction(drawPoints);
}