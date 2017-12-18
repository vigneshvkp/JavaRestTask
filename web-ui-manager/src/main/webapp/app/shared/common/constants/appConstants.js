angular.module('WebUIManagerApp')
.constant('CommonConstants', { 
	"responseMessage" : {
		"SUCCESS" : 'Success',
		"EMPTY" : 'Empty',
		"ERROR" : 'Error',
		"EXCEPTION" : 'Exception',
		"WARNING" : "Warning",
		"RETRIVE" : "Retrive",
		"SAVE" : "Save"
	}
}).constant('WebUIAppConstants', {
	"LANGUAGE" : "language",
	"COUNTRY":"country",
	"RESOURCE_PATH" : './app/shared/resources/language/',
	"EN" : "en",
	"EN_GB" : "en-gb",
	"EXPLICIT" : "explicit"
}).value('RouteProviderConstants', {
	"Manage Products" : "variant",
	"Products" : "products",
	"Screen Definition" : "screens",
	"Manage Screens" : "manageScreens",
	"Manage Fields"  : "fields",
	"Selenium XML Edit Page" : "seleniumEdit",
	"Manage Selenium Field" : "seleniumField"
}).constant('ConfigurableConstants', {
	"tableOptions":{
		"PER_PAGE_ROW_COUNT" :10,
		"ENABLE_FILTER" : true,
		"ZERO_RECORD_MESSAGE" : "No Records Found",
		"TREE_TABLE_ROW_COUNT":10,
		"SORTING_ORDER_ASC":0,
		"SORTING_ORDER_DESC":1,
		"DISPLAY_LENGTH" : "iDisplayLength",
		"ORDER" : "order"
	}
})