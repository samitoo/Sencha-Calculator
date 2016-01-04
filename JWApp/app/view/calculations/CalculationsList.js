Ext.define('JWAPP.view.calculations.CalculationsList', {
	extend: 'Ext.List',
	xtype: 'calculationsList',
	
	config: {

		Title: 'Calculations',
		itemId: 'calculationsList',
		itemTpl: '{calculationName}',
		store: 'Calculations'
	},
	//emptyText: '<div class="list-empty-text"><p>No items found.</p></div>',
	
	initialize: function() {
		this.callParent();
	}
});
