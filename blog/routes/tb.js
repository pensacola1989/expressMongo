var  Sequelize = require('sequelize');


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

