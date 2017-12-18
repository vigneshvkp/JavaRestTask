package com.ux.dg.ui.api.resources;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ux.dg.ui.api.beans.Clone;
import com.ux.dg.ui.api.beans.Fields;
import com.ux.dg.ui.api.beans.Products;
import com.ux.dg.ui.api.beans.UIDefinition;
import com.ux.dg.ui.api.beans.Variants;
import com.ux.dg.ui.api.beans.RefactoredXmlGenConf;
import com.ux.dg.ui.api.beans.Screens;
import com.ux.dg.ui.api.services.ProductService;
import com.ux.dg.ui.utility.AppException;

@Path("/products")
public class ProductResource {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProducts() throws AppException {
		Products products = new ProductService().getProducts();
		return Response.status(200).entity(products).build();
	}
	
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("{productCode}")
	public Response getProduct(@PathParam(value = "productCode") String productCode) throws AppException {
		Variants variants = null;
		variants = new ProductService().getVariantsForProduct(productCode);
		return Response.status(200).entity(variants).build();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/clones/{productCode}")
	public Response getClones(@PathParam(value = "productCode") String productCode) throws AppException {
		List<Clone> clones = new ProductService().getClones(productCode);
		
		return Response.status(200).entity(clones).build();
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/clones/save")
	public Response saveClone(Clone cloneDetail) throws AppException {
		boolean isSaved = false;
		isSaved = new ProductService().saveClonedProduct(cloneDetail);
		return Response.status(200).entity(isSaved).build();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("refactoredXml/retrieve/{fileName}")
	public Response getRefactoredProductXml(@PathParam(value = "fileName") String fileName) throws AppException {
		UIDefinition uiDefinition = new ProductService().getRefactoredProductXml(fileName);
		return Response.status(200).entity(uiDefinition).build();
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("refactoredDiffXml/create")
	public Response createDiffRefactoredXml(RefactoredXmlGenConf xmlConfigurations) {
		boolean isDiffXmlSaved = new ProductService().createDiffRefactoredProductXml(xmlConfigurations);
		return Response.status(200).entity(isDiffXmlSaved).build();
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("refactoredModifiedXml/create")
	public Response createModifiedRefactoredXml(RefactoredXmlGenConf xmlConfigurations) {
		boolean isModifiedXmlSaved = new ProductService().createModifiedRefactoredProductXml(xmlConfigurations);
		return Response.status(200).entity(isModifiedXmlSaved).build();
	}
    // Added for screens page
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{productCode}/variant/{fileName}")
    public Response getScreen(@PathParam(value = "fileName") String fileName) throws AppException {
            Screens screens = new ProductService().getScreensForVariant(fileName);
            return Response.status(200).entity(screens).build();
    }
    // Ended for screens page
    
    // Added for Fields page
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{productCode}/variant/{fileName}/screen/{screenID}")
    public Response getField(@PathParam(value = "fileName") String fileName, @PathParam(value = "screenID") String screenID) throws AppException {
    	    Fields fields = new ProductService().getFieldsForScreens(fileName, screenID);
            return Response.status(200).entity(fields).build();
    }
    // Ended for Fields page
    
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	@Path("refactoredDiffXml/retrieve/{fileName}")
	public Response retrieveDiffRefactoredXml(@PathParam(value = "fileName") String fileName) throws AppException {
		String diffXml = new ProductService().retrieveDiffRefactoredProductXml(fileName);
		return Response.status(200).entity(diffXml).build();
	}
}
