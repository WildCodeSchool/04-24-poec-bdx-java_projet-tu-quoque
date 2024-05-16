import { Component } from "@angular/core";
import { DbService } from "../../../../../shared/services/db-service/db.service";

@Component({ template: "" })
export class AbstractListComponent {
    constructor(protected dbService: DbService) { }
}