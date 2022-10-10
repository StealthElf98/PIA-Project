import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CountryService } from '../country.service';
import { Country } from '../model/country';
import { Medal } from '../model/medal';
import { User } from '../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private countryService:CountryService, private router:Router) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('ulogovan')) != null){
      this.logged = true;
      this.user = JSON.parse(localStorage.getItem('ulogovan'));
      if(this.user.type == 0) { this.organizator = true;}
      else if(this.user.type == 1) {this.delegat = true;}
      else if(this.user.type == 2) {this.vodja = true;}
    }
    this.countryService.getAllCountriesService().subscribe((data:Country[])=>{
      this.countries = data;
      this.countries.sort((a,b) =>{
        if(a.numberOfParticipants < b.numberOfParticipants)
          return 1;
        else
          return -1;
      }) 
      this.dataSource = new MatTableDataSource(this.countries);
    })
   
    this.countryService.getAllMedalsService().subscribe((data:Medal[])=>{
      this.medals = data;
      this.medals.sort((a,b)=>{
        if(a.all>b.all)
          return -1;
        else 
          return 1;
      })
      this.dataSource2 = new MatTableDataSource(this.medals);
      this.dataSource2.paginator = this.paginator.toArray()[1];
    })
    this.dataSource.paginator = this.paginator.toArray()[0];
    this.dataSource2.sort = this.sort.toArray()[0];
  }

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator.toArray()[0];
    this.dataSource2.paginator = this.paginator.toArray()[1];
  } 
  
  user:User;
  organizator:boolean;
  delegat:boolean;
  vodja:boolean;
  logged:boolean;
  countries:Country[];
  dataSource:MatTableDataSource<Country>;
  dataSource2:MatTableDataSource<Medal>;
  medals:Medal[];
  displayedColumns: string[] = ['flag', 'name', 'numberOfParticipants'];
  displayedColumns2: string[] = ['rank', 'country', 'gold', 'silver', 'bronze', 'all'];

  getAllCountries(){
    this.countryService.getAllCountriesService();
  }

  getAllMedals(){
    this.countryService.getAllMedalsService();
  }

  go(something:string){
    if(something == "login"){
      this.router.navigate(['login']);
    }else if(something == "register"){
      this.router.navigate(['register']);
    }
    else if(something == "home"){
      this.router.navigate(['home']);
    }
  }

  logout(){
    localStorage.clear();
    this.organizator = false;
    this.delegat = false;
    this.vodja = false;
    this.logged = false
    this.router.navigate(['home']);
  }
}