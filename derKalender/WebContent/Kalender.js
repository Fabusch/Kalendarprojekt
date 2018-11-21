//import * as db from '/DB.js';
var request = window.indexedDB.open('Accountdaten',1);		// DatenBank = request
request.onupgradeneeded=function() {	//Datenbank-Version sich geändert // Datenbank erstmals angelegt
	console.log('Datenbank angelegt');
	alert('Datenbank angelegt');
	var db=this.result;
	if(!db.objectStoreNames.contains('Kalender')) {		
		store=db.createObjectStore('Kalender', {		// Tabelle = features
			keypath:'key',
			autoIncrement: true
		});
	}
};

request.onerror = function(event) {			//bei Fehler
	alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
};
request.onsuccess = function(event) {	//Datenbank geöffnet
	db = event.target.result;
	
	db.onerror = function(event) {
		// Dies dient zur Behandlung von allen Fehlern in der Datenbank!
		alert("Fehler in der Datenbank behandeln: " + event.target.errorCode);
	};
};


//const	User ={username: "Max75", name:"Maxi", Passwor:"fzrem7dr", Gruppen:[1]};
//const	Termin ={ TID: key, name: "Ostern", user: username(ID), DataStart: Start, DataEnd: End };
//const	Gruppe ={ GID: key, name:"Familie", Mitglieder: ["Max75"] };
	
var request = indexedDB.open("User", 2);

request.onerror = function(event) {	};
request.onupgradeneeded = function(event) {
	var db = event.target.result;
	
	var objectStore = db.createObjectStore("User", { keyPath: "username" });	//User
	objectStore.transaction.oncomplete = function(event) { // erst fertig erstellen, bevor Daten aufgespielt werden   
		var UsererObjectStore = db.transaction("Accountdaten", "readwrite").objectStore("User");
		UserData.forEach(function(User) {
			UserObjectStore.add(User);
		});
	};
}

var request = indexedDB.open("Termine", 3);
var request = indexedDB.open("Gruppen", 4);

request.onerror = function(event) {	};
request.onupgradeneeded = function(event) {
	var db = event.target.result;
	var objectStore = db.createObjectStore("Termine", { keyPath: "TID" });	//Termine
	objectStore.transaction.oncomplete = function(event) { // erst fertig erstellen, bevor Daten aufgespielt werden   
		var TerminObjectStore = db.transaction("Accountdaten", "readwrite").objectStore("Termine");
		TerminData.forEach(function(Termin) {
			TerminObjectStore.add(Termin);
		});
	};
	var objectStore = db.createObjectStore("Gruppen", { keyPath: "GID" });
	objectStore.transaction.oncomplete = function(event) { // erst fertig erstellen, bevor Daten aufgespielt werden   
		var GruppenObjectStore = db.transaction("Accountdaten", "readwrite").objectStore("Gruppen");
		GruppenData.forEach(function(Gruppe) {
			GruppenObjectStore.add(Gruppe);
		});
	};
}


function addTemine(aDate){
	var Kalender = document.getElementById('kalender').getElementsByTagName('table')[0];
	switch(ansicht){
		case 1:
//			for(Gruppenmitglieder){
//				Person[i].getTermine(von, bis);
//				for(Termin){
//					Anfang.year.month.day.getHours;
//					Ende.year.month.day.getHours;
//					name = 'gut'// Termin.name;
					cellStart=1;
					cellEnd=4;
					for(var i=1; i<= (cellEnd-cellStart); i++){
						Kalender.rows[2+i].deleteCell(1);
					}
					var cell = Kalender.rows[cellStart+1].cells[1];
					cell.className = cell.className +' Termin';
					cell.innerHTML= name;
					cell.rowSpan = (cellEnd-cellStart)+1;		//	dauer
//				}
//			}
			break;
		case 2:
//			for(var g=0; g< Gruppenmitglieder.length; g++){
//				Person[g].getTermine(von, bis);
//				for(Termin){
//					Anfang= Termin.year.month.day;
//					Ende= Termin.year.month.day;
					name = 'gut'// Termin.name;
					cellStart=1;
					cellEnd=4;
					for(var i=1; i<= (cellEnd-cellStart); i++){
						Kalender.rows[1+i].deleteCell(2);
					}
					var cell = Kalender.rows[cellStart].cells[/*g+*/2];
					cell.className = cell.className +' Termin';
					cell.innerHTML= name;
					cell.rowSpan = (cellEnd-cellStart)+1;		//	dauer
//				}
//			}
			break;
		case 3:
//			for(Gruppenmitglieder){
//				Person[i].getTermine(von, bis);
//				for(Termin){
//					Anfang.year.month.day;
//					Ende.year.month.day;
//					cellStart
//					cellEnd
//					name = 'gut'// Termin.name;
//						for(var i=1; i<= (cellEnd-cellStart); i++)
//							var cell = Kalender.rows[cellStart].cells[1];
//							cell.className = cell.className +' Termin';
//							cell.title= cell.title + ' name';
//					}
//					cell.class;
//				}
//			}
			break;
	}
}


var tag = new Date();
var d = tag.getDate();
var m = tag.getMonth() + 1;
var y = tag.getYear() + 1900;
			
var ansicht = 2;
			
Monatsname = new Array("Januar", "Februar", "März", "April", "Mai", "Juni","Juli", "August", "September", "Oktober", "November", "Dezember");
Wochentag = new Array("Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag");
Gruppenmitglieder =new Array("Person 1","Person 2","Person 3"/*,"Person 4","Person 5","Person 6","Person 7"*/);
			
function background(element){
	if(element.innerHTML=="Neptune")
		document.getElementById('kalender').style.backgroundImage = "url('img/Neptune.png')";
	else if(element.innerHTML=="Star-Wars Clone")
		document.getElementById('kalender').style.backgroundImage = "url('img/Star-Wars_Clone.jpg')";
}
function Monatsende(aDate){
	var Monat = aDate.getMonth() + 1;
	var Jahr = aDate.getYear() + 1900;
	var Monatsende = 31;
	if (Monat == 4 || Monat == 6 || Monat == 9 || Monat == 11) --Monatsende; // April(4), Juni(6), September(9), November(11) 30 Tage
	if (Monat == 2) {	//Februar(2)
		Monatsende = Monatsende - 3;
		if (Jahr % 4 == 0) Monatsende++;		//Schaltjahren
		if (Jahr % 100 == 0) Monatsende--;
		if (Jahr % 400 == 0) Monatsende++;
	}
	return Monatsende;
}
function setAnsicht(sicht){
	ansicht = sicht;
	Kalender();
}
			
function Kalender(){
	tabellen = document.getElementById('kalender').getElementsByTagName('table');
	if(tabellen.length != 0){			//Tabellen löschen
		do{
			tabellen[0].remove();
		}while(0 != tabellen.length);
	}
	var t1 = document.getElementById('kOverHead').getElementsByTagName("a")[0];		//Überschriften Links
	var t2 = document.getElementById('kOverHead').getElementsByTagName("a")[1];
	switch (ansicht){
		case 1:
			var aDate = new Date(y,m-1,d);
			WochenKalender(d, m, y);
			t1.innerHTML = y;
			t1.style.fontSize = "30px";
			t2.innerHTML = Monatsname[m-1];
			t2.style.fontSize = "30px";
			break;
		case 2:
			var aDate = new Date(y,m-1,1);
			MonatsKalender(aDate);
			t1.innerHTML = y;
			t1.style.fontSize = "30px";
			t2.innerHTML = '';
			t2.style.fontSize = "2px";
			break;
		case 3:
			main = document.getElementById("kalender");
			var buttontag = document.createElement("div");
			buttontag.setAttribute("id","Buttons");
			buttontag.style.cssFloat = "left";
			var calendartag = document.createElement("div");
			calendartag.setAttribute("id","Kalender");
			calendartag.style.cssFloat = "left";
			initializeyearcounter(buttontag);
			main.appendChild(buttontag);
			main.appendChild(calendartag);
			buttons(buttontag,calendartag);
			createyear(parseInt(counter.innerText),calendartag);
			
			t1.innerHTML = '';
			t1.style.fontSize = "2px";
			t2.innerHTML = '';
			t2.style.fontSize = "2px";
			break;
	}
	addTemine(aDate);
}
function MonatsKalender(aDate) {
	var jetzt = new Date();		// aktuelles Datum
	var Wochentagab = new Array("Mo","Di","Mi","Do","Fr","Sa","So");	//abkürzungen für die Wochentage
	
	var Start = aDate.getDay();		//Wochentag des ersten Tags im Monat
	if (Start > 0) {
		Start--;
	} else {
		Start = 6;
	}
	var ende = Monatsende(aDate);
	
	var table = document.createElement("table");
	
	var Kopf = Monatsname[aDate.getMonth()-1];	//Tabellenüberschrift
	var caption = table.createCaption();
	caption.innerHTML = Kopf;
	
	var zeile = table.insertRow(0);		//Tabellenkopf
	zeile.className = 'thead';
	var cell = zeile.insertCell(0);
	cell.innerHTML = "Datum";
	var cell = zeile.insertCell(1);
	cell.innerHTML = "Wochentag";
	for (var i = 0; i < Gruppenmitglieder.length; i++) {		//Eine Spallte für jedes Gruppenmitglied
		var cell = zeile.insertCell(i+2);
		cell.innerHTML = Gruppenmitglieder[i];
	}
	var cell = zeile.insertCell(2+ Gruppenmitglieder.length);
	cell.innerHTML = "KW";
	
			//Tabellenbody
	for (var i = 0; i < ende; i++) {		//bis Monatsende
		var zeile = table.insertRow(i+1);
		
		Tageszahl =aDate.getDate();
		
		zeile.className = 'kalendertag';	
		cells = zeile.insertCell(0);
		cells.innerHTML = Tageszahl;	//Datum
		
		cells = zeile.insertCell(1);
		var wt= Wochentag[(Start+Tageszahl-1)%7];		//Wochentag
		var wtab= Wochentagab[(Start+Tageszahl-1)%7];
		cells.innerHTML = wtab;
		cells.title = wt;
		
		if (wt=="Samstag" || wt=="Sonntag")		//wochenende hervorheben 
			zeile.className = zeile.className +' wochenende';
		for (var j = 0; j <= Gruppenmitglieder.length -1; j++) {		//Zellen der Gruppenmitglieder
			cells = zeile.insertCell(j+2);
			cells.innerHTML = ' ';
		}
		if (wt=="Montag"||Tageszahl==1){		//Kalender Woche ergänzen
			kW = weekofyear(aDate);
			cellskW = zeile.insertCell(Gruppenmitglieder.length +2);
			cellskW.innerHTML = kW;			//Kalender Woche
			
			cellskW.title = aDate.getDate() + '.'+ (aDate.getMonth() + 1) +'.'+ (aDate.getYear() + 1900);	//Datum vom Montag als titel
			cellskW.className = 'kw';
			cellskW.addEventListener('click', function(){	click_wechsel( 1, this.title);	});
			cellskW.addEventListener('mouseover', function(){	link(this);	});
			cellskW.addEventListener('mouseout', function(){	linkout(this);	});
			
			cellskW.rowSpan = 7 - Wochentag.indexOf(wt);	// länge der Zelle bis Sonntag
		}
		if ( (aDate.getDate()==jetzt.getDate()) && (aDate.getMonth()==jetzt.getMonth()) && (aDate.getYear()==jetzt.getYear()) ){	//heute hervorheben 
			zeile.className = zeile.className + ' heute';			//makiert den Tag
			cellskW.className= cellskW.className + ' heute';			//makiert die aktuelle Kalenderwoche
		}
		aDate.setDate(aDate.getDate() + 1);
	}
	document.getElementById('kalender').appendChild(table);
}
function WochenKalender(Tag, Monat, Jahr) {
	var jetzt = new Date();		// aktuelles Datum
	var DieserMonat = jetzt.getMonth() + 1;
	var DiesesJahr = jetzt.getYear() + 1900;
	var DieserTag = jetzt.getDate();
	
	var date = new Date(Jahr,Monat-1,Tag);		//der Tag
	var currentThursday = new Date(date.getTime() +(3-((date.getDay()+6) % 7)) * 86400000);
	var yearOfThursday = currentThursday.getFullYear();
	var firstThursday = new Date(new Date(yearOfThursday,0,4).getTime() +(3-((new Date(yearOfThursday,0,4).getDay()+6) % 7)) * 86400000);
	
	var kW = Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000/7);
	
	var Zeit = new Date(Jahr, Monat-1, Tag);
	var Start = Zeit.getDay();		//Wochentag
	if (Start > 0) 
		Start--;
	else 
		Start = 6;
	Tag = Tag-Start;	//Tag soll ein Montag sein
	if(Tag <=0){
		Monat--;
		if(Monat <=0){
			Monat=12;
			Jahr--;
		}
		Tag = Monatsende(Monat, Jahr)+Tag;
	}
	var table = document.createElement("table");
	
	var Kopf = kW+".KW";	//Tabellenüberschrift		//!!!
	var caption = table.createCaption();
	caption.innerHTML = Kopf;
	
	var zeile = table.insertRow(0);		//Tabellenkopf
	var cells = zeile.insertCell(0);
	cells.innerHTML = "Zeit";
	
	var zeile1 = table.insertRow(1);		//Datums zeile
	var cells1 = zeile1.insertCell(0);
	cells.innerHTML = " ";
	for (var i = 0; i <= 7-1; i++) {		//Wochentag
		var cells = zeile.insertCell(i+1);
		if(Tag > Monatsende(Monat, Jahr)){			//falls Monats wechsel
			Tag = 1;
			Monat++;
			if(Monat >=13){		//falls Jahres wechsel
				Monat=1;
				Jahr++;
			}
		}
		cells.innerHTML = Wochentag[i];
		
		cells1 = zeile1.insertCell(i+1);
		
		var tag = Tag;
		var monat = Monat;
		if (tag<=9)
			tag = "0"+tag;
		if (monat<=9)
			monat= "0"+ monat;
		cells1.innerHTML = tag+"."+monat+"."+Jahr;	//datum
		
		if ((Jahr == DiesesJahr) && (Monat == DieserMonat) && (Tag == DieserTag)){ 		//heute
			cells.className = cells.className + ' heute';
			cells1.className = cells1.className + ' heute';
		}
		
		Tag++;
	}
	
	for (var i = 0; i <= 23; i++) {		//Tabellenbody
		var zeile = table.insertRow(i+2);
		cells = zeile.insertCell(0);		//Zeit
		if(i<=9)
			cells.innerHTML = "0"+i+":00";
		else
			cells.innerHTML = i+":00";	
					
		for (var j = 0; j <= 6; j++) {		//Zellen der Tage
			cells = zeile.insertCell(j+1);
			cells.innerHTML = ' ';
			var day = table.rows[1].cells[j+1].innerHTML;		//datum als classe
			cells.className = cells.className + day;
			if ((Jahr == DiesesJahr) && (Monat == DieserMonat) && (Tag-(7-j) == DieserTag)) 	//heute
				cells.className = cells.className + ' heute';
			
			if(i>=4 && i<=11)							//tag in drei abschnitte aufteilen
				cells.className = cells.className +' morgen';
			else if(i>=11 && i<=19)
				cells.className = cells.className +' mittag';
			else
				cells.className = cells.className +' nacht';
			if (j>=5) {									//Wochenende hevor heben
				cells.className = cells.className +' wochenende';
			}
		}
	}
	document.getElementById('kalender').appendChild(table);
}

function wechsel(vor){
	switch (ansicht){
		case 1:
			Wochen_wechsel(vor);
			break;
		case 2:
			Monats_wechsel(vor);
			break;
		case 3:
			Jahres_wechsel(vor);
			break;
	}
	Kalender(ansicht);
}
function Jahres_wechsel(vor){
	if(vor){
		y ++;
		if(m==2 && d==29)		//29.Febuar ist nur alle 4 Jahre
			d--;
	}
	else{
		y --;
		if(m==2 && d==29)		//29.Febuar ist nur alle 4 Jahre
			d--;
	}
}
function Monats_wechsel(vor){
	if(vor){
		m += 1;
		if(m==13){
			m =1;
			y += 1;
		}
	}
	else{
		m -= 1;
		if(m==0){
			m =12;
			y -= 1;
		}
	}
}			
function Wochen_wechsel(vor){
	if(vor){
		d += 7;
		if(Monatsende( m, y)<d){
			d -= Monatsende( m, y);
			m += 1;
			if(m==13){
				m =1;
				y =y+1;
			}
		}
	}
	else{
		d -= 7;
		if(d<=0){
			m = m-1;
			if(m==0){
				m =12;
				y =y-1;
			}
			d += Monatsende( m, y);
		}
	}
}

function click_wechsel(sicht, datum){
	ansicht = sicht;
	if(datum[2]=='.'){
		d = datum[0]+datum[1];
		if(datum[5]=='.'){
			m = datum[3]+datum[4];
			y = datum[6]+datum[7]+datum[8]+datum[9];
		}
		else{
			m = datum[3];
			y = datum[5]+datum[6]+datum[7]+datum[8];
		}
	}
	else{
		d = datum[0];
		if(datum[4]=='.'){
			m = datum[2]+datum[3];
			y = datum[5]+datum[6]+datum[7]+datum[8];
		}
		else{
			m = datum[2];
			y = datum[4]+datum[5]+datum[6]+datum[7];
		}
	}
	d = parseInt(d) ;		//String to Int
	m = parseInt(m) ;
	y = parseInt(y) ;
	Kalender(sicht) ;
}
function link(element){
	element.style.color="#FFEB3B";
}
function linkout(element){
	element.style.color="white";
}


//Convert monthname to monthnumber
function month_to_number(month){
}
//Conver monthnumber to monthname
function number_to_month(number){
}
function daysofmonth(aDate){
}
//Test if leap year
function isleapyear(year){
}



function eastern(aDate){
	var K = Math.trunc(aDate.getFullYear() /100);
	var M = 15 + Math.trunc((3*K+3)/4)- Math.trunc((8*K+13)/25);
	var S = 2 - Math.trunc((3*K+3)/4);
	var A = aDate.getFullYear() % 19;
	var D = (19*A+M)%30;
	var R = Math.trunc((D + Math.trunc(A/11) ) /29);
	var OG = 21 + D-R;
	var SZ = 7 - (aDate.getFullYear()+ Math.trunc(aDate.getFullYear()/4)+S)%7;
	var OE = 7 - (OG - SZ) % 7;
	var OS = OG + OE;
	if (OS > 31){
		var easter = new Date(aDate.getFullYear(),3,OS-31);
		return easter;
	}
	else{
		var easter = new Date(aDate.getFullYear(),2,OS);
		return easter;
	}
}
//test if Date = Holiday
function isholiday(aDate){
	//NeuJahr
	var holiday = new Date(aDate.getFullYear(),0,1);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	//Karfreitag
	holiday = eastern(aDate);
	holiday.setDate(holiday.getDate() - 2);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	//OsterMontag
	holiday = eastern(aDate);
	holiday.setDate(holiday.getDate() +1);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	//1.Mai
	holiday = new Date(aDate.getFullYear(),4,1)
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	
	//Christi Himmelfahrt
	holiday = eastern(aDate);
	holiday.setDate(holiday.getDate() +39);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	//Pfingsten
	holiday = eastern(aDate);
	holiday.setDate(holiday.getDate() +49);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	//Tag der Deutschen Einheit
	holiday = new Date(aDate.getFullYear(),9,3);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	//Erster Weihnachtsfeiertag
	holiday = new Date(aDate.getFullYear(),11,25);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	//Zweiter Weihnachtsfeiertag
	holiday = new Date(aDate.getFullYear(),11,26);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	return false;
}

function weekday(aDate){
	day = (aDate.getDay() +6)%7+1
	return day;
}
//Week of the year
function weekofyear(aDate){
	newyear = new Date(aDate.getFullYear(),0,1);
	weeks = 0;
	while(weekday(newyear)!=4){
		if (weekday(newyear)==7&& newyear.getTime() >= aDate.getTime()){
			oldyear=new Date(aDate.getFullYear()-1,11,31);
			
			return weekofyear(oldyear);
		}
		newyear.setDate(newyear.getDate() + 1);
		//passing sunday
	}
	weeks = 1;
	while(weekday(newyear)!=7){
		//thursday found
		newyear.setDate(newyear.getDate() + 1);
	}	
	while(newyear.getTime() < aDate.getTime()){
		newyear.setDate(newyear.getDate() + 7);
		weeks +=1;
	}
	lastdayofyear = new Date(aDate.getFullYear(),11,31);
	if(weeks == 53 && weekday(lastdayofyear)<4){
		return 1;
	}
	else{
		return weeks;
	}
}

//make Header for Month
function maketitle(month,table) {
      //var monthtable = document.getElementById(month);
	  // schreibe Tabellenüberschrift
	  var caption = table.createCaption();
	  caption.innerHTML = Monatsname[month-1];
}

function makedata (aDate,table) {
	//var table = document.getElementById(month);	  
	//6 Rows = Max for one Month
	var lastday = false;
	for (var i = 0; i <= 5;i++){
		//insert Row
		var row = table.insertRow();
		//first row
		if (i == 0){
			for (var j = 0; j <= 7;j++){
		    	var cell = row.insertCell();
		    	//week
		    	if (j == 0){
		    		
		    		week = weekofyear(aDate);
		    		cell.innerHTML = week;
		    		cell.className = 'week';
		    	}
		    	//weekday not in month
		    	else if (j<weekday(aDate)){
		    		cell.className = 'notinmonth';
		    	}
		    	else{
		    		cell.innerHTML = aDate.getDate();
		    		if(j==6 || j==7||isholiday(aDate)){
						cell.className = 'holidayorweekend';
					}
		    		else{
		    			cell.className = 'calendarday';
		    		}
		    		aDate.setDate(aDate.getDate() + 1);
		    	}
			}
		}
		
		//Not first Week
		else{
			if (lastday == false){
			    for (var j = 0; j <= 7;j++){
			    	//Erstes Feld = Woche
			    	var cell = row.insertCell();
				    if (j == 0){
						week = weekofyear(aDate);
			    		cell.innerHTML = week;
			    		cell.className = 'week';
			    	}
					//is it in month
				    else if(aDate.getDate()<=daysofmonth(aDate)&& lastday==false){
						cell.innerHTML = aDate.getDate();
			    		if(j==6 || j==7||isholiday(aDate)){
							cell.className = 'holidayorweekend';
						}
			    		else{
			    			cell.className = 'calendarday';
						}
			    		if (daysofmonth(aDate)==aDate.getDate()){
			    			lastday = true;
						}
			    		aDate.setDate(aDate.getDate() + 1);
			    	
					}
					else{
						cell.className = 'notinmonth'
					}
			    }
			}	
		}
	}
			  
}
//creates a month table	
function createmonth (month,year,div) {
	//creates new table
	var table = document.createElement("table");
	table.className = 'JA';	//Jahresansicht für css
    table.setAttribute("id", table);
    //fills it
    aDate = new Date(year, month-1, 1);
	maketitle(month,table);
	makedata(aDate,table);
	table.style.cssFloat = "left";
	//makedata(aDate,monthtable);
	div.appendChild(table);
}
function createyear(year,main){
	
	for(i=0; i<=4; i++){
		var div;
		div = document.createElement('div');
		div.setAttribute("id", "firstquater");
		div.style.cssFloat = "left";
	
		createmonth (i+1, year,div);
		createmonth (i+2, year,div);
		createmonth (i+3, year,div);

		main.appendChild(div);
	}
}

//function buttonconfig(button, id,caption){
//	button.setAttribute("id",id);
//	button.innerHTML = caption;
//}
//
//function initializeyearcounter(main){
//	var counter = document.createElement("table");
//	counter.setAttribute("id", "counter");
//	counter.style.cssFloat = "left";
//	row = counter.insertRow();
//	cell = row.insertCell();
//	today = new Date();
//	cell.innerText = today.getFullYear();
//	main.appendChild(counter);
//}
//
//function clear(main){
//	while (main.firstChild) {
//		main.removeChild(main.firstChild);
//	}
//}
//
//function decreaseyear(){
//	main = document.getElementById("Kalender");
//	clear(main);
//	var counter = document.getElementById("counter");
//	createyear(parseInt(counter.innerText)-1,calendartag);
//	counter.innerText = parseInt(counter.innerText)-1;
//}
//
//function increaseyear(){
//	main = document.getElementById("Kalender");
//	clear(main) 
//	var counter = document.getElementById("counter");
//	createyear(parseInt(counter.innerText)+1,calendartag);
//	counter.innerText = parseInt(counter.innerText)+1;
//	
//}
//
//function buttons(buttontag,calendartag){
//	var button;
//	
//	button = document.createElement("button");
//	buttonconfig(button, "lastyear","Jahr vorher");
//	button.addEventListener('click', decreaseyear);
//	buttontag.appendChild(button);
//
//	button = document.createElement("button");
//	buttonconfig(button, "nextyear","Jahr nachher");
//	button.addEventListener('click', increaseyear);
//	buttontag.appendChild(button);
//}

