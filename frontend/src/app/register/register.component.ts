import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('ulogovan'))){
      this.logged = true;
    }
  }
  logged:boolean;
  username:string;
  password:string;
  cpassword:string;
  firstname:string;
  lastname:string;
  country:string;
  email:string;
  type:number;
  message:string;

  register(){
    if(this.username == null || this.password == null|| this.firstname ==null|| this.lastname ==null || this.email ==null|| this.country==null|| this.type == null) { 
        alert("Please fill all fields!"); 
      }else{
        if(this.password == this.cpassword){
          if(this.checkPasswordRegex()){
            if(this.checkEmail()){ 
              if(this.type == 2){
                this.userService.checkVodjaService(this.country, this.type, 1).subscribe((user:User)=>{
                  if(user === null){
                    this.userService.registerService(this.username,this.password,this.firstname, this.lastname,this.country,this.email, 0, this.type).subscribe(response=>{
                      if(response['message']='User added'){
                        alert("OK, request sent!");
                        this.router.navigate(['login']);
                      }                        
                    });
                  }else {
                    alert("Error, Vodja already exists for this country!");            
                  } 
                })
              }
              else {
                this.userService.registerService(this.username,this.password,this.firstname, this.lastname,this.country,this.email, 0, this.type).subscribe(response=>{
                  if(response['message']='User added'){
                    alert("OK, User add");
                    this.router.navigate(['login']);
                  }                        
                });
              }
            }else{
              alert("Please eneter your email");
            }
          }else {
            alert('Password format is not good!');
          }
        }else{
          alert("Please confirm your password!");
      }  
    }
  }


  checkEmail():boolean{
    var regexMail = /^([a-z]|[0-9]){1,}.?([a-z]|[0-9]){1,}@[a-z]{1,}.[a-z]{2,4}$/;
    return(regexMail.test(this.email));
  }

  checkPasswordRegex():boolean{
    var regex = /^(?=[^A-Z]*[A-Z])(?=(?:[^a-z]*[a-z]){3})(?=(?:[^0-9]*[0-9]){2})(?=(?:[^!?@*#&$]*[!?@*#&$]){2})(?!.*(.)\1{2})[A-Za-z].{7,11}$/;
    return regex.test(this.password);
  }
}
