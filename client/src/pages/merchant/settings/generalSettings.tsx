import React, { useState, useEffect } from 'react'
import {IoLocation} from 'react-icons/io5'
import {PiBinoculars} from 'react-icons/pi'
import {MdPhone} from 'react-icons/md'
import colors from '../../../common/colors'
import jjlogo from "../../../assets/jjlogo.png"
import axios from 'axios'
import GenSpinner from '../../../components/loaders/genSpinner'
import config from '../../../common/config'

export default function GeneralSettings() {
    const [isLoading, setIsLoading] = useState(false);
    const regionNames = [
        "NCR - National Capital Region",
        "CAR - Cordillera Administrative Region",
        "Region I - Ilocos Region",
        "Region II - Cagayan Valley",
        "Region III - Central Luzon",
        "Region IV-A - CALABARZON",
        "Region IV-B - MIMAROPA",
        "Region V - Bicol Region",
        "Region VI - Western Visayas",
        "Region VII - Central Visayas",
        "Region VIII - Eastern Visayas",
        "Region IX - Zamboanga Peninsula",
        "Region X - Northern Mindanao",
        "Region XI - Davao Region",
        "Region XII - SOCCSKSARGEN",
        "Region XIII - Caraga",
        "BARMM - Bangsamoro Autonomous Region in Muslim Mindanao",
      ];
      const regionProvinces = {
        "NCR - National Capital Region": [
          "Metro Manila",
        ],
        "CAR - Cordillera Administrative Region": [
          "Abra",
          "Apayao",
          "Benguet",
          "Ifugao",
          "Kalinga",
          "Mountain Province",
        ],
        "Region I - Ilocos Region": [
          "Ilocos Norte",
          "Ilocos Sur",
          "La Union",
          "Pangasinan",
        ],
        "Region II - Cagayan Valley": [
          "Batanes",
          "Cagayan",
          "Isabela",
          "Nueva Vizcaya",
          "Quirino",
        ],
        "Region III - Central Luzon": [
          "Aurora",
          "Bataan",
          "Bulacan",
          "Nueva Ecija",
          "Pampanga",
          "Tarlac",
          "Zambales",
        ],
        "Region IV-A - CALABARZON": [
          "Batangas",
          "Cavite",
          "Laguna",
          "Quezon",
          "Rizal",
        ],
        "Region IV-B - MIMAROPA": [
          "Marinduque",
          "Occidental Mindoro",
          "Oriental Mindoro",
          "Palawan",
          "Romblon",
        ],
        "Region V - Bicol Region": [
          "Albay",
          "Camarines Norte",
          "Camarines Sur",
          "Catanduanes",
          "Masbate",
          "Sorsogon",
        ],
        "Region VI - Western Visayas": [
          "Aklan",
          "Antique",
          "Capiz",
          "Guimaras",
          "Iloilo",
          "Negros Occidental",
        ],
        "Region VII - Central Visayas": [
          "Bohol",
          "Cebu",
          "Negros Oriental",
          "Siquijor",
        ],
        "Region VIII - Eastern Visayas": [
          "Biliran",
          "Eastern Samar",
          "Leyte",
          "Northern Samar",
          "Samar",
          "Southern Leyte",
        ],
        "Region IX - Zamboanga Peninsula": [
          "Zamboanga del Norte",
          "Zamboanga del Sur",
          "Zamboanga Sibugay",
        ],
        "Region X - Northern Mindanao": [
          "Bukidnon",
          "Camiguin",
          "Lanao del Norte",
          "Misamis Occidental",
          "Misamis Oriental",
        ],
        "Region XI - Davao Region": [
          "Compostela Valley",
          "Davao del Norte",
          "Davao del Sur",
          "Davao Occidental",
          "Davao Oriental",
        ],
        "Region XII - SOCCSKSARGEN": [
          "Cotabato",
          "Sarangani",
          "South Cotabato",
          "Sultan Kudarat",
        ],
        "Region XIII - Caraga": [
          "Agusan del Norte",
          "Agusan del Sur",
          "Dinagat Islands",
          "Surigao del Norte",
          "Surigao del Sur",
        ],
        "BARMM - Bangsamoro Autonomous Region in Muslim Mindanao": [
          "Basilan",
          "Lanao del Sur",
          "Maguindanao",
          "Sulu",
          "Tawi-Tawi",
        ],
      };
      

      const provinceMunicipalities = {
        "Metro Manila": ["Manila", "Caloocan", "Las Piñas", "Makati", "Malabon", "Mandaluyong", "Marikina", "Muntinlupa", "Navotas", "Parañaque", "Pasay", "Pasig", "Pateros", "Quezon City", "San Juan", "Taguig", "Valenzuela"],
        "Abra": ["Bangued", "Boliney", "Bucay", "Bucloc", "Daguioman", "Danglas", "Dolores", "La Paz", "Lacub", "Lagangilang", "Lagayan", "Langiden", "Licuan-Baay", "Luba", "Malibcong", "Manabo", "Peñarrubia", "Pidigan", "Pilar", "Sallapadan", "San Isidro", "San Juan", "San Quintin", "Tayum", "Tineg", "Tubo", "Villaviciosa"],
        "Apayao": ["Calanasan", "Conner", "Flora", "Kabugao", "Luna", "Pudtol", "Santa Marcela"],
        "Benguet": ["Atok", "Baguio", "Bakun", "Bokod", "Buguias", "Itogon", "Kabayan", "Kapangan", "Kibungan", "La Trinidad", "Mankayan", "Sablan", "Tuba", "Tublay"],
        "Ifugao": ["Aguinaldo", "Alfonso Lista", "Asipulo", "Banaue", "Hingyon", "Hungduan", "Kiangan", "Lagawe", "Lamut", "Mayoyao", "Tinoc"],
        "Kalinga": ["Balbalan", "Lubuagan", "Pasil", "Pinukpuk", "Rizal", "Tabuk", "Tanudan", "Tinglayan"],
        "Mountain Province": ["Barlig", "Bauko", "Besao", "Bontoc", "Natonin", "Paracelis", "Sabangan", "Sadanga", "Sagada", "Tadian"],
        "Ilocos Norte": ["Adams", "Bacarra", "Badoc", "Bangui", "Banna", "Batac", "Burgos", "Carasi", "Currimao", "Dingras", "Dumalneg", "Marcos", "Nueva Era", "Pagudpud", "Paoay", "Pasuquin", "Piddig", "Pinili", "San Nicolas", "Sarrat", "Solsona", "Vintar"],
        "Ilocos Sur": ["Alilem", "Banayoyo", "Bantay", "Burgos", "Caoayan", "Cervantes", "Galimuyod", "Gregorio del Pilar", "Lidlidda", "Magsingal", "Narvacan", "Quirino", "Salcedo", "San Emilio", "San Esteban", "San Ildefonso", "San Juan", "San Vicente", "Santa", "Santa Catalina", "Santa Cruz", "Santa Lucia", "Santa Maria", "Santiago", "Santo Domingo", "Sigay", "Sinait", "Sugpon", "Suyo", "Tagudin", "Vigan"],
        "La Union": ["Agoo", "Aringay", "Bacnotan", "Bagulin", "Balaoan", "Bangar", "Bauang", "Burgos", "Caba", "Luna", "Naguilian", "Pugo", "Rosario", "San Fernando", "San Gabriel", "San Juan", "Santo Tomas", "Santol", "Sudipen", "Tubao"],
        "Pangasinan": ["Agno", "Aguilar", "Alaminos", "Alcala", "Anda", "Asingan", "Balungao", "Bani", "Basista", "Bautista", "Bayambang", "Binalonan", "Binmaley", "Bolinao", "Bugallon", "Burgos", "Calasiao", "Dagupan", "Dasol", "Infanta", "Labrador", "Laoac", "Lingayen", "Mabini", "Malasiqui", "Manaoag", "Mangaldan", "Mangatarem", "Mapandan", "Natividad", "Pozorrubio", "Rosales", "San Carlos", "San Fabian", "San Jacinto", "San Manuel", "San Nicolas", "San Quintin", "Santa Barbara", "Santa Maria", "Santo Tomas", "Sison", "Sual", "Tayug", "Umingan", "Urbiztondo", "Urdaneta", "Villasis"],
        "Cagayan": ["Abulug", "Alcala", "Allacapan", "Amulung", "Aparri", "Baggao", "Ballesteros", "Buguey", "Calayan", "Camalaniugan", "Claveria", "Enrile", "Gattaran", "Gonzaga", "Iguig", "Lal-Lo", "Lasam", "Pamplona", "Peñablanca", "Piat", "Rizal", "Sanchez-Mira", "Santa Ana", "Santa Praxedes", "Santa Teresita", "Santo Niño (Faire)", "Solana", "Tuao", "Tuguegarao"],
        "Isabela": ["Alicia", "Angadanan", "Aurora", "Benito Soliven", "Burgos", "Cabagan", "Cabatuan", "Cordon", "Delfin Albano (Magsaysay)", "Dinapigue", "Divilacan", "Echague", "Gamu", "Ilagan", "Jones", "Luna", "Maconacon", "Mallig", "Naguilian", "Palanan", "Quezon", "Quirino", "Ramon", "Reina Mercedes", "Roxas", "San Agustin", "San Guillermo", "San Isidro", "San Manuel", "San Mariano", "San Mateo", "San Pablo", "Santa Maria", "Santiago", "Santo Tomas", "Tumauini"],
        "Nueva Vizcaya": ["Alfonso Castañeda", "Ambaguio", "Aritao", "Bagabag", "Bambang", "Bayombong", "Diadi", "Dupax del Norte", "Dupax del Sur", "Kasibu", "Kayapa", "Quezon", "Santa Fe", "Solano", "Villaverde"],
        "Quirino": ["Aglipay", "Cabarroguis", "Diffun", "Maddela", "Nagtipunan", "Saguday"],
        "Aurora": ["Baler", "Casiguran", "Dilasag", "Dinalungan", "Dingalan", "Dipaculao", "Maria Aurora", "San Luis"],
        "Bataan": ["Abucay", "Bagac", "Balanga", "Dinalupihan", "Hermosa", "Limay", "Mariveles", "Morong", "Orani", "Orion", "Pilar", "Samal"],
        "Bulacan": ["Angat", "Balagtas (Bigaa)", "Baliuag", "Bocaue", "Bulakan", "Bustos", "Calumpit", "Dona Remedios Trinidad", "Guiguinto", "Hagonoy", "Malolos", "Marilao", "Meycauayan", "Norzagaray", "Obando", "Pandi", "Paombong", "Plaridel", "Pulilan", "San Ildefonso", "San Jose del Monte", "San Miguel", "San Rafael", "Santa Maria"],
        "Nueva Ecija": ["Aliaga", "Bongabon", "Cabanatuan", "Cabiao", "Carranglan", "Cuyapo", "Gabaldon (Bitulok & Sabani)", "Gapan", "General Mamerto Natividad", "General Tinio (Papaya)", "Guimba", "Jaen", "Laur", "Licab", "Llanera", "Lupao", "Nampicuan", "Palayan", "Pantabangan", "Penaranda", "Quezon", "Rizal", "San Antonio", "San Isidro", "San Jose City", "San Leonardo", "Santa Rosa", "Santo Domingo", "Talavera", "Talugtug", "Zaragoza"],
        "Pampanga": ["Angeles", "Apalit", "Arayat", "Bacolor", "Candaba", "Floridablanca", "Guagua", "Lubao", "Mabalacat", "Macabebe", "Magalang", "Masantol", "Mexico", "Minalin", "Porac", "San Fernando", "San Luis", "San Simon", "Santa Ana", "Santa Rita", "Santo Tomas", "Sasmuan"],
        "Tarlac": ["Anao", "Bamban", "Camiling", "Capas", "Concepcion", "Gerona", "La Paz", "Mayantoc", "Moncada", "Paniqui", "Pura", "Ramos", "San Clemente", "San Jose", "San Manuel", "Santa Ignacia", "Tarlac City", "Victoria"],
        "Zambales": ["Botolan", "Cabangan", "Candelaria", "Castillejos", "Iba", "Masinloc", "Olongapo", "Palauig", "San Antonio", "San Felipe", "San Marcelino", "San Narciso", "Santa Cruz", "Subic"],
        "Batangas": ["Agoncillo", "Alitagtag", "Balayan", "Balete", "Batangas City", "Bauan", "Calaca", "Calatagan", "Cuenca", "Ibaan", "Laurel", "Lemery", "Lian", "Lipa", "Lobo", "Mabini", "Malvar", "Mataasnakahoy", "Nasugbu", "Padre Garcia", "Rosario", "San Jose", "San Juan", "San Luis", "San Nicolas", "San Pascual", "Santa Teresita", "Santo Tomas", "Taal", "Talisay", "Tanauan", "Taysan", "Tingloy", "Tuy"],
        "Cavite": ["Alfonso", "Amadeo", "Bacoor", "Carmona", "Cavite City", "Dasmariñas", "General Emilio Aguinaldo", "General Mariano Alvarez", "General Trias", "Imus", "Indang", "Kawit", "Magallanes", "Maragondon", "Mendez (Mendez-Nuñez)", "Naic", "Noveleta", "Rosario", "Silang", "Tagaytay", "Tanza", "Ternate"],
        "Laguna": ["Alaminos", "Bay", "Biñan", "Cabuyao", "Calamba", "Calauan", "Cavinti", "Famy", "Kalayaan", "Liliw", "Los Baños", "Luisiana", "Lumban", "Mabitac", "Magdalena", "Majayjay", "Nagcarlan", "Paete", "Pagsanjan", "Pakil", "Pangil", "Pila", "Rizal", "San Pablo", "San Pedro", "Santa Cruz", "Santa Maria", "Santa Rosa", "Siniloan", "Victoria"],
        "Quezon": ["Agdangan", "Alabat", "Atimonan", "Buenavista", "Burdeos", "Calauag", "Candelaria", "Catanauan", "Dolores", "General Luna", "General Nakar", "Guinayangan", "Gumaca", "Infanta", "Jomalig", "Lopez", "Lucban", "Lucena", "Macalelon", "Mauban", "Mulanay", "Padre Burgos", "Pagbilao", "Panukulan", "Patnanungan", "Perez", "Pitogo", "Plaridel", "Polillo", "Quezon", "Real", "Sampaloc", "San Andres", "San Antonio", "San Francisco (Aurora)", "San Narciso", "Sariaya", "Tagkawayan", "Tiaong", "Unisan"],
        "Rizal": ["Angono", "Antipolo", "Baras", "Binangonan", "Cainta", "Cardona", "Jalajala", "Morong", "Pililla", "Rodriguez (Montalban)", "San Mateo", "Tanay", "Taytay", "Teresa"],
        "Marinduque": ["Boac", "Buenavista", "Gasan", "Mogpog", "Santa Cruz", "Torrijos"],
        "Occidental Mindoro": ["Abra de Ilog", "Calintaan", "Looc", "Lubang", "Magsaysay", "Mamburao", "Paluan", "Rizal", "Sablayan", "San Jose", "Santa Cruz"],
        "Oriental Mindoro": ["Baco", "Bansud", "Bongabong", "Bulalacao (San Pedro)", "Calapan", "Gloria", "Mansalay", "Naujan", "Pinamalayan", "Pola", "Puerto Galera", "Roxas"],
        "Palawan": ["Aborlan", "Agutaya", "Araceli", "Balabac", "Bataraza", "Brooke's Point", "Busuanga", "Cagayancillo", "Coron", "Culion", "Cuyo", "Dumaran", "El Nido (Bacuit)", "Kalayaan", "Linapacan", "Magsaysay", "Narra", "Puerto Princesa", "Quezon", "Rizal (Marcos)", "Roxas", "San Vicente", "Sofronio Española", "Taytay"],
        "Romblon": ["Alcantara", "Banton", "Cajidiocan", "Calatrava", "Concepcion", "Corcuera", "Ferrol", "Looc", "Magdiwang", "Odiongan", "Romblon", "San Agustin", "San Andres", "San Fernando", "San Jose", "Santa Fe", "Santa Maria"],
        "Albay": ["Bacacay", "Camalig", "Daraga (Locsin)", "Guinobatan", "Jovellar", "Legazpi", "Libon", "Ligao", "Malilipot", "Malinao", "Manito", "Oas", "Pio Duran", "Polangui", "Rapu-Rapu", "Santo Domingo", "Tiwi"],
        "Camarines Norte": ["Basud", "Capalonga", "Daet", "Jose Panganiban", "Labo", "Mercedes", "Paracale", "San Lorenzo Ruiz (Imelda)", "San Vicente", "Santa Elena", "Talisay", "Vinzons"],
        "Camarines Sur": ["Baao", "Balatan", "Bato", "Bombon", "Buhi", "Bula", "Cabusao", "Calabanga", "Camaligan", "Canaman", "Caramoan", "Del Gallego", "Gainza", "Garchitorena", "Goa", "Iriga", "Lagonoy", "Libmanan", "Lupi", "Magarao", "Milaor", "Minalabac", "Nabua", "Naga", "Ocampo", "Pamplona", "Pasacao", "Pili", "Presentacion (Parubcan)", "Ragay", "Sagñay", "San Fernando", "San Jose", "Sipocot", "Siruma", "Tigaon", "Tinambac"],
        "Catanduanes": ["Bagamanoc", "Baras", "Bato", "Caramoran", "Gigmoto", "Pandan", "Panganiban (Payo)", "San Andres (Calolbon)", "San Miguel", "Viga", "Virac"],
        "Masbate": ["Aroroy", "Baleno", "Balud", "Batuan", "Cataingan", "Cawayan", "Claveria", "Dimasalang", "Esperanza", "Mandaon", "Masbate City", "Milagros", "Mobo", "Monreal", "Palanas", "Pio V. Corpuz (Limbuhan)", "Placer", "San Fernando", "San Jacinto", "San Pascual", "Uson"],
        "Sorsogon": ["Barcelona", "Bulan", "Bulusan", "Casiguran", "Castilla", "Donsol", "Gubat", "Irosin", "Juban", "Magallanes", "Matnog", "Pilar", "Prieto Diaz", "Santa Magdalena", "Sorsogon City"],
        "Aklan": ["Altavas", "Balete", "Banga", "Batan", "Buruanga", "Ibajay", "Kalibo", "Lezo", "Libacao", "Madalag", "Makato", "Malay", "Malinao", "Nabas", "New Washington", "Numancia", "Tangalan"],
        "Antique": ["Anini-y", "Barbaza", "Belison", "Bugasong", "Caluya", "Culasi", "Hamtic", "Laua-an", "Libertad", "Pandan", "Patnongon", "San Jose", "San Remigio", "Sebaste", "Sibalom", "Tibiao", "Tobias Fornier", "Valderrama"],
        "Capiz": ["Cuartero", "Dao", "Dumalag", "Dumarao", "Ivisan", "Jamindan", "Ma-ayon", "Mambusao", "Panay", "Panitan", "Pilar", "Pontevedra", "President Roxas", "Roxas City", "Sapi-an", "Sigma", "Tapaz"],
        "Guimaras": ["Buenavista", "Jordan", "Nueva Valencia", "San Lorenzo", "Sibunag"],
        "Iloilo": ["Ajuy", "Alimodian", "Anilao", "Badiangan", "Balasan", "Banate", "Barotac Nuevo", "Barotac Viejo", "Batad", "Bingawan", "Cabatuan", "Calinog", "Carles", "Concepcion", "Dingle", "Dueñas", "Dumangas", "Estancia", "Guimbal", "Igbaras", "Iloilo City", "Janiuay", "Lambunao", "Leganes", "Lemery", "Leon", "Maasin", "Miagao", "Mina", "New Lucena", "Oton", "Passi", "Pavia", "Pototan", "San Dionisio", "San Enrique", "San Joaquin", "San Miguel", "San Rafael", "Santa Barbara", "Sara", "Tigbauan", "Tubungan", "Zarraga"],
        "Negros Occidental": ["Bacolod", "Bago", "Binalbagan", "Cadiz", "Calatrava", "Candoni", "Cauayan", "Enrique B. Magalona", "Escalante", "Himamaylan", "Hinigaran", "Hinoba-an", "Ilog", "Isabela", "Kabankalan", "La Carlota", "La Castellana", "Manapla", "Moises Padilla", "Murcia", "Pontevedra", "Pulupandan", "Sagay", "Salvador Benedicto", "San Carlos", "San Enrique", "Silay", "Sipalay", "Talisay", "Toboso", "Valladolid", "Victorias"],
        "Bohol": ["Alburquerque", "Alicia", "Anda", "Antequera", "Baclayon", "Balilihan", "Batuan", "Bien Unido", "Bilar", "Buenavista", "Calape", "Candijay", "Carmen", "Catigbian", "Clarin", "Corella", "Cortes", "Dagohoy", "Danao", "Dauis", "Dimiao", "Duero", "Garcia Hernandez", "Guindulman", "Inabanga", "Jagna", "Lila", "Loay", "Loboc", "Loon", "Mabini", "Maribojoc", "Panglao", "Pilar", "President Carlos P. Garcia (Pitogo)", "Sagbayan (Borja)", "San Isidro", "San Miguel", "Sevilla", "Sierra Bullones", "Sikatuna", "Tagbilaran", "Talibon", "Trinidad", "Tubigon", "Ubay", "Valencia"],
        "Cebu": ["Alcantara", "Alcoy", "Alegria", "Aloguinsan", "Argao", "Asturias", "Badian", "Balamban", "Bantayan", "Barili", "Bogo", "Boljoon", "Borbon", "Carcar", "Carmen", "Catmon", "Cebu City", "Compostela", "Consolacion", "Cordoba", "Daanbantayan", "Dalaguete", "Danao", "Dumanjug", "Ginatilan", "Lapu-Lapu", "Liloan", "Madridejos", "Malabuyoc", "Mandaue", "Medellin", "Minglanilla", "Moalboal", "Naga", "Oslob", "Pilar", "Pinamungajan", "Poro", "Ronda", "Samboan", "San Fernando", "San Francisco", "San Remigio", "Santa Fe", "Santander", "Sibonga", "Sogod", "Tabogon", "Tabuelan", "Talisay", "Toledo", "Tuburan", "Tudela"],
        "Negros Oriental": ["Amlan", "Ayungon", "Bacong", "Bais", "Basay", "Bayawan", "Bindoy", "Canlaon", "Dauin", "Dumaguete", "Guihulngan", "Jimalalud", "La Libertad", "Mabinay", "Manjuyod", "Pamplona", "San Jose", "Santa Catalina", "Siaton", "Sibulan", "Tanjay", "Tayasan", "Valencia", "Vallehermoso", "Zamboanguita"],
        "Siquijor": ["Enrique Villanueva", "Larena", "Lazi", "Maria", "San Juan", "Siquijor"],
        "Biliran": ["Almeria", "Biliran", "Cabucgayan", "Caibiran", "Culaba", "Kawayan", "Maripipi", "Naval"],
        "Eastern Samar": ["Arteche", "Balangiga", "Balangkayan", "Borongan", "Can-avid", "Dolores", "General MacArthur", "Giporlos", "Guiuan", "Hernani", "Jipapad", "Lawaan", "Llorente", "Maslog", "Maydolong", "Mercedes", "Oras", "Quinapondan", "Salcedo", "San Julian", "San Policarpo", "Sulat", "Taft"],
        "Leyte": ["Abuyog", "Alangalang", "Albuera", "Babatngon", "Barugo", "Bato", "Baybay", "Burauen", "Calubian", "Capoocan", "Carigara", "Dagami", "Dulag", "Hilongos", "Hindang", "Inopacan", "Isabel", "Jaro", "Javier (Bugho)", "Julita", "Kananga", "La Paz", "Leyte", "MacArthur", "Mahaplag", "Matag-ob", "Matalom", "Mayorga", "Merida", "Ormoc", "Palo", "Palompon", "Pastrana", "San Isidro", "San Miguel", "Santa Fe", "Tabango", "Tabontabon", "Tacloban", "Tanauan", "Tolosa", "Tunga"],
        "Northern Samar": ["Allen", "Biri", "Bobon", "Capul", "Catarman", "Catubig", "Gamay", "Laoang", "Lapinig", "Las Navas", "Lavezares", "Lope de Vega", "Mapanas", "Mondragon", "Palapag", "Pambujan", "Rosario", "San Antonio", "San Isidro", "San Jose", "San Roque", "San Vicente", "Silvino Lobos", "Victoria"],
        "Samar": ["Almagro", "Basey", "Calbayog", "Calbiga", "Catbalogan", "Daram", "Gandara", "Hinabangan", "Jiabong", "Marabut", "Matuguinao", "Motiong", "Pagsanghan", "Paranas (Wright)", "Pinabacdao", "San Jorge", "San Jose de Buan", "San Sebastian", "Santa Margarita", "Santa Rita", "Santo Niño", "Tagapul-an", "Talalora", "Tarangnan", "Villareal", "Zumarraga"],
        "Southern Leyte": ["Anahawan", "Bontoc", "Hinunangan", "Hinundayan", "Libagon", "Liloan", "Limasawa", "Maasin", "Macrohon", "Malitbog", "Padre Burgos", "Pintuyan", "Saint Bernard", "San Francisco", "San Juan (Cabalian)", "San Ricardo", "Silago", "Sogod", "Tomas Oppus"],
        "Zamboanga del Norte": ["Baliguian", "Dapitan", "Dipolog", "Godod", "Gutalac", "Jose Dalman (Ponot)", "Kalawit", "Katipunan", "La Libertad", "Labason", "Leon B. Postigo (Bacungan)", "Liloy", "Manukan", "Mutia", "Piñan", "Polanco", "Pres. Manuel A. Roxas", "Rizal", "Salug", "Sergio Osmeña Sr.", "Siayan", "Sibuco", "Sibutad", "Sindangan", "Siocon", "Sirawai", "Tampilisan"],
        "Zamboanga del Sur": ["Aurora", "Bayog", "Dimataling", "Dinas", "Dumalinao", "Dumingag", "Guipos", "Josefina", "Kumalarang", "Labangan", "Lakewood", "Lapuyan", "Mahayag", "Margosatubig", "Midsalip", "Molave", "Pagadian", "Pitogo", "Ramon Magsaysay (Liargo)", "San Miguel", "San Pablo", "Sominot", "Tabina", "Tambulig", "Tigbao", "Tukuran", "Vincenzo A. Sagun"],
        "Zamboanga Sibugay": ["Alicia", "Buug", "Diplahan", "Imelda", "Ipil", "Kabasalan", "Mabuhay", "Malangas", "Naga", "Olutanga", "Payao", "Roseller Lim", "Siay", "Talusan", "Titay", "Tungawan"],
        "Iligan": ["Iligan"],
        "Iligan City": ["Iligan City"],
        "Cotabato": ["Alamada", "Aleosan", "Antipas", "Arakan", "Banisilan", "Carmen", "Kabacan", "Kidapawan", "Libungan", "M'lang", "Magpet", "Makilala", "Matalam", "Midsayap", "Pigcawayan", "Pikit", "President Roxas", "Tulunan"],
        "North Cotabato": ["Alamada", "Aleosan", "Antipas", "Arakan", "Banisilan", "Carmen", "Kabacan", "Kidapawan", "Libungan", "M'lang", "Magpet", "Makilala", "Matalam", "Midsayap", "Pigcawayan", "Pikit", "President Roxas", "Tulunan"],
        "South Cotabato": ["Bang", "General Santos (Dadiangas)", "Koronadal", "Lake Sebu", "Norala", "Polomolok", "Santo Niño", "Surallah", "T'Boli", "Tampakan", "Tantangan", "Tupi"],
        "Sultan Kudarat": ["Bagumbayan", "Columbio", "Esperanza", "Isulan", "Kalamansig", "Lambayong (Mariano Marcos)", "Lebak", "Lutayan", "Palimbang", "President Quirino", "Senator Ninoy Aquino"],
        "Agusan del Norte": ["Buenavista", "Butuan", "Cabadbaran", "Carmen", "Jabonga", "Kitcharao", "Las Nieves", "Magallanes", "Nasipit", "Remedios T. Romualdez (R.T.R.)", "Santiago", "Tubay"],
        "Agusan del Sur": ["Bayugan", "Bunawan", "Esperanza", "La Paz", "Loreto", "Prosperidad", "Rosario", "San Francisco", "San Luis", "Santa Josefa", "Talacogon", "Trento", "Veruela"],
        "Surigao del Norte": ["Alegria", "Bacuag", "Burgos", "Claver", "Dapa", "Del Carmen", "General Luna", "Gigaquit", "Mainit", "Malimono", "Pilar", "Placer", "San Benito", "San Francisco (Anao-Aon)", "San Isidro", "Santa Monica", "Sison", "Socorro", "Surigao City", "Tagana-an", "Tubod"],
        "Surigao del Sur": ["Barobo", "Bayabas", "Bislig", "Cagwait", "Cantilan", "Carmen", "Carrascal", "Cortes", "Hinatuan", "Lanuza", "Lianga", "Lingig", "Madrid", "Marihatag", "San Agustin", "San Miguel", "Tagbina", "Tago", "Tandag"],
        "Basilan": ["Akbar", "Al-Barka", "Hadji Mohammad Ajul", "Hadji Muhtamad", "Isabela City", "Lamitan", "Lantawan", "Maluso", "Sumisip", "Tabuan-Lasa", "Tipo-Tipo", "Tuburan", "Ungkaya Pukan"],
        "Lanao del Norte": ["Bacolod", "Baloi", "Baroy", "Iligan", "Kapatagan", "Kauswagan", "Kolambugan", "Lala", "Linamon", "Magsaysay", "Maigo", "Matungao", "Munai", "Nunungan", "Pantao Ragat", "Pantar", "Poona Piagapo", "Salvador", "Sapad", "Sultan Naga Dimaporo (Karomatan)", "Tagoloan", "Tangcal", "Tubod"],
        "Lanao del Sur": ["Bacolod-Kalawi (Bacolod-Grande)", "Balabagan", "Balindong (Watu)", "Bayang", "Binidayan", "Buadiposo-Buntong", "Bubong", "Bumbaran", "Butig", "Calanogas", "Ditsaan-Ramain", "Ganassi", "Kapai", "Kapatagan", "Lumba-Bayabao (Maguing)", "Lumbaca-Unayan", "Lumbatan", "Lumbayanague", "Madalum", "Madamba", "Maguing", "Malabang", "Marantao", "Marogong", "Masiu", "Mulondo", "Pagayawan (Tatarikan)", "Piagapo", "Poona Bayabao (Gata)", "Pualas", "Saguiaran", "Sultan Dumalondong", "Picong (Sultan Gumander)", "Tagoloan II", "Tamparan", "Taraka", "Tubaran", "Tugaya", "Wao"],
        "Maguindanao": ["Ampatuan", "Barira", "Buldon", "Buluan", "Datu Abdullah Sangki", "Datu Anggal Midtimbang", "Datu Blah T. Sinsuat", "Datu Hoffer Ampatuan", "Datu Montawal (Pagagawan)", "Datu Odin Sinsuat", "Datu Paglas", "Datu Piang", "Datu Salibo", "Datu Saudi-Ampatuan", "Datu Unsay", "General Salipada K. Pendatun", "Guindulungan", "Mamasapano", "Mangudadatu", "Matanog", "Northern Kabuntalan", "Pagalungan", "Paglat", "Pandag", "Parang", "Rajah Buayan", "Shariff Aguak (Maganoy)", "Shariff Saydona Mustapha", "South Upi", "Sultan Kudarat", "Sultan Mastura", "Sultan sa Barongis (Lambayong)", "Sultan Sumagka (Talitay)", "Talayan", "Talitay", "Upi"],
        "Sulu": ["Banguingui (Tongkil)", "Hadji Panglima Tahil (Marunggas)", "Indanan", "Jolo", "Kalingalan Caluang", "Lugus", "Luuk", "Maimbung", "Old Panamao", "Omar", "Pandami", "Panglima Estino (New Panamao)", "Pangutaran", "Parang", "Pata", "Patikul", "Siasi", "Talipao", "Tapul", "Tongkil"],
        "Tawi-Tawi": ["Bongao", "Languyan", "Mapun (Cagayan de Tawi-Tawi)", "Panglima Sugala (Balimbing)", "Sapa-Sapa", "Sibutu", "Simunul", "Sitangkai", "South Ubian", "Tandubas", "Turtle Islands (Tawi-Tawi)", "Udala"]
      }

      const barangays = {
        "Metro Manila": {"Manila": [
            "Binondo", "Ermita", "Intramuros", "Malate", "Paco", "Pandacan",
            "Port Area", "Quiapo", "Sampaloc", "San Andres", "San Miguel",
            "San Nicolas", "Santa Ana", "Santa Cruz", "Santa Mesa", "Tondo",
          ],
          "Caloocan": [
            "Bagong Barrio East", "Bagong Barrio West", "Bagong Silang", "Bagumbong", "Bankers Village",
            "Barangka", "Camarin", "Congress Village", "Deparo", "Fairview",
            "Kaybiga", "Llano", "Malaria", "Maligaya", "Maypajo",
            "Novaliches Proper", "San Agustin", "San Bartolome", "Sangandaan", "Tala",
            "Unang Sigaw", "Unang Sigaw", "Zabarte", "Camarian", "Llano",
          ],
          "Las Piñas": [
            "Almanza Uno", "Almanza Dos", "CAA-BF International", "Daniel Fajardo", "Elias Aldana",
            "Ilaya", "Manuyo Uno", "Manuyo Dos", "Pamplona Uno", "Pamplona Dos",
            "Pilar", "Pulang Lupa Uno", "Pulang Lupa Dos", "Talon Uno", "Talon Dos",
            "Talon Tres", "Talon Cuatro", "Talon Singko", "Zapote", "Almanza", "Pulang Lupa",
          ],
          "Makati": [
            "Bangkal", "Bel-Air", "Carmona", "Cembo", "Comembo", "Dasmarinas",
            "East Rembo", "Forbes Park", "Guadalupe Nuevo", "Guadalupe Viejo",
            "Kasilawan", "La Paz", "Magallanes", "Olympia", "Palanan",
            "Pembo", "Pinagkaisahan", "Pio Del Pilar", "Pitogo", "Poblacion",
            "Post Proper Northside", "Post Proper Southside", "Rizal", "San Antonio",
            "San Isidro", "San Lorenzo", "Santa Cruz", "Singkamas", "South Cembo",
            "Tejeros", "Urdaneta", "Valenzuela", "West Rembo",
          ],
          "Malabon": [
            "Acacia", "Baritan", "Bayan-bayanan", "Catmon", "Concepcion", "Dampalit",
            "Flores", "Hulong Duhat", "Ibaba", "Longos", "Maysilo", "Muzon",
            "Niugan", "Potrero", "San Agustin", "Santolan", "Tinajeros", "Tugatog",
          ],
          "Mandaluyong": [
            "Bagong Silang", "Barangka Drive", "Barangka Ilaya", "Barangka Itaas", "Buayang Bato", "Daang Bakal",
            "Hagdang Bato", "Harapin Ang Bukas", "Highway Hills", "Hulo", "Mabini-J. Rizal", "Malamig",
            "Namayan", "New Zañiga", "Old Zañiga", "Pag-Asa", "Plainview", "Pleasant Hills",
            "Poblacion", "San Jose", "Vergara", "Wack-Wack Greenhills", "Wack-Wack Greenhills",
          ],
          "Marikina": [
            "Barangka", "Concepcion Dos", "Concepcion Uno", "Dela Peña", "Industrial Valley Complex", "Jesus Dela Peña",
            "Kalumpang", "Malanday", "Malanday", "Mambagat", "Nangka", "Parang",
            "San Roque", "Santa Elena", "Santo Niño", "Tañong", "Tumana", "Tumana",
            "Tumana", "Tumana", "Tumana", "Tumana", "Tumana", "Tumana", "Tumana",
            "Tumana", "Tumana", "Tumana", "Tumana", "Tumana", "Tumana",
          ],
          "Muntinlupa": [
            "Alabang", "Ayala Alabang", "Bayanan", "Buli", "Cupang", "Poblacion",
            "Putatan", "Sucat", "Tunasan",
          ],
          "Navotas": [
            "Bagumbayan North", "Bagumbayan South", "Bangculasi", "Daanghari", "Navotas East", "Navotas West",
            "North Bay Boulevard North", "North Bay Boulevard South", "San Jose", "Sipac-Almacen", "Tangos",
          ],
          "Parañaque": [
            "Baclaran", "Don Bosco", "La Huerta", "Marcelo Green Village", "Merville", "Moonwalk",
            "San Antonio", "San Dionisio", "San Isidro", "San Juan", "San Martin De Porres", "Santo Niño",
            "Sun Valley", "Tambo",
          ],
          "Pasay": [
            "Apelo Cruz", "Baclaran", "Baltao", "Bay City", "Cabrera", "Cartimar",
            "Cuyegkeng", "Don Carlos Village", "Edang", "F. B. Harrison", "Juan Sumulong",
            "Kalayaan", "Leveriza", "Libertad", "Malibay", "Manila Bay Reclamation",
            "Marcela Marcelo", "Maricaban", "M. Dela Cruz", "Newport City", "Nichols",
            "Padre Burgos", "Pasay Rotonda", "Philippine International Convention Center",
            "Pildera I", "Pildera II", "Rivera Village", "San Pablo", "San Isidro",
            "San Jose", "San Rafael", "San Roque", "Santa Clara", "Santo Niño",
            "Tramo", "Tripa de Gallina", "Ventanilla", "Villamor",
          ],
          "Pasig": [
            "Bagong Ilog", "Bagong Katipunan", "Bambang", "Buting", "Caniogan", "Dela Paz",
            "Kalawaan", "Kapitolyo", "Malinao", "Manggahan", "Maybunga", "Oranbo",
            "Palatiw", "Pinagbuhatan", "Pineda", "Rosario", "Sagad", "San Antonio",
            "San Joaquin", "San Jose", "San Juan", "Santa Cruz", "Santo Tomas", "Santolan",
            "Sumilang", "Ugong",
          ],
          "Pateros": [
            "Aguho", "Cayetano", "Martinez", "Poblacion", "San Roque", "Santo Rosario",
            "Tabacalera",
          ],
          "Quezon City": [
            "Alicia", "Amihan", "Apolonio Samson", "Aurora", "Bagong Lipunan Ng Crame", "Bagong Pag-Asa",
            "Bagong Silangan", "Bagumbayan", "Baesa", "Balingasa", "Batasan Hills", "Bayanihan",
            "Blue Ridge A", "Blue Ridge B", "Botocan", "Bungad", "Camp Aguinaldo", "Capri",
            "Central", "Claro", "Commonwealth", "Culiat", "Damar", "Damayan", "Damayang Lagi",
            "Dangay", "Del Monte", "Diliman", "Don Manuel", "Doña Aurora", "Doña Imelda", "Doña Josefa",
            "Doña Juana Subdivision", "E. Rodriguez", "East Kamias", "Escopa", "Fairview", "Galas",
            "Gulod", "Horseshoe", "Immaculate Concepcion", "Kaligayahan", "Kalusugan", "Kamuning", "Katipunan",
            "Kaunlaran", "Krus Na Ligas", "Laging Handa", "Libis", "Lourdes", "Loyola Heights",
            "Maharlika", "Malaya", "Mangga", "Manresa", "Mariblo", "Masagana", "Masambong",
            "Matalahib", "Matandang Balara", "Milagrosa", "Nagkaisang Nayon", "Nayon Kaunlaran", "New Era", "North Fairview",
            "Novaliches Proper", "Obrero", "Old Capitol Site", "Olympia", "Paltok", "Pansol", "Paraiso",
            "Pasong Putik Proper", "Pasong Tamo", "Payatas", "Phil-Am", "Pinyahan", "Project 1", "Project 2",
            "Project 3", "Project 4", "Project 5", "Project 6", "Project 7", "Project 8", "Quirino 2-A",
            "Quirino 2-B", "Quirino 2-C", "Quirino 2-D", "Quirino 3-A", "Quirino 3-B", "Quirino 3-C", "Quirino 3-D",
            "Quirino 3-E", "Quirino 3-F", "Ramon Magsaysay", "Roxas", "Sacred Heart", "Salvacion", "San Agustin",
            "San Antonio", "San Bartolome", "San Isidro Labrador", "San Isidro Makati", "San Jose", "San Juan",
            "San Martin De Porres", "San Roque", "Santa Cruz", "Santa Lucia", "Santa Monica", "Santol",
            "Santo Niño", "Santol", "Sauyo", "Sikatuna Village", "Silangan", "Socorro", "South Triangle",
            "Sta. Teresita", "Tagumpay", "Talayan", "Talipapa", "Tandang Sora", "Tatalon", "Teacher's Village",
            "U.P. Campus", "U.P. Village", "Ugong Norte", "Ugong Sur", "Valencia", "Vasra", "Veterans Village",
            "Villa Maria Clara", "Villa Maria Cristina", "West Kamias", "West Triangle", "White Plains", "Zaniga",
          ],
          "San Juan": [
            "Addition Hills", "Balong Bato", "Batis", "Corazon De Jesus", "Ermitaño", "Greenhills",
            "Halo-Halo", "Isabelita", "Kabayanan", "Little Baguio", "Maytunas", "Onse", "Pasadena", "Pedro Cruz",
            "Progreso", "Rivera", "Salapan", "San Perfecto", "Santa Lucia", "St. Joseph",
            "Sta. Teresita", "Sto. Domingo", "Tibagan", "West Crame",
          ],
          "Taguig": [
            "Bagong Tanyag", "Bagumbayan", "Bambang", "Calzada", "Central Bicutan", "Central Signal Village",
            "Fort Bonifacio", "Hagonoy", "Ibayo-Tipas", "Katuparan", "Ligid-Tipas", "Lower Bicutan",
            "Maharlika Village", "Napindan", "New Lower Bicutan", "North Daang Hari", "North Signal Village", "Palingon",
            "Pinagsama", "South Daang Hari", "South Signal Village", "Tanyag", "Tuktukan", "Upper Bicutan",
            "Ususan", "Wawa",
          ],
          "Valenzuela": [
            "Balangkas", "Bignay", "Canumay East", "Canumay West", "Coloong", "Dalandanan",
            "Isla", "Karuhatan", "Lingunan", "Mabolo", "Malanday", "Malanday", "Marpalac",
            "Maysan", "Pariancillo Villa", "Pasolo", "Poblacion", "Polo", "Punturin",
            "Rincon", "Tagalag", "Valenzuela Industrial Subdivision", "Viente Reales", "Wawang Pulo", "Wawang Pulo",
          ],
            "Bangued": ["Angad", "Bulinlao", "Cosili East", "Cosili West", "Dangdangla", "Lipcan", "Lubong", "Macarcarmay", "Macray", "Malita", "Palao", "Patucannay", "Sagap", "Sao-atan", "Sappaac", "Sinapangan", "Tablac", "Ubbog", "Zaragoza"],
            "Boliney": ["Amado", "Apao", "Bao-yan", "Dumalneg", "Ib-ibague", "Labaan", "Lussoc", "Poblacion", "Saliok", "Suaco", "Umnap", "Zumigui"],
            "Bucay": ["Banglolao", "Butao", "Cabusligan", "Cabusog", "Calao", "Lingtan", "Manzano", "Mudiit", "Poblacion", "Saksak", "Tagaytay", "Tattawa", "Tolong", "Zaragosa"],
            "Bucloc": ["Aba-abag", "Allig", "Dangoy", "Lingoy", "Poblacion", "Pugong", "Salnec", "Silagan"],
            "Daguioman": ["Alunogan", "Baracbac", "Budac", "Lubong", "Lumaba", "Mataddi", "Poblacion", "San Antonio"],
            "Danglas": ["Busilac", "Dagupan", "Lubong", "Macarcarmay", "Padangitan", "Pangal Norte", "Pangal Sur", "Poblacion"],
            "Dolores": ["Banacao", "Lingoy", "Malun-at", "Matallucoc", "Poblacion", "Silag"],
            "La Paz": ["Bissang", "Danac East", "Danac West", "Gaddani", "Macarcarmay", "Mudiit", "Pang-ot", "Poblacion", "Sangay", "Tui", "Turikbugan"],
            "Lacub": ["Dagupan", "Lapat-Balantay", "Luhong", "Poblacion", "Salucag", "Villa Mercedes"],
            "Lagangilang": ["Bacsil", "Lanec", "Lucban", "Mudiit", "Padangitan", "Paldit", "Poblacion", "San Antonio", "San Isidro", "San Jose", "San Juan", "San Pascual", "San Roque", "Santiago", "Simimbaan"],
            "Lagayan": ["Abualan", "Badduat", "Bisangol", "Caoayan", "Daramuangan", "Lingoy", "Palaqui", "Poblacion", "Tubongan", "Ubbog"],
            "Langiden": ["Calabigan", "Guesang", "Lingoy", "Poblacion", "Sawadan"],
            "Licuan-Baay": ["Buneg", "Busilac", "Luhong", "Malapaao", "Poblacion"],
            "Luba": ["Abualan", "Bangar", "Bao-yan", "Gaddani", "Lilimasan", "Lingoy", "Lussoc", "Poblacion", "Sagap"],
            "Malibcong": ["Ayyeng", "Duldulao", "Lap-lapog", "Lubong", "Maguyepyep", "Poblacion", "Turod"],
            "Manabo": ["Ayyeng", "Binasaran", "Dolores", "Gussad", "Laang", "Pacac", "Poblacion", "Sarsaracat", "Saub"],
            "Peñarrubia": ["Aluyon", "Caganayan", "Cal-litang", "Caliplasan", "Eheb", "Kibengan", "Malamsit", "Poblacion"],
            "Pidigan": ["Amdalao", "Binablayan", "Lubong", "Maluneg", "Poblacion", "Ponghal", "San Juan"],
            "Pilar": ["Cabaroan", "Dadaray", "Nagongburan", "Poblacion", "San Marcial", "Sao-atan"],
            "Sallapadan": ["Alaoa", "Alin", "Cagubatan", "Lapat-Balantay", "Mudiit", "Poblacion", "San Francisco", "San Marcos"],
            "San Isidro": ["Ap-apaya", "Bantay", "Duldulao", "Labaan", "Lubong", "Macayepyep", "Mang-ayadan", "Poblacion", "Salucag"],
            "San Quintin": ["Bayabas", "Binalay", "Calaocan", "Calanutian", "Dumayco", "Langayan", "Luba", "Nagcullooban", "Nagrayan", "Namit-ingan", "Nunggawa", "Poblacion", "Quinagbag", "San Ramon", "Santa Filomena"],
            "Tayum": ["Cabaruan", "Calaocan", "Dumayco", "Langayan", "Luba", "Nagcullooban", "Nagrayan", "Namit-ingan", "Nunggawa", "Poblacion", "Quinagbag", "San Ramon", "Santa Filomena"],
            "Tineg": ["Aguid", "Dagupan", "Danac East", "Danac West", "Gaddani", "Lanec", "Lumobang", "Poblacion", "San Isidro", "San Jose", "San Juan", "San Marcial", "Santa Rosa", "Tallalang", "Tamalunog", "Turikbugan"],
            "Tubo": ["Allig", "Barocboc", "Busilac", "Dagupan", "Gaddani", "Kapacuan", "Lubong", "Mudiit", "Naguilian", "Nungawa", "Poblacion", "San Antonio", "San Francisco", "Santa Rosa", "Sugbongcogon", "Supi-il", "Taggay"],
            "Villaviciosa": ["Banacao", "Dagupan", "Gallad", "Lap-lapog", "Mudiit", "Poblacion", "San Antonio", "San Francisco", "San Isidro"],
        // Define barangays for other regions and municipalities as well.
        },
        "Abra": {

        }

      };
      

    const [selectedProvinces, setSelectedProvinces] = useState([]);
    const [municipality, setMunicipality] = useState([]);
    const [selectedBarangays, setSelectedBarangays] = useState([]);


    const [data, setData] = useState({
        merchant: {
            merchant_id: 2,
            merchant_name: "",
            email_address: "",
            logo: "",
            contact_number: '',
            sched_id: ""
        },
        address: {
            country: "",  
            region: "",
            province: "",
            municipality: "",
            barangay: "",
        },
        settings: {
            branch: "",
            description: "",
        },
        accounts: {
            email: "",
            position: "",
        }
    });

    const request = {
        params: {
          col: 'merchant_id',
          val: 2
        }
      }

    useEffect(() => {
        setIsLoading(true);
        console.log("BARANGAYS ARE " + barangays['Metro Manila'].Manila);
        axios.get(`${config.API}/merchant/retrieve`, request)
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.log(error);
        })
        setIsLoading(false);
    }, []);

    const handleChange = (e:any) => {
        const { name, value } = e.target;

        setData((prevData: any) => {

            //if input data is from object settings
            if(name.startsWith('settings.')) {
                const settingsKey = name.split('.')[1];
                return {
                    ...prevData,
                    settings: {
                        ...prevData.settings,
                        [settingsKey]: value,
                    },
                };
            }
            else if(name.startsWith('address.')) {
                const addressKey = name.split('.')[1];
                if (addressKey === 'region') {
                    // Update the selected region
                    const selectedRegion = value;
                    // Get the corresponding provinces for the selected region
                    setSelectedProvinces(regionProvinces[selectedRegion] || []);
                return {
                    ...prevData,
                    address: {
                    ...prevData.address,
                    [addressKey]: selectedRegion,
                    province: selectedProvinces[0] || '', // Set the first province as default
                    },
                    };
                  }
                if (addressKey === 'province'){
                    const selectedProvince = value;
                    setMunicipality(provinceMunicipalities[selectedProvince] || []);
                    return {
                        ...prevData,
                        address: {
                        ...prevData.address,
                        [addressKey]: selectedProvince,
                        municipality: municipality[0] || '', // Set the first province as default
                        },
                        };
                }

                if (addressKey === 'municipality') {
                    const selectedMunicipality = value;
                    setSelectedBarangays(barangays[selectedMunicipality] || []);
                    return {
                      ...prevData,
                      address: {
                        ...prevData.address,
                        [addressKey]: selectedMunicipality,
                        barangay: '',
                      },
                    };
                }
                
                return {
                    ...prevData,
                    address: {
                        ...prevData.address,
                        [addressKey]: value,
                    },
                };
            }
            else if(name.startsWith('merchant.')){
                const merchantKey = name.split('.')[1];
                return {
                    ...prevData,
                    merchant: {
                        ...prevData.merchant,
                        [merchantKey]: value,
                    },
                };
            }
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = data;
        console.log(formData);

        axios.post(`${config.API}/merchant/update`, formData)
        .then(function(response){
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        })
    }
    return (
        <>
            <div style={{fontFamily: 'Poppins, sans-serif'}} className="w-auto h-auto bg-white m-8 p-5 rounded-lg animate-fade-in">
                <div className='flex flex-row mr-5 ml-5'>
                    <PiBinoculars size={40} />
                    <h3 className='text-2xl mb-2 p-1'><strong>Business Overview</strong></h3>
                </div>
                
                <form className="mt-2 mr-5 ml-5" onSubmit={handleSubmit}> 
                    <div className="m-2 flex flex-row ">
                        <label className="text-lg p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Business Logo
                            </label>
                                {isLoading? <><span className='ml-5'><GenSpinner/></span></> // if we are still getting data from DB
                                :
                                <img src={jjlogo} onError={(e) => {
                                    e.currentTarget.onerror = null; // Prevent infinite loop if the image itself is not found
                                    e.currentTarget.src = 'https://i.imgur.com/YNoZzmJ.png'; // Use a placeholder image as a fallback
                                    }} className="ml-5">
                                </img>}
                                
                        </div>
                        <div className="m-2 flex flex-row ">
                            <label className="text-lg p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Business Name
                            </label>
                            <input
                                type="text"
                                value={isLoading? "Loading... ": data.merchant.merchant_name || "Enter your business name here..."}
                                disabled = {isLoading}
                                onChange={handleChange}
                                name="merchant.merchant_name"
                                className={`m-2 ml-2 p-2 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed':''}`}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg mr-4 p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Branch Name
                            </label>
                            <input
                                type="text"
                                value={isLoading? "Loading... ": data.settings.branch || "Enter your branch name here... "}
                                disabled = {isLoading}
                                onChange={handleChange}
                                name="settings.branch"
                                className={`m-2 ml-5 p-2 text w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed':''}`}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg mr-9 p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Description
                            </label>
                            <textarea
                                value={isLoading? "Loading... ": data.settings.description || "Enter your business description here..."}
                                disabled = {isLoading}
                                onChange={handleChange}
                                name="settings.description"
                                className={`m-2 ml-9 p-2 text w-full flex border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed':''}`}
                                required
                            />
                        </div>
                        <div className='m-4 flow-root'>
                            <button
                                type="submit"
                                disabled = {isLoading}
                                className={`px-10 py-1 mr-2 float-right text-white rounded-2xl focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'bg-[#c58f8f] cursor-not-allowed' : ' bg-[#840705] hover:bg-[#660605]'}`}
                            >
                            Save
                            </button>
                        </div>
                </form>
            </div>

            <div style={{fontFamily: 'Poppins, sans-serif'}} className="w-auto h-auto bg-white m-8 p-5 rounded-lg">
                <div className='flex flex-row mr-5 ml-5'>
                    <IoLocation size={40} />
                    <h3 className='text-2xl mb-2 p-1'><strong>Business Address</strong></h3>
                </div>
                <form className="mt-2 mr-5 ml-5" onSubmit={handleSubmit}> 
                        <div className="m-2 flex flex-row">
                            <label className="text-lg mr-16 p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Country
                            </label>
                            <select
                                name="address.country"
                                value={data.address.country || "Select Country"}
                                onChange={handleChange}
                                className="m-2 p-2 ml-2 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="Canada">Canada</option>
                                <option value="Philippines">Philippines</option>
                                <option value="US">United States</option>
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-16 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Region
                            </label>
                            <select
                                name="address.region"
                                value={data.address.region || "Select Region"}
                                onChange={handleChange}
                                className="m-2 p-2 ml-[1.1rem] text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                  <option value="">Select Region</option>
                                {regionNames.map((regionName:string) => (
                                    <option key={regionName} value={regionName}>
                                    {regionName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-[3.6rem] w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Province
                            </label>
                            <select
                                name="address.province"
                                value={data.address.province || "Select Province"}
                                onChange={handleChange}
                                className="m-2 p-2 ml-2 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Province</option>
                                {selectedProvinces.map((province) => (
                                    <option key={province} value={province}>
                                    {province}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-6 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Municipality
                            </label>
                            <select
                                name="address.municipality"
                                value={data.address.municipality || "Select Municipality"}
                                onChange={handleChange}
                                className="m-2 p-2 ml-2 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Municipality</option>
                                {municipality.map((municipality) => (
                                    <option key={municipality} value={municipality}>
                                    {municipality}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-[2.85rem] w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Barangay
                            </label>
                            <select
                                name="address.barangay"
                                value={data.address.barangay || "Select Barangay"}
                                onChange={handleChange}
                                className="m-2 p-2 ml-2 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                 <option value="">Select Barangay</option>
                                {selectedBarangays.map((barangay) => (
                                    <option key={barangay} value={barangay}>
                                    {barangay}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='m-4 flow-root'>
                            <button
                                type="submit"
                                className="px-10 py-1 mr-2 float-right bg-[#840705] text-white text-m rounded-2xl hover:bg-[#660605] focus:outline-none focus:ring focus:ring-blue-500 transition-colors delay-250 duration-[3000] ease-in"
                            >
                            Save
                            </button>
                        </div>
                </form>
            </div>

            <div style={{fontFamily: 'Poppins, sans-serif'}} className="w-auto h-auto bg-white m-8 p-5 rounded-lg">
                <div className='flex flex-row mr-5 ml-5'>
                    <MdPhone size={40} />
                    <h3 className='text-2xl mb-2 p-1'><strong>Contact Details</strong></h3>
                </div>
                <form className="mt-2 mr-5 ml-5" onSubmit={handleSubmit}> 
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Contact Number
                            </label>
                            <input
                                type="tel"
                                maxLength={11}
                                name="merchant.contact_number"
                                value={isLoading? "Loading... " : data.merchant.contact_number || "+63"}
                                disabled= {isLoading}
                                onChange={handleChange}
                                className={`m-2 ml-5 p-2 text w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed': ''} `}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-[2.15rem] w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="merchant.email_address"
                                value={isLoading? "Loading... " : data.merchant.email_address || "example@abc.com"}
                                disabled = {isLoading}
                                onChange={handleChange}
                                className={`m-2 ml-9 p-2 text w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed': ''}`}
                                required
                            />
                        </div>
                        <div className='m-4 flow-root'>
                            <button
                                type="submit"
                                className={`px-10 py-1 mr-2 float-right text-white rounded-2xl focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'bg-[#c58f8f] cursor-not-allowed' : ' bg-[#840705] hover:bg-[#660605]'}`}
                            >
                            Save
                            </button>
                        </div>
                </form>
            </div>
        </>
        
    )
}