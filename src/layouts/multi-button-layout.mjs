import { getKey as k, getStateKey as sk, getBlankSpace as bs } from './layout.mjs'

const altLeft = sk('AltLeft', { toggle: true, key: k('AltLeft', { text: 'Alt' }) });
const altRight = sk('AltRight', { toggle: true, key: k('AltRight', { text: 'Alt' }) });
const controlLeft = sk('ControlLeft', { toggle: true, key: k('ControlLeft', { text: 'Ctrl' }) });
const controlRight = sk('ControlRight', { toggle: true, key: k('ControlRight', { text: 'Ctrl' }) });

const multiKey = k('Multi', {
    altKeys: [
        k('TopLeft', { text: 'TL', state: [ controlLeft ] }),
        k('TopRight', { text: 'TR',state: [ controlRight ] }),
        k('BottomLeft', { text: 'BL', state: [ altLeft ] }),
        k('ButtomRight', { text: 'BR', state: [ altRight ] }),
    ]
})

export const multiButtonLayout = () => [
    [controlLeft, bs(), controlRight],
    [bs(), multiKey, bs()],
    [altRight, bs(), altLeft],
]