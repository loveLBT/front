var indexLoginApp = angular.module("indexLoginApp", ['ngCookies']);

indexLoginApp.factory("myHttpInterceptor", ["$q", "$injector", function($q, $injector) {
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
				alert("401");
				return $q.reject(rejection);
			} else if (rejection.status === 404) {
				alert("404!");
				return $q.reject(rejection);
			}
			return $q.reject(rejection);
		}
	}
}]);

indexLoginApp.config(["$httpProvider", function($httpProvider) {
	$httpProvider.interceptors.push('myHttpInterceptor');
}]);

indexLoginApp.controller("loginCtrl", ["$scope", "$http", "$location", "$cookies", function($scope, $http, $location, $cookies) {
	$scope.login = {
		account: "",
		pwd: ""
	}
	$scope.loginSubmit = function() {
		$scope.loginData = {
			"username": "1360669415",
			"password": "13606694151"
		}
		$http({
				method: "POST",
				url: "http://121.40.201.242:8082/api/users/login",
				data: $scope.loginData,
				headers: {
					"Content-Type": "application/json;charset=utf-8"
				}
			})
			.then(function(response) {
				if ($scope.loginData.username != "" || $scope.loginData.password != "") {
					$cookies.putObject("bgjz", response.data, {
						'path': '/'
					});
					//					console.log($cookies.getObject('bgjz'))
					//					console.log(response)
					location.href = "admin/admin.html";
				};
			}, function(response) {
				console.log(response)
			})
	}
}]);