import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterMenuComponent } from './pages/character-menu/character-menu.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'characters', component: CharacterMenuComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
