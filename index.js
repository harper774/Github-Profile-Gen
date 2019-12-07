const fs = require("fs");
const inquirer = require("inquirer");
//use github-api to get the required info for the pdf
const GitHub = require('github-api');
const pdf = require("pdf-creator-node");

inquirer
    .prompt([
            {
                message: "Enter your GitHub username:",
                name: "username"
            },
            {
                message: "What's your favourite color?",
                name: "color"
            }
        ])
    .then(function({ username,color }) {
        var gh = new GitHub({
            username: "harper774",
            password: "lyy999774LYY"
        });
        
        var ghUser = gh.getUser(username); 
        //getProfile can return the username, the number of followers,
        //the number of followings, and the company's name,
        //the location, the link to github page and blog
        ghUser.getProfile(function(err, profile) {
            if(err) console.log(err);
            //listStarredRepos can return all the stared repos
            //use .length to get the number of stared repos
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
</head>
<body>
    <section class="hero is-medium is-dark is-bold">
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
                    <i class="fas fa-building"></i>
                    Currently @ ${profile.company} 
                    <br><br>

                    <i class="fas fa-location-arrow"></i> 
                    <a href=${profile.location}>
                        ${profile.location}
                    </a>
                    &nbsp;

                    <i class="fab fa-github"></i>
                    <a href=${profile.html_url}>
                        Github
                    </a>
                    &nbsp;
                    <i class="fas fa-blog"></i>
                    <a href=${profile.blog}>
                        Blog
                    </a>
                </h2>
            </div>
        </div>
    </section>

    <section class="section" id="indexPage">
        <div class="container">
            <div class="columns">
                <div class="column is-half is-offset-one-quarter">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title is-centered">
                            Public Repositories
                            </p>
                        </header>
                        <div class="card-content has-text-centered">
                            <div class="content">
                                ${profile.public_repos}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="columns">
                <div class="column is-half is-offset-one-quarter">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title is-centered">
                                GitHub Stars
                            </p>
                        </header>
                        <div class="card-content has-text-centered">
                            <div class="content">
                                ${repos.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="columns">
                <div class="column is-half is-offset-one-quarter">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title is-centered">
                                Followers
                            </p>
                        </header>
                        <div class="card-content has-text-centered">
                            <div class="content">
                                ${profile.followers}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="columns">
                <div class="column is-half is-offset-one-quarter">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title is-centered">
                                Following
                            </p>
                        </header>
                        <div class="card-content has-text-centered">
                            <div class="content">
                                ${profile.following}
                            </div>
                        </div>
                    </div>
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
                const html = fs.readFileSync('index.html', 'utf8');
                const options = {
                    format: "A3",
                    orientation: "portrait",
                    border: "10mm"
                };
                const users = [
                    // {
                    //     name:"Shyam",
                    //     age:"26"
                    // },
                    // {
                    //     name:"Navjot",
                    //     age:"26"
                    // },
                    // {
                    //     name:"Vitthal",
                    //     age:"26"
                    // }
                ]
                
                const document = {
                    html: html,
                    data: {
                        users: users
                    },
                    path: "./output.pdf"
                };

                pdf.create(document, options)
                .then(res => {
                    console.log(res)
                })
                .catch(error => {
                    console.error(error)
                });
            });           
        });
    });


