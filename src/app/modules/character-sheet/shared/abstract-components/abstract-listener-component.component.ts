import { Component, inject } from "@angular/core";
import { ListenPlayerActionService } from "../services/listen-player-action.service";
import { Subject } from "rxjs";
import { Field } from "../models/types/field.type";

@Component({
    selector: "abstract-listener-component",
    template: ""
})
export abstract class AbstractListenerComponent {
    protected listener = inject(ListenPlayerActionService);
    // constructor(protected listener: ListenPlayerActionService) {

    // }

}