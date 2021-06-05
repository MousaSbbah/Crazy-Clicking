<h1 align="center" ><strong>CrazZzy Clicking Game</strong></h1>

  <p align="center"> 
<!-- <img src="http://static.skaip.org/img/emoticons/180x180/f6fcff/holidayspirit.gif" alt="Logo" width="270" height="270">
 <img src="https://i.pinimg.com/originals/a8/75/81/a875811ca478a881b1223c8ca1b6beaf.gif" alt="Logo" width="270" height="270">
  <img src="https://media1.giphy.com/media/3o6Zt7Esrorq22OiGY/giphy.gif" alt="Logo" width="270" height="270"> -->
  <img src="https://cdn.dribbble.com/users/387276/screenshots/3284576/millenials-fb-reactions3.gif" alt="Logo"  height=500">
  </a>
    <br />
    <br />
    <strong>Are You Annoying ????</strong>
    <br />
    <br />
          <a href="https://crazy-clicking.herokuapp.com/">Heroku App</a> 
                                                         | 
                                                         <a href="https://github.com/MousaSbbah/Crazy-Clicking">GitHub Repo</a> 
                                                                                                               | 
                                                                                                               <a href="https://github.com/MousaSbbah/Crazy-Clicking/pulls?q=is%3Apr+is%3Aclosed">Pull Requests</a>
  </p>
  <br />
  <h2 align="center" ><strong>Authors</strong></h2>
  <p align="center"> 
  <img src="https://ca.slack-edge.com/TNGRRLUMA-U01LAQ5747L-ab0f56d7d856-512" alt="Logo" width="220" height="220" >
  <img src="https://avatars.githubusercontent.com/u/78366617?v=4" alt="Logo" width="220" height="220">
  <img src="https://ca.slack-edge.com/TNGRRLUMA-U01M0KJAQ7J-9ddc3f3470a2-512" alt="Logo" width="220" height="220">
  <img src="https://ca.slack-edge.com/TNGRRLUMA-U01LB0UBL8K-9095dd3c4336-512" alt="Logo" width="220" height="220">
  </p>
  <pre >
              <strong>Mousa Sbbah</strong>                  <strong>Farah AlWahaibi</strong>               <strong>Tamara Albilleh</strong>                 <strong>Emran Aloul</strong>
            <strong>Electrical Eng</strong>                    <strong>Architect</strong>                        <strong>Nurse</strong>                    <strong>Mechanical Eng</strong><br />
               <a href="https://github.com/MousaSbbah"><img src="https://icon-library.com/images/github-svg-icon/github-svg-icon-1.jpg" alt="Logo" width="30" height="30" > </a><a href="https://www.linkedin.com/in/mousasabah/"><img src="https://www.clipartmax.com/png/middle/157-1571709_follow-us-high-resolution-linkedin-logo.png" alt="Logo" width="30" height="30" ></a>                      <a href="https://github.com/farahalwahaibi"><img src="https://icon-library.com/images/github-svg-icon/github-svg-icon-1.jpg" alt="Logo" width="30" height="30" ></a> <a href="https://www.linkedin.com/in/farah-wahaibi/"><img src="https://www.clipartmax.com/png/middle/157-1571709_follow-us-high-resolution-linkedin-logo.png" alt="Logo" width="30" height="30" ></a>                     <a href="https://github.com/tamaraalbilleh"><img src="https://icon-library.com/images/github-svg-icon/github-svg-icon-1.jpg" alt="Logo" width="30" height="30" ></a> <a href="https://www.linkedin.com/in/tamaraalbilleh/"><img src="https://www.clipartmax.com/png/middle/157-1571709_follow-us-high-resolution-linkedin-logo.png" alt="Logo" width="30" height="30" ></a>                      <a href="https://github.com/emranaloul"><img src="https://icon-library.com/images/github-svg-icon/github-svg-icon-1.jpg" alt="Logo" width="30" height="30" ></a> <a href="https://www.linkedin.com/in/emran-aloul/"><img src="https://www.clipartmax.com/png/middle/157-1571709_follow-us-high-resolution-linkedin-logo.png" alt="Logo" width="30" height="30" ></a> 
 </pre>
  
         
         

<br />
<br />
<br />
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#About-Project">About Project</a>
      <ul>
        <li><a href="#problem-domain">Problem Domain</a></li>
        <li><a href="#message-queue">Message Queue</a></li>
      </ul>
    </li>
    <li>
      <a href="#tools">Tools</a>
      <ul>
        <li><a href="#frontend">FrontEnd</a></li>
        <li><a href="#backend">BackEnd</a></li>
        <li><a href="#technical">Technical</a></li>
        <li><a href="#communication">Communication</a></li>
      </ul>
    </li>
    <li><a href="#setup">SetUp</a></li>
    <li><a href="#running-app">Running App</a></li>
    <li><a href="#uml-diagram">UML Diagram</a></li>
    <li><a href="#strech-goal">Strech Goal</a></li>
  </ol>
</details>




<!-- ABOUT PROJECT -->
## About Project

Real Time App , which use socket.io library to enable communication between the Client-side and the Server-side, So we used Socket.io server for :

* Handling events and real time messaging .
* Use events to properly route incoming messages and payload .

### Problem Domain

There will be a common screen for both players, and when one of them presses on the start button, the game will start with the appearance of a square and the player who presses the square first will score a point for him, when pressing a square it will disappear and two squares will appear instead of it. The player who achieves 20 clicks first will win.

So As a user :

* I want to create a real time crazy clicking game .
* I want to have a form which allow the player to create a room by generate a unique id .
* I need each room to have three players .
* I want each game to start, to have three players press on join and once the third player press join the game will be start for all .
* Also I want to allow any one of the player to leave the game , and once he/she left , I want to allow other player to join the game (once he/she have the same room id) , and when he/she joined, I need him/her to see the final update for the game (like score, shapes, .....) .


### Message Queue

In our app we used the message queue as the following :

* If one of the three players left the game , and new player join the game , So when he add the same room id and click on join, he will move directly to the room with the update rendered data for :
  * The Score
  * The Shapes


<!-- Tools -->
## Tools

These are our tools which we used it during the project week

### FrontEnd

* JS
* CSS
* HTML

### BackEnd

* Http
* Dotenv
* Express
* Socket.io

### Technical

* GitHub
* Heroku
* VsCode
* Mockups

### Communication

* Remo
* Zoom
* Slack
* Google Meet


<!-- SetUp -->
## SetUp

* .env
  * PORT = 3050


<!-- Running App -->
## Running App

* npm start
* nodemon


<!-- UML Diagram -->
## UML Diagram




<!-- Strech Goal -->
## Strech Goal

* Throw :bomb: each 10sec and If any one of the player click on it , the score will decrease !!

<br/>
<br/>
<br/>
<br/>
<br/>
<p align="center">
<strong>HOPE YOU LIKE IT :stuck_out_tongue_winking_eye:</strong>
<br/>
<strong>THANK YOU !!!</strong>
</p>
