import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-mastercomponent',
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './mastercomponent.component.html',
  styleUrl: './mastercomponent.component.css'
})
export class MastercomponentComponent {

}
