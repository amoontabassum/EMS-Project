import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule,NgForm} from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService} from '../auth.service';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User & { confirmPassword?: string } = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  msg = '';
  msgColor = 'green';

  constructor(private authService: AuthService,private router: Router) {}

  registerUser(form: NgForm): void {
    if (form.valid && this.user.password === this.user.confirmPassword) {
      const { confirmPassword, ...userData } = this.user;
      this.authService.register(userData).subscribe(() => {
        this.msg = 'Registration Successful!';
        this.router.navigate(['/login'])
        this.msgColor = 'green';
        form.resetForm();
      }, error => {
        this.msg = 'Error saving data.';
        this.msgColor = 'red';
      });
    } else {
      this.msg = 'Passwords do not match or form is invalid.';
      this.msgColor = 'red';
    }
  }
}
