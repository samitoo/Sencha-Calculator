Ext.define('JWAPP.view.Contacts', {
    extend: "Ext.List",
	xtype: 'contactsView',

    config: {
		title: 'Contacts',
        iconCls: 'address_book',
        autoDestroy: false,
		ui: 'normal',
		store: 'Contacts',	
        itemTpl: [
			'<div class="contact">',
			'<div class="city">{city} {state}</div>',
			'<div class="program">{program}</div>',
			'</div>'
		].join(''),
		emptyText: '<div class="list-empty-text"><p>No items found.</p></div>'
    }
});