import test from 'node:test';
import assert from 'node:assert';
import {
	calculateCosineAffinity,
	getSharedVolatiles,
	findTopPairings,
	INGREDIENT_DATABASE
} from '../src/js/core/flavorMatrix.js';

test('Flavor Matrix: calculates cosine similarity between 0 and 1', () => {
	const truffle = INGREDIENT_DATABASE.find(i => i.id === 'black_truffle');
	const caviar = INGREDIENT_DATABASE.find(i => i.id === 'caviar');

	const score = calculateCosineAffinity(truffle, caviar);
	assert.ok(score >= 0 && score <= 1, 'Affinity must be between 0 and 1');
	assert.ok(score > 0.4, 'Truffle and caviar have aroma overlap');
});

test('Flavor Matrix: identical ingredients have cosine similarity 1.0', () => {
	const coffee = INGREDIENT_DATABASE.find(i => i.id === 'coffee');
	const score = calculateCosineAffinity(coffee, coffee);
	assert.strictEqual(Number(score.toFixed(2)), 1.0, 'Self-affinity is 1.0');
});

test('Flavor Matrix: getSharedVolatiles identifies common classes', () => {
	const truffle = INGREDIENT_DATABASE.find(i => i.id === 'black_truffle');
	const garlic = INGREDIENT_DATABASE.find(i => i.id === 'garlic');

	const shared = getSharedVolatiles(truffle, garlic, 0.5);
	assert.ok(shared.includes('sulfur'), 'Both share sulfur volatiles');
	assert.ok(shared.includes('pyrazines'), 'Both share pyrazines');
});

test('Flavor Matrix: findTopPairings returns sorted affinity list', () => {
	const pairings = findTopPairings('caviar', 3);
	assert.strictEqual(pairings.length, 3, 'Returns limit of pairings');
	assert.ok(pairings[0].score >= pairings[1].score, 'Sorted descending');
	assert.ok(pairings[0].category, 'Provides organoleptic category');
});
