angular.module('appCntrl',[])
	.controller('signupCntrl',function ($http, User, $location, $timeout) {
		var vm = this;
		vm.createUser = function (regData){
			vm.loading = true;
			vm.errorMsg = false;
			vm.successMsg = false;
			User.create(regData).then(function(data){
				if(data.data.success){
					vm.successMsg = data.data.message;
					regData.email = regData.username = regData.password = '';
					vm.loading = false;
					$timeout(function(){
						$location.path('/contact');
					}, 2000);
					
				}else{
					vm.loading = false;
					vm.errorMsg = data.data.message;
				}
				console.log(data.data.message);
			},function(){
				console.log('Erorr');
			})
		}
	});