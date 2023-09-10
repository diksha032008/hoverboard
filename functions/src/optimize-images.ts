import { Storage } from '@google-cloud/storage';
import { spawnSync } from 'child_process';
import { logger, storage, setGlobalOptions } from 'firebase-functions/v2';
import fs from 'fs';
import os from 'os';
import path from 'path';

// setGlobalOptions({ region: "asia-east2" });

const mkdirp = (path: string) => fs.promises.mkdir(path, { recursive: true });

const gcs = new Storage();

export const optimizeImages = storage.onObjectFinalized((object) => {
  const { contentType } = object.data;
  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
   logger.log('This is not an image.');
    return null;
  }

  return optimizeImage(object);
});

async function optimizeImage(object) {
  // File and directory paths.
  const filePath = object.name;
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);

  // Cloud Storage files.
  const bucket = gcs.bucket(object.bucket);
  const file = bucket.file(filePath);

  const [metadata] = await file.getMetadata();
  if (metadata.metadata && metadata.metadata.optimized) {
    logger.log('Image has been already optimized');
    return null;
  }

  await mkdirp(tempLocalDir);
  await file.download({ destination: tempLocalFile });
  logger.log('The file has been downloaded to', tempLocalFile);

  // Generate a thumbnail using ImageMagick.
  spawnSync('convert', [
    tempLocalFile,
    '-strip',
    '-interlace',
    'Plane',
    '-quality',
    '82',
    tempLocalFile,
  ]);
  logger.log('Optimized image created at', tempLocalFile);

  // Uploading the Optimized image.
  const destination = bucket.file(filePath);
  const [newFile] = await bucket.upload(tempLocalFile, {
    destination,
    metadata: {
      metadata: {
        optimized: true,
      },
    },
  });
  await newFile.makePublic();
  logger.log('Optimized image uploaded to Storage');
  // Once the image has been uploaded delete the local files to free up disk space.
  return Promise.all([fs.unlinkSync(tempLocalFile)]);
}
