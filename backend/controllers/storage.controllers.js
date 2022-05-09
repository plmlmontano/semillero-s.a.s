import { Storage } from '@google-cloud/storage';
import fs from 'fs';

const GOOGLE_CLOUD_PROJECT = 'sanguine-medley-348013'; // ID del proyecto GCP
const GOOGLE_CLOUD_BUCKET = 'semillero-sas'; // Nombre del bucket


const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT,
    keyFilename: '../assets/key.json'
});

export const uploadFile = async (fileName, fileDestination) => {
    await storage.bucket(GOOGLE_CLOUD_BUCKET).upload(fileName, {
        destination: fileDestination
    })

    fs.unlinkSync(fileName, (err) => {
        if (err) throw err;
    });

    return "https://storage.googleapis.com/semillero-sas/" + fileDestination;
}

export const handleFileUpload = async (file, placa) => {
    fs.appendFile('../assets/image/' + placa + '.jpg', file, (err) => {
        if (err) throw err;
    })
    const urlCloud = await uploadFile('../assets/image/' + placa + '.jpg', placa + '.jpg')
    return urlCloud
}

export const deleteFile = async (fileName) => {
    await storage.bucket(GOOGLE_CLOUD_BUCKET).file(fileName).delete();
    return true;
}
