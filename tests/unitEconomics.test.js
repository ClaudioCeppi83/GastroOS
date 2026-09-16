import test from 'node:test';
import assert from 'node:assert';
import {
	calculatePortionCost,
	calculateFoodCostPct,
	suggestMenuPrice,
	evaluateMenuCategory
} from '../src/js/core/unitEconomics.js';

test('Unit Economics: computes portion cost with trim waste factor', () => {
	const ingredients = [
		{ name: 'Caviar', costPerPortion: 12.0 },
		{ name: 'White Chocolate', costPerPortion: 2.5 }
	];
	const cost = calculatePortionCost(ingredients, 8.0);
	assert.strictEqual(cost, 15.66);
});

test('Unit Economics: calculates food cost percentage correctly', () => {
	const cost = 15.0;
	const price = 60.0;
	const pct = calculateFoodCostPct(cost, price);
	assert.strictEqual(pct, 25.0);
});

test('Unit Economics: suggests menu price targeting 28% margin', () => {
	const cost = 14.0;
	const price = suggestMenuPrice(cost, 28.0);
	assert.strictEqual(price, 50.0);
});

test('Unit Economics: classifies dish into matrix categories', () => {
	const categoryStar = evaluateMenuCategory(24.0, 35.0);
	assert.strictEqual(categoryStar, 'Star (High Yield, High Profit)');

	const categoryRisk = evaluateMenuCategory(38.0, 15.0);
	assert.strictEqual(categoryRisk, 'Rethink (Critical Margin Risk)');
});
