app.register.service('ProductsService',function () { 
	
	var service = {};
	service.selectedVariantRecord = {};
	service.screensResponse = {};
	service.screenObject = {};
	service.selectedField = {};
	service.updatedScreenObj = {};
	service.selectedPanelObj = {};
	
	/*
	 * This method sets the selected Variant details
	 */
	service.setSelectedVariantRecord = function(selectedVariantRecord) {
		this.selectedVariantRecord = selectedVariantRecord;
	}
	
	
	/*
	 * This method sets the retrieved screens response
	 */
	service.setScreensResponse = function(screensResponse) {
		this.screensResponse = screensResponse;
	}
	/*
	 * This method sets the retrieved screen object
	 */
	service.setScreenObject = function(screenObject) {
		this.screenObject = screenObject;
	}
	
	/*
	 * This method sets the retrieved refactoredXmlResponse response
	 */
	service.setRefactoredXmlResponse = function(refactoredXmlResponse) {
		this.refactoredXmlResponse = refactoredXmlResponse;
	}
	
	/*
	 * This method sets the selectedField response
	 */
	service.setSelectedField = function(selectedField) {
		this.selectedField = selectedField;
	}
	
	/*
	 * This method sets the updatedScreen object
	 */
	service.setUpdatedScreenObj = function(updatedScreenObj) {
		this.updatedScreenObj = updatedScreenObj;
	}
	
	/*
	 * This method sets the selectedPanelObj
	 */
	service.setSelectedPanelObj = function(selectedPanelObj) {
		this.selectedPanelObj = selectedPanelObj;
	}
	
	return service;
});