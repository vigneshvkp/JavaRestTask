package com.ux.dg.ui.api.services;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.ux.dg.ui.api.beans.Credential;
import com.ux.dg.ui.api.beans.Credentials;
import com.ux.dg.ui.api.dao.LoginDao;

public class LoginService {

	public Credential authenticate(Credential userCredential) {
		Credentials credentials = null;
		boolean userExists = false;
		String encryptedPassword = null;
		LoginDao credentialsDao = new LoginDao();
		Credential userDetails = null;
		
		credentials = credentialsDao.getCredentials();
		List<Credential> list = credentials.getCredential();
		encryptedPassword = encryptPassword(userCredential.getPassword());
		for(Credential cred:list) {
			if(cred.getUsername().equals(userCredential.getUsername()) 
					&& encryptedPassword.equals(cred.getPassword())) {
				userDetails = cred;
				break;
			}
		}
		return userDetails;
	}
	
    public String encryptPassword(String passwordToHash) {
        String generatedPassword = null;
        try {
            // Create MessageDigest instance for MD5
            MessageDigest md = MessageDigest.getInstance("MD5");
            //Add password bytes to digest
            //Add password bytes to digest
            md.update(passwordToHash.getBytes());
            //Get the hash's bytes
            byte[] bytes = md.digest();
            //This bytes[] has bytes in decimal format;
            //Convert it to hexadecimal format
            StringBuilder sb = new StringBuilder();
            for(int i=0; i< bytes.length ;i++)
            {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }
            //Get complete hashed password in hex format
            generatedPassword = sb.toString();
        }
        catch (NoSuchAlgorithmException e)
        {
            e.printStackTrace();
        }
        return generatedPassword;
    }
}
