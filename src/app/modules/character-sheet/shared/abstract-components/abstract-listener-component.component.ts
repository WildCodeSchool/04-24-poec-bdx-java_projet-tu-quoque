import { Component, DestroyRef, inject } from "@angular/core";
import { ListenPlayerActionService } from "../services/listen-player-action.service";

@Component({
    selector: "abstract-listener-component",
    template: ""
})
export abstract class AbstractListenerComponent {
    protected listener = inject(ListenPlayerActionService);
    protected destroyRef = inject(DestroyRef);
}