export function getVarietyName(input, baseName) {
    if (input === baseName) {
        return "default";
    } else {
        const baseIndex = input.indexOf(baseName);
        if (baseIndex !== -1) {
            return input.slice(baseIndex+1 + baseName.length);
        } else {
            return input;
        }
    }
}