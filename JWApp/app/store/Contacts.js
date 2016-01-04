Ext.define('JWAPP.store.Contacts', {
    extend: 'Ext.data.Store',
	requires: 'Ext.data.proxy.Ajax',
    config: {
        model: 'JWAPP.model.Contact',
		autoLoad: true,
		sorters: 'city',
		/*grouper: {
			groupFn: function(record) {
				return record.get('client_name')[0];
			}
		},*/
        proxy: {
            type: 'ajax',
            id: 'contacts-app-store',
            url: 'http://jwapp.synapse-cms.com/app/data/contacts.cfm'
        }
    }
});

