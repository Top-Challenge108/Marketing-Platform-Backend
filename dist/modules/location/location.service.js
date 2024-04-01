"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const nestjs_i18n_1 = require("nestjs-i18n");
const common_1 = require("@nestjs/common");
const base_abstract_service_1 = require("../../base/base.abstract.service");
const location_repository_1 = require("./location.repository");
const common_constants_1 = require("../../common/common.constants");
let LocationService = class LocationService extends base_abstract_service_1.BaseAbstractService {
    constructor(i18nService, locationRepository) {
        super(i18nService);
        this.locationRepository = locationRepository;
    }
    async findAndCreateLocation(locationDto) {
        const { placeId } = locationDto;
        const location = await this.locationRepository.findOne({
            placeId,
        });
        if (!location) {
            return this.locationRepository.create(Object.assign(Object.assign({}, locationDto), { location: {
                    type: 'Point',
                    coordinates: locationDto.location,
                } }));
        }
        return location;
    }
    async getLocations() {
        const locations = await this.locationRepository
            .findAll()
            .select('address id placeId latitude longitude')
            .sort({ address: 1 });
        return this.formatOutputData({
            key: `translate.GET_LIST_LOCATION_SUCCESSFULLY`,
            lang: common_constants_1.LanguageCode.United_States,
        }, {
            statusCode: common_constants_1.StatusCode.GET_LIST_LOCATION_SUCCESSFULLY,
            data: locations,
        });
    }
    async findLocationById(id) {
        return this.locationRepository.findById(id);
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nService,
        location_repository_1.LocationRepository])
], LocationService);
//# sourceMappingURL=location.service.js.map