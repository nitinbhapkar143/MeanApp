angular.module('appLoginCntrl',['authService'])
	.controller('mainCntrl',function (Auth, $location, $timeout) {
		var vm = this;

		if(Auth.isLoggedIn()){
			Auth.getUser().then(function(data){
				vm.username = data.data.username;
				vm.email = data.data.email;
			});
		}
		else{
			console.log('Ooops! User seems to be logged out...');
		}


		vm.authenticateUser = function (loginData){
			vm.loading = true;
			vm.errorMsg = false;
			vm.successMsg = false;
			Auth.authenticate(loginData).then(function(data){
				if(data.data.success){
					vm.successMsg = data.data.message;
					vm.loading = false;
					$timeout(function(){
						$location.path('/about');
					}, 2000);
					
				}else{
					vm.loading = false;
					vm.errorMsg = data.data.message;
				}
			},function(){
				console.log('Erorr');
			})
		}
		
		vm.logout = function(){
			Auth.logOut();
			$location.path('/loggedout');
			$timeout(function(){
				$location.path('/');
			}, 2000)
		} 
	});