exports.adminRedirectDash = (req, res) => {
    res.redirect('/admin/dashboard');
};

var page_info = {
    'sidebar_items': [
        { 'title': 'Dashboard', 'link': '/admin/dashboard', 'icon': 'fas fa-tachometer-alt' },
        { 'title': 'Projetos', 'link': '/admin/projetos', 'icon': 'fas fa-th-large' }, 
        { 'title': 'Marcações', 'link': '/admin/calendario', 'icon': 'fas fa-calendar-alt' }, 
        { 'title': 'Clientes', 'link': '/admin/clientes', 'icon': 'fas fa-users'}
    ],
    'dashboard_widgets': [
        { 'size': '', 'title': '123', 'content': 'oi' }, 
        { 'size': 'w-2', 'title': '1', 'content': 'ola' }, 
        { 'size': '', 'title': '123', 'content': 'oi' }
    ]
}

exports.adminDasboard = (req, res) => {
    page_info['sidebar_items'].forEach(function (item, index) {
        if (item.link == res.originalUrl) {
            res.locals.title = item.title;
        }
    });

    res.locals.title = res.locals.title || false;
    res.locals.pageUrl = req.originalUrl;

    var tmpBookings = [
        {
            client: 'teste1',
            date: '2021-01-20',
            price:  12,
            days: 1,
            location: 'Figueira',
            status: 'pending'
        }, 
        {
            client: 'teste2',
            date: '2021-01-21',
            price:  23,
            days: 1,
            location: 'Coimbra',
            status: 'pending'
        }
    ];

    let renderParams = {
        layout: 'admin.hbs',
        pageUrl: req.originalUrl,
        page_info: page_info
    };

    if (req.params.pageName == 'projetos') {
        renderParams.projects = res.locals.projectList;
        renderParams.clients = res.locals.clientList;
    }
        // console.log(res.locals.projectList);

    if (req.params.pageName == 'calendario')
        renderParams.bookings = tmpBookings;

    if (req.params.pageName == 'clientes') {
        renderParams.clients = res.locals.clientList;
    }

    res.render('admin/' + req.params.pageName, renderParams);

    // console.log( res.locals.clientList[0].dataValues);
};

exports.adminProject = (req, res) => {
    page_info['sidebar_items'].forEach(function (item, index) {
        if (item.link == res.originalUrl) {
            res.locals.title = item.title;
        }
    });

    res.locals.title = res.locals.title || false;
    res.locals.pageUrl = req.originalUrl;

    let renderParams = {
        layout: 'admin.hbs',
        pageUrl: req.originalUrl,
        page_info: page_info
    };
    res.render('admin/projeto', renderParams);
};

exports.adminConfig = (req, res) => {
    let renderParams = {
        layout: 'admin.hbs',
        pageUrl: req.originalUrl,
        page_info: page_info
    };
    res.render('admin/configuracoes', renderParams);
};