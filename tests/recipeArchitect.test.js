import test from 'node:test';
import assert from 'node:assert';
import { synthesizeDish } from '../src/js/core/recipeArchitect.js';
import { INGREDIENT_DATABASE } from '../src/js/core/flavorMatrix.js';

test('Recipe Architect: synthesizes a complete avant-garde recipe', () => {
	const truffle = INGREDIENT_DATABASE.find(i => i.id === 'black_truffle');
	const parmesan = INGREDIENT_DATABASE.find(i => i.id === 'parmesan');

	const dish = synthesizeDish([truffle, parmesan]);
	assert.ok(dish.title.length > 0, 'Must have generated title');
	assert.ok(dish.technique.name, 'Must include molecular technique');
	assert.ok(dish.affinityScore > 0, 'Must include affinity score');
	assert.ok(dish.allergens.includes('milk'), 'Must detect milk allergen');
	assert.ok(dish.sommelierPairing.length > 0, 'Must recommend wine');
});

test('Recipe Architect: throws if fewer than two ingredients', () => {
	assert.throws(() => {
		synthesizeDish([]);
	}, /At least two ingredients/);
});
