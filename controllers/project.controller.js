const db = require("../models");
const User = db.user;
const Project = db.project;
const Jimp = require('jimp');
const _ = require('lodash');
const { func } = require("joi");
const glob = require('glob');

// Register Project
exports.addProject = async (req, res) => {
    // Save project to Database
    let foundUser = async (req, res) => { return User.findOne({
        where: {
            name: req.body.client
        }
    })};
    foundUser(req, res).then(async (user) => {
        let pathImages = '/uploads/' + req.body.fileFormat + '/' ;
        let coverFilePath = pathImages+req.body.coverFile+'.jpg';
        let numFiles = 1;
        // console.log(req.files.photos)
        if (req.files.photos.constructor.name === "Array") {
            numFiles = 0;
            for (const file of req.files.photos)
                numFiles += 1;
        }
        let newProject = async (req, res) => { return await Project.create({
            client: req.body.clientName,
            coverFile: coverFilePath,
            name: req.body.name,
            price: req.body.price,
            location: req.body.location,
            date: req.body.date,
            totalImages: numFiles,
            fileFormat: req.body.fileFormat,
            UserId: user.dataValues.id
        })};
        newProject(req, res).then(async () => {
            if (!req.files) {
                res.send({
                    status: false,
                    message: 'Project created Successfully, no file uploaded...'
                });
            } else {
                let data = [];
                //loop all files
                let photo = null;
                try {
                    let moveFiles = async (req, res) => {
                        if (req.files.photos.constructor.name === "Array")  {
                            _.forEach(_.keysIn(req.files.photos), (key) => {
                                photo = req.files.photos;
                                // console.log("recebi array",photo[key]);
                                photo[key].mv(__dirname+'/../public'+pathImages + 'full/' + photo[key].name);
                                // console.log(__dirname+'/../public'+pathImages + 'full/' + photo[key].name);
                                data.push({
                                    name: photo[key].name,
                                    mimetype: photo[key].mimetype,
                                    size: photo[key].size
                                });
                            });
                        } else {
                            photo = req.files.photos;
                            // console.log('recebi objeto',photo.mimetype)
                            photo.mv(__dirname+'/../public'+pathImages + 'full/' + photo.name);
                            // console.log(__dirname+'/../public'+pathImages + 'full/' + photo.name);
                            data.push({
                                name: photo.name,
                                mimetype: photo.mimetype,
                                size: photo.size
                            });
                        }
                    };
                    moveFiles(req, res).then(
                        console.log(compressProject(req, res))
                    );
                } catch (err) {
                    res.send({message: 'upload files error => '+err});
                }
                // res.send({message: 'sucess in'});
            }
        });
    })
    // res.send({message: 'sucess'});
    res.status(200).send({
        status: true,
        message: 'submitted'
    });
};

// Compress Project
function compressProject (req, res) {
    let pathImages = '/uploads/' + req.body.fileFormat + '/' ;
    // console.log('uploaded photos');
    let numFiles = 1;
    if (req.files.photos.constructor.name === "Array") {
        numFiles = 0;
        for (const file of req.files.photos)
            numFiles += 1;
    }
    // console.log('TOtal fotos ====> '+numFiles);
    let inputPaths = [];
    for (let ii=1; ii<=numFiles; ii++) {
        inputPaths.push(__dirname+'/../public'+pathImages+"full/"+req.body.fileFormat+"-"+ii+".jpg");
        // console.log(__dirname+'/../public'+pathImages+"full/"+req.body.fileFormat+"-"+ii+".jpg");
    }
    // console.log(inputPaths);
    let imgWidth = 1080;
    let imgQuality = 80;
    // let outputPath = '../public'+pathImages;
    // console.log(outputPath)
    let outputPaths = [];
    for (let ii=1; ii<=numFiles; ii++) {
        outputPaths.push(__dirname+'/../public'+pathImages+req.body.fileFormat+"-"+ii+".jpg")
    }
    resizeDirectoryImages(inputPaths, outputPaths, { width: imgWidth, quality: imgQuality })
    .then(() => {
        console.log('Done minifying!');
        try {
            const fs = require('fs');
            const filename = __dirname+'/../public'+pathImages+req.body.fileFormat+'.zip';
            const archive = require('archiver')('zip', {});
            let output = fs.createWriteStream(filename);
            archive.on('warning', err => { console.log(`WARN -> ${err}`); });
            archive.on('error', err => { console.log(`ERROR -> ${err}`); });
            archive.on('end', function() { console.log('Data has been drained'); });
            archive.pipe(output);
            if (req.files.photos.constructor.name === "Array") {
                const files = req.files.photos || [];
                // console.log(files)
                // console.log('zipar '+numFiles+' ficheiros');
                for (const file of files) {
                    archive.append(file.data, { name: file.name });
                    // console.log(`Appending ${file.name} file: ${JSON.stringify(file, null, 2)}`);
                    // console.log(`Appending ${file.name} file`);
                    // console.log('with data => ',file.data)
                }
            } else {
                const file = req.files.photos;
                // console.log('zipar 1 ficheiro ',file)
                // console.log('name: ',file.name);
                // console.log('content: ',file.data);
                archive.append(file.data, { name: file.name });
            }
            archive.finalize();
        } catch (err) {
            return {status: false, message: err};
            // res.send({message: 'zip error => '+err});
        }
        return {message: true};
    });
    return {message: 'waiting'};
};

function resizeDirectoryImages(inputPath, outputPath, { width = Jimp.AUTO, height = Jimp.AUTO, recursive = false, quality = 100 }) {
    return Promise.all(inputPath.map((path, i) => {
        return new Promise((resolve, reject) => {
            return Jimp.read(path).then(image => {
                // console.log('minifying '+image+' to ', outputPath[i]);
                image.resize(width, height).quality(quality).write(outputPath[i], (err) => {
                    if(err) {
                        reject(err);
                    } else {
                        // console.log('done image: ',outputPath[i])
                        resolve(path);
                    }
                });
            })
        }).then(console.log('minified all images!'))
    }));
  }

// Remove Project
exports.removeProject = (req, res) => {
    // Save User to Database
    Project.destroy({
        name: req.body.name
    }).then(user => {
        res.send({
            sucess: true,
            message: "Project deleted sucessfully"
        });
    }).catch(err => {
        res.status(500).send({
            sucess: false,
            message: err.message
        });
    });
};

// Show all projects
exports.showAll = async (req, res, next) => {
    let query = await Project.findAll({
        attributes: {
            exclude: ['projectId']
        },
        order: [
            ['date', 'ASC']
        ]
    }).then(projects => {
        res.locals.projectList = projects;
        return next();
    });

};

exports.showAllClient = async (req, res, next) => {
    let query = await Project.findAll({
        include: [{
            model: db.user,
            where: {
                id: req.userId
            }
        }],
        order: [
            ['date', 'ASC']
        ]
    });
    res.locals.projectList = query;
    next();
    return;
}

// Get all projects (JSON)
exports.getAll = async (req, res, next) => {
    let query = await Project.findAll({
        attributes: {
            exclude: ['projectId']
        },
        order: [
            ['date', 'ASC']
        ]
    }).then(projects => {
        res.json(projects);
    }).catch(err => {
        res.status(500).send({
            sucess: false,
            message: err.message
        });
    });
};

// Show one project
exports.showOne = async (req, res, next) => {
    var proj = await Project.findAll({
        // raw: true, 
        include: [{
            model: db.user,
        }],
        where: {
            fileFormat: req.params.projName
        },
        order: [
            ['date', 'ASC']
        ]
    }).then(project => {
        res.locals.projectInfo = project;
        console.log(project)
        return next();;
    });
};

exports.showOneClient = async (req, res, next) => {
    var proj = await Project.findAll({
        // raw: true, 
        include: [{
            model: db.user,
        }],
        where: {
            fileFormat: req.params.projName
        },
        order: [
            ['date', 'ASC']
        ]
    }).then(project => {
        res.locals.projectInfo = project;
        return next();;
    });
};

exports.addFeedback = async (req, res, next) => {
    try {
        const result = await Project.update({
            feedback: req.body.feedbackInput
        }, {
            include: [{
                model: db.user,
            }],
            where: {
                fileFormat: req.params.name
            }
        })
        console.log("tried submitting ", req.body.feedbackInput);
        res.send({
            message: 'submitted'
        });
    } catch (err) {
        res.send({
            message: 'not submitted ' + err
        });
    }
    // return next();
};