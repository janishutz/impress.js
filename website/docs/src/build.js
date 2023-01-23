/*
*
*   impress.js website - build.js
*
*   Developed 2023 by Janis Hutz
*
*/

/*
    We will convert certain MD files to html and include them in the documentation. This mostly includes the plugin documentation.
    If there is no MD file in the directory, there will be no documentation. The script will also automatically build the nav menu
    and copy all the necessary files to the correct places.
*/

const fs = require( 'fs' );
const path = require( 'path' );
const mdhtml = require( 'markdown-it' );
const md2html = new mdhtml();
const docRoot = path.join( __dirname + '/../' );

const pluginsPath = path.join( __dirname + '/../../../src/plugins' );

let plugins = fs.readdirSync( pluginsPath );
delete plugins[0];

for ( let item in plugins ) {
    fs.readFile( path.join( pluginsPath + '/' + plugins[item] + '/README.md' ), ( error, data ) => {
        if ( error ) {
            parseJS( path.join( pluginsPath + '/' + plugins[item] ) );
        } else {
            storeHTML( md2html.render( '' + data ), plugins[item] );
        };
    } );
}

generateNav ();


function parseJS ( filepath ) {
    console.log( 'no readme found for ' + filepath );
    let jsFiles = fs.readdirSync( filepath );
}

function checkLinks ( html ) {
    
}

function storeHTML ( html, path ) {
    let fileOut = `<!DOCTYPE html>
    <html>
        <head>
        <title>Docs - impress.js</title>
        <!--I am using jquery for button animations.-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/dark.min.css">
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
        <script>hljs.highlightAll();</script>
        <script src="/js/docs/loader.js"></script>
        <link rel="stylesheet" href="/css/docs/style.css">
    </head>
    <body>
        <div class="content">
            <div id="nav"></div>
            <div id="top"></div>
            <div id="docPage">
                <div id="doc-container">
                    ` + html 
                    + `</div>
                </div>
                <div id="footer"></div>
            </div>
        </body>
    </html>`;
    fs.writeFileSync( docRoot + '/plugins/' + path + '.html', fileOut );
}


function generateNav () {
    let fileStruct = `<!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <link rel="stylesheet" href="/css/docs/navstyle.css">
        </head>
        <body>
            <div class="nav-container">
                <a class="logo-container" href="/"><img class="logo" src="/assets/apple-touch-icon.png" alt="impress-logo"></a>
                <div class="nav-wrapper">
                    <div class="nav-list">
                    <a class="navitem" id="home" href="/docs">Home</a>
                    <a class="navitem" id="gettingStarted" href="/docs/gettingStarted.html">Getting Started</a>
                    <a class="navitem" id="referenceNav" onclick="toggleList( 'reference' );">API reference</a>
                    <div class="dropdown" id="reference">
                        <a class="nav-subitem" id="root" href="/docs/reference">Home</a>
                        <a class="nav-subitem" id="root" href="/docs/reference/root">Root element</a>
                    </div>
                    <a class="navitem" id="pluginsNav" onclick="toggleList( 'plugins' );">Plugins</a>
                    <div class="dropdown" id="plugins">
                    `;
    for ( let item in plugins ) {
        fileStruct += `<a class="nav-subitem" id="${ plugins[item] }" href="/docs/plugins/${ plugins[item] }.html">${ plugins[item] }</a>`;
    }
    fileStruct += `</div>
                    <a class="navitem" id="contributingNav" onclick="toggleList( 'contributing' );">Contributing</a>
                    <div class="dropdown" id="contributing">
                        <a class="nav-subitem" id="contributing-gettingStarted" href="/docs/contributing/gettingStarted.html">Getting Started</a>
                    </div>
                </div>
            </div>
        </div>
    </body>
    <script src="/js/docs/nav.js"></script>
</html>`;
    fs.writeFileSync( docRoot + '/nav.html', fileStruct );
}