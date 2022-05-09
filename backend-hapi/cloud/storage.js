'use strict'
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const GOOGLE_CLOUD_PROJECT = 'sanguine-medley-348013';
const GOOGLE_CLOUD_BUCKET = 'semillero-sas';

const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT,
    keyFilename: './cloud/key.json'
});

const handleFileUpload = async (file, placa) => {
    fs.appendFile('./cloud/images/' + placa + '.jpg', file, (err) => {
        if (err) throw err;
    })
    const url_cloud = await uploadFile('./cloud/images/' + placa + '.jpg', placa + '.jpg')
    return url_cloud
}


const uploadFile = async (fileName, fileDestination) => {
    await storage.bucket(GOOGLE_CLOUD_BUCKET).upload(fileName, {
        destination: fileDestination
    })

    fs.unlinkSync(fileName, (err) => {
        if (err) throw err;
    });

    return "https://storage.googleapis.com/semillero-sas/" + fileDestination;
}

const deleteFile = async (fileName) => {
    await storage.bucket(GOOGLE_CLOUD_BUCKET).file(fileName).delete();
    return true;
}


module.exports = { uploadFile, handleFileUpload, deleteFile };