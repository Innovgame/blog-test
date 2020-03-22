const Sequelize = require('sequelize');

const sequelize = new Sequelize('demo', 'root', 'rekor123456', {
  host: 'localhost',
  dialect: 'mysql', // 连接到 mysql
  port: 3306 // 数据库服务器端口
});

const UserModel = sequelize.define('user', {
  // id sequelize 默认创建...
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  firstName: Sequelize.STRING,
  lastName: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true // 创建 createAt / updateAt 字段
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
    UserModel.sync({
      force: false
    }).then(async () => {
      // UserModel
      UserModel.create({
        firstName: 'Rekor',
        lastName: 'Lee'
      });
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  });
