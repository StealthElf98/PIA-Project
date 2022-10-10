import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Athlete } from '../model/athlete';
import { User } from '../model/user';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-sport-view',
  templateUrl: './sport-view.component.html',
  styleUrls: ['./sport-view.component.css']
})
export class SportViewComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute,
    private sportService:SportService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'));
    this.sport = this.route.snapshot.paramMap.get('sport');
    if(this.sport == "Kosarka" || this.sport == "Odbojka" || this.sport == "Vaterpolo"){
      this.noDis = true;
      this.sportService.getAllAthletesBySport(this.user.country, this.sport).subscribe((data:Athlete[])=>{
        this.athletes = data;
        this.athletes.sort((a,b)=>{
          if(a.name>b.name)
            return 1;
          else 
            return -1;
        })
      })
    }else{
      this.sportService.getAllDisciplinesFromCountry(this.user.country, this.sport).subscribe((data:String[])=>{
        this.disciplines = data;
      })
    }
    
  }

  user:User;
  sport:String;
  disciplines:String[] = [];
  noDis:boolean;
  athletes:Athlete[];

  logout(){
    localStorage.clear();
    this.router.navigate(['home']);
  }
}
