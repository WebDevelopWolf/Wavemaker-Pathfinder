import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { JourneyComponent } from './journey/journey.component';
import { HowitworksComponent } from './journey/howitworks/howitworks.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch:'full'},
  {path: 'dashboard', component: HomeComponent},
  {path: 'journey', component: JourneyComponent},
  {path: 'journey/howitworks', component: HowitworksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
