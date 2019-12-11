# MonashBootcampWeek7
Monash Bootcamp for Week 7

This is an application that can be used to generate a pdf based on the 
user's github name and color-selection

Instruction:
1. run npm install
2. run node index.js
3. enter the user's github username
4. select the color style that you'd like to have
5. open the Github_Profile.pdf to see the magic!

About the color-selection:
The reason why I chooese not to let the user input their favourite color
is that random color may make the pdf displayed in a not so great way
(they might choose some color such as red or gray that are not so good to see in resume)
Therefore, I pre-defined some color themes for user to choose from, which would make the pdf
display in a more user-friendly way.

Further Improvement:
In the card display, the number could not made to be centered, even though in the HTML, they are centered.
However, no matter what I do to change the style, they are still alighed to left in pdf.
Still working on it----already solved the problem