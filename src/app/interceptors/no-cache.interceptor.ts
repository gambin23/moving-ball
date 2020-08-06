import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class NoCacheInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const reqWithHeaders = req.clone({
            // I'm attaching the no-cache header in order to prevent colr.org from returning a cached response.
            setHeaders: {
                "Cache-Control": "no-cache",
            }
        });
        return next.handle(reqWithHeaders);
    }
}
