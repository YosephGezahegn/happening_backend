/**
 * fileUploadController.js
 * @description :: exports all method related file upload
 */

const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const AWS = require('aws-sdk');

let allowedFileTypes = ['png', 'jpeg', 'jpg', 'pdf', 'gif'];
let maxFileSize = 10; //In Megabyte

/**
 * @description : uploads file using formidable.
 * @param {obj} req : request of file upload API
 * @param {obj} res : response of file upload API.
 * @return {obj} : response of file upload. {status, message, data}
 */
const upload = async (req, res) =>
{
  try
  {

    // Setting up formidable options.
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.maxFileSize = 300 * 1024 * 1024; //300 MB
    form.maxFieldsSize = 100 * 1024 * 1024; //50 MB

    const uploadFileRes = await new Promise(async (resolve, reject) =>
    {
      form.parse(req, async function (err, fields, files)
      {

        if (err)
        {
          reject(err);
        }

        let uploadSuccess = [];
        let uploadFailed = [];
        let fileCount = 1;

        let fileArr = [];
        if (!files['file[]'])
        {
          reject({
            'message': 'Select at least one file to upload.',
            'name': 'validationError'
          });
        }
        if (!Array.isArray(files['file[]']))
        {
          fileArr.push(files['file[]']);
          files['file[]'] = fileArr;
        }

        for (let file of files['file[]'])
        {
          let response = await uploadFiles(file, fields, fileCount++);
          if (response.status == false)
          {
            uploadFailed.push({
              'name': file.name,
              'error': response.message,
              'status': false
            });
          } else
          {
            uploadSuccess.push({
              'name': file.name,
              'path': response.data,
              'status': true
            });
          }
        }

        resolve({
          uploadSuccess,
          uploadFailed
        });
      });
    });

    if (uploadFileRes.uploadSuccess.length > 0)
    {
      let message = `${uploadFileRes.uploadSuccess.length} File uploaded successfully out of ${uploadFileRes.uploadSuccess.length + uploadFileRes.uploadFailed.length}`;
      return res.ok({
        message: message,
        data: uploadFileRes
      });
    } else
    {
      let message = 'Failed to upload files.';
      return res.invalidRequest({
        message: message,
        data: uploadFileRes
      });
    }
  } catch (error)
  {
    if (error.name && error.name == 'validationError')
    {
      return res.validationError({ message: error.message });
    } else
    {
      return res.failureResponse({ data: error.message });
    }
  }
};

/**
 * @description : upload files
 * @param {obj} file : file to upload
 * @param {obj} fields : fields for file
 * @param {number} fileCount : total number of files to upload
 * @return {obj} : response for file upload
 */
const uploadFiles = async (file, fields, fileCount) =>
{

  let extension = path.extname(file.name);
  extension = extension.split('.').pop();

  fileType = file.type;

  if (allowedFileTypes.length)
  {
    //Check allowed extension;
    if (!allowedFileTypes.includes(extension))
    {
      return {
        status: false,
        message: 'Filetype not allowed.'
      };
    }
  }

  // Check File Size
  const fileSize = ((file.size / 1024) / 1024);
  if (maxFileSize < fileSize)
  {
    return {
      status: false,
      message: `Allow file size upto ${maxFileSize} MB.`
    };
  }

  let fileName = file.name;
  //Create Requested Directory,if given in request parameter.
  if (fields && fields.folderName)
  {
    fileName = fields.folderName + '/' + fileName;
  }
  else if (fields && fields.fileName)
  {
    fileName = fields.fileName + '-' + fileCount + path.extname(file.name);
  }

  const response = await new Promise(async (resolve, reject) =>
  {
    resolve(await uploadToS3(file, fileName));
  });

  return response;

};
/**
 * @description : upload file to AWS s3
 * @param {obj} file : file to upload
 * @param {string} fileName : name of file
 * @return {obj} : response for file upload to AWS s3
 */
const uploadToS3 = async (file, fileName) =>
{
  let S3Config = {
    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  };

  const s3 = new AWS.S3({
    region: S3Config.AWS_S3_REGION,
    accessKeyId: S3Config.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: S3Config.AWS_S3_SECRET_ACCESS_KEY
  });

  let params = {
    Bucket: S3Config.AWS_S3_BUCKET_NAME,
    Body: fs.createReadStream(file.path),
    Key: fileName,
  };

  const response = await new Promise(async (resolve, reject) =>
  {
    s3.putObject(params, function (err, data)
    {
      if (err)
      {
        resolve({
          status: false,
          message: err.message
        });
      } else
      {
        resolve({
          status: true,
          data: 'https://' + process.env.AWS_S3_BUCKET_NAME + '.s3.' + S3Config.AWS_S3_REGION + '.amazonaws.com/' + fileName
        });
      }
    });
  });

  return response;
};
module.exports = { upload };
