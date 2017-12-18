app.register.controller('ClonesController',
		['$rootScope', '$scope', '$state', '$log', 'x2js', 'urlConstants', '$timeout', 'breadcrumbService', 'CommonDataService', 'ProductsService', 'UtilitiesService', 'ErrorService',
			function ($rootScope, $scope, $state, $log, x2js, urlConstants, $timeout, breadcrumbService, CommonDataService, ProductsService, UtilitiesService, ErrorService) {

			breadcrumbService.breadcrumb(["Products", "Manage Products", "Create Clone"]);

	var clonesVm = this;
	clonesVm.modelObject = {};
	var selectedVariant = ProductsService.selectedVariantRecord;
	clonesVm.modelObject.cloneCode = selectedVariant.schemeCode ? selectedVariant.schemeCode : 
		selectedVariant.productCode ? selectedVariant.productCode :selectedVariant.cloneFromSchemeCode ?
				selectedVariant.cloneFromSchemeCode : selectedVariant.cloneCode;
	clonesVm.modelObject.cloneDescription = selectedVariant.businessDescription;
	var retrieveResponse = {};
	var productDiffRequest = {};
	var xmlFileName = "";
	clonesVm.errorNotification = {};
	var formValues = {};
	formValues.required = {};
	formValues.required.cloneCode = {};
	formValues.required.cloneName = {};
	formValues.required.cloneDescription = {};
	formValues.required.cloneCode.displayName = "Clone code";
	formValues.required.cloneName.displayName = "Clone name";
	formValues.required.cloneDescription.displayName = "Clone description";
	ErrorService.removeAllNotifications();
	
	clonesVm.contentChanged = function(key) {
		ErrorService.removeResolvedError(clonesVm.errorNotification, key);
	}
	
	clonesVm.saveClone = function(cloneForm) {
		clonesVm.errorNotification = ErrorService.checkRequiredValueError(cloneForm, clonesVm.errorNotification,formValues);
		if(Object.keys(clonesVm.errorNotification).length == 0){
			if(clonesVm.modelObject && clonesVm.modelObject.cloneName) {
				$scope.dgAppVm.showPageLoader = true;
				CommonDataService.callServerToPost('products/clones/save', clonesVm.modelObject, saveSuccess);
			}
		}
	}
	
	function saveSuccess(response) {
		$scope.dgAppVm.showPageLoader = false;
		if(response == true) {
			ErrorService.displaySuccessMessage('cloneCreate','clone_create_messge',"manageProducts");
			$state.go('variant');
			//var fileName = selectedVariant.file? selectedVariant.file : selectedVariant.cloneFile;
			//CommonDataService.callServer('products/refactoredXml/retrieve/'+fileName, retrieveSuccess);
			}
		else {
			ErrorService.displayErrorMessage("cloneFail", response.messageToDisplay, "manageProducts");
		}
	}
	
	function retrieveSuccess(response) {
		if(response) {
			retrieveResponse = angular.copy(response);
			var objectChanges = angular.copy(retrieveResponse);
			productDiffRequest = UtilitiesService.determineJSONDifferences(retrieveResponse, objectChanges);
			xmlFileName = selectedVariant.file.split("_");
			var diffXmlFileName = xmlFileName[0] + "Difference_" + xmlFileName[1] + "_" + xmlFileName[2];
			var productDiffXml = { 'differenceXmlString' : x2js.json2xml_str(productDiffRequest),
					'fileName' : diffXmlFileName};
			if(productDiffXml.differenceXmlString != "") {
				CommonDataService.callServerToPost('products/refactoredDiffXml/create', productDiffXml, diffXmlCreateSuccess);
			}
		}
		else {
			ErrorService.displayErrorMessage("cloneFail", response.messageToDisplay, "manageProducts");
		}
	}
	
	function diffXmlCreateSuccess(response) {
		if(response == true) {
			var mergeXml = UtilitiesService.mergeXMLDifferences(retrieveResponse, productDiffRequest);
			var mergeObject = x2js.xml2json(mergeXml);
			var modifiedXmlFileName = xmlFileName[0] + "Modified_" + xmlFileName[1] + "_" + xmlFileName[2];
			var productModifiedXml = { 'modifiedXmlString' : x2js.json2xml_str(angular.copy(mergeObject)), 'fileName' : modifiedXmlFileName};
			if(productModifiedXml.modifiedXmlString != "") {
				CommonDataService.callServerToPost('products/refactoredModifiedXml/create', productModifiedXml, modifiedXmlCreateSuccess);
			}
		}
		else if(response.type == "Exception") {
			ErrorService.displayErrorMessage("cloneDiffFail", response.messageToDisplay, "manageProducts");
		}
	}
	
	function modifiedXmlCreateSuccess(response) {
		if(response == true) {
			ErrorService.displaySuccessMessage('cloneCreate','clone_create_messge',"manageProducts");
			$state.go('variant');
		}
		else {
			ErrorService.displayErrorMessage("cloneModifiedFail", response.messageToDisplay, "manageProducts");
		}
	}
	
	
	clonesVm.cancel = function() {
		ErrorService.removeAllNotifications();
		$state.go('variant');
	}

}]);