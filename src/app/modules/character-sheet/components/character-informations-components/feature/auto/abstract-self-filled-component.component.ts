import { Component, OnInit } from "@angular/core";
import { distinctUntilChanged, map, Observable } from "rxjs";
import { CharacterSheetService } from "../../../../shared/services/character-sheet.service";
import { ListenPlayerActionService } from "../../../../shared/services/listen-player-action.service";

@Component({ template: "" })
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
        this.listener.receiveInfoFrom(this.category$.pipe(
            distinctUntilChanged(),
            map(valueSent => {
                return { name: this.name, value: valueSent }
            })
        ));
    }
}