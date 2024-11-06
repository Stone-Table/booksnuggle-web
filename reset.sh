#!/bin/bash

echo "Starting the reset process for Node.js and Next.js development environment on macOS..."

# 1. Remove Node.js and npm installed via Homebrew
echo "Removing Node.js and npm from Homebrew..."
brew uninstall --ignore-dependencies node

# 2. Remove nvm and any globally installed packages
echo "Removing nvm and globally installed Node modules..."
rm -rf ~/.nvm
rm -rf ~/.npm
rm -rf ~/.node-gyp
rm -rf ~/.config/yarn
rm -rf /usr/local/lib/node_modules

# 3. Remove leftover files
echo "Cleaning up any remaining files..."
sudo rm -rf /usr/local/include/node
sudo rm -rf /usr/local/lib/node_modules
sudo rm -rf /usr/local/bin/node
sudo rm -rf /usr/local/bin/npm
sudo rm -rf /usr/local/bin/npx

# 4. Reinstall nvm
echo "Reinstalling nvm..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# Reload shell configuration to recognize nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# 5. Install Node.js LTS via nvm
echo "Installing Node.js (LTS version) via nvm..."
nvm install --lts

# 6. Verify installation
echo "Verifying Node.js and npm installations..."
node -v
npm -v

# 7. Create a new Next.js project
echo "Creating a new Next.js project..."
mkdir ~/nextjs_project && cd ~/nextjs_project
npx create-next-app@latest

echo "Setup complete! Navigate to your new Next.js project folder and start the development server with 'npm run dev'."

