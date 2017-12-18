app.register.controller('seleniumFieldController',['$rootScope', '$scope', '$log', '$state', 'urlConstants', 'breadcrumbService', '$timeout', 'CommonDataService', 'UtilitiesService', 'ProductsService', 'x2js', 'ErrorService', function ($rootScope, $scope, $log, $state, urlConstants, breadcrumbService, $timeout, CommonDataService, UtilitiesService, ProductsService, x2js, ErrorService) {
	
	var seleniumFieldVM = this;
	breadcrumbService.breadcrumb(["Products", "Manage Products", "Selenium XML Edit Page", "Manage Selenium Field"]);
	seleniumFieldVM.isValueChanged = false;
	
	seleniumFieldVM.productCode = $rootScope.prodCode;
	seleniumFieldVM.screenIDCode = $rootScope.selectedScreenID;
	seleniumFieldVM.selectedPanel = $rootScope.selectedPanelID;
	seleniumFieldVM.selectedField = $rootScope.selectedSeleniumField;
	seleniumFieldVM.seleniumFileName = $rootScope.SeleniumFileName;
	
	var	screensResponse = $rootScope.selectedScreenID;
	console.log(screensResponse);
	
	console.log(seleniumFieldVM.productCode);
	console.log(seleniumFieldVM.screenIDCode);
	console.log(seleniumFieldVM.selectedPanel);
	console.log(seleniumFieldVM.selectedField);
	
	seleniumFieldVM.valueChanged = function() {
		seleniumFieldVM.isValueChanged = true;
	}
	
	seleniumFieldVM.exit = function() {
		$state.go('variant');
	}
	
	seleniumFieldVM.saveChanges = function() {
		seleniumFieldVM.updateField();
		if(seleniumFieldVM.isValueChanged) {
    		$scope.dgAppVm.showPageLoader = true;
    		console.log(seleniumFieldVM.selectedField, screensResponse);
    		productDiffRequest = UtilitiesService.determineJSONDifferences({"Screens" :{"Screen": $rootScope.selectedScreenID }},
					{"Screens":{"Screen": screensResponse}});
    		
    		xmlFileName = seleniumFieldVM.seleniumFileName.split("_");
			var diffXmlFileName = xmlFileName[0] + "Difference_" + xmlFileName[1];
			if(xmlFileName[2]) {
				diffXmlFileName = diffXmlFileName + "_" + xmlFileName[2];
			}
			console.log('productDiffRequest', productDiffRequest);
			var productDiffXml = { 'differenceXmlString' : x2js.json2xml_str(productDiffRequest), 
					'fileName' : diffXmlFileName};
			CommonDataService.callServerToPost('products/refactoredDiffXml/create', productDiffXml, diffXmlCreateSuccess);
    	}
	}
	
	seleniumFieldVM.updateField = function() {
		angular.forEach(seleniumFieldVM.selectedPanel.Field, function(field, index) {
			if(field.id == seleniumFieldVM.selectedField.id) {
				console.log("Check 1");
				seleniumFieldVM.selectedPanel.Field[index] = angular.copy(seleniumFieldVM.selectedField);
			}
		});
		seleniumFieldVM.updateScreenObj();
	}
	
	seleniumFieldVM.updateScreenObj = function() {
		angular.forEach(screensResponse.Screen, function(screen, index) {
			if(screen.id == seleniumFieldVM.screenIDCode) {
				angular.forEach(screen.Panel, function(panel, key) {
					if(panel.id == seleniumFieldVM.selectedPanel.id) {
						screensResponse.Screen[index].Panel[key] = angular.copy(seleniumFieldVM.selectedPanel);
					}
				});
			}
		});
		ProductsService.setUpdatedScreenObj(angular.copy(screensResponse));
	}
	
	function diffXmlCreateSuccess(response) {
		seleniumFieldVM.isValueChanged = false;
		if(response == true) {
			var mergeXml = UtilitiesService.mergeXMLDifferences({"Screens" : angular.copy(ProductsService.screensResponse)}, {"Screens" : {"Screen" :productDiffRequest}});
			var mergeObject = x2js.xml2json(mergeXml); 		
			var modifiedXmlFileName = xmlFileName[0] + "Modified_" + xmlFileName[1];
			if(xmlFileName[2]) {
				modifiedXmlFileName = modifiedXmlFileName + "_" + xmlFileName[2];
			}
			var productModifiedXml = { 'modifiedXmlString' : x2js.json2xml_str(angular.copy(mergeObject)), 'fileName' : modifiedXmlFileName};
			CommonDataService.callServerToPost('products/refactoredModifiedXml/create', productModifiedXml, modifiedXmlCreateSuccess);
		}
		else {
    		$scope.dgAppVm.showPageLoader = false;
    		ErrorService.displayErrorMessage("refactoredXmlDiffFail", response.messageToDisplay, "manageProducts");
    	}
	};
	
	function modifiedXmlCreateSuccess(response) {
    	$scope.dgAppVm.showPageLoader = false;
    	if(response == true) {
    		ErrorService.displaySuccessMessage('refactoredXmlCreate','refactored_xml_save_message',"manageProducts");
        	$state.go('seleniumEdit'); 
    	}
    	else {
    		ErrorService.displayErrorMessage("refactoredXmlModifiedFail", response.messageToDisplay, "manageProducts");
    	}
    }
}]);