import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { PluginInitOptions } from './types';
import { PLUGIN_INIT_OPTIONS } from './constants';
import { FeedbackEntity } from './feedback.entity';
import { FeedbackService } from './feedback.services';
import { adminApiExtensions,shopApiExtensions } from './api.extension';
import { FeedbackShopResolver } from './shop.resolver';
import { FeedbackAdminResolver } from './admin.resolver';
import path from 'path';
//import { AdminUiExtension } from '@vendure/ui-devkit/compiler';

/**
 * An example Vendure plugin.
 *
 * @example
 * ```TypeScript
 * export const config: VendureConfig = {
 *   //...
 *   plugins: [
 *     ExamplePlugin.init({
 *       // options
 *     }),
 *   ]
 * }
 * ```
 */
@VendurePlugin({
    // Importing the PluginCommonModule gives all of our plugin's injectables (services, resolvers)
    // access to the Vendure core providers. See https://www.vendure.io/docs/typescript-api/plugin/plugin-common-module/
    imports: [PluginCommonModule],
    entities: [FeedbackEntity],
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [FeedbackShopResolver],
    },
	adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [FeedbackAdminResolver],
    },
    providers: [
       FeedbackService,
        // By definiting the `PLUGIN_INIT_OPTIONS` symbol as a provider, we can then inject the
        // user-defined options into other classes, such as the {@link ExampleService}.
        { provide: PLUGIN_INIT_OPTIONS, useFactory: () => FeedbackPlugin.options },
    ]
})
export class FeedbackPlugin {

    static options: PluginInitOptions;

    /**
     * The static `init()` method is a convention used by Vendure plugins which allows options
     * to be configured by the user.
     */
    static init(options: PluginInitOptions) {
        this.options = options;
        return FeedbackPlugin;
    }
	
}