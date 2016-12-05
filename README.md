Course Project

Web applications with Node.js

Team B

Team

Nickname	        Name
Aleks_St	        Александър Стайков
Viktoria_Nedialkova	Виктория Недялкова
Gerilovski	        Кристиян Гериловски

Application Desription

We should designed and implemented application for event using Node.js, Express and MongoDB.

Application Logics

"Events e-Web Application" consist of the 2 main parts:

public part (accessible without authentication)
private part (available for registered users)

Public Part

The public part is visible without authentication. This public part includes the following pages:

the application start page: contains public menu options;
search option;
user sign-in page: login possible through user's site account or through Facebook account;
user sign-up page;
categories page: buttons with links for each category; when clicked, the events of this category are displayed;
events by category chosen from the category page.

Private Part (Registered users area)

Registered users have personal area in the web application accessible after successful login. This area holds the following pages:

the user can see his/her profile;
the user can add events;
the user can add categories;

Technologies, frameworks and development techniques used in the "Events e-Web Application" project:

Application Back-end (Server)

6 different public dynamic web pages
Using Pug
3 different private (authenticated) dynamic web pages

Using Pug
5 different public RESTful routes for AJAX:

authentication-router
category-router
event-router
home-router
search-router

In order to implement a testable high-quality Web-application, "Events e-Web Application" was designed using an MVC pattern;
Events Rush database was designed using MongoDB's data storage, and data/service layer for accessing the database was created;

Passport strategy was applied for users

More than 10 different unit tests were written for the controllers and data logics
In order to avoid crashes when invalid data is entered, error handling and data validation were implemented
Special strategies are applied to prevent the application from security holes (XSS, XSRF, Parameter Tampering)
General Requirements

Used Git repository: https://github.com/AleksandarStaikov/Eventr

"Events e-Web Application" uploaded in the cloud:
