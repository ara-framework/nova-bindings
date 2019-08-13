build:
	lerna exec --parallel -- babel src -d lib --root-mode upward

publish:
	lerna publish
