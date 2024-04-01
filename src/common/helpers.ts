import { azureConfig, googleConfig } from '../configs/configs.constants';
import { IPaginationData } from './commom.interface';
import {
  BlobSASPermissions,
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import axios from 'axios';

const GOOGLE_API_KEY = googleConfig.GOOGLE_API_KEY;
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const paginate = require('mongoose-paginate-v2');

export function paginationTransformer(input): IPaginationData {
  return {
    data: input.data,
    total: input.totalDocs,
    page: input.page,
    limit: input.limit,
  };
}

export const decodePassword = function decodePassword(password) {
  return decodeURIComponent(Buffer.from(password, 'base64').toString('utf-8'));
};

export const getRndInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getSasUrl = async function getSasUrl(
  fileName: string,
  permissions: string,
  id: string,
): Promise<string> {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    azureConfig.AZURE_ACCOUNT_NAME,
    azureConfig.AZURE_ACCOUNT_KEY,
  );
  const blobServiceClient = new BlobServiceClient(
    `https://${azureConfig.AZURE_ACCOUNT_NAME}.blob.core.windows.net`,
    sharedKeyCredential,
  );
  const containerClient = blobServiceClient.getContainerClient(
    `${azureConfig.AZURE_CONTAINER_NAME}/${id}`,
  );
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  return blockBlobClient.generateSasUrl({
    permissions: BlobSASPermissions.parse(permissions || 'rc'),
    startsOn: new Date(),
    expiresOn: new Date(new Date().valueOf() + azureConfig.AZURE_EXPIRE_TIME),
  });
};

export const validateSasPermission = function validateSasPermission(
  permissions: any,
): boolean {
  for (const i in permissions) {
    if (!azureConfig.LIST_PERMISSION.includes(permissions[i])) return false;
  }
  return true;
};

export const generatePaginateOption = function generatePaginateOption({
  page,
  limit,
}): any {
  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};

export const getPlaceDetails = async function getPlaceDetails(placeId) {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          placeid: placeId,
          key: GOOGLE_API_KEY,
        },
      },
    );

    const result = response.data.result;
    if (result) {
      const { lat, lng } = result.geometry.location;
      const { formatted_address: address, name } = result;

      return {
        location: [lng, lat],
        address,
        name,
        placeId,
      };
    } else {
      console.error('Place details not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching place details:', error.message);
    return null;
  }
};
