Ext.define('JWAPP.view.contact.List', {
	extend: 'Ext.List',
	xtype: 'contacts',
	alias: 'widget.contacts',
	
	config: {
		title: 'Contacts',
		store: 'Contacts',
		itemTpl: [
			'<div class="contact">',
			'<div class="avatar avatar-{client_name}"></div>',
			'<div class="city">{city}, {state}</div>',
			'<div class="program">{program}</div>',
			'</div>'
		].join('')
	},
	emptyText: '<div class="list-empty-text"><p>No items found.</p></div>',

	initialize: function() {
		this.callParent();
	}
});

