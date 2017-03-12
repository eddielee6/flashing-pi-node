const gulp  = require('gulp');
const GulpSSH = require('gulp-ssh');
const runSequence = require('run-sequence');
const argv = require('yargs').argv;
const gutil = require('gulp-util');

const config = {
    host: argv.host,
    port: argv.port || 22,
    username: argv.username || 'root',
    password: argv.password,
    dest: argv.dest
};

if (!config.host) {
    throw new Error('Error: --host argument is required');
}

gutil.log(`Connecting to ${config.username}@${config.host}`);

const gulpSSH = new GulpSSH({ sshConfig: { host, port, username, password } = config });

gulp.task('clean', () =>
    gulpSSH.exec(`rm -r -f ~/${config.dest}`));

gulp.task('transfer:src', () =>
    gulp.src(['./src/**'])
    .pipe(gulpSSH.dest(`${config.dest}/src`)));

gulp.task('transfer:packagejson', () =>
    gulp.src(['./package.json'])
    .pipe(gulpSSH.dest(config.dest)));

gulp.task('transfer', () =>
    runSequence('transfer:src', 'transfer:packagejson'));

gulp.task('install', () =>
    gulpSSH.shell([
        `cd ~/${config.dest}`,
        `npm install --production`
    ]));

gulp.task('deploy', () =>
    runSequence('clean', 'transfer', 'install'));

gulp.task('run', () =>
    gulpSSH.shell(`sudo node ~/${config.dest}`));
