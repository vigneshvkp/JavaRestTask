app.register.controller('ScreensController',['$rootScope', '$scope', '$log', '$state', 'urlConstants', 'breadcrumbService', '$timeout', 'CommonDataService', 'UtilitiesService', 'ProductsService', 'x2js', 'ErrorService', function ($rootScope, $scope, $log, $state, urlConstants, breadcrumbService, $timeout, CommonDataService, UtilitiesService, ProductsService, x2js, ErrorService) {
    
    var screensVM = this;
    breadcrumbService.breadcrumb(["Products", "Manage Products", "Screen Definition"]);
    
    screensVM.screenName = "";
    screensVM.isNameEditable = {};
    screensVM.shouldFocus = {};
    screensVM.shouldFocus.screenTitle = {};
    screensVM.screenTitle = {};
    screensVM.isValueChanged = false;
    screensVM.disableSaveButton = true;
    var productDiffRequest = {};
    screensVM.screensResponse = [];
    var xmlFileName = [];
	ErrorService.removeAllNotifications();
    
    screensVM.selectedVariantFile = $rootScope.selectedVariant;
    screensVM.productCode = $rootScope.prodCode;
    
    screensVM.retrieveRefactoredXml = function() {
    	if(screensVM.productCode && screensVM.selectedVariantFile) {
    		$scope.dgAppVm.showPageLoader = true;
    		CommonDataService.callServer('products/' + screensVM.productCode + "/variant/" + screensVM.selectedVariantFile, success);
    	}
    }

    function success(response) {
    	screensVM.disableSaveButton = false;
    	if(response && response.type == "Exception") {
    		screensVM.disableSaveButton = true;
    		$scope.dgAppVm.showPageLoader = false;
    		ErrorService.displayErrorMessage("refactoredXmlFail", response.messageToDisplay, "manageProducts");
    	}
    	else {
    		ProductsService.setScreensResponse(angular.copy(response));
    		xmlFileName = screensVM.selectedVariantFile.split("_");
    		var diffXmlFileName = xmlFileName[0] + "Difference_" + xmlFileName[1];
    		if(xmlFileName[2]) {
    			diffXmlFileName = diffXmlFileName + "_" + xmlFileName[2];
    		}
    		CommonDataService.callServer('products/refactoredDiffXml/retrieve/'+ diffXmlFileName, diffSuccess);
    	}
	}
    
    function diffSuccess(response) {
    	$scope.dgAppVm.showPageLoader = false;
    	if(response) {
        	var mergedXml = UtilitiesService.mergeXMLDifferences({"Screens" : angular.copy(ProductsService.screensResponse)},
        			x2js.xml_str2json(response));
        	var mergedObject = x2js.xml2json(mergedXml);
        	if(mergedObject.Screens && mergedObject.Screens.Screen) {
        		screensVM.screensResponse = mergedObject.Screens.Screen;
        	}
    	}
    }
    
    screensVM.exit = function() {
    	ErrorService.removeAllNotifications();
		$state.go('home');
	}
    
    screensVM.editScreenName = function(selectedRecord) {
    	screensVM.isNameEditable[selectedRecord.id] = true;
    	screensVM.screenTitle[selectedRecord.id] = selectedRecord.Heading.headerText;
    	screensVM.shouldFocus.screenTitle[selectedRecord.id] = true;
    }
    
    screensVM.updateScreenName = function(selectedRecordId, modelValue) {
    	screensVM.isValueChanged = true;
    	angular.forEach(screensVM.screensResponse, function(screen, index) {
    		if(screen.id == selectedRecordId) {
    			screensVM.screensResponse[index].Heading.headerText = modelValue;
    		}
    	});
    	screensVM.isNameEditable[selectedRecordId] = false;

    }
    
    screensVM.saveChanges = function() {
    	if(screensVM.isValueChanged) {
    		$scope.dgAppVm.showPageLoader = true;
    		productDiffRequest = UtilitiesService.determineJSONDifferences({"Screens" : angular.copy(ProductsService.screensResponse)},
					{"Screens" : {"Screen" : angular.copy(screensVM.screensResponse)}});
			xmlFileName = screensVM.selectedVariantFile.split("_");
			var diffXmlFileName = xmlFileName[0] + "Difference_" + xmlFileName[1];
			if(xmlFileName[2]) {
				diffXmlFileName = diffXmlFileName + "_" + xmlFileName[2];
			}
			var productDiffXml = { 'differenceXmlString' : x2js.json2xml_str(productDiffRequest), 
					'fileName' : diffXmlFileName};
			CommonDataService.callServerToPost('products/refactoredDiffXml/create', productDiffXml, diffXmlCreateSuccess);
    	}
    }
    
    $scope.passScreenId = function(selectedScreen) {
    	ProductsService.setUpdatedScreenObj({"Screen" : angular.copy(screensVM.screensResponse)});
		$rootScope.screenId = selectedScreen.id ? selectedScreen.id : "";
	}
    
    function diffXmlCreateSuccess(response) {
    	screensVM.isValueChanged = false;
    	if(response == true) {
    		var mergeXml = UtilitiesService.mergeXMLDifferences({"Screens" : angular.copy(ProductsService.screensResponse)}, 
					{"Screens" : {"Screen" :productDiffRequest}});
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
    }
    
    function modifiedXmlCreateSuccess(response) {
    	$scope.dgAppVm.showPageLoader = false;
    	if(response == true) {
    		ErrorService.displaySuccessMessage('refactoredXmlCreate','refactored_xml_save_message',"manageProducts");
        	$state.go('variant'); 
    	}
    	else {
    		ErrorService.displayErrorMessage("refactoredXmlModifiedFail", response.messageToDisplay, "manageProducts");
    	}
    }
}]);
