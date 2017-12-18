package com.ux.dg.ui.api.services;

import java.io.IOException;
import java.util.Properties;

import com.select.edge.utility.EdgeXMLGenerator;
import com.ux.dg.ui.api.beans.XmlGeneratorConfigurations;

public class XmlGeneratorService {

    public String generateEdgeXml(XmlGeneratorConfigurations property) throws IOException {
        
        String status = "false";
        
        try {
            Properties xmlGeneratorProperties = new Properties();
            xmlGeneratorProperties = processConfigurations(property, xmlGeneratorProperties);
            EdgeXMLGenerator.generate(xmlGeneratorProperties, property.getMode());
            status = "true";
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return status;
    }

    private Properties processConfigurations(XmlGeneratorConfigurations property, Properties xmlGeneratorProperties) {
        if(property.getSelectProductFolder() != null && !(property.getSelectProductFolder().isEmpty())) {
            xmlGeneratorProperties.setProperty("productsFolder", property.getSelectProductFolder());
        }
        if(property.getEdgeProductFolder() != null && !(property.getEdgeProductFolder().isEmpty())) {
            xmlGeneratorProperties.setProperty("edgeFolder", property.getEdgeProductFolder());
        }
        if(property.getBooleanStyle() != null && !(property.getBooleanStyle().isEmpty())) {
            xmlGeneratorProperties.setProperty("booleanStyle", property.getBooleanStyle());
        }
        
        // Selenium Inputs
        if(property.getSeleniumEnvironment() != null && !(property.getSeleniumEnvironment().isEmpty())) {
            xmlGeneratorProperties.setProperty("seleniumEnvironment", property.getSeleniumEnvironment());
        }
        if(property.getSeleniumTransactions() != null && !(property.getSeleniumTransactions().isEmpty())) {
            xmlGeneratorProperties.setProperty("seleniumTransactions", property.getSeleniumTransactions());
        }
        if(property.getSeleniumScriptsInputFolder() != null && !(property.getSeleniumScriptsInputFolder().isEmpty())) {
            xmlGeneratorProperties.setProperty("seleniumScriptsInputFolder", property.getSeleniumScriptsInputFolder());
        }
        if(property.getSeleniumScriptsOutputFolder() != null && !(property.getSeleniumScriptsOutputFolder().isEmpty())) {
            xmlGeneratorProperties.setProperty("seleniumScriptsOutputFolder", property.getSeleniumScriptsOutputFolder());
        }
     // Selenium Inputs Ends
        
        if (property.getUseNativeUiScreens() != null
                && !property.getUseNativeUiScreens().isEmpty()
                && (property.getUseNativeUiScreens().equals("true") || property.getUseNativeUiScreens().equals("false"))) {
            xmlGeneratorProperties.setProperty("useNativeUIScreenDefintions", property.getUseNativeUiScreens());
        }
        if (property.getUseCoverSelector() != null
                && !property.getUseCoverSelector().isEmpty()
                && (property.getUseCoverSelector().equals("true") || property.getUseCoverSelector().equals("false"))) {
            xmlGeneratorProperties.setProperty("generateCoverageSelectorScreen", property.getUseCoverSelector());
        }
        if (property.getUsePricePresentation() != null
                && !property.getUsePricePresentation().isEmpty()
                && (property.getUsePricePresentation().equals("true") || property.getUsePricePresentation().equals("false"))) {
            xmlGeneratorProperties.setProperty("generatePricePresentationScreen", property.getUsePricePresentation());
        }
        if (property.getUseIgnoreWarning() != null
                && !property.getUseIgnoreWarning().isEmpty()
                && (property.getUseIgnoreWarning().equals("true") || property.getUseIgnoreWarning().equals("false"))) {
            xmlGeneratorProperties.setProperty("useIgnoreWarningsWebServiceMethods", property.getUseIgnoreWarning());
        }
        if (property.getGenerateDynamicUI() != null
                && !property.getGenerateDynamicUI().isEmpty()
                && (property.getGenerateDynamicUI().equals("true") || property.getGenerateDynamicUI().equals("false"))) {
            xmlGeneratorProperties.setProperty("generateStorageAndUiXML", property.getGenerateDynamicUI());
        }
        if (property.getGenerateDynamicServices() != null
                && !property.getGenerateDynamicServices().isEmpty()
                && (property.getGenerateDynamicServices().equals("true") || property.getGenerateDynamicServices().equals("false"))) {
            xmlGeneratorProperties.setProperty("generateServiceXML", property.getGenerateDynamicServices());
        }
        if (property.getOneScreenPerComponent() != null
				&& !property.getOneScreenPerComponent().isEmpty()
				&& (property.getOneScreenPerComponent().equals("true") || property.getOneScreenPerComponent().equals("false"))) {
			xmlGeneratorProperties.setProperty("oneScreenPerComponent", property.getOneScreenPerComponent());
		}
		if (property.getSkipOptionalComponents() != null
				&& !property.getSkipOptionalComponents().isEmpty()
				&& (property.getSkipOptionalComponents().equals("true") || property.getSkipOptionalComponents().equals("false"))) {
			xmlGeneratorProperties.setProperty("skipOptionalComponents", property.getSkipOptionalComponents());
		}
        
        if(property.getUri1() != null && !property.getUri1().isEmpty()) {
            xmlGeneratorProperties.setProperty("uri1", property.getUri1());
        }
        if(property.getUsername1() != null && !property.getUsername1().isEmpty()) {
            xmlGeneratorProperties.setProperty("username1", property.getUsername1());
        }
        if(property.getPassword1() != null && !property.getPassword1().isEmpty()) {
            xmlGeneratorProperties.setProperty("password1", property.getPassword1());
        }
        if(property.getPrivateKeyPath1() != null && !property.getPrivateKeyPath1().isEmpty()) {
            xmlGeneratorProperties.setProperty("privateKeyPath1", property.getPrivateKeyPath1());
        }
        if(property.getPassphrase1() != null && !property.getPassphrase1().isEmpty()) {
            xmlGeneratorProperties.setProperty("passphrase1", property.getPassphrase1());
        }
        if(property.getKnownHostsPath1() != null && !property.getKnownHostsPath1().isEmpty()) {
            xmlGeneratorProperties.setProperty("knownHostsPath1", property.getKnownHostsPath1());
        }
        if(property.getDir1() != null && !property.getDir1().isEmpty()) {
            xmlGeneratorProperties.setProperty("dir1", property.getDir1());
        }
        
        return xmlGeneratorProperties;
    }
}
