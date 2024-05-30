import { Directive, ElementRef, inject, OnInit } from '@angular/core';

/**
*    @directive watchDomTree
*    @selector '[watchDomTree]'
*    @description Monitors changes in the DOM structure of the element it's attached to using MutationObserver.
*    Dispatches a custom event named 'dom-changed' with details about the mutation whenever a change occurs. 
*/
@Directive({
    selector: '[watchDomTree]'
})
export class DomChangedDirective implements OnInit {
    private elRef: ElementRef = inject(ElementRef);

    ngOnInit() {
        this.registerDomChangedEvent(this.elRef.nativeElement);
    }

    registerDomChangedEvent(el: any) {
        const observer = new MutationObserver(list => {
            const evt =
                new CustomEvent('dom-changed',
                    { detail: list, bubbles: true });
            el.dispatchEvent(evt);
        });
        const attributes = false;
        const childList = false;
        const subtree = true;
        const characterData = true;
        const characterDataOldValue = true;
        observer.observe(el, { attributes, childList, subtree, characterData, characterDataOldValue });
    }
}