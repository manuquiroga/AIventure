import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuard } from './guards/auth.guard';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InfoComponent } from './components/info/info.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CharacterMenuComponent } from './pages/character-menu/character-menu.component';
import { PrivateNavbarComponent } from './components/private-navbar/private-navbar.component';
import { CharacterDisplayComponent } from './components/character-display/character-display.component';
import { NonCharacterCardComponent } from './components/non-character-card/non-character-card.component';
import { CharacterCreationComponent } from './components/character-creation/character-creation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { AttributeDistributionComponent } from './components/attribute-distribution/attribute-distribution.component';






@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    InfoComponent,
    LandingPageComponent,
    CharacterMenuComponent,
    PrivateNavbarComponent,
    CharacterDisplayComponent,
    NonCharacterCardComponent,
    CharacterCreationComponent,
    AttributeDistributionComponent,

  ],
  imports: [
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,

    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
