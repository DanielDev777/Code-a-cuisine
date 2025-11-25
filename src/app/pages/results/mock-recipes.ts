import { Recipe } from '../../interfaces/recipe';

export const MOCK_RECIPES: Recipe[] = [
	{
		recipeName: 'Classic Tomato Pasta',
		description: 'A simple, comforting Italian pasta with a bright tomato sauce and melted cheese.',
		prepTime: '10 minutes',
		cookTime: '15-20 minutes',
		totalTime: '25-30 minutes',
		servings: 2,
		timePreference: '25-40 minutes',
		cuisine: 'italian',
		diet: 'vegetarian',
		numberOfCooks: 1,
		requiredIngredients: [
			{ amount: '250 g', name: 'Pasta (dry)', preparation: 'Uncooked' },
			{ amount: '200 g', name: 'Tomato', preparation: 'Diced' },
			{ amount: '60 g', name: 'Cheese', preparation: 'Grated' },
			{ amount: '2', name: 'Garlic', preparation: 'Minced' }
		],
		optionalIngredients: [
			{ amount: '200 ml', name: 'Pesto', purpose: 'Finish with a fresh herb swirl' },
			{ amount: '1 piece', name: 'Paprika', purpose: 'Color and a touch of sweetness' }
		],
		instructions: [
			{ step: 1, action: 'Fill a large pot with salted water and bring to a vigorous boil. Add the pasta and cook until al dente according to the package directions, then drain, reserving a little pasta water for sauce adjustment.', assignedTo: 'Chef 1', duration: '12 minutes', tip: 'Reserve a splash of pasta water to loosen the sauce if needed.' },
			{ step: 2, action: 'In a skillet, dry-sauté the minced garlic over medium heat until fragrant, then add the diced tomato. Simmer for 8–10 minutes until the tomato breaks down and the sauce slightly thickens.', assignedTo: 'Chef 1', duration: '10 minutes', tip: 'If the sauce looks too thick, loosen with a bit of the reserved pasta water.' },
			{ step: 3, action: 'Toss the drained pasta with the tomato sauce. Stir in the grated cheese until it begins to melt coating the pasta. If using, swirl in a small amount of pesto and, optionally, add a pinch of paprika for color.', assignedTo: 'Chef 1', duration: '3-4 minutes', tip: 'Tug the pasta with a tongs to coat evenly and melt cheese smoothly.' }
		],
		nutritionalInfo: {
			perServing: {
				energy: '520 kcal',
				fat: '12 g',
				saturatedFat: '5 g',
				carbohydrates: '85 g',
				sugar: '8 g',
				protein: '22 g',
				fiber: '4 g',
				sodium: '420 mg'
			}
		},
		tips: [
			'Reserve some pasta water to adjust the sauce consistency if needed.',
			'Grate cheese finely to help it melt evenly and cling to the pasta.',
			'For extra brightness, finish with a tiny swirl of pesto in the plate.'
		],
		storage: 'Store leftovers in an airtight container in the refrigerator for up to 2 days. Reheat gently with a splash of water to loosen the sauce.'
	},
	{
		recipeName: 'Pesto Garlic Pasta with Tomato',
		description: 'Vibrant pasta tossed with basil pesto, garlic, and fresh tomato for lively Italian flavor.',
		prepTime: '12 minutes',
		cookTime: '18 minutes',
		totalTime: '30 minutes',
		servings: 2,
		timePreference: '25-40 minutes',
		cuisine: 'italian',
		diet: 'vegetarian',
		numberOfCooks: 1,
		requiredIngredients: [
			{ amount: '250 g', name: 'Pasta (dry)', preparation: 'Uncooked' },
			{ amount: '200 ml', name: 'Pesto', preparation: 'Store-bought or homemade' },
			{ amount: '200 g', name: 'Tomato', preparation: 'Diced' },
			{ amount: '2 cloves', name: 'Garlic', preparation: 'Minced' },
			{ amount: '60 g', name: 'Cheese', preparation: 'Grated' }
		],
		optionalIngredients: [
			{ amount: '1 piece', name: 'Paprika', purpose: 'Color and gentle sweetness' }
		],
		instructions: [
			{ step: 1, action: 'Bring a pot of salted water to a boil and cook the pasta until al dente. Drain, saving a small amount of the pasta water.', assignedTo: 'Chef 1', duration: '14 minutes', tip: 'Keep the pot of pasta water handy to adjust the sauce consistency if needed.' },
			{ step: 2, action: 'In a skillet, gently sauté minced garlic just until fragrant, about 2–3 minutes, to avoid browning.', assignedTo: 'Chef 1', duration: '3 minutes', tip: 'Do not brown the garlic; you want a sweet, mellow aroma.' },
			{ step: 3, action: 'Stir in pesto and add the diced tomato; let the tomato soften in the warm sauce for about 3–4 minutes.', assignedTo: 'Chef 1', duration: '4 minutes', tip: 'If sauce looks thick, loosen with a splash of pasta water.' },
			{ step: 4, action: 'Toss the drained pasta with the sauce, then sprinkle grated cheese over the top. Stir to coat evenly and melt cheese.', assignedTo: 'Chef 1', duration: '6 minutes', tip: 'Taste and adjust with a pinch of salt if needed.' }
		],
		nutritionalInfo: {
			perServing: {
				energy: '590 kcal',
				fat: '22 g',
				saturatedFat: '9 g',
				carbohydrates: '78 g',
				sugar: '7 g',
				protein: '22 g',
				fiber: '5 g',
				sodium: '420 mg'
			}
		},
		tips: [
			'Pesto adds a strong basil flavor; balance with diced tomato.',
			'Reserve pasta water to adjust creaminess if desired.',
			'Use grated cheese for better melt.'
		],
		storage: 'Leftovers keep in the fridge for up to 2 days. Reheat gently with a splash of water to refresh the sauce.'
	},
	{
		recipeName: 'Roasted Potatoes with Garlic and Tomato',
		description: 'Crispy garlic potatoes with bell pepper and tomato, finished with a cheesy topping for a comforting Italian-inspired side.',
		prepTime: '7 minutes',
		cookTime: '22-25 minutes',
		totalTime: '32-34 minutes',
		servings: 2,
		timePreference: '25-40 minutes',
		cuisine: 'italian',
		diet: 'vegetarian',
		numberOfCooks: 1,
		requiredIngredients: [
			{ amount: '350 g', name: 'Potatoes', preparation: 'Cubed, washed' },
			{ amount: '200 g', name: 'Tomato', preparation: 'Sliced' },
			{ amount: '1 piece', name: 'Paprika', preparation: 'Diced' },
			{ amount: '3 cloves', name: 'Garlic', preparation: 'Minced' },
			{ amount: '250 g', name: 'Cheese', preparation: 'Grated' }
		],
		optionalIngredients: [
			{ amount: '200 ml', name: 'Pesto', purpose: 'Finish with a herby drizzle' }
		],
		instructions: [
			{ step: 1, action: 'Wash, peel (optional), and cube the potatoes. Parboil in salted water for about 5 minutes to speed roasting.', assignedTo: 'Chef 1', duration: '7 minutes', tip: 'Parboiling helps achieve a crispy exterior more quickly.' },
			{ step: 2, action: 'Drain potatoes and toss with minced garlic, diced paprika, and a pinch of salt. Spread on a sheet pan in a single layer.', assignedTo: 'Chef 1', duration: '5 minutes', tip: 'Give them space on the pan so they roast evenly and become crisp.' },
			{ step: 3, action: 'Roast in a preheated oven at 200°C (400°F) for about 22 minutes, until potatoes are tender and edges are golden. Halfway through, add the tomato slices to the pan.', assignedTo: 'Chef 1', duration: '22 minutes', tip: 'Shake the pan halfway to promote even browning.' },
			{ step: 4, action: 'Sprinkle grated cheese over the potatoes in the last 2–3 minutes of roasting, or broil briefly to melt.', assignedTo: 'Chef 1', duration: '3 minutes', tip: 'Keep an eye on cheese to prevent burning; it should melt and lightly brown.' }
		],
		nutritionalInfo: {
			perServing: {
				energy: '470 kcal',
				fat: '18 g',
				saturatedFat: '8 g',
				carbohydrates: '60 g',
				sugar: '6 g',
				protein: '22 g',
				fiber: '5 g',
				sodium: '420 mg'
			}
		},
		tips: [
			'Roasted tomatoes add a juicy contrast to the crisp potatoes.',
			'A small drizzle of pesto after plating can elevate aroma.',
			'Salting potatoes before roasting helps draw out moisture and crispiness.'
		],
		storage: 'Leftovers keep in the fridge for up to 2 days. Reheat gently in the oven or on a pan.'
	}
];
