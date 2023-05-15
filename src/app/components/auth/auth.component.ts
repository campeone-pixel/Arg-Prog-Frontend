import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './dialogos/login/login.component';
import { RegisterComponent } from './dialogos/register/register.component';
import { LogoutComponent } from './dialogos/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    this.authService.usuarioLogueado.subscribe((dato) => {
      this.isAuthenticated = !!dato;
    });
  }

  openLoginDialog() {
    const dialog = this.dialog.open(LoginComponent, {
      width: '400px',
    });

    dialog.afterClosed().subscribe(() => {
      this.isAuthenticated = this.authService.isAuthenticated();
    });
  }

  openRegisterDialog() {
    const dialog = this.dialog.open(RegisterComponent, {
      width: '400px',
    });

    dialog.afterClosed().subscribe(() => {
      this.isAuthenticated = this.authService.isAuthenticated();
    });
  }

  openLogoutDialog() {
    const dialog = this.dialog.open(LogoutComponent, {
      width: '400px',
    });

    dialog.afterClosed().subscribe(() => {
      this.isAuthenticated = this.authService.isAuthenticated();
    });
  }

  onLogout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}
