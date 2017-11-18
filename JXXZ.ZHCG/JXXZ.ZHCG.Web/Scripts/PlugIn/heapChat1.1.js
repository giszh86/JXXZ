void

function (global) {
    var extend,
		_extend,
		_isObject;

    _isObject = function (o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    }

    _extend = function self(destination, source) {
        var property;
        for (property in destination) {
            if (destination.hasOwnProperty(property)) {

                // 若destination[property]和sourc[property]都是对象，则递归
                if (_isObject(destination[property]) && _isObject(source[property])) {
                    self(destination[property], source[property]);
                };

                // 若sourc[property]已存在，则跳过
                if (source.hasOwnProperty(property)) {
                    continue;
                } else {
                    source[property] = destination[property];
                }
            }
        }
    }

    extend = function () {
        var arr = arguments,
			result = {},
			i;

        if (!arr.length) return {};

        for (i = arr.length - 1; i >= 0; i--) {
            if (_isObject(arr[i])) {
                _extend(arr[i], result);
            };
        }

        arr[0] = result;
        return result;
    }

    global.extend = extend;
}(window);

(function (window) {

    var _option = {
        container: '#canvas', //div选择
        bgColor: '#555', //背景颜色,空白不输出背景
        coordinateColor: '#06B081', //坐标系颜色
        coordinateLine: 1, //坐标轴粗细
        xWidth: 40, //x轴左边空出距离	
        yHeight: 25, //y轴下方空出距离.
        yTop: 20, //顶部空出距离
        xRight: 30, //右边空出距离
        speed: 60, //图表显示速度.
        xValue: {
            font: "12px Arial", //x轴文字样式
            fontColor: '#fff', //x轴文字颜色
            textArray: ['一般案件', '违建案件', '重大案件', '简易案件'], //x轴文字
            valueArray: [180, 60, 110, 220], //x轴对应值
            text: {
                font: "12px Arial", //对应值文字样式
                fontColor: '#fff', //对应值文字颜色
                format: '{value}' //对应值输出.
            },
            color: [{ //堆积图颜色,value要升序排列
                color: 'green'
            }, {
                value: 100,
                color: 'yellow'
            }, {
                value: 180,
                color: 'red'
            }],
            defaultColor: '#888', //默认颜色
            step: 12 //堆积图数量
        },
        yValue: {
            font: "12px Arial", //y轴文字样式
            fontColor: '#fff', //y轴文字颜色
            minValue: 0, //y轴最小值
            maxValue: 0, //y轴最大值  等于0根据x轴自动设置最大值
            count: 5 //y轴个数			//y轴总数量
        }
    }

    function updateCanvas(op, canvas, ctx, timer, callback) {

        clearAll(canvas, ctx);
        var writeObj = op.writeObj;
        if (op.bgColor) {
            writeBackgroundColor(op, ctx); //画背景
        }

        writeCoordinate({ x: op.xWidth, y: canvas.height - op.yHeight }, op.coordinateColor, ctx, op); //画坐标

        //画字体.
        for (var i = 0; i < writeObj.text.length; i++) {
            var textObj = writeObj.text[i];
            writeFont(textObj, ctx);
        }
        var point = undefined;
        if (typeof (timer) == 'object') point = timer;
        writeByChat(writeObj.chat, ctx, point, op.writeObj); //画图表

        if (typeof (timer) == 'number' && writeObj.chat.step > writeObj.chat.nowStep) {
            window.setTimeout(function () {
                updateCanvas(op, canvas, ctx, timer, callback);
            }, timer);
        } else {
            if (typeof (callback) == 'function') {
                callback();
            }
        }
    }

    //计算.
    function calculation(op) {
        var writeObj = op.writeObj;
        //y轴坐标计算.
        var minPoint = {
            x: op.xWidth * 0.9,
            y: canvas.height - op.yHeight
        }
        var maxPoint = {
            x: op.xWidth * 0.9,
            y: op.yTop
        }
        writeObj.text = writeYValue(minPoint, maxPoint, op.yValue.minValue,
			op.yValue.maxValue, op.yValue.fontColor, op.yValue.font, op.yValue.count);
        //x轴坐标计算
        minPoint = {
            x: op.xWidth,
            y: (canvas.height - op.yHeight * 0.9)
        }
        maxPoint = {
            x: op.canvasWidth - op.xRight,
            y: (canvas.height - op.yHeight * 0.9)
        }
        var arr = writeXValue(minPoint, maxPoint, op.xValue.textArray, op.xValue.fontColor, op.xValue.font);
        for (var i = 0; i < arr.length; i++) {
            writeObj.text.push(arr[i]);
        }
        //x轴值计算.
        writeObj.chat.color = op.xValue.color;
        writeObj.chat.defaultColor = op.xValue.defaultColor;
        writeObj.chat.step = op.xValue.step;
        writeObj.chat.nowStep = 0;
        writeObj.chat.text = op.xValue.text; //文字.
        writeObj.chat.moveIndex = 3;
        writeObj.chat.bgColor = op.bgColor;
        writeObj.chat.rectArray = [];
        var useWidth = op.canvasWidth - op.xWidth - op.xRight; //总共可以使用范围
        var oneWidth = useWidth / op.xValue.valueArray.length; //平均每个柱状图分到位置.
        var chatWidth = oneWidth * 0.4; //柱状图的宽度.

        for (var i = 0; i < op.xValue.valueArray.length; i++) {
            var temp = op.xValue.valueArray[i];
            var x = op.xWidth + oneWidth * i + oneWidth / 2;
            var minPoint = {
                x: x,
                y: canvas.height - op.yHeight
            }
            var maxPoint = {
                x: x,
                y: op.yTop
            }
            arr = writeChat(minPoint, maxPoint, chatWidth, temp, op.xValue.step, op.yValue.maxValue);
            writeObj.chat.array.push(arr);
            var rct = chatRect(minPoint, maxPoint, chatWidth);
            writeObj.chat.rectArray.push(rct);

        }

        updateChatText(op.writeObj); //输入图表文字.
    }

    /**
	 * 计算颜色值
	 * @param {Object} obj
	 * @param {Array} colorArray
	 * @param {String} defaultColor
	 */
    function getColor(obj, colorArray, defaultColor) {
        if (obj.value < obj.minValue) { //未达到最小值
            return defaultColor;
        } else {
            var tempColor = colorArray[0].color;
            var cValue = obj.value > obj.maxValue ? obj.maxValue : obj.value;
            for (var i = 1; i < colorArray.length; i++) {
                if (cValue >= colorArray[i].value) {
                    tempColor = colorArray[i].color;
                } else {
                    break;
                }
            }
            return tempColor;
        }
    }

    //计算图表位置
    function writeChat(minPoint, maxPoint, width, value, chatCount, yMaxValue) {
        var arr = [];
        var x = (maxPoint.x - minPoint.x) / chatCount;
        var y = (maxPoint.y - minPoint.y) / chatCount;
        var sum = yMaxValue / chatCount;
        var num = 0;
        for (var i = 0; i < chatCount; i++) {
            num += sum;
            var obj = {
                x: minPoint.x + x * i,
                y: minPoint.y + y * i,
                width: width,
                height: y,
                value: value,
                maxValue: num,
                minValue: num - sum
            }
            arr.push(obj);
        }
        return arr;
    }

    //创建矩形.判断是否在里面.
    function chatRect(minPoint, maxPoint, width) {
        var x = minPoint.x > maxPoint.x ? maxPoint.x : minPoint.x;
        var y = minPoint.y > maxPoint.y ? maxPoint.y : minPoint.y;
        x -= width / 2;

        var p1 = {
            x: x,
            y: y,
            width: width,
            height: Math.abs(maxPoint.y - minPoint.y)
        }
        return p1;
    }

    //画单个矩形.
    function printRect(obj, ctx, flg) {
        ctx.beginPath();
        ctx.save();
        if (flg) {
            ctx.globalAlpha = 1;
        } else {
            ctx.globalAlpha = 0.8;
        }
        ctx.fillStyle = obj.nowColor;
        var minYValue = obj.y + obj.height * 0.1;
        var maxYValue = obj.y + obj.height * 0.8; //堆积图高度
        var minXValue = obj.x - obj.width / 2;
        var maxXValue = obj.x + obj.width / 2;
        ctx.moveTo(minXValue, minYValue);
        ctx.lineTo(maxXValue, minYValue);
        //画半圆.
        var point = {
            x: maxXValue,
            y: minYValue + (maxYValue - minYValue) / 2,
            r: Math.abs((maxYValue - minYValue) / 2)
        }
        ctx.arc(point.x, point.y, point.r, -0.5 * Math.PI, 0.5 * Math.PI);
        ctx.lineTo(maxXValue, maxYValue);
        ctx.lineTo(minXValue, maxYValue);
        point = {
            x: minXValue,
            y: minYValue + (maxYValue - minYValue) / 2,
            r: Math.abs((maxYValue - minYValue) / 2)
        }
        ctx.arc(point.x, point.y, point.r, 0.5 * Math.PI, 1.5 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    //输出图表.
    function writeByChat(chat, ctx, point, writeObj) {
        for (var i = 0; i < chat.array.length; i++) {
            var isActive = false;
            //if(chat.moveIndex == i) isActive = true; //选中.
            if (typeof (point) == 'object') { //有坐标点.
                var p1 = chat.rectArray[i];
                if (isInPointPath(p1, point, ctx, chat.bgColor)) {
                    isActive = true;
                }
            }
            var arr = chat.array[i];
            var flg = false; //是否有输出文字.

            for (var s = 0; s < arr.length; s++) {
                var obj = arr[s];
                if (s >= chat.nowStep) {
                    obj.nowColor = chat.defaultColor;
                } else {
                    obj.nowColor = obj.color;
                }

                printRect(obj, ctx, isActive);
                //console.log(JSON.stringify(obj));

            }

        }
        //输出柱状图值.
        for (var s = 0; s < chat.chatText.length; s++) {
            var cobj = chat.chatText[s];
            var stepObj = cobj.stepArray[chat.nowStep];
            if (stepObj) {
                writeFont(stepObj, ctx);
            } else {
                writeFont(cobj, ctx);
            }

        }
        writeObj.chat.nowStep += 1;
    }

    function isInPointPath(rect, point, ctx) {
        var flg = false;
        ctx.beginPath();
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        if (ctx.isPointInPath(point.x, point.y)) {
            flg = true;
        }
        return flg;

    }

    function updateChatText(writeObj) {
        var chat = writeObj.chat;
        chat.chatText = [];
        for (var i = 0; i < chat.array.length; i++) {
            var arr = chat.array[i];
            var flg = false;
            var stepObj = [];
            for (var s = 0; s < arr.length; s++) {
                var obj = arr[s];
                var colorValue = getColor(obj, chat.color, chat.defaultColor);
                obj.color = colorValue;
                if (!flg && (colorValue == chat.defaultColor || (s + 1) == arr.length)) {
                    var textObj = {
                        x: obj.x + obj.width / 2 * 1.4,
                        y: obj.y,
                        value: GetTextFormat(obj.value, chat.text.format),
                        textAlign: 'left',
                        textBaseline: 'top',
                        color: chat.text.fontColor,
                        font: chat.text.font
                    }
                    textObj.stepArray = stepObj;
                    writeObj.chat.chatText.push(textObj);
                    flg = true;
                } else if (colorValue != chat.defaultColor) {
                    var tempObj = {
                        x: obj.x + obj.width / 2 * 1.4,
                        y: obj.y,
                        value: GetTextFormat(obj.value, chat.text.format),
                        textAlign: 'left',
                        textBaseline: 'top',
                        color: chat.text.fontColor,
                        font: chat.text.font
                    }
                    stepObj.push(tempObj);
                }
            }
        }
    }

    function GetTextFormat(num, formatStr) {
        var st = formatStr.replace('{value}', num);
        return st;
    }

    //画y轴坐标
    function writeYValue(minPoint, maxPoint, minValue, maxValue, color, font, count) {
        var arr = [];
        var x = maxPoint.x - minPoint.x;
        var y = maxPoint.y - minPoint.y;
        var cValue = maxValue - minValue;
        for (var i = 0; i < count; i++) {
            var tempValue = cValue / (count - 1) * i;
            var obj = {
                x: minPoint.x + x / (count - 1) * i,
                y: minPoint.y + y / (count - 1) * i,
                value: (minValue + tempValue).toFixed(0),
                textAlign: 'right',
                textBaseline: 'middle',
                color: color,
                font: font
            }
            arr.push(obj);
        }
        return arr;
    }

    /**
	 * 计算x轴坐标
	 * @param {Object} 起始点
	 * @param {Object} 结束点
	 * @param {Array} 文字
	 * @param {Object} 文字颜色
	 * @param {Object} 文字样式
	 */
    function writeXValue(minPoint, maxPoint, textArray, color, font) {
        var arr = [];
        var len = textArray.length; //总共分多少块.
        var x = (maxPoint.x - minPoint.x) / len; //x轴分块
        var y = (maxPoint.y - minPoint.y) / len; //y轴分块.
        for (var i = 0; i < textArray.length; i++) {
            var obj = {
                x: minPoint.x + x * i + x / 2,
                y: minPoint.y + y * i + y / 2,
                value: textArray[i],
                textAlign: 'center',
                textBaseline: 'top',
                color: color,
                font: font
            }
            arr.push(obj);
        }
        return arr;
    }

    //输出文字.
    function writeFont(textObj, ctx) {
        ctx.beginPath();
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = textObj.font; //字体大小,样式.
        ctx.textAlign = textObj.textAlign; //对齐方式
        ctx.textBaseline = textObj.textBaseline;
        ctx.fillStyle = textObj.color; //字体颜色
        ctx.fillText(textObj.value, textObj.x, textObj.y);

    }

    //画坐标
    function writeCoordinate(point, color, ctx, op) {
        var p1 = {
            x: point.x,
            y: op.yTop
        }
        var p2 = {
            x: op.canvasWidth - op.xRight,
            y: point.y
        }
        ctx.beginPath();
        ctx.save();
        ctx.translate(0.5, 0.5);
        ctx.strokeStyle = color; //颜色
        //ctx.lineWidth = 2; //坐标系宽度..
        ctx.lineWidth = op.coordinateLine;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(point.x, point.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();

    }

    //填充背景颜色
    function writeBackgroundColor(op, ctx) {
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = op.bgColor;
        ctx.fillRect(0, 0, op.canvasWidth, op.canvasHeight);
        ctx.restore();
    }

    //清空画布.
    function clearAll(canvas, ctx) {
        ctx.clearRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);
    }

    function GetCanvasId() {
        var str = "__canvas__";
        var i = 1;
        var st = str + i.toString();
        var dom = document.getElementById(st);
        while (dom) {
            i++;
            st = str + i.toString();
            dom = document.getElementById(st);
        }
        return st;
    }

    function createCanvas(div) {
        var _height = div.offsetHeight;
        var _width = div.offsetWidth;
        //var top = 
        //var left = getLeft(div);
        var name = div.getAttribute('canvasname');
        if (!name) {
            name = GetCanvasId();
            div.setAttribute('canvasname', name);
        }

        canvas = document.createElement("canvas");
        canvas.height = _height;
        canvas.width = _width;
        canvas.id = name;

        canvas.style.position = 'relative';
        canvas.style.top = '0px';
        canvas.style.left = '0px';

        div.appendChild(canvas);

        //document.body.appendChild(canvas);

        return canvas;

    }

    //获取元素的纵坐标 
    function getTop(e) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) offset += getTop(e.offsetParent);
        return offset;
    }
    //获取元素的横坐标 
    function getLeft(e) {
        var offset = e.offsetLeft;
        if (e.offsetParent != null) offset += getLeft(e.offsetParent);
        return offset;
    }

    function GetMaxValue(arr, num) {
        if (!num) num = 100;
        var max = 0;
        var n = 0;
        for (var i = 0; i < arr.length; i++) {
            var temp = arr[i] / num;
            n = Math.ceil(temp) * num;
            if (max < n) max = n;
        }
        return max;
    }

    window.showHeapChat = function (option, callback) {

        var op = window.extend(_option, option);
        var div = document.querySelector(op.container);
        var name = div.getAttribute('canvasname');
        if (name) {
            var _canvas = document.getElementById(name);
            document.body.removeChild(_canvas);
        }
        var canvas = createCanvas(div);

        op.canvasWidth = canvas.width;
        op.canvasHeight = canvas.height;
        op.writeObj = {
            text: [],
            chat: {
                array: [],
                rectArray: [],
                chatText: []
            }
        };

        if (op.yValue.maxValue == 0) {
            var maxNum = GetMaxValue(op.xValue.valueArray, 100);
            op.yValue.maxValue = maxNum;
        }

        var ctx = canvas.getContext('2d');

        var _h = canvas.width / canvas.width;
        var _w = canvas.height / canvas.height;
        ctx.scale(_h, _w); //缩放画布

        calculation(op);

        canvas.onmousemove = function (event) {
            var point = {
                x: event.layerX,
                y: event.layerY
            }
            updateCanvas(op, canvas, ctx, point);
        }

        updateCanvas(op, canvas, ctx, op.speed, function () {

            if (typeof (callback) == 'function') callback();

        });

    }

})(window);