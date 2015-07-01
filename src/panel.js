function inject() {

	window.addEventListener( 'load', function() {
		if ( scene !== undefined ) {
			window.postMessage( { source: JSON.stringify( scene.toJSON() ), method: 'inspect' }, '*');
		}
	} );

}

var editor = document.getElementById( 'editor' );

var backgroundPageConnection = chrome.runtime.connect({
	name: 'panel'
});

backgroundPageConnection.postMessage({
	name: 'init',
	tabId: chrome.devtools.inspectedWindow.tabId
});

backgroundPageConnection.onMessage.addListener( function( msg ) {

	switch ( msg.method ) {
		case 'inject':
			chrome.devtools.inspectedWindow.eval( '(' + inject.toString() + ')()' );
			break;
		case 'inspect':
			editor.contentWindow.postMessage( JSON.parse( msg.source ), 'http://localhost:8000' );
			break;
	}

} );
