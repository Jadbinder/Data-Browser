class Item{
	constructor(name, iClass, cost, mythic, stat, Image){
		this.name = name;
		this.iClass = iClass;
		this.cost = cost;
		this.mythic = mythic;
		this.stat = stat;
		this.Image = Image;
	}
}

const Rabadon = new Item("Rabadon's Deathcap", "Mage", "3600", false, "AP", "rabadon.png");
const Youmuu = new Item("Youmuu's Ghostblade", "Assassin", "3100", true, "AD", "youmuu.jpg");
const Trinity = new Item("Trinity Force", "Bruiser", "3333", true, "AD", "trinity.jpg");
const Liandry = new Item("Liandry's Anguish", "Mage", "3200", true, "AP", "liandry.jpg");
const Sunfire = new Item("Sunfire Cape", "Tank", "2750", false, "Armor", "sunfire.jpg");

const items = [];
items.push(Rabadon);
items.push(Youmuu);
items.push(Trinity);
items.push(Liandry);
items.push(Sunfire);

const itemJSON = JSON.stringify(items);


function generate(){
	document.getElementById("demo").innerHTML = itemJSON;
};

const itemArray = [];
function request(){
var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === XMLHttpRequest.DONE){
			if (httpRequest.status === 200){
				const data = JSON.parse(httpRequest.responseText);
				for(let i = 0; i < data.length; i++){
					const temp = new Item(data[i].name, data[i].iClass, data[i].cost, data[i].mythic, data[i].stat, data[i].Image);
					
					itemArray.push(temp);
					
					console.log(itemArray[i]);
				}
				let removeGen = document.getElementById('gen');
				removeGen.remove()
				let div = document.getElementById('n/p');
				let previousButton = document.createElement('input');
				let nextButton = document.createElement('input');
				let editButton = document.createElement('input');
				let lineBreak = document.createElement('br');
				let deleteButton = document.createElement('input');
				let sortAlphabetical = document.createElement('input');
				let sortDefault = document.createElement('input');
				
				let firstButton = document.createElement('input');
				let lastButton = document.createElement('input');
				let displayIndexButton = document.createElement('input');
				let totalButton = document.createElement('input');
				/*
				if(div.hasChildNodes()){
					let removePrevious = document.getElementById('pButton');
					let removeNext = document.getElementById('nButton');
					removePrevious.remove()
					removeNext.remove()
				}
				previousButton.remove();
				nextButton.remove();
				editButton.remove();
				*/
				previousButton.type = 'Button';
				previousButton.value = 'Previous';
				previousButton.id = 'pButton';
				previousButton.onclick = function(){previous(itemArray);};
				div.appendChild(previousButton);
				nextButton.type = 'Button';
				nextButton.value = 'Next';
				nextButton.id = 'nButton';
				nextButton.onclick = function(){next(itemArray);};
				div.appendChild(nextButton);
				
				firstButton.type = 'Button';
				firstButton.value = 'First';
				firstButton.id = 'fButton';
				firstButton.onclick = function(){first();};
				div.appendChild(firstButton);
				
				lastButton.type = 'Button';
				lastButton.value = 'Last';
				lastButton.id = 'lButton';
				lastButton.onclick = function(){last();};
				div.appendChild(lastButton);
				
				displayIndexButton.type = 'Button';
				displayIndexButton.value = 'Display Current Index';
				displayIndexButton.id = 'dIButton';
				displayIndexButton.onclick = function(){displayCurrentIndex();};
				div.appendChild(displayIndexButton);
				
				totalButton.type = 'Button';
				totalButton.value = 'Total items';
				totalButton.id = 'tButton';
				totalButton.onclick = function(){total();};
				div.appendChild(totalButton);
				
				editButton.type = 'Button';
				editButton.value = 'Edit';
				editButton.id = 'eButton';
				editButton.onclick = function(){edit();};
				div.appendChild(editButton);
				
				deleteButton.type = 'Button';
				deleteButton.value = 'Delete';
				deleteButton.id = 'dButton';
				deleteButton.onclick = function(){deleteE();};
				div.appendChild(deleteButton);
				
				sortAlphabetical.type = 'Button';
				sortAlphabetical.value = 'Sort Alphabetical';
				sortAlphabetical.id = 'sortaButton';
				sortAlphabetical.onclick = function(){sortA();};
				div.appendChild(sortAlphabetical);
				
				sortDefault.type = 'Button';
				sortDefault.value = 'Sort by Default';
				sortDefault.id = 'sortdButton';
				sortDefault.onclick = function(){sortD();};
				div.appendChild(sortDefault);
				
				const form = document.createElement('form');
				form.setAttribute('id', 'uploadForm');
				form.setAttribute('enctype', 'multipart/form-data');

				const fileInput = document.createElement('input');
				fileInput.setAttribute('type', 'file');
				fileInput.setAttribute('name', 'fileup');
				fileInput.setAttribute('id', 'fileup');

				const submitBtn = document.createElement('input');
				submitBtn.setAttribute('type', 'submit');
				submitBtn.setAttribute('value', 'Insert');
				submitBtn.setAttribute('name', 'submit');

				form.appendChild(submitBtn);
				form.appendChild(lineBreak);
				form.appendChild(fileInput);

				div.appendChild(form);
				
				const form2 = document.getElementById('uploadForm');
				form2.addEventListener('submit', function(event) {
				event.preventDefault();

				const formData = new FormData(form);

				fetch('uploadfile.php', {
					method: 'POST',
					body: formData
				})
				.then(response => response.text())
				.then(data => {
					insert(data);
				})
				.catch(error => {
					console.error('Error:', error);
				});
				});
				
				createTable(0);
				
				count2();
			}
		}
	};
	httpRequest.open('GET', "http://localhost/mysite/lab8/items.json", true);
	httpRequest.send();
}
	

function createTable(x){
	document.getElementById("iName").value = itemArray[x].name;
	document.getElementById("iClass").value = itemArray[x].iClass;
	document.getElementById("iCost").value = itemArray[x].cost;
	document.getElementById("iMythic").value = itemArray[x].mythic;
	document.getElementById("iStat").value = itemArray[x].stat;
	let im = document.getElementById("htmlimage");
	im.setAttribute("width", "300");
	im.setAttribute("height", "300");
	im.setAttribute("src", itemArray[x].Image);
}

var count = 1;
var maxCount = 5;
var sortMethod = "default";

function count2(){
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === XMLHttpRequest.DONE){
			if (httpRequest.status === 200){
				const data = JSON.parse(httpRequest.responseText);
				maxCount = data.count;
			}
		}
	};
	httpRequest.open('GET', "http://localhost/mysite/lab8/count.php", true);
	httpRequest.send();
}

function first(){
	count = 1;
	count = count - 1;
	const countJSON = JSON.stringify(count);
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === XMLHttpRequest.DONE){
			if (httpRequest.status === 200){
				const data = JSON.parse(httpRequest.responseText);
				document.getElementById("iName").value = data.name;
				document.getElementById("iClass").value  = data.iClass;
				document.getElementById("iCost").value = data.cost;
				document.getElementById("iMythic").value  = data.mythic;
				document.getElementById("iStat").value = data.stat;
				let im = document.getElementById("htmlimage");
				im.setAttribute("width", "300");
				im.setAttribute("height", "300");
				im.setAttribute("src", data.image);;
				count = count + 1;
				count2();
			}
		}
	};
	httpRequest.open('GET', "http://localhost/mysite/lab8/items.php?itemCount="+countJSON+"&sortM="+sortMethod, true);
	httpRequest.send();
}

function last(){
	count = maxCount;
	count = count - 1;
	const countJSON = JSON.stringify(count);
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === XMLHttpRequest.DONE){
			if (httpRequest.status === 200){
				const data = JSON.parse(httpRequest.responseText);
				document.getElementById("iName").value = data.name;
				document.getElementById("iClass").value  = data.iClass;
				document.getElementById("iCost").value = data.cost;
				document.getElementById("iMythic").value  = data.mythic;
				document.getElementById("iStat").value = data.stat;
				let im = document.getElementById("htmlimage");
				im.setAttribute("width", "300");
				im.setAttribute("height", "300");
				im.setAttribute("src", data.image);;
				count = count + 1;
				count2();
			}
		}
	};
	httpRequest.open('GET', "http://localhost/mysite/lab8/items.php?itemCount="+countJSON+"&sortM="+sortMethod, true);
	httpRequest.send();
}

function displayCurrentIndex(){
	alert(count);
}

function total(){
	alert(maxCount);
}

function previous(){
	if(count == 1){
		count = maxCount;
	}
	else{
		count--;
	}
	count = count - 1;
	const countJSON = JSON.stringify(count);
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === XMLHttpRequest.DONE){
			if (httpRequest.status === 200){
				const data = JSON.parse(httpRequest.responseText);
				document.getElementById("iName").value = data.name;
				document.getElementById("iClass").value  = data.iClass;
				document.getElementById("iCost").value = data.cost;
				document.getElementById("iMythic").value  = data.mythic;
				document.getElementById("iStat").value = data.stat;
				let im = document.getElementById("htmlimage");
				im.setAttribute("width", "300");
				im.setAttribute("height", "300");
				im.setAttribute("src", data.image);;
				count = count + 1;
				count2();
			}
		}
	};
	httpRequest.open('GET', "http://localhost/mysite/lab8/items.php?itemCount="+countJSON+"&sortM="+sortMethod, true);
	httpRequest.send();
}

function next(){
	if(count == maxCount){
		count = 1;
	}
	else{
		count++;
	}
	count = count - 1;
	const countJSON = JSON.stringify(count);
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === XMLHttpRequest.DONE){
			if (httpRequest.status === 200){
				const data = JSON.parse(httpRequest.responseText);
				document.getElementById("iName").value = data.name;
				document.getElementById("iClass").value  = data.iClass;
				document.getElementById("iCost").value = data.cost;
				document.getElementById("iMythic").value  = data.mythic;
				document.getElementById("iStat").value = data.stat;
				let im = document.getElementById("htmlimage");
				im.setAttribute("width", "300");
				im.setAttribute("height", "300");
				im.setAttribute("src", data.image);;
				count = count + 1;
				count2();
			}
		}
	};
	httpRequest.open('GET', "http://localhost/mysite/lab8/items.php?itemCount="+countJSON+"&sortM="+sortMethod, true);
	httpRequest.send();
}

function database(){
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === XMLHttpRequest.DONE){
			if (httpRequest.status === 200){
				alert(httpRequest.responseText);
				const data = JSON.parse(httpRequest.responseText);
			}
		}
	};
	httpRequest.open('GET', "http://localhost/mysite/lab8/Sql.php", true);
	httpRequest.send();
}

function edit(){
	document.getElementById("iName").readOnly = false; 
	document.getElementById("iClass").readOnly = false; 
	document.getElementById("iCost").readOnly = false; 
	document.getElementById("iMythic").readOnly = false; 
	document.getElementById("iStat").readOnly = false; 
}

function insert(iImage){
	var newMax = maxCount;
	newMax++;
	alert(newMax);
	var insert = new Item(document.getElementById("iName").value, document.getElementById("iClass").value, document.getElementById("iCost").value, document.getElementById("iMythic").value, document.getElementById("iStat").value, iImage);
	const itemInsert = JSON.stringify(insert);
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === XMLHttpRequest.DONE){
			if (httpRequest.status === 200){
				alert(httpRequest.responseText);
				const data = JSON.parse(httpRequest.responseText);
				count2();
			}
		}
	};
	httpRequest.open('GET', "http://localhost/mysite/lab8/insert.php?insertItems="+itemInsert+"&max="+newMax, true);
	httpRequest.send();
	count2();
	count = maxCount;
}

function deleteE(){
	var newMax = maxCount;
	newMax--;
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === XMLHttpRequest.DONE){
			if (httpRequest.status === 200){
				alert(httpRequest.responseText);
				const data = JSON.parse(httpRequest.responseText);
				count2();
			}
		}
	};
	httpRequest.open('GET', "http://localhost/mysite/lab8/delete.php?itemCount="+count+"&max="+newMax, true);
	httpRequest.send();
}

function sortA(){
	count = 0;
	alert("Sorting by alphabetical order");
	sortMethod = "alpha";
}

function sortD(){
	count = 0;
	alert("sorting by index");
	sortMethod = "default";
}