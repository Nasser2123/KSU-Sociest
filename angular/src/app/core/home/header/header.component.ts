import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../authentication/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to the authentication state
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }
}
