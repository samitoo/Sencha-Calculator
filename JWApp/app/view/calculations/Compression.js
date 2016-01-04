Ext.define('JWAPP.view.calculations.Compression', {
    extend: "Ext.form.Panel",
    requires:[
		'Ext.form.*',
        'Ext.field.*',
		'Ext.MessageBox',
		'Ext.SegmentedButton'
	],
	xtype: 'compressionCalc',

    config: {
		title: 'Horsepower Calculator',
		itemId: 'calculator',
        iconCls: 'calculator',
		layout: 'vbox',
		scrollable: 'vertical',
        autoDestroy: false,		
        items: [
            {
                xtype: 'fieldset',
				cls: 'calc',
				defaults: {
					labelWidth: '70%'
				},
                items: [
					{
                        xtype: 'numberfield',
                        itemId: 'suction_pressure',
						name: 'suction_pressure',
						label: 'Suction Pressure',
						placeHolder: 'PSIG'
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'discharge_pressure',
						name: 'discharge_pressure',
						label: 'Discharge Pressure',
						placeHolder: 'PSIG'
                    },                
                    {
                        xtype: 'numberfield',
                        itemId: 'capacity',
						name: 'capacity',
						label: 'Capacity',
						placeHolder: 'MMSCFD'
                    }
                ]
            },
			{
				xtype: 'container',
				itemId: 'resultsContainer',
				items: [
					{
						xtype: 'fieldset',
						cls: 'results',
						defaults: {
							labelWidth: '75%'
						},
						items: [
							{
								xtype: 'textfield',
								name: 'pressure_ratios',
								label: 'Pressure Ratios',
								value: 'NA',
								clearIcon: false,
								readOnly: true
							},
							{
								xtype: 'textfield',
								name: 'compression_stages',
								label: 'Compression Stages',
								value: 'NA',
								clearIcon: false,
								readOnly: true
							},
							{
								xtype: 'textfield',
								name: 'pressure_ratios_state',
								label: 'Pressure Ratios / Stage',
								value: 'NA',
								clearIcon: false,
								readOnly: true
							}
							,
							{
								xtype: 'textfield',
								name: 'discharge_temp',
								label: 'Estimate Discharge Temp (Deg F)',
								value: 'NA',
								clearIcon: false,
								readOnly: true
							}
							,
							{
								xtype: 'textfield',
								name: 'compressor_horsepower',
								label: 'Compressor Horsepower Estimation',
								value: 'NA',
								clearIcon: false,
								readOnly: true
							}
							,
							{
								xtype: 'textfield',
								name: 'auxillary_horsepower',
								label: 'Auxillary Horsepower Estimation',
								value: 'NA',
								clearIcon: false,
								readOnly: true,
								hidden: true
							}
							,
							{
								xtype: 'textfield',
								name: 'total_horsepower',
								label: 'Total Horsepower Estimation',
								value: 'NA',
								clearIcon: false,
								readOnly: true
							}
						]
					}
				]                
            }
		],
        listeners: [
			{
				delegate: '#suction_pressure',
				event: 'blur',
				fn: 'calculate'
			},
			{
				delegate: '#discharge_pressure',
				event: 'blur',
				fn: 'calculate'
			},
			{
				delegate: '#capacity',
				event: 'blur',
				fn: 'calculate'
			},
			{
				delegate: '#suction_pressure',
				event: 'clearicontap',
				fn: 'calculate'
			},
			{
				delegate: '#discharge_pressure',
				event: 'clearicontap',
				fn: 'calculate'
			},
			{
				delegate: '#capacity',
				event: 'clearicontap',
				fn: 'calculate'
			},
			{
				delegate: '#sendButton',
				event: 'tap',
				fn: 'sendPR'
			},
			{
				delegate: '#compCalcNav',
				event: 'toggle',
				fn: 'showDateCalc'
			}
		]
    },
	calculate: function(text) {
		//var values = this.getValues();
		//console.log('calculate()', values);
		
		var thisForm = this;
		
		//thisForm.getAt(2).setMasked(false);
		/*thisForm.getAt(2).setMasked({
			xtype: 'loadmask',
			message: 'Calculating...'
		});*/
		
		setTimeout(function() {
			//thisForm.getAt(2).setMasked(false);
			
			var values = thisForm.getValues();
			console.log('calculate()', values);
			
			// inputs
			var SP=parseFloat(values.suction_pressure)
			var DP=parseFloat(values.discharge_pressure)
			var MMSCFD=parseFloat(values.capacity)
			
			if (SP<-14) {
				hideKeyboard();
				Ext.Msg.alert('Error', 'Suction Pressure can not be less than -14 PSIG.', function(){
					thisForm.setValues({suction_pressure: ''});					
				});
			}
			
			if (DP > 6000 && SP != '') {
				hideKeyboard();
				Ext.Msg.alert('Error', 'Discharge Pressure can not be more than 6,000 PSIG.', function(){
					thisForm.setValues({discharge_pressure: ''});					
				});
			}
			
			if (values.discharge_pressure != '' && values.discharge_pressure != null){
				if (values.suction_pressure > values.discharge_pressure){
					console.log('values.discharge_pressure: ' + values.discharge_pressure);
					hideKeyboard();
					Ext.Msg.alert('Error', 'Suction Pressure can not be more than Discharge Pressure.', function(){
						thisForm.setValues({suction_pressure: ''});						
					});
				}
			}
			
		
			// Pressure Ratio
			var PR="NA"
			// Number of Compression Stages
			var NCS="NA"
			//Pressure Ratio per Stage
			var PRS="NA"
			var F="NA"
			//Compressor HorsePower Estimation
			var CHE="NA"
			//Auxillary HorsePower Estimation
			var AHE="NA"
			//Total HorsePower Estimation
			var THE="NA"
			//Estimated Discharge Temperature
			var EDT="NA"
		
		
			if ( (! isNaN(SP)) && (! isNaN(DP)) && (! isNaN(MMSCFD)) ) {		
				PR=(DP+14.700000000001)/(SP+14.700000000001)
				// switch might have version problems..
				if (PR<4.5) {
					NCS=1
				}	
				else { 
					if (PR<14) {
						NCS=2
					}	
					else { 
						NCS=3
					}	
				}		
				
				if (NCS==1) F=1
				if (NCS==2) F=1.08
				if (NCS==3) F=1.1
				
				PRS=Math.pow(PR,1/NCS)
				CHE=22*PRS*NCS*MMSCFD*F*1.05 // Added (*1.05) per spreadsheet
				AHE=0.1*CHE
				THE=CHE+AHE
				EDT=(460+130)*Math.pow(PRS,((1.3-1)/1.3))-460	
		
				//Round them all
				
				PR=Math.round(PR*100)/100
				NCS=NCS
				PRS=Math.round(PRS*100)/100
				CHE=Math.round(CHE*100)/100
				AHE=Math.round(AHE*100)/100
				THE=Math.round(THE*100)/100
				EDT=Math.round(EDT*100)/100
			}
			
			if (THE > 10000) {
				hideKeyboard();
				Ext.Msg.alert('Error', 'Total Horsepower Estimation can not be more than 10,000.', function(){
					thisForm.setValues({suction_pressure: '', discharge_pressure: '', capacity: ''});
				});
			}
			
			var hp = Ext.create('App.model.Horsepower', {
				pressure_ratios: addCommas(PR),
				compression_stages: addCommas(NCS),
				pressure_ratios_state: addCommas(PRS),
				discharge_temp: addCommas(EDT),
				compressor_horsepower: addCommas(CHE),
				auxillary_horsepower: addCommas(AHE),
				total_horsepower: addCommas(THE)
			});
			
			thisForm.setRecord(hp);
			
			if (PR != 'NA') {
				Ext.getCmp('sendButton').setUi('action');
			} else {
				Ext.getCmp('sendButton').setUi('normal');
			}
		}, 200);
    },
	sendPR: function(){
		var values = this.getValues();
		console.log('sendPR()', values);
		
		var thisForm = this;
		
		setTimeout(function() {
			//thisForm.getAt(2).setMasked(false);
			
			var values = thisForm.getValues();
			console.log('calculate()', values);
			
			// inputs
			var SP=parseFloat(values.suction_pressure)
			var DP=parseFloat(values.discharge_pressure)
			var MMSCFD=parseFloat(values.capacity)
		
			// Pressure Ratio
			var PR="NA"
			// Number of Compression Stages
			var NCS="NA"
			//Pressure Ratio per Stage
			var PRS="NA"
			var F="NA"
			//Compressor HorsePower Estimation
			var CHE="NA"
			//Auxillary HorsePower Estimation
			var AHE="NA"
			//Total HorsePower Estimation
			var THE="NA"
			//Estimated Discharge Temperature
			var EDT="NA"
		
		
			if ( (! isNaN(SP)) && (! isNaN(DP)) && (! isNaN(MMSCFD)) ) {		
				PR=(DP+14.700000000001)/(SP+14.700000000001)
				// switch might have version problems..
				if (PR<4.5) {
					NCS=1
				}	
				else { 
					if (PR<14) {
						NCS=2
					}	
					else { 
						NCS=3
					}	
				}		
				
				if (NCS==1) F=1
				if (NCS==2) F=1.08
				if (NCS==3) F=1.1
				
				PRS=Math.pow(PR,1/NCS)
				CHE=22*PRS*NCS*MMSCFD*F*1.05 // Added (*1.05) per spreadsheet
				AHE=0.1*CHE
				THE=CHE+AHE
				EDT=(460+130)*Math.pow(PRS,((1.3-1)/1.3))-460	
		
				//Round them all
				
				PR=Math.round(PR*100)/100
				NCS=NCS
				PRS=Math.round(PRS*100)/100
				CHE=Math.round(CHE*100)/100
				AHE=Math.round(AHE*100)/100
				THE=Math.round(THE*100)/100
				EDT=Math.round(EDT*100)/100
			
				if (values.suction_pressure<-14) {
					hideKeyboard();
					Ext.Msg.alert('Error', 'Suction Pressure can not be less than -14 PSIG.', function(){
						thisForm.setValues({suction_pressure: ''});					
					});
				} else if (values.discharge_pressure > 6000) {
					hideKeyboard();
					Ext.Msg.alert('Error', 'Discharge Pressure can not be more than 6,000 PSIG.', function(){
						thisForm.setValues({discharge_pressure: ''});					
					});
				} else if (values.suction_pressure > values.discharge_pressure) {
					Ext.Msg.alert('Error', 'Suction Pressure can not be more than Discharge Pressure.', function(){
						thisForm.setValues({suction_pressure: ''});
					});
				} else if (THE > 10000) {
					Ext.Msg.alert('Error', 'Total Horsepower Estimation can not be more than 10,000.', function(){
						thisForm.setValues({suction_pressure: '', discharge_pressure: '', capacity: ''});
					});
				} else {
					Ext.Msg.confirm('Email Pricing Request', 'Are you ready to email this request?', function(result){
						if (result == 'yes') {
							/*Ext.Ajax.request({
								url: '/app/data/email.cfm',
								params: values,
								success: function(response){
									Ext.Msg.alert('Success', 'Your email was sent successfully.', function(){
										//
									});
								},
								error: function(response){
									Ext.Msg.alert('Error', 'There was an error sending your email, please try again.', function(){
										//
									});
								}
							});*/
							
							mailHref = [
								'mailto:sales@jwenergy.com?subject=J-W Power App: Pricing Request&body=',
								'Suction Pressure (psig): ' + values.suction_pressure + '%0D%0A',
								'Discharge Pressure (psig): ' + values.discharge_pressure + '%0D%0A',
								'Capacity (MMSCFD): ' + values.capacity + '%0D%0A',
								'%0D%0A',
								'Pressure Ratios: ' + values.pressure_ratios + '%0D%0A',
								'Number of Compression Stages: ' + values.compression_stages + '%0D%0A',
								'Pressure Ratios per Stage: ' + values.pressure_ratios_state + '%0D%0A',
								'Estimate Discharge Temp (Deg F): ' + values.discharge_temp + '%0D%0A',
								'Compressor Horsepower Estimation: ' + values.compressor_horsepower + '%0D%0A',
								'Auxillary Horsepower Estimation: ' + values.auxillary_horsepower + '%0D%0A',
								'Total Horsepower Estimation: ' + values.total_horsepower + '%0D%0A',
							].join('');
							
							document.location.href = mailHref;
						}
					});
				}
			} else {
				Ext.Msg.alert('Error', 'Please make sure all values are filled in.', function(){
					//
				});
			}
		}, 200);
	},
	showDateCalc: function(el, button){
		console.log('showDateCalc');
		this.fireEvent('showDateCalc', el, button);
	}
});


function addCommas(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function hideKeyboard(callback, scope) {
	console.log('hideKeyboard', document.activeElement);
	var activeElement = document.activeElement;
	activeElement.setAttribute('readonly', 'readonly'); // Force keyboard to hide on input field.
	activeElement.setAttribute('disabled', 'true'); // Force keyboard to hide on textarea field.
	Ext.defer(function() {
		activeElement.blur();
		// Remove readonly attribute after keyboard is hidden.
		activeElement.removeAttribute('readonly');
		activeElement.removeAttribute('disabled');
		if(callback) {
			callback.call(scope);
		}
	}, 100);
}