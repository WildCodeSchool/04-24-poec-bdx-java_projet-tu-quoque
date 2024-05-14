import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableManagementRoutingModule } from './table-management-routing.module';
import { UserTablesComponent } from './components/features/user-tables/user-tables.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { TablePageComponent } from './components/features/table-page/table-page.component';
import { TablePresentationComponent } from './components/ui/table-presentation/table-presentation.component';
import { TableNewPlayerComponent } from './components/features/table-new-player/table-new-player.component';
import { FormsModule } from '@angular/forms';
import { DrawingDisplayComponent } from './components/ui/drawing-display/drawing-display.component';
import { TableNewDrawingComponent } from './components/features/table-new-drawing/table-new-drawing.component';
import { ColorPickerComponent } from './components/features/table-new-drawing/components/feature/color-picker/color-picker.component';
import { ColorSliderComponent } from './components/features/table-new-drawing/components/feature/color-picker/color-slider/color-slider.component';
import { ColorPaletteComponent } from './components/features/table-new-drawing/components/feature/color-picker/color-palette/color-palette.component';


@NgModule({
  declarations: [
    UserTablesComponent,
    TablePageComponent,
    TablePresentationComponent,
    TableNewPlayerComponent,
    DrawingDisplayComponent,
    TableNewDrawingComponent,
    ColorPickerComponent,
    ColorSliderComponent,
    ColorPaletteComponent
  ],
  imports: [
    CommonModule,
    TableManagementRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class TableManagementModule { }
