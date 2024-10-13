function generateType() {
    const inputText = document.getElementById('input').value;
    let parsedObject;

    // json parse 
    try {
        parsedObject = JSON.parse(inputText);
    } catch (e) {
        try {
            parsedObject = eval('(' + inputText + ')');
        } catch (err) {
            document.getElementById('output').value = "Invalid JSON or Object format!";
            return;
        }
    }

    // Type generation 
    const generateInterface = (obj, interfaceName = 'GeneratedInterface') => {
        let result = `export interface ${interfaceName} {\n`;
        for (const key in obj) {
            const type = detectType(obj[key]);
            result += `  ${key}: ${type};\n`;
        }
        result += '}';
        return result;
    };

    // determine type
    const detectType = (value) => {
        if (Array.isArray(value)) {
            if (value.length > 0) {
                return `${detectType(value[0])}[]`;
            }
            return 'any[]';
        } else if (typeof value === 'object' && value !== null) {
            return generateInterface(value);
        } else {
            console.log(typeof value);
            return typeof value;
        }
    };

    // create an interface
    const output = generateInterface(parsedObject);
    document.getElementById('output').value = output;
}
