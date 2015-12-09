package com.example.mappinmail;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Properties;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import com.google.api.client.auth.oauth2.AuthorizationCodeFlow;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.appengine.http.UrlFetchTransport;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.gmail.GmailScopes;

public class Authenticate {
	
	private static final String CLIENT_SECRET_PATH = "/client_secret.json";
	private static final String API_KEY = "AIzaSyC1ao9fZIMPfwXMS39cz9NAOIbtwxGvJnU";
	
	/** Application name. */
    private static final String APPLICATION_NAME =
        "Map Pin Mail";

    /** Directory to store user credentials for this application. */
    private static final java.io.File DATA_STORE_DIR = new java.io.File(
        System.getProperty("user.home"), ".credentials/map-pin-mail");
    
	/** Global instance of the {@link FileDataStoreFactory}. */
    private static FileDataStoreFactory DATA_STORE_FACTORY;
    
	/** Global instance of the JSON factory. */
    private static final JsonFactory JSON_FACTORY =
        JacksonFactory.getDefaultInstance();

    /** Global instance of the HTTP transport. */
    private static HttpTransport HTTP_TRANSPORT;
    
    /** Global instance of the scopes required by this quickstart. */
    private static final List<String> SCOPES =
        Arrays.asList(GmailScopes.GMAIL_LABELS);
	private static final String GMAIL_SCOPE = "https://mail.google.com/";
    
    static {
        try {
            HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            DATA_STORE_FACTORY = new FileDataStoreFactory(DATA_STORE_DIR);
        } catch (Throwable t) {
            t.printStackTrace();
            System.exit(1);
        }
    }


	private AuthorizationCodeFlow authorizationCodeFlow;

    
	public Authenticate() { }
	
	public static Credential getCredentials() throws IOException{
		// Load client secrets.
		InputStream in =
				Authenticate.class.getResourceAsStream(CLIENT_SECRET_PATH);
		GoogleClientSecrets clientSecrets =
	            GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));
		
		// Build flow and trigger user authorization request.
		GoogleAuthorizationCodeFlow flow =
                new GoogleAuthorizationCodeFlow.Builder(
                        HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(DATA_STORE_FACTORY)
                .setAccessType("offline")
                .build();

		Credential credential = null;
		
		return credential;
	}
	
	
	public static GoogleAuthorizationCodeFlow getAuthorizationCodeFlow() throws IOException {
		FileInputStream authPropertiesStream = new FileInputStream(CLIENT_SECRET_PATH);
		  Properties authProperties = new Properties();
		  authProperties.load(authPropertiesStream);

		  String clientId = authProperties.getProperty("client_id");
		  String clientSecret = authProperties.getProperty("client_secret");

		  return new GoogleAuthorizationCodeFlow.Builder(new UrlFetchTransport(), new JacksonFactory(),
		      clientId, clientSecret, Collections.singleton(GMAIL_SCOPE)).setAccessType("offline").build();
	}
}
