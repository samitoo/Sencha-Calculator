Ext.define('JWAPP.store.Calculations', {
    extend: 'Ext.data.Store',
    config: {
		model: 'JWAPP.model.Calculations',
		data:[
			{calculationName: '<div class="contact"><div class="avatar avatar-hp"></div><div class="calculation-name">Horsepower</div></div>'},
			{calculationName: '<div class="contact"><div class="avatar avatar-date"></div><div class="calculation-name">Date</div></div>'},
			{calculationName: '<div class="contact"><div class="avatar avatar-weymouth"></div><div class="calculation-name">Weymouth</div></div>'},
			{calculationName: '<div class="contact"><div class="avatar avatar-unit"></div><div class="calculation-name">Emissions Conversions</div></div>'}
		 	 ],
		
        },

});

