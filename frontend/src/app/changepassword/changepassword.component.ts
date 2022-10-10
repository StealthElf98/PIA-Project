import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('ulogovan'))){
      this.logged = true;
      this.user = JSON.parse(localStorage.getItem('ulogovan'));
      if(this.user.type == 0) { this.organizator = true;}
      else if(this.user.type == 1) {this.delegat = true;}
      else {this.vodja = true;}
    }
  }

  user:User;
  organizator:boolean;
  delegat:boolean;
  vodja:boolean;
  logged:boolean;
  username:String;
  password:string;
  npassword:string;

  changePassword(){
    if((this.username != null) && (this.password != null) && (this.npassword != null)){
      if(this.checkPassword()){
        if(this.checkPasswordRegex()){
          this.userService.changePasswordService(this.username, this.password, this.npassword).subscribe((user:User) =>{
            if(user != null){
              if(user.password == this.npassword){
                alert('Password changed!');
                this.router.navigate(['login']);
              }
            }else{
              alert("Wrong username or old password!");
            }
          })
        }else{
          alert('Password format is not good!');
        }
      }else{
        alert("New password can't be the same as old one!");
      }
    }else{
      alert("Plesase fill all fields");
    }
  }

  checkPassword():boolean{
    if(this.password == this.npassword){
      return false;
    }
    return true;
  }

  checkPasswordRegex():boolean{
    var regex = /^(?=[^A-Z]*[A-Z])(?=(?:[^a-z]*[a-z]){3})(?=(?:[^0-9]*[0-9]){2})(?=(?:[^!?@*#&$]*[!?@*#&$]){2})(?!.*(.)\1{2})[A-Za-z].{7,11}$/;
    return regex.test(this.npassword);
  }

  logout(){
    localStorage.clear();
    this.organizator = false;
    this.delegat = false;
    this.vodja = false;
    this.logged = false
    this.router.navigate(['home']);
  }

}
