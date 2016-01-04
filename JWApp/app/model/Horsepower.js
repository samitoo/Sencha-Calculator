Ext.define('JWAPP.model.Horsepower', {
    extend: 'Ext.data.Model',
	
    config: {
        fields: [
            { name: 'pressure_ratios', type: 'string' },
            { name: 'compression_stages', type: 'string' },
            { name: 'pressure_ratios_state', type: 'string' },
            { name: 'discharge_temp', type: 'string' },
            { name: 'compressor_horsepower', type: 'string' },
            { name: 'auxillary_horsepower', type: 'string' },
            { name: 'total_horsepower', type: 'string' }
        ],
        validations: [
        ]
    }
});