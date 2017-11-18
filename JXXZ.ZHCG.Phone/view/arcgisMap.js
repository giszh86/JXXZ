mui.init();

mui.plusReady(function() {
	var map = null;
	var graphicLayer = null;
	var myMarker = null;

	require(["esri/map", "esri/layers/ArcGISTiledMapServiceLayer", "esri/graphic", "esri/SpatialReference",
		"esri/geometry/Point", "esri/layers/GraphicsLayer", "esri/symbols/PictureMarkerSymbol"
	], function(
		Map, ArcGISTiledMapServiceLayer, Graphic, SpatialReference,
		Point, GraphicsLayer, PictureMarkerSymbol) {
		var lng = parseFloat(app.getItem('longitude'));
		var lat = parseFloat(app.getItem('latitude'));
		var point = new Point(lng, lat,new SpatialReference({ wkid: 4490 }));		//, new SpatialReference({ wkid: 4490 })
		map = new Map("map", {
			//basemap: "topo", //For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
			center: point, // longitude, latitude
			slider: false, //加号
			zoom: 17,
			displayGraphicsOnPan: false,
			logo: false //右下角logo
		});
		var dynamicMSLayer = new ArcGISTiledMapServiceLayer("http://218.75.26.56:6080/arcgis/rest/services/LvYouJu/nantang/MapServer");
		map.addLayer(dynamicMSLayer);

		graphicLayer = new GraphicsLayer(); //新建一个图层,绘制点.
		map.addLayer(graphicLayer);

		map.on('load', function() {
			
			AddMarker(lng, lat, 'my location');

		});
		
		

		function AddMarker(lng, lat, value) {
			var point = new Point(lng, lat, map.spatialReference);
			var picMarker = new PictureMarkerSymbol('../image/map/map_gr.png', 50, 50);
			var graphic = new Graphic(point, picMarker);
			graphicLayer.add(graphic);
			//map.graphics.add(picGraphic); //添加到地图中
			return graphic;

		}

	});

});