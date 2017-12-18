app.service("CommonDataService", ['$http', 'NetworkService', function($http, NetworkService) {
	
	var currentOrigin = window.location.origin;
	var currentContext = window.location.pathname.slice(window.location.pathname.indexOf('/'), window.location.pathname.indexOf(('/'), 2));
	var dgApiURL = "/dg-api";
	this.baseUrl = currentOrigin + currentContext + dgApiURL;
	
	this.callServer = function(url, success) {
		return NetworkService.get(this.baseUrl+ "/" + url, success);
	}
	
	this.callServerToPost = function(url, request, success) {
		return NetworkService.post(this.baseUrl+ "/" + url, request, success);
	}
	
}]);