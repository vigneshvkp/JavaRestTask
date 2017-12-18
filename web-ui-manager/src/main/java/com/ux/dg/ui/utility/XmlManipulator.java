package com.ux.dg.ui.utility;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class XmlManipulator {

	public static void writeFile(String fileName, String fileContent) {
    	try { 
			PrintWriter differenceXmlWriter = new PrintWriter(fileName, "UTF-8");
			differenceXmlWriter.write(fileContent);
			differenceXmlWriter.flush();
			differenceXmlWriter.close();
			
    	} catch(IOException ioe) {
    		ioe.printStackTrace();
    	 }
	}
	
	/**
	 * Denormalise a xml string replacing the escaped characters with the actual
	 * 
	 * @parameters String xml
	 * @return String denormalised string
	 */
	public static String denormalize(String xml) {

		xml = regExReplace(xml, "&#x27;", "\'");
		xml = regExReplace(xml, "&#x2F;", "/");
		xml = regExReplace(xml, "&gt;", ">");
		xml = regExReplace(xml, "&quot;", "\"");
		xml = regExReplace(xml, "&apos;", "\'");
		xml = regExReplace(xml, "&#xD;", "");
			
		return xml;

	}
	/**
	 * Replace the xmlString with the given pattern and replacement value
	 * 
	 * @parameters String xml, String pattern, String replacement
	 * @return String processed string
	 */
	private static String regExReplace(String xmlString, String pattern, String replacement) {
	    Pattern p = Pattern.compile(pattern);
	    String r = replacement;
	    
	    Matcher m = p.matcher(xmlString); 
	    StringBuffer sb = new StringBuffer();
	    while (m.find()) {
	      m.appendReplacement(sb, r);
	    }
	    m.appendTail(sb);
	    return sb.toString();
	}
}
