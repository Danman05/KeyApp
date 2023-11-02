export class Helper {

    static validateInput(x: string): boolean {
        // /^[a-zA-Z0-9æøåÆØÅ() ]+$/ // Regex set for a-z A-Z 0-9 æøå ÆØÅ "()" , . and whitespace
        const regexPattern = /^[a-zA-Z0-9æøåÆØÅ(),. ]+$/;
        if (regexPattern.test(x))
            return false; // No errors - passed test
        else 
            return true; // Error - failed test
    }
    // Simple json verification
    static isJsonString(str: string) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}


