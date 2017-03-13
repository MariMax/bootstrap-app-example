import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule, DatepickerModule, DatePickerComponent, DayPickerComponent  } from 'ng2-bootstrap';
// import {DATEPICKER_CONTROL_VALUE_ACCESSOR} from 'ng2-bootstrap/datepicker/datepicker.component';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AppComponent } from './app.component';

export const DATEPICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MyPicker),
  multi: true
};

@Component({
  selector: 'my-day-picker',
  template: `
<table *ngIf="datePicker.datepickerMode==='day'" role="grid" [attr.aria-labelledby]="datePicker.uniqueId+'-title'" aria-activedescendant="activeDateId">
  <thead>
    <tr>
      <th>
        <button type="button" 
                class="btn btn-default btn-secondary btn-sm pull-left" 
                (click)="datePicker.move(-1)" 
                tabindex="-1"
                [innerHTML]="CURRENT_THEME_TEMPLATE.ARROW_LEFT">
        </button>
      </th>
      <th [attr.colspan]="5 + (datePicker.showWeeks ? 1 : 0)">
        <button [id]="datePicker.uniqueId + '-title'"
                type="button" class="btn btn-default btn-secondary btn-sm"
                (click)="datePicker.toggleMode()"
                [disabled]="datePicker.datepickerMode === datePicker.maxMode"
                [ngClass]="{disabled: datePicker.datepickerMode === datePicker.maxMode}" tabindex="-1" style="width:100%;">
          <strong>{{title}}</strong>
        </button>
      </th>
      <th>
        <button type="button" 
                class="btn btn-default btn-secondary btn-sm pull-right" 
                (click)="datePicker.move(1)" 
                tabindex="-1"
                [innerHTML]="CURRENT_THEME_TEMPLATE.ARROW_RIGHT">
        </button>
      </th>
    </tr>
    <tr>
      <th *ngIf="datePicker.showWeeks"></th>
      <th *ngFor="let labelz of labels" class="text-center">
        <small aria-label="labelz.full"><b>{{labelz.abbr}}</b></small>
      </th>
    </tr>
  </thead>
  <tbody>
    <template ngFor [ngForOf]="rows" let-rowz="$implicit" let-index="index">
      <tr *ngIf="!(datePicker.onlyCurrentMonth && rowz[0].secondary && rowz[6].secondary)">
        <td *ngIf="datePicker.showWeeks" class="h6" class="text-center">
          <em>{{ weekNumbers[index] }}</em>
        </td>
        <td *ngFor="let dtz of rowz" class="text-center" role="gridcell" [id]="dtz.uid">
          <button type="button" style="min-width:100%;" class="btn btn-sm {{dtz.customClass}}"
                  *ngIf="!(datePicker.onlyCurrentMonth && dtz.secondary)"
                  [ngClass]="{'btn-secondary': isBs4 && !dtz.selected && !datePicker.isActive(dtz), 'btn-info': dtz.selected, disabled: dtz.disabled, active: !isBs4 && datePicker.isActive(dtz), 'btn-default': !isBs4}"
                  [disabled]="dtz.disabled"
                  (click)="datePicker.select(dtz.date)" tabindex="-1">
            <span [ngClass]="{'text-muted': dtz.secondary || dtz.current, 'text-info': !isBs4 && dtz.current}">{{dtz.label}}</span>
          </button>
        </td>
      </tr>
    </template>
  </tbody>
</table>`
})
export class MyDayPicker extends DayPickerComponent{}

@Component({
  selector: 'my-picker',
  template: `
    <datepicker-inner [activeDate]="activeDate"
                      (update)="onUpdate($event)"
                      [datepickerMode]="datepickerMode"
                      [initDate]="initDate"
                      [minDate]="minDate"
                      [maxDate]="maxDate"
                      [minMode]="minMode"
                      [maxMode]="maxMode"
                      [showWeeks]="showWeeks"
                      [formatDay]="formatDay"
                      [formatMonth]="formatMonth"
                      [formatYear]="formatYear"
                      [formatDayHeader]="formatDayHeader"
                      [formatDayTitle]="formatDayTitle"
                      [formatMonthTitle]="formatMonthTitle"
                      [startingDay]="startingDay"
                      [yearRange]="yearRange"
                      [customClass]="customClass"
                      [dateDisabled]="dateDisabled"
                      [onlyCurrentMonth]="onlyCurrentMonth"
                      [shortcutPropagation]="shortcutPropagation"
                      [monthColLimit]="monthColLimit"
                      [yearColLimit]="yearColLimit"
                      (selectionDone)="onSelectionDone($event)">
      <my-day-picker tabindex="0"></my-day-picker>
    </datepicker-inner>
    `,
    providers: [DATEPICKER_CONTROL_VALUE_ACCESSOR]
})
export class MyPicker extends DatePickerComponent{}


@NgModule({
  declarations: [
    AppComponent,
    MyDayPicker,
    MyPicker
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DatepickerModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
