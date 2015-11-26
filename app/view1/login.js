angular.module('myApp.login',['firebase'])
.factory('Auth',function(){


return function check(){
		var ref = new Firebase("https://smallblog.firebaseio.com/login");
        var authData = ref.getAuth();

	 if (authData) {
		return  console.log("User " + authData.uid + " is logged in with " + authData.provider);
	} else {
	   return console.log("User is logged out");
	}
}
})
.controller('LoginCtrl',function($scope,$firebaseArray,$location,Auth){
	console.log(Auth.check);

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
$scope.logOut=function(){
	var ref = new Firebase("https://smallblog.firebaseio.com/login");
	ref.unauth();
	$scope.msg= true;
	$scope.showmsg ="You are successfuly log out";
	$location.path('/home');
}
$scope.loginForm=function(){


	var ref = new Firebase("https://smallblog.firebaseio.com/login");

	var email = $scope.email;
	var password = $scope.password;
ref.authWithPassword({
  email    : email,
  password : password
}, function(error, authData) {
  if (error) {
    switch (error.code) {
      case "INVALID_EMAIL":
        $scope.showmsg = "Invalid Email"
        $scope.msg= true;
        break;
      case "INVALID_PASSWORD":
    $scope.showmsg = "Invalid password"
        $scope.msg= true;
        break;
      default:
         $scope.showmsg = "Invalid e-mail or password, try again"
        $scope.msg= true;
    }
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});
}
var ref = new Firebase("https://smallblog.firebaseio.com/login");
var authData = ref.getAuth();

if (authData) {
  console.log("User " + authData.uid + " is logged in with " + authData.provider);
} else {
  console.log("User is logged out");
}
 
})
