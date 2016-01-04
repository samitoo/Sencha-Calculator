<cfif structKeyExists(form, 'suction_pressure')>

<cfmail to="jason@synapse.ws" from="info@synapse.ws" subject="J-W Power App: Pricing Request">

<cfoutput>

Suction Pressure (psig): #form.suction_pressure#
Discharge Pressure (psig): #form.discharge_pressure#
Capacity (MMSCFD): #form.capacity#

Pressure Ratios: #form.pressure_ratios#
Number of Compression Stages: #form.compression_stages#
Pressure Ratios per Stage: #form.pressure_ratios_state#
Estimate Discharge Temp (Deg F): #form.discharge_temp#
Compressor Horsepower Estimation: #form.compressor_horsepower#
Auxillary Horsepower Estimation: #form.auxillary_horsepower#
Total Horsepower Estimation: #form.total_horsepower#

</cfoutput>

</cfmail>

</cfif>