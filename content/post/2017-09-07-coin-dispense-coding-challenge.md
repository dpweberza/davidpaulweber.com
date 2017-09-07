+++
date = "2017-09-07"
tags = ["Java", "Android", "Coding Challenge", "Portfolio"]
title = "Coding Challenge: Coin Dispense System"
+++

## Preamble
I have started cleaning up and updating my Github account [https://github.com/dpweberza](https://github.com/dpweberza) as more and more companies these days are likely to view it.
Because I don't have many open-source projects, I have uploaded a rather meaty coding challenge that I completed back in 2015.

## The Coding Challenge
In 2015 I interviewed at a global mobile payments company for the position of Android Developer.
At the time I had no commericial Android development experience but nevertheless was invited to complete a coding challenge after I had passed a screening call.

The challenge story was slightly non-sensical as it involved a user entering in a cash amount to pay for their existing account balance on a mobile app and then being displayed a breakdown of any change to be returned.
This required me to build both a backend API and an android app, which I think is quite a big ask for a job application. However I love to code and loathe white-board coding so I took up the challenge and was excited to build both these elements from scratch.

I completed the project over a weekend, went for a final interview on-site where after going through my code and design decisions with the team lead and architect, I was offered the job.

In the end I remained at my then-current employer but atleast I had the following neat projects for my portfolio.



### REST Web Service
Github: [Coin Dispense Service](https://github.com/dpweberza/coin-dispense-service)  
Tools: NetBeans (IDE), Postman (API Testing)

Frameworks / Libraries:  

* [Spark](https://github.com/perwendel/spark) (Web Framework)
* [Guice](https://github.com/google/guice) (Dependency Injection)
* [Gson](https://github.com/google/gson) (JSON)
* [JUnit](http://junit.org/junit4/) (Testing)
* [Nimbus JWT](https://github.com/Connect2id/Nimbus-JWT) (Authentication)
* [JBCrypt](https://github.com/jeremyh/jBCrypt) (Hashing)

Endpoints:

* api/v1/public/authenticate - accepts and verifies credentials then returns a user profile as well as a JSON Web Token to authenticate future requests.
* api/v1/authenticated/payment - accepts a payment amount, subtracts the payment amount from the user's account, updates the user profile and returns a breakdown of any change to be dispensed.

Assumptions:

* If an amount owed as change is less than the lowest denomination (2 cents), ignore that remainder.


### Android Client
Github: [Coin Dispense Client](https://github.com/dpweberza/coin-dispense-client)  
Tools: Android Studio

Frameworks / Libraries: 

* [RoboGuice](https://github.com/roboguice/roboguice) (Dependency Injection)
* [Gson](https://github.com/google/gson) (JSON)
* [OkHttp](http://square.github.io/okhttp/) (HTTP)
* [Saripaar](https://github.com/ragunathjawahar/android-saripaar) (UI Validation)

Assumptions:

* The client only accepts a single rand note value.


### Preview
{{< figure src="/static/img/coin-dispense-animation.gif" >}}