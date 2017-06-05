import React from 'react';

class RecipeBox extends React.Component{
	
	constructor(props){
		super(props);		

		if(!localStorage._recipes)
			localStorage._recipes = JSON.stringify([]);

		this.state = { 
			addNew: false, 
			recipes: JSON.parse(localStorage._recipes),
			recipesToDisplay: JSON.parse(localStorage._recipes)
		};			

		this.syncData = this.syncData.bind(this);
		this._NewRecipe = this._NewRecipe.bind(this);
		this._RemoveRecipe = this._RemoveRecipe.bind(this);
		this._EditRecipe = this._EditRecipe.bind(this);
		this._updateState = this._updateState.bind(this);
		this._toggleNew = this._toggleNew.bind(this);
		this._searchForRecipe = this._searchForRecipe.bind(this)
	}	

	
	syncData(){
		localStorage._recipes = JSON.stringify(this.state.recipes);
	}

	_updateState(recipes){
		this.setState({ recipes: recipes, recipesToDisplay: recipes }, ()=> {
			this.syncData(recipes);			
		});							
	}

	_NewRecipe(title, ingredients){		
		const newRecipe = { id:Date.now(), title: title, ingredients: ingredients.split(',').map(e => e.trim())};
		let recipes = this.state.recipes;
		recipes.unshift(newRecipe);
		this._updateState(recipes);
		this.setState({ addNew: !this.state.addNew });
	}

	_RemoveRecipe(id){				
		const recipes = this.state.recipes.filter(recipe => recipe.id !== id);		
		this._updateState(recipes);		
	}

	_EditRecipe(updatedRecipe){		
		const recipes = this.state.recipes.map(recipe => recipe.id === updatedRecipe.id? updatedRecipe: recipe);		
		this._updateState(recipes);
	}

	_toggleNew(){
		this.setState({ addNew: !this.state.addNew });
	}

	_searchForRecipe(e){
		const value = e.target.value.toLocaleLowerCase();		
		const recipes = this.state.recipes;
		const filteredRecipes = recipes.filter(recipe => recipe.title.toLocaleLowerCase().indexOf(value) !== -1);					
		this.setState({ recipesToDisplay: filteredRecipes });
	}

	render(){			

		return(
			<div className='recipe-box-wrapper'>	
				<h2>Recipe Box</h2>
				<hr /><br /><br />				
				<input onChange={this._searchForRecipe} type='text' className='new-recipe-input' placeholder='Search for recipe' />
				<br /><br />

				{ 
					this.state.addNew? 
					<MakeRecipe newRecipe={this._NewRecipe} cancle={this._toggleNew} />
					:<button onClick={this._toggleNew} className='new-recipe-button'>Make new recipe</button>
				}						
				

				<Recipes recipes={this.state.recipesToDisplay} 					
					editRecipe={this._EditRecipe} 
					removeRecipe={this._RemoveRecipe}  />
			</div>
		);
	}
};

class MakeRecipe extends React.Component{

	_cancle(e){
		e.preventDefault();
		this.props.cancle();
	}
	render(){				
		return(
			<div className='new-recipe'>	
				<h3>New recipe</h3>			
				<form onSubmit={(e)=>{
					e.preventDefault();
					const title = this.refs.title.value;
					const ingredients = this.refs.ingredients.value;
					if(title && ingredients){
						this.props.newRecipe(title, ingredients);
						this.refs.title.value = '';
						this.refs.ingredients.value = '';
					}
				}}>
					<input type='text' 
						className='new-recipe-input' 
						placeholder='Recipe name' 
						ref='title'  />						
					<input type='text' 
						className='new-recipe-input' 
						placeholder='Ingredients, separate them by comma' 
						ref='ingredients' />					
					<button type='submit' className='new-recipe-button'>Submit</button>
					<button onClick={this._cancle.bind(this)} className='new-recipe-button red-button'>Cancle</button>
				</form>
				<hr /><br />
			</div>
		);
	}
	

}

class Recipes extends React.Component{	
	render(){
		const recipes = this.props.recipes;		
		return(
			<div className='all-recipes'>
				{ recipes.map((recipe, index)=>(
					<Recipe 
					recipe={recipe} 
					editRecipe={this.props.editRecipe} 
					removeRecipe={this.props.removeRecipe} 
					key={recipe.id} />
					))
				}
			</div>
		);
	}
};


class Recipe extends React.Component{
	constructor(props){
		super(props);				
		this.state = { action: 'read', expanded: false, recipe: this.props.recipe };

		this._updateState = this._updateState.bind(this);
		this._removeRecipe = this._removeRecipe.bind(this);
		this._handleUpdateSubmit = this._handleUpdateSubmit.bind(this);
		this._handleTitleChange = this._handleTitleChange.bind(this);
		this._handleIngredientsChange = this._handleIngredientsChange.bind(this);
		this._expand = this._expand.bind(this);		
	}


	_updateState(e){
		e.stopPropagation();
		this.setState({ action: 'update' });
	}

	_removeRecipe(e){
		e.stopPropagation();					
	    const r = confirm(`Delete ${this.state.recipe.title}?`);
	    if(r)
	        this.props.removeRecipe(this.state.recipe.id);	
	}

	_handleUpdateSubmit(e){		
		e.preventDefault();	
		if(this.state.recipe.title && this.state.recipe.ingredients)					
		{
			this.props.editRecipe(this.state.recipe);
			this.setState({ action: 'read' });	
		}		
	}

	_handleTitleChange(e){
		let recipe = this.state.recipe;		
		const newTitle = e.target.value;
		recipe.title = newTitle;
		this.setState({ recipe: recipe });
	}

	_handleIngredientsChange(e){
		let recipe = this.state.recipe;		
		const newIngredients = e.target.value.split(',').map(e => e.trim());
		recipe.ingredients = newIngredients;
		this.setState({ recipe: recipe });
	}

	_expand(){		
		this.setState({ expanded: !this.state.expanded });
	}


	render(){	
		const recipe = this.state.recipe;		
		const action = this.state.action;
		if(action === 'read')
			return(
				<div className='recipe' onClick={this._expand}>																										
					<h3 className='recipe-title'>{recipe.title}</h3>	
					<div className={ !this.state.expanded? 'recipe-ingredient-hidden': 'recipe-ingredient' } >
						<ul>{recipe.ingredients.map((ingredient,i)=><li key={i}>{ingredient}</li>)}</ul>
						<button className='edit-recipe' onClick={ this._updateState } >Edit</button>
						<button className='remove-recipe' onClick={this._removeRecipe}>X</button>
						
					</div>	
				</div>
			);

		else if(action === 'update')
			return(
				<div className='recipe'>
					<h3>Edit {recipe.title}</h3>		
					<form onSubmit={this._handleUpdateSubmit}>
						<input type='text' 
							placeholder='Recipe name'
							className='edit-recipe-input'
							value={recipe.title} 	
							onChange={this._handleTitleChange}	/>					

						<input type='text' 
							placeholder='Ingredients, separate them by comma' 
							className='edit-recipe-input'
							value={recipe.ingredients.join(',')}
							onChange={this._handleIngredientsChange} />					
						<br />					
						<button type='submit' className='submit-recipe-change'>Submit</button>											
					</form>
				</div>
			);
	}
};

export default RecipeBox;


//css

/*recipe box*/
// .recipe-box-wrapper{
// 	width: 60%;
// 	display: table;
// 	margin: 50px auto;
// }
// .new-recipe-button{
// 	display: inline-block;
// 	background-color: #00cc00;
// 	width: 150px;	
// 	margin: 0 0 5px 10px;
// }
// .red-button{
// 	background-color: #f00 !important;
// }
// .new-recipe{
// 	display: block;
// }
// .new-recipe-input{
// 	width: 100%;
// 	padding: 7px;
// 	border: 1px solid #ccc;
// 	border-radius: 5px;	
// 	margin-bottom: 12px;
// }
// .edit-recipe-input{
// 	width: 95%;
// 	padding: 7px;
// 	border: 1px solid #ccc;
// 	border-radius: 5px;	
// 	margin-bottom: 12px;
// }

// .all-recipes{
// 	margin-top: 15px;	
// }
// .recipe{
// 	margin-bottom: 10px;
// 	padding: 10px;
// 	border: 1px solid #ccc;
// 	border-radius: 5px;
// 	cursor: pointer;	
// }
// .recipe:hover{
// 	border-color: #666;
// }
// .recipe-title{
// 	display: inline-block;	
// }
// .recipe-ingredient-hidden{
// 	display: none;
// }
// .expand-ingredients{
// 	display: inline-block;	
// 	float: right;
// 	background-color: #ffff99;
// 	color: #404040;
// 	width: 28px;
// 	border: 1px solid #eee;
// 	margin-left: 10px;
// }
// .expand-ingredients:hover{			
// 	border-color: black;
// }
// .remove-recipe{
// 	margin-left: 5px;
// 	background-color: #CE0505;
// 	width: 27px;
// }
// .remove-recipe:hover{
// 	border: 1px solid #eee;
// 	background-color: #F20D0D;
// }
// .edit-recipe{
// 	background-color: #10D4F2;	
// }
// .edit-recipe:hover{
// 	border: 1px solid #eee;
// 	background-color: #41E7FF;
// }
// .submit-recipe-change{
// 	background-color: #16DB44;
// }
// .submit-recipe-change:hover{
// 	border: 1px solid #eee;
// 	background-color: #17F24A;
// }
