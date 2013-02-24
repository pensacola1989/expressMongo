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
	var sequelize = new Sequelize('fuck','root','');

	var Blog = sequelize.define('Blog',{
		// the blog id
		id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true ,primaryKey: true },
		// bname
		btitle: { type: Sequelize.STRING, allowNull: false },
		// blog Content
		bcontent: { type: Sequelize.TEXT, allowNull: false },
		// blog date
		bdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
	});

	var User = sequelize.define('User',{
		// uid
		id: { type: Sequelize.INTEGER, allowNull: false ,autoIncrement: true, primaryKey: true },
		// uname
		uname: { type: Sequelize.TEXT, allowNull: false, },
		// register date
		regDate: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },

	});

	Blog.hasMany(User);
	User.hasMany(Blog);

	Blog.sync();
	User.sync();

	Blog.drop();
	User.drop();

	
	// blog.getUsers()
	// 	.success(function (ascUser) {
	// 		console.log(ascUser);
	// 	});	


	sequelize
		.sync()
		.success(function () {
			var blog = Blog.build({
				btitle: 'fuck',
				bcontent: 'fucking content',
				bdate: new Date()
			});

			var user = User.build({
				uname: 'www',
				regDate: new Date()
			});

			var user2 = User.build({
				uname: 'www2',
				regDate: new Date()
			});
			blog.save();
			user.save();
			user2.save();

			blog
				.setUsers([user,user2])
				.success(function () {
					res.send('createTable And InsertData ok!');
				})
				.error(function (err) {
					res.send(err);
				});
		})
		.error(function () {
			res.send('createTable falied!');	
		});
}

