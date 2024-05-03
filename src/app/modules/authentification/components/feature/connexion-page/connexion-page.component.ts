import { Component } from '@angular/core';

@Component({
  selector: 'app-connexion-page',
  templateUrl: './connexion-page.component.html',
  styleUrl: './connexion-page.component.scss'
})
export class ConnexionPageComponent {

  onSubmit(){
    console.log("works");
    
  }
}
