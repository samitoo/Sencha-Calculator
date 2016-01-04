Ext.define('JWAPP.view.calculations.CalculationsCard', {
	extend: 'Ext.navigation.View',
	xtype: 'calculationsContainer',
	
	
	config: {
		
		title: 'Calculations',
		iconCls: 'calculator',
		
		autoDestroy: false,
		

		items: [
			{xclass: 'JWAPP.view.calculations.CalculationsList'}
		]
	}

});
