package com.ux.dg.ui.api.beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.PROPERTY)
public class XmlGeneratorConfigurations {
	
	public String selectProductFolder;	
	public String edgeProductFolder;
	public String useNativeUiScreens;
	public String useCoverSelector;
	public String usePricePresentation;
	public String useIgnoreWarning;
	public String generateDynamicUI;
	public String generateDynamicServices;
	public String path;
	public String mode;
	public String environment;
	public String oneScreenPerComponent;
	public String skipOptionalComponents;
	public String booleanStyle;
	
	// adding for panel
	public String uri1;
	public String username1;
	public String password1;
	public String privateKeyPath1;
	public String passphrase1;
	public String knownHostsPath1;
	public String dir1;
	// ended for panel
	
	// adding for Selenium 
	public String seleniumEnvironment;
	public String seleniumTransactions;
	public String seleniumScriptsInputFolder;
	public String seleniumScriptsOutputFolder;
	// ended for Selenium

	@XmlElement
	public String getSeleniumEnvironment() {
		return seleniumEnvironment;
	}
	public void setSeleniumEnvironment(String seleniumEnvironment) {
		this.seleniumEnvironment = seleniumEnvironment;
	}
	@XmlElement
	public String getSeleniumTransactions() {
		return seleniumTransactions;
	}
	public void setSeleniumTransactions(String seleniumTransactions) {
		this.seleniumTransactions = seleniumTransactions;
	}
	@XmlElement
	public String getSeleniumScriptsInputFolder() {
		return seleniumScriptsInputFolder;
	}
	public void setSeleniumScriptsInputFolder(String seleniumScriptsInputFolder) {
		this.seleniumScriptsInputFolder = seleniumScriptsInputFolder;
	}
	@XmlElement
	public String getSeleniumScriptsOutputFolder() {
		return seleniumScriptsOutputFolder;
	}
	public void setSeleniumScriptsOutputFolder(String seleniumScriptsOutputFolder) {
		this.seleniumScriptsOutputFolder = seleniumScriptsOutputFolder;
	}
	@XmlElement
	public String getBooleanStyle() {
		return booleanStyle;
	}
	public void setBooleanStyle(String booleanStyle) {
		this.booleanStyle = booleanStyle;
	}
	@XmlElement
	public String getOneScreenPerComponent() {
		return oneScreenPerComponent;
	}
	public void setOneScreenPerComponent(String oneScreenPerComponent) {
		this.oneScreenPerComponent = oneScreenPerComponent;
	}
	@XmlElement
	public String getSkipOptionalComponents() {
		return skipOptionalComponents;
	}
	public void setSkipOptionalComponents(String skipOptionalComponents) {
		this.skipOptionalComponents = skipOptionalComponents;
	}
	@XmlElement
	public String getSelectProductFolder() {
		return selectProductFolder;
	}
	public void setSelectProductFolder(String selectProductFolder) {
		this.selectProductFolder = selectProductFolder;
	}
	@XmlElement
	public String getEdgeProductFolder() {
		return edgeProductFolder;
	}
	public void setEdgeProductFolder(String edgeProductFolder) {
		this.edgeProductFolder = edgeProductFolder;
	}
	@XmlElement
	public String getUseNativeUiScreens() {
		return useNativeUiScreens;
	}
	public void setUseNativeUiScreens(String useNativeUiScreens) {
		this.useNativeUiScreens = useNativeUiScreens;
	}
	@XmlElement
	public String getUseCoverSelector() {
		return useCoverSelector;
	}
	public void setUseCoverSelector(String useCoverSelector) {
		this.useCoverSelector = useCoverSelector;
	}
	@XmlElement
	public String getUsePricePresentation() {
		return usePricePresentation;
	}
	public void setUsePricePresentation(String usePricePresentation) {
		this.usePricePresentation = usePricePresentation;
	}
	@XmlElement
	public String getUseIgnoreWarning() {
		return useIgnoreWarning;
	}
	public void setUseIgnoreWarning(String useIgnoreWarning) {
		this.useIgnoreWarning = useIgnoreWarning;
	}
	@XmlElement
	public String getGenerateDynamicUI() {
		return generateDynamicUI;
	}
	public void setGenerateDynamicUI(String generateDynamicUI) {
		this.generateDynamicUI = generateDynamicUI;
	}
	@XmlElement
	public String getGenerateDynamicServices() {
		return generateDynamicServices;
	}
	public void setGenerateDynamicServices(String generateDynamicServices) {
		this.generateDynamicServices = generateDynamicServices;
	}
	@XmlElement
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	@XmlElement
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	@XmlElement
	public String getEnvironment() {
		return environment;
	}
	public void setEnvironment(String environment) {
		this.environment = environment;
	}
	@XmlElement
	public String getUri1() {
		return uri1;
	}
	public void setUri1(String uri1) {
		this.uri1 = uri1;
	}
	@XmlElement
	public String getUsername1() {
		return username1;
	}
	public void setUsername1(String username1) {
		this.username1 = username1;
	}
	@XmlElement
	public String getPassword1() {
		return password1;
	}
	public void setPassword1(String password1) {
		this.password1 = password1;
	}
	@XmlElement
	public String getPrivateKeyPath1() {
		return privateKeyPath1;
	}
	public void setPrivateKeyPath1(String privateKeyPath1) {
		this.privateKeyPath1 = privateKeyPath1;
	}
	@XmlElement
	public String getPassphrase1() {
		return passphrase1;
	}
	public void setPassphrase1(String passphrase1) {
		this.passphrase1 = passphrase1;
	}
	@XmlElement
	public String getKnownHostsPath1() {
		return knownHostsPath1;
	}
	public void setKnownHostsPath1(String knownHostsPath1) {
		this.knownHostsPath1 = knownHostsPath1;
	}
	@XmlElement
	public String getDir1() {
		return dir1;
	}
	public void setDir1(String dir1) {
		this.dir1 = dir1;
	}
	
	
}
