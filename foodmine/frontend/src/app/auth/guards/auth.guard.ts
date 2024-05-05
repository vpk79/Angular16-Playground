import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../../services/user.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class authGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{

    if (this.userService.currentUser.name) return true;

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
    return false;

  }
}