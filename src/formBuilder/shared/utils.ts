import { IVariableParts } from './interfaces';

export const getVariableAndParts = (variableStr: string): IVariableParts => {
    const variable = variableStr.replace('{{', '').replace('}}', '').trim();
    const reg = new RegExp(/[\.\[\?]/);
    const specialIndex = reg.exec(variable)?.index ?? -1;
    let variablePart = variable;
    let theRest = '';
    if (specialIndex > -1) {
        variablePart = variable.substring(0, specialIndex);
        theRest = variable.substring(specialIndex + 1);
    }
    return {
        variablePart,
        theRest
    };
};