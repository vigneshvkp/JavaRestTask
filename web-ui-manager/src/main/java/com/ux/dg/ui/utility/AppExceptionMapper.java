package com.ux.dg.ui.utility;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class AppExceptionMapper implements ExceptionMapper<AppException> {

	public Response toResponse(AppException ex) {
		return Response.status(200).entity(new ErrorMessage(ex))
				.type(MediaType.APPLICATION_JSON).
				build();
	}

}
