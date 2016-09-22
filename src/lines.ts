'use strict';

import * as helpers from './helpers';
import * as vscode from 'vscode';

/**
 * A function that takes an array of lines and returns an array of lines.
 */
type LinePermutationCallback = (lines : Array<string>) => Array<string>;

/**
 * Separator options for Splits/Joins
 */
let separatorOptions = new Map<string, string>();
separatorOptions.set('None', '');
separatorOptions.set('Space', ' ');
separatorOptions.set('Comma', ',');
separatorOptions.set('Other', undefined);

/**
 * Helper method that takes the selection, breaks it up into lines, and allows a callback to return a changed set of lines to replace the selection.
 */
function permuteLines(callback : LinePermutationCallback, allowSingleLine : boolean = false) {
    let editor = vscode.window.activeTextEditor;
    let selection = editor.selection;

    //If the selection is empty, default to the entire document.
    if (selection.isEmpty) {
        selection = helpers.getSelectionForEntireEditor(editor);
    }

    //Don't do anything if the selection is a single line and the permutation requires more than one line.
    if (!allowSingleLine && selection.isSingleLine) {
        return;
    }

    //Get the selected text and split it into lines (support CRLF and LF)
    let text = editor.document.getText(selection);
    let lines = text.split(/\r?\n/);

    //Do something with the lines
    let newLines = callback(lines);

    //Update the selection with the new lines
    editor.edit((editBuilder) => editBuilder.replace(selection, newLines.join('\r\n')));
}

/**
 * Reverses the selected lines
 */
export function reverseLines() {
    permuteLines((lines) => lines.reverse())
}

/**
 * Shuffles the selected lines
 */
export function shuffleLines() {
    permuteLines((lines) => helpers.shuffle(lines));
}

/**
 * Removes any duplicates from the selected lines.
 */
export function uniqueLines(caseSensitive : boolean) {
    permuteLines((lines) => Array.from(new Set(lines)));
}

/**
 * Joins multiple lines into a single line (with an optional separator)
 */
export function joinLines() {
    vscode.window.showQuickPick(Array.from(separatorOptions.keys())).then(selected => {
        let separator = separatorOptions.get(selected);

        if (separator != null) {
            permuteLines((lines) => [lines.join(separator)]);    
        }
        else {
            vscode.window.showInputBox({prompt: 'Enter a separator string'}).then(separator => {
                permuteLines((lines) => [lines.join(separator)]);
            });
        }
    });
}

/**
 * Splits lines that are separated by a separation string into separate lines.
 */
export function splitLines() {
    vscode.window.showQuickPick(Array.from(separatorOptions.keys())).then(selected => {
        let separator = separatorOptions.get(selected);

        if (separator != null) {
            permuteLines((lines) => lines.join('').split(separator), true);
        }
        else {
            vscode.window.showInputBox({prompt: 'Enter a separator string'}).then(separator => {
                permuteLines((lines) => lines.join('').split(separator), true);
            });
        }
    });
}