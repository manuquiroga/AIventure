import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
