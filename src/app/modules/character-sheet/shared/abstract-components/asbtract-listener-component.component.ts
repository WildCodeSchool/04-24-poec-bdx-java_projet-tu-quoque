import { Component } from "@angular/core";
import { ListenPlayerActionService } from "../services/listen-player-action.service";

@Component({ template: "" })
export abstract class AbstractListenerComponent {
    constructor(protected listener: ListenPlayerActionService) { }
}