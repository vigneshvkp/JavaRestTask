package com.ux.dg.ui.api.services;

import com.ux.dg.ui.api.beans.Selenium;
import com.ux.dg.ui.api.dao.SeleniumDao;
import com.ux.dg.ui.utility.AppException;
import javax.ws.rs.core.Response;

public class SeleniumService {
	SeleniumDao seleniumDao = new SeleniumDao();
	public Selenium getScreens(String fileName) throws AppException {
		Selenium screens = null;
		screens = seleniumDao.getScreens(fileName);
		if(screens == null) {
			throw new AppException(Response.Status.CONFLICT.getStatusCode(), "Exception",
					"No Screens Found");
		}
		return screens;
	}
	
    
	public String retrieveDiffSeleniumXml(String fileName) throws AppException {
		String diffXml = seleniumDao.retrieveDiffSeleniumXml(fileName);
		return diffXml;
	}	
}
