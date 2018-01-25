
<footer class="colophon container container--wide">
    <div class="row row--wide">
        <p class="copyright center">This material may not be published, broadcast, rewritten, or redistributed.<br/>&copy; <? echo Date('Y');?> The News Beat, LLC. All Rights Reserved.</p>
    </div>
</footer>

<?php
// only show analytics if not on dev
// if(!strpos($current_url, '://dev') && !strpos($current_url, '://localhost')) :
    include('google-analytics.php');
    include('generate-userID.php');
// endif;?>
<script type="text/javascript" src="https://www.googleapis.com/youtube/v3/videos?id=itemId&key=apiKey&fields=items(snippet(title))&part=snippet"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="../../dist/js/scripts.js"></script>
<script type="text/javascript">
    var vids = ["<?php echo $video_id; ?>", "<?php echo $video2_id; ?>", "<?php echo $video_name; ?>", "<?php echo $video2_name; ?>"];
</script>
<script type="text/javascript" src="../includes/main.js"></script>
</body>
</html>
