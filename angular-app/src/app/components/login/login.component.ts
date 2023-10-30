import { Component, NgZone, OnInit } from '@angular/core';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(
    private router: Router,
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}


  ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: environment.clientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      })
      // @ts-ignore
      google.accounts.id.renderButton(
        document!.getElementById('buttonDiv')!,
        { theme: 'outline', size: 'large', width: 200 })
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    }
  }


async handleCredentialResponse(response: CredentialResponse) {
  await this.authService.LoginWithGoogle(response.credential).subscribe(
    (x: any) => {
      localStorage.setItem('token', x.token);
      this._ngZone.run(() => {
        this.router.navigate(['/logout'])
      })
    },
    (error: any) => {
      console.log(error);
    }
  )

  }

}
