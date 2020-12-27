module.exports = function(app){

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
			price: 0,
			location: '',
			workDate: '',
			totalImages: 0,
			filenameFormat: ''
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
	
	app.get('/private/:pageName', (req, res) => {
        page_info['sidebar_items'].forEach(function (item, index) {
            if (item.link == req.originalUrl) app.locals.title = item.title;
        });
        app.locals.title = app.locals.title || '404';
        app.locals.pageUrl = req.originalUrl;
		app.locals.page_info = page_info;
		app.locals.work_info = work_info;

        res.render('private/'+req.params.pageName, {layout: 'private.hbs'});
    });
    
};

function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}