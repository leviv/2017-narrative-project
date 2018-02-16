<?php

function get_the_ip() {
    $ip = 0;
    
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    
    return $ip;
}


/**
* Quick use SVG
*/
function svg($name, $options = array('title'=>false,'class'=>false)) {

	return
'<svg class="icon icon--'.$name. ($options['class'] != false ? ' '. $options['class']  : '').'">'.($options['title'] != false ? '<title>'.$options['title'].'</title>' : '').'<use xlink:href="#'.$name.'" /></svg>';
}


function get_current_url() {
	if($_SERVER[HTTP_HOST] === 'dev') {
		$http = 'http';
	} else {
		$http = 'https';
	}
	return "$http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
}

function social_share($id) {
	$current_url = get_current_url();
	$user_ip = get_the_ip();
	return '<ul class="social-share social-share--'.$id.'">
				<li class="social-share__item social-share__item--facebook">
					<a class="social-share__link social-share__link--facebook social-share__link--facebook-'.$id.'" data-position="'.ucwords($id).'" data-label="'.$user_ip.'"
						data-url="'.$current_url.'" href="#">
						<span class="icon-social icon-social--facebook" role="presentation" aria-hidden="true">
							'.svg('facebook').'
						</span>
						 Share on Facebook
					</a>
				</li>

				<li class="social-share__item social-share__item--twitter">
					<a class="social-share__link social-share__link--twitter social-share__link--twitter-'.$id.'" data-action="Twitter Share - '.ucwords($id).'" data-label="'.$user_ip.'" href="http://twitter.com/intent/tweet?text='.urlencode($title).'&url='.urlencode($current_url).'">
						<span class="icon-social icon-social--twitter" role="presentation" aria-hidden="true" >
							'.svg('twitter').'
						</span>
						 Share on Twitter
					</a>
				</li>
			</ul>';
}

/**
* Output HTML needed for a footnote
*/
function footnote($number, $footnotes) {
	return '<button class="footnote__button" data-footnote-id="'.$number.'"><sup>'.$number.'</sup></button>
			<span class="footnote__content">'.$footnotes[$number - 1].'</span>';
}

/**
* Removes footnotes from string
*/
function remove_footnotes($footnotes, $article) {
	$i=1;
    if (is_array($footnotes)) {
        foreach ($footnotes as $footnote) {
            $article = str_replace(footnote($i,$footnotes), '', $article);
            $i++;
        }
    }
	return $article;
}

/**
* An internal navigation used on the About the Trust Project page
*/
function internal_nav() {
	return '<nav class="long-page-nav"><a href="#table-of-contents">Return to Trust Indicators</a> | <a href="'.get_referral_url().'">Go Back to the Article</a></nav>';
}

/**
* Get previous referrer from URL Param
* @return string (/root/path/previous-page-url/)
*/
function get_referral_url() {
	$referrer = '';
	if($_GET['referrer'] && !empty($_GET['referrer'])) {
		// process the url into a cleaner string
		$url = urldecode($_GET['referrer']);
		$referrer = $url;
	}
	return $referrer;
}
?>
