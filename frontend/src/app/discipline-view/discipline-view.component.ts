import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Athlete } from '../model/athlete';
import { User } from '../model/user';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-discipline-view',
  templateUrl: './discipline-view.component.html',
  styleUrls: ['./discipline-view.component.css']
})
export class DisciplineViewComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute,
    private sportService:SportService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'));
    this.sport == this.route.snapshot.paramMap.get('sport');
    this.discipline = this.route.snapshot.paramMap.get('discipline');
    this.sportService.getAllAthletesByDiscipline(this.user.country, this.discipline).subscribe((data:Athlete[])=>{
      this.athletes = data;
      this.athletes.sort((a,b)=>{
        if(a.name>b.name)
          return 1;
        else 
          return -1;
      })
    })
  }

  user:User;
  discipline:String;
  sport:String;
  disciplines:String[] = [];
  athletes:Athlete[];

  logout(){
    localStorage.clear();
    this.router.navigate(['home']);
  }

}
