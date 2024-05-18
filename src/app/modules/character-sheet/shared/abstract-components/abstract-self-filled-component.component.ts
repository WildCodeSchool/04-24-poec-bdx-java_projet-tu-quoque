import { Component, OnInit } from "@angular/core";
import { distinctUntilChanged, map, Observable } from "rxjs";
import { CharacterSheetService } from "../services/character-sheet.service";
import { ListenPlayerActionService } from "../services/listen-player-action.service";
import { BasicField } from "../models/types/basic-field.type";

@Component({
    selector: "abstract-self-field",
    template: ""
})
export abstract class AbstractSelfFilledComponent implements OnInit {
    protected category$!: Observable<string>;
    protected unit: string = "";
    protected label: string = "";
    protected name!: string;

    constructor(
        protected characterSheetService: CharacterSheetService,
        protected listener: ListenPlayerActionService
    ) { }

    ngOnInit(): void {
        this.category$ = this.findObservable();
        this.sendInfo();
    }

    findObservable() {
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

    sendInfo() {
        this.listener.receiveFieldFrom(this.category$.pipe(
            map(valueSent => {
                const field: BasicField = {
                    index: this.name,
                    value: valueSent
                };
                return field;
            })
        ));
    }
}