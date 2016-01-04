Ext.define('JWAPP.view.calculations.UnitConversion', {
	extend: "Ext.form.Panel",
	requires:[
		'Ext.form.*',
		'Ext.field.*',
		'Ext.MessageBox'
	],
	xtype: 'unitConversionCalc',

    config: {
		title: 'Emissions',
		itemId: 'dateCalculator',
    iconCls: 'calculator',
		layout: 'vbox',
		scrollable: 'vertical',
    autoDestroy: false,		
    items: [
			
		  	{
				xtype: 'fieldset',
				cls: 'calc',
				defaults: {
				labelWidth: '50%'
			},
			items: [
				{
					xtype: 'numberfield',
                        itemId: 'NOx',
						name: 'NOx',
						label: 'NOx (PPM)',
						value: 10,
						placeHolder: ''
				},
				{
					xtype: 'numberfield',
                        itemId: 'CO',
						name: 'CO',
						label: 'CO (PPM)',
						value: 10,
						placeHolder: ''
				},
				{
					xtype: 'numberfield',
                        itemId: 'VOC',
						name: 'VOC',
						label: 'VOC (PPM)',
						value: 10,
						placeHolder: ''
				}, 
				{
					xtype: 'numberfield',
                        itemId: 'BSFC',
						name: 'BSFC',
						label: 'BSFC',
						value: 7000,
						placeHolder: ''
				},
				{
					xtype: 'numberfield',
                        itemId: 'Horsepower',
						name: 'Horsepower',
						label: 'HP (BHP)',
						value: 10,
						placeHolder: ''
				},
				{
					xtype: 'numberfield',
                        itemId: 'OxygenPercent',
						name: 'OxygenPercent',
						label: 'O2 Percent',
						value: 0,
						placeHolder: ''
				},
				{
					xtype: 'selectfield',
						itemId: 'richLean',
						label: 'Rich or Lean',
						options: [
							{text: '',  value: 'Empty'},
							{text: 'Rich',  value: 'Rich'},
							{text: 'Lean', value: 'Lean'}
							]
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
							labelWidth: '50%'
						},
						items: [
							//Grams
							{
								xtype: 'textfield',
								name: 'NOxGramsHpHr_total',
								label: 'NOx (grams / hp-hr)',
								value: 'NA',
								clearIcon: false,
								readOnly: true
							},
							{
								xtype: 'textfield',
								name: 'COGramsHpHr_total',
								label: 'CO (grams / hp-hr)',
								value: 'NA',
								clearIcon: false,
								readOnly: true
							},
							{
								xtype: 'textfield',
								name: 'VOCGramsHpHr_total',
								label: 'VOC (grams / hp-hr)',
								value: 'NA',
								clearIcon: false,
								readOnly: true
							},
							//Pounds / hour
							{
								xtype: 'textfield',
								name: 'NOxLbHr_total',
								label: 'NOx (lbs / hr)',
								value: 'NA',
								clearIcon: false,
								readOnly: true
							},
							{
								xtype: 'textfield',
								name: 'COLbHr_total',
								label: 'CO (lbs / hr)',
								value: 'NA',
								clearIcon: false,
								readOnly: true
							},
							{
								xtype: 'textfield',
								name: 'VOCLbHr_total',
								label: 'VOC (lbs / hr)',
								value: 'NA',
								clearIcon: false,
								readOnly: true
							},
							//Tons / Year
							{
								xtype: 'textfield',
								name: 'NOxTonsYear_total',
								label: 'NOx (tons / year)',
								value: 'NA',
								clearIcon: false,
								readOnly: true
							},
							{
								xtype: 'textfield',
								name: 'COTonsYear_total',
								label: 'CO (tons / year)',
								value: 'NA',
								clearIcon: false,
								readOnly: true
							},
							{
								xtype: 'textfield',
								name: 'VOCTonsYear_total',
								label: 'VOC (tons / year)',
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
				delegate: '#NOx',
				event: 'blur',
				fn: 'calculate'
			},
			{
				delegate: '#CO',
				event: 'blur',
				fn: 'calculate'
			},
			{
				delegate: '#VOC',
				event: 'blur',
				fn: 'calculate'
			},
			{
				delegate: '#BSFC',
				event: 'blur',
				fn: 'calculate'
			},
			{
				delegate: '#Horsepower',
				event: 'blur',
				fn: 'calculate'
			},
			{
				delegate: '#OxygenPercent',
				event: 'blur',
				fn: 'calculate'
			},
			{
				delegate: '#richLean',
				event:'change',
				fn: 'calculate'
			},
			{
				delegate: '#BSFC',
				event: 'blur',
				fn: 'validate'
			},
			{
				delegate: '#Horsepower',
				event: 'blur',
				fn: 'validate'
			},
			{
				delegate: '#OxygenPercent',
				event: 'blur',
				fn: 'validate'
			},
			{
				delegate: '#richLean',
				event:'change',
				fn: 'validate'
			}
			
			
		]
    },
	calculate: function(text) {
		
		var thisForm = this;
		
		setTimeout(function() {			
		var values = thisForm.getValues();
		console.log('calculate()', values);
		
		//Var's for inputs
		var NOx = parseFloat(values.NOx);
		var CO = parseFloat(values.CO);
		var VOC = parseFloat(values.VOC);
		var BSFC = parseFloat(values.BSFC);
		var HP = parseFloat(values.Horsepower);
		var O2 = parseFloat(values.OxygenPercent);
		
		//Calculate NOx
		var NOxlbHr = (0.00000000104 * NOx *(BSFC * HP) * (20.9/(20.9-O2)));
		var NOxTonsYear = (NOxlbHr *8760*0.0005);
		var NOxGramsHpHr = (NOx * BSFC * 0.000000472*(20.9/(20.9-O2)));
		
		//Set NOx Values
		thisForm.setValues({NOxLbHr_total: parseFloat(NOxlbHr).toFixed(2)});
		thisForm.setValues({NOxTonsYear_total: parseFloat(NOxTonsYear).toFixed(2)});
		thisForm.setValues({NOxGramsHpHr_total: parseFloat(NOxGramsHpHr).toFixed(2)});
		
		//Calculate CO
		var COlbHr = (0.000000000633043 * CO * (BSFC * HP) * (20.9/(20.9-O2)));
		var COTonsYear = (COlbHr * 8760 * 0.0005);
		var COGramsHpHr = (CO * BSFC * 0.000000287 *(20.9/(20.9-O2)));
		
		//Set CO Values
		thisForm.setValues({COLbHr_total: parseFloat(COlbHr).toFixed(2)});
		thisForm.setValues({COTonsYear_total: parseFloat(COTonsYear).toFixed(2)});
		thisForm.setValues({COGramsHpHr_total: parseFloat(COGramsHpHr).toFixed(2)});
		
		//Calculate VOC
		var VOClbHr = (0.00871*0.0000000415 * VOC * (BSFC * HP) * (20.9/(20.9-O2)));
		var VOCTonsYear = (VOClbHr * 8760 * 0.0005);
		var VOCGramsHpHr = (VOC * BSFC * 0.000000164*(20.9/(20.9-O2)));
		
		//Set VOC Values
		thisForm.setValues({VOCLbHr_total: parseFloat(VOClbHr).toFixed(2)});
		thisForm.setValues({VOCTonsYear_total: parseFloat(VOCTonsYear).toFixed(2)});
		thisForm.setValues({VOCGramsHpHr_total: parseFloat(VOCGramsHpHr).toFixed(2)});
		
			
		}, 200);
    },
	
	validate: function(text) {
		
		var thisForm = this;
		
		setTimeout(function() {			
			var values = thisForm.getValues();
			console.log('Value validate()', values);	
			
			//Setting default values
			if (values.partsPerMil == null) thisForm.setValues({partsPerMil: ''});
			if (values.BSFC == null) thisForm.setValues({BSFC: ''});
			if (values.Horsepower == null) thisForm.setValues({Horsepower: ''});
			if (values.OxygenPercent == null) thisForm.setValues({OxygenPercent: ''});
			
			//Var's for inputs
			var BSFC = parseFloat(values.BSFC);
			var HP = parseFloat(values.Horsepower);
			var O2 = parseFloat(values.OxygenPercent);
			var RL = Ext.getCmp('richLean').getValue();
			
			//Validate BSFC btwn 7000-9000
			if ((BSFC <  7000 || BSFC > 9000) || isNaN(BSFC)) {
				hideKeyboard();
				Ext.Msg.alert('Error', 'If unknown, use 8500 for rich burn and 7500 for lean burn.', function(){
					thisForm.setValues({BSFC: 7000});					
				});
			}
			
			//Validate Horsepower btwn 10 - 3000
			if ((HP <  10 || HP > 3000) || isNaN(HP)) {
				hideKeyboard();
				Ext.Msg.alert('Error', 'Value must be between 10 and 3000.', function(){
					thisForm.setValues({Horsepower: 10});					
				});
			}
			
			//Validate Oxygen btwn 0 - 15
			if ((O2 < 0 || O2 > 15) || isNaN(O2)) {
				hideKeyboard();
				Ext.Msg.alert('Error', 'Value must be between 0 and 15.', function(){ //Value must be between 10 and 3000.
					thisForm.setValues({OxygenPercent: 10});					
				});
			}
			
			//Check for Rich or lean selection from select field
			if(RL == 'Rich'){
				thisForm.setValues({BSFC:8500});
			}
			
			if(RL == 'Lean'){
				thisForm.setValues({BSFC:7500});
			}
		
		}, 200);
	},
	
	initialize: function() {
		console.log('datCalc init');
		
		this.calculate();
	},
	showCompCalc: function(el, button){
		console.log('showCompCalc');
		this.fireEvent('showCompCalc', el, button);
	}
});