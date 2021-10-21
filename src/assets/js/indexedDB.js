// 定义一个全局变量，用于保存数据库连接（开发中应该不会这么写，此处只是帮助理解）
let db = null;
export default {
	// indexedDB兼容
	indexedDB: window.indexedDB || window.webkitindexedDB || window.msIndexedDB || window.mozIndexedDB,

	// 打开数据库
	// dbname指的是 数据库名，objectStoreName 指的是 表明 version 指的是 版本号
	openDB (dbname, objectStoreName, version, fun) {
		// 获取当前数据库版本号
		version = version || 1;

		// 获取数据库连接，若数据库不存在，会创建数据库（异步处理，根据情况自动触发下面三个事件）
		var request = this.indexedDB.open(dbname, version);

		// 获取数据库连接失败
		request.onerror = function (event, fun) {
			fun && fun('error');
			console.log('IndexedDB数据库打开错误');
		};

		// 获取数据库连接成功
		request.onsuccess = function (event, callback) {
			db = event.target.result;
			if (callback && (typeof callback === 'function')) {
				callback(db);
			};
			if (db != null) {
				console.log('数据库打开成功');
				fun && fun('success');
			};
		};

		// 创建新的储存空间（当第一次创建数据库、或者数据库版本号变化时会触发）
		request.onupgradeneeded = function (event) {
			console.log('数据库版本变化');
			console.log('创建数据库' + dbname);
			// 拿到数据库连接的结果对象
			db = event.target.result;

			// 判断当前数据库中表（对象仓库）是否存在（注意此处是数据库的表名，不是数据库名）
			if (!db.objectStoreNames.contains(objectStoreName)) {
				// 创建对象仓库，并设置主键自增
				var objectStore = db.createObjectStore(objectStoreName, {
					keyPath: 'id',
					autoIncrement: true
				});

				// 小任务文本资源库缓存
				if (objectStoreName === 'taskTextHtml') {
					// 创建索引（根据需要创建）
					objectStore.createIndex('taskId', 'taskId', {
						unique: false
					});

					objectStore.createIndex('taskHtml', 'taskHtml', {
						unique: false
					});
				}

				if (objectStoreName === 'person') {
					// 创建索引（根据需要创建）
					objectStore.createIndex('name', 'name', {
						unique: false
					});

					objectStore.createIndex('age', 'age', {
						unique: false
					});
				}

				// // 创建索引（根据需要创建）
				// objectStore.createIndex('name', 'name', {
				// 	unique: false
				// });

				// objectStore.createIndex('age', 'age', {
				// 	unique: false
				// });

				// objectStore.createIndex('sex', 'sex', {
				// 	unique: false
				// });
			}
		};
	},

	// 删除数据库
	deleteDB: function (dbname, callback) {
		// 删除数据库
		var deleteQuest = this.indexedDB.deleteDatabase(dbname);

		// 成功删除
		deleteQuest.onerror = function () {
			console.log('删除数据库出错' + event.target.message);
		};

		// 删除失败
		deleteQuest.onsuccess = function () {
			if (callback && (typeof callback === 'function')) {
				callback();
			}
			console.log('删除数据库成功');
		};
	},

	// 关闭数据库
	closeDB: function () {
		if (db != null) {
			db.close();
			db = null;
			console.log('数据库关闭');
		}
	},

	// 添加数据
	// 对象仓库（表名）,传入的参数
	add: function (objectStoreName, argument) {
		if (db != null) {
			console.log(db);

			// 执行事务，添加数据到对象仓库（表）
			var request = db.transaction([objectStoreName], 'readwrite')
				.objectStore(objectStoreName)
				.add(argument);

			request.onsuccess = function (event) {
				console.log('数据写入成功');
			};

			request.onerror = function (event) {
				console.log('数据写入失败');
			};
		}
	},

	// 获取数据
	// 对象仓库（表名）
	get: function (objectStoreName, callback) {
		if (db != null) {
			console.log(db);

			// 执行事务，从对象仓库（表）中获取所有数据
			var request = db.transaction([objectStoreName], 'readwrite')
				.objectStore(objectStoreName).getAll();

			// 数据获取失败
			request.onerror = function (event) {
				console.log('事务失败');
			};

			// 数据获取成功
			request.onsuccess = function (event) {
				if (request.result) {
					// 打印所有数据
					console.log(request.result);
					callback && callback(request.result);
				} else {
					console.log('未获得数据记录');
				}
			};
		}
	},

	// 遍历数据
	// 对象仓库（表名）
	foreach: function (objectStoreName) {
		if (db != null) {
			console.log(db);

			// 执行事务，从对象仓库（表）中获取所有数据
			var request = db.transaction([objectStoreName], 'readwrite')
				.objectStore(objectStoreName).openCursor();

			// 数据获取失败
			request.onerror = function (event) {
				console.log('事务失败');
			};

			// 数据获取成功
			request.onsuccess = function (event) {
				let cursor = request.result;
				if (cursor) {
					// 遍历打印所有数据
					console.log(cursor);
					console.log(cursor.key);
					console.log(cursor.value.name);
					console.log(cursor.value.age);
					console.log(cursor.value.sex);
					cursor.continue();
				} else {
					console.log('未获得数据记录');
				}
			};
		}
	},

	// 更新数据(若数据存在，则覆盖之前的数据，若数据不存在，则新增一个值)
	// 对象仓库（表名）
	update: function (objectStoreName, argument) {
		if (db != null) {
			console.log(db);

			// 执行事务，添加数据到对象仓库（表）
			var request = db.transaction([objectStoreName], 'readwrite')
				.objectStore(objectStoreName)
				.put(argument);

			request.onsuccess = function (event) {
				console.log('数据更新成功');
			};

			request.onerror = function (event) {
				console.log('数据更新失败');
			};
		}
	},

	// 删除数据(若数据不存在，则不会执行删除操作)
	// 对象仓库（表名）
	remove: function (objectStoreName, index) {
		if (db != null) {
			console.log(db);

			// 执行事务，从对象仓库（表）中获取所有数据
			var request = db.transaction([objectStoreName], 'readwrite')
				.objectStore(objectStoreName).delete(index);

			// 数据获取失败
			request.onerror = function (event) {
				console.log('事务失败');
			};

			// 数据获取成功
			request.onsuccess = function (event) {
				if (request.result) {
					// 遍历打印所有数据
					console.log(request.result);
				} else {
					console.log('未获得数据记录');
				}
			};
		}
	},

	// 根据索引查值(若数据不存在，返回一个[]数组)
	// objectStoreName对象仓库（表名）/ 索引 / 索引下数据值
	searchFromIndex: function (objectStoreName, index, data, callback) {
		if (db != null) {
			console.log(db);

			// 执行事务，从对象仓库（表）中获取所有数据
			var request = db.transaction([objectStoreName], 'readonly')
				.objectStore(objectStoreName).index(index).get(data);

			// 数据获取失败
			request.onerror = function (event) {
				console.log('事务失败');
				// callback && callback('');
			};

			// 数据获取成功
			request.onsuccess = function (event) {
				if (request.result) {
					// 遍历打印所有数据
					// console.log(request.result);
					callback && callback(request.result);
				} else {
					let arr = [];
					callback && callback(arr);
					console.log('未获得数据记录');
				}
			};
		}
	}
};
