import { Recipe } from '../../interfaces/recipe';

export const MOCK_RECIPES: Recipe[] = [
	{
		recipeName: 'Classic Tomato Pasta with Garlic and Cheese',
		description: 'A timeless Italian dish of al dente pasta tossed in a bright garlic-tomato sauce and finished with grated cheese for a comforting, traditional flavor.',
		prepTime: '10 minutes',
		cookTime: '20 minutes',
		totalTime: '30 minutes',
		servings: 4,
		timePreference: '25-40 minutes',
		cuisine: 'italian',
		diet: 'vegetarian',
		numberOfCooks: 2,
		requiredIngredients: [
			{ amount: '500 g', name: 'Pasta', preparation: 'dry' },
			{ amount: '200 g', name: 'Tomato', preparation: 'diced' },
			{ amount: '250 g', name: 'Cheese', preparation: 'grated' },
			{ amount: '3', name: 'Garlic', preparation: 'minced' }
		],
		optionalIngredients: [
			{ amount: 'to taste', name: 'Olive Oil', purpose: 'for sautéing garlic and enriching the sauce' },
			{ amount: 'to taste', name: 'Basil Leaves', purpose: 'aroma and color' },
			{ amount: 'pinch', name: 'Red Pepper Flakes', purpose: 'optional heat' }
		],
		instructions: [
			{ step: 1, headline: 'Boil the Pasta', action: 'Fill a large pot with salted water and bring to a rolling boil. Add the dried pasta and cook until al dente according to package directions. Reserve a cup of pasta water before draining.', assignedTo: 'Chef 1', duration: '9-11 minutes', tip: 'Reserve a cup of pasta water to adjust the sauce consistency if needed.' },
			{ step: 2, headline: 'Prepare the Tomato Sauce', action: 'In a skillet, heat a splash of olive oil and sauté the minced garlic until fragrant, being careful not to burn. Add the diced tomatoes and simmer briefly to create a bright, fresh sauce; season with salt and pepper.', assignedTo: 'Chef 2', duration: '5-7 minutes', tip: 'Let the sauce reduce slightly to intensify tomato flavor.' },
			{ step: 3, headline: 'Combine Pasta and Sauce', action: 'Drain the pasta and toss with the tomato sauce over low heat. Off the heat, fold in half of the grated cheese to create a creamy coating.', assignedTo: 'Chef 1', duration: '2 minutes', tip: 'If the sauce is too thick, loosen with a little reserved pasta water.' },
			{ step: 4, headline: 'Finish and Plate', action: 'Transfer to serving plates, top with the remaining cheese, and finish with fresh basil and optional chili flakes if desired.', assignedTo: 'Chef 2', duration: '2 minutes', tip: 'Season with a final pinch of salt if needed before serving.' }
		],
		nutritionalInfo: {
			perServing: {
				energy: '550 kcal',
				fat: '18 g',
				saturatedFat: '9 g',
				carbohydrates: '78 g',
				sugar: '7 g',
				protein: '20 g',
				fiber: '4 g',
				sodium: '450 mg'
			}
		},
		tips: [
			'Avoid over-cheesing; cheese should enrich, not overwhelm the tomato flavor.',
			'Fresh basil adds brightness; add at the end of cooking or as a garnish.',
			'Use the reserved pasta water to adjust the sauce consistency if needed.'
		],
		storage: 'Leftovers can be stored in an airtight container in the refrigerator for up to 2 days. Reheat gently on the stove with a splash of water or in the microwave.'
	},
	{
		recipeName: 'Herbed Roasted Potatoes with Tomato and Garlic',
		description: 'Crispy roasted potato wedges topped with juicy tomatoes and melted cheese, finished with garlic and herbs for a rustic Italian side or light main.',
		prepTime: '10 minutes',
		cookTime: '20-25 minutes',
		totalTime: '37 minutes',
		servings: 4,
		timePreference: '25-40 minutes',
		cuisine: 'italian',
		diet: 'vegetarian',
		numberOfCooks: 2,
		requiredIngredients: [
			{ amount: '1000 g', name: 'Potato', preparation: 'cut into 2 cm chunks' },
			{ amount: '200 g', name: 'Tomato', preparation: 'diced' },
			{ amount: '250 g', name: 'Cheese', preparation: 'grated' },
			{ amount: '3', name: 'Garlic', preparation: 'minced' }
		],
		optionalIngredients: [
			{ amount: 'to taste', name: 'Olive Oil', purpose: 'to toss potatoes for roasting' },
			{ amount: 'to taste', name: 'Herbs (rosemary or thyme)', purpose: 'aroma and herbaceous note' },
			{ amount: 'to taste', name: 'Salt and Pepper', purpose: 'seasoning' }
		],
		instructions: [
			{ step: 1, headline: 'Prepare Potatoes', action: 'Preheat the oven to 220C. Toss the potato chunks with minced garlic, olive oil, and a light pinch of salt until evenly coated.', assignedTo: 'Chef 1', duration: '10 minutes', tip: 'Use a wide sheet pan for even roasting; try to keep pieces similar in size.' },
			{ step: 2, headline: 'Roast Partially', action: 'Spread potatoes in a single layer on a sheet pan and roast for about 20 minutes, turning once halfway to achieve golden edges.', assignedTo: 'Chef 2', duration: '20 minutes', tip: 'Midway turning helps browning on all sides.' },
			{ step: 3, headline: 'Add Tomato and Cheese', action: 'Remove the sheet, scatter diced tomato over the potatoes, and sprinkle grated cheese on top. Return to the oven for 4–5 minutes until cheese melts and edges are crisp.', assignedTo: 'Chef 1', duration: '5 minutes', tip: 'Keep an eye on cheese to avoid burning.' },
			{ step: 4, headline: 'Finish and Serve', action: 'Take from oven, finish with fresh herbs if available, and serve hot in portions.', assignedTo: 'Chef 2', duration: '2 minutes', tip: 'Let rest for 1–2 minutes to set slightly.' }
		],
		nutritionalInfo: {
			perServing: {
				energy: '480 kcal',
				fat: '16 g',
				saturatedFat: '8 g',
				carbohydrates: '70 g',
				sugar: '6 g',
				protein: '14 g',
				fiber: '5 g',
				sodium: '600 mg'
			}
		},
		tips: [
			'Roasting potatoes with garlic creates a deep, savory flavor.',
			'If you want extra creaminess, sprinkle a little grated cheese during the final minute of roasting.',
			'Serve with a simple green salad to balance richness.'
		],
		storage: 'Store leftovers in the refrigerator for up to 2 days. Reheat in oven or microwave.'
	},
	{
		recipeName: 'Cheesy Tomato Pasta Bake',
		description: 'A satisfying baked pasta dish with a bright tomato sauce and a blanket of melted cheese, ideal for weeknight Italian comfort.',
		prepTime: '10 minutes',
		cookTime: '25-30 minutes',
		totalTime: '35-40 minutes',
		servings: 4,
		timePreference: '25-40 minutes',
		cuisine: 'italian',
		diet: 'vegetarian',
		numberOfCooks: 2,
		requiredIngredients: [
			{ amount: '500 g', name: 'Pasta', preparation: 'dry' },
			{ amount: '200 g', name: 'Tomato', preparation: 'diced' },
			{ amount: '250 g', name: 'Cheese', preparation: 'grated' },
			{ amount: '3', name: 'Garlic', preparation: 'minced' }
		],
		optionalIngredients: [
			{ amount: 'to taste', name: 'Olive Oil', purpose: 'sautéing garlic and sauce' },
			{ amount: 'to taste', name: 'Basil Leaves', purpose: 'aroma and color' },
			{ amount: 'pinch', name: 'Salt and Pepper', purpose: 'seasoning' }
		],
		instructions: [
			{ step: 1, headline: 'Cook Pasta', action: 'Bring a large pot of salted water to a boil and cook the pasta until al dente. Drain and reserve a little pasta water.', assignedTo: 'Chef 1', duration: '9-11 minutes', tip: 'Do not overcook; it will continue cooking in the bake.' },
			{ step: 2, headline: 'Make Tomato Sauce', action: 'In a pan, heat olive oil if available, sauté minced garlic until fragrant, then add diced tomato. Simmer briefly to form a bright sauce. Season with salt and pepper.', assignedTo: 'Chef 2', duration: '5-7 minutes', tip: 'If using fresh tomato, simmer until slightly reduced for depth.' },
			{ step: 3, headline: 'Combine and Bake', action: 'Mix the cooked pasta with the tomato sauce and most of the cheese. Transfer to a baking dish and top with the remaining cheese. Bake in a hot oven at 180C until cheese bubbles and browns, about 12–15 minutes.', assignedTo: 'Chef 1', duration: '12-15 minutes', tip: 'Keep an eye on the bake to avoid burning cheese.' },
			{ step: 4, headline: 'Rest and Serve', action: 'Remove from oven, let stand for a few minutes, then garnish with fresh basil if using and slice to serve.', assignedTo: 'Chef 2', duration: '2 minutes', tip: 'The pasta will firm up a bit as it rests, making slicing easier.' }
		],
		nutritionalInfo: {
			perServing: {
				energy: '590 kcal',
				fat: '22 g',
				saturatedFat: '11 g',
				carbohydrates: '80 g',
				sugar: '6 g',
				protein: '22 g',
				fiber: '4 g',
				sodium: '520 mg'
			}
		},
		tips: [
			'Bake just until cheese bubbles to keep texture pleasant.',
			'Use a mix of mozzarella and parmesan for depth (optional).',
			'Let the dish rest a moment after baking to improve slicing.'
		],
		storage: 'Leftovers can be kept in the fridge for up to 2 days; reheat in the oven to preserve texture.'
	}
];
