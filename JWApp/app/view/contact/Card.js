Ext.define('JWAPP.view.contact.Card', {
    extend: 'Ext.NavigationView',
    xtype: 'contactContainer',

    config: {

        title: 'Contacts',
        iconCls: 'address_book',

        autoDestroy: false,

        items: [
            { xclass: 'JWAPP.view.contact.List' }
        ]
    }
});
