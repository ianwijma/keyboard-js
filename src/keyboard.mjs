import { defaultLayout } from "./layouts/default-layout.mjs";

const renderRow = () => {
    const element = document.createElement('div');
    
    element.classList.add('kbj__row');
    
    return element;
}

const renderBaseKeyElement = ({ key }) => {
    const { code } = key;

    const element = document.createElement('button');

    element.classList.add('kbj__key');
    element.classList.add(`kbj__key__key--${code}`);

    return element;
}

const renderKeyElement = ({ key, state }) => {
    const { code, text, altKeys } = key;
    const { listenState, emitKey } = state;

    let currentCode = code;

    const element = renderBaseKeyElement({ key });
    element.addEventListener('click', () => emitKey(currentCode))

    const main = document.createElement('div');
    main.classList.add('kbj__key__main');
    main.innerText = text;
    element.append(main);

    altKeys.forEach((altKey, index) => {
        const { code: altCode, text: altText, state: altState } = altKey

        const alt = document.createElement('div');
        alt.classList.add(`kbj__key__alt-${index}`);
        alt.innerText = altText;
        element.append(alt);


        const setFocus = () => {
            element.classList.add('kbj__key-alt');
            alt.classList.add('kbj__key_focus');
            currentCode = altCode;
        }

        const resetFocus = () => {
            element.classList.remove('kbj__key-alt');
            alt.classList.remove('kbj__key_focus')
            currentCode = code;
        }

        const stateNames = altState.map(item => item.name);
        const handleStateChange = ({ state }) => {
            const hasActiveState = stateNames.some((name => state[name]));
            if (hasActiveState) {
                setFocus();
            } else {
                resetFocus()
            }
        }

        listenState(handleStateChange);
    })

    return element
}

const renderStateKeyElement = ({ key: stateKey, state }) => {
    const { name, key, toggle } = stateKey;
    const { code, text } = key;
    const { updateState, emitKey } = state;
    
    const element = renderBaseKeyElement({ key });

    const main = document.createElement('div');
    main.classList.add('kbj__key__main');
    main.innerText = text;
    element.append(main);
    
    if (toggle) {
        let currentState = false;
        element.addEventListener('click', () => {
            currentState = !currentState;
            updateState(name, currentState);
        })
    } else {
        element.addEventListener('mousedown', () => {
            updateState(name, true);
        })
        element.addEventListener('mouseup', () => {
            updateState(name, false);
        })
    }


    element.addEventListener('click', () => emitKey(code));

    return element;
}

const renderKey = ({ key, state }) => {
    const { type } = key;

    switch (type) {
        case 'key':
            return renderKeyElement({ key, state });
        case 'state':
            return renderStateKeyElement({key, state});
        default: 
            console.error(`Unknown key type: ${type}`);
            return renderKeyElement(key);
    }

}

const getState = ({ layout }) => {
    const KEY_PRESSED = 'key-pressed'
    const STATE_CHANGE = 'state-changed'
    const bus = new Comment();

    const state = {};

    const listenState = (callback) => bus.addEventListener(STATE_CHANGE, () => callback({ state }));
    const updateState = (name, value) => {
        state[name] = value;

        bus.dispatchEvent(new CustomEvent(STATE_CHANGE));
    }
    const setupState = () => layout.forEach(row => {
        row.forEach(key => {
            const { type, name } = key;
            if (type === 'state') {
                state[name] = false
            }
        })
    })

    const listenKey = (callback) => bus.addEventListener(KEY_PRESSED, ({ detail: { code } }) => callback({ code, state }))
    const emitKey = (code) => bus.dispatchEvent(new CustomEvent(KEY_PRESSED, { detail: { code } }))

    return {
        listenState,
        updateState,
        setupState,
        listenKey,
        emitKey,
    }
}

const renderKeyboard = ({ layout, state }) => {
    const keyboardElement = document.createElement('div');
    keyboardElement.classList.add('kbj__main');

    layout.forEach(row => {
        const rowElement = renderRow();

        row.forEach(key => {
            const keyElement = renderKey({ key, state });
            rowElement.append(keyElement);
        })

        keyboardElement.append(rowElement);
    })

    return keyboardElement;
}

const validateLayout = ({ layout }) => {
    const codes = [];

    layout.forEach(row => {
        row.forEach(key => {
            let code = key.code;
            if (!code) {
                code = key.key.code;
            }

            if (codes.includes(code)) {
                console.warn(`This keyboard contains a duplicate key: ${code}`);
            }
        })
    })
}

export const createKeyboard = ({ layout = null, parentElement = null } = {}) => {
    layout = layout ?? defaultLayout();
    parentElement = parentElement ?? document.body;

    // Validate the layout: No duplicate keys
    validateLayout({ layout });

    // Create keyboard state using the layout state keys;
    const state = getState({ layout });

    // Construct the keyboards state
    const keyboardElement = renderKeyboard({ layout, state });

    // Setup the keyboard initial state
    state.setupState();

    // render the keyboard to the page.
    parentElement.append(keyboardElement);

    // Forward key presses
    const onClick = (callback) => state.listenKey(({ code, state }) => callback({ code, state }));

    return {
        onClick,
    }
};