var apiclient = (function () {
  
	return {
		getBlueprintsByAuthor : function (author, callback) {
			console.log(author);
			$.getJSON("http://localhost:8080/blueprints/" + author,function (data) {
					callback(null, data);
				}
			);
		},

		getBlueprintsByNameAndAuthor : function (name, author, callback) {
			$.getJSON("http://localhost:8080/blueprints/" + author + "/" + name,function (data) {
					callback(null, data);
				}
			);
		},
		    hacerPut : function(author,name,datos){
				console.log(author +" - "+name);
				 let promise = new Promise( (resolve, reject) => {
					var putPromise = $.ajax({
					url: "http://localhost:8080/blueprints/" + author +"/"+name,
					type: 'PUT',
					data: datos,
					contentType: "application/json"
				});
				resolve(putPromise);
				 
				});
				

				return promise;
				
			}
		};

		

})();