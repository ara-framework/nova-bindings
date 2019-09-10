build:
	lerna exec --parallel -- babel src -d lib --root-mode upward

test:
	lerna exec --parallel -- jest --passWithNoTests

publish:
	lerna publish
