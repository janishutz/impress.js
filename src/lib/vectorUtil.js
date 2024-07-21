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

// Welcome to the vectorUtil.js file. This file exposes various functions for use in calculating with vectors

class Vector {

    /**
     * Description
     * @param {number} x The x-coordinate
     * @param {number} y The y-coordinate
     * @param {number} z The z-coordinate
     * @returns {undefined} Returns nothing
     */
    constructor ( x, y, z ) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

window.impressVectorUtil = () => {

    /**
     * Get the cross product of two vectors (https://en.wikipedia.org/wiki/Cross_product)
     * @param {Vector} vec1 The first vector
     * @param {Vector} vec2 The second vector
     * @returns {Vector} Returns a vector object
     */
    const vectorProduct = ( vec1, vec2 ) => new Vector(
        ( vec1.y * vec2.z ) - ( vec1.z * vec2.y ),
        ( vec1.z * vec2.x ) - ( vec1.x * vec2.z ),
        ( vec1.x * vec2.y ) - ( vec1.y * vec2.x )
    );

    /**
     * Get the dot product of two vectors (https://en.wikipedia.org/wiki/Dot_product)
     * @param {Vector} vec1 The first vector
     * @param {Vector} vec2 The second vector
     * @returns {number} Returns the calculated value of the dot product
     */
    const dotProduct = ( vec1, vec2 ) => ( vec1.x * vec2.x ) + ( vec1.y * vec2.y ) + ( vec1.z * vec2.z );

    /**
     * Get the norm of a vector (https://en.wikipedia.org/wiki/Norm_(mathematics))
     * @param {Vector} vec The vector of which to calculate the norm
     * @returns {number} Returns the norm
     */
    var norm = function( vec ) {
        return Math.sqrt( ( vec.x * vec.x ) + ( vec.y * vec.y ) + ( vec.z * vec.z ) );
    };

    return {
        norm,
        dotProduct,
        vectorProduct
    };
};
