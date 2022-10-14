import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    var rights:any = sessionStorage.getItem('email');
    if(rights==null){
      //redirects to the merchant dashboard if user logged in in the merchant portal
      this.router.navigate(['/login'])
      return true;
    }
    return true;
}
}
