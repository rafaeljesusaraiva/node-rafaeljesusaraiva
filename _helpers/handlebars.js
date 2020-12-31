function hbsHelpers(hbs) {
    return hbs.create({
        helpers: { // This was missing
            equal: function(lvalue, rvalue, options) {
                if (arguments.length < 3)
                    throw new Error("Handlebars Helper equal needs 2 parameters");
                if( lvalue!=rvalue ) {
                    return options.inverse(this);
                } else {
                    return options.fn(this);
                }
            },
            setVar: function(varName, varValue, options) {
                options.data.root[varName] = varValue;
            },
            counter: function (index){
                return index + 1;
            },
            concat: function() {
                arguments = [...arguments].slice(0, -1);
                return arguments.join('');
            },
            times: function(n, block) {
                var accum = '';
                for(var i = 1; i <= n; ++i)
                    accum += block.fn(i);
                return accum;
            }
            // More helpers...
        },
        defaultLayout: 'main',
        extname: '.hbs'
    });
}

module.exports = hbsHelpers;