import { 
    ClientAuthError, InteractionRequiredAuthError, UserAgentApplication
  } from 'msal';
  //import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
  import Identity from '../utils/models';
  import config from '../assets/config.json';
  
  class AuthService {
    constructor(configuration) {
      this.signInOptions = {
        scopes: configuration.msal.scopesLogin
      };

      this.tokenOptions = {
        scopes: configuration.msal.scopesToken
      };
  
      this.msalConfig = {
        auth: {
          authority: configuration.msal.authority,
          clientId: configuration.msal.clientId,
          redirectUri: configuration.msal.redirectUri,
          postLogoutRedirectUri: configuration.msal.postLogoutRedirectUri
        },
        cache: {
          cacheLocation: 'sessionStorage',
          storeAuthStateInCookie: false
        }
      };
  
      this.msalClient = new UserAgentApplication(this.msalConfig);
      console.log('AuthService:: initialized: ', this.msalConfig);
    }
  
    get serviceName() { return 'Microsoft'; }
  
   // get icon() { return faMicrosoft; }
  
    async signIn() {
      await this.msalClient.loginPopup(this.signInOptions);
      const a_token = await this.msalClient.acquireTokenPopup(this.tokenOptions);
      //const response = await this.msalClient.loginRedirect(this.signInOptions);
      return new Identity(a_token);
    }

    signOut() {
        this.msalClient.logout();
      }
    
      async getIdentity() {
        const account = this.msalClient.getAccount();
        if (account) {
          try {
            const response = await this.msalClient.acquireTokenSilent(this.signInOptions);
            return new Identity(response);
          } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
              //throw new InteractiveSignInRequired();
              console.log(String(error));
            }
            if (error instanceof ClientAuthError) {
              // On mobile devices, ClientAuthError is sometimes thrown when we
    
              // can't do silent auth - this isn't generally an issue here.
    
              if (error.errorCode === 'block_token_requests') {
                //throw new InteractiveSignInRequired();
                console.log(String(error));
              }
              console.warn('ClientAuthError: error code = ', error.errorCode);
            }
            throw error;
          }
        }
        //throw new InteractiveSignInRequired();
        //console.log(String(error));
      }
    }
    
    const authService = new AuthService(config);
    
    export default authService;  