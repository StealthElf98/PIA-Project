import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'));
  }

  user:User;

  logout(){
    localStorage.clear();
    this.router.navigate(['home']);
  }
}
