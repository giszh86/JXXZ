require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'dataGet': 'DataGet',
		'pic': 'mui.picker.all',
		'position': 'position',
		'com': 'common'
	}
});

require(['imm', 'mui','app','dataGet','pic','position','com'], function(imm, mui, app,dataGet,pic,position,com) {
	mui.init({});
	mui.plusReady(function() {
		document.getElementById("posaddress").value=app.getItem('longitude')+","+app.getItem('latitude')
		document.getElementById("latitude").value=app.getItem('latitude')
		document.getElementById("longitude").value=app.getItem('longitude')
		//地图选点
		document.getElementById('choosemap').addEventListener('tap', function() {
			var gro = document.getElementById("posaddress").value;
			var op = {
				title: '选择地点',
				mapOption:{
					center:{
						
					}
				},
				clickMarker: {
					visible: true
				}
			};
			if(gro != ''){
				var point = gro.split(',');
				var lon = parseFloat(point[0]);
				var lat = parseFloat(point[1]);
				op.mapOption.center.latitude = lat;
				op.mapOption.center.longitude = lon;
			}
			var url = '../../pq_map.html';
			mui.openWindow({
				url: url,
				id: url,
				extras: {
					option: op
				}
			});
		});

		//监听地图点击完成事件
		window.addEventListener('clickMarker', function(e) {
			var marker = e.detail.marker;
			//console.log(JSON.stringify(marker));
			var str = marker.longitude + ',' + marker.latitude;
			document.getElementById("geography").value = str;
		});
		//店家类型
		dataGet.getZdList('type_djlx',function(data) {
			document.getElementById("storename").value=data[0].zd_name;
			document.getElementById("storetype").value=data[0].zd_id;
			document.getElementById("storename").addEventListener('tap',function(){
				dataGet.choosePick(data, {
					text: '#storename',
					value: '#storetype'
				});
			});
		});
		
		//所属区域
		dataGet.getZdList('type_yjdj_ssqy',function(data){
			document.getElementById("sourceareaname").value=data[0].zd_name;
			document.getElementById("sourceareatype").value=data[0].zd_id;
			document.getElementById("sourceareaname").addEventListener('tap',function(){
				dataGet.choosePick(data,{
					text:'#sourceareaname',
					value:'#sourceareatype'
				});
			});
		})
		
		//许可有效期开始时间
		document.getElementById('s_licence').addEventListener('tap', function() {
			var that = this;
			var strDate = that.value;
			if(strDate == '') strDate = new Date().Format('yyyy-MM-dd');
			dataGet.chooseDate({
				type:'data',
				value: strDate
			}, function(items) {
				if(!items.y.value&!items.m.value&items.d.value) return;
				var value=items.y.value+'-'+items.m.value+'-'+items.d.value;
				that.value =value;
			});
		});
		//许可有效期结束时间
		document.getElementById('e_licence').addEventListener('tap', function() {
			var that = this;
			var strDate = that.value;
			if(strDate == '') strDate = new Date().Format('yyyy-MM-dd');
			dataGet.chooseDate({
				type:'data',
				value: strDate
			}, function(items) {
				if(!items.y.value&!items.m.value&items.d.value) return;
				var value=items.y.value+'-'+items.m.value+'-'+items.d.value;
				that.value =value;
			});
		});
		//经营有效期开始时间
		document.getElementById('s_business').addEventListener('tap', function() {
			var that = this;
			var strDate = that.value;
			if(strDate == '') strDate = new Date().Format('yyyy-MM-dd');
			dataGet.chooseDate({
				type:'data',
				value: strDate
			}, function(items) {
				if(!items.y.value&!items.m.value&items.d.value) return;
				var value=items.y.value+'-'+items.m.value+'-'+items.d.value;
				that.value =value;
			});
		});
		//经营有效期结束时间
		document.getElementById('e_business').addEventListener('tap', function() {
			var that = this;
			var strDate = that.value;
			if(strDate == '') strDate = new Date().Format('yyyy-MM-dd');
			dataGet.chooseDate({
				type:'data',
				value: strDate
			}, function(items) {
				if(!items.y.value&!items.m.value&items.d.value) return;
				var value=items.y.value+'-'+items.m.value+'-'+items.d.value;
				that.value =value;
			});
		});
		//提交
		document.getElementById("submit").addEventListener('tap',function(){
			var data=app.getDataByContent();
			data.createuserid=app.getUserInfo().ID;
			if(!/^[A-Za-z0-9]+$/.test(data.card)){
				mui.toast('证件号内含有特殊字符');
				return;
			}
			if(!/^[0-9]*$/.test(data.contactphone)){
				mui.toast('联系电话格式不正确');
				return;
			}
			if(!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(data.businessarea)){
				mui.toast('营业面积含有特殊字符');
				return;
			}
			if(!/^\d+$/.test(data.staffsum)){
				mui.toast('员工数含有特殊字符');
				return;
			}
			plus.nativeUI.showWaiting('请稍候...');
			var url=app.webApi+'api/LawObject/AddStreetShop';
			mui.ajax({
				url: url,
				type: 'post',
				data: data,
				success:function(data){
					alert("添加成功！");
					var father=plus.webview.currentWebview().opener();
					mui.fire(father,'refresh');
				},
				error:function(x,t,e){
					console.log(x);
				},
				complete:function(){
					plus.nativeUI.closeWaiting();
				}
			})
		});
		
		//时间转换
		Date.prototype.format = function (format) {
          var args = {
              "M+": this.getMonth() + 1,
              "d+": this.getDate(),
              "h+": this.getHours(),
              "m+": this.getMinutes(),
              "s+": this.getSeconds(),
              "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
              "S": this.getMilliseconds()
               };
          if (/(y+)/.test(format))
               format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
           for (var i in args) {
              var n = args[i];
                if (new RegExp("(" + i + ")").test(format))
                   format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
                 }
              return format;
             }
	});
})