import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {AuthService} from "../../authentication/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  private authSubscription: Subscription;
  getRole: string;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getRole = this.authService.getCurrentUserRole();
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (authStatus) => {
        this.isAuthenticated = authStatus;
      }
    );
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
  logout(): void {
    this.authService.logout();
  }
}
