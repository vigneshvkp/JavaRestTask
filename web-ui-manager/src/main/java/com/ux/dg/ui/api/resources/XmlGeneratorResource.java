package com.ux.dg.ui.api.resources;

import java.io.IOException;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ux.dg.ui.api.beans.XmlGeneratorConfigurations;
import com.ux.dg.ui.api.services.XmlGeneratorService;


@Path("/generate")
public class XmlGeneratorResource {

	@Path("/edgeXML")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response generateEdgeXML(XmlGeneratorConfigurations property) throws IOException {
		
		String status = new XmlGeneratorService().generateEdgeXml(property);
		
		return Response.status(200).entity(status).build();
	}
	
	@Path("/refactoredXML")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response generateRefactoredXML(XmlGeneratorConfigurations property) throws IOException {
		
		String status = "false";
		
		return Response.status(200).entity(status).build();
	}
}
