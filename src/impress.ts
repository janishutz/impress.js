/* ! Licensed under MIT License - http://github.com/impress/impress.js */
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

// Welcome to the impress.js source code
// You are one of those who would like to know how impress.js works?
// Let us show you!
// NOTE that compared to previous versions of impress, this code is documented in a more technical fashion.

// Important note on the file structure of impress.js, as it has changed with V3
// This file contains all the interface definitions and uses various components from the ./lib directory,
// as well as loading impress plugins from the ./plugins directory. A fully built impress.js version
// has all of these files combined into a single file, as to enable a simple include.

interface Window {
    impress: Function;
}

window.impress = () => {
    /**
     * This function is used to initialize impress. It calls some prep functions and then loads
     * all plugins that are registered. By default, these are the built-in plugins. You can define
     * which plugins are loaded by passing in an array of plugin-functions into the init function
     * @param {Array<String>}  [pluginsToLoad]
     * @returns {undefined}
     */
    var init: Function = ( pluginsToLoad?: Array<String> ): undefined => {
        if ( typeof pluginsToLoad !== 'undefined' ) {

        }
        console.log( 'init' );
    };

    /**
     * Use this function to create a new element on the virtual canvas of impress.js
     * It is used for example by the "presentation" plugin, which parses the presentation
     * and initializes impress itself. You can also use this function to edit a previously
     * generated element. This allows for example the Overview plugin to work as it does.
     *
     * Returns true if successful at positioning this element, false, if failed
     * @param {string} DOMElementID
     * @param {object} coordinates
     * @param {number} coordinates.x The translation in direction of x-axis
     * @param {number} coordinates.y The translation in direction of y-axis
     * @param {number} coordinates.z The translation in direction of z-axis
     * @param {object} rotation
     * @param {number} rotation.x The rotation in degrees around the x-axis
     * @param {number} rotation.y The rotation in degrees around the y-axis
     * @param {number} rotation.z The rotation in degrees around the z-axis
     * @returns {boolean}
     */
    var addElement: Function = ( DOMElementID: string, coordinates: { x: number; y: number; z: number; }, rotation: { x: number; y: number; z: number; } ): boolean => {
        console.log( 'element added' );
        return true;
    };

    /**
     * This function allows you to remove an element from the virtual canvas. Essentially,
     * impress.js just hides this element and ignores it in translations & rotations
     * @param {string} DOMElementID The element that is removed. Has to be the element ID of a DOM element
     * @returns {boolean}
     */
    var removeElement = ( DOMElementID: string ): boolean => {
        return true;
    };

    /**
     * Description
     * @param {object} coordinates
     * @param {object} rotation
     * @returns {promise}
     */
    var moveTo = ( coordinates: object, rotation: object ): Promise<any> => {
        return new Promise( ( resolve, reject ) => {
            
        } );
    }

    return {
        init
    };
};