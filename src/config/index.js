module.exports.msal = {
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_MSAL_TENANT}`,
    clientId: process.env.REACT_APP_MSAL_CLIENT_ID,
    redirectUri: "http://localhost:3000/login/",
    postLogoutRedirectUri: "http://localhost:3000/login",
    scopesLogin: [ "openid", "profile" ],
    scopesToken: [process.env.REACT_APP_MSAL_SCOPE1, process.env.REACT_APP_MSAL_SCOPE2],
    name_session: `msal.${process.env.REACT_APP_MSAL_CLIENT_ID}.idtoken`
}