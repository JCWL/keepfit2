var myApp = angular.module('startApp', ['ui.router','ui.bootstrap']);

/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
myApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
myApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index',{
            url: '/index',
            views:{
                '': {
                    templateUrl : 'tpls/index.html'
                },
                'mainPage@index':{
                    templateUrl: 'tpls/home.html'
                }
            }
        }).state('index.home', {
            url: '/home', //注意这里在路由中传参数的方式
            views: {
                'mainPage@index':{
                    templateUrl: 'tpls/home.html'
                }
            }
            
        }).state('index.venuedetail', {
            url: '/venuedetail/:venueId', //注意这里在路由中传参数的方式
            views: {
                'mainPage@index':{
                    templateUrl: 'tpls/venueDetail.html'
                }
            }
            
        }).state('index.order', {
            url: '/order/:venueId',
            views: {
                'mainPage@index':{
                    templateUrl: 'tpls/order.html'
                }
            }
        }).state('index.map', {
            url: '/venuedetail/map/:lat',
            views: {
                'mainPage@index':{
                    templateUrl: 'tpls/map.html'
                }
            }
        }).state('index.mineInfo', {
            url: '/mineInfo',
            views: {
                'mainPage@index':{
                    templateUrl: 'tpls/mineInfo.html'
                }
            }
        });

});