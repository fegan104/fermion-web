Welcome to Team Fermion's calendar application! 

[Open Application](http://fermion-web.s3-website.us-east-2.amazonaws.com/)

## Authors
* [Frank Egan](<mailto:fegan@wpi.edu>)
* [Dimitar Vouldjeff](<mailto:dmvouldjeff@wpi.edu>)
CS 509

## Home Page

From the homepage you can select to load any previously saved calendar by clicking an item on the list on the right hand side. Delete any calendars by clicking the orange delete button next to each calendar name. Finally, you can create a new calendar.

To create a new calendar input the various information needed for a new calendar. Once you click Create Calendar the Lambda will need to start up and you should expect this to take about 30 seconds to a minute before you are automatically redirected to the calendar view. 

## Calendar View

After loading a calendar you will be presented with a grid of days where the current day is hightlighted in green. On the right hand side the available timeslots and meetings for the selected day are shown as a list. To select a different day just click on it in the calendar grid. To change teh month click the green arrows next to the Month.

To schedule a meeting first select the timeslot you want then fill out the relevent information and submit.
After scheduling a meeting you can see it presented on the right hand side listed amongst the open timeslots. You may cancel the new meeting by selecting it then clicking the Cancel button. 

To add or remove a day from the calendar click the Pencil Icon from the pruple menu then fill out the relevent information and select Add or Delete. That day will then be added with the proper timeslots.

To close a timeslot click the Filter Icon from the purple menu. From this dialog you will have several option for closing timeslots. If you select a day of the week we will remove all timeslots on that day from the calendar. If you select a date with no time we will close all timeslots on that day. If you select a time with no date we will close all timeslots on the calendar that start at that time. If you select a date and time we will only close a timeslot at that date and time. This will close the timeslots without removing any already scheduled meetings.


## Aditional Features

 * All changes to the calendar are persisted as you make the changes.
 * Select the Calendar Icon from the purple menu to jump to today's date
 * Share a link to the calendar by copying the URL. Anyone will be able to view and edit
