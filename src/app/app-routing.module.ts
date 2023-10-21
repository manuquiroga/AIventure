import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterMenuComponent } from './pages/character-menu/character-menu.component';
import { CharacterCreationComponent } from './components/character-creation/character-creation.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthGuard } from './guards/auth.guard';
import { AttributeDistributionComponent } from './components/attribute-distribution/attribute-distribution.component';
const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'characters', component: CharacterMenuComponent, canActivate: [AuthGuard] },
  { path: 'charactercreation', component: CharacterCreationComponent, canActivate: [AuthGuard] },
  { path: 'attributedistribution', component: AttributeDistributionComponent, canActivate: [AuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
