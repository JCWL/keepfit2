myApp.controller('VenueListCtrl', ['$scope', 'loadDataService',
    function($scope, loadDataService) {
        loadDataService.venueList('ss').success(function (data, status) {
            $scope.venues = data;
        });
    }
]);

myApp.controller('DropdownCtrl', function ($scope, $log, $templateCache, loadDataService) {

        $templateCache.removeAll();

        $scope.item = {
            date : {showname:"今天", showid:"", isopen:false},
            type : {showname:"", showid:"", isopen:false},
            position : {showname:"位置", showid:"", isopen:false}
        };

        loadDataService.types().success(function(data, status) {
            $scope.item.type.alltypes = data;
            $scope.item.type.showname = data[0].name;
            $scope.item.type.showid = data[0].typeId;
        });

        $scope.chooseType = function (id, name) {
            $scope.item.type.showname = name;
            $scope.item.type.showid = id;
            $log.log('current type : [', $scope.item.type.showid , ',' , $scope.item.type.showname, ']');
        }
    }
);

myApp.controller('venueDetailCtrl', function ($scope, $log, $templateCache, $state, $stateParams, loadDataService){
    $log.log("传来的参数：" + angular.toJson($stateParams, true)  + "；路由：" + angular.toJson($state.current, true));

    loadDataService.venue($stateParams.venueId)
    .success(function (data, status){
        $scope.venue = data;
        // 设置轮播图图片间隔
        $scope.myInterval = 1000;
    });

});


myApp.controller('baiduMapCtrl', function ($scope, $document) {
        /*
        百度地图坐标查询:
        http://api.map.baidu.com/lbsapi/getpoint/
        */
        $scope.lng = 121.594061;
        $scope.lat = 31.207879;
        
});

