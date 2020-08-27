import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MsalModule } from '@azure/msal-angular';
import { LoginComponent } from './login/login.component'

export const protectedResourceMap: [string, string[]][] = [
  ['https://graph.microsoft.com/v1.0/me', ['user.read']]
];

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot({
      
      auth: {
          clientId: 'ch4v3d0C-l13n-t3qP-0ud4-4zur30000000',
          authority: 'https://login.microsoftonline.com/empresa.com.br',
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
        "api://ch4v3d0C-l13n-t3qP-0ud4-4zur30000000"
      ],
      unprotectedResources: ["https://www.microsoft.com/en-us/"],
      protectedResourceMap,
      extraQueryParameters: {},        
    },
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
