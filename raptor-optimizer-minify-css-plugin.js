var sqwish = require('sqwish');

function minify(src, options) {
    if (!options) {
        options = {};
    }
    
    //var strict = options.mergeDuplicates !== false;
    return sqwish.minify(src, false);
}

module.exports = function (pageOptimizer, pluginConfig) {
    pageOptimizer.config.addTransform({
            contentType: 'css',
            
            name: module.id,

            stream: false,    

            transform: function(code, contentType, dependency, bundle) {
                if (contentType === 'css') {
                    var mergeDuplicates = dependency.mergeDuplicates !== false;

                    var minified = minify(code, {
                        mergeDuplicates: mergeDuplicates
                    });
                    
                    return minified;
                }
                else {
                    return code;
                }
            }
        });
};