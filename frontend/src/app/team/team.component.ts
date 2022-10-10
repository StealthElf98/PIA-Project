import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../country.service';
import { Athlete } from '../model/athlete';
import { Sport } from '../model/sport';
import { Team } from '../model/team';
import { User } from '../model/user';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(private router:Router, private sportService:SportService, private countryService:CountryService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'));
    this.sportService.getESports().subscribe((data:String[])=>{
      this.sports = data;
    })
  }

  user:User;
  sport:string;
  sex:string;
  discipline:string;
  disciplines:string[];
  sports:String[];
  athletes:string[] = ["","","","","","","","","","","","","",];
  atletika:boolean;
  kosarka:boolean;
  vaterpolo:boolean;
  odbojka:boolean;
  tenis:boolean;
  message:string;
  athletess:string[] = [];
  rank:string;

  logout(){
    localStorage.clear();
    this.router.navigate(['home']);
  }

  checkIfOk():boolean{
    let count = 0;
    if(this.atletika){
      for(let i=0;i<4;i++){
        if(this.athletes[i] == "") {return false;}
        count++;
        if(count == 4) return true;        
      }
    }else if(this.kosarka){
      for(let i=0;i<12;i++){
        if(this.athletes[i] != "") count++;
      }
      if(count >4) return true;
    }else if(this.odbojka || this.vaterpolo){
      for(let i=0;i<12;i++){
        if(this.athletes[i] != "") count++;
      }
      if(count >5) return true;
    }else if(this.tenis){
      if(this.athletes[0] != "" && this.athletes[1] != "") return true;
    }
    return false;
  }

  checkIfFilled():boolean{
    if(this.sex == undefined || this.sport == "" || (this.sport == "Atletika" && (this.discipline == "" || this.discipline == undefined)) 
    || (this.sport == "Tenis" && (this.discipline == "" || this.discipline == undefined))) 
      return false;
    return true;
  }

  insert(){
    if(this.checkIfFilled()){
      if(this.checkIfOk()){
        if(this.sport == "Kosarka" || this.sport == "Odbojka" || this.sport == "Vaterpolo"){
          this.sportService.teamExists(this.user.country, this.sport, this.discipline, this.sex).subscribe((team:Team)=>{
            if(team == null){
              for(let i=0;i<this.athletes.length;i++){
                if(this.athletes[i] != ""){
                  if(this.atletika){
                    this.sportService.addAthleteService(this.athletes[i], this.sex,this.sport, this.discipline, this.user.country).subscribe();
                  }else{
                    this.sportService.addAthleteService(this.athletes[i], this.sex,this.sport, null, this.user.country).subscribe();
                  }
                }
              }
              for(let i=0;i<this.athletes.length;i++){
                if(this.athletes[i] != ""){
                  this.athletess[i] = this.athletes[i];
                }
              }
              if(!this.atletika && !this.tenis) {this.discipline = null;}
              this.sportService.addTeam(this.user.country, this.sport, this.discipline, this.sex,
                this.athletess).subscribe((data:string)=>{
                  if(data) {
                    this.countryService.updateNum(this.user.country, this.athletess.length).subscribe();
                    alert("Team added!");
                  }
                })
            }else{
              alert("This team already exists!");
            }
          })
        }else if(this.sport == "Tenis"){
          let s = this.athletes[0] + "/" + this.athletes[1];
          alert(s);
          this.sportService.doubleExists(s).subscribe((data:Athlete)=>{
            if(data == null){
              this.sportService.addTenisPlayer(this.athletes[0], this.sex,this.sport, this.discipline, this.user.country, this.rank).subscribe();
              this.sportService.addTenisPlayer(this.athletes[1], this.sex,this.sport, this.discipline, this.user.country, this.rank).subscribe();
              this.sportService.addTenisPlayer(s, this.sex,this.sport, this.discipline, this.user.country, this.rank).subscribe();
              this.countryService.updateNum(this.user.country, 2).subscribe();
            }else{
              alert("This double already exists!");
            }
          })
        }
        
      }else{
        alert("Insert more athletes!");
      }
    }else{
      alert("Fill all the fields");
    }
  }

  firstDropDownChanged(val: any) {
    console.log(val);

    if (val == "Atletika") {
      this.atletika = true;
      this.kosarka = false;
      this.odbojka = false;
      this.vaterpolo = false;
      this.tenis = false;
      this.discipline = "";
      this.athletes = ["","","","","","","","","","","","","",];
      this.disciplines = ["","Stafetno trcanje 100m", "Stafetno trcanje 400m"];
    }else if(val == "Tenis"){
      this.atletika = false;
      this.kosarka = false;
      this.odbojka = false;
      this.vaterpolo = false;
      this.tenis = true;
      this.discipline = "";
      this.athletes = ["","","","","","","","","","","","","",];
      this.disciplines = ["",'Double'];
    }else{
      if(val == "Kosarka"){this.kosarka = true;this.vaterpolo = false;}
      else if(val == "Odbojka"){this.odbojka = true; this.vaterpolo = false;}
      else if(val == "Vaterpolo"){this.vaterpolo = true;}
      this.athletes = ["","","","","","","","","","","","","",];
      this.discipline = "";
      this.disciplines = [""];
    }
  }
}
