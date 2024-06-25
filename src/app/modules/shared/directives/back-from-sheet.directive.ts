import { Location } from '@angular/common';
import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[BackPrevious]'
})
export class BackFromSheetDirective {

    constructor(private _location: Location) { }
    @HostListener("click")
    onClick(): void {
        this._location.back()
    }
}
