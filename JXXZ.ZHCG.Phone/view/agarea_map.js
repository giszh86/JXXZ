require(['esri/map', "esri/layers/ArcGISTiledMapServiceLayer",
	"esri/geometry/Point", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
	"esri/symbols/PictureMarkerSymbol", "esri/geometry/Polygon", "esri/geometry/Polyline",
	"esri/graphic", "esri/layers/GraphicsLayer", "esri/SpatialReference"
], function(
	Map, ArcGISTiledMapServiceLayer, Point, SimpleFillSymbol, SimpleLineSymbol,
	PictureMarkerSymbol, Polygon, Polyline,
	Graphic, GraphicsLayer, SpatialReference) {

	mui.plusReady(function() {
		var aMap = new ArcgisMap();
		var self = plus.webview.currentWebview();
		var father = self.opener();
		console.log(self)
		var op = mui.extend(true, {
			title: '地图浏览',
			clickMarker: {
				visible: false, //点击后的坐标
				startShow: true //一开始是否显示
			},
		}, self.option);

		document.querySelector('.mui-title').innerText = op.title;
		var polygon=self.option.polygon[0].split(";")
		
		aMap.addPolygon(stringToFloat(polygon))
		//获取范围的坐标点从json格式转换为数字类型的数组
		function stringToFloat(arr){
			var polygonArr=[]
			for (var i = 0; i < arr.length; i++) {
				var arrString=arr[i].split(",")
				polygonArr.push([parseFloat(arrString[0]),parseFloat(arrString[1])])
			}
			return polygonArr;
		}
	})

});