<?php

/**
 * Jim's includes
 *
 * The $jim_includes array determines the code library included in your theme.
 * Add or remove files to the array as needed. Supports child theme overrides.
 *
 * Please note that missing files will produce a fatal error.
 *
 * @link https://github.com/roots/roots/pull/1042
 */
$jim_includes = array(
  'lib/scripts.php',         // Scripts and stylesheets
  'lib/sidebars.php',
  'lib/extras.php',          // Custom functions
  'lib/theme_customizer.php'
);
foreach ($jim_includes as $file) {
  if (!$filepath = locate_template($file)) {
    trigger_error(sprintf(__('Error locating %s for inclusion', 'roots'), $file), E_USER_ERROR);
  }
  require_once $filepath;
}
unset($file, $filepath);


?>