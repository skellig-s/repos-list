// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import CalendarFieldComponent from './calendar-field.component';

export default {
  title: 'Example/Calendar',
  component: CalendarFieldComponent,
  argTypes: {
    defaultDate: Date,
    minDate: Date,
  },
} as Meta;

const Template: Story<CalendarFieldComponent> = (args: CalendarFieldComponent) => ({
  component: CalendarFieldComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
};

export const Secondary = Template.bind({});
Secondary.args = {
  defaultDate: new Date('2021-03-05T19:33:16.238Z'),
  minDate: new Date('2021-03-04T00:00:00+0300')
};
