(function(window, ol) {
	function OpenlayerMap(options) {
		options = options || {};
		var op = extend({
			containerId: 'map',
			url: 'http://www.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer',
			center: [120.70470350244467, 30.767954215582677],
			zoom: 9,
			imgPath: 'point.png'
		}, options);

		var self = this;

		self.url = op.url;
		self.containerId = op.containerId;

		self.imgPath = op.imgPath;

		//========================天地图图层绘制===========================

		var tileLayerSource1, tileLayerSource2, tileLayerSource3, tileLayerSource4, tileLayerSource5, tileLayerSource6;

		var projection = ol.proj.get('EPSG:4326');

		self.projection = projection;

		var projectionExtent = projection.getExtent();
		var size = ol.extent.getWidth(projectionExtent) / 256;
		var resolutions = new Array(22);
		var matrixIds = new Array(22);
		for(var z = 0; z < 22; ++z) {
			resolutions[z] = size / Math.pow(2, z);
			matrixIds[z] = z;
		}
		tileLayerSource1 = new ol.source.WMTS({
			url: 'http://t{0-7}.tianditu.com/vec_c/wmts',
			layer: 'vec',
			format: 'tiles',
			tileGrid: new ol.tilegrid.WMTS({
				origin: ol.extent.getTopLeft(projectionExtent),
				resolutions: resolutions,
				matrixIds: matrixIds,
			}),
			matrixSet: "c",
			style: 'default'
		});
		tileLayerSource2 = new ol.source.WMTS({
			url: 'http://t{0-7}.tianditu.com/cva_c/wmts',
			layer: 'cva',
			format: 'tiles',
			tileGrid: new ol.tilegrid.WMTS({
				origin: ol.extent.getTopLeft(projectionExtent),
				resolutions: resolutions,
				matrixIds: matrixIds,
			}),
			matrixSet: "c",
			style: 'default'
		});
		tileLayerSource3 = new ol.source.WMTS({
			url: 'http://srv.zjditu.cn/ZJEMAP_2D/wmts',
			layer: 'vec',
			format: 'tiles',
			tileGrid: new ol.tilegrid.WMTS({
				origin: ol.extent.getTopLeft(projectionExtent),
				resolutions: resolutions,
				matrixIds: matrixIds,
			}),
			matrixSet: "c",
			style: 'default'
		});
		tileLayerSource4 = new ol.source.WMTS({
			url: 'http://srv.zjditu.cn/ZJEMAPANNO_2D/wmts',
			layer: 'cva',
			format: 'tiles',
			tileGrid: new ol.tilegrid.WMTS({
				origin: ol.extent.getTopLeft(projectionExtent),
				resolutions: resolutions,
				matrixIds: matrixIds,
			}),
			matrixSet: "c",
			style: 'default'
		});
		tileLayerSource5 = new ol.source.WMTS({
			//url: 'http://srv.tianditusx.cn/KQEMAP/wmts.asmx/wmts',
			url:'http://220.191.220.90/JXEMAP/service/wmts',
			layer: 'JXEMAP',
			format: 'image/png',
			tileGrid: new ol.tilegrid.WMTS({
				origin: ol.extent.getTopLeft(projectionExtent),
				resolutions: resolutions,
				matrixIds: matrixIds,
			}),
			matrixSet: "TileMatrixSet0",
			style: 'default'
		});
		tileLayerSource6 = new ol.source.WMTS({
			url: 'http://srv.tianditusx.cn/KQEMAPANNO/wmts.asmx/wmts',
			layer: 'KQEMAPANNO',
			format: 'image/png',
			tileGrid: new ol.tilegrid.WMTS({
				origin: ol.extent.getTopLeft(projectionExtent),
				resolutions: resolutions,
				matrixIds: matrixIds,
			}),
			matrixSet: "TileMatrixSet0",
			style: 'default'
		});

		//========================================结束==============================

		self.markerSource = new ol.source.Vector({
			features: []
		});

		//绘点标注图层
		self.markerLayer = new ol.layer.Vector({
			source: self.markerSource
		});

		self.lineSource = new ol.source.Vector();

		self.lineLayer = new ol.layer.Vector({
			source: self.lineSource
		});

		self.polygonSource = new ol.source.Vector();

		self.polygonLayer = new ol.layer.Vector({
			source: self.polygonSource
		});

		self.circleSource = new ol.source.Vector();

		self.circleLayer = new ol.layer.Vector({
			source: self.circleSource
		});

		self.map = new ol.Map({
			logo: false,
			layers: [
				new ol.layer.Tile({
					name: "baseVec",
					source: tileLayerSource5
				})
//				,new ol.layer.Tile({
//					name: "baseCva",
//					source: tileLayerSource6
//				})

				, self.lineLayer, self.polygonLayer, self.circleLayer, self.markerLayer
			],
			target: self.containerId,
			controls: ol.control.defaults({
				attributionOptions: ({
					collapsible: true
				})
			}),
			view: new ol.View({
				projection: ol.proj.get("EPSG:4326"),
				//				projection: new ol.proj.Projection({
				//					code: 'xkcd-image',
				//					units: 'degrees'
				//				}),
				center: [120.70470350244467, 30.767954215582677],
				zoom: op.zoom,
				minZoom: 5,
				maxZoom: 18
			})
		});

		self.map.on('click', function(evt) {
			var feature = self.map.forEachFeatureAtPixel(evt.pixel,
				function(feature) {
					return feature;
				});
			if(feature) {
				//var coordinates = feature.getGeometry().getCoordinates();
				//var geo = feature.getGeometry();
				var temp = feature.getProperties();
				if(typeof temp.click == 'function') {
					temp.click(temp, evt.coordinate, feature);
				}
			}
		});

		self.map.on('pointermove', function(evt) {
			var feature = self.map.forEachFeatureAtPixel(evt.pixel,
				function(feature) {
					return feature;
				});
			if(feature) {
				//var coordinates = feature.getGeometry().getCoordinates();
				//var geo = feature.getGeometry();
				var temp = feature.getProperties();
				if(typeof temp.move == 'function') {
					temp.move(temp, evt.coordinate, feature);
				}
			}
		});

		//控制不同地图层级时,切换底图数据源
		self.map.getView().on("change:resolution", function() {
			var zoom = self.map.getView().getZoom();
			if(!(typeof zoom === 'number' && zoom % 1 === 0)) {
				return;
			}
			if(zoom <= 14) {
				var l1 = self.map.getLayers().getArray()[0];
				l1.setSource(tileLayerSource1);
				var l2 = self.map.getLayers().getArray()[1];
				l2.setSource(tileLayerSource2);
			} else if(zoom >= 15 && zoom <= 17) {
				var l1 = self.map.getLayers().getArray()[0];
				l1.setSource(tileLayerSource3);
				var l2 = self.map.getLayers().getArray()[1];
				l2.setSource(tileLayerSource4);
			} else {
				var l1 = self.map.getLayers().getArray()[0];
				l1.setSource(tileLayerSource5);
				var l2 = self.map.getLayers().getArray()[1];
				l2.setSource(tileLayerSource6);
			}
		});

	}

	//增加面
	OpenlayerMap.prototype.addPolygon = function(draws, options, source) {
		var self = this;
		var _option = extend({
			color: [0, 130, 195, 0.5], //多边形线条颜色
			fillColor: [0, 130, 195, 0.5], //填充颜色
			center: null,
			width: 3,
			click: undefined,
			move: undefined
		}, options);
		if(!source) source = self.polygonSource;
		var obj = extend({
			geometry: new ol.geom.Polygon([draws]),

		}, _option);
		var polygonFeature = new ol.Feature(obj);
		polygonFeature.setStyle(new ol.style.Style({
			stroke: new ol.style.Stroke({
				width: _option.width,
				color: _option.color
			}),
			fill: new ol.style.Fill({
				color: _option.fillColor
			})
		}));

		self.polygonSource.addFeature(polygonFeature);

		if(_option.center) {
			self.map.getView().setCenter([_option.center.x, _option.center.y]);
		}
		return polygonFeature;
	}

	//计算面积(单位米);
	OpenlayerMap.prototype.getArea = function(polygon) {
		var self = this;
		var sphere = new ol.Sphere(6378137);
		var lonLatPolygon = polygon.getGeometry().transform(self.projection, "EPSG:4326");
		var area = Math.abs(sphere.geodesicArea(lonLatPolygon.getCoordinates()[0]));
		return area;
	}

	//获得距离
	OpenlayerMap.prototype.getLength = function(line) {
		var self = this;
		var sphere = new ol.Sphere(6378137);
		var lonLatLine = line.getGeometry().transform(self.projection, 'EPSG:4326');
		var lineArray = lonLatLine.getCoordinates();
		var sumLength = 0;
		for(var i = 1; i < lineArray.length; i++) {
			sumLength += sphere.haversineDistance(lineArray[i - 1], lineArray[i]);
		}
		return sumLength;
	}

	//清空
	OpenlayerMap.prototype.clearSource = function(source) {
		source.clear();
	}

	//清空点
	OpenlayerMap.prototype.clearMarker = function() {
		this.clearSource(this.markerSource);
	}

	//清空线
	OpenlayerMap.prototype.clearLine = function() {
		this.clearSource(this.lineSource);
	}

	//清空面
	OpenlayerMap.prototype.clearPolygon = function() {
		this.clearSource(this.polygonSource);
	}
	//清空圆
	OpenlayerMap.prototype.clearCircle = function() {
		this.clearSource(this.circleSource);
	}
	//清除所有
	OpenlayerMap.prototype.clearAll = function() {
		this.clearLine();
		this.clearMarker();
		this.clearPolygon();
		this.clearCircle();
	}

	//移除面
	OpenlayerMap.prototype.removePolygon = function(feature) {
		if(!feature) return;
		this.polygonSource.removeFeature(feature);
	}

	//移除线
	OpenlayerMap.prototype.removeLine = function(feature) {
		if(!feature) return;
		this.lineSource.removeFeature(feature);
	}

	//移除点
	OpenlayerMap.prototype.removeMarker = function(marker) {
		if(marker == null) return;
		this.markerSource.removeFeature(marker);
	};

	//移除面
	OpenlayerMap.prototype.removeCircle = function(circle) {
		if(!circle) return;
		this.circleSource.removeFeature(circle);
	}

	//增加线
	OpenlayerMap.prototype.addLine = function(lines, options, source) {
		var self = this;
		var _option = extend({
			color: [0, 130, 195, 0.5],
			center: null,
			width: 3
		}, options);
		if(!source) source = self.lineSource;

		var feature = new ol.Feature({
			geometry: new ol.geom.LineString(lines)
		});

		feature.setStyle(new ol.style.Style({
			stroke: new ol.style.Stroke({
				width: _option.width,
				color: _option.color
			})
		}));

		source.addFeature(feature);

		if(_option.center) {
			self.map.getView().setCenter([_option.center.x, _option.center.y]);
		}

		return feature;

	};

	//画圆
	OpenlayerMap.prototype.addCircle = function(options, source) {
		var self = this;
		var op = extend({
			center: [0, 0], //圆心
			endPoint: [5, 5], //外点坐标
			radius: 0, //半径(如果大于0取半径,否则根据外点坐标算半径)
			color: [0, 130, 195, 0.5], //多边形线条颜色
			fillColor: [0, 130, 195, 0.5], //填充颜色
			width: 3,
			click: undefined,
			move: undefined,
			id: new Date().getTime()
		}, options);
		if(!op.radius) {
			var line = new ol.geom.LineString([op.center, op.endPoint]);
			op.radius = line.getLength();
		}
		var obj = extend({
			geometry: new ol.geom.Circle(op.center, op.radius)
		}, op);
		var feature = new ol.Feature(obj);
		feature.setStyle(new ol.style.Style({
			stroke: new ol.style.Stroke({
				width: op.width,
				color: op.color
			}),
			fill: new ol.style.Fill({
				color: op.fillColor
			})
		}));

		if(!source) source = self.circleSource;

		source.addFeature(feature);

		return feature;

	}

	//增加一个小圆点(不会变大.)
	OpenlayerMap.prototype.addIconCircle = function(options, source) {
		var self = this;
		var op = extend({
			x: 0,
			y: 0,
			fillColor: 'black',
			color: 'white',
			id: new Date().getTime(),
			radius: 7,
			width: 2,
			isCenter: false
		}, options);

		var obj = {
			geometry: new ol.geom.Point([op.x, op.y])
		};

		for(var name in op) {
			if(!(name in obj)) {
				obj[name] = op[name];
			}
		}

		var feature = new ol.Feature(obj);

		var iconStyle = new ol.style.Style({
			image: new ol.style.Circle({
				radius: op.radius,
				snapToPixel: false,
				fill: new ol.style.Fill({
					color: op.fillColor
				}),
				stroke: new ol.style.Stroke({
					color: op.color,
					width: op.width
				})
			})
		});

		feature.setStyle(iconStyle);

		if(!source) source = self.markerLayer.getSource();

		source.addFeature(feature);

		if(op.isCenter) {
			self.map.getView().setCenter([op.x, op.y]);
		}

		return feature;
	}

	//增加点
	OpenlayerMap.prototype.addMarker = function(options, source) {
		var self = this;
		var op = extend({
			x: 0,
			y: 0,
			src: self.imgPath,
			click: undefined,
			move: undefined,
			id: new Date().getTime(),
			isCenter: false
		}, options);
		var iconFeature = _createMarker(op);

		if(!source)
			source = self.markerLayer.getSource();

		source.addFeature(iconFeature);

		if(op.isCenter) {
			self.map.getView().setCenter([op.x, op.y]);
		}
		return iconFeature;
	}

	//移动点.
	OpenlayerMap.prototype.moveMarker = function(marker, options, callback) {
		var op = extend({
			x: 0,
			y: 0,
			time: 5000
		}, options);
		var coord = marker.getGeometry().getCoordinates();
		var num = parseInt(op.time / 30); //40毫秒刷新一个位置.
		var arr = calculationPoints([coord, [op.x, op.y]], num);

		_moveMarker(marker, arr, 1, callback);
	}

	function _moveMarker(marker, arr, index, callback) {
		if(index >= arr.length) {
			if(typeof callback == 'function') callback(marker);
			return;
		};
		var coord = arr[index];
		marker.getGeometry().setCoordinates(coord);
		window.setTimeout(function() {
			_moveMarker(marker, arr, ++index, callback);
		}, 30);
	}

	function calculationPoints(points, addNumber) {
		var arr = [];
		arr.push(points[0]);
		for(var i = 1; i < points.length; i++) {
			var p1 = points[i];
			var p2 = points[i - 1];
			var _x = p1[0] - p2[0];
			var _y = p1[1] - p2[1];
			for(var z = 1; z <= addNumber; z++) {
				var tempX = p2[0] + _x / addNumber * z;
				var tempY = p2[1] + _y / addNumber * z;
				arr.push([tempX, tempY]);
			}
		}
		return arr;
	}

	//arr = [{
	//		x:120,
	//		y:30,
	//		id:'123',
	//		type:'333'
	//	}]
	//增加多个点.
	OpenlayerMap.prototype.addMarkers = function(points, options) {
		var self = this;
		var arr = [];
		var op = extend({
			src: self.imgPath,
			click: undefined,
			move: undefined
		}, options);
		for(var i = 0; i < points.length; i++) {
			var temp = points[i];
			var obj = extend(temp, op);
			var iconFeature = _createMarker(obj);
			arr.push(iconFeature);
		}
		self.markerSource.addFeatures(arr);

		return arr;
	}

	/**
	 * 轨迹回放功能:
	 * 方法:
	 * init 初始化轨迹回放(显示一开始的状态) (重置)
	 * start(callback)  开始轨迹 callback在结束后执行
	 * pause	暂停  再次调用start继续
	 * dispose 	销毁,
	 * 
	 * 属性:
	 * speed : 速度  整型 数字越大跑的越快,负数往回跑.
	 * @param {Array} lines
	 * @param {Object} options
	 */
	OpenlayerMap.prototype.trackBack = function(lines, options) {
		var self = this;
		options = options || {};
		var ADD_NUMBER = 2000;
		var STATUS_DISPOSE = 0; //销毁状态
		var STATUS_INIT = 1; //初始化状态
		var STATUS_START = 2; //运行状态
		var STATUS_PAUSE = 3; //暂停状态
		var STATUS_END = 4; //结束状态

		function TrackBack(lines, options) {
			var self = this;
			self.speed = options.speed || 10; //轨迹回放速度
			self.filterDistance = options.filterDistance == undefined ? 5 : options.filterDistance; //筛选点(前后两个点相差小于该距离的移除掉) 单位:米
			self._lineColor = options.lineColor || [237, 212, 0, 0.8]; //线条颜色
			self._lineWidth = options.lineWidth || 6; //线条粗细
			self._imagePath = options.imagePath || 'point.png';
			self._circleRadius = options.circleRadius || 3; //点半径
			self._circleFillColor = options.circleFillColor || 'black'; //点填充颜色
			self._circleColor = options.circleColor || 'white'; //点线条颜色
			self._circleWidth = options.circleWidth || 2; //点线条粗细
			self._allPointShow = options.pointShow || true;
			self._status = STATUS_DISPOSE; //销毁状态
			self.sourceArray = lines;
		}

		//销毁
		TrackBack.prototype.dispose = function() {
			var self = this;
			if(self._status == STATUS_DISPOSE) return;
			self._stopAnimation();
			self.callback = undefined;
			oMap.map.removeLayer(self.vectorLayer); //移除
		};

		//初始化
		TrackBack.prototype.init = function() {
			var self = this;
			self.dispose();
			self._styles = {
				'route': new ol.style.Style({
					stroke: new ol.style.Stroke({
						width: self._lineWidth,
						color: self._lineColor
					})
				}),
				'point': new ol.style.Style({
					image: new ol.style.Circle({
						radius: self._circleRadius,
						snapToPixel: false,
						fill: new ol.style.Fill({
							color: self._circleFillColor
						}),
						stroke: new ol.style.Stroke({
							color: self._circleColor,
							width: self._circleWidth
						})
					})
				}),
				'icon': new ol.style.Style({
					image: new ol.style.Icon({
						anchor: [0.5, 1],
						src: self._imagePath
					})
				})
			};

			self.filterArray = filterArray(self.sourceArray, self.filterDistance); //筛选后的线

			self.routeCoords = calculationPoint(self.filterArray); //增加点位后的线.

			self.routeLength = self.routeCoords.length;

			var route = new ol.geom.LineString(self.filterArray); //轨迹线

			self.index = 0; //当前所在轨迹线点位.

			self.routeFeature = new ol.Feature({ //轨迹线要素
				type: 'route',
				geometry: route
			});

			self.geoMarker = new ol.Feature({ //当前点位置
				type: 'icon',
				geometry: new ol.geom.Point(self.routeCoords[self.index])
			});

			self.startMarker = new ol.Feature({ //起始点
				type: 'point',
				geometry: new ol.geom.Point(self.routeCoords[0])
			});
			self.endMarker = new ol.Feature({ //结束点
				type: 'point',
				geometry: new ol.geom.Point(self.routeCoords[self.routeLength - 1])
			});

			self.vectorLayer = new ol.layer.Vector({
				source: new ol.source.Vector({
					features: [self.routeFeature, self.startMarker, self.endMarker, self.geoMarker]
				}),
				style: function(feature) {
					return self._styles[feature.get('type')];
				}
			});

			if(self._allPointShow) { //显示轨迹点.
				var markers = createFeatures(self.filterArray);
				var source = self.vectorLayer.getSource();
				source.addFeatures(markers);
			}

			oMap.map.addLayer(self.vectorLayer);

			var areaArray = getFixArea(self.sourceArray);

			oMap.map.getView().fit(areaArray, oMap.map.getSize(), {
				duration: 1500
			});

			self._status = STATUS_INIT;
		};

		function createFeatures(arr) {
			var markers = [];
			for(var i = 0; i < arr.length; i++) {
				var temp = arr[i];
				var marker = new ol.Feature({
					type: 'point',
					geometry: new ol.geom.Point(temp)
				});
				markers.push(marker);
			}
			return markers;
		}

		TrackBack.prototype.start = function(callback) {
			var self = this;
			if(self._status == STATUS_INIT) { //初始化状态
				self.now = new Date().getTime();

				self.callback = callback;

				var source = self.vectorLayer.getSource();

				source.removeFeature(self.geoMarker);

				self._status = STATUS_START;

				oMap.map.on('postcompose', self._moveFeature, self);
			} else if(self._status == STATUS_PAUSE) {
				self._status = STATUS_START;
			}

		};

		TrackBack.prototype.pause = function(callback) {
			var self = this;
			if(self._status == STATUS_START) { //开始状态才能暂停.
				self._status = STATUS_PAUSE;
				return true;
			} else {
				return false;
			}
		};

		TrackBack.prototype._moveFeature = function(event) {
			var self = this;
			var vectorContext = event.vectorContext;
			var frameState = event.frameState;
			if(self._status == STATUS_START) {
				//				var elapsedTime = frameState.time - now;
				self.index += self.speed;

				if(self.index >= self.routeLength || self.index < 0) {
					self.index = self.index < 0 ? 0 : self.routeLength;
					self._stopAnimation();
					return;
				}
				var currentPoint = new ol.geom.Point(self.routeCoords[self.index]);
				self.currentFeature = new ol.Feature(currentPoint);

				vectorContext.drawFeature(self.currentFeature, self._styles.icon);

				oMap.map.render();

			} else if(self._status == STATUS_PAUSE) {
				//暂停
				var currentPoint = new ol.geom.Point(self.routeCoords[self.index]);
				self.currentFeature = new ol.Feature(currentPoint);
				vectorContext.drawFeature(self.currentFeature, self._styles.icon);
				oMap.map.render();

			} else {
				//初始化 or 销毁状态.
			}

		};

		TrackBack.prototype._stopAnimation = function() {
			var self = this;
			if(self._status == STATUS_START) {
				var coord = self.currentFeature.getGeometry().getCoordinates();
				self.geoMarker.getGeometry().setCoordinates(coord);
				var source = self.vectorLayer.getSource();
				source.addFeature(self.geoMarker);
			}

			oMap.map.unByKey('postcompose');

			if(self._status == STATUS_START || self._status == STATUS_PAUSE) {
				self._status = STATUS_END;
				if(typeof self.callback == 'function') self.callback();
			}

			self._status = STATUS_END;

		};

		//筛选点
		function filterArray(arr, distance) {
			var ar = [];
			if(arr.length < 2) return arr;
			if(distance <= 0) return arr;
			var p1 = arr[0];
			ar.push(p1);
			for(var i = 1; i < arr.length; i++) {
				var point = arr[i];
				var line = new ol.geom.LineString([p1, point]);
				var dis = line.getLength();
				if(dis >= distance) {
					p1 = point;
					ar.push(p1);
				}
			}
			return ar;

		}

		//分成N个点.
		function calculationPoint(points) {

			var arr = [];
			arr.push(points[0]);
			for(var i = 1; i < points.length; i++) {
				var p1 = points[i];
				var p2 = points[i - 1];
				var _x = p1[0] - p2[0];
				var _y = p1[1] - p2[1];
				for(var z = 1; z <= ADD_NUMBER; z++) {
					var tempX = p2[0] + _x / ADD_NUMBER * z;
					var tempY = p2[1] + _y / ADD_NUMBER * z;
					arr.push([tempX, tempY]);
				}
			}
			return arr;
		}

		function getDistance(p1, p2) {
			//return((p2[0] - p1[0]) ^ 2 + (p2[1] - p1[1]) ^ 2) ^ 0.5
			return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
		}

		function getFixArea(array) {
			var minx = null;
			var miny = null;
			var maxx = null;
			var maxy = null;
			for(var i = 0; i < array.length; i++) {
				var po = array[i];
				if(minx == null || minx > po[0]) minx = po[0];
				if(miny == null || miny > po[1]) miny = po[1];
				if(maxx == null || maxx < po[0]) maxx = po[0];
				if(maxy == null || maxy < po[1]) maxy = po[1];
			}
			return [minx, miny, maxx, maxy];
		}

		var rst = new TrackBack(lines, options);

		return rst;
	};

	function _createMarker(defaults) {

		var self = this;
		defaults.x = parseFloat(defaults.x);
		defaults.y = parseFloat(defaults.y);
		var obj = {
			geometry: new ol.geom.Point([defaults.x, defaults.y]),
			id: defaults.id || new Date().getTime(),
			click: defaults.click
		};
		for(var name in defaults) {
			if(!(name in obj)) {
				obj[name] = defaults[name];
			}
		}
		var iconFeature = new ol.Feature(obj);
		var iconStyle = new ol.style.Style({
			image: new ol.style.Icon(({
				anchor: [0.5, 1],
				anchorXUnits: 'fraction',
				anchorYUnits: 'fraction',
				src: defaults.src,
				//imgSize: [50, 50]
			}))
		});
		iconFeature.setStyle(iconStyle);

		return iconFeature;

	}
	window.OpenlayerMap = OpenlayerMap;
})(window, ol);

(function(global) {

	if(typeof global.extend == 'function') return;

	var extend,
		_extend,
		_isObject;

	_isObject = function(o) {
		return Object.prototype.toString.call(o) === '[object Object]';
	}
	_extend = function self(destination, source) {
		var property;
		for(property in destination) {
			if(destination.hasOwnProperty(property)) {

				// 若destination[property]和sourc[property]都是对象，则递归
				if(_isObject(destination[property]) && _isObject(source[property])) {
					self(destination[property], source[property]);
				};

				// 若sourc[property]已存在，则跳过
				if(source.hasOwnProperty(property)) {
					continue;
				} else {
					source[property] = destination[property];
				}
			}
		}
	}
	extend = function() {
		var arr = arguments,
			result = {},
			i;
		if(!arr.length) return {};
		for(i = arr.length - 1; i >= 0; i--) {
			if(_isObject(arr[i])) {
				_extend(arr[i], result);
			};
		}
		arr[0] = result;
		return result;
	}
	global.extend = extend;
})(window);