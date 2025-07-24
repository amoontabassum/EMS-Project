import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from '../../app/auth.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service'; // ✅ Correct path


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.getLoggedInUsername();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
