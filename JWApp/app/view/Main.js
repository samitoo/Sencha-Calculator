Ext.define('JWAPP.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        tabBar: {
			docked:	'bottom',
			ui: 'dark',
			layout:{
				pack: 'end'
			}
		},
		id: 'jwTabs',
		cls: 'jwTabs',
        items: [
     		{ xclass: 'JWAPP.view.calculations.CalculationsCard'},
			{ xclass: 'JWAPP.view.contact.Card'},
			{ xclass: 'JWAPP.view.About'}
        ]
    }
});
