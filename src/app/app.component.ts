import { AzureService } from './provider/azure.service';
import { Component } from '@angular/core';



@Component({
  selector: 'db-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	
	title = 'MSAL - Angular 6 Sample App';
	

	
	constructor( private _azureService: AzureService){}

	ngOnInit(): void {
		
		
	}

	checkoutAccount() {
		return this._azureService.checkoutAccount()
	}

	login(){
		this._azureService.login()
	}

	logout() {
		this._azureService.logout()
	}
	
	
}
