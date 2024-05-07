import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomFormComponent } from '../../../../shared/components/custom-form/custom-form.component';


@Component({
  selector: 'app-connexion-page',
  standalone: true,
  templateUrl: './connexion-page.component.html',
  styleUrl: './connexion-page.component.scss',
  imports: [CustomFormComponent]
})
export class ConnexionPageComponent {

  onSubmit(form: NgForm): void {
    console.log('form value : ', form.value);
  }
}
