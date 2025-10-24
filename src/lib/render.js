// File name: render.js
// Author: Janis Hutz
// Date created: 2025-10-24 14:04:37
// Date modified: 2025-10-24 14:26:50
// ------

class ImpressCamera {
    constructor () {
        this.position = {
            'x': 0,
            'y': 0,
            'z': 0
        };

        this.rotation = {
            'x': 0,
            'y': 0,
            'z': 0
        };
    }

    setPosition ( x, y, z ) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }

    setRotation ( x, y, z ) {
        this.rotation.x = x;
        this.rotation.y = y;
        this.rotation.z = z;
    }

    getState () {
        return {
            'position': this.position,
            'rotation': this.rotation
        };
    }
}

class ImpressElement {
    // eslint-disable-next-line max-params
    constructor ( element, x, y, z, rotationX, rotationY, rotationZ ) {
        this.element = element;
        this.position = {
            'x': x,
            'y': y,
            'z': z
        };

        this.rotation = {
            'x': rotationX,
            'y': rotationY,
            'z': rotationZ
        };
    }
}


const renderer = () => {
    const camera = new ImpressCamera();

    const addElement = ( HTMLElement ) => {
        // Element will need data-x, data-y, data-z, etc dataset
    };

    const removeElement = ( HTMLElement ) => {

    };

    const render = () => {

    };

    const moveTo = ( x, y, z, rotationX, rotationY, rotationZ ) => {

    };

    return {
        addElement,
        removeElement,
        moveTo
    };
};
