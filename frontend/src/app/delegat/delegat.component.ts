import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from '../model/result';
import { Tournament } from '../model/tournament';
import { User } from '../model/user';
import { TournamentService } from '../tournament.service';

@Component({
  selector: 'app-delegat',
  templateUrl: './delegat.component.html',
  styleUrls: ['./delegat.component.css']
})
export class DelegatComponent implements OnInit {

  constructor(private router:Router, private tournamentService:TournamentService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'));
    this.t1=false;
    this.t2=false;
    this.t3=false;
    this.tournamentService.getTournaments(this.user.username).subscribe((data:Tournament[])=>{
      if(data[0]!=null){
        this.tournament1 = data[0];
        this.t1=true;
        this.tournamentService.getFirstResult(data[0].discipline, data[0].sex).subscribe((result:Result)=>{
          if(result.location != null && result.time != null){
            this.location1 = result.location;
            this.time1 = result.time;
            this.submited1 = true;
          }else{
            this.locations1 = this.tournament1.locations;
          }
        })
      }
      if(data[1]!=null){
        this.tournament2 = data[1];
        this.t2=true;
        this.tournamentService.getFirstResult(data[1].discipline, data[1].sex).subscribe((result:Result)=>{
          if(result.location != null && result.time != null){
            this.location2 = result.location;
            this.time2 = result.time;
            this.submited2 = true;
          }else{
            this.locations2 = this.tournament2.locations;
          }
        })
      }
      if(data[2]!=null){
        this.tournament3 = data[2];
        this.t3=true;
        this.tournamentService.getFirstResult(data[2].discipline, data[2].sex).subscribe((result:Result)=>{
          if(result.location != null && result.time != null){
            this.location2 = result.location;
            this.time2 = result.time;
            this.submited3 = true;
          }else{
            this.locations3 = this.tournament3.locations;
          }
        })
      }
    })
  }

  user:User;
  tournament1:Tournament;
  tournament2:Tournament;
  tournament3:Tournament;
  t1:boolean;
  t2:boolean;
  t3:boolean;
  time1:String;
  time2:String;
  time3:String;
  locations1:String[];
  locations2:String[];
  locations3:String[];
  location1:String;
  location2:String;
  location3:String;
  submited1:boolean;
  submited2:boolean;
  submited3:boolean;

  logout(){
    localStorage.clear();
    this.router.navigate(['home']);
  }


  submit1(){
    if(this.location1 == undefined){
      this.location1 = this.tournament1.locations[0];
    }
    if(this.location1 != null || this.time1 != null){
      this.tournamentService.checkIfOK(this.tournament1.start, this.time1, this.location1, this.tournament1.discipline).
      subscribe((result:Result)=>{
        if(result==null){
          this.tournamentService.setTimeAndLocation(this.time1, this.location1, this.tournament1.discipline,this.tournament1.sex).subscribe((response:any)=>{
            if(response){
              this.submited1 = true;
            } 
          })
        }else{
          alert("This place and time is taken!");
        }
      })
    }else{
      alert("Choose location and time!");
    }
  }
  submit2(){
    if(this.location2 == undefined){
      this.location2 = this.tournament2.locations[0];
    }
    if(this.location2 != null || this.time2 != null){
      this.tournamentService.checkIfOK(this.tournament2.start, this.time2, this.location2, this.tournament2.discipline).
        subscribe((result:Result)=>{
        if(result==null){
          this.tournamentService.setTimeAndLocation(this.time2, this.location2, this.tournament2.discipline,this.tournament2.sex).subscribe((response:any)=>{
            if(response != null){
              this.submited2 = true;
            } 
          })
        }else{
          alert("This time and location are taken!");
        }
      })
    }else{
      alert("Choose location and time!");
    }
  }
  submit3(){
    if(this.location3 == undefined){
      this.location3 = this.tournament3.locations[0];
    }
    if(this.location3 != null || this.time3 != null){
      this.tournamentService.checkIfOK(this.tournament3.start, this.time3, this.location3, this.tournament3.discipline).
      subscribe((result:Result)=>{
      if(result==null){
        this.tournamentService.setTimeAndLocation(this.time3, this.location3, this.tournament3.discipline,this.tournament3.sex).subscribe((response:any)=>{
          if(response != null){
            this.submited3 = true;
          } 
        })
      }else{
        alert("This time and location are taken!");
      }
    })
    }else{
      alert("Choose location and time!");
    }
  }
}
