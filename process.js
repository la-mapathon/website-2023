const fs = require('fs');
const json_path = 'src/_data/';
const json_input_file = 'raw_content.json';
const json_output_file = 'contents.json';

fs.readFile(json_path + json_input_file, 'utf8', (err, jsonStringInput) => {
    if (err) {
        console.log('File read failed: ' + err);
        return;
    }
    
    try {
        const content = JSON.parse(jsonStringInput);
        console.log('Sheet range is: ', content.range);

        let result = [
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
                result[0][section] = {};
                result[1][section] = {};
            }
            
            if (typeof en_value != 'undefined') {
                result[0][section][fieldname_value] = en_value;
            }

            if (typeof ja_value != 'undefined') {
                result[1][section][fieldname_value] = ja_value;
            }
        }

        const jsonStringOutput = JSON.stringify(result);
        fs.writeFile(json_path + json_output_file, jsonStringOutput, err => {
            if (err) {
                console.log('Error writing file: ', err);
            } else {
                console.log('Successfully wrote file');
            }
        });

    } catch (err) {
        console.log('Error parsing JSON string: ' + err);
    }
    
});