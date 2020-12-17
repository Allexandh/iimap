import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validation_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  newuser: any;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' }
    ],
    'nama': [
      { type: 'required', message: 'Nama is required' },
      // {type: 'pattern', message: 'Enter a valid email'}
    ],
  }

  constructor(
    private navCtrl: NavController,
    private authSrv: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.validation_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[-zA-z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      nama: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^[-zA-z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });
  }

  tryRegister(value) {
    this.newuser = this.authSrv.registerUser(value)
      .then(res => {
        // console.log(res);
        this.errorMessage = '';
        this.validation_form.reset();
        // this.goLoginPage();
        this.successMessage = "Your account has been created. Please Log In."
      }, err => {
        // console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      })
    // console.log(this.newuser)
  }

  goLoginPage() {
    this.navCtrl.navigateBack('/login');
  }

}
