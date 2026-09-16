/*
 * GastroSense AI - EU 14 Major Food Allergens Detection Engine
 *
 * Implements European Regulation (EU) No 1169/2011 allergen tracking to
 * guarantee diner safety in avant-garde gastronomy.
 */

export const EU_ALLERGENS = [
	'gluten',
	'crustaceans',
	'eggs',
	'fish',
	'peanuts',
	'soybeans',
	'milk',
	'nuts',
	'celery',
	'mustard',
	'sesame',
	'sulphites',
	'lupin',
	'molluscs'
];

/*
 * Database mapping ingredients to their biological allergen flags.
 */
const INGREDIENT_ALLERGEN_MAP = {
	parmesan: ['milk'],
	white_chocolate: ['milk'],
	caviar: ['fish'],
	wagyu: [],
	black_truffle: [],
	kombu: [],
	coffee: [],
	garlic: [],
	raspberry: [],
	passion_fruit: [],
	dark_chocolate: [],
	yuzu: []
};

/*
 * Detects all declared allergens present in a set of ingredient IDs.
 */
export function detectAllergens(ingredientIds) {
	if (!ingredientIds || !Array.isArray(ingredientIds)) return [];

	const detected = new Set();
	for (const id of ingredientIds) {
		const allergens = INGREDIENT_ALLERGEN_MAP[id] || [];
		for (const allergen of allergens) {
			if (EU_ALLERGENS.includes(allergen)) {
				detected.add(allergen);
			}
		}
	}
	return Array.from(detected).sort();
}

/*
 * Validates whether a recipe is completely free of specified diner allergens.
 */
export function isSafeForDiner(recipeIngredientIds, dinerExclusions) {
	if (!dinerExclusions || dinerExclusions.length === 0) return true;
	const recipeAllergens = detectAllergens(recipeIngredientIds);
	return !dinerExclusions.some(exclusion =>
		recipeAllergens.includes(exclusion.toLowerCase()));
}
