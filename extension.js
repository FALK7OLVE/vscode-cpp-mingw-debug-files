const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
    console.log('The extension "create-cpp-debug-files" is activated');

    const disposable = vscode.commands.registerCommand(
        'create-cpp-debug-files.createDebugFiles',
        async () => {
            try {
                const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
                
                if (!workspaceFolder) {
                    vscode.window.showErrorMessage('The project folder is not open!');
                    return;
                }

                const vscodeDir = path.join(workspaceFolder.uri.fsPath, '.vscode');
                
                if (!fs.existsSync(vscodeDir)) {
                    fs.mkdirSync(vscodeDir);
                }

                const tasksContent = {
                    "version": "2.0.0",
                    "tasks": [
                        {
                            "type": "shell",
                            "label": "C/C++: Build the active file using g++.exe",
                            "command": "g++.exe",
                            "args": [
                                "-g",
                                "${file}",
                                "-o",
                                "${fileDirname}\\${fileBasenameNoExtension}.exe"
                            ],
                            "group": "build",
                            "problemMatcher": ["$gcc"]
                        }
                    ]
                };

                const launchContent = {
                    "version": "0.2.0",
                    "configurations": [
                        {
                            "name": "Debug C++ with g++",
                            "type": "cppdbg",
                            "request": "launch",
                            "program": "${workspaceFolder}\\${fileBasenameNoExtension}.exe",
                            "args": [],
                            "stopAtEntry": false,
                            "cwd": "${workspaceFolder}",
                            "environment": [],
                            "externalConsole": false,
                            "MIMode": "gdb",
                            "miDebuggerPath": "gdb.exe",
                            "preLaunchTask": "C/C++: Build the active file using g++.exe",
                            "setupCommands": [
                                {
                                    "description": "Enable pretty-printing",
                                    "text": "-enable-pretty-printing",
                                    "ignoreFailures": true
                                }
                            ]
                        }
                    ]
                };

                const tasksPath = path.join(vscodeDir, 'tasks.json');
                const launchPath = path.join(vscodeDir, 'launch.json');

                fs.writeFileSync(tasksPath, JSON.stringify(tasksContent, null, 4));
                fs.writeFileSync(launchPath, JSON.stringify(launchContent, null, 4));

                vscode.window.showInformationMessage('The files .vscode/tasks.json and .vscode/launch.json have been successfully created!');
                
            } catch (error) {
                vscode.window.showErrorMessage(`Error creating files: ${error.message}`);
            }
        }
    );

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};