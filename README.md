<h2>Background of this repository</h2>
<p>
	This repository is part of my developer's work at the Philippine National Police Academy (www.pnpa.edu.ph). At that time, to speed up development, I was checking some third-party services/APIs where we can outsource the code for the address picker. My search was 	unsuccessful however, and so I decided to create this simple Philippine Localities API that will be accessed by the main system for its functionalities.
</p>
<h2>Installation &amp; Configuration</h2>
<ol>
	<li>You must assign and open a TCP port for this API beforehand. My default in the .env file is 2525.</li>
	<li>Clone this repository to your desired location.</li>
	<li>Run <code>npm i</code> or <code>sudo npm i</code> (if using Linux) to install requirements.</li>
	<li>
		Edit the .env file to change your desired port, as well as the path to your SSL certificates if ever you need to run this with SSL enabled.<br/>
		<code>DEF_PORT</code> sets the port where you want to access the API.<br/>
		<code>SERVER_MODE</code> sets the protocol you want to run the API in. The default is "HTTP". To run in HTTPS, set it to "HTTPS".<br/>
		<code>SSL_LOC_KEYP</code> and <code>SSL_LOC_CERT</code> will only be read if the <code>SERVER_MODE</code> is set to "HTTPS". These two must contain the paths to your SSL key and certificate respectively.
	</li>
	<li>Run the <code>app.js</code> file with your favorite NodeJS task runner. I personally use Process Manager 2 or PM2 (https://pm2.keymetrics.io/), since it's easy for me to set the maximum RAM, among other settings.</li>
</ol>
<h2>API Endpoints</h2>
<ul>
	<li>
		<code>GET | /api/locale/regions</code>
		<p>
			This will give you a JSON list of regions in the Philippines, like so:<br/>
			<code>[{"s":"01","n":"REGION I (ILOCOS REGION)"},{"s":"02","n":"REGION II (CAGAYAN VALLEY)"},{"s":"03","n":"REGION III (CENTRAL LUZON)"},{"s":"04","n":"REGION IV-A (CALABARZON)"},{"s":"17","n":"REGION IV-B (MIMAROPA)"},{"s":"05","n":"REGION V (BICOL REGION)"},{"s":"06","n":"REGION VI (WESTERN VISAYAS)"},{"s":"07","n":"REGION VII (CENTRAL VISAYAS)"},{"s":"08","n":"REGION VIII (EASTERN VISAYAS)"},{"s":"09","n":"REGION IX (ZAMBOANGA PENINSULA)"},{"s":"10","n":"REGION X (NORTHERN MINDANAO)"},{"s":"11","n":"REGION XI (DAVAO REGION)"},{"s":"12","n":"REGION XII (SOCCSKSARGEN)"},{"s":"13","n":"NATIONAL CAPITAL REGION (NCR)"},{"s":"14","n":"CORDILLERA ADMINISTRATIVE REGION (CAR)"},{"s":"15","n":"AUTONOMOUS REGION IN MUSLIM MINDANAO (ARMM)"},{"s":"16","n":"REGION XIII (Caraga)"}]</code>
		</p>
		<p>The <code>s</code> property stands for "SELF", which acts as the id of that locale.</p>
	</li>
	<li>
		<code>GET | /api/locale/provinces/:regionCode</code>
		<p>This will give you the list of provinces for the region id, as specified by the <code>:regionCode</code> argument. Refer to previous item. Below is a sample output for "/api/locale/provinces/01" where "01" is the id of Region 1.</p>
		<code>[{"p":"01","s":"0128","n":"ILOCOS NORTE"},{"p":"01","s":"0129","n":"ILOCOS SUR"},{"p":"01","s":"0133","n":"LA UNION"},{"p":"01","s":"0155","n":"PANGASINAN"}]</code>
		<p>The <code>p</code> property stands for "PARENT", which corresponds with the id of the higher level locale.</p>
	</li>
	<li>
		<code>GET | /api/locale/cities/:provinceCode</code>
		<p>This will give you the list of cities and municipalities of a given province, as specified by the <code>:provinceCode</code> argument. Below is a sample output of "/api/locale/cities/0128", where "0128" refers to ILOCOS NORTE.</p>
		<code>[{"p":"0128","s":"012801","n":"ADAMS"},{"p":"0128","s":"012802","n":"BACARRA"},{"p":"0128","s":"012803","n":"BADOC"},{"p":"0128","s":"012804","n":"BANGUI"},{"p":"0128","s":"012805","n":"CITY OF BATAC"},{"p":"0128","s":"012806","n":"BURGOS"},{"p":"0128","s":"012807","n":"CARASI"},{"p":"0128","s":"012808","n":"CURRIMAO"},{"p":"0128","s":"012809","n":"DINGRAS"},{"p":"0128","s":"012810","n":"DUMALNEG"},{"p":"0128","s":"012811","n":"BANNA (ESPIRITU)"},{"p":"0128","s":"012812","n":"LAOAG CITY (Capital)"},{"p":"0128","s":"012813","n":"MARCOS"},{"p":"0128","s":"012814","n":"NUEVA ERA"},{"p":"0128","s":"012815","n":"PAGUDPUD"},{"p":"0128","s":"012816","n":"PAOAY"},{"p":"0128","s":"012817","n":"PASUQUIN"},{"p":"0128","s":"012818","n":"PIDDIG"},{"p":"0128","s":"012819","n":"PINILI"},{"p":"0128","s":"012820","n":"SAN NICOLAS"},{"p":"0128","s":"012821","n":"SARRAT"},{"p":"0128","s":"012822","n":"SOLSONA"},{"p":"0128","s":"012823","n":"VINTAR"}]</code>
		<p>The <code>p</code> and <code>s</code> properties denote the same properties as already mentioned in the preceding items.</p>
	</li>
	<li>
		<code>GET | /api/locale/barangays/:cityOrMunicipalityCode</code>
		<p>This will give you the list of barangays of a given city or municipality, as specified by the <code>cityOrMunicipalityCode</code> argument. Below is a sample output of "/api/locale/barangays/012815", where "012815" refers to Pagudpud.</p>
		<code>[{"p":"012815","s":"012815001","n":"Aggasi"},{"p":"012815","s":"012815003","n":"Baduang"},{"p":"012815","s":"012815004","n":"Balaoi"},{"p":"012815","s":"012815005","n":"Burayoc"},{"p":"012815","s":"012815006","n":"Caunayan"},{"p":"012815","s":"012815007","n":"Dampig"},{"p":"012815","s":"012815008","n":"Ligaya"},{"p":"012815","s":"012815010","n":"Pancian"},{"p":"012815","s":"012815011","n":"Pasaleng"},{"p":"012815","s":"012815012","n":"Poblacion 1"},{"p":"012815","s":"012815013","n":"Poblacion 2"},{"p":"012815","s":"012815014","n":"Saguigui"},{"p":"012815","s":"012815015","n":"Saud"},{"p":"012815","s":"012815016","n":"Subec"},{"p":"012815","s":"012815017","n":"Tarrag"},{"p":"012815","s":"012815018","n":"Caparispisan"}]</code>
	</li>
</ul>
<h2>Status Codes</h2>
<p>This API will give a 200/OK if you supplied the correct arguments, and 404/NOT_FOUND otherwise.</p>
<h2>Scope &amp; Limitations</h2>
<p>This repository does not cater to very specific locales e.g. street names or subdivisions. Please refer to other libraries or technologies for such purposes.</p>
<h2>Where To Go From Here</h2>
<p>I am monitoring the Philippine Statistics Authority (PSA) reports from time to time. If ever there are changes in names, I am going to update this. For anything, you may email me at marvincoridoalcantara@gmail.com. May this repository be of use to you.</p>
