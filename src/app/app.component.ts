import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { BallService } from "./ball.service";
import { BallConfig } from "./app.model";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(private ballService: BallService) {

    }
    ballConfig: BallConfig;
    isAuto = false;

    private subscriptions = new Subscription();

    ngOnInit() {
        this.subscriptions.add(this.ballService.ballSubject.subscribe(ballConfig => {
            this.ballConfig = ballConfig
        }));
        this.ballService.getNewBall();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    ballClicked() {
        this.ballService.getNewBall();
    }
}
