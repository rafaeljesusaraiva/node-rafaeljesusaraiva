const express = require('express');
const router = express.Router();
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

module.exports = function (app) {

    var page_info = {
        'sidebar_items': [{
                'title': 'Dashboard',
                'link': '/admin/dashboard',
                'icon': 'fas fa-tachometer-alt'
            },
            {
                'title': 'Projetos',
                'link': '/admin/projetos',
                'icon': 'fas fa-th-large'
            },
            {
                'title': 'Calendário',
                'link': '/admin/calendario',
                'icon': 'fas fa-calendar-alt'
            },
            {
                'title': 'Clientes',
                'link': '/admin/clientes',
                'icon': 'fas fa-users'
            },
        ],
        'dashboard_widgets': [{
                'size': '',
                'title': '123',
                'content': 'oi'
            },
            {
                'size': 'w-2',
                'title': '1',
                'content': 'ola'
            },
            {
                'size': '',
                'title': '123',
                'content': 'oi'
            },
        ],
        'work': {
            coverSrc: '',
            clientName: '',
            price: 0,
            location: '',
            workDate: '',
            totalImages: 0,
            filenameFormat: ''
        }
    }

    router.get('/', function (req, res, next) {
        authorize(Role.Admin, req);
        res.redirect('/admin/dashboard');
    });

    router.get('/:pageName', function (req, res, next) {
        authorize(Role.Admin, req);
        showAdminPage(req, res, next);
    });

    function showAdminPage(req, res, next) {
        page_info['sidebar_items'].forEach(function (item, index) {
            if (item.link == req.originalUrl)
                app.locals.title = item.title;
        });

        app.locals.title = app.locals.title || false;
        app.locals.pageUrl = req.originalUrl;
        app.locals.page_info = page_info;

        res.render('admin/' + req.params.pageName, {
            layout: 'private.hbs'
        });
    }

    router.get('/project/:projName', function (req, res, next) {
        authorize(Role.Admin, req);
        showProject(req, res, next);
    });

    function showProject(req, res, next) {
        page_info['sidebar_items'].forEach(function (item, index) {
            if (item.link == req.originalUrl) app.locals.title = item.title;
        });
        app.locals.title = app.locals.title || '404';
        app.locals.pageUrl = req.originalUrl;
        app.locals.page_info = page_info;
        app.locals.projectName = req.params.projName;

        res.render('admin/projetos', {
            layout: 'private.hbs'
        });
    }

    return router;
};