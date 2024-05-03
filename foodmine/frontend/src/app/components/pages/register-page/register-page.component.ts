import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit{

  registerForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router){}

    ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        name:['', [Validators.required, Validators.minLength(5)]],
        email:['', [Validators.required, Validators.email]],
        password:['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', Validators.required],
        address: ['', [Validators.required, Validators.minLength(10)]]
      }, {
        validators: PasswordMatchValidator('password', 'confirmPassword')
      }
      )
    }
}
