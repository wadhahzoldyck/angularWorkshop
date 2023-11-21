import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Core/Services/user.service';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  id!: number;
  user!: User;
  defaultValue = 'customer';
  updateForm: FormGroup;
  //

  constructor(
    private actR: ActivatedRoute,
    private R: Router,
    private userService: UserService,
    private fomrB: FormBuilder
  ) {
    // Initialize the FormGroup here, but don't populate it with user data yet
    // this.updateForm = new FormGroup({
    //   id: [],
    // trol(),
    //   ln: new FormControl(),
    //   db: new FormControl(),
    //   email: new FormControl(),
    //   pass: new FormControl(),
    //   proff: new FormControl(),
    //   accountCatg: new FormControl(),
    //   pic: new FormControl(),
    //   skills: new FormArray([
    //     new FormControl('', Validators.minLength(3)),
    //     new FormControl('', Validators.minLength(5)),
    //   ]),
    // });

    this.updateForm = this.fomrB.group({
      id: [],
      fn: [''],
      ln: [''],
      db: [''],
      email: [''],
      pass: [''],
      proff: [''],
      accountCatg: [''],
      pic: [''],
      skills: this.fomrB.array([
        ['', Validators.minLength(3)],
        ['', Validators.minLength(3)],
      ]),
    });
  }

  ngOnInit() {
    this.id = Number(this.actR.snapshot.paramMap.get('id'));
    this.userService.getUserById(this.id).subscribe((data) => {
      this.user = data;

      // Populate the form controls with user data after it has been fetched
      this.updateForm.setValue({
        id: this.user.id,
        fn: this.user.firstName,
        ln: this.user.lastName,
        db: this.user.birthDate,
        email: this.user.email,
        pass: this.user.password,
        proff: this.user.profession,
        accountCatg: this.user.accountCategory,
        pic: this.user.picture,

        skills: this.user.skills,
      });
    });
  }

  update() {
    this.userService
      .updateUser(this.user)
      .subscribe(() => this.R.navigate(['/users']));
  }
  get skills() {
    return this.updateForm.get('skills') as FormArray;
  }
  addSkill() {
    this.skills.push(new FormControl('', Validators.minLength(3)));
  }
}
