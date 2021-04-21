import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styles: [
  ]
})
export class AuthCallbackComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
      this.authService.completeAuthentication();
      void this.router.navigate(['/']);
  }

}
