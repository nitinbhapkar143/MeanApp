angular.module('appService',[])
	.factory('User', function ($http) {
		var factoryObj = {};

		factoryObj.create = function(regData){
			return $http.post('/api/user', regData)
		};

		return factoryObj;
	})