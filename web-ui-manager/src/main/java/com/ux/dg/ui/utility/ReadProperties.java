package com.ux.dg.ui.utility;

import java.io.IOException;
import java.util.Properties;

public class ReadProperties {

	public static String returnFilePath() {
		Properties properties = null;
		String filePath = null;
		try {
			properties = new Properties(); 
			properties.load(ReadProperties.class.getClassLoader().getResourceAsStream("config.properties"));
			filePath = properties.getProperty("path")+ properties.getProperty("environment")+properties.getProperty("edgepath");
		}
		catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return filePath;
	}
}
