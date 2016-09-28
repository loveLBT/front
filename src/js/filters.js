var mainFilters=angular.module('mainFilters',[]);
mainFilters.filter('state',function(){
	return function(state){
		if(state==1){
			return "启用状态"
		}else if(state==2){
			return "禁用状态"
		}
	}
});


mainFilters.filter('examineState',function(){
	return function(state){
		switch(state) {
			case "1":
				return "待审核";
				break;
			case "2":
				return "审核通过";
				break;
			case "3":
			    return "审核不通过";
			    break;
		}
	}
});

