    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    var rand = Math.floor((Math.random() * 2));
    var youtubeVideoID = vids[rand];
    var youtubeVideoName = vids[rand + 2];
    var youtubeVideoID2 = vids[(rand - 1) * -1];
    var youtubeVideoName2 = vids[(rand - 1) * +1];

    // initiailize player events 
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player1', {
            height: '320',
            width: '100%',
            videoId: youtubeVideoID,
            playerVars: {
                'rel': 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        }), player = new YT.Player('player2', {
            height: '320',
            width: '100%',
            videoId: youtubeVideoID2,
            playerVars: {
                'rel': 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });

    }

    //initialize timer elements to 0
    var total_viewed_time = 0, start_time = 0, end_time = 0;

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target;
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }

    // Stop the video on pause
    function stopVideo() {
        player.stopVideo();
    }


    // Create array with data
    var hasBeenClicked = false;
    var videoState = 'Not Played';
    var timeWatched = 0;
    var videoDate = new Date();
    var result = '';

    // If the player changes state
    function onPlayerStateChange(event) {

        hasBeenClicked = true;
        videoDate = new Date();

        // If the video is still playing as has not finished
        if (event.data === YT.PlayerState.PLAYING && !done) {
            start_time = new Date().getTime(); // milliseconds
            end_time = start_time;
            videoState = 'Played';
        }

        // If the video has puased or ended
        if (event.data == YT.PlayerState.PAUSED || YT.PlayerState.ENDED) {
            end_time = new Date().getTime(); // milliseconds
            total_viewed_time += end_time - start_time; // milliseconds

            // convert from milleseconds to seconds 
            timeWatched = (total_viewed_time / 1000) - 0.25;
            //alert(videoDate + " " + timeWatched + " " + youtubeVideoName + result);
        }

        // update the viewing states
        if (event.data == YT.PlayerState.PAUSED ) {
            videoState = 'Paused';
        } else if (event.data == YT.PlayerState.ENDED){
            videoState = 'Ended';
        }

        // Data to convert to csv
        var videoData = [
            {
                Date: videoDate,
                VideoPlayed: hasBeenClicked,
                VideoState: videoState,
                TimeViewed: timeWatched,
                VideoTitle: youtubeVideoName
            }

        ];

        // pass variable to other method to convert to csv friendly string
        result = convertArrayOfObjectsToCSV({
            data: videoData
        });


    }

    window.onbeforeunload = function(){

        if (videoState == 'Played') {
            end_time = new Date().getTime(); // milliseconds
            total_viewed_time += end_time - start_time; // milliseconds

            // convert from milleseconds to seconds 
            timeWatched = (total_viewed_time / 1000) - 0.25;
        }
        var videoData = [
            {
                Date: videoDate,
                FirstVideoShown: youtubeVideoName,
                VideoPlayed: hasBeenClicked,
                TimeViewed: timeWatched,
                VideoTitle: youtubeVideoName
            }

        ];

        // pass variable to other method to convert to csv friendly string
        result = convertArrayOfObjectsToCSV({
            data: videoData
        });

        log(result);

        
    };

    // Pass an array and convert it to a string that can be interpretted as a csv
    function convertArrayOfObjectsToCSV(args) {  

        // initialize variables
        var returnString, ctr, keys, columnDelimiter, lineDelimiter, data;
        returnString = '';
        data = args.data || null;

        // if there is no data passed in the args parameter
        if (data == null || !data.length) {
            return null;
        }

        // get the 'labels' from the array
        keys = Object.keys(data[0]);

        // col and line delimiter
        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        // add the labels to the top of the csv
//        returnString += keys.join(columnDelimiter);
//        returnString += lineDelimiter;

        // Loop through all of the elements
        data.forEach(function (item) {

            ctr = 0;

            keys.forEach(function (key) {
                // add a comma after each element
                if (ctr > 0) {returnString += columnDelimiter}

                // add the element to the return string
                returnString += item[key];
                // increment num of times it has looped
                ctr++;
            });

            // add a newline character after each data set
            returnString += lineDelimiter;
        });

        return returnString;
    }


    function log(action) {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', '../../inc/class.log.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200) {
                // alert('Something went wrong.  Name is now ' + xhr.responseText);
                // xhr.send(encodeURI('log=' +logContent ));
            }
            else if (xhr.status !== 200) {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send(encodeURI('log=true&identifier='+studyType+'&user_id='+userID+'&action='+action));
    }
