import { UsuarioModel } from './../home/usuario.model';
import { Injectable, EventEmitter } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AzureService {
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


    
}
