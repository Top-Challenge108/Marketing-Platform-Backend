import { DiscoveryService } from '@golevelup/nestjs-discovery';
import { PermissionsService } from './modules/permissions/permissions.service';
export declare class AppModule {
    private readonly discover;
    private readonly permissionsService;
    constructor(discover: DiscoveryService, permissionsService: PermissionsService);
    onModuleInit(): Promise<void>;
}
