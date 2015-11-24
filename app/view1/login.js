angular.module('myApp.login',['firebase'])
.controller('LoginCtrl',function($scope,$firebaseArray){

	var ref = new Firebase("https://smallblog.firebaseio.com/login");
	 $scope.users = $firebaseArray(ref);
	 console.log($scope.users);

$scope.submitForm =function(){
ref.createUser({
  email    : $scope.email,
  password : $scope.password
}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
  }
});	
}


 
})
