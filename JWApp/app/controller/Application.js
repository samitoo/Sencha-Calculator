Ext.define('JWAPP.controller.Application', {

    extend: 'Ext.app.Controller',
    config: {
        refs: {

			calculationsContainer: 'calculationsContainer',
			calculationsList: 'calculationsList',
			contacts: 'contacts',
			contactContainer: 'contactContainer',
			contactInfo: 'contactContainer contactInfo'
        },
        control: {
			calculationsList: { 
				itemtap: 'onCalculationTap'
        	},
			contacts: {
				itemtap: 'onContactTap'
			}
		}
    },
	//Selects calcuation from the list
	onCalculationTap: function(index, id){

		console.log("id is " + id);
		var screen;
		switch(id) {
			case 0:
				this.getCalculationsContainer().push({
					xtype: 'compressionCalc'
				});
				break;
			case 1: 
				this.getCalculationsContainer().push({
					xtype: 'dateCalc'
				});
				break;
			case 2: 
				this.getCalculationsContainer().push({
					xtype: 'pressureCalc'
				});
				break;
			case 3: 
				this.getCalculationsContainer().push({
					xtype: 'unitConversionCalc'
				});
		}
	},
		
		onContactTap: function(list, idx, el, record) {
	   console.log('onContactTap', record);
		if (!this.contact) {
			this.contact = Ext.widget('contact');
		}

		this.contact.setTitle(record.get('city') + ', ' + record.get('state'));
		this.getContactContainer().push(this.contact);
		
		record.data.full_addr = record.data.addr.replace(/ /g,"%20") + '+' + record.data.city + '+,' + record.data.state + '+' + record.data.zip;
		
		record.data.tel = (record.data.tel != '') ? '<span>Tel:</span> <a href="tel:' + record.data.tel + '">' + record.data.tel + '</a>' : '';
		record.data.tel2 = (record.data.tel2 != '') ? '<br /><span>&nbsp;</span> <a href="tel:' + record.data.tel2 + '">' + record.data.tel2 + '</a>' : '';
		record.data.fax = (record.data.fax != '') ? '<br /><span>Fax:</span> ' + record.data.fax : '';
		this.getContactInfo().setRecord(record);
		
		map = this.contact.down('map');
		
		var position = new google.maps.LatLng(record.get('latitude'), record.get('longitude')),
			infoWindow = new google.maps.InfoWindow({ content: record.get('program') }),
			map, marker;
		
		map.setMapOptions({
			center: position
		});
		
		marker = new google.maps.Marker({
	        position: position,
	        map: map.getMap(),
	        visible: true
	    });

	    google.maps.event.addListener(marker, 'click', function() {
	        infoWindow.open(map, marker);
	    });
	},
	
    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
        console.log('launch');
    },
    init: function () {
        this.callParent(arguments);
        console.log('init');
		
		Ext.Viewport.element.dom.addEventListener('click', function (e) {
//			console.log('clicked', e);
			if (e.target.tagName !== 'A') {
				return;
			};
			
			e.preventDefault();
			var href = e.target.getAttribute('href');
			
			console.log('link hijacked: ' + href);
			
			if (/tel:/.test(href) || /mailto:/.test(href)) {
				console.log('try to call: ' + href);
				//window.location.assign(href);
				document.location.href = href;
			} else {			
				window.open(href, '_blank', 'location=no,EnableViewPortScale=yes');
			}
		}, false);
		
		
		
		

	}
});