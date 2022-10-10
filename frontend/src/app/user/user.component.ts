import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'));
    this.userService.getAllRequestsService().subscribe((data:User[])=>{
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
    })
    this.dataSource = new MatTableDataSource(this.users);
  }

  user:User;
  users:User[];
  dataSource:MatTableDataSource<User>;
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'button1', 'button2'];

  logout(){
    localStorage.clear();
    this.router.navigate(['home']);
  }

  accept(user:User){
    if(user.type == 2){
      this.userService.checkVodjaService(user.country, user.type, 1).subscribe((user1:User)=>{
          if(user1 == null){
          this.userService.acceptRequestService(user).subscribe((user1:User)=>{
            if(user1){
              this.userService.getAllRequestsService().subscribe((data:User[])=>{
                this.users = data;
                this.dataSource = new MatTableDataSource(this.users);
              })
              this.dataSource = new MatTableDataSource(this.users);
              alert("Request accepted");
            }
          })
        }else{
          alert("Vodja already exist for this country!");
        }
      })
    }else{
      this.userService.acceptRequestService(user).subscribe((user1:User)=>{
        if(user1){
          this.userService.getAllRequestsService().subscribe((data:User[])=>{
            this.users = data;
            this.dataSource = new MatTableDataSource(this.users);
          })
          this.dataSource = new MatTableDataSource(this.users);
          alert("Request accepted");
        }
      })
    }
  }

  deny(user:User){
    this.userService.deleteRequestService(user).subscribe((user:User) =>{
      if(user){
        this.userService.getAllRequestsService().subscribe((data:User[])=>{
          this.users = data;
          this.dataSource = new MatTableDataSource(this.users);
        })
        this.dataSource = new MatTableDataSource(this.users);
        alert("Request deleted!");
      }
    })
  }

}
