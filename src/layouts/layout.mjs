const generateId = () => {
    const s4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);

    return [s4()+s4(), s4(), s4(), s4(), s4()+s4()+s4()].join('-');
}

export const getKey = (code, { text = null, state = [], altKeys = [], width = 1 } = {}) => ({
    type: 'key',
    id: generateId(),
    code,
    text: text ?? code,
    state,
    altKeys,
    width,
})

export const getStateKey = (name, { key = null, toggle = false } = {}) => ({
    type: 'state',
    id: generateId(),
    name,
    key: key ?? k(name),
    toggle,
});