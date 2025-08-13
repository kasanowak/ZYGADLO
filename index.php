<?php get_header(); ?>
<header class="header--page">
  <h1 class="header__title">Andrzej Żygadło</h1>
</header>
<article class="article">
  <h2 class="article__title"><?php the_title(); ?></h2>
    <?php
    $meta = get_post_meta(get_the_ID(), '', true);
     if (!empty($meta['opis_pod_tytulem'][0])) {
         echo '<h3 class="article__subtitle">' . $meta['opis_pod_tytulem'][0] . '</h3>';
     }
    ?>
  <section class="article__content">
      <?php
      if (have_posts()) : while (have_posts()) : the_post();
          the_content();
      endwhile;
      endif;
      ?>
  </section>
  <section class="article__exhibitions">

  </section>
  <section class="article__publications">
      <?php
      $args = array(
          'post_type' => array('wystawy'),
          'post_status' => 'publish',
          'posts_per_page' => 5,
          'orderby' => 'post_date',
          'order' => 'ASC',
          'meta_key' => 'pokaz_w_bio',
          'meta_value' => '1'
      );

      $news = new WP_Query($args);

      while ($news->have_posts()) :
          $news->the_post();
          $meta = get_post_meta(get_the_ID(), '', true);
//          echo '<pre>' . var_export($post, true) . '</pre>';
          ?>
        <div class="article__publications__item">
            <?php the_title(); ?>
        </div>
      <?php
      endwhile;
      wp_reset_postdata();
      ?>
  </section>
</article>
<?php get_footer(); ?>
