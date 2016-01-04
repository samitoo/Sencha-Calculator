Ext.define('JWAPP.view.About', {

	extend: 'Ext.Container',
	xtype: 'about',

    config: {
		title: 'About',
        scrollable: 'vertical',
        cls: 'about',
		iconCls: 'info',
		
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				title: 'About Us'
			},
			{
				xtype: 'panel',
				cls: 'content',
				styleHtmlContent: true,
				//html: '<p><img src="http://www.jwenergy.com/images/layout/operating.jpg"> J-W Energy Company is an Energy Development and Energy Services company that specializes in natural gas compression, gathering, exploration and production, well servicing and gas measurement.</p><p>Our various businesses operate in the states of Texas, Louisiana, Oklahoma, Arkansas, New Mexico, Kansas, Colorado, Utah, Wyoming, California, Montana, Kentucky, West Virginia, Ohio, Pennsylvania and North Dakota.</p><p>Please <a href="http://www.jwenergy.com/our-subsidiaries/">click here</a> to learn more about each of J-W Energy Company\'s subsidiaries.</p>'
				
				html: [
					'<img src="http://www.jwenergy.com/images/jwpowerretal1.jpg" />',
					'<p>J-W Power Company is an industry leader in the leasing, sales and servicing of natural gas compression equipment, in both standard and custom packages. We have been leasing compressor and compressor/maintenance packages for more than 40 years.</p>',
					'<p>Operating the largest privately-owned compression fleet in the United States, with compressors ranging in size from 18 to&nbsp;1,775 horsepower, J-W Power Company can provide gas compression services tailored precisely to your unique set of needs.</p>',
					'<p>In addition, we are your best&nbsp;alternatives for compressor repair and maintenance, from monthly inspections to minor repairs and complete package rebuilds.&nbsp; We can also provide highly engineered compressor packages&nbsp;for air injection, compressed natural gas (CNG) and air-drilling applications.</p>',
					'<p>From our 23,000 square foot parts warehouse in Longview, Texas, and 30 locations nationwide, we can provide overnight delivery of parts and accessories to any domestic location, even hard-to-find parts for older compressors.</p>',
					'<p>J-W Power Company also enjoys an impeccable reputation for field service. We take pride in providing service personnel with exceptional work ethics and effective customer service skills.</p>',
					'<p>To find our more about how J-W Power Company can solve your gas compression challenges, please contact us at <a href="mailto:compression@jwenergy.com">compression@jwenergy.com</a> or <a href="tel:972-233-8191">972-233-8191</a>.</p>',
					'<p>&nbsp;</p>'
				].join('')
			}
		]
		
    }
});
