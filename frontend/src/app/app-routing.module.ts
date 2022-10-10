import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DelegatComponent } from './delegat/delegat.component';
import { DisciplineViewComponent } from './discipline-view/discipline-view.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { RecordsComponent } from './records/records.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { SportViewComponent } from './sport-view/sport-view.component';
import { SportComponent } from './sport/sport.component';
import { TeamComponent } from './team/team.component';
import { TournamentComponent } from './tournament/tournament.component';
import { Tournament1Component } from './tournament1/tournament1.component';
import { Tournament2Component } from './tournament2/tournament2.component';
import { Tournament3Component } from './tournament3/tournament3.component';
import { UserComponent } from './user/user.component';
import { ViewComponent } from './view/view.component';
import { VodjaComponent } from './vodja/vodja.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'user', component: UserComponent},
  {path:'delegat', component:DelegatComponent},
  {path:'vodja', component:VodjaComponent},
  {path:'organizator', component:UserComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'changepassword', component:ChangepasswordComponent},
  {path:'sport', component:SportComponent},
  {path:'records', component:RecordsComponent},
  {path:'view', component:ViewComponent},
  {path:'team', component:TeamComponent},
  {path:'search', component:SearchComponent},
  {path:'tournaments', component:TournamentComponent},
  {path:'tournament1', component:Tournament1Component},
  {path:'tournament2', component:Tournament2Component},
  {path:'tournament3', component:Tournament3Component},
  {path:'view/:sport/:discipline', component:DisciplineViewComponent},
  {path:'view/:sport', component:SportViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
