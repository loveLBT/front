//登录用户信息
BGJZ_App.controller("adminCtrl", ["$scope", "$rootScope", "$http", "$cookies", function($scope, $rootScope, $http, $cookies) {
	$http({
			method: "GET",
			url: $rootScope.path + "users/current"
		})
		.then(function(response) {
			//			console.log(response);
			$scope.adminData = response.data.Users[0];
		}, function(response) {
			console.log(response);
		})
		//退出登录
	$scope.loginOut = function() {
		$http({
				method: "DELETE",
				url: $rootScope.path + "users/login"
			})
			.success(function(data) {
				$cookies.remove('bgjz', {
					'path': '/'
				});
				//				console.log($cookies.getObject('bgjz'));
				alert('已退出当前用户')
				location.href = '/';
			})
			.error(function(data) {
				console.log(data)
			})
	}
}]);
//开班信息
BGJZ_App.controller("openList", ["$scope", "$rootScope", "$http", function($scope, $rootScope, $http) {
	$scope.listTitle = ['开班编号', '课程名字', '招生简章', '课程表', '课时', '学费', '开班时间', '考试时间', '班级容量', '本店报名', '报名状态'];
	$http({
			method: "GET",
			url: $rootScope.path + "courses"
		})
		.then(function(response) {
			console.log(response);
			$scope.listData = response.data.courses;
		}, function(response) {
			console.log(response);
		});

}]);
//新增学员
BGJZ_App.controller("apply", ["$scope", "$rootScope", "$location", "$http", function($scope, $rootScope, $location, $http) {
	$scope.classhour = {
		testtype: '新考'
	};

	$scope.card_test = function(cardval, validate) {
		$scope.birthDateVal = '';
		$scope.sexVal = '';
		if (!validate.minlength && !validate.required) {
			if (cardval.length == 18) {
				$scope.birthDateVal = cardval.substring(6, 10) + "-" + cardval.substring(10, 12) + "-" + cardval.substring(12, 14)
				if (parseInt(cardval.substring(16, 17) % 2) == 1) {
					$scope.sexVal = "男"
				} else {
					$scope.sexVal = "女"
				}
			}

		}
	};

	$scope.applySubmit = function(form) {
		console.log($scope.classhour);
		console.log(form.$valid)
		angular.forEach(form.$error.required, function(value, key) {
			form[value.$name].$setDirty();
		})
		if (form.$valid) {
			$http({
				method: 'POST',
				url: $rootScope.path + "student",
				data: $scope.classhour
			}).then(function(response) {
				console.log(response);
				$location.path('/info')
			}, function(response) {
				console.log(response);
			})
		}
	}
}]);

//学员信息
BGJZ_App.controller("infoList", ["$scope", function($scope) {
	$scope.readOnlyBtn = true;
}]);
//学员信息
BGJZ_App.controller("studentsList", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
	$scope.studentsListTit = ['学员编号', '姓名', '身份证号', '联系电话', '报名课程', '入学时间', '考试时间', '状态', '操作'];
	$http({
			method: "GET",
			url: $rootScope.path + "student"
		})
		.then(function(response) {
			$scope.studentsListData = response.data.courses
			console.log($scope.studentsListData)
		}, function(response) {
			console.log(response)
		})
}]);
//网络课程
BGJZ_App.controller("onlineCourses", ["$scope", "$rootScope", "$http", function($scope, $rootScope, $http) {
	$http({
			method: "GET",
			url: $rootScope.path + "getcourses"
		})
		.success(function(data) {
			console.log(data)
			$scope.studentData = data.courses;
		})
		.error(function(data) {})

}]);
//课时列表
BGJZ_App.controller("learning", ["$scope", "$rootScope", "$http", "$stateParams", function($scope, $rootScope, $http, $stateParams) {
	console.log($stateParams);
	//	$http({
	//			method: "GET",
	//			url: $rootScope.path + "getclasshour"
	//		})
	//		.then(function(response) {
	//			console.log(response)
	//			$scope.learnData = data.classhour;
	//		}, function(response) {
	//			console.log(response);
	//		});
}]);

/***********************后台控制器*******************************/

//var mainControllers = angular.module('mainControllers', []);
//mainControllers.controller("loginCtrl", ["$scope", function($scope) {
//
//}])
//
//mainControllers.controller("listCtrl", ["$scope", function($scope) {
//
//}])
//
//mainControllers.controller("navCtrl", ["$scope", function($scope) {
//
//}])
//
//mainControllers.controller("storeCtrl", ["$scope", function($scope) {
//	$scope.tableData = {
//		title: "门店列表",
//		theader: ["门店列表", "门店名称", "电话", "地址", "	操作"],
//		tbody: [{
//			id: "001",
//			name: "吉青家政百好店",
//			tel: "560001",
//			address: "地址"
//		}, {
//			id: "002",
//			name: "吉青家政百好店",
//			tel: "560001",
//			address: "地址",
//			edit: "操作"
//		}]
//	};
//	$scope.editData = {
//		label: [{
//			labelFor: "number",
//			labelName: "门店编号"
//		}, {
//			labelFor: "name",
//			labelName: "门店名称"
//		}, {
//			labelFor: "address",
//			labelName: "地址"
//		}, {
//			labelFor: "tel",
//			labelName: "电话"
//		}, {
//			labelFor: "person",
//			labelName: "负责人"
//		}, {
//			labelFor: "phone",
//			labelName: "负责人手机"
//		}]
//	};
//}]);
//
////网络课程列表
//mainControllers.controller("courses_list", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
//	$http({
//			method: "GET",
//			url: $rootScope.path + "admin/courses"
//		})
//		.success(function(data) {
//			console.log(data);
//			$scope.coursesData = data.courses;
//		})
//}]);
////新增网络课程
//mainControllers.controller("courses_add", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
//	//	id int ID
//	//	name string 课程名称
//	//	price int 学费
//	//	capcity int 班级容量
//	//	start int 开始时间
//	//	positon string 报考职位
//	//	level string 报考等级
//	//	rule string 章程
//	//	list string 课程表
//	//	deadline int 报名截止日期
//	$scope.coursesAdd = function() {
//		$scope.coursesData = {
//			"id": 1,
//			"name": "sadf",
//			"price": 1,
//			"capcity": 200,
//			"start": 2015,
//			"positon": "月嫂",
//			"level": 1,
//			"rule": "fdsafsadf",
//			"list": "课程表",
//			"deadline": 2016,
//			"tuition": 1000
//		};
//		//		console.log($scope.coursesForm.name+","+$scope.coursesForm.rule);
//		$http({
//				method: "POST",
//				url: $rootScope.path + "admin/courses",
//				data: $scope.coursesData
//			})
//			.success(function(data) {
//				console.log(data);
//				console.log('成功');
//			})
//			.error(function(data) {
//				console.log(data);
//				console.log(status);
//				console.log(headers);
//				console.log(config);
//			})
//	};
//
//}]);
////修改网络课程
//mainControllers.controller("courses_edit", ["$scope", "$http", "$rootScope", "$stateParams", function($scope, $http, $rootScope, $stateParams) {
//	console.log($stateParams)
//	$http({
//			method: "GET",
//			url: $rootScope.path + "admin/courses",
//		})
//		.success(function(data) {
//			console.log(data)
//		})
//}]);
//
//mainControllers.controller("wlkcCtrl", ["$scope", "FileUploader", function($scope, FileUploader) {
//	var uploader = $scope.uploader = new FileUploader({
//		url: 'upload.php'
//	});
//	// FILTERS
//	uploader.filters.push({
//		name: 'customFilter',
//		fn: function(item /*{File|FileLikeObject}*/ , options) {
//			return this.queue.length < 10;
//		}
//	});
//
//	uploader.onAfterAddingAll = function(addedFileItems) {
//		var len = addedFileItems[0].uploader.queue.length
//		console.log(addedFileItems)
//	};
//}])
var mainControllers = angular.module('mainControllers', []);
mainControllers.controller("loginCtrl", ["$scope", "$state", "$window", "loginService", function($scope, $state, $window, loginService) {
	$scope.loginTitle = "佰工家政后台登录";
	$scope.loginData = {
		"username": "",
		"password": ""
	};
	$scope.tipData = {
		state: false,
		data: "用户名或者密码错误！",
		tipShowTime: 2000
	};
}])

mainControllers.controller("listCtrl", ["$scope", "$state", function($scope, $state) {

}])

mainControllers.controller("navCtrl", ["$scope", function($scope) {
	$scope.navItem = [{
		"name": "门店管理",
		"link": "list.store"
	}, {
		"name": "账号管理",
		"link": "list.account"
	}, {
		"name": "开班管理",
		"link": "list.course"
	}, {
		"name": "学员管理",
		"link": "list.student"
	}, {
		"name": "网络课程管理",
		"link": "list.classHour"
	}];
}])

mainControllers.controller("storeCtrl", ["$scope", "globaleService", function($scope, globaleService) {
	$scope.tableData = {
		title: "门店列表",
		theader: ["门店列表", "门店名称", "电话", "地址", "	操作"],
		tbody: []
	};
	$scope.data={
		size:10,
		page:0
	};
	$scope.settings={method:"get",url:"/admin/stores",data:$scope.data};
	$scope.refresh=function(){
		globaleService.ajaxData($scope.settings).then(function(res) {
			$scope.count=res.count;
			$scope.tableData.tbody = res.stores;
		}, function(error) {
			console.log(error)
		})
	};
	$scope.refresh();
}]);

mainControllers.controller("storeEditCtrl", ["$scope", "$stateParams", "globaleService", function($scope, $stateParams, globaleService) {
	$scope.editData = {
		label: [{
			"labelFor": "no",
			"labelName": "门店编号",
			"inputModel": ""
		}, {
			"labelFor": "name",
			"labelName": "门店名称",
			"inputModel": ""
		}, {
			"labelFor": "address",
			"labelName": "地址",
			"inputModel": ""
		}, {
			"labelFor": "tel",
			"labelName": "电话",
			"inputModel": ""
		}, {
			"labelFor": "manager",
			"labelName": "负责人",
			"inputModel": ""
		}, {
			"labelFor": "managerTel",
			"labelName": "负责人手机",
			"inputModel": ""
		}]
	};
	$scope.urls = {
		getSettings:{method:"get",url:"/admin/stores/" + $stateParams.id,data:""},
		postUrl: "/admin/stores",
		putUrl: "/admin/stores/" + $stateParams.id
	};
	$scope.settings={method:"get",url:$scope.urls.getUrl,data:""}
	if ($stateParams.id != 0) {
		globaleService.ajaxData($scope.urls.getSettings).then(function(res) {
			$.each($scope.editData.label, function(index, i) {
				$.each(res.stores[0], function(attr, el) {
					if (i.labelFor == attr) {
						i.inputModel = el;
					}
				});
			});
		}, function(error) {
			console.log(error)
		})
	}

}]);

mainControllers.controller("accountCtrl", ["$scope", "globaleService",function($scope, globaleService) {
	$scope.tableData = {
		title: "账号列表",
		theader: ["登录账号（手机号）", "姓名", "所属门店", "职位", "状态", "操作"],
		tbody: []
	};
	$scope.data={
		size:10,
		page:0
	};
	$scope.settings={method:"get",url:"/admin/users",data:$scope.data};
	$scope.refresh=function(){
		globaleService.ajaxData($scope.settings).then(function(res){
			$scope.count=res.count;
			$scope.tableData.tbody = res.users;
		},function(error){
			console.log(error)
		})
	};
	$scope.refresh();
}])

mainControllers.controller("accounEditCtrl", ["$scope", "$stateParams", "globaleService","tipService", function($scope, $stateParams, globaleService,tipService) {
	$scope.editData = {
		label: [{
			"labelFor": "username",
			"labelName": "登录账号",
			"type": "text",
			"inputModel": ""
		}, {
			"labelFor": "name",
			"labelName": "姓名",
			"type": "text",
			"inputModel": ""
		}, {
			"labelFor": "storeid",
			"labelName": "所属门店",
			"type": "select",
			"inputModel": "",
			"dataType":"int"

		}, {
			"labelFor": "position",
			"labelName": "职位",
			"type": "text",
			"inputModel": ""
		}, {
			"labelFor": "password",
			"labelName": "密码",
			"type": "password",
			"inputModel": ""
		}, {
			"labelFor": "confirm",
			"labelName": "确认密码",
			"type": "password",
			"inputModel": ""
		}],
		selectOptions: []
	};
	$scope.urls = {
		getSettings: {method:"get",url:"/admin/users/" + $stateParams.id,data:""},
		postUrl: "/admin/users",
		putUrl: "/admin/users/" + $stateParams.id,
		getSelectSettings: {method:"get",url:"/admin/stores",data:""}
	};
	globaleService.ajaxData($scope.urls.getSelectSettings).then(function(res) {
		$.each(res.stores, function(index, el) {
			$scope.editData.selectOptions[index] = {
				"value": el.id,
				"name": el.name
			};
		});
	}, function(error) {
		tipService.setMessage("数据读取出错",'danger');
	})
	if ($stateParams.id != 0) {
		globaleService.ajaxData($scope.urls.getSettings).then(function(res) {
			$.each($scope.editData.label, function(index, i) {
				$.each(res.users[0], function(attr, el) {
					if (i.labelFor == attr) {
						i.inputModel = el;
					}
				});
			});
		}, function(error) {
			tipService.setMessage("数据读取出错",'danger');
		})
	}
}]);

mainControllers.controller("courseCtrl", ["$scope", "globaleService", function($scope, globaleService) {
	$scope.tableData = {
		title: "开班列表",
		theader: ["课程名字", "学费", "课时", "班级容量", "开课时间", "报考职位", "报考等级", "招生简章", "课程表", "考试时间", "报名截止日期","操作"],
		tbody: []
	};
	$scope.data={
		size:10,
		page:0
	};
	$scope.settings={method:"get",url:"/admin/courses",data:$scope.data};
	$scope.refresh=function(){
		globaleService.ajaxData($scope.settings).then(function(res) {
			$scope.count=res.count;
			$scope.tableData.tbody = res.courses;
		}, function(error) {
			console.log(error)
		})
	};
	$scope.refresh();

}])

mainControllers.controller("courseEditCtrl", ["$scope", "$stateParams","$filter","globaleService", function($scope,$stateParams,$filter, globaleService) {
	$scope.editData = {
		label: [{
			"labelFor": "name",
			"labelName": "课程名字",
			"inputModel": "",
			"type":"text",
			"dataType":"string",
			"filter":"textfilter" 
		}, {
			"labelFor": "price",
			"labelName": "学费",
			"inputModel": "",
			"type":"text",
			"dataType":"int",
			"filter":"textfilter"
		}, {
			"labelFor": "classhourday",
			"labelName": "课时",
			"inputModel": "",
			"type":"text",
			"dataType":"int",
			"filter":"textfilter"
		}, {
			"labelFor": "capcity",
			"labelName": "班级容量",
			"inputModel": "",
			"type":"text",
			"dataType":"int",
			"filter":"textfilter"
		}, {
			"labelFor": "start",
			"labelName": "开课时间",
			"inputModel": "",
			"type":"text",
			"dataType":"int",
			"filter":"datefilter"
		},{
			"labelFor": "position",
			"labelName": "报考职位",
			"inputModel": "",
			"type":"text",
			"dataType":"string",
			"filter":"textfilter"
		},{
			"labelFor": "level",
			"labelName": "报考等级",
			"inputModel": "",
			"type":"text",
			"dataType":"int",
			"filter":"textfilter"
		},{
			"labelFor": "rule",
			"labelName": "招生简章",
			"inputModel": "",
			"type":"file",
			"dataType":"string",
			"filter":"filefilter"
		},{
			"labelFor": "list",
			"labelName": "课程表",
			"inputModel": "",
			"type":"file",
			"dataType":"string",
			"filter":"filefilter"
		},{
			"labelFor": "testTime",
			"labelName": "考试时间",
			"inputModel": "",
			"type":"int",
			"dataType":"int",
			"filter":"datefilter"
		},{
			"labelFor": "deadline",
			"labelName": "报名截止日期",
			"inputModel": "",
			"type":"text",
			"dataType":"int",
			"filter":"datefilter"
		}]
	};
	$scope.urls = {
		getSetting:{method:"get",url:"/admin/courses/"+$stateParams.id},
		postUrl: "/admin/courses",
		putUrl: "/admin/courses/" + $stateParams.id,
	};
	if ($stateParams.id != 0) {
		globaleService.ajaxData($scope.urls.getSetting).then(function(res) {
			$.each($scope.editData.label, function(index, i) {
				$.each(res.courses[0], function(attr, el) {
					if (i.labelFor == attr) {
						if(i.filter=="datefilter"){
							i.inputModel=$filter('date')(el*1000,'yyyy-MM-dd');
						}else{
							i.inputModel = el;
						}
					}
				});
			});
		}, function(error) {
			console.log(error)
		})
	}

}])

mainControllers.controller("studentCtrl", ["$scope", "globaleService", function($scope, globaleService) {
	$scope.tableData = {
		title: "学员列表",
		theader: ["学员编号", "姓名", "联系电话", "来源门店", "报名课程", "入学时间", "考试时间", "状态", "操作"],
		tbody: []
	};
	$scope.data={
		size:10,
		page:0
	}
	$scope.settings={method:"get",url:"/admin/studentmanage",data:$scope.data};
	$scope.refresh=function(){
		globaleService.ajaxData($scope.settings).then(function(res) {
			$scope.count=res.count
			$scope.tableData.tbody = res.student;
		})
	};
	$scope.refresh();
}])

mainControllers.controller("studentEditCtrl", ["$scope","$stateParams", "globaleService", function($scope,$stateParams, globaleService) {
	$scope.editData = {
		label: [{
			"labelFor": "name",
			"labelName": "学员姓名",
			"type": "text",
			"inputModel": ""
		}, {
			"labelFor": "tel",
			"labelName": "联系电话",
			"type": "text",
			"inputModel": ""
		}, {
			"labelFor": "no",
			"labelName": "来源门店",
			"type": "text",
			"inputModel": "",
			"dataType":"int"

		}, {
			"labelFor": "coursesname",
			"labelName": "报名课程",
			"type": "text",
			"inputModel": ""
		}, {
			"labelFor": "start",
			"labelName": "入学时间",
			"type": "text",
			"inputModel": ""
		}, {
			"labelFor": "testTime",
			"labelName": "考试时间",
			"type": "text",
			"inputModel": ""
		},{
			"labelFor": "state",
			"labelName": "状态",
			"type": "text",
			"inputModel": ""
		}],
		selectOptions: []
	};
	$scope.settings = {method:"get",url:"/admin/student/"+$stateParams.id,data:""};
	if ($stateParams.id != 0) {
		globaleService.ajaxData($scope.settings).then(function(res) {
			$.each($scope.editData.label, function(index, i) {
				$.each(res.student[0], function(attr, el) {
					if (i.labelFor == attr) {
						i.inputModel = el;
					}
				});
			});
		}, function(error) {
			tipService.setMessage("数据读取出错",'danger');
		})
	}
}])

mainControllers.controller("classHourCtrl", ["$scope", "globaleService", "tipService",function($scope, globaleService,tipService) {
	$scope.tableData = {
		title: "网络课程列表",
		theader: ["课程编号","课程名字", "课时数", "教学视频", "课件资料", "操作"],
		tbody: []
	};
	$scope.data={
		size:10,
		page:0
	}
	$scope.settings={method:"get",url:"/admin/classhour",data:$scope.data}
	$scope.refresh=function(){
		globaleService.ajaxData($scope.settings).then(function(res) {
			$scope.count=res.count;
			$scope.tableData.tbody = res.classhour;
		});
	};
	$scope.refresh();
			

	$scope.sortDown=function(sort){
		globaleService.ajaxData({method:"put",url:"/admin/classhour/"+sort+"/sortdown",data:""}).then(function(res){
			tipService.setMessage("下移成功",'success');
		},function(error){
			tipService.setMessage("下移失败",'danger');
		})
	};
	$scope.sordUp=function(sort){
		globaleService.ajaxData({method:"put",url:"/admin/classhour/"+sort+"/sortup",data:""}).then(function(res){
			tipService.setMessage("上移成功",'success');
		},function(error){
			tipService.setMessage("上移失败",'danger');
		})
	}

	$scope.delete=function(id){
		globaleService.ajaxData({method:"delete",url:"/admin/classhour/"+id+"/delete",data:""}).then(function(res){
			console.log(res)
		},function(error){
			console.log(error)
		})
	}


}]);


mainControllers.controller("classHourEditCtrl", ["$scope", "$stateParams", "globaleService", function($scope, $stateParams, globaleService) {
	$scope.editData = {
		label: [{
			"labelFor": "courseID",
			"labelName": "课程编号",
			"inputModel": "",
			"type":"text",
			"dataType":"int"
		}, {
			"labelFor": "name",
			"labelName": "课程名字",
			"inputModel": "",
			"type":"text",
			"dataType":"string"
		}, {
			"labelFor": "number",
			"labelName": "课时数",
			"inputModel": "",
			"type":"text",
			"dataType":"int"
		}, {
			"labelFor": "video",
			"labelName": "教学视频",
			"inputModel": "",
			"type":"file",
			"dataType":"string"
		}, {
			"labelFor": "data",
			"labelName": "课件资料",
			"inputModel": "",
			"type":"file",
			"dataType":"string"
		}]
	};
	$scope.urls = {
		getSetting:{method:"get",url:"/admin/classhour/"+$stateParams.id},
		postUrl: "/admin/classhour",
		putUrl: "/admin/classhour/" + $stateParams.id,
	};
	if ($stateParams.id != 0) {
		globaleService.ajaxData($scope.urls.getSetting).then(function(res) {
			$.each($scope.editData.label, function(index, i) {
				$.each(res.classhour[0], function(attr, el) {
					if (i.labelFor == attr) {
						i.inputModel = el;
					}
				});
			});
		}, function(error) {
			console.log(error)
		})
	}

}]);