import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../country.service';
import { Athlete } from '../model/athlete';
import { AthleteT } from '../model/athleteT';
import { Result } from '../model/result';
import { Tournament } from '../model/tournament';
import { User } from '../model/user';
import { SportService } from '../sport.service';
import { TournamentService } from '../tournament.service';
import { Match } from '../model/match';
import { ResultT } from '../model/resultT';
import { Group } from '../model/group';
import { Points } from '../model/points';

@Component({
  selector: 'app-tournament1',
  templateUrl: './tournament1.component.html',
  styleUrls: ['./tournament1.component.css']
})
export class Tournament1Component implements OnInit {

  constructor(private router:Router, private tournamentService:TournamentService, private sportService:SportService,
    private countryService:CountryService) { }

    ngOnInit(): void {
      this.user = JSON.parse(localStorage.getItem('ulogovan'));
      this.round = 1;
      this.tournamentService.getTournaments(this.user.username).subscribe((data:Tournament[])=>{
        this.tournament1 = data[0];
        if(data[0].sport != "Kosarka" && data[0].sport != "Odbojka" && data[0].sport != "Vaterpolo" 
        && data[0].sport != "Tenis"){
          this.athletes = data[0].athletes;
        this.br = data[0].athletes.length;
        this.button2 = true;
        if(data[0].format == '1 krug'){
          this.jedanKrug = true;
        }else if(data[0].format == "3 kruga"){
          this.triKruga = true;
        }else{
          this.sestKrugova = true;
        }
        this.tournamentService.getAllResults(this.tournament1.discipline, this.tournament1.sex).subscribe((results:Result[])=>{
          this.result1 = results;
          if(this.result1[0].result1 != null){
            var temp:Result[] = [null,null,null,null,null,null,null,null];
            for(var i=0;i<this.athletes.length;i++){
              for(var j=0;i<this.result1.length;j++){
                if(this.result1[j].athlete == this.athletes[i].name){temp[i] = this.result1[j];break;}
              }
            }
            this.result1 = temp;
            this.has = true;
            if(this.jedanKrug){
              this.hass[0] = true; 
            }else if(this.triKruga){
              for(let i=0;i<3;i++)
                this.hass[i] = true;
            }else{
              for(let i=0;i<6;i++)
                this.hass[i] = true;
            }
            this.button1 = true;
            this.button2 = true;
            this.message = "Tournament is over, medals are given!";
          }
        })
        }else{
          if(data[0].sport == "Tenis"){
            this.tournamentService.getResultT(this.tournament1.sport, this.tournament1.discipline, this.tournament1.sex).subscribe((data:ResultT)=>{
            if(data){
              this.start = false;
              this.resultT = data;
              this.tenis = true;
              this.br = this.tournament1.athletes.length;
              if(this.br == 16){
                if(this.resultT.round <= 8){
                  this.osmina = true;
                  for(let i=0;i<this.resultT.osmina.length;i++){
                    this.matchesO[i] = this.resultT.osmina[i];
                  }
                  if(this.resultT.round <= 4){
                    this.cetvrtina = true;
                    for(let i=0;i<this.resultT.cetvrtina.length;i++){
                      this.matchesC[i] = this.resultT.cetvrtina[i];
                    }
                    this.hasT1 = true;
                    if(this.resultT.round <= 2){
                      this.polufinale = true;
                      for(let i=0;i<this.resultT.polufinale.length;i++){
                        this.matchesP[i] = this.resultT.polufinale[i];
                      }
                      this.hasT2 = true;
                      if(this.resultT.round <= 1){
                        this.finale = true;
                        this.matchesF[0] = this.resultT.finale[0];
                        this.matchesTM[0] = this.resultT.treceMesto[0];
                        this.hasT3 = true;
                        if(this.resultT.round == 0){
                          this.over = true;
                          this.hasT4 = true;
                        }
                      }
                    }
                  }
                }  
              }if(this.br == 8){
                if(this.resultT.round <= 4){
                  this.cetvrtina = true;
                  for(let i=0;i<this.resultT.cetvrtina.length;i++){
                    this.matchesC[i] = this.resultT.cetvrtina[i];
                  }
                  this.hasT1 = true;
                  if(this.resultT.round <= 2){
                    this.polufinale = true;
                    for(let i=0;i<this.resultT.polufinale.length;i++){
                      this.matchesP[i] = this.resultT.polufinale[i];
                    }
                    this.hasT2 = true;
                    if(this.resultT.round <= 1){
                      this.finale = true;
                      this.matchesF[0] = this.resultT.finale[0];
                      this.matchesTM[0] = this.resultT.treceMesto[0];
                      this.hasT3 = true;
                      if(this.resultT.round == 0){
                        this.over = true;
                        this.hasT4 = true;
                      }
                    }
                  }
                }
              }
              if(this.br == 4){
                if(this.resultT.round <= 2){
                  this.polufinale = true;
                  for(let i=0;i<this.resultT.polufinale.length;i++){
                    this.matchesP[i] = this.resultT.polufinale[i];
                  }
                  this.hasT2 = true;
                  if(this.resultT.round <= 1){
                    this.finale = true;
                    this.matchesF[0] = this.resultT.finale[0];
                    this.matchesTM[0] = this.resultT.treceMesto[0];
                    this.hasT3 = true;
                    if(this.resultT.round == 0){
                      this.over = true;
                      this.hasT4 = true;
                    }
                  }
                }
              }
            }else{
              this.athletes = this.tournament1.athletes;
              this.sportService.getTenisPlayers(this.tournament1.sport, this.tournament1.discipline, this.tournament1.sex).subscribe((data:AthleteT[])=>{
                this.athletesT = data;
                for(let i=0;i<this.athletes.length;i++)
                  for(let j=0;j<this.athletesT.length;j++){
                    if(this.athletes[i].name == this.athletesT[j].name){
                      this.athletesTT[i] = this.athletesT[j];
                      break;
                    }
                  }
                this.athletesTT.sort((a,b)=>{
                  if(a.rank<b.rank)
                    return -1;
                  else
                    return 1;
                })
              })
              this.tenis = true;
              this.start = true;
              }
            })
          }else if(data[0].sport == "Kosarka" || data[0].sport == "Odbojka" || data[0].sport == "Vaterpolo"){
            this.ekipni = true;
            this.tournamentService.getGroups(this.tournament1.sex, this.tournament1.sport).subscribe((data:Group)=>{
              if(data){
                this.start=false;
                this.groups = data;
              }else{
                this.start = true;
                this.over = false;
                for(let i=0;i<this.tournament1.athletes.length;i++){
                  this.countries[i] = this.tournament1.athletes[i].country;
                }
              }
            })
          }
        }
        
      })
    }
  
    result1:Result[];
    br:Number;
    user:User;
    has:boolean;
    hass:boolean[] = [false, false, false,false, false, false];
    jedanKrug:boolean;
    triKruga:boolean;
    sestKrugova:boolean;
    tournament1:Tournament;
    athletes:Athlete[];
    results1:string[] = ["","","","","","","","",];
    results2:string[] = ["","","","","","","","",];
    results3:string[] = ["","","","","","","","",];
    results4:string[] = ["","","","","","","","",];
    results5:string[] = ["","","","","","","","",];
    results6:string[] = ["","","","","","","","",];
    bestResults:string[] = ["","","","","","","","",];
    sumResults:number[] = [0,0,0,0,0,0,0,0];
    button1:boolean;
    message:String;
    over:boolean;
    button2:boolean;
    round:number;
    athletesT:AthleteT[];
    athletesTT:AthleteT[] = [];
    tenis:boolean;
    team:boolean;
    indi:boolean;
    matches:Match[] = [];
    osmina:boolean;
    cetvrtina:boolean;
    polufinale:boolean;
    finale:boolean;
    resultT:ResultT;
    osminaf:Match[] = [];
    cetvrtinaf:Match[] = [];
    poluf:Match[] = [];
    finalef:Match[];
    treceMf:Match[];
    hasT1:boolean;
    hasT2:boolean;
    hasT3:boolean;
    hasT4:boolean;
    matchesO:Match[] = [];
    matchesC:Match[]= [];
    matchesP:Match[]= [];
    matchesF:Match[]= [null];
    matchesTM:Match[]= [null];
    start:boolean;
    rez1:string[] = ["","","","","","","",""];
    rez2:string[] = ["","","",""];
    rez3:string[] = ["",""];
    rez4:string[] = ["",""];
    m:Match[] = [];
    m2:Match[] = [];
    ekipni:boolean;
    countries:String[] = [];
    groups:Group;
  
    logout(){
      localStorage.clear();
      this.router.navigate(['home']);
    }
  
    checkIfFieldsFilled(col:number):boolean{
      if(col == 1){
        for(let i=0;i<this.athletes.length;i++){
          if(this.results1[i]=="") return false;
        }
      }else if(col == 2){
        for(let i=0;i<this.athletes.length;i++){
          if(this.results2[i]=="") return false;
        }
      }else if(col == 3){
        for(let i=0;i<this.athletes.length;i++){
          if(this.results3[i]=="") return false;
        }
      }
      return true;
    }
  
    checkInput(num:number):boolean{
      let results = [];
      if(this.round == 1){
        results = this.results1;
      }else if(this.round == 2){
        results = this.results2;
      }
      else if(this.round == 3){
        results = this.results3;
      }else if(this.round == 4){
        results = this.results4;
      }
      else if(this.round == 5){
        results = this.results5;
      }else{
        results = this.results6;
      }
      if(this.tournament1.sport =='Atletika'){
        if(this.tournament1.discipline =="100m trcanje" || this.tournament1.discipline =="200m trcanje" 
        || this.tournament1.discipline =="400m trcanje"){
          var regex = /^[0-9]{1,2},[0-9]{1,2}$/;
          for(var i=0;i<this.athletes.length;i++){
            if(!regex.test(results[i])){return false;}
          }
        }else if(this.tournament1.discipline =="800m trcanje" || this.tournament1.discipline =="5000m trcanje" ||
        this.tournament1.discipline =="10000m trcanje"){
          var regex = /^[0-9]{1,2}:[0-9]{1,2},[0-9]{1,2}$/;
          for(var i=0;i<this.athletes.length;i++){
            if(!regex.test(results[i])){return false;}
          }
        }
        else if(this.tournament1.discipline =='20km brzo hodanje'|| this.tournament1.discipline =='50km brzo hodanje'
         || this.tournament1.discipline =='maraton'){
           var regex = /^[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/;
           for(var i=0;i<this.athletes.length;i++){
            if(!regex.test(results[i])){return false;}
          }
         }else if(this.tournament1.discipline == 'Skok u vis' || this.tournament1.discipline == 'Skok u dalj' ||
         this.tournament1.discipline == 'Troskok' || this.tournament1.discipline == 'Skok sa motkom'){
          var regex = /^[0-9]{1},[0-9]{2}$/;
          for(var i=0;i<this.athletes.length;i++){
            if(!regex.test(results[i])){return false;}
          }
         }else if(this.tournament1.discipline == 'Bacanje kugle' || this.tournament1.discipline == 'Bacanje diska' ||
         this.tournament1.discipline == 'Bacanje kladiva' || this.tournament1.discipline == 'Bacanje koplja'){
          var regex = /^[0-9]{2},[0-9]{2}$/;
          for(var i=0;i<this.athletes.length;i++){
            if(!regex.test(results[i])){return false;}
          }
         }
         else if(this.tournament1.discipline == 'Maraton' || this.tournament1.discipline == '20km brzo hodanje' 
         || this.tournament1.discipline == '50km brzo hodanje'){
          var regex = /^[0-9]{1,2}:[0-9]{2}:[0-9]{2}$/;
          for(var i=0;i<this.athletes.length;i++){
            if(!regex.test(results[i])){return false;}
          }
         }
      }else if(this.tournament1.sport =='Biciklizam'){
        var regex = /^[0-9]{1,2}:[0-9]{2}:[0-9]{2}$/;
          for(var i=0;i<this.athletes.length;i++){
            if(!regex.test(results[i])){return false;}
          }
      }else if(this.tournament1.sport =='Plivanje'){
        var regex = /^[0-9]{1,2},[0-9]{1,2}$/;
          for(var i=0;i<this.athletes.length;i++){
            if(!regex.test(results[i])){return false;}
          }
      }else if(this.tournament1.sport == 'Streljastvo'){
        var regex = /^[0-9]{1,3}.[0-9]{1}$/;
          for(var i=0;i<this.athletes.length;i++){
            if(!regex.test(results[i])){return false;}
          }
      }
      return true;
    }
  
    next(){
        if(this.jedanKrug){
          if(this.checkIfFieldsFilled(1)){
            if(this.checkInput(1)){
              for(var i=0;i<this.athletes.length;i++){
                this.tournamentService.insertResults(this.athletes[i].name, this.tournament1.discipline, this.results1[i], 1).subscribe((response:any)=>{
                })
              }
              this.tournamentService.getAllResults(this.tournament1.discipline, this.tournament1.sex).subscribe((results:Result[])=>{
                this.result1 = results;
                var temp:Result[] = [null,null,null,null,null,null,null,null];
                for(var i=0;i<this.athletes.length;i++){
                  for(var j=0;i<this.result1.length;j++){
                    if(this.result1[j].athlete == this.athletes[i].name){temp[i] = this.result1[j];break;}
                  }
                }
                this.result1 = temp;
                this.hass[0] = true;
                this.button1 = true;
                this.button2 = false;
              })
            }else{
              alert("Input format is bad!");
            }
            
          }else{
            alert("Please fill all results!");
          }
        }else if(this.triKruga || this.sestKrugova){
          if(this.checkIfFieldsFilled(this.round)){
            if(this.checkInput(this.round)){
              let results = [];
              if(this.round == 1){
                results = this.results1;
              }else if(this.round == 2){
                results = this.results2;
              }
              else if(this.round == 3){
                results = this.results3;
              }else if(this.round == 4){
                results = this.results4;
              }
              else if(this.round == 5){
                results = this.results5;
              }else{
                results = this.results6;
              }
              for(var i=0;i<this.athletes.length;i++){
                if(this.triKruga){
                  if(this.round == 1){
                    this.bestResults[i] = results[i];
                  }else{
                    if(this.bestResults[i] < results[i]){
                      this.bestResults[i] = results[i];
                    }
                  }
                }
                this.tournamentService.insertResults(this.athletes[i].name, this.tournament1.discipline, results[i], this.round).subscribe((response:any)=>{
                })
              }
              alert(this.round + ". krug zavrsen!");
                this.tournamentService.getAllResults(this.tournament1.discipline, this.tournament1.sex).subscribe((results:Result[])=>{
                  this.result1 = results;
                  var temp:Result[] = [null,null,null,null,null,null,null,null];
                  for(var i=0;i<this.athletes.length;i++){
                    for(var j=0;i<this.result1.length;j++){
                      if(this.result1[j].athlete == this.athletes[i].name){temp[i] = this.result1[j];break;}
                    }
                  }
                  this.result1 = temp;
                  this.hass[this.round-1] = true;
                  this.round ++;
                  if((this.round == 4 && this.triKruga) || (this.round == 7 && this.sestKrugova)){
                    this.button1 = true;
                    this.button2 = false;
                  }
                })
            }else{
              alert("Input format is bad!");
            }
          }else{
            alert("Please fill all results!");
          }
        }
    }

    chechEInput(round):boolean{
      let rez = [];
      if(round == 8){
        rez = this.rez1;
      }else if(round == 4){
        rez = this.rez2;
      }
      else if(round == 2){
        rez = this.rez3;
      }
      else if(round == 1){
        rez = this.rez4;
      }
      if(this.tournament1.sport == "Tenis"){
        var regex = /^([2]:[0]||[2]:[1]||[1]:[2]||[0]:[2])$/;
        for(let i=0;i<rez.length;i++){
          if(!regex.test(rez[i])) return false;
        }
      }
      return true;
    }

    checkTFilled(round):boolean{
      let rez = [];
      if(round == 8){
        rez = this.rez1;
      }else if(round == 4){
        rez = this.rez2;
      }
      else if(round == 2){
        rez = this.rez3;
      }
      else if(round == 1){
        rez = this.rez4;
      }
      if(this.tournament1.sport == "Tenis"){
        for(let i=0;i<rez.length;i++){
          if(rez[i] == "") return false;
        }
      }
      return true;
    }

    insertResults() {
      let m2 = [];
      let rez = [];
      if(this.resultT.round % 2 == 0){
        if(this.resultT.round == 8){
          this.m = this.matchesO;
          rez = this.rez1;
  
        }else if(this.resultT.round == 4){
          this.m = this.matchesC;
          rez = this.rez2;
        }
        else if(this.resultT.round == 2){
          this.m = this.matchesP;
          rez = this.rez3;
        }
        for(let k=0;k<this.m.length;k++){
          this.tournamentService.insertResultT(this.m[k].name1, this.m[k].name2, this.tournament1.sex, rez[k], this.resultT.round).subscribe((data:any)=>{
            if(data){
              this.ngOnInit();
            }
          });
        }
      }else{
        this.tournamentService.insertResultT(this.matchesF[0].name1, this.matchesF[0].name2, this.tournament1.sex, this.rez4[0], 1).subscribe();
        this.tournamentService.insertResultT(this.matchesTM[0].name1, this.matchesTM[0].name2, this.tournament1.sex, this.rez4[1], 3).subscribe((data)=>{
          if(data){
            this.ngOnInit();
          }
        });
      }
      
    }

    insertNewRound(){
      let m2 = [];
      let rez = [];
      let s1, s2, s3, s4;
      let name1 ="", name2 = "",name3 = "", name4="";
      if(this.resultT.round == 8){
        this.m = this.matchesO;
        rez = this.rez1;

      }else if(this.resultT.round == 4){
        this.m = this.matchesC;
        rez = this.rez2;
      }
      else if(this.resultT.round == 2){
        this.m = this.matchesP;
        rez = this.rez3;
      }
      else if(this.resultT.round == 1){
        m2 = this.matchesTM;
        this.m = this.matchesF;
      }
      for(let k=0;k<this.m.length;k+=2){
        s1 = rez[k].split(":")[0];
          s2 = rez[k].split(":")[1];
          s3 = rez[k+1].split(":")[0];
          s4 = rez[k+1].split(":")[1];
          if(s1 > s2){
            name1 = this.m[k].name1;
            name3 = this.m[k].name2;
          }
          else{
            name1 = this.m[k].name2;
            name3 = this.m[k].name1;
          }
          if(s3 > s4){
            name2 = this.m[k+1].name1;
            name4 = this.m[k+1].name2;
          }
          else{
            name2 = this.m[k+1].name2;
            name4 = this.m[k+1].name1;
          }
        if(this.resultT.round == 8){
          this.hasT1 = true;
          this.tournamentService.insertMatch(name1, name2, this.tournament1.sex,this.tournament1.sport, this.tournament1.discipline, 4).subscribe();
        }else if(this.resultT.round == 4){
          this.hasT2 = true;
          this.hasT1 = true;
          this.tournamentService.insertMatch(name1, name2, this.tournament1.sex,this.tournament1.sport, this.tournament1.discipline, 2).subscribe();
        }else if(this.resultT.round == 2){
          this.tournamentService.insertMatch(name1, name2, this.tournament1.sex,this.tournament1.sport, this.tournament1.discipline, 1).subscribe();
          this.tournamentService.insertMatch(name3, name4, this.tournament1.sex,this.tournament1.sport, this.tournament1.discipline, 3).subscribe();
          this.hasT3 = true;
        }
      }

    }
  

    nextT(){
      if(this.checkTFilled(this.resultT.round)){
        if(this.chechEInput(this.resultT.round)){
          this.insertResults();
          this.insertNewRound();
        }else{
          alert("Bad input format!");
        }
      }else{
        alert("Fill all fields!");
      }
    }
  
  
    finish(){
      var pom:Pomoc[] = [];
      if(this.jedanKrug){
        for(var i=0;i<this.athletes.length;i++){
          pom.push(new Pomoc(this.athletes[i].name, this.result1[i].result1));
        }
        pom.sort((a,b)=>{
        if(a.result>b.result)
          return 1;
        else 
          return -1;
        })
      }else if(this.triKruga){
        for(var i=0;i<this.athletes.length;i++){
          pom.push(new Pomoc(this.athletes[i].name, this.bestResults[i]));
        }
        pom.sort((a,b)=>{
          if(a.result<b.result)
            return 1;
          else 
            return -1;
          })
      }else if(this.sestKrugova){
        for(var i=0;i<this.athletes.length;i++){
          pom.push(new Pomoc(this.athletes[i].name, this.results6[i]));
        }
        pom.sort((a,b)=>{
          if(a.result<b.result)
            return 1;
          else 
            return -1;
          })
      }
      let names = [pom[0].name,pom[1].name,pom[2].name];
      let countries = [];
      this.sportService.giveGold(names[0], this.tournament1.discipline).subscribe();
      this.sportService.giveSilver(names[1], this.tournament1.discipline).subscribe();
      this.sportService.giveBronze(names[2], this.tournament1.discipline).subscribe();
      
      for(let i=0;i<names.length;i++){
        for(let j=0; j<this.athletes.length;j++){
          if(this.athletes[j].name == names[i]){
            countries.push(this.athletes[j].country);
          }
        }
      }
      this.countryService.giveGold(countries[0]).subscribe();
      this.countryService.giveSilver(countries[1]).subscribe();
      this.countryService.giveBronze(countries[2]).subscribe();
      alert("Medals given!");
      this.over = true;
    }

    finishT(){
      let gold = "", silver="", bronze="", g1, g2, si1, si2, b1, b2
      let s1, s2, s3, s4;
      s1 = this.matchesF[0].result.split(":")[0];
      s2 = this.matchesF[0].result.split(":")[1];
      s3 = this.matchesTM[0].result.split(":")[0];
      s4 = this.matchesTM[0].result.split(":")[1];
      if(s1 > s2){
        gold = this.matchesF[0].name1;
        silver = this.matchesF[0].name2;
      }else{
        gold = this.matchesF[0].name2;
        silver = this.matchesF[0].name1;
      }
      if(s3 > s4){
        bronze = this.matchesTM[0].name1;
      }else{
        bronze = this.matchesTM[0].name2;
      }
      this.sportService.giveGold(gold, this.tournament1.discipline).subscribe();
      this.sportService.giveSilver(silver, this.tournament1.discipline).subscribe();
      this.sportService.giveBronze(bronze, this.tournament1.discipline).subscribe();

      if(this.tournament1.discipline == "Double"){
        g1 = gold.split("/")[0];
        g2 = gold.split("/")[1];
        si1 = silver.split("/")[0];
        si2 = silver.split("/")[1];
        b1 = bronze.split("/")[0];
        b2 = bronze.split("/")[1];
        this.sportService.giveGold(g1, this.tournament1.discipline).subscribe();
        this.sportService.giveGold(g2, this.tournament1.discipline).subscribe();
        this.sportService.giveSilver(si1, this.tournament1.discipline).subscribe();
        this.sportService.giveSilver(si2, this.tournament1.discipline).subscribe();
        this.sportService.giveBronze(b1, this.tournament1.discipline).subscribe();
        this.sportService.giveBronze(b2, this.tournament1.discipline).subscribe();
      }

      this.sportService.getAthlete(gold,this.tournament1.discipline).subscribe((data:Athlete)=>{
        this.countryService.giveGold(data.country).subscribe();
      })
      this.sportService.getAthlete(silver,this.tournament1.discipline).subscribe((data:Athlete)=>{
        this.countryService.giveSilver(data.country).subscribe();
      })
      this.sportService.getAthlete(bronze,this.tournament1.discipline).subscribe((data:Athlete)=>{
        this.countryService.giveBronze(data.country).subscribe();
      })
      alert("Medals are given!");
    }

    random(){
      let napred = 0;
      let nazad = this.athletesTT.length/2-1;
      let j=this.athletesTT.length-1;
      for(let i=0; i<this.athletesTT.length/2;i++){
        if(i%2 == 0){
          this.matches[napred] = new Match(this.athletesTT[i].name,this.athletesTT[j].name, this.tournament1.sex, this.tournament1.sport, this.tournament1.discipline, null, null, null, null);
          napred++;
          j--;
        }else{
          this.matches[nazad] = new Match(this.athletesTT[i].name,this.athletesTT[this.athletesTT.length-1-i].name, this.tournament1.sex, this.tournament1.sport, this.tournament1.discipline, null, null, null, null);
          nazad--;
          j--;
        }
      }
      if(this.matches.length == 8){
        this.tournamentService.insertOsmina(this.tournament1.sport, this.tournament1.discipline,this.tournament1.sex,  this.matches, this.user.username).subscribe((data:any)=>{
          if(data){
            this.osmina = true;
            alert("Uneta osmina!");
          }
        })
      }else if(this.matches.length == 4){
        this.tournamentService.insertCetvrtina(this.tournament1.sport, this.tournament1.discipline,this.tournament1.sex,  this.matches, this.user.username).subscribe((data:any)=>{
          if(data){
            this.cetvrtina = true;
            alert("Uneto cetvrtfinale!");
          }
        })
      }else if(this.matches.length == 2){
        this.tournamentService.insertPolufinale(this.tournament1.sport, this.tournament1.discipline,this.tournament1.sex,  this.matches, this.user.username).subscribe((data:any)=>{
          if(data){
            this.polufinale = true;
            alert("Unetos polufinale!");
          }
        })
      }
      this.ngOnInit();
    }

    randomE(){
      if(this.tournament1.athletes.length == 12){
        let temp = [];
       
        while(this.countries.length>0){
          let num = Math.floor(Math.random() * (this.countries.length));
          temp.push(this.countries[num]);
          if(num !== -1){
            this.countries.splice(num, 1);
          }
        }
        this.countries = temp;
        this.groups = new Group([],[],this.tournament1.sex,this.tournament1.sport);
        for(let i=0;i<this.countries.length;i++){
          if(i<6){
            this.groups.groupA.push(new Points(this.countries[i], 0, []));
          }else{
            this.groups.groupB.push(new Points(this.countries[i], 0, []));
          }
        }
        this.tournamentService.insertGroups(this.groups.groupA, this.groups.groupB, this.groups.sex
          ,this.groups.sport).subscribe((res:any)=>{
          if(res){
            alert("OK");
            this.ngOnInit();
          }
        })
      }else{

      }
    }

    nextE(){

    }

    finishE(){
      
    }
}

export class Pomoc{
  name:String;
  result:String;

  constructor(n:string, r:string){
    this.name = n; this.result=r;
  }
}
