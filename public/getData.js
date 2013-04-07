var remoteDataModule = function(){
	return this;
}

remoteDataModule.prototype.init = function(){
	
}
 
remoteDataModule.prototype.getData = function() {
	var instance = this;
	function setData(data){
		instance.data = eval(data);
		instance.print();
		instance.printModules();
	
	}
	$.ajax({
		url: "/getData",
		async: true,
		success: setData
	});
}

remoteDataModule.prototype.data = {};

remoteDataModule.prototype.modules = {};

remoteDataModule.prototype.print = function() {
	var rows = "";
	var msg = [];
	for (var i in this.data) {
		msg = this.data[i].msg.split(" ");
		if (typeof this.modules[msg[0]] === 'undefined')  {
			this.modules[msg[0]] = {
				show: true,
				color : "white",
				number : 0
			}
		}
		this.modules[msg[0]].number++;
		if (this.modules[msg[0]].show === true) {
			rows +='<tr style="background-color:' + this.colors[this.modules[msg[0]].color] + ';"';
			rows +=' title="' + this.data[i].createdAt + '">';
			rows +=  '<td>' + msg[0] + "</td>";
			rows +=  "<td>" + msg.slice(1).join(" ") +"</td>";
			rows +="</tr>";
		}
	}
	$("#logs table").html(rows);
}

remoteDataModule.prototype.changeOptionsShow = function(e){
	var instance = this;
	$("input[type=checkbox][checked]").each( 
		function(number, e) { 
			var id = e.id.replace("optionsId_","");
			if (typeof instance.modules[id] !== 'undefined') {
				instance.modules[id].show = e.checked;
			}
		} 
	);
	this.print();
}

remoteDataModule.prototype.changeOptionsColor = function(){
	var instance = this;
	$("select").each( 
		function(number, e) {
			instance.modules[e.id.replace("selectColorId_","")].color = e.options[e.selectedIndex].text;
		} 
	);
	this.print();
}

remoteDataModule.prototype.colors = {
	black : "#000000",
	white : "#FFFFFF",
	rosa :"#FA58AC",
	lila : "#D358F7",
	blau : "#5882FA",
	babyblau : "#58FAF4",
	grün : "#58FA58",
	ocker : "#F4FA58",
	rot : "#FA8258"
}

remoteDataModule.prototype.printModules = function(){
	$("#options").html("");
	var colorCheckBox = checkbox = "";
	
	for (var i in this.modules){
		checkbox = '<';
		checkbox += 'input id="optionsId_'+ i + '"';
		checkbox += ' type="Checkbox"';
		checkbox += ' onClick=remoteData.changeOptionsShow()';
		checkbox += 
			(this.modules[i].show)
			? ' checked="checked"'
			: " ";
		colorCheckBox = '<select'
		colorCheckBox += ' id="selectColorId_'+i+'"';
		colorCheckBox += ' onchange=remoteData.changeOptionsColor()>'
		for (var col in this.colors) {
			colorCheckBox += "<option";
			colorCheckBox += 
				(this.modules[i].color === col)
				? " selected"
				: ""
			colorCheckBox += ">" + col + "</option>";
		}
		colorCheckBox += '</select>';
		
		
		checkbox +="/>" + colorCheckBox + i + "<br />";
		$("#options").append(checkbox);
	}
}

var remoteData = new remoteDataModule();
remoteData.init();
remoteData.getData();


 
 