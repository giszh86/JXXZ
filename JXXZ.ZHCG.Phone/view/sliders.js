require.config({
	baseUrl: 'js',
	paths: {
		'mui': 'mui.min',
		'imm': 'immersed',
		'template': 'template'
	}
});

require(['mui', 'imm', 'template'], function(mui, imm, template) {
	mui.init({
		swipeBack: false
	});
	var _page_id = '';

	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		document.querySelector("header .mui-title").innerText = self.title;
		if(!self.pages || self.pages.length == 0) {
			console.log('必须传入一个page页面');
			return;
		}
		_page_id = self.pages[0].url;
		if(self.pages.length > 1) {
			var _dataList = {
				'list': self.pages
			};
			var _html = template('list-tmp', _dataList);
			var _pages = [];
			for(var i = 0; i < self.pages.length; i++) {
				var page = self.pages[i];
				console.log(JSON.stringify(page));
				var tempPage = mui.preload({
					url: page.url,
					id: page.url,
					styles: {
						top: (86 + window.immersed) + 'px',
						bottom: '0px'
					},
					extras: page.extras || {}
				});
				_pages.push(tempPage);
				self.append(tempPage);
				if(i > 0) tempPage.hide();
			}

			//alert(temp);
			document.querySelector(".mui-content").innerHTML = _html;

			//页面显示
			window.setTimeout(function() {
				plus.webview.show(self, "slide-in-right", 300, function() {
					plus.nativeUI.closeWaiting();
				});
			}, 1000);

			mui('#sliderSegmentedControl a').each(function(index, item) {
				var that = this;
				that.addEventListener('tap', function() {
					TabTap(index, item);
				}, false);
			});

			function TabTap(index, item) {
				//alert(index + item.innerText);
				_page_id = _pages[index].id;
				_pages[index].show();
			}
		} else { //单个页面
			var subpage = self.pages[0];
			var sub = mui.openWindow({
				url: subpage.url,
				id: subpage.url,
				styles: {
					top: (46 + window.immersed) + 'px',
					bottom: '0px'
				},
				extras: subpage.extras || {},
				waiting: {
					autoShow: false
				}
			});
			self.append(sub);
			window.setTimeout(function() {
				plus.webview.show(self, 'slide-in-right', 500, function() {
					plus.nativeUI.closeWaiting();
				});
			}, 500);

		}
		
		//监听页面关闭事件
		window.addEventListener('back',function(e){
			//mui.back();
			var self = plus.webview.currentWebview();
			var list = self.children();
			for (var i = 0; i < list.length; i++) {
				var temp =	list[i];
				temp.close();
			}
			self.close();
		});

//		//页面回退方法重写
//		var old_back = mui.back;
//		mui.back = function() {
//			var webviews = plus.webview.all();
//			var id = plus.webview.currentWebview().id;
//			for(var i = webviews.length - 1; i > 0; i--) {
//				if(webviews[i].id == 'index.html') break;
//				if(webviews[i].id != id && webviews[i].id != _page_id) {
//					webviews[i].close();
//				}
//			}
//			old_back();
//		}

	});
});

//		var temp = heredoc(function() {
//			/*
//				 <div id="slider" class="mui-slider">
//				<div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
//					<a class="mui-control-item mui-active" >
//						测试1
//					</a>
//					<a class="mui-control-item" >
//						测试2
//					</a>
//					<a class="mui-control-item" >
//						测试3
//					</a>
//					<a class="mui-control-item" >
//						测试4
//					</a>
//					<a class="mui-control-item" >
//						测试5
//					</a>
//				</div>
//				
//				<div class="mui-slider-group" style="height: 1px;">
//					<div class="mui-slider-item mui-control-content mui-active">
//					
//					</div>
//					
//				</div>
//			</div>
//				 */
//
//		});

//		function heredoc(fn) {
//			var str = fn.toString().split('\n').slice(1, -1).join('\n') + '\n'
//			str = str.replace(/\/\*|\*\//g, "");
//			return str;
//		}