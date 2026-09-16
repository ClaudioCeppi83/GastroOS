# GastroSense AI - Project Memory (PROJECT_MEMORY.md)

## 1. Architectural Decisions (ADR)

### ADR 001: Modular Vanilla ES6 vs Monolithic Framework
- Context: Need ultra-fast execution, zero hydration overhead, instant local
  loading, and clean decoupling without dependency bloat.
- Decision: Use modular ES6 architecture with functional core engines and
  clean DOM renderers.
- Consequence: Ultra-lightweight payload (< 80KB total bundle), instant
  rendering, and seamless offline execution.

### ADR 002: Foodpairing Mathematical Model
- Context: Molecular gastronomy requires quantifiable flavor compatibility.
- Decision: Characterize ingredients by multidimensional volatile compound
  presence (Esters, Pyrazines, Terpenes, Aldehydes, Phenols, Lactones,
  Sulfur volatiles) and apply Cosine Similarity for pairing scores.
- Consequence: Empirically verifiable pairings (e.g., White Chocolate +
  Caviar, Coffee + Garlic, Black Truffle + Vanilla) backed by flavor chemistry.

### ADR 003: Dual-Mode AI Synthesis (Deterministic Engine + Gemini API)
- Context: App must work 100% out of the box with zero external friction or
  mandatory API keys, while offering full cloud generative capabilities.
- Decision: Implement an internal culinary neural synthesizer that generates
  molecular recipes, and provide optional direct hook to Google Gemini API
  (Firebase AI Logic) for unlimited bespoke culinary storytelling.

### ADR 004: Firebase-First Security & Cloud Hosting
- Context: Enterprise kitchen data privacy and cross-station sync.
- Decision: Declarative Firestore rules (`firestore.rules`) with granular
  user and chef team isolation, validated via `firebase-mcp-server`.
