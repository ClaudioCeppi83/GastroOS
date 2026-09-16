# GastroSense AI - Technical Specification (SPEC.md)

## 1. Executive Summary & Vision
GastroSense AI is an enterprise-grade cognitive flavor architecture platform
engineered for Michelin-starred culinary teams, R&D food laboratories, and
avant-garde mixologists. It combines molecular flavor chemistry, organoleptic
sensory modeling, automated allergen safety, kitchen economics, and AI-driven
molecular recipe synthesis.

## 2. Core Modules & Technical Architecture

### 2.1 Molecular Flavor Pairing Engine (`flavorMatrix.js`)
- Theoretical Foundation: Foodpairing hypothesis based on shared volatile
  aromatic compounds (pyrazines, terpenes, esters, lactones, aldehydes, etc.).
- Algorithm: Cosine similarity over normalized volatile compound vectors:
  $$Similarity(A, B) = \frac{A \cdot B}{\|A\| \|B\|}$$
- Affinity categorization:
  - Harmonic Pair (> 0.70): Shared primary volatile aromatics.
  - Contrast Pair (0.40 - 0.69): Complementary bridge compounds.
  - Experimental (< 0.40): Radical organoleptic tension.

### 2.2 Sensory Hexagon Engine (`sensoryRadar.js`)
- Dimensions: Sweet, Salty, Sour, Bitter, Umami, Kokumi (mouthfulness/fat).
- Mathematical model: Normalized radial vectors [0.0 - 1.0].
- Harmonic Balance Index ($HBI$): Measures organoleptic equilibrium:
  $$HBI = 1.0 - \sigma(sensory\_values)$$
- Palate Fatigue Warning: Triggered when any single axis exceeds 0.85 without
  compensating balancing axes (e.g. high sweet without acid/bitter).

### 2.3 Autonomous Recipe Architect (`recipeArchitect.js`)
- Hybrid synthesis: Deterministic culinary physics engine combined with
  Google Gemini API (Firebase AI Logic).
- Outputs:
  - Dish title & avant-garde concept narrative.
  - Molecular gastronomy techniques (reverse spherification, sous-vide, gels).
  - Thermal precision parameters (temperature Celsius to 0.1 precision, time).
  - Plating architecture instructions.
  - Wine & non-alcoholic pairing notes.

### 2.4 Plating Studio Engine (`platingStudio.js`)
- Substrate options: Basalt Slate, Limoges Porcelain, Dark Smoked Glass.
- Visual balance algorithm: Golden Ratio spiral overlay ($\Phi \approx 1.618$)
  and chromatic contrast calculation using WCAG luminance ratios.

### 2.5 EU 14 Allergen Detection Engine (`allergenDetector.js`)
- Real-time automated auditing across all 14 mandatory EU allergens:
  Gluten, Crustaceans, Eggs, Fish, Peanuts, Soybeans, Milk, Nuts, Celery,
  Mustard, Sesame, Sulphites, Lupin, Molluscs.

### 2.6 Kitchen Unit Economics Engine (`unitEconomics.js`)
- Food Cost Percentage:
  $$FCP = \frac{Total Ingredient Cost}{Menu Price} \times 100$$
- Target margin calculation, gross profit yield, waste factor compensation.

## 3. SEO & AEO (AI Engine Optimization) Architecture
- Canonical URL: `https://gastrosense.ai/`
- Meta robots: `index, follow`
- Schema.org JSON-LD Entities:
  - `SoftwareApplication`: Category `BusinessApplication`, `DesignApplication`.
  - `Organization`: GastroSense Labs.
  - `WebSite`: Sitelinks searchbox compatible.
- AI Search Citability (AEO):
  Semantic definitions, direct answers for food pairing science questions,
  and structured machine-readable tables.
