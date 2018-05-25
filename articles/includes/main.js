    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;

    // Randomize which video is played first
    // using an array of [id1,id2,name1,name2]
    // Start by randomly picking either 0 or 1
    var rand = Math.floor((Math.random() * 2));
    // Use that random number to determine the name and id of the
    // Respective videos 

    if(vids[4] != 'control') { 
        var youtubeVideoID = vids[rand];
        var youtubeVideoName = vids[rand + 2];
        var youtubeVideoID2 = vids[(rand - 1) * -1];
        var youtubeVideoName2 = vids[(rand - 1) * -1 + 2];
    } else {
        var youtubeVideoName = 'Control - ' + vids[5];
        var youtubeVideoName2 = 'Control - ' + vids[5];
    }

    // initiailize player events 
    function onYouTubeIframeAPIReady() {
        // Initalize the first player
        // In a div with the id of 'player1'
        // calls the onPlayerStateChange function
        player = new YT.Player('player1', {
            height: '320',
            width: '100%',
            videoId: youtubeVideoID,
            host: 'https://www.youtube.com',
            playerVars: {
                'rel': 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        }), 
        // Construct the second player
        // In a div with the id of 'player2'
        // calls the onPlayerStateChange1 function
            player = new YT.Player('player2', {
            height: '320',
            width: '100%',
            videoId: youtubeVideoID2,
            host: 'https://www.youtube.com',
            playerVars: {
                'rel': 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange1
            }
        });

    }

    //initialize timer elements to 0
    var total_viewed_time = 0, start_time = 0, end_time = 0;
    var total_viewed_time1 = 0, start_time1 = 0, end_time1 = 0;

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


    // initialize all of the variables needed for the log
    // Seperate variables for the two players
    var videoOneClicked = false;
    var videoTwoClicked = false;
    var videoState1 = "";
    var videoState2 = "";
    var videoOneTimeWatched = 0;
    var videoTwoTimeWatched = 0;
    var videoDate = new Date();
    var result = "";
    var commenter_name = "-";
    var new_comment = "-";

    // The parent function for what will happen onStateChange
    // This includeds video being paused, ending or played
    // If the player changes state
    function onPlayerStateChange(event) {

        videoOneClicked = true;
        videoDate = new Date();

        // If the video is still playing as has not finished
        if (event.data == YT.PlayerState.PLAYING && !done) {
            start_time = new Date().getTime(); // milliseconds
            end_time = start_time;
            videoState1 = 'Played';
        }

        // If the video has puased or ended
        if (event.data == YT.PlayerState.PAUSED || event.data ==  YT.PlayerState.ENDED) {
            videoState1 = 'Stopped';
            end_time = new Date().getTime(); // milliseconds
            total_viewed_time += end_time - start_time; // milliseconds

            // convert from milleseconds to seconds 
            videoOneTimeWatched = (total_viewed_time / 1000) - 0.25;
        }

    }
    function onPlayerStateChange1(event) {

        videoTwoClicked = true;
        videoDate = new Date();

        // If the video is still playing as has not finished
        if (event.data === YT.PlayerState.PLAYING && !done) {
            start_time1 = new Date().getTime(); // milliseconds
            end_time1 = start_time1;
            videoState2 = 'Played';
        }

        // If the video has puased or ended
        if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
            videoState2 = 'Stopped';
            end_time1 = new Date().getTime(); // milliseconds
            total_viewed_time1 += end_time1 - start_time1; // milliseconds

            // convert from milleseconds to seconds 
            videoTwoTimeWatched = (total_viewed_time1 / 1000) - 0.25;
        }

    }

    // The code for what happens when you click submit on the comment button
    $("#submit-comment").click(function(event) {
        
        // Get the variables from user inputr
        var name = $("#commenter-name").val();
        var comment = $("#commenter-comment").val();

        // If the name and comment have been entered then display a success message
        if (name.length > 0 && comment.length > 0 ) {
            submitComment(name, comment);
            // send to google
            //ga('send', 'event','Comments', 'Add Comment', label);
        } else {
            submitCommentError();
            // var commenter_position = ".support";
            // send to google
            //ga('send','event','Comments', 'Add Comment Error', label);
        }

        // var commenter_position = ".support";
        event.preventDefault();
    });

    // Display a success message on the page
    // store the user input to log later
    function submitComment(name, comment) {
        $(".new-comment").replaceWith('<div class="alert alert-success">Thanks for your comment!</div>');
        commenter_name = name;
        new_comment = comment;
    }
    
    // Display a success message on the page
    function submitCommentError() {
        $('.alert-error').remove();
        $(".new-comment").append("<div class='alert alert-error'>* Please enter your name and a comment.</div>");
        //log('Comment', 'Add Comment', 'Add Comment Error');
    }

    // Have this function runs right before the user navigates away from the page
    window.onbeforeunload = function(){
        
        // Check to see if Player1 is still playing
        if (videoState1 == 'Played') {
            end_time = new Date().getTime(); // milliseconds
            total_viewed_time += end_time - start_time; // milliseconds

            // convert from milleseconds to seconds 
            videoOneTimeWatched = (total_viewed_time / 1000) - 0.25;
        } 
        
        // Check to see if Player2 is still playing
        if (videoState2 == 'Played') {
            end_time1 = new Date().getTime(); // milliseconds
            total_viewed_time1 += end_time1 - start_time1; // milliseconds

            // convert from milleseconds to seconds 
            videoTwoTimeWatched = (total_viewed_time1 / 1000) - 0.25;
        }
        
        // construct the data that needs to be logged
        var videoData = [
            {
                Date: videoDate,
                FirstVideoShown: youtubeVideoName,
                SecondVideoShown: youtubeVideoName2,
                VideoOnePlayed: videoOneClicked,
                VideoTwoPlayed: videoTwoClicked,
                VideoOneTimeWatched: videoOneTimeWatched,
                VideoTwoTimeWatched: videoTwoTimeWatched,
                CommenterName: commenter_name,
                Comment: new_comment,
            }

        ];

        // pass variable to other method to convert to csv friendly string
        result = convertArrayOfObjectsToCSV({
            data: videoData
        });

        // log the csv friendly string to the csv file
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
        // returnString += keys.join(columnDelimiter);
        // returnString += lineDelimiter;

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

    // function to log the data to a csv file through PHP
    function log(action) {
        var xhr = new XMLHttpRequest();
        // Send the POST request to the class.log php file, it will be processed there
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
