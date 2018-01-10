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

        
        <? echo $article;?>

        <?php

            echo $_COOKIE["csv"];
    
        // include('comments.php');

        ?>
            <div id="player"></div>
            <script type="text/javascript" src="https://www.googleapis.com/youtube/v3/videos?id=itemId&key=apiKey&fields=items(snippet(title))&part=snippet"></script>
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
            <script type="text/javascript">
                var video_id = "<?php echo $video_id; ?>";
                var video_name = "<?php echo $video_name; ?>";
            </script>
            <script type="text/javascript" src="../includes/main.js"></script>

            <!--<a href='#' onclick='downloadCSV({ filename: "video-data.csv" });'>Download CSV</a> -->

    </article>
</main>
