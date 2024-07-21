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
// A lot has changed compared to V2, so re-reading the code or documentation is highly recommended before you start
// developing and updating plugins. There is a guide on how to migrate plugins from API V2 to API V3.

// Important note on the file structure of impress.js, as it has changed with V3:
// -------------------------------------------------------------------------------
// This file contains all the interface definitions and uses various components from the ./lib directory,
// as well as loading impress plugins from the ./plugins directory. A fully built impress.js version
// has all of these files combined into a single file, to allow for simple includes in simple webpages

// All internal functions are (to be) prefixed with an underscore

class ImpressNotSupportedError extends Error {}
class ImpressInitError extends Error {}

class ImpressConfig {
    // eslint-disable-next-line max-params
    constructor( width, height, perspective, transitionDuration, maxScale, minScale ) {
        this.width = width;
        this.height = height;
        this.perspective = perspective;
        this.transitionDuration = transitionDuration;
        this.maxScale = maxScale;
        this.minScale = minScale;
    }
}

/**
 * This is the main impress.js function and is used to prepare the DOM for the usage of impress.
 * @param {ImpressConfig?} impressConfig Optional argument to specify config. Can be changed later on with the impress().updateConfig() function.
 * @returns {object} Returns all public impress functions
 */
window.impress = ( impressConfig ) => {
    // Somehow eslint didn't like the variable being reassigned inside of a function...
    // So I had it shut up
    // eslint-disable-next-line prefer-const
    let initializedElements = {};

    // Check if impress is supported. We use the CSS.supports API which is supported in all
    // browsers except IE, for which we dropped support with V3 to move forward with state-of-the-art
    // CSS & JS features.
    // eslint-disable-next-line no-warning-comments
    // TODO: Add additional required elements to checks as well

    const isImpressSupported = ( CSS !== undefined ) && CSS.supports( 'perspective', '100px' ) && ( document.body.classList ) && document.body.dataset;
    if ( !isImpressSupported ) {
        // We can't be sure that classList exists, so let's better not use it
        document.body.className += ' impress-not-supported';
    } else {
        document.body.classList.remove( 'impress-not-supported' );
        document.body.classList.add( 'impress-supported' );
    }

    /**
     * This function is used to initialize impress. It calls some prep functions and then loads
     * all plugins that are registered. By default, these are the built-in plugins. You can define
     * which plugins are loaded by passing in an array of plugin-functions into the init function
     * @param {Array<String>|undefined}  [pluginsToLoad] An array of plugins to load when initializing impress. Defaults to the built-in plugins that require explicit initialization.
     * @returns {undefined}
    */
    const init = ( pluginsToLoad ) => {
        // Check if impress is supported and refuse to init, if not supported.
        if ( !isImpressSupported ) {
            throw new ImpressNotSupportedError( 'Your browser does not support all required CSS attributes. Impress.js can therefore not be started. You will see a simplified version of the presentation.' );
        }

        // Set default set of plugins to initialize on init or, if pluginsToLoad is defined,
        // use the plugins array to load
        let toBeLoadedPlugins = [];
        if ( typeof pluginsToLoad !== 'undefined' ) {
            toBeLoadedPlugins = pluginsToLoad;
        }

        // Let's initialize all plugins that have to be initialized
        for ( const plugin in toBeLoadedPlugins ) {
            if ( typeof ( toBeLoadedPlugins[ plugin ] ) === 'function' ) {
                toBeLoadedPlugins[ plugin ]();
            } else {
                // Maybe somebody thinks they are funny to pass in an array of something but functions...
                console.warn( 'impress().init() only accepts an array of functions! The array you passed also contained an element of type ' + typeof ( toBeLoadedPlugins[ plugin ] ) + '. Impress will load regardless, but this element will be ignored' );
            }
        }

        // Get the main #impress element and create #impress div if none was found
        var impressMain = document.getElementById( 'impress' );
        if ( impressMain === null ) {
            impressMain = document.createElement( 'div' );
            impressMain.id = 'impress';
        }

        console.log( impressMain.dataset );
        // If config is passed in via argument, don't use the dataset from the main div, otherwise, parse it
        if ( !impressConfig ) {
            impressConfig = new ImpressConfig();
        }

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
     * @returns {boolean} Returns true if successful at positioning this element, false, if failed. Will also emit the "impress:addedElement" event to tell plugins that an element was added
     */
    const addElement = ( DOMElementID, coordinates, rotation ) => {
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
            id: DOMElementID
        };
        positionElements();

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
    const removeElement = ( DOMElementID ) => {
        try {
            delete initializedElements[ DOMElementID ];
        } catch ( err ) {
            return false;
        }
        positionElements();
        // Dispatch event that an element was removed
        document.dispatchEvent( new Event( 'impress:removedElement' ) );

        return true;
    };

    /**
     * Internal function that positions elements on the canvas. Called every time a element is added / removed
     * @returns {undefined}
     */
    const positionElements = () => {
        // Gets current position and calls moveTo function
        moveTo( getCurrentPos().coordinates, getCurrentPos().rotation );
    };

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
     * @returns {promise<boolean>} The returned promise resolves as a boolean, indicating success or failure
     */
    const moveTo = ( coordinates, rotation ) => new Promise( ( resolve, reject ) => {
        // Dispatch event telling all plugins that we're moving
        document.dispatchEvent( new Event( 'impress:moving' ) );
        console.log( coordinates, rotation );
        if ( typeof ( coordinates ) === 'object' ) {
            // Dispatch event telling all plugins that we've stopped moving
            document.dispatchEvent( new Event( 'impress:movingComplete' ) );
            resolve( true );
        } else {
            reject( new Error( 'moveTo takes a coordinate and rotation object as arguments' ) );
        }
    } );

    /**
     * You can use this function to get all registered impress elements.
     * @returns {object} Returns an object containing all initialized elements
     */
    const getElements = () => initializedElements;

    /**
     * Get the current position of the camera
     * @returns {object} Returns an object that contains an object of the coordinates and rotation:
     * { coordinates: { x: number, y: number, z: number }, rotation: { x: number, y: number, z: number }
     */
    const getCurrentPos = () => ( { coordinates: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } } );


    /**
     * Use this function to get the current impress config
     * @returns {ImpressConfig} Returns the current impress config
     */
    const getCurrentConfig = () => impressConfig;

    /**
     * Update the impress config.
     * @param {ImpressConfig} impressConfigs The new impress config
     * @returns {undefined} Returns nothing
     */
    const updateConfig = ( impressConfigs ) => {
        impressConfig = impressConfigs;
    };

    // Return all functions that are exposed by impress. This is superior to using classes as we can control what functions we expose.
    return {
        init,
        getElements,
        moveTo,
        removeElement,
        addElement,
        getCurrentPos,
        getCurrentConfig,
        updateConfig
    };
};
