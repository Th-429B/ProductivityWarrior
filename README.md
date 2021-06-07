# ProductivityWarrior
[![Inline docs](http://inch-ci.org/github/Th-429B/ProductivityWarrior.svg?branch=main)](http://inch-ci.org/github/Th-429B/ProductivityWarrior)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)

## Description
* This is a project for NUS CP2106 Orbital

## Level of Achievement
* Apollo 11

## Motivations
Currently, there are too many productivity apps out there with varied functions, and they are not catered to students specifically. Thus, for students, they have to download multiple applications to use their functions together. 
 
Some of such productivity apps are to-do apps, calendar apps, “anti-distraction” apps. With so many different apps, it would be hard to keep track of everything and there is a loss in productivity. Furthermore, there is also a lack of an application that helps students keep track of their University progress, such as what modules they would need to take, and their CAP. As a result, students often have to visit the NUS Faculty website or EduRec frequently to source for these information, which is inefficient. 

With a single application catered to students that implements all of these features, it would be a lot more convenient for students.

## Aim

We hope to make the student life more efficient and productive through the development of an “all in one” productivity app.

## Scope of Project

* A mobile application that provides the functionality stated above. A local database that stores the user information and settings.
Calendar: Basic calendar that allows users to add events / delete events, and users will get a push notification when the event is about to happen.

* To-Do List: A todo list where users are able to add tasks that needs to be completed by a certain date. Some key functions of the to-do list are adding task by date, strikethrough when the task is completed and deletion of the task. Users will also be able to add the task to a category, and add tags to the task.
 
* Module / Cap Tracker: A page that allows users to key in the mods they have completed, the amount of MC and the grade they have gotten. The mods keyed in will be stored in a local database which will calculate the user’s CAP and display it on the same screen along with the completed modules.

* Anti-distraction Feature: Anti-distraction feature will feature a blackout screen with a user-settable countdown timer. During this countdown period, the Do Not Disturb function of the phone will be activated and notifications will be turned off. At the end of the timer, normal usage will be restored.

## Technologies

* React Native
