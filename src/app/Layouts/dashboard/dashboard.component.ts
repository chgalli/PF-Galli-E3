import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;
  nombreUsuario: string | undefined;
  authUser: any;
  titulo: string = '';

  constructor(private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute){}

  ngOnInit():void {
    this.nombreUsuario = this.authService.authUser?.Nombre + " " + this.authService.authUser?.Apellido;
    this.authUser = this.authService.authUser;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.snapshot.data['title'])
    ).subscribe(title => {
      this.titulo = title;
      // console.log(this.titulo);
    });
    
  }

  logout(): void{
    this.authService.logout();
  }

}
