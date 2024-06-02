import { Component, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { interval, takeWhile } from "rxjs";
import { ANIMATION_DURATION } from "../constants/constants.constant";

@Component({ template: "" })
export abstract class AbstractMetamorphosisComponent {

    hasChanged: boolean = false;

    constructor(private destroyRef: DestroyRef) { }

    handleDomChange(event: any): void {
        this.hasChanged = true;
        this.runExplosion();
    }

    runExplosion(): void {
        const source = interval(ANIMATION_DURATION);
        source
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                takeWhile(() => this.hasChanged),
            )
            .subscribe((n) => {
                this.hasChanged = false;
            });
    }
}