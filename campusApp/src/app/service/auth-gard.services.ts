import {ActivatedRouteSnapshot, CanActivate, Router, RouterState, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGard implements CanActivate{

  constructor( private authService : AuthService,
               private router : Router) {
  }


  canActivate(
    route : ActivatedRouteSnapshot,
    state : RouterStateSnapshot

  ):
  // @ts-ignore
  Observable<boolean> | Promise<boolean> | boolean {

    if(this.authService.isAuth){
      return true
    }else{
      this.router.navigate(['/auth']);
    }
  }

}
