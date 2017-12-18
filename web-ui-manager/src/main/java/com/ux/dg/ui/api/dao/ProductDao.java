package com.ux.dg.ui.api.dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;

import javax.ws.rs.core.Response;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import com.ux.dg.ui.api.beans.Clone;
import com.ux.dg.ui.api.beans.Clones;
import com.ux.dg.ui.api.beans.Products;
import com.ux.dg.ui.api.beans.Screens;
import com.ux.dg.ui.api.beans.UIDefinition;
import com.ux.dg.ui.utility.AppException;
import com.ux.dg.ui.utility.ReadProperties;

public class ProductDao {

	public Products getProducts() throws AppException {
		Products products = null;
		JAXBContext jaxbContext;
		try {
			String filePath = ReadProperties.returnFilePath() + "Products.xml";
			File file = new File(filePath);
			jaxbContext = JAXBContext.newInstance(Products.class);
			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			products = (Products) jaxbUnmarshaller.unmarshal(file);
		} catch (JAXBException jaxbException) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Unable to locate the Products.xml inside Edge folder");
		} catch (Exception exception) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Internal Exception Occured");
		}

		return products;
	}
	
	public void updateCloneXml(Clones clones) throws AppException {
		File file = new File(ReadProperties.returnFilePath() + "ClonedProducts.xml");
		try {
			JAXBContext contextObj = JAXBContext.newInstance(Clones.class);
			Marshaller marshallerObj = contextObj.createMarshaller();  
			marshallerObj.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			marshallerObj.marshal(clones, new FileOutputStream(file));
		} catch (FileNotFoundException e) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Internal Exception Occured");
		}
		catch (JAXBException e) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Unable to locate the ClonedProducts.xml inside Edge folder");
		}
		catch (Exception e) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Some Internal Exception Occured");
		}
	}
	
	public void createCloneXmls(Clone cloneDetail, String fileName) throws AppException {
		try {
			JAXBContext contextObj = JAXBContext.newInstance(Clone.class);
			Marshaller marshallerObj = contextObj.createMarshaller(); 
			marshallerObj.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			marshallerObj.marshal(cloneDetail, new FileOutputStream(fileName));
		} catch (JAXBException jaxbException) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Unable to locate the "+ fileName + " inside Edge folder");
		} catch (Exception exception) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Internal Exception Occured");
		}
	}
	
	public Clones getClones() throws AppException {
		Clones clones = null;
		JAXBContext jaxbContext;
		File file = new File(ReadProperties.returnFilePath() + "ClonedProducts.xml");
		try {
			if(file.exists()) {
				jaxbContext = JAXBContext.newInstance(Clones.class);
				Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
				clones = (Clones) jaxbUnmarshaller.unmarshal(file);
			}
		} catch (JAXBException jaxbException) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Unable to locate the ClonedProducts.xml inside Edge folder");
		} 
		catch (Exception e) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Internal Exception Occured");
		}
		return clones;
	}
	
	public UIDefinition getRefactoredProductXml(String fileName) throws AppException {
		UIDefinition uiDefinition = null;
		JAXBContext jaxbContext;
		try {
			File file = new File(ReadProperties.returnFilePath() + fileName);
			jaxbContext = JAXBContext.newInstance(UIDefinition.class);
			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			uiDefinition = (UIDefinition) jaxbUnmarshaller.unmarshal(file);
		} catch (JAXBException jaxbException) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Unable to locate the "+ fileName + " inside Edge folder");
		} 
		catch (Exception e) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Internal Exception Occured");
		}

		return uiDefinition;
	}
    // For screens page 
    public Screens getScreens( String fileName) throws AppException {
        UIDefinition definition = null;
        JAXBContext jaxbContext;
        try {
            File file = new File(ReadProperties.returnFilePath() + fileName);
            jaxbContext = JAXBContext.newInstance(UIDefinition.class);
            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            definition = (UIDefinition) jaxbUnmarshaller.unmarshal(file);
        } catch (JAXBException jaxbException) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Unable to locate the "+ fileName + " inside Edge folder");
		} 
		catch (Exception e) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"Internal Exception Occured");
		}
        return definition.getScreens();
    }
    // Ended for screens page
    
	public String retrieveRefactoredDiffProductXml(String fileName) throws AppException {
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
