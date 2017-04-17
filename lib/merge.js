'use strict';

import fs from 'fs';
import readline from 'readline';

export default function merge(source, destination) {
    let sourceArr = fileToArray(source);
    let destinationArr = fileToArray(destination);
    let mergedArr = mergeArrays(sourceArr, destinationArr)
    arrayToFile(mergedArr, destination);
}

export function fileToArray(pathToFile) {
    // TODO: Read files via node readline or readFileAsync
    return fs.readFileSync(pathToFile).toString().split("\n")
}

export function mergeArrays(sourceArr, destinationArr) {
    return [...new Set([...sourceArr ,...destinationArr])];
}

export function arrayToFile(mergedArr, destination) {
    let file = fs.createWriteStream(destination);
    file.on('error', function(err) { 
        throw err;
    });
    mergedArr.forEach(function(item) {
        file.write(item + '\n'); 
    });
    file.end();
}

