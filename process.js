const FS = require('fs');
const JSON_PATH = 'src/_data/';
const JSON_INPUT_FILE = 'raw_content.json';
const JSON_OUTPUT_FILE = 'contents.json';

FS.readFile(JSON_PATH + JSON_INPUT_FILE, 'utf8', (err, jsonStringInput) => {
    if (err) {
        console.log('File read failed: ' + err);
        return;
    }
    
    try {
        const content = JSON.parse(jsonStringInput);
        console.log('Sheet range is: ', content.range);

        let results = [
            {
                'lang': 'en'
            },
            {
                'lang': 'ja'
            }
        ];

        let level_1 = 0;
        let level_2 = 1;
        let en = 2;
        let ja = 3;

        let blocks = content.values.slice(1);
        let section = '';

        for (block of blocks) {
            let section_value = block[level_1];
            let fieldname_value = block[level_2];
            let en_value = block[en];
            let ja_value = block[ja];

            if (section_value != section) {
                section = section_value;
                results[0][section] = {};
                results[1][section] = {};
            }
            
            if (typeof en_value != 'undefined') {
                results[0][section][fieldname_value] = en_value;
            }

            if (typeof ja_value != 'undefined') {
                results[1][section][fieldname_value] = ja_value;
            }
        }

        for (result of results) {
            const jsonStringOutput = JSON.stringify(result);

            FS.writeFile(JSON_PATH + result.lang + '_content.json', jsonStringOutput, err => {
                if (err) {
                    console.log('Error writing file: ', err);
                } else {
                    console.log('Successfully wrote file');
                }
            });
        }
    } catch (err) {
        console.log('Error parsing JSON string: ' + err);
    }
    
});