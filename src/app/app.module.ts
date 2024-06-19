import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './modules/navigation/navigation.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthentificationModule } from './modules/authentification/authentification.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TokenInterceptor } from './core/token.interceptor';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../environments/environment.development';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    NavigationModule,
    AuthentificationModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi: true
    },
    provideFirebaseApp(() => initializeApp({"projectId":"tuquoque-f8720","appId":"1:182924398900:web:a142f274ab0a344bae5561","storageBucket":"tuquoque-f8720.appspot.com","apiKey":"AIzaSyCQnOZNY5CGYmev597w2Mq3P3RmzjonTTw","authDomain":"tuquoque-f8720.firebaseapp.com","messagingSenderId":"182924398900"})),
    provideStorage(() => getStorage()),
    {
			provide: FIREBASE_OPTIONS,
			useValue: environment.firebase,
		},
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
