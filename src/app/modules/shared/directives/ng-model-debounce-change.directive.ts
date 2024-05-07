import { DestroyRef, Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgModel } from '@angular/forms';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';

@Directive({
    selector: '[ngModelDebounceChange]',
})
/**
 * to use it:
 *      in component.html :
 *      (ngModelDebounceChange)="methodYouWant()""
 */
export class NgModelDebounceChangeDirective implements OnInit {
    /** Emit event when model has changed. */
    @Output() ngModelDebounceChange = new EventEmitter<any>();

    constructor(private ngModel: NgModel, private destroyRef: DestroyRef) { }

    ngOnInit(): void {
        this.ngModel.control.valueChanges
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                skip(1),
                debounceTime(500),
                distinctUntilChanged())
            .subscribe(value => this.ngModelDebounceChange.emit(value));
    }
}