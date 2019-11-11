'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var nativescript_oauth2_1 = require('nativescript-oauth2');
var providers_1 = require('nativescript-oauth2/providers');
var client = null;
function configureOAuthProviders() {
    var microsoftProvider = configureOAuthProviderMicrosoft();
    var googleProvider = configureOAuthProviderGoogle();
    var facebookProvider = configureOAuthProviderFacebook();
    nativescript_oauth2_1.configureTnsOAuth([
        microsoftProvider,
        googleProvider,
        facebookProvider
    ]);
}
exports.configureOAuthProviders = configureOAuthProviders;
function configureOAuthProviderGoogle() {
    var googleProviderOptions = {
				openIdSupport: 'oid-full',
        clientId:
            '600783705702-k9jrdobpn7g7jnehpe9efr34tpni3cgt.apps.googleusercontent.com',
        redirectUri:
            'com.googleusercontent.apps.600783705702-k9jrdobpn7g7jnehpe9efr34tpni3cgt:/auth',
        urlScheme:
            'com.googleusercontent.apps.600783705702-k9jrdobpn7g7jnehpe9efr34tpni3cgt',
				scopes: ['email']
    };
    var googleProvider = new providers_1.TnsOaProviderGoogle(
        googleProviderOptions
    );
    return googleProvider;
}
function configureOAuthProviderFacebook() {
    var facebookProviderOptions = {
        openIdSupport: 'oid-none',
				clientId: '2322599777850004',
				clientSecret: 'e97b3215bf92d1c9253ed6ec3f953e04',
        redirectUri: 'https://www.facebook.com/connect/login_success.html',
				scopes: ['public_profile', 'email']
    };
    var facebookProvider = new providers_1.TnsOaProviderFacebook(
        facebookProviderOptions
    );
    return facebookProvider;
}
function configureOAuthProviderMicrosoft() {
    var microsoftProviderOptions = {
        openIdSupport: 'oid-full',
        clientId: 'f376fa87-64a9-49a1-8b56-e0d48fc0810b',
        // redirectUri: "urn:ietf:wg:oauth:2.0:oob",
        redirectUri: 'msalf376fa87-64a9-49a1-8b56-e0d48fc0810b://auth',
        urlScheme: 'msalf376fa87-64a9-49a1-8b56-e0d48fc0810b',
        scopes: ['https://outlook.office.com/mail.read']
    };
    var microsoftProvider = new providers_1.TnsOaProviderMicrosoft(
        microsoftProviderOptions
    );
    return microsoftProvider;
}
function tnsOauthLogin(providerType) {
		client = new nativescript_oauth2_1.TnsOAuthClient(providerType);
		return new Promise((resolve, reject) => {
			client.loginWithCompletion((tokenResult, error) => {
				if (error) {
					reject('error when login');
				} else {
					console.log('--- tokenResult', tokenResult);
					resolve(tokenResult);
				}
			});
		})
}
exports.tnsOauthLogin = tnsOauthLogin;
function tnsOauthLogout() {
    if (client) {
        client.logout();
    }
}
exports.tnsOauthLogout = tnsOauthLogout;
