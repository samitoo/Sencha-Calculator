<cfquery name="qry" datasource="jwoperatingMySQL">
	SELECT * FROM tblcontacts
    WHERE client_id!=0
    AND zone="J-W Power Company"
	ORDER BY city
</cfquery>

<!--- set return headers --->
<cfheader statuscode="200" statustext="OK" />
<cfcontent reset="true" type="application/json" />

<!--- output return body --->
[
	<cfoutput query="qry">
	{
		"client_name": "#XMLFormat(client_name)#", 
		"program": "#XMLFormat(program)#", 
		"addr": "#XMLFormat(addr)#", 
		"city": "#XMLFormat(city)#", 
		"state": "#state#", 
		"zip": "#zip#", 
		"tel": "#tel#", 
		"tel2": "#tel2#", 
		"fax": "#fax#", 
		"email": "#email#", 
		"zone": "#zone#", 
		"latitude": "#latitude#", 
		"longitude": "#longitude#"
	}<cfif qry.recordCount NEQ qry.currentRow>,</cfif>
	</cfoutput>
 ]
