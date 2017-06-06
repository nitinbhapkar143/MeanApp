angular.module('authService',[])
	.factory('Auth', function ($http, authToken){
		var authFactory = {};

		authFactory.authenticate = function(loginData){
			return $http.post('/api/authenticate', loginData).then(function(data) {
				authToken.setToken(data.data.token);
				return data;
			});
		}

		authFactory.getUser = function(){
			if(authToken.getToken()){
				return $http.post('/api/me');
			}
			else{
				$q.reject({ message : 'User has no token'});
			}
			
		}

		authFactory.isLoggedIn = function(){
			if(authToken.getToken()){
				return true;
			}
			else{
				return false;
			}
		}

		authFactory.logOut = function(){
			authToken.setToken();
		}

		return authFactory;
	})

	.factory('authToken',function($window){
		var authTokenFactory = {};

		authTokenFactory.setToken = function(token){
			if(token){
				$window.localStorage.setItem('token',token);
			}
			else{
				$window.localStorage.removeItem('token');
			}
		};

		authTokenFactory.getToken = function(){
			return $window.localStorage.getItem('token');
		}
		return authTokenFactory;
	})

	.factory('authInterceptor', function(authToken){
		var authInterceptorFactory = {};
		authInterceptorFactory.request = function(config){
			var token = authToken.getToken();
			if(token){
				config.headers['x-access-token'] = token;
			}
			return config;
		}
		return authInterceptorFactory;
	})