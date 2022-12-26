import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'sybrex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit(): void {}
  async onSubmit(form: NgForm) {
    this.loading = true;
    const { email, password, firstName, lastName } = form.value;
    try {
      const resp = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await resp.user?.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });
      form.reset();
    } catch (err) {
      console.log(err);
    }
    this.loading = false;
  }
}
