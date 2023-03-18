# List available commands
default:
  just --list

# Run all checks from CI
ci: spellcheck format lint typecheck test-coverage

# Format files with Prettier
format:
  yarn format

# Lint the JS/TS files with ESLint
lint:
  yarn lint

# Auto-fix ESLint errors
lint-fix:
  yarn lint --fix

# Install iOS Cocoa Pods
pod-install:
  (cd ios && pod install)

# Run the spellchecker
spellcheck:
  yarn spellcheck

# List all unknown words to add them to .cspell.dictionary.txt
spellcheck-list:
  yarn spellcheck:list

# Start Metro
start:
  # NOTE: we can't do `yarn ios` because then dotenv won't work
  # See https://github.com/goatandsheep/react-native-dotenv/issues/393#issuecomment-1380913100
  yarn start

# Run storybook app
storybook:
  yarn storybook:start

# Run this command when new *.stories.tsx files have been created
storybook-generate:
  yarn storybook:generate

# Run the unit and integration tests with Jest
test:
  yarn test

# Run Jest with coverage
test-coverage:
  yarn test:coverage

# Run Jest with coverage and open the coverage report
test-coverage-open:
  yarn test:coverage

# Run the tests in watch mode
test-watch:
  yarn test:watch

# Typecheck the TS files
typecheck:
  yarn typecheck

# Typecheck the TS files in watch mode
typecheck-watch:
  yarn typecheck:watch

# Run this if you have watchman recrawl issues
watchman-reset:
  watchman shutdown-server
