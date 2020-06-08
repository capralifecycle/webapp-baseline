analyze:
	npm run build:analyze --profile --json > build/stats.json && npx webpack-bundle-analyzer build/stats.json