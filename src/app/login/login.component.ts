import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error!: string | null;
  form!: FormGroup;
    loading = false;
    submitted = false;

    @Output() authChanged = new EventEmitter<{auth: boolean}>();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        @Inject(DOCUMENT) private document: Document
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.error = null;
        this.authService.login(this.f['email'].value, this.f['password'].value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.authChanged.emit({auth: true});
                },
                error: error => {
                    this.authChanged.emit({auth: false});
                    this.loading = false;
                    console.log(error);
                    this.error = error['error'];
                }
            });
    }

    microsoftLogin(){
        this.submitted = true;

        this.document.location.href='http://192.168.100.11:5000/microsoft';

        // // stop here if form is invalid
        // if (this.form.invalid) {
        //     return;
        // }

        // this.loading = true;
        // this.error = null;
        // this.authService.loginMicrosoft()
        //     .pipe(first())
        //     .subscribe({
        //         next: () => {
        //             // get return url from query parameters or default to home page
        //             const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        //             this.router.navigateByUrl(returnUrl);
        //         },
        //         error: error => {
        //             this.loading = false;
        //             console.log(error);
        //             this.error = error['error'];
        //         }
        //     });
    }

}
