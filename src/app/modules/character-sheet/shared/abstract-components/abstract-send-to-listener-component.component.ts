import { Component, OnInit } from "@angular/core";
import { AbstractListenerComponent } from "./abstract-listener-component.component";
import { Subject } from "rxjs";
import { Field } from "../models/types/field.type";

@Component({
    selector: "abstract-send-to-listener-component",
    template: ""
})
export abstract class AbstractSendToListenerComponent extends AbstractListenerComponent implements OnInit {

    protected fieldChangeStream$: Subject<Field> = new Subject();

    ngOnInit(): void {
        this.listener.receiveFieldFrom(this.fieldChangeStream$);
    }

    sendChanges(value: string = "") {
        this.updateStream(this.updateField(value));
    }

    abstract updateField(value: string): Field;

    updateStream(field: Field) {
        this.fieldChangeStream$.next(field);
    }
}