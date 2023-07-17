export const VDom = {
    createElement: (type, config, ...children) => {
        const key = config ? (config.key || null) : null;
        const props = config || {};

        if (children.length === 1) {
            props.children = children[0];
        } else {
            props.children = children;
        }

        return {
            type,
            key,
            props
        };
    },
    Component: class {
        constructor(props) {
            this.props = props;
            this.state = {};
        }

        setState(newState) {
            this.state = { ...this.state, ...newState };
            this.forceUpdate();
        }

        forceUpdate() {
            // Реализация синхронизации компонента с реальным DOM
            const virtualNode = this.render();
            const realNode = this.__realNode;
            sync(virtualNode, realNode);
        }

        componentDidMount() {}

        componentWillUnmount() {}

        render() {}
    },
    createContext(defaultValue) {
        const context = {
            defaultValue,
            current: defaultValue,
            Provider: ({ value, children }) => {
                context.current = value;
                return children;
            },
            Consumer: ({ children }) => children(context.current || defaultValue)
        };

        return context;
    }
}

export function render(virtualDom, realDomRoot) {
    const evaluatedVirtualDom = evaluate(virtualDom)

    const virtualDomRoot = {
        type: realDomRoot.tagName.toLowerCase(),
        key: null,
        props: {
            id: realDomRoot.id,
            children: [
                evaluatedVirtualDom
            ]
        },
    }

    sync(virtualDomRoot, realDomRoot)
}

// Any - Так как передать можно по факту любой элемент
function evaluate(virtualNode) {
    console.log(virtualNode)
    if (typeof virtualNode !== 'object') {
        return virtualNode;
    }

    if (typeof virtualNode.type === 'function') {
        if (virtualNode.type.prototype instanceof VDom.Component) {
            // Создание экземпляра класса с использованием оператора new
            const componentInstance = new virtualNode.type(virtualNode.props);
            return evaluate(componentInstance.render());
        } else {
            // Вызов функционального компонента и рекурсивный вызов evaluate для его результата
            return evaluate(virtualNode.type(virtualNode.props));
        }
    }

    const props = virtualNode.props || {}

    return {
        ...virtualNode,
        props: {
            ...props,
            children: Array.isArray(props.children) ? props.children.map(evaluate) : [evaluate(props.children)]
        }
    }
}

function sync(virtualNode, realNode) {
    // Sync element
    if (virtualNode.props) {
        Object.entries(virtualNode.props).forEach(([name, value]) => {
            if (name === 'key' || name === 'children') {
                return
            }

            if (name === 'className') {
                name = 'class';
            }

            if ((realNode).getAttribute(name) !== value) {
                (realNode).setAttribute(name, String(value))
            }
        })
    }
    if (virtualNode.key && realNode instanceof HTMLElement) {
        realNode.dataset.key = virtualNode.key
    }
    if (typeof virtualNode !== 'object' && virtualNode !== realNode.nodeValue) {
        realNode.nodeValue = virtualNode
    }

    if (virtualNode.type instanceof VDom.Component) {
        virtualNode.__realNode = realNode;
    }

    // Sync child nodes
    const virtualChildren = virtualNode.props ? virtualNode.props.children || [] : []
    const realChildren = realNode.childNodes

    for (let i = 0; i < virtualChildren.length || i < realChildren.length; i++) {
        const virtual = virtualChildren[i];
        const real = realChildren[i];

        // Remove
        if (virtual === undefined && real !== undefined) {
            realNode.removeChild(real)
        }

        // Update
        if (virtual !== undefined && real !== undefined && (virtual.type || '') === (real.tagName || '').toLowerCase()) {
            sync(virtual, real)
        }

        // Replace
        if (virtual !== undefined && real !== undefined && (virtual.type || '') !== (real.tagName || '').toLowerCase()) {
            const newReal = createRealNodeByVirtual(virtual)
            sync(virtual, newReal)
            realNode.replaceChild(newReal, real)
        }

        // Add
        if (virtual !== undefined && real === undefined) {
            const newReal = createRealNodeByVirtual(virtual)
            sync(virtual, newReal)
            realNode.appendChild(newReal)
        }
    }
}

function createRealNodeByVirtual(virtual) {
    if (typeof virtual !== 'object') {
        return document.createTextNode('')
    }
    return document.createElement(virtual.type)
}