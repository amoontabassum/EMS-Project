import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
 
@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css'] 
})
export class FirstpageComponent {
  constructor(private router: Router) {} 
 
  gotologin() {
    this.router.navigate(['/login']); 
  }
  gotoregister(){
    this.router.navigate(['/register']);

  }
}