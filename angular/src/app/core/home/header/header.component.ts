import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../authentication/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false; // Initialize as false by default

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the isAuthenticated$ observable to track authentication status
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    })
  }
  logout(): void {
    this.authService.logout();
  }
}
