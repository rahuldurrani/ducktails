
# Ducktails Install and Usage guide
## Installation
### Pre-Requisites
1. Mongo DB
2. Node JS (v7.0+)

### Steps
1. Download or clone the git repository.
2. Install all NPM dependencies by running the following command
```
npm install
```
3. Run MongoDB server on your local machine using the folllowing command
```
mongod
```
4. To run the server run the command:
```
npm start
```
5. Access the web app at localhost:3000

### Featuers implemented
#### 1. Singn up
User by clicking the register buttton on the upper right corner.
#### 2. Log In
User can log in with the credentials specifeied during signup.
#### 3. Profile Page
Each user has access to their profile page which can be used to update personal information. Profile page can be accessed by clicking on the MyProfile button the top right corner which becomes visible once the user is logged in.
#### 4. Create Recipe
User can create a recipe by clicking on Add recipe option form the profile page. Clicking on the option takes you to a form in which can be filled out to add a recipe.
#### 5. Log out
User can log out using the log out button visible if the user is logged in.
#### 6. Home page
The home page contains a list of all the recipes in the database displayed in the form of pintrest like cards.
#### 7.Recipe Page
Clicking on the recipe title on the recipe card will take you to a recipe page. Recipe detail page displays all the relevent data on screen.
#### 8.User page
User page can be accessed by clicking on the user's name on the recipe card on the homepage. A user's profile page will display basic user information and all the recipes added by the user.

>Note: All forms can handle picture uploads. User can upload their profile pic or recipe's pic.

Group project for CS 546 at Stevens Institute of Technology
Group Members: Yunan Dai, Rahul Durrani, Yongxin Feng, Hangyu Li, Ana Parra Vera

This is a application in node js that enables user to post and share cocktail recipes.
