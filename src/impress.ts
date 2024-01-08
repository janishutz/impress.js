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

window.impress = () => {
    'use strict';

    // this function is used to initialize impress. It calls various private functions that initialize
    // various components
    var init: Function = () => {
        console.log( 'init' );
    };

    // This function can be used to add new elements to the impress 3D-API

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
     * @return {boolean}
     */
    var addElement: Function = ( DOMElementID, coordinates, rotation ) => {
        console.log( 'element added' );
        return true;
    };

    /**
     * This function allows you to remove an element from the virtual canvas. Essentially,
     * impress.js just hides this element and ignores it in translations & rotations
     * @param {string} DOMElementID The element that is removed. Has to be the element ID of a DOM element
     * @return {boolean}
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