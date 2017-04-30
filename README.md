
# Ducktails Frontend Documentation
## Data Needed from Backend
### All Pages
```
if authenticated
	{
		loginUserId: String
	}
```

### Home page:
path:
> recipe_cards/recipe_card.handlebars
```
Array of recipes
	{	backgroundColor: String or RGB,
		backgroundPicPath: String (path to the picture),
		category: String,
		recipeId: String,
		title: String,
		creator: {
			id: String,
			firstName: String,
			lastName: String,
		}
		description: String,
	}
```

### Recipe detail
path:
> recipe/recipe_detail.handlebars
```
{
	creator: {
		profilePicPath: String,
		id: String,
		firstName: String,
		lastName: String,
		personalSummary: String
	}
	createdDate: String, (any format, but unified),
	recipePicPath: String (path to the picture, optional),
	title: String
	description: String,
	ingredients: [
		{
			index: Integer or String,
			name: String,
            amount: String
		}
	],
	steps: [
		{
			index: Integer or String,
			operation: String
		}
	],
	comments:[
		{
			profilePicPath: String,
			firstName: String,
			lastName: String,
			date: String (comment created date, any format, but unified),
			content: String
		}
	]
}
```

### User Profile
path:
> user/user_profile.handlebars
```
{
	following: Bool (indicate if the login user is following this user who he/she is visiting)
	profilePicPath: String,
	userId: String,
	firstName: String,
	lastName: String,
	personalSummary: String,
	followers: [
		{
			userId: String,
			backgroundColor: String or RGB
			profilePicPath: String,
			firstName: String,
			lastName: String,
			personalSummary: String
		}
	],
	followees: [
		{
			userId: String,
			backgroundColor: String or RGB
			profilePicPath: String,
			firstName: String,
			lastName: String,
			personalSummary: String
		}
	],
	recipes: [
		{
			backgroundColor: String or RGB,
			backgroundPicPath: String (path to picture)
			category: {
            	name: String,
				id: String
			},
			title: String,
			recipeId: String,
			description: String
		}
    ]
}
```

### User followers and followees
path for followers:
> /user/user_followers.handlebars

path for followees:
> /user/user_followers.handlebars
```
{
	following: Any (indicate if the login user is following this user who he/she is visiting)
	profilePicPath: String,
	userId: String,
	firstName: String,
	lastName: String,
	personalSummary: String,
	followers: [
		{
			userId: String,
			backgroundColor: String or RGB
			profilePicPath: String,
			firstName: String,
			lastName: String,
			personalSummary: String
        }
	],
	followees: [
		{
			userId: String,
			backgroundColor: String or RGB
			profilePicPath: String,
			firstName: String,
			lastName: String,
			personalSummary: String
		}
	],
}
```

### Category List
```
	Array of categories: [
		{
			recommanded: Exist or Not (exist indicate it the category is recommanded),
			categoryId: String,
			name: String,
			backgroundPicPath: String,
			description: String,
			recipes: Array of recipes (same as given in home page),
		}
	]
```

### Category detail
```
	{
		recommanded: Exist or Not (exist indicate it the category is recommanded),
		categoryId: String,
		name: String,
		backgroundPicPath: String,
		description: String,
		recipes: Array of recipes (same as given in home page),
	}

```

## Actions Sent from Frontend

### Login``` HTML
<form action="/login" method="post">
<input id="email" type="text" name="email">
<input id="password" type="pasword" name="password">
<input type="button" value="Login">
```

### Register
``` HTML
<form action="/register" method="post">
<input id="email" type="text" name="email">
<input id="password" type="password" name="password">
<input type="submit" value="Create account" name="commit">
```

### Follow
``` HTML
<button formmethod="post" type="submit" formaction="/user/follow/:{{userId}}">
```



Group project for CS 546 at Stevens Institute of Technology
Group Members: Yuan Dai, Rahul Durrani, Yongxin Feng, Hangyu Li, Ana Parra Vera

This is a application in node js that enables user to post and share cocktail recipes.
