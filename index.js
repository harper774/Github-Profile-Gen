const fs = require("fs");
const inquirer = require("inquirer");
//use github-api to get the required info for the pdf
const GitHub = require('github-api');
//use path to get the local file address
const path = require("path");
//use puppeteer to convert to PDF
const puppeteer = require('puppeteer');

inquirer
    .prompt([
            {
                message: "Enter your GitHub username:",
                name: "username",
                type: "input"
            },
            {
                message: "What's your favourite color?",
                name: "color",
                type: 'rawlist',
                choices: [
                    "olive green", "light green", "sky blue", "yellow", 
                    "red", "light gray", "white", "black"
                ]
            }
        ])
    .then(function({ username,color }) {
        console.log(color);
        var gh = new GitHub({
            username: "harper774",
            password: "lyy999774LYY"
        });
        switch (color){
            case "olive green":
                color = "primary";
                break;
            case "light green":
                color = "success";
                break;
            case "sky blue":
                color = "info";
                break;
            case "yellow":
                color = "warning";
                break;
            case "red":
                color = "danger";
                break;
            case "light gray":
                color = "light";
                break;
            case "white":
                color = "white";
                break;
            case "black":
                color = "dark";
                break;
        }
        console.log(color);
        const ghUser = gh.getUser(username); 
        //getProfile can return the username, the number of followers,
        //the number of followings, and the company's name,
        //the location, the link to github page and blog
        ghUser.getProfile(function(err, profile) {
            if(err) {
                console.log(err);
                console.log("Please enter a valid Github Username!");
            }
            //listStarredRepos can return all the stared repos
            //use .length to get the number of stared repos
            const userLocation = "https://www.google.com/maps/place/"+profile.location;
            ghUser.listStarredRepos(function(err, repos) {
                if(err) console.log(err);
                HTMLContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css" integrity="sha384-KA6wR/X5RY4zFAHpv/CnoG2UW1uogYfdnP67Uv7eULvTveboZJg0qUpmJZb5VqzN" crossorigin="anonymous">
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
                    <title>This is Git Hub User Page</title>

                    <style>
                        .panel-block {
                            justify-content: center;
                        }
                    </style>
                </head>
                <body>
                    <section class="hero is-medium is-bold is-`+color+`">
                        <div class="hero-body" style="padding: 50px">
                            <div class="container has-text-centered">
                                <h1 class="title">
                                    <figure class="image is-128x128" style="margin:auto">
                                        <img class="is-rounded" src=${profile.avatar_url}>
                                    </figure>
                                    <br>
                                    This is ${profile.name}'s Github Profile
                                    <br><br>
                                </h1>
                                <h2 class="subtitle">
                                    <!-- <i class="fas fa-building"></i> -->
                                    <svg class="icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building" class="svg-inline--fa fa-building fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M436 480h-20V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v456H12c-6.627 0-12 5.373-12 12v20h448v-20c0-6.627-5.373-12-12-12zM128 76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76zm0 96c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40zm52 148h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12zm76 160h-64v-84c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v84zm64-172c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40z"></path></svg>
                                    Currently @ ${profile.company} 
                                    <br><br>
                                    
                                    <svg class="icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-arrow" class="svg-inline--fa fa-location-arrow fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"></path></svg>
                                    <!-- <i class="fas fa-location-arrow"></i>  -->
                                    <a href=${profile.location}>
                                        ${profile.location}
                                    </a>
                                    &nbsp;

                                    <svg class="icon" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" class="svg-inline--fa fa-github fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                                    <!-- <i class="fab fa-github"></i> -->
                                    <a href=${profile.html_url}>
                                        Github
                                    </a>
                                    &nbsp;
                                    <svg class="icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="blog" class="svg-inline--fa fa-blog fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M172.2 226.8c-14.6-2.9-28.2 8.9-28.2 23.8V301c0 10.2 7.1 18.4 16.7 22 18.2 6.8 31.3 24.4 31.3 45 0 26.5-21.5 48-48 48s-48-21.5-48-48V120c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24v248c0 89.5 82.1 160.2 175 140.7 54.4-11.4 98.3-55.4 109.7-109.7 17.4-82.9-37-157.2-112.5-172.2zM209 0c-9.2-.5-17 6.8-17 16v31.6c0 8.5 6.6 15.5 15 15.9 129.4 7 233.4 112 240.9 241.5.5 8.4 7.5 15 15.9 15h32.1c9.2 0 16.5-7.8 16-17C503.4 139.8 372.2 8.6 209 0zm.3 96c-9.3-.7-17.3 6.7-17.3 16.1v32.1c0 8.4 6.5 15.3 14.8 15.9 76.8 6.3 138 68.2 144.9 145.2.8 8.3 7.6 14.7 15.9 14.7h32.2c9.3 0 16.8-8 16.1-17.3-8.4-110.1-96.5-198.2-206.6-206.7z"></path></svg>
                                    <!-- <i class="fas fa-blog"></i> -->
                                    <a href=${profile.blog}>
                                        Blog
                                    </a>
                                    <br><br>
                                    <h>${profile.bio}</h>
                                </h2>
                            </div>
                        </div>
                    </section>

                    <section class="section" id="indexPage">
                        <div class="container">
                            <div class="columns">
                                <div class="column is-half is-offset-one-quarter">
                                    <article class="panel is-`+color+`">
                                        <p class="panel-heading has-text-centered">
                                                Public Repositories
                                        </p>
                                        <div class="panel-block">
                                            <a class="panel-block is-active has-text-centered">
                                                <span class="panel-icon">
                                                    <i class="fas fa-book" aria-hidden="true"></i>
                                                </span>
                                                ${profile.public_repos}
                                            </a>
                                        </div>                          
                                    </article>
                                    <!-- <div class="card">
                                        <header class="card-header">
                                            <p class="card-header-title has-text-centered">
                                            Public Repositories
                                            </p>
                                        </header>
                                        <div class="card-content has-text-centered">
                                            <div class="content">
                                                ${profile.public_repos}
                                            </div>
                                        </div>
                                    </div> -->
                                </div>
                            </div>

                            <div class="columns">
                                <div class="column is-half is-offset-one-quarter">
                                    <article class="panel is-`+color+`">
                                        <p class="panel-heading has-text-centered">
                                                Github Stars
                                        </p>
                                        <div class="panel-block">
                                            <a class="panel-block is-active has-text-centered">
                                                <span class="panel-icon">
                                                    <i class="fas fa-book" aria-hidden="true"></i>
                                                </span>
                                                ${repos.length}
                                            </a>
                                        </div>                          
                                    </article>
                                    <!-- <div class="card">
                                        <header class="card-header">
                                            <p class="card-header-title has-text-centered">
                                                GitHub Stars
                                            </p>
                                        </header>
                                        <div class="card-content has-text-centered">
                                            <div class="content">
                                                ${repos.length}
                                            </div>
                                        </div>
                                    </div> -->
                                </div>
                            </div>

                            <div class="columns">
                                <div class="column is-half is-offset-one-quarter">
                                    <article class="panel is-`+color+`">
                                        <p class="panel-heading has-text-centered">
                                                Followers
                                        </p>
                                        <div class="panel-block">
                                            <a class="panel-block is-active has-text-centered">
                                                <span class="panel-icon">
                                                    <i class="fas fa-book" aria-hidden="true"></i>
                                                </span>
                                                ${profile.followers}
                                            </a>
                                        </div>                          
                                    </article>
                                    <!-- <div class="card">
                                        <header class="card-header">
                                            <p class="card-header-title has-text-centered">
                                                Followers
                                            </p>
                                        </header>
                                        <div class="card-content has-text-centered">
                                            <div class="content">
                                                ${profile.followers}
                                            </div>
                                        </div>
                                    </div> -->
                                </div>
                            </div>

                            <div class="columns">
                                <div class="column is-half is-offset-one-quarter">
                                    <article class="panel is-`+color+`">
                                        <p class="panel-heading has-text-centered">
                                                Following
                                        </p>
                                        <div class="panel-block">
                                            <a class="panel-block is-active has-text-centered">
                                                <span class="panel-icon">
                                                    <i class="fas fa-book" aria-hidden="true"></i>
                                                </span>
                                                ${profile.following}
                                            </a>
                                        </div>                          
                                    </article>
                                    <!-- <div class="card">
                                        <header class="card-header">
                                            <p class="card-header-title has-text-centered">
                                                Following
                                            </p>
                                        </header>
                                        <div class="card-content has-text-centered">
                                            <div class="content">
                                                ${profile.following}
                                            </div>
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </section>
                </body>
                </html>`;
                fs.writeFileSync("index.html", HTMLContent, (err) => {
                    if(err) console.log(err);
                    console.log("Saved to index.html!");
                });
                
                //the following process is based on the API docs on 
                //https://github.com/puppeteer/puppeteer/blob/v2.0.0/docs/api.md
                (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                //get the local address of the index.html
                const htmlpath = path.join("file://", process.cwd(), "index.html");
                await page.goto(htmlpath, {waitUntil: 'networkidle2'});
                //printBackground is default set to false
                //it has to be set to true or the background will be be white
                await page.pdf({path: 'Github_profile.pdf', format: 'A4', printBackground: true});
                await browser.close();
                })();
            });           
        });
    });


