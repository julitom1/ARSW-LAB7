
var authors=null;
var api = apiclient;
var hayCanvas=false;
var listaPuntos = []; 
var name=null;
function normal2(err,authorName){
	
	let listaN=authorName.map(variable => {
		let vari ={name:variable.name, points:variable.points.length};
		return vari;
	});
	
	
			
	$("#tabla tbody").empty();
	$("#tabla tbody").append("<tr><th>Blueprint name</th><th>Number of points</th><th>open</th></tr>");
	listaN.map(function(v){
		$("#tabla tbody").append("<tr id='" + v.name + "'><td>" + v.name + "</td><td id='points'>" + v.points + "</td><td><input type='button' onclick='dibujando(this)' class='btn btn-success btncalificar' value='Open'><td></tr>");
	});
	
	function getSum(total, num) {
		return total + num;
	}	
	
	let lista = [];
	listaN.map(function(s){
		lista.push(s.points);
	});
	//let lista = [1,2,3,4,5,6,7,8,9,0];
	document.getElementById("totalPoints").innerHTML = lista.reduce(getSum, 0);		
	
	
}		

function canvas(err, blueprint){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	c.width=c.width;
	listaPuntos=[];
	ctx.moveTo(blueprint.points[0].x,blueprint.points[0].y);
	blueprint.points.map(function(i){
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.lineTo(i.x,i.y);
		ctx.stroke();
		listaPuntos.push({x:i.x,y:i.y});
	});
	hayCanvas=true;
		
}


	function dibujando(por){
		name=por.parentElement.parentElement.id;
		document.getElementById("nameBluePrint").innerHTML = name;
		//apimock.getBlueprintsByNameAndAuthor(name,authors,canvas);
		api.getBlueprintsByNameAndAuthor(name,authors,canvas);
	}
	
	
	$(document).ready(function(){
		$("#button").click(function(){
			authors=$("#authorId").val();
			//apimock.getBlueprintsByAuthor($("#authorId").val(), normal2);
			api.getBlueprintsByAuthor($("#authorId").val(), normal2);
		});
		
		$("#save").on("click",function(){
			//apimock.getBlueprintsByAuthor($("#authorId").val(), normal2);
			var datos={author:authors,name:name,points:listaPuntos};
			datos = JSON.stringify(datos);
			api.hacerPut(authors,name,datos).then(api.getBlueprintsByAuthor(authors, normal2));
		});
		
		$("#create").on("click",function(){
			var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");
			c.width=c.width;
			$("#formularioBlueprint").css("display","block");
		});
		
		$("#botonConfirmar").on("click",function(){
			var datos={author:authors,name:$("#newBlueprint").val(),points:[]};
			datos = JSON.stringify(datos);
			api.hacerPost(datos).then(api.getBlueprintsByAuthor(authors, normal2));
		});
		
		$("#delete").on("click",function(){
			var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");
			c.width=c.width;
			api.hacerDelete(authors,name).then(api.getBlueprintsByAuthor(authors, normal2));
		});
		
		$("#myCanvas").click(function(){
			if(hayCanvas){
				var c = document.getElementById("myCanvas");
				var ctx = c.getContext("2d");
				var rect=c.getBoundingClientRect();
				var posX=event.clientX-rect.left;
				var posY=event.clientY-rect.top;
				ctx.lineTo(posX,posY);
				ctx.stroke();
				listaPuntos.push({x:posX,y:posY});
			}
		});
	});