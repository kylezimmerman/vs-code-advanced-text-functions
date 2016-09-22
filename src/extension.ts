'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { uniqueLines, shuffleLines, reverseLines, joinLines, splitLines } from './lines';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let commands = [
        vscode.commands.registerCommand('extension.uniqueLinesCaseSensitive', () => uniqueLines(true)),
        vscode.commands.registerCommand('extension.shuffleLines', () => shuffleLines()),
        vscode.commands.registerCommand('extension.reverseLines', () => reverseLines()),
        vscode.commands.registerCommand('extension.joinLines', () => joinLines()),
        vscode.commands.registerCommand('extension.splitLines', () => splitLines()),
    ];

    for (let command of commands) {
        context.subscriptions.push(command);
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}