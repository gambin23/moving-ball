import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subscription, Subject } from "rxjs";
import { repeat } from "rxjs/operators";

import { Colr, BallConfig } from "./app.model";

@Injectable()
export class BallService {
    constructor(private httpClient: HttpClient) { }

    public ballSubject = new Subject<BallConfig>();

    // I had to use a proxy server in order to prevent being blocked by CORS
    private readonly url = "https://cors-anywhere.herokuapp.com/http://www.colr.org/json/color/random";
    private readonly ballPositions = [
        "pos-top-left",
        "pos-top-right",
        "pos-bottom-right",
        "pos-bottom-left",
    ];
    private ballPositionIndex = -1;
    private subscription = new Subscription();

    getNewBall() {
        this.httpClient.get<Colr>(this.url).subscribe(colr => this.newBall(colr));
    }

    setAutomatic() {
        this.subscription = this.httpClient.get<Colr>(this.url).pipe(repeat()).subscribe(colr => this.newBall(colr));
    }

    setManual() {
        this.subscription.unsubscribe();
    }

    private newBall(colr: Colr) {
        this.ballPositionIndex = this.ballPositionIndex < this.ballPositions.length - 1 ? this.ballPositionIndex + 1 : 0;
        this.ballSubject.next({
            color: `#${colr.colors[0].hex}`,
            class: this.ballPositions[this.ballPositionIndex]
        })
    }
}
