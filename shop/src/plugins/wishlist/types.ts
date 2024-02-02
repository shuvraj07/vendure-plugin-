import { WishlistItem } from "./entity";

declare module '@vendure/core/dist/entity/custom-entity-fields' {
  interface CustomCustomerFields {
    wishlistItems: WishlistItem[];
  }
}