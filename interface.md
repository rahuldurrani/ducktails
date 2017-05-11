
# Ducktails Frontend Documentation
## Data Needed from Backend
### *All Pages*
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

### Login/Signup
path:
> login_signup/login_signup.handlebars
```
    {}
```

### Recipe detail
path:
> recipe/recipe_detail.handlebars
```
{
    self: Bool,
    category: String,
    favorited: Bool,
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

### Recipe Creation
path:
> /recipe/create_recipe.handlebars

```
{
    categories: [
        {
            categoryId: String,
            name: String
        }
    ]
}
```

### Edit recipes
path:
> /recipe/edit_recipe.handlebars

```
{
    title: String,
    cookTime: String,
    serving: String,
    description: String,
    ingredients: String,
    steps: String,
    categories: [
        {
            categoryId: String,
            name: String
        }
    ]
}
```

### User Profile
path:
> user/user_profile.handlebars
```
{
    self: Bool,
	following: Bool (indicate if the login user is following this user who he/she is visiting),
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
    self: Bool,
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

### User Profile Edit
path:
> user/edit_profile.handlebars

```HTML
{
    self: Bool,
    following: Bool (indicate if the login user is following this user who he/she is visiting),
    profilePicPath: String,
    userId: String,
    firstName: String,
    lastName: String,
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
    ]
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

### Jump to login Pages
```HTML
<... onClick="window.location="/login" />
```

### Login
```HTML
<form action="/login" method="post">
<input id="email" type="text" name="email">
<input id="password" type="pasword" name="password">
<input type="button" value="Login">
```

### Register
```HTML
<form action="/register" method="post">
<input id="email" type="text" name="email">
<input id="password" type="password" name="password">
<input type="submit" value="Create account" name="commit">
```

### Follow
``` HTML
<button formmethod="post" type="submit" formaction="/user/follow/:{{userId}}">
```

### Favorite / Unfavorite
``` HTML
<a type="submit" formmethod="put" formaction="/user/unfavorite/:{{id}}">Unfavorite</a>
<a type="submit" formmethod="put" formaction="/user/favorite/:{{id}}">Favorite</a>
```

### Recipe Creation
``` HTML
<input type="text" Name="Title" required="" id="title">
<input type="text" Name="Cook Time" required="" id="cookTime">
<input type="text" Name="Serving" required="" id="serving">
<textarea type="text" Name="Description" id="description"></textarea>
<textarea type="text" Name="Ingredients" id="ingredients"></textarea>
<textarea type="text" Name="Cooking Steps" id="steps"></textarea>
<select id="category"> </select>
<input type="submit" value="POST" formmethod="post" formaction="/recipe/:{{userId}}/create_recipe" />
```

### Jump to Edit Recipe Pages
``` HTML
<a id="editButton" class="btn" href="/recipe/edit_recipe/:{{id}}">Edit This Recipe</a>
```

### Edit Recipe
``` HTML
<input type="text" Name="Title" required="" id="title">
<input type="text" Name="Cook Time" required="" id="cookTime">
<input type="text" Name="Serving" required="" id="serving">
<textarea type="text" Name="Description" id="description"></textarea>
<textarea type="text" Name="Ingredients" id="ingredients"></textarea>
<textarea type="text" Name="Cooking Steps" id="steps"></textarea>
<select id="category"> </select>
<input type="submit" value="POST" formmethod="post" formaction="/recipe/:{{userId}}/create_recipe" />
<input type="button" value="DELETE" formmethod="delete" formaction="/recipe/:{{id}}" />
```

### User Profile Edit
``` HTML
<input type="file" id="profilePic"/>
<input type="text" Name="First Name:" required="">
<input type="text" Name="Last Name" required="">
<input type="text" Name="Username" required="">
<input type="email" Name="Email" required="">
<input type="text" Name="PersonalSummary" >
<input type="submit" value="SAVE" formmethod="post" formaction="/user/:{{userId}}/save_profile_edit" />

```


Group project for CS 546 at Stevens Institute of Technology
Group Members: Yuan Dai, Rahul Durrani, Yongxin Feng, Hangyu Li, Ana Parra Vera

This is a application in node js that enables user to post and share cocktail recipes.
