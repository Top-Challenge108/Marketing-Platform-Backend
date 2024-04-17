import { Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
  v2,
} from 'cloudinary';
import toStream = require('buffer-to-stream');
import { IFile } from '../../../interfaces/file.interface';
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: IFile,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  uploadImage2 = async (file: IFile) => {
    const options: UploadApiOptions = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: 'images',
    };

    try {
      // Upload the image
      const result = await v2.uploader.upload(toStream(file.buffer), options);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  getAssetInfo = async (publicId) => {
    // Return colors in the response
    const options = {
      colors: true,
    };

    try {
      // Get details about the asset
      const result = await v2.api.resource(publicId, options);
      return result.colors;
    } catch (error) {
      console.error(error);
    }
  };

  //////////////////////////////////////////////////////////////
  // Creates an HTML image tag with a transformation that
  // results in a circular thumbnail crop of the image
  // focused on the faces, applying an outline of the
  // first color, and setting a background of the second color.
  //////////////////////////////////////////////////////////////
  createImageTag = (publicId, ...colors) => {
    // Set the effect color and background color
    const [effectColor, backgroundColor] = colors;

    // Create an image tag with transformations applied to the src URL
    const imageTag = v2.image(publicId, {
      transformation: [
        { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
        { radius: 'max' },
        { effect: 'outline:10', color: effectColor },
        { background: backgroundColor },
      ],
    });

    return imageTag;
  };
}
