angular.module('appRoute', ['ngRoute'])
	.config(function ($routeProvider, $locationProvider){
		$routeProvider
		.when('/',{
			templateUrl : '../views/pages/home.html'
		})
		.when('/about', {
			templateUrl : '../views/pages/about.html'
		})
		.when('/register', {
			templateUrl : '../views/pages/user/register.html',
			controller : 'signupCntrl',
			controllerAs : 'register'
		})
		.when('/login', {
			templateUrl : '../views/pages/user/login.html'
		})
		.when('/contact', {
			templateUrl : '../views/pages/contact.html'
		})
		.when('/loggedout',{
			templateUrl : '../views/pages/user/logout.html'
		})

		$locationProvider.html5Mode({
			enabled : true,
			requireBase : false
		});

	});