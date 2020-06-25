<?php
add_theme_support('post-thumbnails');
add_theme_support('title-tag');
add_action('init', 'register_my_menus');
add_action('get_header', 'remove_admin_login_header');
//add_action('add_meta_boxes_post', 'arty_add_meta_boxes_to_post');

//add_action('admin_menu', 'custom_menu_page_removing', 9001, 1);
//add_action('admin_menu', 'custom_submenu_page_removing', 999);
//add_action('save_post', 'arty_save_post_data');



//if (wp_get_current_user()->ID === 5) {
//
//
//}
//add_action('admin_print_scripts', 'my_admin_scripts');
function my_admin_scripts()
{
    wp_register_script( 'my-plugin-script', plugins_url( '/js/admin-theme.js', __FILE__ ) );
}

function register_my_menus()
{
    register_nav_menus(array('header-menu' => __('Menu')));
}

function remove_admin_login_header()
{
    remove_action('wp_head', '_admin_bar_bump_cb');
}

//function custom_menu_page_removing()
//{
//    if (wp_get_current_user()->ID === 1) {
//        return;
//    }
//
//    remove_submenu_page('dopbsp', 'dopbsp');
//    remove_submenu_page('dopbsp', 'dopbsp-locations');
//    remove_submenu_page('dopbsp', 'dopbsp-calendars');
//    remove_submenu_page('dopbsp', 'dopbsp-rules');
//    remove_submenu_page('dopbsp', 'dopbsp-extras');
//    remove_submenu_page('dopbsp', 'dopbsp-discounts');
//    remove_submenu_page('dopbsp', 'dopbsp-fees');
//    remove_submenu_page('dopbsp', 'dopbsp-coupons');
//    remove_submenu_page('dopbsp', 'dopbsp-forms');
//    remove_submenu_page('dopbsp', 'dopbsp-emails');
//    remove_submenu_page('dopbsp', 'dopbsp-translation');
//    remove_submenu_page('dopbsp', 'dopbsp-settings');
//    remove_submenu_page('dopbsp', 'dopbsp-tools');
//
//    remove_submenu_page('themes.php', 'theme-editor.php');
//    remove_submenu_page('themes.php', 'widgets.php');
//    remove_submenu_page('themes.php', 'nav-menus.php');
//
//
//
//    remove_menu_page('gadwp_settings');
//    remove_menu_page('tools.php');
//    remove_menu_page('link-manager.php');
//    remove_menu_page('edit.php');
//    remove_menu_page('edit-comments.php');
//    remove_menu_page('upload.php');
//    remove_menu_page('plugins.php');
//    remove_menu_page('themes.php');
//    remove_menu_page('users.php');
//    remove_menu_page('options-general.php');
//    remove_menu_page('wpcf7');
//    remove_menu_page('gadash_settings');
//    remove_menu_page('update-core.php');
//    remove_menu_page('index.php');
//    remove_menu_page('loco');
//
//    add_submenu_page('edit.php', 'Event settings', 'Settings', "dopbsp", 'settings', 'dodfsdpbsp', '');
//
//}

//if (function_exists('register_sidebar')) {
//    register_sidebar(array(
//            'name' => 'Dane kontaktowe',
//            'before_widget' => '<address class = "contact-widget">',
//            'after_widget' => '</address>',
//            'before_title' => '<h3>',
//            'after_title' => '</h3>',
//        )
//    );
//}
//define('WP_DEBUG_DISPLAY', true);

remove_action('wp_head', 'wp_generator');
