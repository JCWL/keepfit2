'use strict';
/* Services */

// Shared data from settings needed by different controllers
myApp.service('settingsService', function () {
    var _variables = {};
    return {
        get: function (varname) {
            return (typeof _variables[varname] !== 'undefined') ? _variables[varname] : false;
        },
        set: function (varname, value) {
            _variables[varname] = value;
        }
    };
});

myApp.factory('loadDataService',  ['$http',
    function($http) {
        var doRequest = function(username, path) {
            return $http({
                method: 'GET',
                url: path
            });
        }
        return {
            // 加载场馆列表数据
            venueList: function(username) {
                return doRequest(username, 'data/list1.json');
            },
            // 加载场馆信息
            venue: function(venueId) {
                return doRequest(venueId, 'data/detail.json');
            },
            // 所有类型列表
            types: function(){
                return doRequest('', 'data/types.json')
            }
        };
    }
]);
