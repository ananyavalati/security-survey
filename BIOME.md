# Biome - Linting and Formatting Guide

## What is Biome?

Biome is a fast, modern toolchain for web projects that handles both linting and formatting. It's designed to replace ESLint and Prettier with a single, performant tool written in Rust.

## Installation

Biome is already installed in this project as a dev dependency:

```bash
npm install --save-dev --save-exact @biomejs/biome
```

## Configuration

The project uses a `biome.json` configuration file with the following settings:

- **Formatter**: Enabled with 2-space indentation
- **Line Width**: 100 characters
- **Quotes**: Single quotes for JavaScript, double quotes for JSX attributes
- **Semicolons**: Added only when needed (ASI-safe)
- **Linter**: Enabled with recommended rules for:
  - Accessibility (a11y)
  - Code complexity
  - Correctness
  - Performance
  - Code style
  - Suspicious patterns

## Available Commands

### 1. Check for Issues

```bash
npm run lint
```

**What it does:**

- Checks all files for linting errors
- Checks code formatting
- Reports issues but doesn't fix them
- Equivalent to: `biome check .`

**Use this when:**

- You want to see what issues exist without changing files
- Running in CI/CD pipelines
- Before committing code

### 2. Auto-Fix Issues

```bash
npm run lint:fix
```

**What it does:**

- Checks all files for linting and formatting issues
- Automatically fixes safe issues
- Applies code formatting
- Organizes imports
- Equivalent to: `biome check --write .`

**Use this when:**

- You want to automatically fix all fixable issues
- Cleaning up code before committing
- After making changes to multiple files

### 3. Format Only

```bash
npm run format
```

**What it does:**

- Only formats code (no linting)
- Fixes indentation, quotes, semicolons, etc.
- Doesn't check or fix linting rules
- Equivalent to: `biome format --write .`

**Use this when:**

- You only want to format code style
- You've already addressed linting issues separately

## Common Workflow

### Daily Development

1. **While coding**: Biome will show issues in your editor (if you have the VS Code extension)
2. **Before committing**: Run `npm run lint:fix` to auto-fix issues
3. **Review changes**: Check what Biome changed with `git diff`
4. **Commit**: Your code is now clean and formatted

### Quick Fix Workflow

```bash
# Check what issues exist
npm run lint

# Auto-fix everything possible
npm run lint:fix

# Check if any issues remain
npm run lint
```

## Types of Issues Biome Detects

### Auto-Fixable Issues ✅

These can be fixed automatically with `npm run lint:fix`:

- **Formatting**: Indentation, spacing, line breaks
- **Quotes**: Converting between single/double quotes
- **Semicolons**: Adding or removing semicolons
- **Import sorting**: Organizing import statements
- **Unused imports**: Removing unused imports
- **Unnecessary code**: Removing redundant fragments or code

### Manual Fix Required ⚠️

These require you to fix them manually:

- **Unused variables**: Variables declared but never used
- **Logic errors**: Potential bugs in your code
- **Accessibility issues**: Missing alt text, invalid ARIA attributes
- **Security issues**: Dangerous patterns like `dangerouslySetInnerHTML`

## Example Output

When you run `npm run lint`, you'll see output like:

```
src/App.jsx:17:5 lint/complexity/noUselessFragments  FIXABLE
  ℹ This fragment is unnecessary.
```

- **File and line**: `src/App.jsx:17:5` - The location of the issue
- **Rule name**: `lint/complexity/noUselessFragments` - The rule that was violated
- **FIXABLE**: This can be auto-fixed with `npm run lint:fix`

## VS Code Integration (Recommended)

Install the Biome VS Code extension for the best experience:

1. Open VS Code Extensions (Cmd+Shift+X)
2. Search for "Biome"
3. Install the official Biome extension
4. Biome will now:
   - Show errors as you type
   - Format on save (if configured)
   - Provide quick fixes

## Ignoring Files

Biome respects your `.gitignore` file automatically. Files in:

- `node_modules/`
- `dist/`
- `.git/`

...are automatically ignored.

## Migration from ESLint

This project has migrated from ESLint to Biome. The benefits include:

- **Faster**: 10-100x faster than ESLint + Prettier
- **Simpler**: One tool instead of two
- **Better errors**: Clear, actionable error messages
- **Modern**: Built for modern JavaScript/TypeScript

## Troubleshooting

### "Some errors were emitted"

This is normal! It means Biome found issues. Run `npm run lint:fix` to fix them automatically.

### Issues remain after running lint:fix

Some issues require manual fixes. Read the error messages carefully - they usually tell you exactly what to change.

**Quick Reference:**

| Command            | Purpose                       |
| ------------------ | ----------------------------- |
| `npm run lint`     | Check for issues (no changes) |
| `npm run lint:fix` | Auto-fix all fixable issues   |
| `npm run format`   | Format code only (no linting) |
