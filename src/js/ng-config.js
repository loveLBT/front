BGJZ_App.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("index");
	$stateProvider
		.state("index", {
			url: "/index",
			templateUrl: "index.html"
		})
		.state("openlist", {
			url: "/openlist/",
			templateUrl: "open_list.html",
			controller: "openList"
		})
		.state("apply", {
			url: "/apply",
			templateUrl: "apply.html",
			controller: "apply"
		})
		.state("info", {
			url: "/info",
			templateUrl: "info.html",
			controller: "infoList"
		})
		.state("edit", {
			url: "/edit",
			templateUrl: "edit_apply.html"
		})
		.state("studentsList", {
			url: "/studentsList",
			templateUrl: "students_list.html",
			controller: "studentsList"
		})
		.state("online_courses", {
			url: "/online_courses",
			templateUrl: "online_courses.html",
			controller: "onlineCourses"
		})
		.state("learning", {
			url: "/learning/:id",
			templateUrl: "learning.html",
			controller: "learning"
		});
}]);

/***********************后台路由****************************/
//var mainConfigs = angular.module('mainConfigs', []);
//mainConfigs.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
//	$stateProvider
//		.state("login", {
//			url: "/login",
//			templateUrl: "login/login.html",
//			controller: "loginCtrl"
//		})
//		.state("list", {
//			url: "/list",
//			views: {
//				'': {
//					templateUrl: "list/list.html",
//				},
//				'nav@list': {
//					templateUrl: "list/nav.html",
//					controller: "navCtrl"
//				},
//				'content@list': {
//					templateUrl: "list/store.html",
//					controller: "storeCtrl"
//				}
//			}
//		})
//		.state("list.store", {
//			url: "/store/:id",
//			views: {
//				'content@list': {
//					templateUrl: "list/store-edit.html",
//					controller: "storeCtrl"
//				}
//			}
//		})
//		.state("list.student", {
//			url: "/student",
//			views: {
//				"content@list": {
//					templateUrl: "list/student/list.html",
//				}
//			}
//		})
//		.state("list.courses", {
//			url: "/courses",
//			views: {
//				"content@list": {
//					templateUrl: "list/courses/list.html",
//					controller: "courses_list"
//				}
//			}
//		})
//		.state("list.courses_add", {
//			url: "/courses_add",
//			views: {
//				"content@list": {
//					templateUrl: "list/courses/courses_add.html",
//					controller: "courses_add"
//				}
//			}
//		})
//		.state("list.courses_edit", {
//			url: "/courses_edit/:courses_id",
//			views: {
//				"content@list": {
//					templateUrl: "list/courses/courses_edit.html",
//					controller: "courses_edit"
//				}
//			}
//		})
//		.state("list.lesson_list", {
//			url: "/lesson_list",
//			views: {
//				"content@list": {
//					templateUrl: "list/courses/lesson_list.html"
//				}
//			}
//		})
//		.state("list.lesson_add", {
//			url: "/lesson_add",
//			views: {
//				"content@list": {
//					templateUrl: "list/courses/lesson_add.html",
//					controller: "wlkcCtrl"
//				}
//			}
//		})
//		.state("list.lesson_edit", {
//			url: "/lesson_edit",
//			views: {
//				"content@list": {
//					templateUrl: "list/courses/lesson_edit.html",
//				}
//			}
//		})
//}]);
var mainConfigs=angular.module('mainConfigs',[]);

mainConfigs.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("list/store");
  $stateProvider
    	.state("login",{
    		url:"/login",
    		templateUrl:"login/login.html",
    		controller:"loginCtrl"
    	})
    	.state("list",{
    		url:"/list",
    		views:{
    			'':{
    				templateUrl:"list/list.html",
    				controller:"listCtrl"
    			},
    			'nav@list':{
    				templateUrl:"list/nav.html",
    				controller:"navCtrl"
    			},
    			'content@list':{
    				templateUrl:"list/store/store.html",
    				controller:"storeCtrl"
    			},
    		},
            requireLogin:true
    	})
    	.state("list.store",{
    		url:"/store",
    		views:{
    			'content@list':{
    				templateUrl:"list/store/store.html",
    				controller:"storeCtrl",   
    			}
    		},
            requireLogin:true
    	})
    	.state("list.storeEdit",{
    		url:"/store/:id",
    		views:{
    			'content@list':{
    				templateUrl:"list/store/store_edit.html",
    				controller:"storeEditCtrl"
    			}
    		},
            requireLogin:true
    	})
    	.state("list.account",{
    		url:"/account",
    		views:{
    			'content@list':{
    				templateUrl:"list/account/account.html",
    				controller:"accountCtrl"
    			}
    		},
            requireLogin:true
    	})
    	.state("list.accountEdit",{
    		url:"/account/:id",
    		views:{
    			'content@list':{
    				templateUrl:"list/account/account_edit.html",
    				controller:"accounEditCtrl"
    			}
    		},
            requireLogin:true
    	})
    	.state("list.course",{
    		url:"/course",
    		views:{
    			'content@list':{
    				templateUrl:"list/course/course.html",
    				controller:"courseCtrl"
    			}
    		},
            requireLogin:true
    	})
        .state("list.courseEdit",{
            url:"/course/:id",
            views:{
                'content@list':{
                    templateUrl:"list/course/course_edit.html",
                    controller:"courseEditCtrl"
                }
            },
            requireLogin:true
        })
        .state("list.student",{
            url:"/student",
            views:{
                'content@list':{
                    templateUrl:"list/student/student.html",
                    controller:"studentCtrl"
                }
            },
            requireLogin:true
        })
        .state("list.studentEdit",{
            url:"/student/:id",
            views:{
                'content@list':{
                    templateUrl:"list/student/student_edit.html",
                    controller:"studentEditCtrl"
                }
            },
            requireLogin:true
        })
        .state("list.classHour",{
            url:"/classHour",
            views:{
                'content@list':{
                    templateUrl:"list/classHour/classHour.html",
                    controller:"classHourCtrl"
                }
            },
            requireLogin:true
        })
        .state("list.classHourEdit",{
            url:"/classHour/:id",
            views:{
                'content@list':{
                    templateUrl:"list/classHour/classHourEdit.html",
                    controller:"classHourEditCtrl"
                }
            },
            requireLogin:true
        })
  }
]);
