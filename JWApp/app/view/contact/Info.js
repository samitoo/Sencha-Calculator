Ext.define('JWAPP.view.contact.Info', {
	extend: 'Ext.Component',
	xtype: 'contactInfo',

	config: {
		cls: 'contactInfo',
		tpl: [
			'<div class="avatar avatar-{client_name}"></div>',			
			'<div class="program"><a href="mailto:{email}" class="email">{program}</a></div>',			
			'<div class="address">{addr}</div>',
			'<div class="city">{city}, {state} {zip}</div>',
			'<div class="actions"><a href="http://maps.google.com/maps?daddr={full_addr}" class="directions" target="_blank">Directions</a></div>',
			'<div class="numbers">{tel} {tel2} {fax}</div>'
		].join('')
	}
});
