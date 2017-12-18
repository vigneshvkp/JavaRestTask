package com.ux.dg.ui.api.dao;

import java.io.File;
import java.io.IOException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.xml.sax.SAXException;



public class XpathParser {
public static void main(String[] args) throws ParserConfigurationException, SAXException, IOException, XPathExpressionException {
	DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	 //   factory.setNamespaceAware(false); // never forget this!
	    DocumentBuilder builder = factory.newDocumentBuilder();
	    File file = new File("C:\\DynamicGeneration\\SelectProductXML\\ProductsCoreProdDev\\Edge\\EdgeSourceRefactored_LLVAN-1.xml");
	    Document doc = builder.parse(file);

	    XPathFactory xPathFactory = XPathFactory.newInstance();
	    XPath xpath = xPathFactory.newXPath();

	    XPathExpression xPathExpression = xpath.compile("//Screens");

	   Object result = xPathExpression.evaluate(doc, XPathConstants.NODESET);

	    System.out.println(result.toString());
}
}
