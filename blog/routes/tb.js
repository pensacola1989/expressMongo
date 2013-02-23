var  Sequelize = require('sequelize');

// exports.createTable = function (req,res) {
		
// 	var sequelize = new Sequelize('test', 'root', '');

// 	var Project = sequelize.define('Project',{
// 	  title : Sequelize.STRING,
// 	  description : Sequelize.TEXT
// 	});

// 	var Task = sequelize.define('Task',{
// 	  title: Sequelize.STRING,
// 	  description: Sequelize.TEXT,
// 	  deadline: Sequelize.DATE
// 	});

// 	Project.sync();
// 	Task.sync();

// 	Project.drop();
// 	Task.drop();	

// 	sequelize.sync().success(function() {
// 	  res.send('createTable ok!');
// 	}).error(function(error) {
// 	  res.send('createTable falied!');
// 	});
// }


// var project = Project.build({
//   title: 'my awesome project',
//   description: 'woo,fuckfuck', 
// });

// project
//   .save()
//   .success(function () {
//     console.log('fuck suc');
//   });

// var task = Task.build({
//   title: 'my awesome project',
//   description: 'woo,fuckfuck', 
//   deadline: new Date()
// });

// task
//   .save()
//   .success(function () {
//     console.log('fuck suc too!');
//   });

exports.createTable = function (req,res) {
	var sequelize = new Sequelize('myblog','root','');

	var Blog = sequelize.define('Blog',{
		// the blog id
		bid: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true ,primaryKey: true },
		// bname
		btitle: { type: Sequelize.STRING, allowNull: false },
		// blog Content
		bcontent: { type: Sequelize.TEXT, allowNull: false },
		// blog date
		bdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
	});

	var User = sequelize.define('User',{
		// uid
		uid: { type: Sequelize.INTEGER, allowNull: false ,autoIncrement: true, primaryKey: true },
		// uname
		uname: { type: Sequelize.TEXT, allowNull: false, },
		// register date
		regDate: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },

	});

	Blog.hasMany(User);
	User.hasMany(Blog);

	Blog.sync();
	User.sync();

	var blog = Blog.build({
		btitle: 'this is a title',
		bcontent: 'this is a Content!',
		bdate: new Date()
	});

	var user1 = User.build({
		uname: 'www',
		uregDate: new Date()
	});

	var user2 = User.build({
		uname: 'www2',
		uregDate: new Date()
	});

	blog
		.save()
		.success(function () {
			console.log('blog save suc');
		});

	user1
		.save()
		.success(function () {
			console.log('user save suc')
		});	
	user2
		.save()
		.success(function () {
			console.log('user save suc')
		});	

	blog
		.setUsers([user1,user2])	
		.success(function () {
			console.log('saved')
		})
		.error(function (err) {
			console.log(err);
		});
	// blog.getUsers()
	// 	.success(function (ascUser) {
	// 		console.log(ascUser);
	// 	});	


	sequelize
		.sync()
		.success(function () {
			res.send('createTable ok!');
		})
		.error(function () {
			res.send('createTable falied!');	
		});
}

