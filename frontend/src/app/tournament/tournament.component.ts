import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Athlete } from '../model/athlete';
import { AthleteT } from '../model/athleteT';
import { Team } from '../model/team';
import { Tournament } from '../model/tournament';
import { User } from '../model/user';
import { SportService } from '../sport.service';
import { TournamentService } from '../tournament.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  constructor(private router:Router, private sportService:SportService, 
    private userService:UserService, private tournamentService:TournamentService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'));

    this.sportService.getAllSportssService().subscribe((data:String[])=>{
      this.sports = data;
    })

    this.userService.getAllDelegatesService().subscribe((data:User[])=>{
      this.delegati = data;
      var temp = [];
      this.delegati.forEach(function(item){
        var i = temp.findIndex(x => x.username == item.username);
        if(i <= -1){
          temp.push({username : item.username})
        }
      })
      this.delegati = temp;
    })
  }

  user:User;
  sport:String;
  discipline:string;
  sex:String;
  start:Date;
  end:Date;
  delegati:User[];
  disciplines:String[];
  sports:String[];
  locations:String[];
  locationss:String[];
  delegat:String;
  formati:String[];
  format:String;
  athletes:Athlete[];
  chosenAthletes:Athlete[] = [];
  chosenTeams:Team[] = [];
  selected:boolean;
  checkBoxes:boolean[] = [];
  teams:Team[] = [];
  indi:boolean;
  ekip:boolean;
  athletest:AthleteT[];
  chosenAthletesT:AthleteT[] = [];
  tenis:boolean;

  logout(){
    localStorage.clear();
    this.router.navigate(['home']);
  }

  firstDropDownChanged(val: any) {
    console.log(val);

    if (val == "Atletika") {
      this.disciplines = ["","100m trcanje", '200m trcanje', '400m trcanje', '800m trcanje','5000m trcanje',
      '10000m trcanje', 'Skok u vis', 'Skok u dalj', 'Troskok',
      'Skok sa motkom', 'Bacanje kugle', 'Bacanje disk', 'Bacanje kladiva', 'Bacanje koplja','Maraton', '20km brzno hodanje',
      '50km brzo hodanje',"Stafetno trcanje 100m", "Stafetno trcanje 400m"];
      this.locationss = ["Atletski Stadion"];
      this.formati = ["","1 krug", "3 kruga"];
    }
    else if (val == "Streljastvo") {
      this.disciplines = ["",'50m trostav', '10m vazdusna puska', '25m malokalib. pistolj', '10m vazdusni pistolj'];
      this.locationss = ["Dvorana Tokio", , "Dvorana Saporo"];
      this.formati = ["","6 krugova"];
    }
    else if (val == "Biciklizam") {
      this.disciplines = ["",'Drumska trka 225km'];
      this.locationss = ["","Staza"];
      this.formati = ["","1 krug"];
    }
    else if(val == "Plivanje") {
      this.disciplines = ["",'100m leptir', '200m slobodno'];
      this.locationss = ["Bazen"];
      this.formati = ["","1 krug"];
    }else if(val == "Tenis"){
      this.disciplines = ["",'Single', 'Double'];
      this.locationss = ["Dvorana Tokio", "Dvorana Saporo"];
      this.formati = ["","Playoff"];
    }else if((val == "Kosarka") || (val == "Odbojka")){
      this.disciplines = [" "];
      this.discipline = null;
      this.locationss = ["Dvorana Tokio", "Dvorana Saporo"];
      this.formati = ["","Grupe"];
    }else if(val == "Vaterpolo"){
      this.disciplines = [" "];
      this.discipline = null;
      this.locationss = ["Bazen"];
      this.formati = ["","Grupe"];
    }else{
      this.disciplines = [];
      this.formati = [];
    }
  }

  add(){
    if(!this.checkFields()){
      alert("Please select all fields!");
    }else{
      this.tournamentService.checkNumOfTour(this.delegat).subscribe((data:Tournament[])=>{
        if(data.length < 3){
          if(this.sport != "Kosarka" && this.sport != "Odbojka" && this.sport != "Vaterpolo" && this.sport != "Tenis"){
            this.tournamentService.disciplineExists(this.discipline, this.sex).subscribe((data:Tournament)=>{
              if(data == null){
                if(this.start>this.end){
                  alert("Bad start and end date!");
                }else{
                  var count = 0;
                  for(let i=0;i<this.checkBoxes.length;i++){
                    if(this.checkBoxes[i] == true) count++;
                  }
                  if(count < 4){
                    alert("Not enough athletes selected")
                  }else if(count > 8){
                    alert("Too much athletes selected");
                  }else{
                    for(let j=0;j<this.checkBoxes.length;j++){
                      if(this.checkBoxes[j]) this.chosenAthletes[j] = this.athletes[j];
                    }
                    for(let k=0;k<this.chosenAthletes.length;k++){
                      this.tournamentService.addResult(this.delegat, this.sport, this.discipline, this.sex, this.start, this.chosenAthletes[k].name).subscribe();
                    }
                    this.tournamentService.insertTournament(this.sport, this.discipline, this.format, this.sex, this.start, this.end, 
                      this.locations, this.chosenAthletes, this.delegat).subscribe((response:any)=>{
                        if(response)
                          alert("Tournament added!");
                    })
                  }
                }
              }else{
                alert("This tournament already exists");
              }
            })
          }else{
            this.tournamentService.sportExists(this.sport, this.discipline,this.sex).subscribe((data:Tournament)=>{
              if(data == null){
                if(this.start>this.end){
                  alert("Bad start and end date!");
                }else{
                  var count = 0;
                  for(let i=0;i<this.checkBoxes.length;i++){
                    if(this.checkBoxes[i] == true) count++;
                  }
                  if(count < 4){
                    alert("Not enough teams selected")
                  }else if(this.sport == "Atletika" && count > 8){
                    alert("Too much teams selected");
                  }else if(this.sport == "Tenis" && (count % 4 != 0 || count == 12)){
                    alert("Not enough athletes/teams selected")
                  }else if(this.sport == "Kosarka" && this.sport == "Odbojka" && this.sport == "Vaterpolo" && 
                  (count%4 != 0)){
                    alert("Not enough teams selected")
                  }else if(count > 12 && (this.sport != "Tenis")){
                    alert("Too much teams selected");
                  }else if(count % 4 != 0){
                    alert("Not enough teams selected")
                  }else{
                    if(this.sport == "Tenis"){
                      for(let j=0;j<this.checkBoxes.length;j++){
                        if(this.checkBoxes[j]) this.chosenAthletesT.push(this.athletest[j]);
                      }
                      this.tournamentService.insertTournament(this.sport, this.discipline, this.format, this.sex, this.start, this.end, 
                        this.locations, this.chosenAthletesT, this.delegat).subscribe((response:any)=>{
                          if(response)
                            alert("Tournament added!");
                      })
                    }else{
                      for(let j=0;j<this.checkBoxes.length;j++){
                        if(this.checkBoxes[j]) this.chosenTeams.push(this.teams[j]);
                      }
                      this.tournamentService.insertTournament(this.sport, this.discipline, this.format, this.sex, this.start, this.end, 
                        this.locations, this.chosenTeams, this.delegat).subscribe((response:any)=>{
                          if(response)
                            alert("Tournament added!");
                      })
                    }
                  }
                }
              }else{
                alert("This tournament already exists");
              }
            })
          }
        }else{
          alert("Ovaj delegat ima vec 3 turnira!");
        }
      })
    }
  }

  checkFields():boolean{
    if(this.sport == "Kosarka" || this.sport == "Odbojka" || this.sport == "Vaterpolo"){
      if((this.sex==undefined)||(this.start==null)||(this.end==null)||
      (this.locations==null)||(this.delegat==null)||(this.format==null)) return false;
      else return true;
    }
    else if((this.sport==null)||(this.discipline==null)||(this.sex==undefined)||(this.start==null)||(this.end==null)||
    (this.locations==null)||(this.delegat==null)||(this.format==null)) return false;
    return true;
  }

  chooseAthletes(){
    for(let i=0;i<16;i++) this.checkBoxes[i] = false;
    if(this.sport != "Kosarka" && this.sport != "Odbojka" && this.sport != "Vaterpolo"){
      if(this.sex == undefined || this.discipline == "" || this.discipline == null){
        alert("Choose discipline and sex!");
      }else{
        if(this.sport == "Tenis"){
          if(this.discipline == "Single"){
            this.sportService.getAthletesByDiscipline(this.discipline, this.sex).subscribe((data:AthleteT[])=>{
              this.athletest = data;
              for(let i=0;i<this.athletest.length;i++){
                this.checkBoxes.push(false);
              }
              this.ekip = false;
              this.selected = true;
              this.indi = false;
              this.tenis = true;
            });
          }else{
            this.sportService.getDoubles(this.discipline, this.sex).subscribe((data2:AthleteT[])=>{
              this.athletest = data2;
              for(let i=0;i<this.athletest.length;i++){
                this.checkBoxes.push(false);
              }
              this.ekip = false;
              this.selected = true;
              this.indi = false;
              this.tenis = true;
            })
          }
        }else if(this.discipline != "Stafetno trcanje 100m" && this.discipline != "Stafetno trcanje 400m"){
          this.sportService.getAthletesByDiscipline(this.discipline, this.sex).subscribe((data:Athlete[])=>{
            this.athletes = data;
            for(let i=0;i<this.athletes.length;i++){
              this.checkBoxes.push(false);
            }
            this.ekip = false;
            this.selected = true;
            this.indi = true;
            this.tenis = false;
          });
        }else{
          this.sportService.getITeams(this.sport, this.discipline, this.sex).subscribe((data:Team[])=>{
            this.teams = data;
            this.ekip = true;
            this.indi = false;
            this.selected = true;
            this.tenis = false;
          })
        }
      }
    }else{
      if(this.sex == undefined){
        alert("Choose sex!");
      }
      this.sportService.getTeams(this.sport, this.sex).subscribe((data:Team[])=>{
        this.teams = data;
        this.ekip = true;
        this.indi = false;
        this.tenis = false;
        this.selected = true;
      })
    }

  }
}
