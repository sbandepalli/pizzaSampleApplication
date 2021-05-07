let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json");
var token = null;
var userinfo = null;
var d = new Date();
var management_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVKci1aMDNzUHBneWhrUHdLOC1udCJ9.eyJpc3MiOiJodHRwczovL2Rldi11YzNmbzhkaC51cy5hdXRoMC5jb20vIiwic3ViIjoiamtlU0w0ZHQ2YmlBR3ZRcXdEWjd5WDN6VWlJSzdJcURAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LXVjM2ZvOGRoLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjIwMzkyOTUwLCJleHAiOjE2MjA5OTc3NTAsImF6cCI6ImprZVNMNGR0NmJpQUd2UXF3RFo3eVgzelVpSUs3SXFEIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.RFIC4IDbJE0irKqGcpcUBSG8xLMcpKf1_z95lt4sTwCwMZnZx2lmq5h72NIEMkC3rUpeMPoT94xFqoB8UVUrq3FG1j0k-lcNVAqjrMnBLIpKOaZyq8hGZtym1STV65gfw03K-kU4vT11wsIKSnTkV9UvzLTCca1QoGlsJ7TfFar0AGrvdlwvBJcjboVuiDPFTeXRPRYiqJHeYrTO7y39lpdO-AkCgtHzvFVemQPQF1_p-QlfkkNPOpqhf6IFfb3dJw-aBPXe0I7KdRTFYYheNFWU_UI3YQj95nHkJ_EAfP6mO14ofsOE-fTauWngclDzHkTQ979SAbTtumEYB096XA";

const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();
  
    auth0 = await createAuth0Client({ //await createAuth0Client
      domain: config.domain,
      client_id: config.clientId,
      management_token: config.management_token
      //audience: config.audience,
      //useRefreshTokens: true
    });
};

window.onload = async () => {
    await configureClient();
    // NEW - update the UI state
    updateUI();
    const isAuthenticated = await auth0.isAuthenticated();
    //const isAuthenticated = await webAuth.isAuthenticated();
  if (isAuthenticated) {
    //gated content
    return;
  }

  // NEW - check for the code and state parameters
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {

    // Process the login state
    await auth0.handleRedirectCallback();
    //await webAuth.handleRedirectCallback();

    updateUI();

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
}
const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated();
    //const isAuthenticated = await webAuth.isAuthenticated();

    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;
    document.getElementById("btn-call-api").disabled = !isAuthenticated;
    if (isAuthenticated) {
        document.getElementById("user_profile_section").style.display="block";
        document.getElementById("gated-content").classList.remove("hidden");
        document.getElementById("btn-login").style.display="none";
        document.getElementById("btn-logout").style.display="block";
        token = await auth0.getTokenSilently();
        document.getElementById(
          "ipt-access-token"
        ).innerHTML = token;
        userinfo = await auth0.getUser();
        
        document.getElementById("ipt-user-profile").textContent = JSON.stringify(
          userinfo
        );
        
        document.getElementById("nickname").innerText=userinfo.nickname;
        document.getElementById("name").innerText=userinfo.name;
        document.getElementById("picture").innerText=userinfo.picture;
        document.getElementById("Updated Time").innerText=userinfo.updated_at;
        document.getElementById("sub").innerText=userinfo.sub;
        document.getElementById("Login Count").innerText=userinfo.logins_count;

        
      } else {
        document.getElementById("gated-content").classList.add("hidden");
    }
};

const displayPizzaOrder = async() => {
	document.getElementById("pizza_section").style.display="block";
  document.getElementById("user_profile_section").style.display="none";
  document.getElementById("users_section").style.display="none";
  callApi();
};

const displayProfile = async() => {
  document.getElementById("user_profile_section").style.display="block";
  document.getElementById("pizza_section").style.display="none";
  document.getElementById("users_section").style.display="none";

};

const login = async () => {
    await auth0.loginWithRedirect({
      redirect_uri: window.location.origin
    });
};

const logout = () => {
    auth0.logout({
      returnTo: window.location.origin
    });
};

const callApi = async () => {
    auth0.checkSession({}, (err, authResult) => {
      alert(authResult)
      if (authResult && authResult.accessToken && authResult.idToken) {
        //localLogin(authResult);
        //alert("Session valid! ")
      } else if (err) {
        alert(
            'Could not get a new token '  + err.error + ':' + err.error_description + '.'
        );
        logout();
      }
      // displayButtons();
    });
    try {
  
      // Get the access token from the Auth0 client
      //const token = await auth0.getTokenSilently();
  
      // Make the call to the API, setting the token
      // in the Authorization header
      const email_verified = userinfo.email_verified;
      if (email_verified === true) {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Fetch the JSON result
        const responseData = await response.json();
        //Display the result in the output element
        const responseElement = document.getElementById("api-call-result");
        responseElement.innerText = JSON.stringify(responseData, {}, 2);
      } else {
        document.getElementById("btn-call-api").disabled=true;
        document.getElementById("demo").innerText = "Orders can be only placed if Email has been verified. In this case, Email has not been verified and order cannot be placed! ";
      }
  
  } catch (e) {
      // Display errors in the console
      console.error(e);
    }
};

const getUsers = async () => { //This functionality is failing due to CORS issue. 
  try {
    await fetch("https://dev-uc3fo8dh.us.auth0.com/api/v2/users", { //Pre flight settings needed.
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "https://mypizzaapp42.herokuapp.com",
        "Access-Control-Request-Method": "GET",
        "Access-Control-Request-Headers": "Authorization",
        "Origin": "https://mypizzaapp42.herokuapp.com",
        "Authorization": `Bearer ${management_token}`
      }
    });
      const metadata_response = await fetch("https://dev-uc3fo8dh.us.auth0.com/api/v2/users", {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "https://mypizzaapp42.herokuapp.com",
          "Origin": "https://mypizzaapp42.herokuapp.com",
          "Authorization": `Bearer ${management_token}`
        }
      });
      const responseData = await metadata_response.json();
      const responseElement = document.getElementById("users-call-result");
      responseElement.innerText = JSON.stringify(responseData, {}, 2);
      document.getElementById("users_section").style.display="block";
      document.getElementById("pizza_section").style.display="none";
      document.getElementById("user_profile_section").style.display="none";
      
} catch (e) {
    // Display errors in the console
    console.error(e);
  }
};
