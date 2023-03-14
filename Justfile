# List availabel commands
default:
  just --list

# Run all checks from CI
ci: format lint typecheck test

# Format files with Prettier
format:
  yarn format

# Lint the JS/TS files with ESLint
lint:
  yarn lint

# Install iOS Cocoa Pods
pod-install:
  (cd ios && pod install)

# Start the iOS simulator and run the app
start:
  yarn ios

# Typecheck the TS files
typecheck:
  yarn typecheck

# Run the unit and integration tests with Jest
test:
  yarn test

# Run Jest and open the coverage report
test-coverage:
  yarn test:coverage

# Run the tests in watch mode
test-watch:
  yarn test:watch

# Run this if you have watchman recrawl issues
watchman-reset:
  watchman shutdown-server
