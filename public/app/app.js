angular.module('userApp',['appRoute', 'appCntrl','appService','appLoginCntrl','authService'])
	.config(function ($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	});
