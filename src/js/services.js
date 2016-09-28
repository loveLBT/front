var mainServices=angular.module('mainServices',[]);

mainServices.factory("globaleService",["$http","$q","$window","$timeout","$state",function($http,$q,$window,$timeout,$state){
	var server={};
		server.ajaxData=function(settings){
			var deferred=$q.defer();
			$http({
				method:settings.method,
				url:apiUrl+settings.url,
				params:settings.data,
				data:settings.data,
				dataType: "json",
				headers:{
					"Authorization":$window.sessionStorage.token
				},
			}).success(function(data,state){
				deferred.resolve(data);
			}).error(function(data,state){
				if(state==401){
					$window.sessionStorage.token='';
					$state.go('login');
				}
				deferred.reject(data);
			})
			return deferred.promise
		};
		server.upload=function(files,url){
			this.files=files;
			this.formdata=new FormData();
			this.formdata.append('file',files);
			var deferred=$q.defer();
			$.ajax({
				type:"post",
				data:this.formdata,
				url:apiUrl+url,
				contentType: false,
				processData: false,
				headers:{
					"Authorization":$window.sessionStorage.token
				},
			}).success(function(data,state){
				deferred.resolve(data);
			}).error(function(data,state){
				deferred.reject(data);
			})
			return deferred.promise
		};
	return server;
}])

mainServices.factory("tipService",["$timeout",function($timeout){
	var server={
		message:null,
		type:null,
		state:false
	};
		server.setMessage=function(msg,type){
			this.message=msg;
			this.type=type;
			this.state=true;
			if (timeout) $timeout.cancel(timeout);
			var timeout = $timeout(function() {
				this.state=false;
			}.bind(this), 3000)
		};
	return server;
}])

mainServices.factory("loadingService",["$timeout",function($timeout){
	var server={
		state:false
	};
		server.setLoading=function(){
			this.state=true;
			if (timeout) $timeout.cancel(timeout);
			var timeout = $timeout(function() {
				this.state=false;
			}.bind(this), 3000)
		};
	return server;
}])

mainServices.factory("sureService",["$timeout",function($timeout){
	var server={};
		server.isEmptyObject=function(obj){
			for ( var name in obj ) { 
				return false; 
			} 
			return true
		};
		server.hasPwd=function(data){
			if(data.password||data.confirm){
				return true
			}else{
				return false
			}
		};
	return server;
}])

mainServices.factory("loginService",["$http","$q",function($http,$q){
	var server={};
		server.sub=function(data){
			var deferred=$q.defer();
			$http({
				method:"post",
				url:apiUrl+"/admin/login",
				data:data,
			}).success(function(data,state,headers){
				deferred.resolve(data);
			}).error(function(data,state){
				var errorData={};
				errorData.data=data.message;
				errorData.state=state;
				deferred.reject(errorData);
			})
			return deferred.promise
		};
	return server;
}])
mainServices.factory("dateService",["$http","$q",function($http,$q){
	var server={};
		server.getUnix=function(dateStr){
			var newstr = dateStr.replace(/-/g, '/');
			var date = new Date(newstr);
			var time = date.getTime().toString();
			return time.substr(0, 10);
		};
	return server;
}])

