module.exports = function(app, passport){

    app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

    // =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

    var page_info = {
        'sidebar_items' : [
            { 'title': 'Dashboard', 'link': '/private/dashboard', 'icon': 'fas fa-tachometer-alt' },
            { 'title': 'Projetos', 'link': '/private/projetos', 'icon': 'fas fa-th-large' },
            { 'title': 'Calendário', 'link': '/private/calendario', 'icon': 'fas fa-calendar-alt' },
            { 'title': 'Clientes', 'link': '/private/clientes', 'icon': 'fas fa-users' },
        ],
        'dashboard_widgets' : [
            { 'size': '', 'title': '123', 'content': 'oi' },
            { 'size': 'w-2', 'title': '1', 'content': 'ola' },
            { 'size': '', 'title': '123', 'content': 'oi' },
		],
		'work' : {
			coverSrc : '',
			clientName: '',
			workDate: '',
			totalImages: 0,
			
		}
	}
    
    app.get('/private', (req, res) => { res.redirect('/private/dashboard'); });
    
    app.get('/private/:pageName', (req, res) => {
        page_info['sidebar_items'].forEach(function (item, index) {
            if (item.link == req.originalUrl) app.locals.title = item.title;
        });

        app.locals.title = app.locals.title || false;
        app.locals.pageUrl = req.originalUrl;
		app.locals.page_info = page_info;

        res.render('private/'+req.params.pageName, {layout: 'private.hbs'});
	});
	
	// app.get('/private/:pageName', (req, res) => {
    //     page_info['sidebar_items'].forEach(function (item, index) {
    //         if (item.link == req.originalUrl) app.locals.title = item.title;
    //     });
    //     app.locals.title = app.locals.title || '404';
    //     app.locals.pageUrl = req.originalUrl;
	// 	app.locals.page_info = page_info;
	// 	app.locals.work_info = work_info;

    //     res.render('private/'+req.params.pageName, {layout: 'private.hbs'});
    // });
    
};

function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}