require.config({
	baseUrl: '../../js',
	paths: {
		'mui': 'mui.min',
		'app': 'app',
		'common':'common',
		'zoom': 'mui.zoom',
		'imageViewer': 'mui.previewimage'
	}
});

require([ 'mui','app','common','imageViewer','zoom'], function( mui, app,common,imageViewer) {
	mui.init({});
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var item = self.item;
		
		getDetail(item);
		
		function getDetail(item){
			var url = app.webApi + 'api/License/GetApprovalInfo?licensingid=' + item.id;
			console.log(url);
			plus.nativeUI.showWaiting('加载中...');
			mui.ajax({
				url:url,
				success:function(data){

					data.detailtime = data.processtime_start + '~' +data.processtime_end ;
					if(data.issh=="0"){
						data.issh="同意"
					}else{
						data.issh="不同意"
					}
					app.setFormByData(data);
					app.putImageList('.addphoto .image',data.imgUrl,'ApprovalOrignalPath', function(img) {
						imageViewer.openImage(img);
					}); 
					
				},
				error:function(x,t,e){
					console.log(x);
				},complete:function(){
					plus.nativeUI.closeWaiting();
				}
			});
		}
		
		document.getElementById('mapaddress').addEventListener('tap', function() {
			var option = {
				title: '地图查看',
				mapOption: {
					center: {
						visible: true
					}
				}
			};
			var geo = document.getElementById("geography").innerText;
			if(geo){
				var point = geo.split(',');
				var lon = parseFloat(point[0]);
				var lat = parseFloat(point[1]);
				option.mapOption.center.latitude = lat;
				option.mapOption.center.longitude = lon;
			}else{
				return;
			}
			
			var url = '../../pq_map.html';
			mui.openWindow({
				url: url,
				id: url,
				extras: {
					option: option
				}
			});
		});
	});
})