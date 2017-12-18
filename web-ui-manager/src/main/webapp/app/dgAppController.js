app.controller('DgAppController',['$log','$scope','$timeout','$location', '$modal', '$window','$rootScope','$state', 'CommonDataService', 'i18nConfiguration', 'WebUIAppConstants',
    function ($log, $scope, $timeout, $location, $modal, $window, $rootScope, $state, CommonDataService, i18nConfiguration, WebUIAppConstants) {
	


	/**To declare the scope Variable as dgAppVm for the controller ComposerAppCtrl**/
	var dgAppVm = this;
	dgAppVm.showBreadCrum = false;
	dgAppVm.currentState = $state.current.name;
	if(localStorage.getItem('username') != null) {
		dgAppVm.principalName = localStorage.getItem('username');
	}
	
	/*to show the page loader*/
	dgAppVm.showPageLoader = false;
	
	dgAppVm.buildNumber = "1.0.0.b01";
	/**To show username and logout in the header**/
	dgAppVm.isLoggedIn = false;
	dgAppVm.appMenu = [
		{
			name: 'Web UI XML Generator',
			urlLocation : 'nativeUIGenerator'
		}, 
		{
			name : 'Web UI Manager',
			urlLocation : 'products'
		}
	];
	
	$scope.$on('username', function(oldValue, newValue) {
		if(localStorage.getItem('username') != null) {
			dgAppVm.principalName = localStorage.getItem('username');
		}
	});
	
//    window.onbeforeunload = function() {
//    }
	
	/*to show the page loader*/
	dgAppVm.showPageLoader = false;
	
	$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		if(localStorage.getItem('username') == null) {
			$location.path('/login');
		}
		dgAppVm.isLoggedIn = (toState.name == 'login');
		if(toState.name != "login" && toState.name != "home") {
			dgAppVm.showBreadCrum = true;
		} else {
			dgAppVm.showBreadCrum = false;
		}
	});
	
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		dgAppVm.currentState = toState.name;
	});
	
	/*Calls the logout service call once the logout button is clicked*/
	dgAppVm.logout = function() {
		CommonDataService.callServer('authenticate/logout', success);
	};
	
	function success(response) {
		localStorage.clear();
		$state.go('login');
	}
	
	/* your resource bundle base location in the server */
	i18nConfiguration.resourcePath = WebUIAppConstants.RESOURCE_PATH;
	
	/*Resource bundle lookup based on file or folder*/
	i18nConfiguration.localeSpecification = '';
	
	/* The default laguage code for application, when resource (bundle or key) not available for specific language it will lookup from default language bundle*/       
	i18nConfiguration.defaultLanguageCode = WebUIAppConstants.EN_GB;
	 
	/* You have to specify the language selection is implicit or explicit */
	i18nConfiguration.languageSelection = WebUIAppConstants.EXPLICIT;
	 
	/* If language selection is implicit, you need to set it language code*/
	i18nConfiguration.languageCode = WebUIAppConstants.EN_GB;
	
	//function to open popup
	function confirmationPopup() {
		var modalInstance = $modal.open({
			templateUrl: 'app/shared/partials/browserWindowClose.htm',
			controller: 'confirmationWindowController',
			size:'sm',
			animation: true,
			backdrop :'static'
		});
	};
	
}]).controller('confirmationWindowController', function($rootScope, $scope, $modalInstance, $location) {

	//Method called when cancel button was clicked 
	$scope.cancelClose = function(){
		//refEvent.preventDefault();
		$modalInstance.dismiss('close');	
	}

	//Method called when ok button was clicked 
	$scope.navigate = function(){
		$modalInstance.dismiss('close');
		$location.path("/home");	
	}

});