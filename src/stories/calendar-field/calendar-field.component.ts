import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-calendar-field',
  templateUrl: './calendar-field.component.html',
  styleUrls: ['./calendar-field.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CalendarFieldComponent),
            multi: true
        }
    ]
})
export default class CalendarFieldComponent implements OnInit, ControlValueAccessor {
    // calendar parameters
    @Input()
    public defaultDate: Date;
    @Input()
    public selectMode = 'single';
    @Input()
    public minDate: Date = new Date();

    @Output()
    public selected = new EventEmitter<Date>();

    public currentMonth: Date;
    private selectedDay: Date = null;
    public isChangingMonth: boolean;
    public isDisabledState: boolean;
    private minDateFirstMonthDay: Date;

    public monthDays: Date[];
    public weeks: Date[][] = [];
    public weekDays = [ 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс' ];
    private daysOnPage: number;
    public selectedDayIndex: number;

    constructor() { }

    ngOnInit() {
        this.currentMonth = new Date();
        this.currentMonth.setHours(0, 0, 0, 0);
        this.minDateFirstMonthDay = new Date(this.minDate);
        this.minDateFirstMonthDay.setDate(1);
        this.minDateFirstMonthDay.setHours(0, 0, 0, 0);
        this.minDate.setHours(0, 0, 0, -1);
        if (this.defaultDate) {
            this.selectedDay = this.defaultDate;
        } else {
            this.selectedDay = new Date();
        }
        this.refreshCalendar();
    }

    onChange = (_: any) => {};
    onTouch = () => {};

    registerOnChange(fn: any) {
        this.onChange = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }

    writeValue(day: Date) {
        if (!day) {
            this.currentMonth = new Date();
            this.currentMonth.setHours(0, 0, 0, 0);
        } else {
            if (!this.isSelected(day)) {
                this.selectDay(day);
            }
        }
        this.refreshCalendar();
    }

    setDisabledState(isDisabled: boolean) {
        this.isDisabledState = isDisabled;
    }

    public selectDayOnClick(day: Date) {
        if (this.selectDay(day)) {
            this.onChange(this.selectedDay);
            this.selected.emit(this.selectedDay);
        }
    }

    public selectDayByEnter() {
        if (this.selectedDayIndex !== null && this.selectedDayIndex !== undefined) {
            const i = Math.floor(this.selectedDayIndex / 7);
            const j = this.selectedDayIndex % 7;
            this.selectDayOnClick(this.weeks[i][j]);
        }
    }

    public selectDay(day: Date) {
        if (this.isDisabledState || this.isDisabled(day)) {
            return false;
        }
        const _day = new Date(day);
        _day.setHours(0, 0, 0, 0);
        this.selectedDay = new Date(_day);
        if (!this.isSelectedMonth(day)) {
          this.currentMonth = new Date(_day);
          this.refreshCalendar();
        }
        return true;
    }

    public isSelected(date: Date): boolean {
        if (this.selectedDay) {
            const _date = new Date(date);
            _date.setHours(0, 0, 0, 0);
            this.selectedDay.setHours(0, 0, 0, 0);
            return _date.getTime() === this.selectedDay.getTime();
        } else {
            return false;
        }
    }

    public isSelectedMonth(date: Date): boolean {
        const _date = new Date(date);
        _date.setHours(0, 0, 0, 0);
        _date.setDate(1);
        this.currentMonth.setHours(0, 0, 0, 0);
        this.currentMonth.setDate(1);
        return _date.getTime() === this.currentMonth.getTime();
    }

    public isDisabled(day) {
        return this.isDisabledState || day.getTime() < this.minDate.getTime();
    }

    private getDaysInMonth (date: Date): number {
        const _date = new Date(date);
        _date.setMonth(_date.getMonth() + 1, 0);
        return _date.getDate();
    }

    public nextMonth() {
        this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() + 1));
        this.refreshCalendar();
    }

    public prevMonth(): boolean {
        const prevMonth = new Date(this.currentMonth);
        prevMonth.setMonth(prevMonth.getMonth() - 1, 1);

        if (this.minDateFirstMonthDay.getTime() > prevMonth.getTime()) {
            return false;
        }
        this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() - 1));
        this.refreshCalendar();
        return true;
    }

    private refreshCalendar() {
        this.isChangingMonth = true;
        setTimeout(() => {
            this.isChangingMonth = false;
        }, 400);
        this.monthDays = [];
        this.weeks = [];
        const firstDay: Date = new Date(this.currentMonth);
        firstDay.setDate(1);
        firstDay.setHours(0, 0, 0 , 0);
        const prevMonthDays = (firstDay.getDay() + 6) % 7;

        this.daysOnPage = 7 * Math.ceil( ( this.getDaysInMonth(firstDay) + prevMonthDays) / 7 );
        let dayToAdd = firstDay.setDate(firstDay.getDate() - prevMonthDays);

        for (let i = 0; i < this.daysOnPage; i++) {
            this.monthDays.push(new Date(dayToAdd));
            if (this.selectedDay && this.isSelected(new Date(dayToAdd))) {
                this.selectedDayIndex = i;
            }
            dayToAdd += 86400000;
        }
        while (this.monthDays.length > 0) {
            this.weeks.push(this.monthDays.splice(0, 7));
        }
    }

    public changeFocus(diff: number, event: Event) {
        const newIndex = this.selectedDayIndex + diff;
        if (newIndex >= 0 && newIndex < this.daysOnPage) {
            this.selectedDayIndex = newIndex;
        } else if (newIndex >= this.daysOnPage) {
            const selectedIndex = newIndex - this.daysOnPage;
            this.nextMonth();
            this.selectedDayIndex = selectedIndex;
            if (this.weeks[0][0].getDate() > 8) {
                this.selectedDayIndex += 7;
            }
        } else {
            if (this.prevMonth()) {
                this.selectedDayIndex = newIndex + this.daysOnPage;
                if (this.weeks[this.weeks.length - 1][6].getDate() < 7) {
                    this.selectedDayIndex -= 7;
                }
            }
        }
        event.stopPropagation();
        event.preventDefault();
        document.getElementById(this.selectedDayIndex.toString()).focus();
    }

}

