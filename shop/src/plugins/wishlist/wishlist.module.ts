import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { WishlistItem } from './entity';
import { WishlistService } from './demo.services';
import { shopApiExtensions } from './schema/api-extenstion';
import { WishlistShopResolver } from './demo.resolver';

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [WishlistService],
    entities: [WishlistItem],
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [WishlistShopResolver],
    },
    configuration: config => {
        config.customFields.Customer.push({
            name: 'wishlistItems',
            type: 'relation',
            list: true,
            entity: WishlistItem,
            internal: true,
        });
        return config;
    },
})
export class WishlistPlugin {}