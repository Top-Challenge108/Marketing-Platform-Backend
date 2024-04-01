"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaceDetails = exports.generatePaginateOption = exports.validateSasPermission = exports.getSasUrl = exports.getRndInteger = exports.decodePassword = exports.paginationTransformer = exports.paginate = exports.mongooseAggregatePaginate = void 0;
const configs_constants_1 = require("../configs/configs.constants");
const storage_blob_1 = require("@azure/storage-blob");
const axios_1 = require("axios");
const GOOGLE_API_KEY = configs_constants_1.googleConfig.GOOGLE_API_KEY;
exports.mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');
exports.paginate = require('mongoose-paginate-v2');
function paginationTransformer(input) {
    return {
        data: input.data,
        total: input.totalDocs,
        page: input.page,
        limit: input.limit,
    };
}
exports.paginationTransformer = paginationTransformer;
const decodePassword = function decodePassword(password) {
    return decodeURIComponent(Buffer.from(password, 'base64').toString('utf-8'));
};
exports.decodePassword = decodePassword;
const getRndInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
exports.getRndInteger = getRndInteger;
const getSasUrl = async function getSasUrl(fileName, permissions, id) {
    const sharedKeyCredential = new storage_blob_1.StorageSharedKeyCredential(configs_constants_1.azureConfig.AZURE_ACCOUNT_NAME, configs_constants_1.azureConfig.AZURE_ACCOUNT_KEY);
    const blobServiceClient = new storage_blob_1.BlobServiceClient(`https://${configs_constants_1.azureConfig.AZURE_ACCOUNT_NAME}.blob.core.windows.net`, sharedKeyCredential);
    const containerClient = blobServiceClient.getContainerClient(`${configs_constants_1.azureConfig.AZURE_CONTAINER_NAME}/${id}`);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    return blockBlobClient.generateSasUrl({
        permissions: storage_blob_1.BlobSASPermissions.parse(permissions || 'rc'),
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + configs_constants_1.azureConfig.AZURE_EXPIRE_TIME),
    });
};
exports.getSasUrl = getSasUrl;
const validateSasPermission = function validateSasPermission(permissions) {
    for (const i in permissions) {
        if (!configs_constants_1.azureConfig.LIST_PERMISSION.includes(permissions[i]))
            return false;
    }
    return true;
};
exports.validateSasPermission = validateSasPermission;
const generatePaginateOption = function generatePaginateOption({ page, limit, }) {
    return {
        page,
        limit,
        skip: (page - 1) * limit,
    };
};
exports.generatePaginateOption = generatePaginateOption;
const getPlaceDetails = async function getPlaceDetails(placeId) {
    try {
        const response = await axios_1.default.get('https://maps.googleapis.com/maps/api/place/details/json', {
            params: {
                placeid: placeId,
                key: GOOGLE_API_KEY,
            },
        });
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
        }
        else {
            console.error('Place details not found.');
            return null;
        }
    }
    catch (error) {
        console.error('Error fetching place details:', error.message);
        return null;
    }
};
exports.getPlaceDetails = getPlaceDetails;
//# sourceMappingURL=helpers.js.map