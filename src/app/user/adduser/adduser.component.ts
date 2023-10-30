import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Core/Services/user.service';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
})
export class AdduserComponent implements OnInit {

  defaultValue = 'customer';
  touched = false ;
  constructor(private userService: UserService, private r: Router) {}

  list : User[] = [] ;
  user: User = {
    id: 8,
    firstName: 'Mohamed',
    lastName: 'ben Mohamed',
    birthDate: '2000-09-11',
    accountCategory: 'Blocked Account',
    email: 'robert@nicholson.com',
    password: 'test',
    picture: 'https://bootdey.com/img/Content/avatar/avatar5.png',
    profession: 'Software Engineer',
  };
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => this.list = data);
  }
  // add() {
  //   this.userService
  //     .addUser(this.user)
  //     .subscribe(() => {
  //       alert('Add User Success');
  //       this.r.navigate(['users']); // You need to wrap this in the subscribe's success callback.
  //     });
  // }
  add(F:NgForm){

    if(F.valid){
      const newUser : User = {
      id: this.list.length + 1, // Calculate the new ID based on the list length
      firstName: F.value.fn,
      lastName: F.value.ln,
      birthDate: F.value.da,
      accountCategory: F.value.ca,
      email: F.value.em,
      password: F.value.pw,
      picture: "ccccc",
      profession: F.value.profession,

      }
      this.userService.addUser(newUser).subscribe(() => {
        alert('Add User Success');
        this.r.navigate(['users']);
      });
    }
  }
  
}
