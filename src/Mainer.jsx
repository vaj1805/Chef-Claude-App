import { useState } from "react"
import { getRecipeFromMistral } from "./ai";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";

export default function Mainer() {

    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("")

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function addIngredient(formData) {

        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }



    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input type="text"
                    placeholder="E.g : wheat flour"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>

            </form>

            {ingredients.length > 0 && <IngredientsList ingredients={ingredients}
                getRecipe={getRecipe}
            />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>

    )
}





