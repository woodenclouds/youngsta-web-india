export const API_ENDPOINTS = {
    FORGET_PASSWORD: "/forget-password",
    ON_SELLING_PRODUCTS: "products/viewproduct/?tags=on-selling-products",
    NEW_ARRIVAL_PRODUCTS: "products/viewproduct/?tags=new-arrival-products",

    // account endpoints
    VIEW_ADDRESS: "accounts/view_addresses/",
    ADD_ADDRESS: "accounts/add_address/",
    CREATE_REFERAL: "activities/create-refferal/",

    // authentication endpoints
    LOGIN: "accounts/login/",
    REGISTER: "accounts/signup/",
    VERIFY_OTP: "accounts/verify/",
    LOGOUT: "/logout",
    CHANGE_PASSWORD: "accounts/change-password/",

    // product endpoints
    CATEGORIES: "products/category/",
    PRODUCTS: "products/viewproduct/",
    FEATURED_PRODUCTS: "products/viewproduct/?tags=featured-products",
    FLASH_SALE_PRODUCTS: "products/viewproduct/?tags=flash-sale-products",
    RELATED_PRODUCTS: "products/get-related-product/",
    HEADER_MENU: "products/view-category/",

    // cart endpoints
    ADD_TO_CART: "activities/add_to_cart/",
    REMOVE_FROM_CART: "activities/remove_from_cart/",
    EDIT_CART: "activities/edit_cart_item/",
    VIEW_CART_ITEMS: "activities/view_cart_items/",

    // wislist endpoints
    VIEW_WISHLIST_ITEMS: "activities/view_wishlist/",
    REMOVE_WISHLIST_ITEMS: "activities/delete_wishlist_item/",
    ADD_WISHLIST_ITEMS: "activities/add_to_wishlist/",

    // orders endpoints
    VIEW_ORDERS: "activities/viewPurchase/",
    CHECKOUT: "activities/purchase_items/",
    SUCCESS_CHECKOUT: "activities/success/",
    ORDERS: "activities/orders/",
    WALLET: "activities/wallet/",
};
