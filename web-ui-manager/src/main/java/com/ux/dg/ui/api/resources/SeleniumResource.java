package com.ux.dg.ui.api.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ux.dg.ui.api.beans.Selenium;
import com.ux.dg.ui.api.services.SeleniumService;
import com.ux.dg.ui.utility.AppException;

@Path("/seleniumEdit")
public class SeleniumResource {
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("{fileName}")
	public Response getScreens(@PathParam(value = "fileName") String fileName) throws AppException {
		Selenium screens = new SeleniumService().getScreens(fileName);
		return Response.status(200).entity(screens).build();
	}
	
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	@Path("diffXml/retrieve/{fileName}")
	public Response retrieveDiffRefactoredXml(@PathParam(value = "fileName") String fileName) throws AppException {
		String diffXml = new SeleniumService().retrieveDiffSeleniumXml(fileName);
		return Response.status(200).entity(diffXml).build();
	}
}
