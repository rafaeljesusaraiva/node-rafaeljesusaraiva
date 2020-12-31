exports.clientDashboard = (req, res) => {
    let renderParams = {
        layout: 'client.hbs',
        pageUrl: req.originalUrl
    };
    res.render('client/home', renderParams);
};

exports.clientWorks = (req, res) => {
    let renderParams = {
        layout: 'client.hbs',
        pageUrl: req.originalUrl
    };
    renderParams.projects = res.locals.projectList;
    res.render('client/works', renderParams);
    // console.log(res.locals.projectList);
};

exports.clientWork = (req, res) => {
    let renderParams = {
        layout: 'client.hbs',
        pageUrl: req.originalUrl,
        pageProj: req.params.projName
    };
    renderParams.projects = res.locals.projectList;
    res.render('client/work', renderParams);
};

exports.clientConfig = (req, res) => {
    let renderParams = {
        layout: 'client.hbs',
        pageUrl: req.originalUrl
    };
    res.render('admin/configuracoes', renderParams);
};