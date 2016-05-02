angular.module('app')
.controller('PostsCtrl',function ($scope, $http, PostsSvc) {
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
			
});