app.controller('LoginController',['$scope', '$rootScope', '$window', '$state', 'CommonDataService','NetworkService', 'urlConstants', 'ErrorService',
                         function ($scope, $rootScope, $window, $state, CommonDataService, NetworkService, urlConstants, ErrorService) {

	/**To declare the scope Variable as loginVm for the controller LoginCtrl**/
	var loginVm = this;
	loginVm.notifications = {};
	var formValues = {};
	formValues.required = {};
	formValues.required.username = {};
	formValues.required.password = {};
	formValues.required.username.displayName = "Username";
	formValues.required.password.displayName = "Password";
	
	loginVm.credentials = {};
	
	loginVm.login = function(loginForm) {
		loginVm.notifications = ErrorService.checkRequiredValueError(loginForm,loginVm.notifications,formValues);
		if(Object.keys(loginVm.notifications).length == 0){
			if(loginVm.credentials && loginVm.credentials.username && loginVm.credentials.password) {
				CommonDataService.callServerToPost('authenticate/login', loginVm.credentials, success);
			}
		}
	}
	
	loginVm.contentChanged = function(key) {
		if(loginVm.credentials && (loginVm.credentials.username ||loginVm.credentials.password)) {
			ErrorService.removeResolvedError(loginVm.notifications, key);
		}
	}
	
	function success(response) {
		if(response == false) {
			notification = ErrorService.generateCustomError("002","Logon Failed. Username or Password Incorrect", 'login');
			ErrorService.displayNotification(notification);
		}
		else {
			ErrorService.removeAllNotifications();
			localStorage.setItem('username', response.firstname+ " " +response.lastname);
			$rootScope.$broadcast('username', response);
			$state.go('home');
		}
	}
	
}]);