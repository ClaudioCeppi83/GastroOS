/*
 * GastroSense AI - Kitchen Unit Economics & Menu Engineering Engine
 *
 * Provides Michelin-grade financial modeling: food cost percentage,
 * contribution margins, trim-waste buffers, and target retail pricing.
 */

export const FINE_DINING_TARGET_COST_PCT = 28.0; // Standard 28% food cost goal

/*
 * Calculates raw ingredient plate cost including prep trim waste factor.
 */
export function calculatePortionCost(ingredients, wasteFactorPct = 8.0) {
	if (!ingredients || ingredients.length === 0) return 0;

	const baseCost = ingredients.reduce((sum, item) => {
		const unitCost = item.costPerPortion || 0;
		return sum + unitCost;
	}, 0);

	const wasteMultiplier = 1.0 + (wasteFactorPct / 100);
	return Number((baseCost * wasteMultiplier).toFixed(2));
}

/*
 * Determines food cost percentage based on portion cost and retail menu price.
 */
export function calculateFoodCostPct(portionCost, menuPrice) {
	if (!menuPrice || menuPrice <= 0) return 0;
	return Number(((portionCost / menuPrice) * 100).toFixed(1));
}

/*
 * Suggests optimal menu price based on target food cost percentage.
 */
export function suggestMenuPrice(
	portionCost,
	targetPct = FINE_DINING_TARGET_COST_PCT
) {
	if (!portionCost || portionCost <= 0 || targetPct <= 0) return 0;
	const calculatedPrice = portionCost / (targetPct / 100);
	return Number(calculatedPrice.toFixed(2));
}

/*
 * Evaluates dish profitability category according to Menu Engineering Matrix.
 * Matrix categories: Star (High Pop, High Margin), Puzzle, Plowhorse, Dog.
 */
export function evaluateMenuCategory(foodCostPct, grossProfit) {
	const isLowCost = foodCostPct <= 30.0;
	const isHighMargin = grossProfit >= 25.0;

	if (isLowCost && isHighMargin) return 'Star (High Yield, High Profit)';
	if (!isLowCost && isHighMargin) return 'Plowhorse (Needs Portion Tuning)';
	if (isLowCost && !isHighMargin) return 'Puzzle (Needs Marketing Push)';
	return 'Rethink (Critical Margin Risk)';
}
