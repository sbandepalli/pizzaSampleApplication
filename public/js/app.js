let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json");
var token = null;
var userinfo = null;
var d = new Date();
var management_token = "PUT IN ACCURATE MANAGEMENT API TOKEN VALUE";

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
        document.getElementById("Login Count").innerText=userinfo.last_ip;

        
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
      const metadata_response = await fetch("https://dev-uc3fo8dh.us.auth0.com/api/v2/users/"+userinfo.sub, {
        method: 'GET',
        headers: {
          "Host": "dev-uc3fo8dh.us.auth0.com",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",
          "Authorization": `Bearer ${management_token}`
        },
        mode: 'no-cors'
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
