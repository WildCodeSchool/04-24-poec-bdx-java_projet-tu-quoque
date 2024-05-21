import { Component, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { interval, takeWhile } from "rxjs";
import { ANIMATION_DURATION } from "../constants/constants.constant";

@Component({ template: "" })
export abstract class AbstractMetamorphosisComponent {

    isbgred: boolean = false;

    constructor(private destroyRef: DestroyRef) { }

    handleDomChange(event: any) {
        this.isbgred = true;
        this.runExplosion();
    }

    runExplosion() {
        const source = interval(ANIMATION_DURATION);
        source
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                takeWhile(() => this.isbgred),
            )
            .subscribe((n) => {
                this.isbgred = false;
            });
    }
}