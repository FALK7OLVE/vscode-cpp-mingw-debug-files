# vscode-cpp-mingw-debug-files
# Create C++ Debug Files

> VS Code extension that automatically generates `.vscode/tasks.json` and `.vscode/launch.json` for C++ debugging with g++ and GDB.

## Features

- 🚀 One-command setup for C++ debugging
- 🛠 Automatically creates `tasks.json` with g++ build task
- 🐛 Creates `launch.json` with GDB debugger configuration
- 📁 Creates `.vscode` folder in your project root

## Usage

1. Open your C++ project in VS Code
2. Open Command Palette (`Ctrl+Shift+P`)
3. Run command: **"Create C++ debug files"**
4. Press `F5` to start debugging!

## Requirements

- [VS Code](https://code.visualstudio.com/) 1.74.0 or higher
- [MinGW](https://www.mingw-w64.org/) or [MSYS2](https://www.msys2.org/) with `g++` and `gdb` installed

## Installation

### From VSIX file
1. Download the `.vsix` file
2. In VS Code, go to Extensions (`Ctrl+Shift+X`)
3. Click `...` → "Install from VSIX..."
4. Select the `.vsix` file

### From source
```bash
git clone https://github.com/FALK7OLVE/vscode-cpp-mingw-debug-files.git
cd vscode-cpp-mingw-debug-files
npm install -g @vscode/vsce
vsce package
code --install-extension create-cpp-debug-files-1.0.0.vsix
