var apiclient = (function () {
  
	return {
		getBlueprintsByAuthor : function (author, callback) {
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
	};
})();