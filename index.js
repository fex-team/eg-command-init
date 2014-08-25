/**
 * fis.baidu.com
 */

'use strict';

var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');

var scaffold = require('./lib/scaffold.js');

exports.name = 'init';
exports.usage = '<command> [options]';
exports.desc = 'A awesome scaffold of fis';
exports.register = function(commander) {
    var o_args = process.argv;
    
    commander
        .option('-n, --name <name>', 'game id', String, null)
        .option('--verbose', 'output verbose help', Boolean, false);
    
    commander.action(function () {

            var args = Array.prototype.slice.call(arguments);
            var options = args.pop();
            var cmd = args.shift();
            var colors = require('colors');

            if (options.verbose) {
                fis.log.level = fis.log.L_ALL;
                fis.log.throw = true;
            }

            if (!options.name) {
                fis.log.error('should specify a name with --name.');        
            }

            var dir = options.name;

            check_dir(dir);

            scaffold.mv(__dirname + path.sep + './template', dir);

            scaffold.prompt(dir, {
                preset:{
                    name: options.name
                }
            },function () {
                fis.log.notice('done');
            });
        });
};

function check_dir(dir) {
    dir = path.resolve(dir);
    if (fis.util.fs.existsSync(dir) && process.cwd() != dir) {
        fis.log.error('the directory has already exist, the process will stop.');        
    }
}