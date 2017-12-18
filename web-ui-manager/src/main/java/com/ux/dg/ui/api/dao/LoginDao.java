package com.ux.dg.ui.api.dao;

import java.io.InputStream;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import com.ux.dg.ui.api.beans.Credentials;
import com.ux.dg.ui.api.services.LoginService;

public class LoginDao {

	JAXBContext jaxbContext;
	LoginService loginService = new LoginService();
	InputStream inputFile = LoginDao.class.getClassLoader().getResourceAsStream("Credentials.xml");
	public Credentials getCredentials() {
		Credentials credentials = null;
		
		try {
			jaxbContext = JAXBContext.newInstance(Credentials.class);
			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			credentials = (Credentials) jaxbUnmarshaller.unmarshal(inputFile);
			
		} catch (JAXBException e) {
			e.printStackTrace();
		}

		return credentials;
	}
}
