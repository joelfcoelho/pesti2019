import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}




@Component({
  templateUrl: 'register.component.html'
})

export class RegisterComponent {



  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  confirmPasswordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  errors                : Array<string> = [];
  loading               : boolean = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router)
    { }

    register() {
      this.loading = true;
      this.errors = [];

      if (this.passwordFormControl.value != this.confirmPasswordFormControl.value) {
        this.toastr.error('The passwords must match.');
        this.loading = false;
        return;
      }

      this.http.post('auth/register', { email: this.emailFormControl.value, name: this.nameFormControl.value, password: this.passwordFormControl.value, role: 'professor' }).subscribe(
        (res: any) => {
          this.authService.setToken(res.token);
          this.toastr.success('Account created Successfully.');
          this.router.navigate(['/']);
          this.loading = false;
        },
        err => {
          for (let error of err.error.data) {
            this.toastr.error(error.message);
          }
          this.loading = false;
        }
      );
    }






  }
