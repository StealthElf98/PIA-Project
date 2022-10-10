import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../country.service';
import { Athlete } from '../model/athlete';
import { Sport } from '../model/sport';
import { Tournament } from '../model/tournament';
import { User } from '../model/user';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-vodja',
  templateUrl: './vodja.component.html',
  styleUrls: ['./vodja.component.css']
})
export class VodjaComponent implements OnInit {

  constructor(private router:Router, private sportService:SportService, private countryService:CountryService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'));
    this.sportService.getISports().subscribe((data:String[])=>{
      this.sports = data;
    })
  }

  user:User;
  name:string;
  sex:string;
  sport:string;
  discipline:string;
  disciplines:String[];
  sports:String[];
  rank:number;
  tenis:boolean;
  
  logout(){
    localStorage.clear();
    this.router.navigate(['home']);
  }

  checkIfFilled():boolean{
    if(this.name == undefined || this.sex == undefined || this.sport == "" || this.sport == undefined || 
    this.discipline == "" || this.discipline == undefined){
      return false;
    }
    return true;
  }

  insert(){
    if(this.checkIfFilled()){
      this.sportService.alreadyExists(this.name, this.discipline).subscribe((athlete:Athlete)=>{
        if(athlete == null){
          this.sportService.getStartDateService(this.discipline, this.sex).subscribe((data:Tournament)=>{
            if(data == null){
              this.sportService.sameSportService(this.name, this.sport).subscribe((data2:Athlete)=>{
                if(data2 == null){
                  if(this.sport != "Tenis"){
                    this.sportService.addAthleteService(this.name, this.sex,this.sport, this.discipline, this.user.country).subscribe(response=>{
                      if(response['message']='Athlete added'){
                        this.countryService.updateNum(this.user.country, 1).subscribe();
                        alert("OK!");
                      }     
                    }) 
                  }else{
                    this.sportService.addTenisPlayer(this.name, this.sex,this.sport, this.discipline, this.user.country, this.rank).subscribe(response=>{
                      if(response['message']='Athlete added'){
                        alert("OK!");
                      }     
                    }) 
                  }

                }else{
                  alert("One athlete can't participate in 2 different sports!");
                }
              })
            }else{
              alert("Application period expired");
            }
          })
        }else{
          alert("This athlete is already signed up for tournament!");
        }
      })
    }else{
      alert("Fill all the fields");
    }
  }

  firstDropDownChanged(val: any) {
    console.log(val);

    if (val == "Atletika") {
      this.tenis = false
      this.disciplines = ["","100m trcanje", '200m trcanje', '400m trcanje', '800m trcanje','5000m trcanje',
      '10000m trcanje', 'Skok u vis', 'Skok u dalj', 'Troskok',
      'Skok sa motkom', 'Bacanje kugle', 'Bacanje disk', 'Bacanje kladiva', 'Bacanje koplja','Maraton', '20km brzno hodanje',
      '50km brzo hodanje'];
    }
    else if (val == "Streljastvo") {
      this.tenis = false
      this.disciplines = ["",'50m trostav', '10m vazdusna puska', '25m malokalib. pistolj', '10m vazdusni pistolj'];
    }
    else if (val == "Biciklizam") {
      this.tenis = false
      this.disciplines = ["",'Drumska trka 225km'];
    }
    else if(val == "Plivanje") {
      this.tenis = false
      this.disciplines = ["",'100m leptir', '200m slobodno']
    }else if(val == "Tenis"){
      this.tenis = true;
      this.disciplines = ["",'Single'];
    }else{
      this.tenis = false;
      this.disciplines = [""];
    }
  }

}
