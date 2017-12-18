package com.select.edge.utility;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class GeneratorServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String[] args = {"C:\\DynamicGeneration\\JavaWorkspace\\xml-generator\\src\\main\\resources\\EdgeXMLGenerator", req.getParameter("mode")};
		args[0] += req.getParameter("product") != null ? "_" + req.getParameter("product") : "";
		args[0] += ".properties";
		
		resp.setContentType("text/plain");
		resp.setCharacterEncoding("UTF-8");
		PrintWriter out = resp.getWriter();
		String status = "false";
		
		try {
			EdgeXMLGenerator.generate(args);
			status = "true";
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(status);
	}
	
}
