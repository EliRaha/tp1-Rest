# tp1-Rest
brief project description:
In this SPA, I have installed Express, Request, and dotenv in myproject and
configured them. Let me explain how this SPA works. Itconsists of four main
parts:
1.The first part, "About," simply provides welcome page about cats,without any
further details.it has a link to received list of the randome cats.
2.In the second part, when you click on "cats" with the address "cat-list," you
can retrieve a photos of 10 random cats. This data isobtained through a REST API
available at the following URL.
3.The third part is an additional page that appears when you click on" Breeds"
when you click on the menu bar with the address "breed-list." On this page, you
canobtain the list of cat breeds.
This information is stored in the "cat.json" and “catBreed.json” file located in
the "data"folder. In fact, the information is extracted from this file to be
displayedon the page.
5.Finally, if you click on an item in the Breed list, you can obtain detailed
information about that breed of cat but unfurthnately its not complited.
all command lines
npm init -y
npm i express request dotenv
npm start / node index.js
mkdir frontend
cd frontend
mkdir static
cd static
mkdir css
mkdir data
mkdir js
