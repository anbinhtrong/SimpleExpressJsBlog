
/*
 * GET home page.
 */

exports.index = function(req, res){
	var data = { title: 'Express' };
  	res.render('index.ect', data);
};

exports.displayForm = function(req, res){
	res.render('displayForm.ect');
};

exports.postForm = function(req, res){
	console.log(req);
	//res.render('displayForm.ect');
	var data = { name: req.body.name};
	res.json(data);
};