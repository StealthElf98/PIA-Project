import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DelegatComponent } from './delegat/delegat.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { VodjaComponent } from './vodja/vodja.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import { SportComponent } from './sport/sport.component';
import { RecordsComponent } from './records/records.component';
import { TeamComponent } from './team/team.component';
import { ViewComponent } from './view/view.component';
import { SearchComponent } from './search/search.component';
import { TournamentComponent } from './tournament/tournament.component';
import { Tournament1Component } from './tournament1/tournament1.component';
import { Tournament2Component } from './tournament2/tournament2.component';
import { Tournament3Component } from './tournament3/tournament3.component';
import { SportViewComponent } from './sport-view/sport-view.component';
import { DisciplineViewComponent } from './discipline-view/discipline-view.component';




@NgModule({
  declarations: [
    AppComponent,
    ChangepasswordComponent,
    DelegatComponent,
    HomeComponent,
    LoginComponent,
    OrganizatorComponent,
    RegisterComponent,
    UserComponent,
    VodjaComponent,
    SportComponent,
    RecordsComponent,
    TeamComponent,
    ViewComponent,
    SearchComponent,
    TournamentComponent,
    Tournament1Component,
    Tournament2Component,
    Tournament3Component,
    SportViewComponent,
    DisciplineViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule, 
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
