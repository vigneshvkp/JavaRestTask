app.register.controller('seleniumEditController',['$rootScope', '$scope', '$log', '$state', 'urlConstants', 'breadcrumbService', '$timeout', 'CommonDataService', 'UtilitiesService', 'ProductsService', 'x2js', 'ErrorService', 'ConfigurableConstants', 'ErrorService',
	function ($rootScope, $scope, $log, $state, urlConstants, breadcrumbService, $timeout, CommonDataService, UtilitiesService, ProductsService, x2js, ErrorService, ConfigurableConstants, ErrorService) {
		
		var seleniumEditVM = this;
		breadcrumbService.breadcrumb(["Products", "Manage Products", "Selenium XML Edit Page"]);
		
		/** Method call to get the Data table Options 
		 * returns the dataTable columnFilter dtOptions and columnDef
		 * Parameter 1 - Count of No.of column filters for the Data table
		 * Parameter 2 - Count of No.of columns for which sorting needs to be disabled */
		seleniumEditVM.dataTableOptions = UtilitiesService.getDataTableOptions(0, 7);
		seleniumEditVM.dtOptions = seleniumEditVM.dataTableOptions.dtOptions;
		seleniumEditVM.dtColumnDefs = seleniumEditVM.dataTableOptions.columnDefs;
		seleniumEditVM.dtOptions.withOption(ConfigurableConstants.tableOptions.ORDER, []); 
		seleniumEditVM.dtOptions.withOption('paging', false);
		
		var previousIndex;
		seleniumEditVM.fileName = $rootScope.selectedFileName;
		seleniumEditVM.seleniumFileName = 'EdgeSelenium' + seleniumEditVM.fileName.slice(seleniumEditVM.fileName.indexOf('_'),seleniumEditVM.fileName.indexOf('.')) + '_NBQT.xml';
		
		seleniumEditVM.showTable = {};
		seleniumEditVM.fieldHide = false;
		
		CommonDataService.callServer('seleniumEdit/' + seleniumEditVM.seleniumFileName, success);
		
		function success(response) {
			if(response.type && response.type == "Exception") {
				notification = ErrorService.generateCustomError("002", response.messageToDisplay, 'common');
				ErrorService.displayNotification(notification);
			}
			else {
				ErrorService.removeAllNotifications();
				seleniumEditVM.originalRecords = angular.copy(response);
				seleniumEditVM.fetchedFields = angular.copy(seleniumEditVM.originalRecords);
	    		xmlFileName = seleniumEditVM.seleniumFileName.split("_");
	    		var diffXmlFileName = xmlFileName[0] + "Difference_" + xmlFileName[1];
	    		if(xmlFileName[2]) {
	    			diffXmlFileName = diffXmlFileName + "_" + xmlFileName[2];
	    		}
	    		CommonDataService.callServer('seleniumEdit/diffXml/retrieve/'+ diffXmlFileName, diffSuccess);
			}
		}
		
	    function diffSuccess(response) {
	    /*if(response) {
	        	var mergedXml = UtilitiesService.mergeXMLDifferences({"Screens" : angular.copy(seleniumEditVM.originalRecords)},
	        			x2js.xml_str2json(response));
	        	var mergedObject = x2js.xml2json(mergedXml);
	        	if(mergedObject.Screens && mergedObject.Screens.Screen) {
	        		seleniumEditVM.fetchedFields = angular.copy(mergedObject.Screens);
	        		angular.forEach(seleniumEditVM.fetchedFields.Screen, function(screen, screenIndex) {
	        			if(!(screen.Field instanceof Array)) {
	        				seleniumEditVM.fetchedFields.Screen[screenIndex].Field = [];
	        				seleniumEditVM.fetchedFields.Screen[screenIndex].Field.push(screen.Field);
	        			}
	        		});
	        	}
	    	}*/
	    } 
		
		seleniumEditVM.toggleAction = function(index, event) {
			if(seleniumEditVM.showTable[index]){
				seleniumEditVM.showTable[index] = false;
				$(event.target).removeClass('tree_down_icon').addClass('tree_right_icon');
			}else{
				seleniumEditVM.showTable[index] = true;
				$(event.target).removeClass('tree_right_icon').addClass('tree_down_icon');
			}
		}
		
		seleniumEditVM.flipOtherRows = function(selectedFieldIndex, selectedScreen) {
			breakLoop = false;
			angular.forEach(seleniumEditVM.fetchedFields.Screen, function(screen, index) {
				if(screen.id == selectedScreen.id && !breakLoop) {
					if(seleniumEditVM.fetchedFields.Screen[index].Field[previousIndex]) {
						seleniumEditVM.fetchedFields.Screen[index].Field[previousIndex].hide = false;
					} 
					seleniumEditVM.fetchedFields.Screen[index].Field[selectedFieldIndex].hide = true;
					previousIndex = selectedFieldIndex;
					breakLoop = true;
				}
			});
		}
		
		seleniumEditVM.closeAction = function(selectedFieldIndex, selectedScreen) {
			breakLoop = false;
			angular.forEach(seleniumEditVM.fetchedFields.Screen, function(screen, index) {
				if(screen.id == selectedScreen.id && !breakLoop) {
					seleniumEditVM.fetchedFields.Screen[index].Field[selectedFieldIndex].hide = false;
					breakLoop = true;
				}
			});
		}
		
		seleniumEditVM.exit = function() {
			$state.go('home');
		}
		
		seleniumEditVM.isValueChanged = false;		// make it true when any value is changed
		
		seleniumEditVM.valueChanged = function() {
			seleniumEditVM.isValueChanged = true;
		};
		
		seleniumEditVM.updateFields = function() {
			angular.forEach(seleniumEditVM.fetchedFields.Screen, function(screen, index) {
				delete seleniumEditVM.originalRecords.Screen[index].Panel;
				delete seleniumEditVM.fetchedFields.Screen[index].Panel;
				screen.Field.map(function(field, fieldIndex) {
					if(seleniumEditVM.fetchedFields.Screen[index].Field[fieldIndex]) {
						delete seleniumEditVM.fetchedFields.Screen[index].Field[fieldIndex].hide;
					}
				});
			});
		}

		seleniumEditVM.saveChanges = function() {
    		$scope.dgAppVm.showPageLoader = true;
    		seleniumEditVM.updateFields();
    		
    		productDiffRequest = UtilitiesService.determineJSONDifferences({"Screens" : seleniumEditVM.originalRecords},
    				{"Screens" : seleniumEditVM.fetchedFields});
    		
    		xmlFileName = seleniumEditVM.seleniumFileName.split("_");
			var diffXmlFileName = xmlFileName[0] + "Difference_" + xmlFileName[1];
			if(xmlFileName[2]) {
				diffXmlFileName = diffXmlFileName + "_" + xmlFileName[2];
			}
			var productDiffXml = { 'differenceXmlString' : x2js.json2xml_str(productDiffRequest), 
					'fileName' : diffXmlFileName};
			
			CommonDataService.callServerToPost('products/refactoredDiffXml/create', productDiffXml, diffXmlCreateSuccess);	
		};

		function diffXmlCreateSuccess(response) {
			seleniumEditVM.isValueChanged = false;
			if(response == true) {
				var mergeXml = UtilitiesService.mergeXMLDifferences({"Screens" : seleniumEditVM.originalRecords}, productDiffRequest);
				var mergeObject = x2js.xml2json(mergeXml); 		
				var modifiedXmlFileName = xmlFileName[0] + "Modified_" + xmlFileName[1];
				if(xmlFileName[2]) {
					modifiedXmlFileName = modifiedXmlFileName + "_" + xmlFileName[2];
				}
				var productModifiedXml = { 'modifiedXmlString' : x2js.json2xml_str(angular.copy(mergeObject)), 'fileName' : modifiedXmlFileName};
				console.log("productModifiedXml", productModifiedXml);
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
	        	$state.go('variant'); 
	    	}
	    	else {
	    		ErrorService.displayErrorMessage("refactoredXmlModifiedFail", response.messageToDisplay, "manageProducts");
	    	}
	    };
	    
	    $scope.passSeleniumField = function (screenID, panelID, field) {
	    	$rootScope.selectedScreenID = screenID;
	    	$rootScope.selectedPanelID = panelID;
	    	$rootScope.selectedSeleniumField = field;
	    	$rootScope.SeleniumFileName = seleniumEditVM.seleniumFileName;
	    }
}]);