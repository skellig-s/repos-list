import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import CalendarFieldComponent from './calendar-field.component';

@NgModule({
    declarations: [
        CalendarFieldComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CalendarFieldComponent
    ]
})
export class CalendarFieldModule {
}
