import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from './../../services/api.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  email:any = "";
  isSaving:boolean = false;
  firstFormGroup: FormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    middleCtrl: [''],
    lastCtrl: ['', Validators.required],
    emailCtrl: [sessionStorage.getItem("email")],
    mobileCtrl: [''],
    codeCtrl: ['Online reg'],
    asCtrl: ['', Validators.required],
    occuCtrl: ['', Validators.required],
    hometownCtrl: [''],
    additionalParticipants: []
  });    ;
  constructor(
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private api:ApiService) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem("email")
  }

  saveDetails(){
    this.openSnackBar()
    if(!this.checkValidation())
      this.markFormGroupDirty(this.firstFormGroup);
    else{
      // var body = {
      //   "first_name": this.firstFormGroup.value.firstCtrl,
      //    "middle_name":this.firstFormGroup.value.middleCtrl,
      //    "last_name": this.firstFormGroup.value.lastCtrl,
      //    "contact_number": this.firstFormGroup.value.mobileCtrl,
      //    "email": this.firstFormGroup.value.emailCtrl,
      //    "hometown": this.firstFormGroup.value.hometownCtrl,
      //    "occupation": this.firstFormGroup.value.occuCtrl,
      //    "agency": this.firstFormGroup.value.asCtrl
      // }

      var body = {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }

      this.isSaving = true;
      this.api.saveDetails(body).subscribe((data:any) => {
        console.log(data)
        
        this.isSaving = false;
      },err=>{
        console.log(err);
        this.isSaving = false;
      });
    }
  }

  
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar() {
    this._snackBar.open('User details saved!', 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['blue-snackbar'],
      duration: 4000,
    });
  }
  checkValidation(){
    if (this.firstFormGroup.value.firstCtrl != ''
      && this.firstFormGroup.value.lastCtrl != ''
      && this.firstFormGroup.value.asCtrl != ''
      && this.firstFormGroup.value.occuCtrl != '') {
        return true
    }
    return false
  }
  
  private markFormGroupDirty(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control:any) => {
      control.markAsDirty();

      if (control.controls) {
        this.markFormGroupDirty(control);
      }
    });
  }
}
