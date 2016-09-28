BGJZ_App.directive('myLaydate', function() {
	return {
		restrict: "E",
		replace: true,
		scope: {
			myName: '@',
			myTime: '=',
			myForm: '='
		},
		controller: ["$scope", function($scope) {
			$scope.required = true
		}],
		template: "<input type='text' name='{{myName}}' class='form-control form-laydate' placeholder='请选择日期' readonly='readonly' ng-model='classhour.checkDate' ng-required='required' />",
		link: function(scope, element, attrs) {
			element.on('click', function() {
				laydate({
					min: laydate.now(),
					choose: function(date) {
						scope.$apply(function() {
							scope.myTime = date;
							//							console.log(scope.myForm)
							scope.required = false;
							scope.myForm.$valid = true;
						})
					}
				})
			})
		}
	}
});

BGJZ_App.directive("myMedia", function() {
	return {
		restrict: "AE",
		replace: true,
		template: "<a href='javascript:;'>播放</a>",
		link: function(scope, element, attrs) {
			element.on('click', function() {
				if (!$('.media-wrap').length) {
					$('body').append("<div class='media-wrap'><div id='mediaBox' class='media-box'></div><div class='media-mask'></div></div>");
					var mediaBox = $('#mediaBox');
					mediaBox.css({
						'position': 'absolute',
						'top': '50%',
						'left': '50%',
						'z-index': '99',
						'margin': '-250px 0 0 -400px'
					});
				} else {
					$('.media-wrap').show();
				}

				var flashvars = {
					p: 1,
					f: 'http://movie.ks.js.cn/flv/other/1_0.flv',
					c: 0
				};
				var params = {
					bgcolor: '#FFF',
					allowFullScreen: true,
					allowScriptAccess: 'always',
					wmode: 'transparent'
				};
				var video = ['http://movie.ks.js.cn/flv/other/1_0.mp4->video/mp4'];
				CKobject.embed('../dist/js/ckplayer/ckplayer.swf', 'mediaBox', 'ckplayer_mediaBox', '800', '500', false, flashvars, video, params);

				var media_mask = $('.media-mask')
				media_mask.click(function() {
					$('.media-wrap').fadeOut();
				})
			})
		}
	}
})

var mainDirectives = angular.module('mainDirectives', []);

mainDirectives.directive('login', ["$timeout", "$window", "$state", "loginService", "tipService",function($timeout, $window, $state, loginService,tipService) {
	return {
		restrict: "AE",
		replace: true,
		scope: {
			data: "=",
			tip: "="
		},
		template: "<a class='btn btn-primary btn-block form-control'>登录</a>",
		link: function(scope, elem, attr) {
			elem.bind('click', function() {
				loginService.sub(scope.data).then(function(res) {
					$window.sessionStorage.token = res.accessToken;
					$state.go("list.store");
				}, function(error) {
					console.log(error);
					tipService.setMessage('登入失败！'+error.data,'danger');
				});
			})
		},
	}
}])
mainDirectives.directive('loginout', ["$window","$state","globaleService",function($window,$state,globaleService) {
	return {
		restrict: "AE",
		replace: true,
		scope: {},
		template: "<a>退出</a>",
		link: function(scope, elem, attr) {
			scope.settings={method:"delete",url:"/admin/login",data:""};
			elem.bind('click',function(){
				globaleService.ajaxData(scope.settings).then(function(res){
					$window.sessionStorage.token='';
					$state.go("login");
				},function(error){
					tipService.setMessage('成功退出！','success');
				})
			})
		},
	}
}])

mainDirectives.directive('disable', ["$location", "globaleService","tipService", function($location, globaleService,tipService) {
	return {
		restrict: "AE",
		replace: true,
		scope: {
			setting1:"=",
			setting2:"=",
			stateBtn1:"@",
			stateBtn2:"@",
			url1:"@",
			url2:"@",
			state: "@",
			refresh:"&"
		},
		template: "<span><a class='btn btn-danger' ng-if='state==1||state==3'>{{stateBtn1}}</a><a class='btn btn-danger' ng-if='state==2'>{{stateBtn2}}</a></span>",
		link: function(scope, elem, attr) {
			elem.bind('click',function(even){
				scope.setting1.url=scope.url1;
				scope.setting2.url=scope.url2;
				if(scope.state==1){
					scope.setting=scope.setting1;
				}else if(scope.state==2){
					scope.setting=scope.setting2;
				}else if(scope.state==3){
					scope.setting=scope.setting1;
				}
				globaleService.ajaxData(scope.setting).then(function(res){
					scope.refresh();
					tipService.setMessage("状态修改成功",'success');
				},function(error){
					tipService.setMessage("状态修改出错",'danger');
				})
			});
		}
	}
}])



mainDirectives.directive('sure', ["$timeout", "$stateParams","globaleService" ,"sureService","tipService","dateService", function($timeout, $stateParams, globaleService,sureService,tipService,dateService) {
	return {
		restrict: "AE",
		replace: true,
		scope: {
			data: "=",
			urlData: "="
		},
		template: "<button class='btn btn-success btn-block'>确定</button>",
		link: function(scope, elem, attr) {
			var inputData={};
			var showTip=function(){
				$.each(scope.data,function(i,index){
					if (index.inputModel == ""){
						if (index.labelFor == "password" || index.labelFor == "confirm") {
							return true
						}else{
							tipService.setMessage(index.labelName+"不能为空！",'danger');
							inputData={};
							return false
						}
						
					}else{
						switch(index.dataType) {
							case 'int':
								if(index.filter!="datefilter"){
									inputData[index.labelFor] = parseInt(index.inputModel);
								}else{
									inputData[index.labelFor]=parseInt(dateService.getUnix(index.inputModel));
								};
								break;
							case 'float':
								inputData[index.labelFor] = parseFloat(index.inputModel);
								break;
							default:inputData[index.labelFor]=index.inputModel;
						}
					}
				})
			};
			var postData=function(){
				var settings={method:"post",url:scope.urlData.postUrl,data:inputData}
				globaleService.ajaxData(settings).then(function(res){
					history.back();
				},function(error){
					tipService.setMessage("添加出错！",'danger')
				})
			};
			var putData=function(){
				var settings={method:"put",url:scope.urlData.putUrl,data:inputData}
				globaleService.ajaxData(settings).then(function(res){
					history.back();
				},function(error){
					tipService.setMessage("更改出错！",'danger')
				})
			};
			var uploadData=function(){
				if ($stateParams.id == 0) {
					postData();
				} else {
					putData();
				}
			};
			var checkPwd=function(){
				if (inputData.password == inputData.confirm) {
					uploadData();
				} else {
					tipService.setMessage("两次输入的密码不一致",'danger');
				}
			};
			var checkObj=function(){
				if(!sureService.isEmptyObject(inputData)){
					if(sureService.hasPwd(inputData)){
						checkPwd();
					}else{
						uploadData();
					}
				}
			}
			elem.bind('click',function(){
				showTip();
				checkObj();
			})
		}
	}
}])


mainDirectives.directive('fileread', ["globaleService","tipService","loadingService",function(globaleService,tipService,loadingService) {
	return {
		restrict: "AE",
		replace: true,
		scope: {
			model:"="
		},
		template: "<div class='col-sm-12'><input class='form-control fileShow' type='text' ng-model='model' /><input class='form-control fileHide' type='file' /></div>",
		link: function(scope, elem, attr) {
			scope.fileSetting={method:"post",url:"/admin/upload",data:""};
			elem.bind('change',function(changeEvent){
				loadingService.setLoading();
				scope.$apply(function(){
					globaleService.upload(changeEvent.target.files[0],"/admin/upload").then(function(res){
						tipService.setMessage("文件上传成功","success");
						scope.model=res.url;
					},function(error){
						tipService.setMessage("文件上传失败",'danger');
					})
				})
			})
		},
	}
}])

mainDirectives.directive('alertBar', function() {
	return {
		restrict: "AE",
		replace: true,
		scope: {
			message:"=",
			type:"=",
			state:"="
		},
		templateUrl: "global/alertBar.html",
		link: function(scope, elem, attr) {
			var slider=function(state){
				if(!state){
					$(elem).slideUp();
				}else{
					$(elem).slideDown();
				}
			}
			if(!scope.message){
				$(elem).css({display:"none"});
			}
			scope.$watch('state',function(newVal,oblVal){
				slider(newVal);
			})
		},
	}
})

mainDirectives.directive('loadingBar', function() {
	return {
		restrict: "AE",
		replace: true,
		scope: {},
		templateUrl: "global/loadingBar.html",
		link: function(scope, elem, attr) {
			
		},
	}
})



mainDirectives.directive('date', function() {
	return {
		restrict: "AE",
		replace: true,
		scope: {
			date:"="
		},
		link: function(scope, elem, attr) {
			elem.bind('click',function(){
				laydate({
					min: laydate.now(),
					choose: function(date) {
						scope.$apply(function() {
							scope.date=date;
						})
					}
				})
			})
		},
	}
})

mainDirectives.directive('pageBar', function() {
	return {
		restrict: "AE",
		replace: true,
		scope: {
			count:"=",
			data:"=",
			refresh:"&"
		},
		template: "<div id='page-selection'></div>",
		link: function(scope, elem, attr) {
			scope.$watch('count',function(newVal,oldVal){
				if(newVal!=undefined){
					$('#page-selection').bootpag({
		                total: Math.ceil(newVal/scope.data.size) ,
		                page:scope.data.page+1,
		            }).on("page", function(event, num){
		                scope.data.page=num-1;
		                scope.refresh();
		            });
				}
			});
		},
	}
})
