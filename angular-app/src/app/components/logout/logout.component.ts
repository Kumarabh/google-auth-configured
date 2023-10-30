import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor( 
    public service: DataService, 
    private _ngZone: NgZone, 
    private router: Router , 
    private authService: AuthService
    ) {}

  logout() {
    this.authService.signOutExternal();
    this._ngZone.run(() => {
      this.router.navigate(['/']).then(() => window.location.reload())
    })
  }
}
