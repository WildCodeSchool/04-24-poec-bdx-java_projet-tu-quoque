import { DestroyRef, Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgModel } from '@angular/forms';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';

@Directive({
    selector: '[ngModelDebounceChange]',
})
export class NgModelDebounceChangeDirective implements OnInit {
    @Output() ngModelDebounceChange = new EventEmitter<String>();

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