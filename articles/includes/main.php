<main id="content" class="container" role="main">
    <article class="article">
        <header class="article__header">
            <?php if($article_category !== "") { ?>
                <div class="category">
                    <span class="category__type"><?php echo $article_category;?></span>
                    <section class="category__content">
                        <?php include('article-types.php');?>
                    </section>
                </div>
                <hr>
            <?php } ?>
            <h2 class="article__title"><?php echo $title;?></h2>
            <p class="byline">Posted on <time pubdate="pubdate"><?php echo $pubdate;?></time></p>
            <div class="article__extra-header-info">
                <div class="author">
                    <p class="author__name">By <?php echo $author;?></p>
                    <p class="author__job">The News Beat Staff Reporter</p>
                </div>
 
            </div>
        </header>

        <figure class="featured-image">
            <img src="<?php echo($featured_img) ?>" alt="">
        </figure>
        
        <?php echo $article; ?>

        <figure id="videos">
           <h4>Here are some personal experiences from some of our readers</h4>
           <hr>
            <div id="player1"></div>
            <div id="player2"></div>
            <script type="text/javascript" src="https://www.googleapis.com/youtube/v3/videos?id=itemId&key=apiKey&fields=items(snippet(title))&part=snippet"></script>
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
            <script type="text/javascript">
                var vids = ["<?php echo $video_id; ?>", "<?php echo $video2_id; ?>", "<?php echo $video_name; ?>", "<?php echo $video2_name; ?>"];
            </script>
            <script type="text/javascript" src="../includes/main.js"></script>
        </figure>
            
        <?php

        include('comments.php');

        ?>

            <!--<a href='#' onclick='downloadCSV({ filename: "video-data.csv" });'>Download CSV</a> -->

    </article>
</main>
