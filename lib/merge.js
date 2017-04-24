'use strict';

import fs from 'fs';
import mergWith from 'lodash.mergewith';
import { validateJSON } from './utils';

export default function merge(source, destination) {
    let sourceData = readFromFile(source);
    let destinationData = readFromFile(destination);
    let mergedData;

    if(Array.isArray(sourceData) && Array.isArray(destinationData)) {
        mergedData = uniqueArr(destinationData.concat(sourceData)).join('\r\n');
    } else if((sourceData.constructor.toString().indexOf("Object") != -1) && 
        (destinationData.constructor.toString().indexOf("Object") != -1)) {
        mergedData = JSON.stringify(mergWith({}, sourceData, destinationData, function(a, b) {
            if(Array.isArray(a) && Array.isArray(b)) {
                let c = b.concat(a);
                return c.filter(function(item, index) {
                    return c.indexOf(item) === index;
                })
            }
        }), null, 2);
    }
    
    writeToFile(mergedData, destination);
}

export function readFromFile(pathToFile) {
    // TODO: Read files via node readline or readFileAsync
    let data = fs.readFileSync(pathToFile, 'utf-8');
    let dataObj = validateJSON(data);

    if(dataObj) {
        return dataObj;
    } else {
        return data.toString().split("\n");
    }
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

export function writeToFile(mergedData, destination) {
    let file = fs.createWriteStream(destination);
    file.on('error', function(err) { 
        throw err;
    });
    file.write(mergedData);
    // mergedData.forEach(function(item) {
    //     file.write(item + '\n'); 
    // });
    file.end();
}

