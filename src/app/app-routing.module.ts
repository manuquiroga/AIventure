import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterMenuComponent } from './pages/character-menu/character-menu.component';
import { CharacterCreationComponent } from './components/character-creation/character-creation.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthGuard } from './guards/auth.guard';
import { StoryHandlerComponent } from './components/story-handler/story-handler.component';
import { StoryGuard } from './guards/story.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: '**', component: PageNotFoundComponent },
  { path: 'characters', component: CharacterMenuComponent, canActivate: [AuthGuard] },
  { path: 'story', component: StoryHandlerComponent, canActivate: [AuthGuard, StoryGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
