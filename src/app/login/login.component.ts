import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'sybrex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  action: 'login' | 'signup' = 'login';
  error: string | null = '';
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {}
  async onSubmit(form: NgForm) {
    this.loading = true;
    this.error = null;
    const { email, password, firstName, lastName } = form.value;
    let resp;
    try {
      if (this.isSignup) {
        resp = await this.afAuth.createUserWithEmailAndPassword(
          email,
          password
        );
        await resp.user?.updateProfile({
          displayName: `${firstName} ${lastName}`,
        });
        form.reset();
      } else {
        resp = await this.afAuth.signInWithEmailAndPassword(email, password);
      }
      const uid = resp?.user?.uid;
      this.router.navigate([`/profile/${uid}`]);
    } catch (err: any) {
      console.log(err.message);
      this.error = err.message;
    }
    this.loading = false;
  }

  get isLogin() {
    return this.action === 'login';
  }
  get isSignup() {
    return this.action === 'signup';
  }
}
