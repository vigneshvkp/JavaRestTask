package com.ux.dg.ui.api.resources;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ux.dg.ui.api.beans.Credential;
import com.ux.dg.ui.api.services.LoginService;

@Path("/authenticate")
public class LoginResource {

	@Path("/login")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response authenticate(Credential credential,@Context HttpServletRequest request) throws Exception {
		Credential user = new LoginService().authenticate(credential);
		if(user != null) {
			 HttpSession session = request.getSession();
			 if(session.getAttribute("username") == null) {
				 session.setAttribute("username", credential.getUsername());
			 }
			 return Response.status(200).entity(user).build();	
		}
		else {
			return Response.status(200).entity(false).build();	
		}	
	}
	
	@Path("/logout")
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public Response logout(@Context HttpServletRequest request) throws Exception {
		String result = null;
		if (request.getSession().getAttribute("username") != null) {
			request.getSession().removeAttribute("username");
			result = "Ok";
	    }
	    else {
	    	result = "No Session";
	    }
		return Response.status(200).entity(result).build();
	}
}
