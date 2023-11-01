import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm! : FormGroup;
  isSubmitted : boolean = false;

  constructor(public dialog: MatDialog,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'firstname' : new FormControl('',[Validators.required]),
      'lastname' : new FormControl('',Validators.required),
      'email' : new FormControl('',[Validators.required,Validators.email]),
      'password' : new FormControl('',[Validators.required,Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]),
      'confirmpassword' : new FormControl(''),
    })
  }

 

  registerNow(){
    this.isSubmitted = true

    if(this.registerForm.valid){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '315px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result !== undefined && result === 'yes'){
          this.toastr.success('Registered successfully !!','',
          {timeOut : 3000}
          );
          let obj :any = JSON.stringify(this.registerForm.value)
          obj = JSON.parse(obj)
          console.log("value -->",obj)
          this.resetForm()
        }
        else if(result !== undefined && result === 'no'){
          this.toastr.error('User Not Registered !!','',
          {timeOut : 3000}
          )
        }
      });
    }
  }

  resetForm(){
    this.registerForm.reset();
    this.registerForm.markAsPristine();
    // this.registerForm.markAsUntouched();
    // this.registerForm.updateValueAndValidity()
    this.isSubmitted = false

    // Object.keys(this.registerForm.controls).forEach((key) => {
    //   const control :any = this.registerForm.get(key);
    //   control.setErrors(null);
    // });
  }
}



@Component({
  selector: 'confirm-dailog',
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./register.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {
  }
  ngOnInit(): void {
  }

  onYes(){
    this.dialogRef.close('yes');
  }

  onNo(){
    this.dialogRef.close('no');
  }

}
