require.config({
	baseUrl: 'js',
	paths: {
		'mui': 'mui.min',
		'app': 'app',
		'imm': 'immersed',
		'template': 'template'
	}
});

require(['mui', 'app', 'template'], function(mui, app, template) {
	mui.init({
		swipeBack: false
	});
	var _page_id = null;

	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		document.querySelector("header .mui-title").innerText = self.title;
		if(!self.pages || self.pages.length == 0) {
			mui.toast('必须传入一个page页面');
			return;
		}
		var pages = self.pages;
		_page_id = self.pages[0].url;
		
		if(self.pages.length > 1) {
			var _dataList = {
				'list': self.pages
			};
			var _html = template('list-tmp', _dataList);
			var _pages = [];
			for(var i = 0; i < self.pages.length; i++) {
				var page = self.pages[i];
				//console.log(JSON.stringify(page));
				var tempPage = mui.preload({
					url: page.url,
					id: page.url,
					styles: {
						top: (86) + 'px',
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
			}, 500);

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
					top: (46) + 'px',
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
			}, 300);

		}

	});
});