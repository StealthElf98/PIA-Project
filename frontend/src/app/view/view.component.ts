import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Athlete } from '../model/athlete';
import { User } from '../model/user';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private router:Router, private sportService:SportService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'));
    this.sportService.getAllAthletesFromCountry(this.user.country).subscribe((data:Athlete[])=>{
      var temp = [];
      this.total = data.length;
      this.athletes = data;
        this.athletes.forEach(function(item){
          var i = temp.findIndex(x => x.name == item.name);
          if(i <= -1){
            temp.push({name : item.name, sex:item.sex, sport:item.sport, discipline:item.discipline, country:item.country});
          }
        })
        this.athletes = temp;

      if(this.athletes.filter(e => e.sport === 'Atletika').length > 0){
        this.sportovi.push(new Pom("Atletika", this.athletes.filter(e => e.sport === 'Atletika').length));
      }
      if(this.athletes.filter(e => e.sport === 'Kosarka').length > 0){
        this.sportovi.push(new Pom("Kosarka", this.athletes.filter(e => e.sport === 'Kosarka').length));
      }
      if(this.athletes.filter(e => e.sport === 'Odbojka').length > 0){
        this.sportovi.push(new Pom("Odbojka", this.athletes.filter(e => e.sport === 'Odbojka').length));
      }
      if(this.athletes.filter(e => e.sport === 'Tenis').length > 0){
        this.sportovi.push(new Pom("Tenis", this.athletes.filter(e => e.sport === 'Tenis').length));
      }
      if(this.athletes.filter(e => e.sport === 'Vaterpolo').length > 0){
        this.sportovi.push(new Pom("Vaterpolo", this.athletes.filter(e => e.sport === 'Vaterpolo').length));
      }
      if(this.athletes.filter(e => e.sport === 'Streljastvo').length > 0){
        this.sportovi.push(new Pom("Streljastvo", this.athletes.filter(e => e.sport === 'Streljastvo').length));
      }
      if(this.athletes.filter(e => e.sport === 'Biciklizam').length > 0){
        this.sportovi.push(new Pom("Biciklizam", this.athletes.filter(e => e.sport === 'Biciklizam').length));
      }
      if(this.athletes.filter(e => e.sport === 'Plivanje').length > 0){
        this.sportovi.push(new Pom("Plivanje", this.athletes.filter(e => e.sport === 'Plivanje').length));
      }
    })
  }

  user:User;
  athletes:Athlete[] = [];
  athletess:String[];
  kosarka:boolean;
  kosarkaa:number;
  odbojka:boolean;
  odbojkaa:number;
  tenis:boolean;
  teniss:number;
  vaterpolo:boolean;
  vaterpoloo:number;
  atletika:boolean;
  atletikaa:number;
  streljastvo:boolean;
  streljastvoo:number;
  biciklizam:boolean;
  biciklizamm:number
  plivanje:boolean;
  plivanjee:number;
  sportovi:Pom[] = [];

  logout(){
    localStorage.clear();
    this.router.navigate(['home']);
  }

  total:number;
}

export class Pom{
  sport:string;
  broj:number;

  constructor(sportt, brojj){
    this.sport = sportt; this.broj = brojj; 
  }
}
