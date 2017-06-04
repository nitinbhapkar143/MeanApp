angular.module('appRoute', ['ngRoute'])
	.config(function ($routeProvider, $locationProvider){
		$routeProvider
		.when('/about', {
			templateUrl : '../views/pages/about.html'
		})
		.when('/register', {
			templateUrl : '../views/pages/user/register.html',
			controller : 'signupCntrl',
			controllerAs : 'register'
		})
		.when('/contact', {
			templateUrl : '../views/pages/contact.html'
		});

		$locationProvider.html5Mode({
			enabled : true,
			requireBase : false
		});

	});