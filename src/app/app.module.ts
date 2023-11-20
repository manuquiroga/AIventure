import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuard } from './guards/auth.guard';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InfoComponent } from './components/info/info.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CharacterMenuComponent } from './pages/character-menu/character-menu.component';
import { CharacterDisplayComponent } from './components/character-display/character-display.component';
import { NonCharacterCardComponent } from './components/non-character-card/non-character-card.component';
import { CharacterCreationComponent } from './components/character-creation/character-creation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { StoryCreationComponent } from './components/story-creation/story-creation.component';
import { FAQComponent } from './components/faq/faq.component';
import { OpenaiService } from './services/openai.service';
import { StoryHandlerComponent } from './components/story-handler/story-handler.component';
import { StoryGuard } from './guards/story.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { StoryLoadComponent } from './components/story-load/story-load.component';
import { DownloadStoryComponent } from './components/download-story/download-story.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    InfoComponent,
    LandingPageComponent,
    CharacterMenuComponent,
    CharacterDisplayComponent,
    NonCharacterCardComponent,
    CharacterCreationComponent,
    UserProfileComponent,
    StoryCreationComponent,
    FAQComponent,
    StoryHandlerComponent,
    PageNotFoundComponent,
    StoryLoadComponent,
    DownloadStoryComponent,
  ],
  imports: [
    ReactiveFormsModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatMenuModule,
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
  providers: [AuthGuard, FAQComponent, StoryGuard, DownloadStoryComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
