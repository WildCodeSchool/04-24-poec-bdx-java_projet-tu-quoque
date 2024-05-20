import { Component, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { interval, takeWhile } from "rxjs";

@Component({ template: "" })
export abstract class AbstractMetamorphosisComponent {

    isbgred: boolean = false;

    constructor(private destroyRef: DestroyRef) { }

    handleDomChange(event: any) {
        console.log(event.target.classList)
        this.isbgred = true;
        this.runExplosion();
    }

    runExplosion() {
        const source = interval(2000);
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