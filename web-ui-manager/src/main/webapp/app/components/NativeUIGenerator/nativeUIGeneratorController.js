app.register.controller('nativeUIGeneratorController',['$rootScope', '$scope', '$state', '$log', 'urlConstants', '$timeout', 'breadcrumbService', 'CommonDataService', 'ErrorService',
                                         function ($rootScope, $scope, $state, $log, urlConstants, $timeout, breadcrumbService, CommonDataService, ErrorService) {


	
	breadcrumbService.breadcrumb(["Native Web UI XML Generator"]);
	
	var nativeUIGeneratorVM = this;
	
    nativeUIGeneratorVM.tab = 1;
    nativeUIGeneratorVM.loadNativeUI=true;
    nativeUIGeneratorVM.loadWebUI=false;
    nativeUIGeneratorVM.loadSeleniumUI=false;
    nativeUIGeneratorVM.showPostMsgFlag="";
    nativeUIGeneratorVM.postSuccess=false;
    nativeUIGeneratorVM.showPostMsg="";
    nativeUIGeneratorVM.showPostMsgClass="";
    nativeUIGeneratorVM.loaderFlag = false;
    nativeUIGeneratorVM.PanelLoaderFlag = true;
    nativeUIGeneratorVM.PanelShowPostMsgFlag=false;
    //Form Data
    
    nativeUIGeneratorVM.selectProductFolder = "C:/DynamicGeneration/SelectProductXML/Sales";
    nativeUIGeneratorVM.edgeProductFolder = "C:/DynamicGeneration/SelectProductXML/Sales/Edge";
    nativeUIGeneratorVM.booleanStyle = "Radio";
    
    //checkboxes
    nativeUIGeneratorVM.useNativeUIScreens = true;
    nativeUIGeneratorVM.useCoverageSelector = false;
    nativeUIGeneratorVM.usePricePresentation = false;
    nativeUIGeneratorVM.useIgnoreWarningMethod = false;
    nativeUIGeneratorVM.generateDynamicUI = true;
    nativeUIGeneratorVM.generateDynamicServices = true;
    nativeUIGeneratorVM.oneScreenPerComponent = true;
    nativeUIGeneratorVM.skipOptionalComponents = false;
    
    nativeUIGeneratorVM.seleniumEnvironment="Sales";
    nativeUIGeneratorVM.seleniumTransactions="NBQT:MTA";
    nativeUIGeneratorVM.seleniumScriptsInputFolder="C:/DynamicGeneration/JavaWorkspace/xml-generator/Selenium";
    nativeUIGeneratorVM.seleniumScriptsOutputFolder="C:/DynamicGeneration/SelectProductXML/Sales/Edge";
    
    //checkboxes ends
    //Form Data Ends
    
    // Publish XML to Edge Server - Form Data
    nativeUIGeneratorVM.uri1 = "sftp://ald-edgesrv:22";
    nativeUIGeneratorVM.username1 = "ftpUser";
    nativeUIGeneratorVM.password1 = "S3cur3P@ssw0rd123";
    nativeUIGeneratorVM.privateKeyPath1 = "";
    nativeUIGeneratorVM.passphrase1 = "";
    nativeUIGeneratorVM.knownHostsPath1 = "ftpUser";
    nativeUIGeneratorVM.dir1 = "/C:/TestFTP";
    // Publish XML to Edge Server - Form Data - Ends
    
    nativeUIGeneratorVM.setTab = function(newTab) {
      nativeUIGeneratorVM.tab = newTab;
        if(newTab==2){
            nativeUIGeneratorVM.loadNativeUI=false;
            nativeUIGeneratorVM.loadWebUI=true;
            nativeUIGeneratorVM.loadSeleniumUI=false;
        }
        else if (newTab==1){
            nativeUIGeneratorVM.loadNativeUI=true;
            nativeUIGeneratorVM.loadWebUI=false;
            nativeUIGeneratorVM.loadSeleniumUI=false;
        }
        else if (newTab==3){
        	nativeUIGeneratorVM.loadNativeUI=false;
            nativeUIGeneratorVM.loadWebUI=false;
            nativeUIGeneratorVM.loadSeleniumUI=true;
        }
    };

    nativeUIGeneratorVM.isSet = function(tabNum){
      return nativeUIGeneratorVM.tab === tabNum;
    };
    
	nativeUIGeneratorVM.nativeSubmitClicked = function(mode) {
		nativeUIGeneratorVM.loaderFlag = true;
		
		var jsonString = "{\"mode\":\"" + mode + "\",\"selectProductFolder\":\"" + nativeUIGeneratorVM.selectProductFolder + "\",\"edgeProductFolder\":\"" + nativeUIGeneratorVM.edgeProductFolder + "\",\"booleanStyle\":\"" + nativeUIGeneratorVM.booleanStyle + "\",\"useNativeUiScreens\":\"" + nativeUIGeneratorVM.useNativeUIScreens + "\",\"useCoverSelector\":\"" + nativeUIGeneratorVM.useCoverageSelector + "\",\"usePricePresentation\":\"" + nativeUIGeneratorVM.usePricePresentation + "\",\"oneScreenPerComponent\":\"" + nativeUIGeneratorVM.oneScreenPerComponent + "\",\"skipOptionalComponents\":\"" + nativeUIGeneratorVM.skipOptionalComponents + "\",\"useIgnoreWarning\":\"" + nativeUIGeneratorVM.useIgnoreWarningMethod + "\",\"generateDynamicUI\":\"" + nativeUIGeneratorVM.generateDynamicUI + "\",\"generateDynamicServices\":\"" + nativeUIGeneratorVM.generateDynamicServices + "\"}";
		
		// call data service and pass this json to it
		CommonDataService.callServerToPost('generate/edgeXML', jsonString, success);
		function success(response) {
			nativeUIGeneratorVM.postSuccess = response;
			if (nativeUIGeneratorVM.postSuccess == true) {
				if (mode == "GenerationFromMetaData"){
					ErrorService.displaySuccessMessage('xmlUpload','xml_upload_messge',"manageProducts");
				}
				else if (mode == "GenerationFromMetaDataRefactored") {
					ErrorService.displaySuccessMessage('xmlUpload','web_xml_upload_messge',"manageProducts");
				}
				nativeUIGeneratorVM.loaderFlag = false;
			}
			else{
				if (mode == "GenerationFromMetaData"){
					ErrorService.displayErrorMessage('xmlUpload','xml_uploadFail_messge',"manageProducts");
				}
				else if (mode == "GenerationFromMetaDataRefactored") {
					ErrorService.displayErrorMessage('xmlUpload','web_xml_uploadFail_messge',"manageProducts");
				}
				nativeUIGeneratorVM.loaderFlag = false;
			}
		}
	};
	
	// Publish XML to Edge Server - On uploading - mode : SFTP
	nativeUIGeneratorVM.panelSubmitClicked = function () {
		nativeUIGeneratorVM.PanelLoaderFlag = false;
		
		var jsonString = "{\"mode\":\"SFTP\",\"selectProductFolder\":\"" + nativeUIGeneratorVM.selectProductFolder + "\",\"edgeProductFolder\":\"" + nativeUIGeneratorVM.edgeProductFolder + "\",\"booleanStyle\":\"" + nativeUIGeneratorVM.booleanStyle + "\",\"useNativeUiScreens\":\"" + nativeUIGeneratorVM.useNativeUIScreens + "\",\"useCoverSelector\":\"" + nativeUIGeneratorVM.useCoverageSelector + "\",\"usePricePresentation\":\"" + nativeUIGeneratorVM.usePricePresentation + "\",\"useIgnoreWarning\":\"" + nativeUIGeneratorVM.useIgnoreWarningMethod + "\",\"generateDynamicUI\":\"" + nativeUIGeneratorVM.generateDynamicUI + "\",\"generateDynamicServices\":\"" + nativeUIGeneratorVM.generateDynamicServices + "\",\"uri1\":\"" + nativeUIGeneratorVM.uri1 + "\",\"username1\":\"" + nativeUIGeneratorVM.username1 + "\",\"password1\":\"" + nativeUIGeneratorVM.password1 + "\",\"privateKeyPath1\":\"" + nativeUIGeneratorVM.privateKeyPath1 + "\",\"passphrase1\":\"" + nativeUIGeneratorVM.passphrase1 + "\",\"knownHostsPath1\":\"" + nativeUIGeneratorVM.knownHostsPath1 + "\",\"dir1\":\"" + nativeUIGeneratorVM.dir1 + "\"}";
		
		CommonDataService.callServerToPost('generate/edgeXML', jsonString, success);
		function success(response) {
			nativeUIGeneratorVM.PanelPostSuccess = response;
			if (nativeUIGeneratorVM.PanelPostSuccess == true) {
				ErrorService.displaySuccessMessage('xmlUpload','panel_xml_upload_messge',"manageProducts");
				nativeUIGeneratorVM.PanelLoaderFlag = true;
			}
			else{
				ErrorService.displayErrorMessage('xmlUpload','panel_xml_uploadFail_messge',"manageProducts");
				nativeUIGeneratorVM.PanelLoaderFlag = true;
			}
		}
	};
	
	nativeUIGeneratorVM.seleniumSubmitClicked = function () {
		nativeUIGeneratorVM.loaderFlag = true;
		var jsonString = "{\"mode\":\"SELENIUM\",\"seleniumEnvironment\":\"" + nativeUIGeneratorVM.seleniumEnvironment + "\",\"seleniumTransactions\":\"" + nativeUIGeneratorVM.seleniumTransactions + "\",\"seleniumScriptsInputFolder\":\"" + nativeUIGeneratorVM.seleniumScriptsInputFolder +"\",\"seleniumScriptsOutputFolder\":\"" + nativeUIGeneratorVM.seleniumScriptsOutputFolder + "\",\"edgeProductFolder\":\"C:/DynamicGeneration/SelectProductXML/Sales/Edge\",\"selectProductFolder\":\"" + nativeUIGeneratorVM.selectProductFolder + "\"}";
		
		CommonDataService.callServerToPost('generate/edgeXML', jsonString, success);
		function success(response) {
			nativeUIGeneratorVM.SeleniumPostSuccess = response;
			if(nativeUIGeneratorVM.SeleniumPostSuccess == true) {
				ErrorService.displaySuccessMessage('xmlUpload','selenium_xml_upload_messge',"manageProducts");
				nativeUIGeneratorVM.loaderFlag = false;
			}
			else {
				ErrorService.displayErrorMessage('xmlUpload','selenium_xml_uploadFail_messge',"manageProducts");
				nativeUIGeneratorVM.loaderFlag = false;
			}
		}
	};
	
	nativeUIGeneratorVM.openPanel = function() {
		nativeUIGeneratorVM.PanelShowPostMsgFlag=false;
	}
	
	nativeUIGeneratorVM.redirect = function() {
		$state.reload();
	}
	
	nativeUIGeneratorVM.exit = function() {
		$state.go('home');
	};
	
}]);