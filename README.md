# KeySelector

Displays a sequence of combined key commands (`ctrl`, `shift`, `alt`, or
`win` and regular keys) for the potential use as a hot-key selector.

# Installation

`npm install key-selector`

# Usage

## Browser

```html
<script src="node_modules/key-selector/KeySelector.js"></script>
```

and in your code, use:

```js
KeySelector.addListeners(input);
```

...where `input` is an HTML input element to which to add the key command listeners.

The `input`'s value will be equal to the commands separated by `+`, such as:

- alt-7
- ctrl-s
- ctrl-alt-c
- shift-ctrl-k
- shift-alt-V
- shift-ctrl-alt-V

## Other Common.js environments:

```js
var KeySelector = require('key-selector');
KeySelector.addListeners(input);
```

# Todos

1. More precisely detect and streamline a format for keys such as "enter"?
