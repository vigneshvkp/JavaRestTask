
angular.module('WebUIManagerApp')
/**
 * filter used for multiselect to remove duplicates */
.filter('getById', function() {
	return function(input, id) {
		var i=0, len=input.length;
		for (; i<len; i++) {
			if (+input[i]._id == +id) {
				return input[i];
			}
		}
		return null;
	}
})

/**
 * directive for multiselect two side 
 * Has isolated scope for directive
 * gets the value of multiselect two side from controller and sets back to controller scope 
 * */
.directive('multiSelectTwoSide', ['$parse','$compile','$timeout',function ($parse,$compile,$timeout) {
	return {
		restrict: 'A,C',
		replace: true,
		require: 'ngModel',
		templateUrl: 'app/shared/partials/multiSelectTwoSide.htm',
		link: function(scope, element, attrs) {
			/*Setting the default value for scope id*/
			scope.id = scope.id ? scope.id : 'multiselect';	
			var model = $parse(scope.ngModel);
			var modelSetter = model.assign;
			var values=[];
			if(scope.size){
				scope.size = scope.size;
			}else{
				scope.size = 10;
			}

			/*to get the id to be used*/
			var getId = function getId(object,idKey,defaultKey){
				var dummy_id = defaultKey;
				var keyArray = [];
				if(idKey){
					keyArray  = idKey.split('.');
				}
				angular.forEach(keyArray,function(value,key){
					var res = object;
					object = object[value];
					if(value == keyArray[keyArray.length -1]){
						dummy_id = object;
					}
				})
				return dummy_id;
			}
			/*method to add name and id key to list array*/
			var getMultiSelectListValues = function getMultiSelectListValues(list,nameKey,idKey){
				var listArray = [];
				if(list){
					if(list instanceof Array){
						angular.forEach(list,function(value,key){
							if(!value.hasOwnProperty('dummy_name')){
								value['dummy_id'] = getId(value,idKey,key);
								value['dummy_name'] = value[nameKey];
							}
						})
						listArray = list;
					}else{
						if(!list.hasOwnProperty('dummy_name')){
							list['dummy_id'] = getId(list,idKey,"1");
							list['dummy_name'] = list[nameKey];
						}
						listArray.push(list);
					}
				}
				return listArray;
			}
			
			angular.element(document).ready(function () {
            $timeout(function(){
					/**
					 * invokes multiselect */
					$('.'+scope.id+'-multiselect').multiselect({
						right: '#'+scope.id+'_multiselect_to',
				        rightAll: '#'+scope.id+'_rightAll',
				        rightSelected: '#'+scope.id+'_rightSelected',
				        leftSelected: '#'+scope.id+'_leftSelected',
				        leftAll:  '#'+scope.id+'_leftAll',
						beforeMoveToRight: function($left, $right, option){
							if(scope.isViewMode){
								return false;
							}else{
								return true;
							}
						},
						beforeMoveToLeft:  function($left, $right, option){
							if(scope.isViewMode){
								return false;
							}else{
								return true;
							}
						},
						afterMoveToRight: function($left, $right, option){
							if(!scope.isViewMode)
							getSelectedValues($left,$right);
							removeHighlight();
						},
						afterMoveToLeft:  function($left, $right, option){
							if(!scope.isViewMode)
							getSelectedValues($left,$right);
							removeHighlight();
						}
					});
					scope.multiselectFrom = getMultiSelectListValues(scope.multiSelectFrom,scope.nameKey,scope.idKey);
					scope.multiSelectTo = getMultiSelectListValues(scope.multiSelectTo,scope.nameKey,scope.idKey);
					scope.$watch('multiSelectFrom',function(newValue,oldValue){
						if(newValue){
							scope.multiselectFromActualValues = getMultiSelectListValues(scope.multiSelectFrom,scope.nameKey,scope.idKey);
							removeSelectedValuesFromAvailableValues();
							scope.multiSelectFromLength = scope.multiselectFromActualValues.length;
						}else{
							scope.multiSelectFromLength = 0;
						}
					},true)

					scope.$watch('multiSelectTo',function(newValue,oldValue){
						scope.multiSelectToActualValues = getMultiSelectListValues(scope.multiSelectTo,scope.nameKey,scope.idKey);
						if(newValue){
							scope.multiSelectToLength = scope.multiSelectToActualValues.length;
						}else{
							scope.multiSelectToLength = 0;
						}
					},true)
				},10)
			});

			function removeHighlight(){
				$('.bootstrap-rightside > option').each(function() {	
					$(this).attr("selected",false);
				});	
				$('.bootstrap-leftside > option').each(function() {
					$(this).attr("selected",false);
				});
			}

			/* checks removeSelectedValuesFromAvailable 
			 * and removes the existing */
			var removeSelectedValuesFromAvailableValues = function removeSelectedValuesFromAvailableValues(){
				if(scope.removeSelectedValuesFromAvailable){
					angular.forEach(scope.multiSelectTo,function(value,key){
						angular.forEach(scope.multiSelectFrom,function(availableValues,index){
							if(value.dummy_id == availableValues.dummy_id){
								scope.multiSelectFrom.splice(index,1);
							}
						})
					})
				}
			}

			/**
			 * when values are being selected they are updated to the controller scope */
			var getSelectedValues = function($left,$right){
				values = [];
				scope.selectedValues = [];
				scope.multiSelectFromLength = $left[0].length;
				scope.multiSelectToLength = $right[0].length;
				angular.forEach($right[0],function(value,key){
					values.push(JSON.parse($(value).attr('attr')));
				})
				scope.selectedValues = values;
				scope.$apply(function(){
					modelSetter(scope,values);
				});
			}
		},
		/**
		 * isolated scope of directive */
		scope: {
			multiSelectFrom: "=",
			multiSelectTo: "=",
			selectedValues :"=ngModel",
			nameKey:"@",
			idKey:"@",
			ngModel:"@",
			isViewMode: "=",
			multiSelectFromLabel: "@",
			multiSelectToLabel: "@",
			removeSelectedValuesFromAvailable : "@",
			size:"@",
			id:"@"
		}
	};
}])





