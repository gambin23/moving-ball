import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BallService } from "./ball.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NoCacheInterceptor } from "./interceptors/no-cache.interceptor";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        BallService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NoCacheInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
