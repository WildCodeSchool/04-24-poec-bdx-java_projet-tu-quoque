import { Component, OnInit } from "@angular/core";
import { distinctUntilKeyChanged, map, Observable, switchMap } from "rxjs";
import { CharacterSheetService } from "../services/character-sheet.service";
import { BasicField } from "../models/types/basic-field.type";
import { AbstractSendToListenerComponent } from "./abstract-send-to-listener-component.component";

@Component({
    selector: "abstract-self-field",
    template: ""
})
export abstract class AbstractSelfFilledComponent extends AbstractSendToListenerComponent implements OnInit {
    protected category$!: Observable<string>;
    protected unit: string = "";
    protected label: string = "";
    protected name!: string;

    constructor(
        protected characterSheetService: CharacterSheetService,
    ) {
        super();
    }

    override ngOnInit(): void {
        this.category$ = this.findObservable();
        this.configureStream();
    }

    findObservable(): Observable<string> {
        switch (this.name) {
            case "sizeCategory":
                return this.characterSheetService.setSizeCategory$();
            case "age":
                return this.characterSheetService.setAge$();
            case "height":
                return this.characterSheetService.setHeight$();
            case "weight":
                return this.characterSheetService.setWeight$();
            default: throw new Error("bad observable name")
        };
    }

    override updateStream(): void {
        this.fieldChangeStream$.pipe(
            switchMap(field => this.category$.pipe(
                map(valueSent => this.updateField(valueSent)),
                distinctUntilKeyChanged("value")
            )),
        )
    }

    updateField(valueSent: string): BasicField {
        const field: BasicField = {
            index: this.name,
            value: valueSent
        };
        return field;
    }
}