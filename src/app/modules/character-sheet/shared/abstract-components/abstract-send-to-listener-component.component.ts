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
        this.configureStream();
    }

    abstract updateField(value: string): Field;

    sendChanges(value: string = ""): void {
        this.updateStream(this.updateField(value));
    }

    updateStream(field: Field): void {
        this.fieldChangeStream$.next(field);
    }

    configureStream(): void {
        this.listener.receiveFieldFrom(this.fieldChangeStream$.asObservable());
    }
}