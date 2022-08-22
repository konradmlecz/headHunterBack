# Mega K Head Hunter 1.0.0 <img src="./images/megaK_logo.png" height="80">

Live demo [_here_](https://headhunter-g3.networkmanager.pl/).

Link to frontend repository [_here_](https://github.com/konradmlecz/headHunterFront).

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)


## General Information
The app makes it easy to connect people from companies' HR departments, including Headhunters [HR], with IT job seekers.

The app is intended to allow Mega K [Student] to showcase their skills, in a unified manner.

The application is to allow HR to easily find suitable job candidates, interview them and offer cooperation.

The application is to allow the Administrator in managing access to the Cursor database.


## Technologies Used
- NestJS
- TypeScript
- Passport
- JWT (JSON Web Token)
- MySQL 2
- TypeORM - For integrating with SQL
- Bcrypt - A library to help you hash passwords
- Multer - To handle filing uploading
- Nodemailer - Is a module for Node.js applications to allow easy as cake email sending
- joi - A schema description language and data validator for JavaScript


## Features
The system works only after registration/log-in. It is not possible to access anything in the system without logging in.

- USER AUTHORIZATION JWT - users are authorized using JSON Web Tokens
- CHANGE PASSWORD - all user can change their password

The following system roles will be in the system:

#### ADMIN
- ADD HEADHUNTER - create new headhunter with email confirmation using nodemailer
- IMPORT STUDENTS - import list of students from a JSON file and create new students with email confirmation using nodemailer 

#### HEADHUNTER
- SET PASSWORD - set the password after click on the registration link from the email
- GET ALL STUDENTS - display of all active students
- SET TO INTERVIEW - add student to interview list
- GET STUDENTS FOR INTERVIEW - display list of students added to interview
- SET FILTER - search for students by set filters
- SEARCH TERM - search for students by search term
- GET ONE STUDENT - display CV of a single student
- SET EMPLOYED - set the student's status as employed
- SET DISINTEREST - remove student from the interview list

#### STUDENT
- SET PASSWORD - set the password after click on the registration link from the email
- EDIT STUDENT PROFILE - CRUD for student profile
- SET EMPLOYED - set the student status as employed


## Setup
Rename the file config/config.example.ts to conig/config.ts and enter the correct data to connect to your database, create your JWT secret code and add email account for Nodemailer.

To run this project, install it locally using npm:

```
$ cd ../headHunterBack
$ npm install
$ npm start
```

## Project Status
Project is: _complete_