/**
 * fis.baidu.com
 */
module.exports = {
    prompt: function (dir, options, cb) {
        
        if (fis.util.is(options, 'Function')) {
            cb = options;
            options = {};
        }

        var keyword_reg = options && options.keyword_reg || /\{\{-([\s\S]*?)-\}\}/ig;
        var files = fis.util.find(dir);
        var prompts = {};
        var cache = {};
        var preset = options.preset || {};

        fis.util.map(files, function (index, filepath) {
            var content = fis.util.fs.readFileSync(filepath, {
                encoding: 'utf8'
            });
            content.replace(keyword_reg, function(m, $1) {
                if (prompts[$1]) {
                    prompts[$1].push(filepath);
                } else {
                    prompts[$1] = [filepath];
                }
                return m;
            });
            cache[filepath] = content;
        });

        var prompt_handle = require('prompt');
        var opts = [];
        fis.util.map(prompts, function (k, v) {
            if (preset[k]){
                return false;
            };
            opts.push({
                name: k,
                required: true
            });
        });

        prompt_handle.start();
        prompt_handle.get(opts, function (err, result) {
            fis.util.merge(result, options.preset);
            fis.util.map(result, function (k, v) {
                var process_files = prompts[k];
                fis.util.map(process_files, function (index, filepath) {
                    var con = cache[filepath].replace(keyword_reg, function (m, $1) {
                        if ($1 == k) {
                            m = v;
                        }
                        return m;
                    });

                    fis.util.fs.writeFileSync(filepath, con);
                    
                    cache[filepath] = con;
                });
            });
            cb && cb();
        });
    },
    
    mv: function (source, dist, include, exclude) {
        fis.util.copy(source, dist, include, exclude);
    },
};


function values(o) {
    var vals = [];
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            vals.push(o[i]);
        }
    }
    return vals;
}