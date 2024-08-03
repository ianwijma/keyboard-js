import { getKey as k, getStateKey as sk } from './layout.mjs'


const space = sk('Space', { key: k('Space', { text: ' ', width: 8 }) });
const enter = sk('Enter', { key: k('Enter', { width: 2 }) });
const altLeft = sk('AltLeft', { key: k('AltLeft', { text: 'Alt' }) });
const altRight = sk('AltRight', { key: k('AltRight', { text: 'Alt' }) });
const controlLeft = sk('ControlLeft', { key: k('ControlLeft', { text: 'Ctrl' }) });
const controlRight = sk('ControlRight', { key: k('ControlRight', { text: 'Ctrl' }) });
const shiftLeft = sk('ShiftLeft', { key: k('ShiftLeft', { text: 'Shift', width: 2 }) });
const shiftRight = sk('ShiftRight', { key: k('ShiftRight', { text: 'Shift', width: 2 }) });
const capslock = sk('CapsLock', { toggle: true, key: k('CapsLock', { text: 'Caps Lock', width: 2 }) });

const ka = (code, altCode) => k(code, { altKeys: [ k(altCode, { state: [ shiftLeft, shiftRight, capslock ] }) ] });
const ku = (code) => ka(code, code.toUpperCase());

export const defaultLayout = ({ metaKeyText = '⌨️' } = {}) => [
    [k('Escape'), k('F1'), k('F2'), k('F3'), k('F4'), k('F5'), k('F6'), k('F7'), k('F8'), k('F9'), k('F10'), k('F11'), k('F12'), k('Delete', { text: 'Del', width: 2 })],
    [ka('`', '~'), ka('1', '!'), ka('2', '@'), ka('3', '#'), ka('4', '$'), ka('5', '%'), ka('6', '^'), ka('7', '&'), ka('8', '*'), ka('9', '('), ka('0', ')'), ka('-', '_'), ka('=', '+'), k('Backspace', { width: 2 })],
    [k('Tab'), ku('q'), ku('w'), ku('e'), ku('r'), ku('t'), ku('y'), ku('u'), ku('i'), ku('o'), ku('p'), ka('[', '{'), ka(']', '}'), ka('\\', '|')],
    [capslock, ku('a'), ku('s'), ku('d'), ku('f'), ku('g'), ku('h'), ku('j'), ku('k'), ku('l'), ka(';', ':'), ka("'", '"'), enter],
    [shiftLeft, ku('z'), ku('x'), ku('c'), ku('v'), ku('b'), ku('n'), ku('m'), ka(',', '<'), ka('.', '>'), ka('/', '?'), shiftRight],
    [controlLeft, sk('Meta', { key: k('Meta', { text: metaKeyText }) }), altLeft, space, controlRight, altRight],
]