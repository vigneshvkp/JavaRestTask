var app = angular.module('WebUIManagerApp', ['ui.bootstrap', 'ui.router', 'i18nCustomDirective', 'xml', 'datatables']);

app.config(function($stateProvider, $urlRouterProvider,$controllerProvider, $provide) {
	
    app.register = {
            controller: $controllerProvider.register,
            service: $provide.service
        };
	$urlRouterProvider.otherwise('/login');

	$stateProvider.state('login', {
		url			 : '/login',
		templateUrl	 : 'app/components/authentication/login.htm',
		controller 	 : 'LoginController',
		controllerAs : 'loginVm'
	})
	.state('home', {
		url: '/home',
		templateUrl: 'app/homePage.htm'
	})
	.state('products', {
		url			 : '/products',
		templateUrl	 : 'app/components/products/products.htm',
		controller 	 : 'ProductsController',
		controllerAs : 'productsVm'
	})
	.state('schemes', {
		url			 : '/schemes',
		templateUrl	 : 'app/components/schemes/schemes.htm',
		controller 	 : 'SchemesController',
		controllerAs : 'schemesVm'
	})
	.state('variant', {
		url: '/variant',
		templateUrl : 'app/components/variants/variant.htm',
		controller : 'variantController', 
		controllerAs : 'variantVM'
	})
	.state('clones', {
		url: '/clones',
		templateUrl : 'app/components/clones/clones.htm',
		controller : 'ClonesController', 
		controllerAs : 'clonesVm'
	})
	.state('nativeUIGenerator', {
        url : '/nativeUIGenerator',
        templateUrl : 'app/components/NativeUIGenerator/nativeUIGenerator.htm',
        controller : 'nativeUIGeneratorController',
        controllerAs : 'nativeUIGeneratorVM'
    })
    .state('screens', {
    	url : '/screens',
    	templateUrl : 'app/components/screens/screens.htm',
    	controller : 'ScreensController',
    	controllerAs : 'screensVM'
    })
	.state('fields', {
		url : '/fields',
		templateUrl : 'app/components/fields/fields.htm',
		controller : 'FieldsController',
		controllerAs : 'fieldsVM'
	})
	.state('manageScreens', {
		url : '/manageScreens',
		templateUrl : 'app/components/manageScreens/manageScreens.htm',
		controller : 'manageScreensController',
		controllerAs : 'manageScreensVM'
	})
	.state('seleniumEdit', {
		url : '/seleniumEdit',
		templateUrl : 'app/components/seleniumEditPage/seleniumEdit.htm',
		controller : 'seleniumEditController',
		controllerAs : 'seleniumEditVM'
	})
	.state('seleniumField', {
		url : '/seleniumField',
		templateUrl : 'app/components/SeleniumField/seleniumField.htm',
		controller : 'seleniumFieldController',
		controllerAs : 'seleniumFieldVM'
	})
});