'use strict';

import fs from 'fs';
import readline from 'readline';

export default function merge(source, destination) {
    let sourceArr = fileToArray(source);
    let destinationArr = fileToArray(destination);
    let mergedArr = uniqueArr(destinationArr.concat(sourceArr));
    arrayToFile(mergedArr, destination);
}

export function fileToArray(pathToFile) {
    // TODO: Read files via node readline or readFileAsync
    return fs.readFileSync(pathToFile).toString().split("\n")
}

export function uniqueArr(arr) {
    return arr.filter(function (item, index) {
        if(item === "") {
            return true;
        } else {
            return arr.indexOf(item) === index;
        }
    });
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

