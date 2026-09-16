import test from 'node:test';
import assert from 'node:assert';
import {
	detectAllergens,
	isSafeForDiner
} from '../src/js/core/allergenDetector.js';

test('Allergen Detector: detects dairy/milk in cheese and white choc', () => {
	const allergens = detectAllergens(['parmesan', 'white_chocolate']);
	assert.ok(allergens.includes('milk'), 'Cheese and chocolate have milk');
	assert.strictEqual(allergens.length, 1, 'Should deduplicate allergens');
});

test('Allergen Detector: detects fish in caviar', () => {
	const allergens = detectAllergens(['caviar', 'black_truffle']);
	assert.ok(allergens.includes('fish'), 'Caviar must be flagged as fish');
	assert.ok(!allergens.includes('gluten'), 'No gluten in caviar or truffle');
});

test('Allergen Detector: validates diner safety accurately', () => {
	const dishIngredients = ['caviar', 'wagyu'];
	const safeForLactose = isSafeForDiner(dishIngredients, ['milk']);
	assert.strictEqual(safeForLactose, true);

	const safeForFishAllergy = isSafeForDiner(dishIngredients, ['fish']);
	assert.strictEqual(safeForFishAllergy, false);
});
