app.register.controller('FieldsController',['$rootScope', '$scope', '$log', '$state', 'urlConstants', 'breadcrumbService', '$timeout', 'CommonDataService', 'UtilitiesService', 'ProductsService', 'x2js', 'ErrorService', function ($rootScope, $scope, $log, $state, urlConstants, breadcrumbService, $timeout, CommonDataService, UtilitiesService, ProductsService, x2js, ErrorService) {
	var fieldsVM = this;
	breadcrumbService.breadcrumb(["Products", "Manage Products", "Screen Definition", "Manage Screens", "Manage Fields"]);
	
	fieldsVM.selectedField = ProductsService.selectedField;
	
	fieldsVM.isValueChanged = false;		// make it true when any value is changed
	
	fieldsVM.valueChanged = function() {
		fieldsVM.isValueChanged = true;
	};
	
	fieldsVM.selectedVariantFile = $rootScope.selectedVariant;
	fieldsVM.productCode = $rootScope.prodCode;
	fieldsVM.screenIDCode = $rootScope.screenId;
	fieldsVM.selectedPanel = angular.copy(ProductsService.selectedPanelObj);
	var	screensResponse = angular.copy(ProductsService.updatedScreenObj);
	
	fieldsVM.updateScreenObj = function() {
		angular.forEach(screensResponse.Screen, function(screen, index) {
			if(screen.id == fieldsVM.screenIDCode) {
				angular.forEach(screen.Panel, function(panel, key) {
					if(panel.id == fieldsVM.selectedPanel.id) {
						screensResponse.Screen[index].Panel[key] = angular.copy(fieldsVM.selectedPanel);
					}
				});
			}
		});
		ProductsService.setUpdatedScreenObj(angular.copy(screensResponse));
	}
	
	fieldsVM.updateField = function() {
		angular.forEach(fieldsVM.selectedPanel.Field, function(field, index) {
			if(field.id == fieldsVM.selectedField.id) {
				fieldsVM.selectedPanel.Field[index] = angular.copy(fieldsVM.selectedField);
			}
		});
		fieldsVM.updateScreenObj();
	}

	fieldsVM.saveChanges = function() {
		fieldsVM.updateField();
		if(fieldsVM.isValueChanged) {
    		$scope.dgAppVm.showPageLoader = true;
    		console.log(fieldsVM.selectedField, screensResponse);
    		productDiffRequest = UtilitiesService.determineJSONDifferences({"Screens" : angular.copy(ProductsService.screensResponse)},
					{"Screens" : screensResponse});
    		
    		xmlFileName = fieldsVM.selectedVariantFile.split("_");
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
	
	function diffXmlCreateSuccess(response) {
		fieldsVM.isValueChanged = false;
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
        	$state.go('manageScreens'); 
    	}
    	else {
    		ErrorService.displayErrorMessage("refactoredXmlModifiedFail", response.messageToDisplay, "manageProducts");
    	}
    }
	
	fieldsVM.exit = function() {
			$state.go('variant');
	}
}]);