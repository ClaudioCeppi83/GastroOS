# GastroSense AI - Workspace Project Rules

## 1. Code Standards
- Tab indentation exclusively (width 4).
- Maximum line width: 80 characters.
- Functions must be modular: <= 25-30 lines, <= 5-7 variables, <= 4-5 args.
- Maximum nesting depth: 3 levels.
- Block comments explaining the architectural why.

## 2. Cloud & Security
- Cloud architecture: Google Cloud & Firebase first.
- Firestore and Storage rules declarative and audited with firebase-mcp-server.
- Zero credentials in code: use environment variables or client-safe configs.

## 3. SEO, AEO & Accessibility
- Semantic HTML5 structure (<main>, <nav>, <header>, <article>, <aside>, <footer>).
- Full Schema.org JSON-LD (SoftwareApplication, Organization, WebSite).
- WCAG 2.1 AA accessibility (high-contrast, ARIA, keyboard navigation).
- robots.txt and sitemap.xml present.

## 4. MCP-First Protocol
- Any GitHub action must use github-mcp-server.
- Any Firebase action must use firebase-mcp-server.
- Audits must use chrome-devtools-mcp.
- Always log MCP invocation before execution.
