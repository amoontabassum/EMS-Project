import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthService, User } from '../../app/auth.service';
import { AuthService, User } from '../auth.service'; // ✅ Correct path


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  pwd: string = '';
  msg: string = '';
  error1: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  validate(nf: any): void {
    if (nf.valid) {
      this.authService.login(this.username, this.pwd).subscribe(users => {
        if (users.length > 0) {
          this.authService.setLoggedInUsername(this.username);
          this.msg = 'SUCCESSFULLY LOGIN';
          this.error1 = 'green';
          this.router.navigate(['/home']);
        } else {
          this.msg = 'INVALID USERNAME AND PASSWORD';
          this.error1 = 'red';
        }
      }, error => {
        this.msg = 'Server error';
        this.error1 = 'red';
      });
    }
  }
}
