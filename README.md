# OauthOutlook

Passos:

1. Acessar com o email de corporação no Portal Azure

        https://portal.azure.com/

2. Registre um aplicativo

Não esqueça de anotar 

        ID do aplicativo (cliente)


3. Configure autenticação

        Adicionar o tipo de plataforma

        Url de login

        Concessão Implícita
                Tokens de acesso e Token ID

        Tipos de conta com suporte

# Token 

No localStorage: msal.idtoken


# Configuração Básica

app.module.ts

        import { MsalModule } from '@azure/msal-angular';

        @NgModule({
            ....

            imports: [
                BrowserModule,
                AppRoutingModule,
                MsalModule.forRoot({
                auth: {
                    clientId: '3bdb8c18-05c1-4491-8816-be22fc7e4c3b',
                    authority: 'https://login.microsoftonline.com/dominio.com.br',
                    validateAuthority: true,
                    redirectUri: 'http://localhost:4203/home',
                    postLogoutRedirectUri: 'http://localhost:4203',
                    navigateToLoginRequestUrl: true  ,
                    
                },
                cache: {
                    cacheLocation: "localStorage",
                    storeAuthStateInCookie: isIE
                },
                },{
                popUp: !isIE,
                consentScopes: [
                    "user.read",
                    "openid",
                    "profile",
                    "api://3bdb8c18-05c1-4491-8816-be22fc7e4c3b"
                ],
                unprotectedResources: ["https://www.microsoft.com/en-us/"],
                protectedResourceMap,
                extraQueryParameters: {},        
                },
                )
            ],


azure.service.ts

            notifier = new EventEmitter()
            private isIframe = false;
            private loggedIn = false;

            constructor(private broadcastService: BroadcastService, private authService: MsalService ) {
                this.isIframe = window !== window.parent && !window.opener;

                    this.checkoutAccount();
                
                    
                
                    this.authService.handleRedirectCallback((authError, response) => {
                    if (authError) {
                        console.error('Redirect Error: ', authError.errorMessage);
                        return;
                    }
                
                    console.log('Redirect Success: ', response);
                    });
                
                    this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
                    console.log('MSAL Logging: ', message);
                    }, {
                    correlationId: CryptoUtils.createNewGuid(),
                    piiLoggingEnabled: false
                    }));
            }

            checkoutAccount() {
                //	this.loggedIn = !!this.authService.getAccount();
                return 	!!this.authService.getAccount();
                }
                
                login() {
                const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
            
                if (isIE) {
                    this.authService.loginRedirect();
                } else {
                    this.authService.loginPopup();
                }
                }
                
                logout() {
                this.authService.logout();
                }


                ouvirLogin(){

                    return Observable.create( observer =>{
                    this.broadcastService.subscribe('msal:loginSuccess', payload => {
                        let usuario: UsuarioModel = {
                        nome: payload.account.name,
                        email: payload.account.userName
                        }
                        this.notifier.emit(usuario)
                        
                        
                        console.log('success', payload );
                        
                        this.checkoutAccount();
                        observer.next(usuario)
                    });
                    
                    } )

                }

home.component.ts

        usuario: UsuarioModel
        constructor(private _azureService: AzureService) { }

        ngOnInit() {    
            this._ouvirLogin()
        }


        _ouvirLogin(){
            this._azureService
                .ouvirLogin()
                .subscribe( (user: UsuarioModel) => {
                    this.usuario = user
                    
                } )
        }