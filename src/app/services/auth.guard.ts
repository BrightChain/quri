import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: Auth) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user: User | null) => {
        LoggingService.info('AuthGuard: onAuthStateChanged', {
          user: user ? user.uid : null,
        });
        if (user) {
          // if (!user.emailVerified)                            // if the user hasn't verified their email, send them to that page
          //     this.router.navigate(['/verify-email']);

          resolve(true);
        } else {
          //console.log('Auth Guard: user is not logged in');
          this.router.navigate(['/home']); // a logged out user will always be sent to home
          resolve(false);
        }
      });
    });
  }
}
