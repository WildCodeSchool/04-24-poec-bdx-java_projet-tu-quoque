import { Component, inject } from "@angular/core";
import { DbService } from "../../../../../shared/services/db-service/db.service";
import { AbstractListenerComponent } from "../../../../shared/abstract-components/abstract-listener-component.component";

@Component({ template: "" })
export class AbstractListComponent extends AbstractListenerComponent {
    protected dbService: DbService = inject(DbService);
}