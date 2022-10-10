import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
  }

  username:string;
  password:string;
  change:boolean = false;

  login(){
    if(this.username != null && this.password != null){
      this.userService.loginService(this.username, this.password).subscribe((user:User)=>{
        if(user){
          if(user.ok == 0){
            alert("Request not accepted yet");
          }else{
            localStorage.setItem('ulogovan', JSON.stringify(user));
            if(user.type === 0){
              this.router.navigate(['organizator'])
            }
            else if(user.type == 1){
              this.router.navigate(['delegat'])
            }else{
              this.router.navigate(['vodja'])
            }
          }
        }else{
          alert('Wrong Username or Password!');
        }
      })
  }else{
    alert("Please fill all fields!");
  }
  }
  
}
