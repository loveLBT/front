var BGJZ_App = angular.module("BGJZ_App", ["ui.router", "ngCookies"]);

var app = angular.module("myApp", ["ui.router", "angularFileUpload", "mainConfigs", "mainControllers", "mainDirectives"]);

BGJZ_App.run(['$rootScope', '$state', '$stateParams', '$cookies', '$http', function($rootScope, $state, $stateParams, $cookies, $http) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	$rootScope.path = "http://121.40.201.242:8082/api/";
	$rootScope.cookies =  $cookies.getObject('bgjz');
//accessToken
	if (!angular.isUndefined($rootScope.cookies)) {
		$http.defaults.headers.common.Authorization = $rootScope.cookies.accessToken;
	}
	else{
//		alert('1')
	}
}]);

BGJZ_App.factory("myHttpInterceptor", ["$q", "$injector", function($q, $injector) {
	return {
		'request ': function(config) {
			return config;
		},
		'requestError': function(rejection) {
			return $q.reject(rejection);
		},
		'response': function(response) {
			return response;
		},
		'responseError': function(rejection) {
			if (rejection.status == 401) {
				alert("请先登录");
				location.href="/"
				console.log(rejection);
				return $q.reject(rejection);
			} else if (rejection.status === 404) {
				alert("404!");
				return $q.reject(rejection);
			}
			return $q.reject(rejection);
		}
	}
}]);

BGJZ_App.config(["$httpProvider", function($httpProvider) {
	$httpProvider.interceptors.push('myHttpInterceptor');
}]);

var host=window.location.host;
window.apiUrl="http://"+host+"/api";
var app = angular.module("myApp",["ui.router",'ngAnimate','mainConfigs',"mainControllers","mainDirectives","mainServices","mainFilters"]);

app.run(["$rootScope","$state","$stateParams","$window","tipService","loadingService",function($rootScope, $state, $stateParams,$window,tipService,loadingService){
	$rootScope.tipService=tipService;
	$rootScope.loadingService=loadingService;
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        if(toState.requireLogin && !$window.sessionStorage.token){
        	event.preventDefault();
        	$state.go("login");
        }
    });
}])
