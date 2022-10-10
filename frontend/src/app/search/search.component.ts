import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CountryService } from '../country.service';
import { Athlete } from '../model/athlete';
import { Country } from '../model/country';
import { User } from '../model/user';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private sportService:SportService, private countryService:CountryService, private router:Router) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('ulogovan'))){
      this.logged = true;
      this.user = JSON.parse(localStorage.getItem('ulogovan'));
      if(this.user.type == 0) { this.organizator = true;}
      else if(this.user.type == 1) {this.delegat = true;}
      else {this.vodja = true;}
    }
    this.countryService.getAllDistinctCountriesService().subscribe((data:String[])=>{
      this.countries = data;
    })
    this.sportService.getAllSportsService().subscribe((data:String[])=>{
      this.sports = data;
    })
    this.sportService.distinctDisciplinesService().subscribe((data:String[])=>{
      this.disciplines = data;
    })
    this.dataSource.paginator = this.paginator;
  }

  user:User;
  organizator:boolean;
  delegat:boolean;
  vodja:boolean;
  logged:boolean;
  name:string;
  country:string;
  sport:string;
  discipline:string;
  sex:string;
  wonM:boolean;
  dataSource:MatTableDataSource<Athlete>;
  displayedColumns: string[] = ['athlete','sex','sport','discipline','country','medal'];

  athletes:Athlete[];
  temp:Athlete[];

  countries:String[];
  disciplines:String[];
  sports:String[];

  @ViewChild(MatPaginator) paginator: MatPaginator; 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }  

  search(){
    this.sportService.getAllAthletesByParamService(this.name, this.sex, this.sport, this.discipline, this.country,
      this.wonM).subscribe((data:Athlete[])=>{
        var temp = [];
        this.athletes = data;
        this.athletes.forEach(function(item){
          var i = temp.findIndex(x => x.name == item.name);
          if(i <= -1){
            temp.push({name : item.name, sex:item.sex, sport:item.sport, discipline:item.discipline, country:item.country});
          }
        })
        this.athletes = temp;
        this.dataSource = new MatTableDataSource(this.athletes);
        this.dataSource.paginator = this.paginator;
      })
  }

  firstDropDownChanged(val: any) {
    console.log(val);

    if (val == "Atletika") {
      this.disciplines = ["All Disciplines","100m trcanje", '200m trcanje', '400m trcanje', '800m trcanje','5000m trcanje',
      '10000m trcanje', 'Skok u vis', 'Skok u dalj', 'Troskok',
      'Skok sa motkom', 'Bacanje kugle', 'Bacanje disk', 'Bacanje kladiva', 'Bacanje koplja','Maraton', '20km brzno hodanje',
      '50km brzo hodanje'];
    }
    else if (val == "Streljastvo") {
      this.disciplines = ["All Disciplines",'50m trostav', '10m vazdusna puska', '25m malokalib. pistolj', '10m vazdusni pistolj'];
    }
    else if (val == "Biciklizam") {
      this.disciplines = ['Drumska trka 225km'];
    }
    else if(val == "Plivanje") {
      this.disciplines = ["All Disciplines",'100m leptir', '200m slobodno']
    }else if(val == "Tenis"){
      this.disciplines = ['Single', 'Double'];
    }else if((val == "Kosarka") || (val == "Odbojka") || (val == "Vaterpolo")){
      this.disciplines = [''];
    }else{
      this.sportService.distinctDisciplinesService().subscribe((data:String[])=>{
        this.disciplines = data;
      })
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
