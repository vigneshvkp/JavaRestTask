package com.ux.dg.ui.api.services;

import com.ux.dg.ui.api.beans.Products;
import com.ux.dg.ui.api.beans.UIDefinition;
import com.ux.dg.ui.api.beans.Variants;
import com.ux.dg.ui.api.beans.RefactoredXmlGenConf;
import com.ux.dg.ui.api.beans.Scheme;
import com.ux.dg.ui.api.beans.Screen;
import com.ux.dg.ui.api.dao.ProductDao;
import com.ux.dg.ui.api.beans.Screens;
import com.ux.dg.ui.utility.AppException;
import com.ux.dg.ui.utility.ReadProperties;
import com.ux.dg.ui.utility.XmlManipulator;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;

import com.ux.dg.ui.api.beans.Clone;
import com.ux.dg.ui.api.beans.Clones;
import com.ux.dg.ui.api.beans.Field;
import com.ux.dg.ui.api.beans.Fields;
import com.ux.dg.ui.api.beans.Panel;
import com.ux.dg.ui.api.beans.Product;

public class ProductService {

	ProductDao productsDao = new ProductDao();
	public Products getProducts() throws AppException {
		Products products = null;
		products = productsDao.getProducts();
		if(products == null) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"No Products Found");
		}
		return products;
	}

	public Variants getVariantsForProduct(String productCode) throws AppException {
		Variants variants = new Variants();
		ProductDao productDao = new ProductDao();
		Products products = productDao.getProducts();
		Clones clones = productDao.getClones();
		if(products != null) {
			List<Product> productList = products.getProduct();
			for (Product product : productList) {
				if (productCode.equals(product.getProductCode())) {
					variants.setProduct(product);
					variants.setScheme(product.getSchemes().getScheme());
					break;
				}
			}
		}
		if(clones != null) {
			List<Clone> cloneList = clones.getClone();
			List<Clone> listOfClones = new ArrayList<Clone>();	
			for (Clone clone : cloneList) {
				if (productCode.equals(clone.getCloneFromCode())) {
					listOfClones.add(clone);
				}
			}
			variants.setClone(listOfClones);
		}
		return variants;
	}
	
	public boolean saveClonedProduct(Clone cloneDetail) throws AppException {
		Products products = getProducts();
		Clones clones = new Clones();
		Product selectedproduct = null;
		if(products != null) {
			List<Product> productList = products.getProduct();
			for (Product product : productList) {
				if (cloneDetail.getCloneCode().equals(product.getProductCode())) {
					selectedproduct = product;
					break;
				}
				else {
					List<Scheme> schemeList = product.getSchemes().getScheme(); 
					for(Scheme scheme :schemeList) {
						if(cloneDetail.getCloneCode().equals(scheme.getSchemeCode())) {
							selectedproduct = new Product();
							selectedproduct.setProductCode(product.getProductCode());
							selectedproduct.setBusinessDescription(scheme.getBusinessDescription());
							selectedproduct.setEffectiveFrom(scheme.getEffectiveFrom());
							selectedproduct.setFile(scheme.getFile());
						}
					}
				}
			}
			Clone clone = new Clone();
			clone.setCloneDescription(selectedproduct.getBusinessDescription());
			clone.setCloneCode(selectedproduct.getProductCode());
			clone.setCloneFromSchemeCode(cloneDetail.getCloneCode());
			clone.setCloneFromFile(selectedproduct.getFile());
			clone.setCloneFromCode(selectedproduct.getProductCode());
			clone.setCloneFromDescription(selectedproduct.getBusinessDescription());
			clone.setCloneName(cloneDetail.getCloneName());
			clone.setCloneEffectiveFrom(selectedproduct.getEffectiveFrom());
			clone.setCloneEffectiveTo(null);
			clone.setCloneCurrentRevision("1");
			clone.setLifeCycleStatus("CheckedIn");
			clone.setCloneReason(cloneDetail.getCloneReason());	
			clone.setCloneFile("EdgeSourceRefactored_"+ cloneDetail.getCloneName().replaceAll("\\s+","") +"_"+ cloneDetail.getCloneCode() +"-1.xml");
			clones = productsDao.getClones();
			List<Clone> list = new ArrayList<Clone>();
			if(clones != null) {
				 list = clones.getClone();
			} else {
				clones = new Clones();
			}
			list.add(clone);
			clones.setClone(list);
			productsDao.updateCloneXml(clones);
			createCloneXmls(clone);
		}
		return true;
	}
	
	public void createCloneXmls(Clone cloneDetail) throws AppException {
		createCopyCloneXml(cloneDetail.getCloneFromFile(), cloneDetail.getCloneFile());
		productsDao.createCloneXmls(cloneDetail, ReadProperties.returnFilePath() +
				 "EdgeSourceRefactoredDifferences_"+ cloneDetail.getCloneName().replaceAll("\\s+","") +"_"+ cloneDetail.getCloneCode() +"-1.xml");
		productsDao.createCloneXmls(cloneDetail, ReadProperties.returnFilePath() +
				 "EdgeSourceRefactoredModified_"+ cloneDetail.getCloneName().replaceAll("\\s+","") +"_"+ cloneDetail.getCloneCode() +"-1.xml");
	}
	
	public void createCopyCloneXml(String sourceFileName, String destinationFileName) throws AppException {
		FileInputStream instream = null;
		FileOutputStream outstream = null;
	 
	    	try{
	    	    File infile = new File(ReadProperties.returnFilePath() + sourceFileName);
	    	    File outfile = new File(ReadProperties.returnFilePath() + destinationFileName);
	 
	    	    instream = new FileInputStream(infile);
	    	    outstream = new FileOutputStream(outfile);
	 
	    	    int c; 
	             while((c=instream.read())!=-1) 
	            	 outstream.write((char)c);
	    	    instream.close();
	    	    outstream.close();
	 
	    	}catch(IOException ioe){
	    		throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
						"Unable to locate the "+ sourceFileName + " inside Edge Folder");
	    	 }
	}
	
	public List<Clone> getClones(String selectedProductCode) throws AppException {
		Clones clones = productsDao.getClones();
		List<Clone> cloneList = clones.getClone();
		List<Clone> selectedClones = new ArrayList<Clone>();
		
		for (Clone clone : cloneList) {
			if (selectedProductCode.equals(clone.getCloneFromCode())) {
				selectedClones.add(clone);
			}
		}
		return selectedClones;
	}
	
	public UIDefinition getRefactoredProductXml(String fileName) throws AppException {
		UIDefinition uiDefinition = null;
		uiDefinition = productsDao.getRefactoredProductXml(fileName);
		return uiDefinition;
	}
	
	public boolean createDiffRefactoredProductXml(RefactoredXmlGenConf refactoredXmlGenConf) {
		String differenceXmlString = refactoredXmlGenConf.getDifferenceXmlString();
		String deNormalisedXml = XmlManipulator.denormalize(differenceXmlString);
	    XmlManipulator.writeFile(ReadProperties.returnFilePath() + refactoredXmlGenConf.getFileName(), deNormalisedXml);
		return true;
	}
	
	public boolean createModifiedRefactoredProductXml(RefactoredXmlGenConf refactoredXmlGenConf) {
		
		String modifiedXmlString = refactoredXmlGenConf.getModifiedXmlString();
		String deNormalisedXml = XmlManipulator.denormalize(modifiedXmlString);
    	XmlManipulator.writeFile(ReadProperties.returnFilePath() + refactoredXmlGenConf.getFileName(), deNormalisedXml);
    	return true;
	}

	 // Added for screens page
    public Screens getScreensForVariant(String fileName) throws AppException {
        // TODO Auto-generated method stub
        ProductDao productsDao = new ProductDao();
        Screens screens = productsDao.getScreens(fileName);
        return screens;
    }
    // Ended for screens page
    
    public Fields getFieldsForScreens(String fileName, String screenID) throws AppException {
		ProductDao productsDao = new ProductDao();
		Screens screens = productsDao.getScreens(fileName);
		
		List<Field> field = new ArrayList<>();
		for (Screen screen : screens.getScreen()) {
			if (screenID.equals(screen.getId())) {
				List<Panel> panels = screen.getPanel();
				for (Panel panel : panels) {
					field.addAll(panel.getField());
				}
				break;
			}
		}
        
		Fields fields = new Fields();
		fields.setField(field);

		return fields;
	}
    
	public String retrieveDiffRefactoredProductXml(String fileName) throws AppException {
		String diffXml = productsDao.retrieveRefactoredDiffProductXml(fileName);
		return diffXml;
	}
}
