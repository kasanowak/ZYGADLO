<?php get_header(); ?>
<header class="header">
    <h1 class="header__title">Andrzej Żygadło</h1>
    <ul class="header__description">
        <li class="header__description__item">Malarstwo,</li>
        <li class="header__description__item">rysunek,</li>
        <li class="header__description__item">grafika,</li>
        <li class="header__description__item">fotografia.</li>
    </ul>
    <div class="header__background-pictures">
        <div class="header__background-pictures__item">
            <img class="header__background-pictures__item__picture" src="<?php bloginfo('template_directory'); ?>/images/backgroundPic1.png" alt="">
            <div class="header__background-pictures__item__desc">
                Rodzina B nr 1, 2016 | olej, sprej, płótno | 100x81
            </div>
        </div>
        <div class="header__background-pictures__item">
            <img class="header__background-pictures__item__picture" src="<?php bloginfo('template_directory'); ?>/images/backgroundPic2.png" alt="">
            <div class="header__background-pictures__item__desc"></div>
        </div>
    </div>
</header>
<main class="main">
    <h2 class="main__title">Nowości</h2>
  <section class="main__articles">
      <?php
      $args = array(
          'post_type' => array('obozy_badawcze', 'publikacje', 'galeria', 'wystawy'),
          'post_status' => 'publish',
          'posts_per_page' => 5,
          'orderby' => 'post_date',
          'order' => 'ASC'
      );

      $news = new WP_Query($args);

      while ($news->have_posts()) :
          $news->the_post();
          $meta = get_post_meta(get_the_ID(), '', true);
//          echo '<pre>' . var_export($post, true) . '</pre>';
//          echo '<pre>' . var_export($meta, true) . '</pre>';
          ?>

        <a class="main__articles__item" href="<?php echo $post->guid; ?>">
          <div class="main__articles__item__title">
              <?php the_title(); ?>
          </div>
          <div class="main__articles__item__date">
            <?php
            $date = date_create($post->post_date);
            echo date_format($date, 'd/m/Y');
            ?>
          </div>
          <h4 class="main__articles__item__type">
              <?php
              if ($meta['typ_publikacji'][0]) {
                  echo $meta['typ_publikacji'][0];
              } else {
                  echo $post->post_type;
              }
              ?>
          </h4>
        </a>

      <?php
      endwhile;
      wp_reset_postdata();
      ?>
  </section>
</main>
<?php get_footer(); ?>
