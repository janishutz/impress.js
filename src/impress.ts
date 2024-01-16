/* ! Licensed under MIT License - https://github.com/impress/impress.js/blob/master/LICENSE */
/**
 * impress.js
 *
 * impress.js is a presentation tool based on the power of CSS3 transforms and transitions
 * in modern browsers and inspired by the idea behind prezi.com.
 *
 *
 * Copyright 2011-2012 Bartek Szopka (@bartaz), 2016-2024 Henrik Ingo (@henrikingo), 2024 Janis Hutz
 * and 70+ other contributors
 *
 * Released under the MIT License.
 *
 * ------------------------------------------------
 *  authors:  Bartek Szopka, Henrik Ingo, Janis Hutz
 *  version: 3.0.0
 *  url:     http://impress.js.org
 *  source:  http://github.com/impress/impress.js/
 */

// Welcome to the impress.js source code!
// You are one of those who would like to know how impress.js works?
// Let us show you!
// Please note that compared to previous versions of impress, this code is documented in a more technical fashion.

// Important note on the file structure of impress.js, as it has changed with V3:
// -------------------------------------------------------------------------------
// This file contains all the interface definitions and uses various components from the ./lib directory,
// as well as loading impress plugins from the ./plugins directory. A fully built impress.js version
// has all of these files combined into a single file, as to enable a simple include.

// All internal functions are (to be) prefixed with an underscore

( window as any ).impress = () => {
    let initializedElements = {};
    
    /**
     * This function is used to initialize impress. It calls some prep functions and then loads
     * all plugins that are registered. By default, these are the built-in plugins. You can define
     * which plugins are loaded by passing in an array of plugin-functions into the init function
     * @param {Array<String>|undefined}  [pluginsToLoad] An array of plugins to load when initializing impress. Defaults to the built-in plugins that require explicit initialization.
     * @returns {undefined}
    */
    const init = ( pluginsToLoad?: Array<Function> ): undefined => {
        let toBeLoadedPlugins: Array<Function> = [];
        if ( typeof pluginsToLoad !== 'undefined' ) {
           toBeLoadedPlugins = pluginsToLoad;
        }

        // Let's initialize all plugins that have to be initialized
        for ( let plugin in toBeLoadedPlugins ) {
            try {
                toBeLoadedPlugins[ plugin ]();
            } catch ( _e ) {
                // Maybe somebody thinks they are funny to pass in an array of something but functions...
                console.warn( 'impress().init() only accepts an array of functions! What you passed in was an array of ' + typeof( toBeLoadedPlugins[ plugin ] ) );
                return;
            }
        }

        // TODO: Load plugins, check if impress is supported

        // Finally, with init done, send out the 'impress:init' event. 
        // All plugins which use this event to initialize will now be initialized
        document.dispatchEvent( new Event( 'impress:init' ) );
    };

    /**
     * Use this function to create a new element on the canvas of impress.js
     * It is used for example by the "presentation" plugin, which parses the presentation
     * and initializes impress itself. You can also use this function to edit a previously
     * generated element. This allows for example the Overview plugin to work as it does.
     *
     * @param {string} DOMElementID The DOM ID of the element to add to impress
     * @param {object} coordinates An object representing the position in the 3D canvas
     * @param {number} coordinates.x The translation in direction of x-axis
     * @param {number} coordinates.y The translation in direction of y-axis
     * @param {number} coordinates.z The translation in direction of z-axis
     * @param {object} rotation An object representing the rotation around the x, y and z-axis
     * @param {number} rotation.x The rotation in degrees around the x-axis
     * @param {number} rotation.y The rotation in degrees around the y-axis
     * @param {number} rotation.z The rotation in degrees around the z-axis
     * @returns {boolean} Returns true if successful at positioning this element, false, if failed
     */
    const addElement = ( DOMElementID: string, coordinates: { x: number; y: number; z: number; }, rotation: { x: number; y: number; z: number; } ): boolean => {
        if ( DOMElementID === '' || !DOMElementID ) {
            return false;
        }
        coordinates.x = coordinates.x ?? 0;
        coordinates.y = coordinates.y ?? 0;
        coordinates.z = coordinates.z ?? 0;
        rotation.x = rotation.x ?? 0;
        rotation.y = rotation.y ?? 0;
        rotation.z = rotation.z ?? 0;
        initializedElements[ DOMElementID ] = {
            coordinates: coordinates,
            rotation: rotation,
            id: DOMElementID,
        }
        _positionElements();

        // Dispatch event that an element was added
        document.dispatchEvent( new Event( 'impress:addedElement' ) );

        return true;
    };

    /**
     * This function allows you to remove an element from the canvas. Essentially,
     * impress.js just hides this element and ignores it in translations & rotations
     * @param {string} DOMElementID The element that is removed. Has to be the element ID of a DOM element
     * @returns {boolean} Returns true if successful, false if failed.
     */
    const removeElement = ( DOMElementID: string ): boolean => {
        try {
            delete initializedElements[ DOMElementID ];
        } catch ( err ) {
            return false;
        }
        _positionElements();
        
        // Dispatch event that an element was removed
        document.dispatchEvent( new Event( 'impress:removedElement' ) );

        return true;
    };

    /**
     * Internal function that positions elements on the canvas. Called every time a element is added / removed
     * @returns {undefined}
     */
    const _positionElements = (): undefined => {
        // Gets current position and calls moveTo function
        moveTo( getCurrentPos().coordinates, getCurrentPos().rotation );
    }

    /**
     * You can use this function to specify a movement and/or rotation of the canvas.
     * @param {object} coordinates An object of the coordinatest to move to
     * @param {number} coordinates.x The translation in direction of x-axis
     * @param {number} coordinates.y The translation in direction of y-axis
     * @param {number} coordinates.z The translation in direction of z-axis
     * @param {object} rotation An object of the rotation around the axis to get to
     * @param {number} rotation.x The rotation in degrees around the x-axis
     * @param {number} rotation.y The rotation in degrees around the y-axis
     * @param {number} rotation.z The rotation in degrees around the z-axis
     * @returns {promise<boolean>} This promise resolves as a boolean, indicating success or failure
     */
    const moveTo = ( coordinates: object, rotation: object ): Promise<boolean> => {
        return new Promise( ( resolve, reject ) => {
            // Dispatch event telling all plugins that we're moving
            document.dispatchEvent( new Event( 'impress:moving' ) );
        } );
    }

    /**
     * You can use this function to get all registered impress elements.
     * @returns {Array<Object>}
     */
    const getElements = ():Array<Object> => {
        return [];
    }

    /**
     * Returns the current position as an object of form { coordinates: Object, rotation: Object }
     * @returns {Object}
     */
    const getCurrentPos = (): { coordinates: { x: number; y: number; z: number; }, rotation: { x: number; y: number; z: number; } } => {
        return { coordinates: { x: 0, y: 0, z: 0, }, rotation: { x: 0, y: 0, z: 0, } };
    }


    // Return all functions that are exposed by impress
    return {
        init,
        getElements,
        moveTo,
        removeElement,
        addElement,
        getCurrentPos
    };
};
