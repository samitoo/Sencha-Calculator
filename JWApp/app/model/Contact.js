Ext.define('JWAPP.model.Contact', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'client_name', type: 'string' },
            { name: 'program', type: 'string' },
            { name: 'addr', type: 'string' },
            { name: 'city', type: 'string' },
            { name: 'state', type: 'string' },
            { name: 'zip', type: 'string' },
			{ name: 'full_addr', type: 'string' },
            { name: 'tel', type: 'string' },
            { name: 'tel2', type: 'string' },
            { name: 'fax', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'zone', type: 'string' },
            { name: 'latitude', type: 'string' },
            { name: 'longitude', type: 'string' }
        ],
        validations: [
        ]
    }
});
