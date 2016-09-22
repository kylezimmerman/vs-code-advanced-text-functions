'use strict';
import {TextEditor, Range, Selection} from 'vscode';

/**
 * Gets a Selection that encompases the entire text editor.
 */
export function getSelectionForEntireEditor(editor : TextEditor) {
    //There has to be a better way to do this, but I couldn't find anything in the docs.
    //If someone knows a better way please submit a PR!
    let maxRange = new Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE);
    let entireDocumentRange = editor.document.validateRange(maxRange);
    return new Selection(entireDocumentRange.start, entireDocumentRange.end);
}

/**
 * Shuffles an array using the Fisher-Yates Shuffle.
 */
export function shuffle(array : Array<any>) {
    //This is a modified version of an implementation of the Fisher-Yates Shuffle from http://stackoverflow.com/a/6274398/494356.
    for (let counter = array.length; counter > 0; counter--) {
        let index = Math.floor(Math.random() * counter);
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}