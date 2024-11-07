import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show(); // Show loader when the request starts
    return next.handle(req).pipe(
      tap(
        () => {},
        () => {
          this.loaderService.hide(); // Hide loader on error
        },
        () => {
          this.loaderService.hide(); // Hide loader on success
        }
      )
    );
  }
}
