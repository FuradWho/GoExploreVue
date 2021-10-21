let ENV = process.argv[process.argv.length - 1];
ENV = ENV === 'pk' ? ENV : '';
const exec = require('child_process').exec;
const path = require('path');
const target = path.resolve(__dirname, '../../../WebContent');
const buildSrc = path.resolve(__dirname, '../dist/');
const buildRename = path.resolve(__dirname, `../competition${ENV}`);
// 判断当前系统是MacOS 或者 Windows从而执行不同的删除目录命令
const command = process.platform === 'darwin' ? 'rm -rf' : 'rd/s/q';
// console.log(target);
// console.log(ENV);
// console.log(buildRename);
// 重命名打包过后的文件名
exec(`mv ${buildSrc} ${buildRename}`, function (err) {
	if (err) throw err;
});

// 将打包过后的文件目录移动到tomcat下
exec(`${command} ${target}/competition${ENV} && mv ${buildRename} ${target}`, function (err) {
	if (err) throw err;
});
