myApp.directive("myrating", function() {
    return {
        restrict: 'AE',
        scope:{
            rate:'@'
        },
        template: 'hello',
        replace: true,
        link: function (rate) {
            // if (rate) {alert(rate)};
        }
    }
});

myApp.directive("baidumap", function () {
  return {
    restrict: "E",
    replace: true,
    template: "<div id='allmap'></div>",
    scope: {
      // zoom: "@",          // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
      lng: "@",
      lat: "@"
    },
    link: function (scope, element, attrs) {
        // 百度地图API功能
        var map = new BMap.Map("allmap");            // 创建Map实例
        var point = new BMap.Point(scope.lng, scope.lat); // 创建点坐标
        map.centerAndZoom(point,15); 
        // var point = new BMap.Point(113.738487, 34.361282); // 创建点坐标
        // map.centerAndZoom(point,scope.zoom);                 // 初始化地图,设置中心点坐标和地图级别。
        map.addControl(new BMap.ZoomControl());      //添加地图缩放控件
        var marker = new BMap.Marker(point);  //创建标注
        map.addOverlay(marker);                 // 将标注添加到地图中

    }
  }
});
