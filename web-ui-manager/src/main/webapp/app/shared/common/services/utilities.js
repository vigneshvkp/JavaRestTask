app.service("UtilitiesService", ['$log', 'x2js', 'ConfigurableConstants','DTOptionsBuilder','DTColumnDefBuilder',
	function($log, x2js, ConfigurableConstants, DTOptionsBuilder, DTColumnDefBuilder) {
	
	var stateObserverCallbacks = [];
	var self = this;
	var isSchemeDifferences = false;
	var additionJSON = {};
	var deletionJSON = {};
	var referenceObject = {};
	var pathString = "product";
	var deletedPath = null;
	var diffs1 = [];
	var additionsXML = {};
	var deletionsXML = {};
	
	/*	Generates the dataTableOptions
	 * @param {Integer} Count of No.of column filters for the Data table
	 * @param {Integer} Count of No.of columns for which sorting needs to be disabled 
	 * returns dataTableOptions*/
	this.getDataTableOptions = function(count, sortableColumnCount, totalColumn, iDataSort) {
		var dataTableOptions = {};
		var selectFilterObject = {};
		var settings;
		dataTableOptions.rowCount = ConfigurableConstants.tableOptions.PER_PAGE_ROW_COUNT;
		dataTableOptions.enableFilter = ConfigurableConstants.tableOptions.ENABLE_FILTER;
		if(dataTableOptions.enableFilter){
			var aoColumnsArray = [];
			var textFilterObject =   {type: 'text', bRegex: true, bSmart: true};
			for(var index = 0; index < count ; index++) {
				aoColumnsArray.push(textFilterObject);
			}
			dataTableOptions.dtOptions = DTOptionsBuilder.newOptions();
			//dataTableOptions.dtOptions.withColumnFilter({sPlaceHolder: "head:after", aoColumns: aoColumnsArray});
			dataTableOptions.dtOptions.withOption('preDrawCallback', function( tableSettings ) {
				settings = tableSettings;
				if(settings.aoData.length <= ConfigurableConstants.tableOptions.PER_PAGE_ROW_COUNT){
					setTimeout(function(){
						angular.element(tableSettings.nTable).find("thead tr" ).each(function( index ) {
							if($(this).find('span').hasClass('filter_column')){
								$(this).addClass('hide');
							}else{
								$(this).removeClass('hide');
							}
						});
					}, 1);
				}
			})
			dataTableOptions.dtOptions.withOption('drawCallback', function( tableSettings ) {
				var list = angular.element(tableSettings.nTableWrapper).find('.dataTablePaginateContainer li');
				if(list.length <=3){
					list.removeClass('active').addClass('disabled');
				}
				$('.paginate_button.previous').each(function() {
					$(this).attr('title', 'Previous');
				});
				$('.paginate_button.next').each(function() {
					$(this).attr('title', 'Next');
				});
			})
		}
		else{
			dataTableOptions.dtOptions = DTOptionsBuilder.newOptions();
			dataTableOptions.dtOptions.withOption('headerCallback', function( row ) {
				angular.element(row).addClass('hide');
			})
		}

		dataTableOptions.dtOptions.withOption('language', {
			zeroRecords: ConfigurableConstants.tableOptions.ZERO_RECORD_MESSAGE, 
			paginate: {
				next: '<img src="assets/img/next-arw.png">',
				previous: '<img src="assets/img/prev-arw.png">'
			}});
		dataTableOptions.dtOptions.withOption('bAutoWidth', false);
		dataTableOptions.dtOptions.withOption('bLengthChange', false);
		dataTableOptions.dtOptions.withDOM('lrtip');
		dataTableOptions.dtOptions.withOption('sDom', '<"dataTableContainer table-responsive"t><"dataTablePaginateContainer" p >');
		dataTableOptions.dtOptions.withOption('iDisplayLength', ConfigurableConstants.tableOptions.PER_PAGE_ROW_COUNT);
		dataTableOptions.columnDefs = this.getColumnDefOptions(count, sortableColumnCount,iDataSort);
		return dataTableOptions;
	};

	/*Returns columnDef options for the dataTable
	 ** @param {Integer} Count of No.of column filters for the Data table
	 * @param {Integer} Count of No.of columns for which sorting needs to be disabled 
	 * returns columnDef options*/
	this.getColumnDefOptions = function(count, sortableColumnCount, iDataSort) {
		var columnDefArray = [];
		var columnDef = '';
		for(var index = 0; index < count ; index++) {
			if(iDataSort && iDataSort[index]) {

				columnDef = DTColumnDefBuilder.newColumnDef(index).withOption('iDataSort', iDataSort[index]);
			}
			else {
				columnDef = DTColumnDefBuilder.newColumnDef(index);
			}
			columnDefArray.push(columnDef);
		}
		for(var index = count ; index <= count+sortableColumnCount ; index++) {
			columnDef = DTColumnDefBuilder.newColumnDef(index).notSortable();
			columnDefArray.push(columnDef);
		}
		return columnDefArray;
	};

	
	/*
	 * Finding the difference between two json Objects.
	 * @object1 - Retrieved Product
	 * @object2 - Scheme Input
	 * 
	 */
	this.determineJSONDifferences = function(object1, object2) {
		isProductDifferences = true;
		var jsonProductDiffRequest = {};
		
		/* Does not need to take the existing differences */
		//additionJSON = ProductsService.retrievedScheme.xmlChanges && ProductsService.retrievedScheme.xmlChanges.xmlAdditions ? angular.copy(ProductsService.retrievedScheme.xmlChanges.xmlAdditions) : {};
		//deletionJSON = ProductsService.retrievedScheme.xmlChanges && ProductsService.retrievedScheme.xmlChanges.xmlDeletions ? angular.copy(ProductsService.retrievedScheme.xmlChanges.xmlDeletions) : {};
		var obj = {};
		obj.xmlAdditions = {};
		obj.xmlAdditions.difference = {};
		obj.xmlAdditions.difference.xPath = {};
		obj.xmlAdditions.difference.value = {};
		additionsXML = koukiaXMLDocument(obj);
		obj = {};
		obj.xmlDeletions = {};
		obj.xmlDeletions.difference  = {};
		obj.xmlDeletions.difference.xPath = {};
		obj.xmlDeletions.difference.value = {};
		deletionsXML = koukiaXMLDocument(obj);

		var obj = {};
		delete object1.documentConfig; // Since it is not required for this
		obj = object1;
		object1 = koukiaXMLDocument(obj);
		delete object2.documentConfig; 
		obj = object2;
		object2 = koukiaXMLDocument(obj);
		
		findChanges(object2, object1,"additions");
		findChanges(object2, object1, "deletions");

		additionJSON = x2js.xml2json(additionsXML);
		deletionJSON = x2js.xml2json(deletionsXML);
		jsonProductDiffRequest.xmlChanges = {};
		jsonProductDiffRequest.xmlChanges.xmlAdditions = additionJSON.xmlAdditions;
		jsonProductDiffRequest.xmlChanges.xmlDeletions = deletionJSON.xmlDeletions;
		return jsonProductDiffRequest;
	}

	/*
	 * Compares two xml objects node by node, returning an xml list of nodes that have been added or changed, or removed.
	 * @obj1 - Target Object
	 * @obj2 - Original Object
	 * @type - Addition and Deletions 
	 *  
	 */
	function findChanges(obj1, obj2, type) {
		var pathArray = new Array();
		if (type == "additions") {
			var n = obj1.firstChild; // Current product scheme update 
		} else {
			var n = obj2.firstChild;
		}
		pathArray[0] = n.nodeName; // Object first node - product
		var i=0;

		while (n) { // iterate object
			if (!(n.firstChild && n.firstChild.nodeName != "#text") || (type == "deletions" && n.nodeName == "termsAndConditionTemplate")) { //doubt
				var returnArray = traverseByLevel(n, 0);
				if (!returnArray) {
					n = null;
				} else {
					n = returnArray[0];
					i = i - returnArray[1];
					pathArray = pathArray.slice(0, i);
					pathArray = modifyScreenPathArray(obj1, obj2, n, pathArray, i, type);
				}
			} else {
				// update first node reassign to  n 
				n = n.firstChild;
				i++;
				pathArray = modifyScreenPathArray(obj1, obj2, n, pathArray, i, type);
			}
		}
	}
	/*
	 * Traversing the tree node by levels
	 * @node - current node
	 * @levels - current level in the tree
	 * return next sibling node and current level 
	 */
	function traverseByLevel(node, levels) {
		if (!node) {
			return null;
		}
		if (node.nextSibling) {
			return new Array(node.nextSibling, levels);
		} else {
			levels++;
			var nextArray = traverseByLevel(node.parentNode, levels);
			if (!nextArray) {
				return nextArray;
			}
			return new Array(nextArray[0], nextArray[1]);
		}
	}
	/*
	 * Compare the two XML objects by paths
	 * @obj1 - Target Object 
	 * @obj2 - Source Object
	 * @pathArray -  Path Array
	 * @type - additions or deletions
	 */
	function doComparison(obj1, obj2, pathArray, type) {
		var changed = false;
		var fullPath = pathArray[0];
		var len = pathArray.length;
		for (var j=1; j<len; j++) {
			fullPath += "/" + pathArray[j];
		}

		if (type == "additions") {
			var thisNode =  self.SelectSingleNode(obj1,fullPath);

			if(thisNode){
				//don't do comparison for scheme code and version id in product because it is not required
				//if(thisNode.nodeName != 'schemeCode' &&  thisNode.nodeName != 'versionId'){
					if ((thisNode.firstChild && thisNode.firstChild.nodeName == "#text") || !thisNode.firstChild) {
						var originalNode = self.SelectSingleNode(obj2,fullPath);
						if (originalNode) {
							if (getValueFromNode(originalNode) != getValueFromNode(thisNode)) {
								changed = true;
							}
						} else {
							changed = true;
						} 
					}	
				//} 
			} 
		}

		if (type == "deletions") {
			//is this node a child of the one previously deleted? If so, no need to record it
			var encodedFullPath = encodeURIComponent(fullPath);
			var encodedDeletedPath = encodeURIComponent(deletedPath);
			//extra escape to handle screens with other characters (eg brackets) in the name
			encodedFullPath = escape(encodedFullPath);
			encodedDeletedPath = escape(encodedDeletedPath);

			if (encodedFullPath.search(encodedDeletedPath) == -1) {
				//does this node exist in the new xml?
				if (!self.SelectSingleNode(obj1, fullPath)) {
					changed = true;
					deletedPath = fullPath;
				}
			}
		}

		if (changed) {
			if (type == "additions") {
				var diffXML = additionsXML;
				var rootNodeName = "xmlAdditions";
			} else {
				var diffXML = deletionsXML;
				var rootNodeName = "xmlDeletions";
			}


			var isEmpty = true;
			var diff = self.SelectSingleNode( diffXML, rootNodeName+"/difference");
			if(diff){
				var xPathNode = self.SelectSingleNode(diff, "xPath");
				if ( getValueFromNode(xPathNode) != "") { // if the xpath value is present, then 
					isEmpty = false;
					diff = self.SelectSingleNode(diffXML, rootNodeName+"/difference").cloneNode(true);
				}
				assignValueFromNode(self.SelectSingleNode(diff, "xPath"),fullPath); // Changing the node by reference
				if (type == "additions") {
					assignValueFromNode(self.SelectSingleNode(diff, "value"),getValueFromNode(thisNode));
				}
				if (!isEmpty) {
					self.SelectSingleNode(diffXML, rootNodeName).appendChild(diff);
				}
			}
		}
	}

	/*
	 * Merge xml difference - original XML and diffXML
	 * 
	 */
	this.mergeXMLDifferences = function(originalXML, diffXML) {
		originalXML = koukiaXMLDocument(originalXML);
		diffXML =  koukiaXMLDocument(diffXML);
		//remove deleted nodes/attributes from the original xml
		var diffs = this.SelectNodes(diffXML, "//xmlDeletions/difference[xPath!='']");
		for (var i=0; i<diffs.length; i++) {
			var thisPath = getValueFromNode(this.SelectSingleNode(diffs[i], "xPath"));

			//check whether this is a node or an attribute
			var pathArray = thisPath.split("/");
			var finalPart = pathArray[pathArray.length-1];
			var ampIndex = finalPart.indexOf("@");
			if (ampIndex == 0) {
				var attName = finalPart.split("@")[1];
				//build up parent node path
				var parentPath = "";
				for (var j=0; j<pathArray.length-1; j++) {
					parentPath += pathArray[j];
					if (j<pathArray.length-2) {
						parentPath += "/";
					}
				}
				self.SelectSingleNode(originalXML, parentPath).removeAttribute(attName);  
			} else {
				var nodeInProductXML = self.SelectSingleNode(originalXML, thisPath);
				if(nodeInProductXML != null){
					nodeInProductXML.parentNode.removeChild(nodeInProductXML);
				}
			}
		}

		//process additions/modifications
		diffs = this.SelectNodes(diffXML, "//xmlAdditions/difference[xPath!='']");//diffXML.selectNodes("//xmlAdditions/difference[xPath!='']");
		for (var i=0; i<diffs.length; i++) {
			var thisPath = self.SelectSingleNode(diffs[i],"xPath");
			var thisValue = self.SelectSingleNode(diffs[i],"value");
			originalXML = this.processXPathAncestry(originalXML, getValueFromNode(thisPath), getValueFromNode(thisValue));
		}

		return originalXML;
	}

	/*
	 * Applying the XPath and its value in original XML 
	 * @originalXML - Original XML
	 * @thisPath - XPath of the element
	 * @thisValue - Value of the element 
	 * 
	 */
	this.processXPathAncestry = function(originalXML, thisPath, thisValue) {
		var pathArray = thisPath.split("/");
		var newPath = "";
		for (var j=0; j<pathArray.length; j++) {
			var parentPath = angular.copy(newPath);
			if (j>0) {
				newPath += "/";
			}
			newPath = newPath + pathArray[j];

			//if this is an attribute, set it and return
			var ampIndex = pathArray[j].indexOf("@");
			if (ampIndex == 0) {
				var thisAttName = pathArray[j].split("@")[1];
				self.SelectSingleNode(originalXML,parentPath).setAttribute(thisAttName, thisValue);
				return originalXML;
			}

			var checkNode = self.SelectSingleNode(originalXML,newPath);
			if (!checkNode) {		
				//if the node doesn't exist, create it
				var tempArray = pathArray[j].split("[");
				var newNodeName = tempArray[0];
				var newNode = originalXML.createElement(newNodeName);
				if (j == pathArray.length-1) {
					assignValueFromNode(newNode,thisValue);
				}
				//create qualifier node if necessary
				if (tempArray[1]) {
					var qualifierArray = new Array();
					var qualifierString = tempArray[1].split("]")[0];

					if (qualifierString.search("' and ") != -1) {
						//the node has multiple qualifiers
						var qArray = qualifierString.split("' and ");
						for (var k=0; k<qArray.length; k++) {
							qualifierArray[k] = qArray[k];
						}
					} else {
						qualifierArray[0] = qualifierString;
					}

					//add all qualifiers
					for (var k=0; k<qualifierArray.length; k++) {
						var qualifierInfoArray = qualifierArray[k].split("=");
						var qualifierProperty = qualifierInfoArray[0];
						var qualifierValue = qualifierInfoArray[1].split("'")[1];

						//check whether we're adding a node or attribute qualifier
						ampIndex = qualifierProperty.indexOf("@");
						if (ampIndex == 0) {
							var thisAttName = qualifierProperty.split("@")[1];
							newNode.setAttribute(thisAttName, qualifierValue);
						} else {
							if (qualifierProperty != ".") {
								var qualNode = originalXML.createElement(qualifierProperty);
								assignValueFromNode(qualNode,qualifierValue);
								newNode.appendChild(qualNode);
							}
						}
					}
				}
				var node = self.SelectSingleNode(originalXML, parentPath);
				if(node != null)
					node.appendChild(newNode);

			} else {			
				//set the value if it's the last node in the path
				if (j == pathArray.length-1) {
					assignValueFromNode(checkNode,thisValue);
				}
			}
		}

		return originalXML;
	}


	/*
	 * Selecting single node in the xml document 
	 * @xmlDoc - XML Document Object 
	 * @elementPath - XPath of an element
	 * return single node 
	 */
	this.SelectSingleNode = function(xmlDoc, elementPath){
		var nodes,results;
		if(self.isIE()){
			if(xmlDoc){
				nodes = xmlDoc.selectSingleNode(elementPath);
				return nodes;
			}
		}else{ 
			nodes=document.evaluate(elementPath, xmlDoc, null, XPathResult.ANY_TYPE, null);
			results=nodes.iterateNext();
			return results;    
		}
	}


	/*
	 * To iterate nodes values in an array
	 * @xmlDoc - XML Document Object
	 * @elementPath - Xpath of the element
	 * return nodesArray 
	 */
	this.SelectNodes = function(xmlDoc, elementPath){ 
		var resultArray = [];
		var diffs = [];
		if(window.navigator.userAgent.indexOf('MSIE') > 0 || window.navigator.userAgent.indexOf('Trident') > 0){
			resultArray = xmlDoc.selectNodes(elementPath);
		}else{
			var results = document.evaluate(elementPath, xmlDoc, null, XPathResult.ANY_TYPE, null);
			var iter = results.iterateNext();
			while (iter) {
				resultArray.push(iter);   
				iter = results.iterateNext();
			}
		}
		return resultArray;
	}

	/*
	 * Logic to for Truncating text
	 *
	 */
	this.truncateLogic = function(displayName){
		var limitValue;
		var wordCount = displayName.split(' ').length;
		var islimitExceeded = false
		for(i=0;i<wordCount;i++){
			if(displayName.split(" ")[i].length > 20){
				islimitExceeded = true;
			}					
		}			
		if(islimitExceeded){
			limitValue = 20;
		}
		else{
			limitValue = 52;
		}

		return limitValue;
	}

	/*
	 * Method to get value from node
	 * @textNode - text node which is specific to browser
	 *  
	 */
	function getValueFromNode(textNode){
		if(textNode)
			if(textNode.innerHTML || textNode.innerHTML == ""){
				return textNode.innerHTML;
			}else if(textNode.textContent || textNode.textContent == "" ){
				return textNode.textContent;
			}else if(textNode.text || textNode.text == ""){
				return textNode.text;
			}	
	}

	/*
	 * Method to assign value from node
	 * @textNode - text node which is specific to browser
	 * @value - value that needs to assign 
	 * 
	 */
	function assignValueFromNode(textNode,value){
		if(textNode){
			if(textNode.innerHTML || textNode.innerHTML == ""){
				textNode.innerHTML = value;
			}else if(textNode.textContent || textNode.textContent == "" ){
				textNode.textContent = value;
			}else if(textNode.text || textNode.text == ""){
				textNode.text = value;
			}
		}	
	}
	
	function koukiaXMLDocument(thisJSON) {
		// code for IE  
		if (window.ActiveXObject) {
			var newXMLObj = new ActiveXObject("Msxml2.DOMDocument.6.0");
			newXMLObj.async = false;
			newXMLObj.setProperty("ForcedResync", false);
			if (thisJSON) {
				thisXML = x2js.json2xml_str(thisJSON)
				if (typeof(thisXML) == "string") {
					var loadStatus = newXMLObj.loadXML(thisXML);
					if (!loadStatus) {	//in case of local source eg. d:/...xml
						newXMLObj.load(thisXML);
					}

				} else {
					newXMLObj.loadXML(thisXML.xml);
				}
				newXMLObj.setProperty("SelectionLanguage", "XPath"); 
			}

			// code for  Firefox, Opera, etc.
		} else if (document.implementation && document.implementation.createDocument) {

			var newXMLObj = document.implementation.createDocument("","",null);
			newXMLObj.async = false;	
			if (typeof thisJSON == "object") {
				thisXML = x2js.json2xml_str(thisJSON)
				var parser = new DOMParser();
				newXMLObj = parser.parseFromString(thisXML, "text/xml");
			}
		} else {
			alert('Your browser cannot handle this script');
		}

		return newXMLObj;
	}
	
	/*
	 * Determine two screens differences
	 */
	var modifyScreenPathArray = function(obj1, obj2, n, pathArray, index, type){
		//specific code to distinguish repeated nodes at the same level of the screen or field xml
		if (n.nodeName == "Screen") {
			var nameAttr = n.getAttribute("name");
			if (nameAttr && nameAttr != "") {
				pathArray[index] = n.nodeName + "[@name='"+nameAttr+"']";
			} else {
				var key =  getValueFromNode(self.SelectSingleNode(n,"id"));
				pathArray[index] = n.nodeName + "[id='"+key+"']";
			}
	  	} else if(n.nodeName == "Panel"){
	  		var key = getValueFromNode(self.SelectSingleNode(n,"id"));
	  		pathArray[index] = n.nodeName + "[id='"+key+"']";
	  	} else if(n.nodeName == "Field"){
	  		var key = getValueFromNode(self.SelectSingleNode(n,"id"));
	  		pathArray[index] = n.nodeName + "[id='"+key+"']";
	  	}else if (n.getAttribute("id") && n.getAttribute("id") != "") {
	  		var key = n.getAttribute("id");
	  		pathArray[index] = n.nodeName + "[@id='"+key+"']";
	  	} else {
	   		pathArray[index] = n.nodeName;
	   	}
	   	doComparison(obj1, obj2, pathArray, type);
	   	   	
	   	//check node attributes
	  	var attributeArray = n.attributes;
	  	for (var k=0; k<attributeArray.length; k++) {
	  		pathArray[index+1] = "@"+attributeArray[k].name;
	  		doComparison(obj1, obj2, pathArray, type);
	  	}
	   	return pathArray;
	}
	/*
	 * Finding the difference 
	 */
	this.differenceScreenXML = function(originalScreensXML, currentScreensXML){
		isSchemeDifferences = false;
		var jsonSchemeRequest = {};
		jsonSchemeRequest.scheme = {};
		var obj = {};
		obj.xmlAdditions = {};
		obj.xmlAdditions.difference = {};
		obj.xmlAdditions.difference.xPath = {};
		obj.xmlAdditions.difference.value = {};
		additionsXML = koukiaXMLDocument(obj);
		obj = {};
		obj.xmlDeletions = {};
		obj.xmlDeletions.difference  = {};
		obj.xmlDeletions.difference.xPath = {};
		deletionsXML = koukiaXMLDocument(obj);
		
		// Converting the json to xml Node 
		originalScreensXML = koukiaXMLDocument(originalScreensXML);
		currentScreensXML = koukiaXMLDocument(currentScreensXML);
		
		findChanges(currentScreensXML, originalScreensXML, "additions");
		findChanges(currentScreensXML, originalScreensXML, "deletions");
		additionJSON = x2js.xml2json(additionsXML);
		deletionJSON = x2js.xml2json(deletionsXML);
		jsonSchemeRequest.scheme.xmlChanges = {};
		jsonSchemeRequest.scheme.xmlChanges.xmlAdditions = additionJSON.xmlAdditions;
		jsonSchemeRequest.scheme.xmlChanges.xmlDeletions = deletionJSON.xmlDeletions;
		
		return jsonSchemeRequest;
		
	}
	
	/*Returns true if the browser type is micro soft IE*/ 
	this.isIE = function() {
		var isIEBrowser = (window.navigator.userAgent.indexOf('MSIE') > 0 || window.navigator.userAgent.indexOf('Trident') > 0);
		return isIEBrowser;
	}

}])


