package com.ux.dg.ui.api.dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import javax.ws.rs.core.Response;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import com.ux.dg.ui.api.beans.Selenium;
import com.ux.dg.ui.utility.AppException;
import com.ux.dg.ui.utility.ReadProperties;

public class SeleniumDao {
	public Selenium getScreens(String fileName) throws AppException {
		
		Selenium screens = null;
        JAXBContext jaxbContext;
        try {
            File file = new File(ReadProperties.returnFilePath() + fileName);
            jaxbContext = JAXBContext.newInstance(Selenium.class);
            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            screens = (Selenium) jaxbUnmarshaller.unmarshal(file);
        } catch (JAXBException jaxbException) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Unable to locate the "+ fileName + " inside Edge folder");
		} 
		catch (Exception e) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Internal Exception Occured");
		}
        return screens;
    }
	
	public String retrieveDiffSeleniumXml(String fileName) throws AppException {
		StringBuilder sb = new StringBuilder();
		try {
			File file = new File(ReadProperties.returnFilePath() + fileName);
			BufferedReader br = new BufferedReader(new FileReader(file));
			String line;
			while((line = br.readLine())!= null){
			    sb.append(line.trim());
			}
			br.close();
		} catch (Exception e) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Internal Exception Occured");
		}

		return sb.toString();
	}
}
