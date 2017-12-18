app.register.controller('manageScreensController',['$rootScope', '$scope', '$log', '$state', '$filter', 'urlConstants', 'breadcrumbService', '$timeout', 'CommonDataService', 'UtilitiesService', 'ProductsService', 'x2js', 'ErrorService', 'ConfigurableConstants', 'ErrorService',
	function ($rootScope, $scope, $log, $state, $filter, urlConstants, breadcrumbService, $timeout, CommonDataService, UtilitiesService, ProductsService, x2js, ErrorService, ConfigurableConstants, ErrorService) {
	 
	var manageScreensVM = this;
	breadcrumbService.breadcrumb(["Products", "Manage Products", "Screen Definition", "Manage Screens"]);
	
	manageScreensVM.selectedVariantFile = $rootScope.selectedVariant;
	manageScreensVM.productCode = $rootScope.prodCode;
	manageScreensVM.screenIDCode = $rootScope.screenId;
	manageScreensVM.prePhaseRulesObj = {};
	manageScreensVM.panelObj = {};
	manageScreensVM.showDT = true;
	manageScreensVM.isValueChanged = false;
	manageScreensVM.showTable = {};
	manageScreensVM.isRuleAddMode = true;
	manageScreensVM.deletedScreens = [];
	manageScreensVM.deletedPanels = [];
	manageScreensVM.deletedFields = [];
	var previousIndex;
	var previousRuleIndex;
	var deletePanelElements = false;
	
	/** Method call to get the Data table Options 
	 * returns the dataTable columnFilter dtOptions and columnDef
	 * Parameter 1 - Count of No.of column filters for the Data table
	 * Parameter 2 - Count of No.of columns for which sorting needs to be disabled */
	manageScreensVM.dataTableOptions = UtilitiesService.getDataTableOptions(0, 3);
	manageScreensVM.dtOptions = manageScreensVM.dataTableOptions.dtOptions;
	manageScreensVM.dtColumnDefs = manageScreensVM.dataTableOptions.columnDefs;
	manageScreensVM.dtOptions.withOption(ConfigurableConstants.tableOptions.ORDER, []); 
	manageScreensVM.dtOptions.withOption('paging', false);
	
	manageScreensVM.fieldDataTableOptions = UtilitiesService.getDataTableOptions(0, 5);
	manageScreensVM.fieldDtOptions = manageScreensVM.fieldDataTableOptions.dtOptions;
	manageScreensVM.fieldDtColumnDefs = manageScreensVM.fieldDataTableOptions.columnDefs;
	manageScreensVM.fieldDtOptions.withOption(ConfigurableConstants.tableOptions.ORDER, []);
	manageScreensVM.fieldDtOptions.withOption('paging', false);
	
	/*tree table options*/
	$scope.tableOptions = {};
	$scope.tableOptions.size = ConfigurableConstants.TREE_TABLE_ROW_COUNT;
	$scope.tableOptions.sortingOrder = ConfigurableConstants.SORTING_ORDER_ASC;
	$scope.tableOptions.enablePagination = false;
	$scope.tableOptions.scrollContainer = true;
	$scope.tableOptions.enableSorting = true;
	$scope.tableOptions.headers = {};
	$scope.tableOptions.headers[0]={sorter:'customDate'};
	$scope.tableOptions.headers[1]={sorter:'customDate'};
	
	manageScreensVM.screenObject = {};
	manageScreensVM.screenObject.PrePhaseRules = [];
	manageScreensVM.screenObject.Panel = [];
	var screensResponse = {};
		
	/**
	 * toggle and show/hide table 
	 * @param: index of the table row*/
	
	manageScreensVM.toggleAction = function(index, event){
		if(manageScreensVM.showTable[index]){
			manageScreensVM.showTable[index] = false;
			$(event.target).removeClass('tree_down_icon').addClass('tree_right_icon');
		}else{
			manageScreensVM.showTable[index] = true;
			$(event.target).removeClass('tree_right_icon').addClass('tree_down_icon');
		}
	}
	
	manageScreensVM.initSetOrder = function() {
		angular.element(document).ready(function(){
			angular.forEach(manageScreensVM.screenObject.Panel, function(panel, index) {
				angular.element( ".modal-dialog" ).addClass( "SetTabOrderWidth_100" );
				angular.element( ".screen-tab-order" ).addClass( "set-tab-order-modal" );
				$timeout(function(){
					var $scrollbar = $("#scrollbar"+index);
					$scrollbar.tinyscrollbar();
				})
				var selectedRowIndex;
				angular.element( "#sortable"+index).sortable({
					axis: "y",
					start: function(event, ui) { 
						selectedRowIndex = ui.item.index();
					},
					/**
					 * update the index of list in drag and drop*/
					update: function(event, ui) { 
						$scope.$apply(function() {
							manageScreensVM.panelObj = panel;
							var selectedValue = angular.copy(panel.PanelElements[selectedRowIndex]);
							panel.PanelElements.splice(selectedRowIndex, 1);
							panel.PanelElements.splice(ui.item.index(), 0, selectedValue);
							angular.forEach(panel.PanelElements, function(value, key) {
								manageScreensVM.screenObject.Panel[index].PanelElements[key] = 
									updateSortOrder(manageScreensVM.screenObject.Panel[index].PanelElements[key], key);
							});
							manageScreensVM.saveTabOrder(manageScreensVM.screenObject.Panel[index]);
						});
					}
				});
				angular.element( "#sortable"+index).disableSelection();
			});
		});
	}
	
	/**
	 * method to save values*/
	manageScreensVM.saveTabOrder = function(panel) {
		angular.forEach(panel.PanelElements, function(value, key) {
			if(panel.Field != undefined) {
				panel.Field.map(function(fieldValue, fieldIndex) {
					if(fieldValue.id == value.id) {
						panel.Field[fieldIndex].order = value.order;
					}
				});
			}
			if(panel.FreeText != undefined) {
				panel.FreeText.map(function(freeTextValue, freeTextIndex) {
					if(freeTextValue.id == value.id) {
						panel.FreeText[freeTextIndex].order = value.order;
					}
				});
			}
		});
	}
	
	manageScreensVM.getScreen = function() {
		manageScreensVM.showDT = false;
		screensResponse = angular.copy(ProductsService.updatedScreenObj);
		angular.forEach(screensResponse.Screen, function(screen, index) {
			if(screen.id == manageScreensVM.screenIDCode) {
				manageScreensVM.screenObject = angular.copy(screen);
				manageScreensVM.screenObject.Panel = angular.copy(screen.Panel);
				angular.forEach(manageScreensVM.screenObject.Panel, function(panel, key) {
					manageScreensVM.screenObject.Panel[key].PanelElements = [];
					if(!(panel.Field instanceof Array)) {
						if(manageScreensVM.screenObject.Panel[key]) {
							var fieldObj = angular.copy(manageScreensVM.screenObject.Panel[key].Field);
							if(fieldObj) {
								manageScreensVM.screenObject.Panel[key].Field = [];
								manageScreensVM.screenObject.Panel[key].Field.push(fieldObj);
							}
						}
					}
					if(panel.Field != undefined) {
						if(panel.Field instanceof Array) {
							angular.forEach(panel.Field, function(field, fieldIndex) {
								manageScreensVM.screenObject.Panel[key].PanelElements.push(field);
							});
						}
						else {
							manageScreensVM.screenObject.Panel[key].PanelElements.push(panel.Field);
						}
					}
					if(panel.FreeText != undefined) {
						if(panel.FreeText instanceof Array) {
							angular.forEach(panel.FreeText, function(freeText, ftIndex) {
								manageScreensVM.screenObject.Panel[key].PanelElements.push(freeText);
							});
						}
						else {
							manageScreensVM.screenObject.Panel[key].PanelElements.push(panel.FreeText);
						}
					}
				manageScreensVM.screenObject.Panel[key].PanelElements = $filter('orderBy')(manageScreensVM.screenObject.Panel[key].PanelElements,'order');
				});
				if(screen.PrePhaseRules) {
					if(screen.PrePhaseRules instanceof Array) {
						manageScreensVM.screenObject.PrePhaseRules = angular.copy(screen.PrePhaseRules);
					} else {
						manageScreensVM.screenObject.PrePhaseRules = [];
						manageScreensVM.screenObject.PrePhaseRules.push(angular.copy(screen.PrePhaseRules));
					}
				}
			}
		});
		manageScreensVM.showDT = true;
	}

	manageScreensVM.editField = function(selectedField, selectedPanel) {
		if(selectedField) {
			manageScreensVM.updateScreenObj();
			ProductsService.setSelectedPanelObj(angular.copy(selectedPanel));
			ProductsService.setSelectedField(selectedField);
			$state.go('fields');
		}
	}
	
	manageScreensVM.editPanel = function(selectedPanel) {
		manageScreensVM.panelObj = angular.copy(selectedPanel);
		manageScreensVM.panelObj.title = selectedPanel.Heading.headerText;
	}
	
	manageScreensVM.updateScreenObj = function() {
		angular.forEach(screensResponse.Screen, function(screen, index) {
			var sourceScreenResponse = angular.copy(ProductsService.screensResponse);
			delete sourceScreenResponse.Screen[index].Field;
			ProductsService.setScreensResponse(angular.copy(sourceScreenResponse));
			delete screensResponse.Screen[index].Field;
			if(screen.id == manageScreensVM.screenObject.id) {
				screensResponse.Screen[index] = angular.copy(manageScreensVM.screenObject);
				if(deletePanelElements) {
					manageScreensVM.screenObject.Panel.map(function(panelValue, panelIndex) {
						delete manageScreensVM.screenObject.Panel[panelIndex].PanelElements;
					});
					deletePanelElements = false;
				}
				screensResponse.Screen[index].Panel = angular.copy(manageScreensVM.screenObject.Panel);
				angular.forEach(manageScreensVM.screenObject.PrePhaseRules, function(rule, key) {
					if(manageScreensVM.screenObject.PrePhaseRules[key]) {
						delete manageScreensVM.screenObject.PrePhaseRules[key].hide;
					}
				});
				screensResponse.Screen[index].PrePhaseRules = angular.copy(manageScreensVM.screenObject.PrePhaseRules);
			}
		});
		ProductsService.setUpdatedScreenObj(angular.copy(screensResponse));
	}
	
	manageScreensVM.updatePanel = function() {
		manageScreensVM.isValueChanged = true;
		angular.forEach(manageScreensVM.screenObject.Panel, function(panel, index) {
			if(panel.id == manageScreensVM.panelObj.id) {
				manageScreensVM.screenObject.Panel[index].id = manageScreensVM.panelObj.id;
				manageScreensVM.screenObject.Panel[index].name = manageScreensVM.panelObj.name;
				manageScreensVM.screenObject.Panel[index].hasList = manageScreensVM.panelObj.hasList;
				manageScreensVM.screenObject.Panel[index].Heading.headerText = manageScreensVM.panelObj.title;
				manageScreensVM.screenObject.Panel[index].visibilityMode = manageScreensVM.panelObj.visibilityMode;
				manageScreensVM.screenObject.Panel[index].visibilityCondition = manageScreensVM.panelObj.visibilityCondition;
			}
			angular.forEach(panel.PanelElements, function(panelElement, key) {
				if(manageScreensVM.screenObject.Panel[index].PanelElements[key]) {
					delete manageScreensVM.screenObject.Panel[index].PanelElements[key].hide;
				}
			});
		});
		deletePanelElements = true;
		manageScreensVM.updateScreenObj();
	}
	
	manageScreensVM.deletePanel = function(selectedPanel) {
		manageScreensVM.isValueChanged = true;
		angular.forEach(manageScreensVM.screenObject.Panel, function(panel, index) {
			if(panel.id == selectedPanel.id) {
				manageScreensVM.screenObject.Panel.splice(index, 1);
			}
		});
		manageScreensVM.updateScreenObj();
	}
	
	manageScreensVM.addPrePhaseRule = function() {
		manageScreensVM.isValueChanged  = true;
		if(manageScreensVM.isRuleAddMode) {
			if(manageScreensVM.prePhaseRulesObj.rule) {
				if(!manageScreensVM.screenObject.PrePhaseRules) {
					manageScreensVM.screenObject.PrePhaseRules = [];
				}
				manageScreensVM.screenObject.PrePhaseRules.push(manageScreensVM.prePhaseRulesObj);
			}
		}
		else {
			angular.forEach(manageScreensVM.screenObject.PrePhaseRules, function(rule, index) {
				if(index == manageScreensVM.selectedRuleIndex) {
					manageScreensVM.screenObject.PrePhaseRules[manageScreensVM.selectedRuleIndex] = manageScreensVM.prePhaseRulesObj;
				}
			});
		}
		manageScreensVM.prePhaseRulesObj = {};
		manageScreensVM.isRuleAddMode = true;
	}
	
	manageScreensVM.saveChanges = function() {
		manageScreensVM.updatePanel();
		if(manageScreensVM.isValueChanged) {
    		$scope.dgAppVm.showPageLoader = true;  
    		productDiffRequest = UtilitiesService.determineJSONDifferences({"Screens" : angular.copy(ProductsService.screensResponse)},
					{"Screens" : screensResponse});
    		
    		xmlFileName = manageScreensVM.selectedVariantFile.split("_");
			var diffXmlFileName = xmlFileName[0] + "Difference_" + xmlFileName[1];
			if(xmlFileName[2]) {
				diffXmlFileName = diffXmlFileName + "_" + xmlFileName[2];
			}
			var productDiffXml = { 'differenceXmlString' : x2js.json2xml_str(productDiffRequest), 
					'fileName' : diffXmlFileName};
			CommonDataService.callServerToPost('products/refactoredDiffXml/create', productDiffXml, diffXmlCreateSuccess);
		}
	}
	
	function diffXmlCreateSuccess(response) {
		manageScreensVM.isValueChanged = false;
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
        	$state.go('variant'); 
    	}
    	else {
    		ErrorService.displayErrorMessage("refactoredXmlModifiedFail", response.messageToDisplay, "manageProducts");
    	}
    }
	
	manageScreensVM.flipOtherRows = function(index, selectedPanel) {
		breakLoop = false;
		angular.forEach(manageScreensVM.screenObject.Panel, function(panel, key) {
			if(selectedPanel.id == panel.id && !breakLoop) {
				if(manageScreensVM.screenObject.Panel[key].PanelElements[previousIndex]) {
					manageScreensVM.screenObject.Panel[key].PanelElements[previousIndex].hide = false;
				} 
				manageScreensVM.screenObject.Panel[key].PanelElements[index].hide = true;
				previousIndex = index;
				breakLoop = true;
			}
		});
	}
	
	manageScreensVM.closeAction = function(index, selectedPanel) {
		if(selectedPanel) {
			breakLoop = false;
			angular.forEach(manageScreensVM.screenObject.Panel, function(panel, key) {
				if(selectedPanel.id == panel.id && !breakLoop) {
					manageScreensVM.screenObject.Panel[key].PanelElements[index].hide = false;
					breakLoop = true;
				}
			});
		}
		else {
			manageScreensVM.screenObject.PrePhaseRules[index].hide = false;
		}
	}
	
	manageScreensVM.deleteField = function(selectedPanel, selectedElement, selectedFieldIndex) {
		manageScreensVM.isValueChanged = true;
		breakLoop = false;
		isDeleted = false;
		manageScreensVM.screenObject.Panel.map(function(panel, panelIndex) {
			if(selectedPanel.id == panel.id) {
				Object.keys(panel).map(function(childValue) {
					if(panel[childValue] instanceof Array && childValue != "PanelElements") {
						panel[childValue].map(function(grandChildValue, index) {
							if(grandChildValue.id == selectedElement.id) {
								panel[childValue].splice(index, 1);
							}
							if(grandChildValue.order > selectedElement.order) {
								grandChildValue = updateSortOrder(grandChildValue);
							}
						});
					}
					else if(panel[childValue] instanceof Array) {
						panel[childValue].map(function(value, index) {
							if(value.id == selectedElement.id) {
								panel[childValue].splice(index, 1);
							}
							if(value.order > selectedElement.order) {
								value = updateSortOrder(value);
								//value.order = parseInt(value.order) - 1; 
							}										
						});
					}
				})
				manageScreensVM.screenObject.Panel[panelIndex] = angular.copy(panel);
			}
		});
		manageScreensVM.updateScreenObj();
	}
	
	manageScreensVM.flipOtherRuleRows = function(index) {
		if(manageScreensVM.screenObject.PrePhaseRules[previousRuleIndex]) {
			manageScreensVM.screenObject.PrePhaseRules[previousRuleIndex].hide = false;
		}
		manageScreensVM.screenObject.PrePhaseRules[index].hide = true;
		previousRuleIndex = index;
	}
	
	manageScreensVM.addRule = function() {
		manageScreensVM.isRuleAddMode = true;
		manageScreensVM.prePhaseRulesObj = {};
	}
	
	manageScreensVM.editPrePhaseRule = function(prePhaseRule, index) {
		manageScreensVM.selectedRuleIndex = index;
		manageScreensVM.isValueChanged  = true;
		manageScreensVM.isRuleAddMode = false;
		manageScreensVM.prePhaseRulesObj = angular.copy(prePhaseRule);
	}
	
	manageScreensVM.deletePrePhaseRule = function(selectedRuleIndex) {
		manageScreensVM.isValueChanged  = true;
		if(manageScreensVM.screenObject.PrePhaseRules instanceof Array) {
			manageScreensVM.screenObject.PrePhaseRules.splice(selectedRuleIndex, 1);
		}
	}
	
	
	manageScreensVM.exit = function() {
			$state.go('variant');
	}
	
	function updateSortOrder(value, index) {
		var indexOfOrder = value.order.lastIndexOf(".")
		var tempSortOrder = value.order.substring(indexOfOrder+1);
		var updatedOrder;
		if(parseInt(tempSortOrder) <= 10) {
			updatedOrder = index ? "00" + JSON.stringify(index + 1) : "00" + JSON.stringify(parseInt(tempSortOrder) - 1);
		}else if(parseInt(tempSortOrder) > 10 && parseInt(tempSortOrder) <= 100) {
			updatedOrder =  index ? "0" + JSON.stringify(index + 1) : "0" + JSON.stringify(parseInt(tempSortOrder) - 1);
		}else {
			updatedOrder =  index ? JSON.stringify(index + 1) : JSON.stringify(parseInt(tempSortOrder) - 1);
		}
		value.order = value.order.substring(0, indexOfOrder) + "." + updatedOrder;
		return value;
	}

}]);