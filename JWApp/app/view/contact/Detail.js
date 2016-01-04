Ext.define('JWAPP.view.contact.Detail', {
	extend: 'Ext.Container',
	requires: [
		'Ext.Map'
	],
	xtype: 'contact',

	config: {
		layout: 'vbox',
		scrollable: false,

		title: '',

		items: [
			{
				xtype: 'contactInfo'
			},
            {
                xtype: 'map',
				id: 'contactMap',
                flex: 1,
                mapOptions: {
                    zoomControl: false,
                    panControl: false,
                    rotateControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    zoom: 13
                }
            }
		]
	}
});
