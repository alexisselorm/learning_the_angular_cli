import { Component } from '@angular/core';
declare var particlesJS: any;
@Component({
  selector: 'sybrex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'learning_the_angular_cli';

  ngOnInit() {
    particlesJS.load('particles', 'assets/particles.json', () => {
      console.log('particles loaded');
    });
  }
}
