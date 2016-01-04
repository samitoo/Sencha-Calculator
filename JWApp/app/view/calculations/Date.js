Ext.define('JWAPP.view.calculations.Date', {
	extend: "Ext.form.Panel",
	requires:[
		'Ext.form.*',
		'Ext.field.*',
		'Ext.MessageBox'
	],
	xtype: 'dateCalc',
	//alias: 'widget.dateCalculatorView',

    config: {
		title: 'Date Calculator',
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
					xtype: 'datepickerfield',
					destroyPickerOnHide: false,
					itemId: 'start_date',
					id: 'start_date',
					name: 'start_date',
					label: 'Start Date',
					placeHolder: '',
					picker: {
						yearFrom: new Date().getFullYear() - 5,
						yearTo: new Date().getFullYear() + 5
					},
					value: new Date()
				},
				{
					xtype: 'spinnerfield',
					itemId: 'weeks_to_add',
					name: 'weeks_to_add',
					label: 'Weeks',
					minValue: 0,
					maxValue: 52,
					increment: 1,
					cycle: false,
					value: 24
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
							{
								xtype: 'textfield',
								name: 'calculated_date',
								label: 'Completion Date',
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
				delegate: '#start_date',
				event: 'change',
				fn: 'calculate'
			},
			{
				delegate: '#weeks_to_add',
				event: 'spin',
				fn: 'calculate'
			},
			{
				delegate: '#dateCalcNav',
				event: 'toggle',
				fn: 'showCompCalc'
			}
		]
    },
	calculate: function(text) {
		
		var thisForm = this;
		
		setTimeout(function() {			
			var values = thisForm.getValues();
			console.log('calculate()', values);
			
			var completedDate = new Date();
			completedDate.setTime(values.start_date.getTime() + (1000 * 60 * 60 * 24 * 7 * values.weeks_to_add));
			
			console.log(completedDate);
			
			var day = completedDate.getDate();
			var month = completedDate.getMonth();
			month++;
			var year = completedDate.getFullYear();
			
			thisForm.setValues({calculated_date: month + '/' + day + '/' + year});
			
			
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