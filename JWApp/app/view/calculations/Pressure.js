Ext.define('JWAPP.view.calculations.Pressure', {
    extend: "Ext.form.Panel",
    requires:[
		'Ext.form.*',
        'Ext.field.*',
		'Ext.MessageBox',
		'Ext.SegmentedButton'
	],
	xtype: 'pressureCalc',

    config: {
		title: 'Weymouth Calculator',
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
                        itemId: 'inlet_pressure',
						name: 'inlet_pressure',
						label: 'Inlet Pressure (PSIG)',
						value: 100,
						placeHolder: ''
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'outlet_pressure',
						name: 'outlet_pressure',
						label: 'Outlet Pressure (PSIG)',
						value: 1,
						placeHolder: ''
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'pipe_length',
						name: 'pipe_length',
						label: 'Length of Pipe (MI)',
						value: 1,
						placeHolder: ''
                    },
					{
                        xtype: 'numberfield',
                        itemId: 'pipe_diameter',
						name: 'pipe_diameter',
						label: 'Internal Diameter (IN)',
						value: .154,
						placeHolder: ''
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'specific_gravity',
						name: 'specific_gravity',
						label: 'Specific Gravity',
						value: .65,
						placeHolder: ''
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'gas_temperature',
						name: 'gas_temperature',
						label: 'Gas Temperature (F)',
						value: 80,
						placeHolder: ''
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'efficiency',
						name: 'efficiency',
						label: 'Efficiency (%)',
						value: 85,
						placeHolder: ''
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
							labelWidth: '55%'
						},
						items: [						
							{
								xtype: 'textfield',
								name: 'flow_rate',
								label: 'Flow Rate (MMSCFD)',
								value: 'NA',
								clearIcon: false,
								readOnly: true
							},
							{
								xtype: 'textfield',
								name: 'flow_rate2',
								label: 'Flow Rate (SCFH)',
								value: 'NA',
								clearIcon: false,
								readOnly: true,
								hidden: true
							},
							{
								xtype: 'textfield',
								name: 'pipe_length_value',
								label: 'Length of Pipe (Miles)',
								value: 'NA',
								clearIcon: false,
								readOnly: true,
								hidden: true
							}
						]
					}
				]                
            }
		],
        listeners: [
			{
				delegate: '#pipe_diameter',
				event: 'keyup',
				fn: 'calculate'
			},
			{
				delegate: '#pipe_diameter',
				event: 'clearicontap',
				fn: 'calculate'
			},
			{
				delegate: '#pipe_diameter',
				event: 'blur',
				fn: 'validate'
			},
			{
				delegate: '#inlet_pressure',
				event: 'keyup',
				fn: 'calculate'
			},
			{
				delegate: '#inlet_pressure',
				event: 'clearicontap',
				fn: 'calculate'
			},
			{
				delegate: '#inlet_pressure',
				event: 'blur',
				fn: 'validate'
			},
			{
				delegate: '#outlet_pressure',
				event: 'keyup',
				fn: 'calculate'
			},
			{
				delegate: '#outlet_pressure',
				event: 'clearicontap',
				fn: 'calculate'
			},
			{
				delegate: '#outlet_pressure',
				event: 'blur',
				fn: 'validate'
			},
			{
				delegate: '#specific_gravity',
				event: 'keyup',
				fn: 'calculate'
			},
			{
				delegate: '#specific_gravity',
				event: 'clearicontap',
				fn: 'calculate'
			},
			{
				delegate: '#specific_gravity',
				event: 'blur',
				fn: 'validate'
			},
			{
				delegate: '#pipe_length',
				event: 'keyup',
				fn: 'calculate'
			},
			{
				delegate: '#pipe_length',
				event: 'clearicontap',
				fn: 'calculate'
			},
			{
				delegate: '#pipe_length',
				event: 'blur',
				fn: 'validate'
			},
			{
				delegate: '#gas_temperature',
				event: 'keyup',
				fn: 'calculate'
			},
			{
				delegate: '#gas_temperature',
				event: 'clearicontap',
				fn: 'calculate'
			},
			{
				delegate: '#gas_temperature',
				event: 'blur',
				fn: 'validate'
			},
			{
				delegate: '#efficiency',
				event: 'keyup',
				fn: 'calculate'
			},
			{
				delegate: '#efficiency',
				event: 'clearicontap',
				fn: 'calculate'
			},
			{
				delegate: '#efficiency',
				event: 'blur',
				fn: 'validate'
			},
			{
				delegate: '#compPressureNav',
				event: 'toggle',
				fn: 'showPressureCalc'
			}
		]
    },
	calculate: function(text) {
		//var values = this.getValues();
		//console.log('calculate()', values);
		
		var thisForm = this;
		
		setTimeout(function() {			
			var values = thisForm.getValues();
			console.log('pressure calculate()', values);
			
			// inputs
			var PD=parseFloat(values.pipe_diameter)
			var IP=parseFloat(values.inlet_pressure)
			var OP=parseFloat(values.outlet_pressure)
			var SG=parseFloat(values.specific_gravity)
			var PL=parseFloat(values.pipe_length)
			var GT=parseFloat(values.gas_temperature)
			var EF=parseFloat(values.efficiency)
		
			// Length of Pipe
			var PLV="NA"
			// Flow Rate (SCFH)
			var FR="NA"
			// Flow Rate (MMSCFD)
			var FR2="NA"
		
		
			if ( (! isNaN(PD)) && (! isNaN(IP)) && (! isNaN(OP)) && (! isNaN(SG)) && (! isNaN(PL)) && (! isNaN(GT)) ) {				
				PLV = PL / 5280
				//FR = 28*Math.pow(PD,2.666666666667)*Math.sqrt((Math.pow(IP+14.7,2)-Math.pow(OP+14.7,2))/(SG*PLV)*(520/(460+GT)))
				FR = (433.5*(520/14.73)*EF*Math.pow((Math.pow(IP+14.7, 2)-Math.pow(OP+14.7, 2))/(SG*PL*(GT+460)*0.97), 0.5)*Math.pow(PD,2.667))/100000000
				//FS = (433.5*(520/14.73)*C10*(((C4+14.7)^2-(C5+14.7)^2)/(C8*C6*(C9+460)*0.97))^0.5*C7^2.667)/1000000	
				FR2 = FR*24/1000000
				
				console.log('actually calculating', FR, FR2);
		
				//Round them all				
				PLV=Math.round(PLV*100)/100
				//FR=Math.round(FR*1000000)/1000000
				FR2=formatNum(Math.round(FR2*1000)/1000)
			}
			
			thisForm.setValues({
				pipe_length_value: addCommas(PLV),
				flow_rate: addCommas(formatNum(FR)),
				flow_rate2: addCommas(FR2)
			});			
			
		}, 200);
    },
	validate: function(text) {
		//var values = this.getValues();
		//console.log('calculate()', values);
		
		var thisForm = this;
		
		setTimeout(function() {			
			var values = thisForm.getValues();
			console.log('pressure validate()', values);	
			
			if (values.pipe_diameter == null) thisForm.setValues({pipe_diameter: ''});
			if (values.inlet_pressure == null) thisForm.setValues({inlet_pressure: ''});
			if (values.outlet_pressure == null) thisForm.setValues({outlet_pressure: ''});
			if (values.specific_gravity == null) thisForm.setValues({specific_gravity: ''});
			if (values.pipe_length == null) thisForm.setValues({pipe_length: ''});
			if (values.gas_temperature == null) thisForm.setValues({gas_temperature: ''});
			
			// inputs
			var PD=parseFloat(values.pipe_diameter)
			var IP=parseFloat(values.inlet_pressure)
			var OP=parseFloat(values.outlet_pressure)
			var SG=parseFloat(values.specific_gravity)
			var PL=parseFloat(values.pipe_length)
			var GT=parseFloat(values.gas_temperature)
			
			if (IP<OP && !isNaN(IP) && !isNaN(OP)) {
				hideKeyboard();
				Ext.Msg.alert('Error', 'Inlet Pressure must be greater than the Outlet Pressure.', function(){
					thisForm.setValues({inlet_pressure: ''});					
				});
			}
			
			if (!isNaN(SG) && SG > 1) {
				hideKeyboard();
				Ext.Msg.alert('Error', 'Specific Gravity cannot be greater than 1.0.', function(){
					thisForm.setValues({specific_gravity: ''});					
				});
			}
			
			if (!isNaN(GT) && (GT < 0 || GT > 110)) {
				hideKeyboard();
				Ext.Msg.alert('Error', 'Gas Temperature cannot be less than 0 or greater than 110 F.', function(){
					thisForm.setValues({gas_temperature: ''});					
				});
			}
			
		
			// Length of Pipe
			var PLV="NA"
			// Flow Rate (SCFH)
			var FR="NA"
			// Flow Rate (MMSCFD)
			var FR2="NA"
			
			/*if (THE > 10000) {
				hideKeyboard();
				Ext.Msg.alert('Error', 'Total Horsepower Estimation can not be more than 10,000.', function(){
					thisForm.setValues({suction_pressure: '', discharge_pressure: '', capacity: ''});
				});
			}*/
			
			
		}, 200);
    },
	showPressureCalc: function(el, button){
		console.log('showPressureCalc');
		this.fireEvent('showPressureCalc', el, button);
	},
	initialize : function() {
		this.callParent();
		
		this.calculate();
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

function formatNum(n) {
    var a = ((Math.round(n*1000) / 1000) + '').split('.');
    var one = a[0];
    while (one.match(/\d{4}(,|$)/)) one = one.replace(/(\d)(\d{3})(,|$)/, "$1,$2$3");
    var two = (a[1] ? a[1] : '');
    one += (two ? '.':' ');
    while (two.length < 3) two += ' ';
    return one + two;
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