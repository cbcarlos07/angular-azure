import { UsuarioModel } from './usuario.model';
import { Component, OnInit } from '@angular/core';
import { AzureService } from '../provider/azure.service';

@Component({
  selector: 'db-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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

}
