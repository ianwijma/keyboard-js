const generateId = () => {
    const s4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);

    return [s4()+s4(), s4(), s4(), s4(), s4()+s4()+s4()].join('-');
}

export const getKey = (code, { text = null, state = [], altKeys = [], width = 1, areaName = null } = {}) => ({
    type: 'key',
    id: generateId(),
    code,
    text: text ?? code,
    state,
    altKeys,
    width,
    areaName: areaName ?? code
})

export const getStateKey = (name, { key = null, toggle = false } = {}) => ({
    type: 'state',
    id: generateId(),
    name,
    key: key ?? k(name),
    toggle,
});

let blankSpaceIndex = 0;
export const getBlankSpace = ({ width = 1 } = {}) => ({
    type: 'blank-space',
    id: generateId(),
    width,
    areaName: `blank-space-${blankSpaceIndex++}`
})