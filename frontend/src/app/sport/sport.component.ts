import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {

  constructor(private router:Router, private sportService:SportService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'));
  }

  user:User;
  sport:string;
  discipline:string;
  type:string;
  min:number;
  max:number;

  insert(){
    this.sportService.insertSportService(this.sport, this.discipline, this.type, this.min, this.max).subscribe(response=>{
      if(response['message']='Sport added'){
        alert("OK, sport added");
        this.router.navigate(['sport']);
      }                        
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['home']);
  }
}
