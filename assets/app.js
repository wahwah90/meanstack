angular.module('app',['ngRoute']);
angular.module('app')
.controller('ApplicationCtrl',["$scope", function ($scope){
	$scope.$on('login', function(_, user){
		$scope.currentUser = user
	})
}])
angular.module('app')
.controller('LoginCtrl', ["$scope", "UserSvc", function ($scope, UserSvc) {
  $scope.login = function (username, password) {
    UserSvc.login(username, password)
    .then(function (response) {
      $scope.$emit('login', response.data)
    })
  }
}])

angular.module('app')
.controller('PostsCtrl',["$scope", "$http", "PostsSvc", function ($scope, $http, PostsSvc) {
	$scope.addPost = function () {
		if ($scope.postBody) {
			PostsSvc.create({
				username: 'kfc',
				body: $scope.postBody
			}).success(function(post){
				$scope.posts.unshift(post);
				$scope.postBody = null;
			})
		}
	}
	PostsSvc.fetch().success(function (posts) {
		$scope.posts = posts;
	});
			
}]);
angular.module('app')
.service('PostsSvc',["$http", function ($http) {
	this.fetch = function () {
		return $http.get('/api/posts');
	}
	this.create = function (post) {
		return $http.post('/api/posts',post);
	}
}]);
angular.module('app')
.controller('RegisterCtrl',["$scope", "UserSvc", function ($scope, UserSvc){
	$scope.register = function(username,password){
		UserSvc.register(username,password)
		.then(function(response){
			$scope.$emit('login', response.data)
		})
	}
}])
angular.module('app')
.config(["$routeProvider", function ($routeProvider){
	$routeProvider
	.when('/',{controller:'PostsCtrl',templateUrl:'posts.html'})
	.when('/login',	   {controller:  'LoginCtrl', templateUrl:'login.html'})
	.when('/register',{controller:'RegisterCtrl',templateUrl:'register.html'})
	
}])
angular.module('app')
.service('UserSvc',["$http", function($http){
	var svc = this
	svc.getUser = function(){
		console.log(this.token)
		return $http.get('/api/users')
	}
	svc.login = function (username,password)
	{
		return $http.post('/api/sessions',{
			username:username, password:password
		}).then(function(val){		
			svc.token = val.data
			$http.defaults.headers.common['X-Auth'] = val.data
			return svc.getUser()
		})
	}
	svc.register = function(username,password){
		return $http.post('/api/users',{
			username:username, password:password
		}).then(function(){
			return svc.login(username,password)
		})
	}
}])