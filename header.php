<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, minimum-scale=1.0">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="apple-mobile-web-app-title" content="andrzejzygadlo.pl">
  <meta name="application-name" content="andrzejzygadlo.pl">
  <meta name="msapplication-TileColor" content="#2d89ef">
  <meta name="theme-color" content="#00a5e7">
  <meta property="og:image:width" content="1366">
  <meta property="og:image:height" content="715">
  <meta property="og:title" content="ŻYGADŁO - website">
  <meta property="og:description"
        content="Andrzej Żygadło - Urodzony w 1988 w Przeworsku. Absolwent Liceum Plastycznego w Jarosławiu. W latach 2008-18 studiował na wydziałach Malarstwa oraz Konserwacji i Restauracji Dzieł Sztuki w krakowskiej ASP.">
  <meta property="og:url" content="http://andrzejzygadlo.pl/">
  <meta property="og:image" content="http://andrzejzygadlo.pl/og-image.jpg">

    <?php wp_head(); ?>

  <link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/style.css?v1.2">

</head>

<body <?php body_class($class); ?> >
<nav class="nav__hamburger"></nav>
<nav class="nav">
  <div class="nav__title">Menu</div>
  <div class="nav__button-close"></div>
  <div class="nav__menu">
      <?php wp_nav_menu(array('theme_location' => 'header-menu')); ?>
  </div>
  <div class="nav__contact">
    <a href="mailto:kontakt@andrzejzygadlo.pl" target="_blank">kontakt@andrzejzygadlo.pl</a>
    <a class="phone-link" href="tel:+48669691778">+48 669 691 778</a>
    <a href="https://www.facebook.com/Co-pi%C4%85tek-%C5%BBygad%C5%82o-112762573688432/" target="_blank">Facebook</a>
  </div>
</nav>