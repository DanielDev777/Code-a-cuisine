import { Recipe } from '../../interfaces/recipe';

export const MOCK_RECIPES: Recipe[] = [
	{
		recipeName: 'Creamy Pesto Potato Pasta with Tomato',
		description: 'A comforting Italian vegetarian dish where al dente pasta is coated in a creamy pesto sauce and tossed with roasted potatoes and fresh tomato.',
		prepTime: '10 minutes',
		cookTime: '35 minutes',
		totalTime: '45 minutes',
		servings: 4,
		timePreference: '25-40 minutes',
		cuisine: 'italian',
		diet: 'vegetarian',
		numberOfCooks: 2,
		requiredIngredients: [
			{ amount: '400g', name: 'pasta' },
			{ amount: '600g', name: 'potato' },
			{ amount: '400g', name: 'tomato' },
			{ amount: '200ml', name: 'pesto' },
			{ amount: '200g', name: 'cheese' },
			{ amount: '1 piece', name: 'paprika pepper' }
		],
		optionalIngredients: [
			{ amount: 'to taste', name: 'fresh basil leaves', purpose: 'adds fresh herbal aroma and garnish' },
			{ amount: 'to taste', name: 'crushed red pepper flakes', purpose: 'adds a spicy kick' }
		],
		instructions: [
			{ step: 1, action: 'Preheat the oven to 200°C. Rinse and dice the potatoes into about 2 cm chunks and place them on a baking tray with the paprika pepper cut into thin strips. Set aside for roasting.', assignedTo: 'Chef 1', duration: '5 minutes', tip: 'Make sure potato chunks are evenly sized for uniform cooking' },
			{ step: 2, action: 'Bring a large pot of salted water to a boil for the pasta. Once boiling, add the pasta and cook for 8-9 minutes until just al dente. Reserve about 120 ml of pasta cooking water, then drain.', assignedTo: 'Chef 2', duration: '10 minutes', tip: 'The starchy pasta water will help create a creamy sauce' },
			{ step: 3, action: 'While the pasta cooks, chop the tomato into small chunks. In a small bowl, whisk the pesto with half of the cheese and a splash of the reserved pasta water to loosen into a creamy coating.', assignedTo: 'Chef 2', duration: '3 minutes', tip: 'Add pasta water gradually until you reach desired consistency' },
			{ step: 4, action: 'Roast the potatoes in the oven for 25-30 minutes, turning once halfway, until golden and tender. Keep an eye on them so they don\'t burn.', assignedTo: 'Chef 1', duration: '28 minutes', tip: 'Turning halfway ensures even browning on all sides' },
			{ step: 5, action: 'In a large skillet over medium heat, swirl in the pesto-cheese mixture just until glossy. Add the chopped tomato and cook for 1-2 minutes to soften slightly.', assignedTo: 'Chef 2', duration: '3 minutes', tip: 'Don\'t overcook the tomatoes, they should still have some structure' },
			{ step: 6, action: 'Toss the drained pasta into the skillet with the pesto mixture, adding extra pasta water as needed to achieve a light saucing. Fold in the roasted potatoes, and season with salt and pepper to taste.', assignedTo: 'Chef 2', duration: '3 minutes', tip: 'Toss gently to avoid breaking the roasted potatoes' },
			{ step: 7, action: 'Remove from heat, sprinkle the remaining cheese over the top, and garnish with fresh basil or chili flakes if using. Serve warm.', assignedTo: 'Chef 2', duration: '2 minutes', tip: 'Serve immediately for best texture and temperature' }
		],
		nutritionalInfo: { 
			perServing: { 
				energy: '600 kcal', 
				protein: '25 g', 
				fat: '20 g', 
				saturatedFat: '8 g', 
				carbohydrates: '88 g', 
				sugar: '6 g', 
				fiber: '8 g', 
				sodium: '420 mg' 
			} 
		},
		tips: [
			'For extra creaminess, add a splash of cream or milk to the pesto mixture',
			'You can substitute any short pasta shape like penne or fusilli'
		],
		storage: 'Store leftovers in an airtight container in the fridge for up to 2 days.'
	},
	{
		recipeName: 'Corn, Tomato and Pesto Pasta Bake',
		description: 'A comforting baked pasta dish with vibrant tomatoes, sweet corn, and a generous pesto cheese coating for a rich Italian flavor.',
		prepTime: '15 minutes',
		cookTime: '35 minutes',
		totalTime: '50 minutes',
		servings: 4,
		timePreference: '25-40 minutes',
		cuisine: 'italian',
		diet: 'vegetarian',
		numberOfCooks: 2,
		requiredIngredients: [
			{ amount: '400g', name: 'pasta' },
			{ amount: '400g', name: 'tomato' },
			{ amount: '500g', name: 'corn' },
			{ amount: '300ml', name: 'pesto' },
			{ amount: '300g', name: 'cheese' },
			{ amount: '0.5 piece', name: 'paprika pepper' }
		],
		optionalIngredients: [
			{ amount: 'to taste', name: 'fresh basil leaves', purpose: 'adds fresh herbal aroma and garnish' },
			{ amount: 'to taste', name: 'crushed red pepper flakes', purpose: 'adds heat and spice' }
		],
		instructions: [
			{ step: 1, action: 'Preheat oven to 180°C. Bring a large pot of salted water to a boil and cook the pasta for 6-7 minutes to parboil; drain and set aside.', assignedTo: 'Chef 1', duration: '10 minutes', tip: 'Parboiling means slightly undercooking, as pasta will finish in the oven' },
			{ step: 2, action: 'Chop the tomato into bite-sized pieces. In a bowl, mix the pesto with a splash of pasta water to thin it slightly for coating.', assignedTo: 'Chef 2', duration: '3 minutes', tip: 'Save some pasta water before draining for easier mixing' },
			{ step: 3, action: 'In a large mixing bowl, combine the parboiled pasta with the pesto, chopped tomato, and corn kernels until evenly coated.', assignedTo: 'Chef 2', duration: '3 minutes', tip: 'Mix thoroughly to ensure every piece is coated with pesto' },
			{ step: 4, action: 'Transfer the pasta mixture to a baking dish. Top with the remaining cheese and a light sprinkle of paprika pepper for color.', assignedTo: 'Chef 1', duration: '2 minutes', tip: 'Spread evenly in the dish for uniform baking' },
			{ step: 5, action: 'Bake in the oven for 15-20 minutes until the cheese is melted and the edges are bubbly and slightly browned.', assignedTo: 'Chef 1', duration: '18 minutes', tip: 'Watch the edges to prevent burning' },
			{ step: 6, action: 'Remove from oven and let rest for 2-3 minutes before serving. Garnish with fresh basil if available.', assignedTo: 'Chef 1', duration: '3 minutes', tip: 'Resting allows the dish to set and makes serving easier' }
		],
		nutritionalInfo: { 
			perServing: { 
				energy: '520 kcal', 
				protein: '20 g', 
				fat: '16 g', 
				saturatedFat: '6 g', 
				carbohydrates: '78 g', 
				sugar: '8 g', 
				fiber: '6 g', 
				sodium: '380 mg' 
			} 
		},
		tips: [
			'Add breadcrumbs on top before baking for extra crunch',
			'This dish can be made ahead and reheated'
		],
		storage: 'Store leftovers in an airtight container in the fridge for up to 2 days.'
	},
	{
		recipeName: 'Paprika Pepper Boats with Potato-Corn Filling and Pesto Pasta',
		description: 'Two stuffed paprika boats loaded with a creamy potato, corn, tomato filling, finished with cheese and served alongside a simple pesto coated pasta.',
		prepTime: '15 minutes',
		cookTime: '40 minutes',
		totalTime: '55 minutes',
		servings: 4,
		timePreference: '25-40 minutes',
		cuisine: 'italian',
		diet: 'vegetarian',
		numberOfCooks: 2,
		requiredIngredients: [
			{ amount: '2 pieces', name: 'paprika pepper' },
			{ amount: '600g', name: 'potato' },
			{ amount: '300g', name: 'corn' },
			{ amount: '400g', name: 'tomato' },
			{ amount: '200g', name: 'cheese' },
			{ amount: '100ml', name: 'pesto' },
			{ amount: '200g', name: 'pasta' }
		],
		optionalIngredients: [
			{ amount: 'to taste', name: 'fresh herbs', purpose: 'adds freshness and visual appeal' }
		],
		instructions: [
			{ step: 1, action: 'Preheat the oven to 190°C. Halve the paprika peppers lengthwise and remove seeds. Place the halves on a baking sheet cut sides up.', assignedTo: 'Chef 1', duration: '5 minutes', tip: 'Removing all seeds prevents bitterness' },
			{ step: 2, action: 'Peel and dice the potatoes; boil in salted water for 8-9 minutes until just tender. Drain and lightly mash, then stir in the corn and finely chopped tomato to create a chunky filling.', assignedTo: 'Chef 1', duration: '12 minutes', tip: 'Don\'t over-mash the potatoes, keep some texture' },
			{ step: 3, action: 'Stir half of the cheese into the potato mixture to help bind. Stuff the paprika halves with the filling, then top with the remaining cheese and a light drizzle of pesto on each boat.', assignedTo: 'Chef 1', duration: '5 minutes', tip: 'Pack the filling firmly but not too tightly' },
			{ step: 4, action: 'Bake the stuffed peppers in the oven for 18-22 minutes until the paprika is tender and the cheese is bubbling and golden. While peppers bake, boil the pasta in salted water for 6-7 minutes and then drain.', assignedTo: 'Chef 2', duration: '20 minutes', tip: 'Check pepper tenderness with a fork' },
			{ step: 5, action: 'Toss the drained pasta with the remaining pesto to lightly coat; season with salt and pepper to taste. Plate the paprika boats alongside the pesto-coated pasta.', assignedTo: 'Chef 2', duration: '3 minutes', tip: 'Reserve a bit of pasta water to help pesto coat better' },
			{ step: 6, action: 'Garnish with optional fresh herbs and serve immediately.', assignedTo: 'Chef 2', duration: '1 minute', tip: 'Serve hot for best flavor and texture' }
		],
		nutritionalInfo: { 
			perServing: { 
				energy: '550 kcal', 
				protein: '20 g', 
				fat: '18 g', 
				saturatedFat: '7 g', 
				carbohydrates: '82 g', 
				sugar: '10 g', 
				fiber: '9 g', 
				sodium: '400 mg' 
			} 
		},
		tips: [
			'You can prepare the filling ahead of time and stuff the peppers just before baking',
			'Try adding different vegetables to the filling for variety'
		],
		storage: 'Store leftovers in an airtight container in the fridge for up to 2 days.'
	}
];
