 var sg_game = (function () {

    var gamename;
    var state;

function initSgContext(gamename) {

    sg_game.gamename = gamename;
    //sg_game.load_state(sg_game.gamename);

}

 function save_state(state,gamename) {

        var jsn1 = JSON.stringify(state);

        jsn = JSON.stringify({
          'username' : currentUname,
          'gamename': gamename,
          'newstate': jsn1
        });

        if (currentUname.length >= 1){

            $.ajax({
                url: server_url+'/state_update',
                type: 'POST',
                contentType: 'application/json',
                xhrFields: {
                    withCredentials: true
                },
                data: jsn,
                
                success: function(data){
                    console.log(data);
                    console.log("device control succeeded");
                },
                error: function(){
                //console.log(data);
                    console.log("Device control failed");
                },
            });
        }
        else {
            alert("not logged in.");
        }
    }

     function load_state(gamename, callbackFunc) {

        callbackFunc = typeof callbackFunc !== 'undefined' ? callbackFunc : function donothing(){}; 

        console.log("load state hittin");
        if (currentUname.length >= 1){
        uget_url = server_url+"/user/?username="+currentUname;

        $.ajax({
                url: uget_url,
                type: 'GET',
                contentType: 'application/json',
                xhrFields: {
                    withCredentials: true
                },


                success: function(data){

                    data2 = data.substr(1, data.length - 2);
                    //console.log(data2);
                    obj = JSON.parse(data2);

                    // trying to put in the new state, --- not quite working yet..
                    //console.log(sg_game.gamename);

                    //game_state_json = obj.savedGames.adv_island_prj1.state;
                    //game_state_json = obj.savedGames[sg_game.gamename].state;
                    game_state_json = obj.savedGames[gamename].state;
                    var state = JSON.parse(game_state_json);
                    
                    sg_game.state = state;
                    console.log(sg_game.state["1.1"]);

          
                    console.log("device control succeeded");
                    callbackFunc(sg_game.state);

                },
                error: function(){
                //console.log(data);
                    console.log("Device control failed");
                    
                },
            });



        /*
        $.get( url, function( data ) {
            console.log( data );
            alert( "Load was performed." );
        })


        user_info = $.get(url);
        console.log(user_info);
        */
        }
        else {
            alert("not logged in.");
        }
    }    // end of load state



/*

        yCells: yCells,
        xCells: xCells,
        prev: prev,
        next: next,
        universe: prev,
        speed: speed,
        initUniverse: initUniverse,
        nextGen: nextGen,
        toggleLife: toggleLife,
        isAlive: isAlive,
        clear: clear,
        changeSpeed: changeSpeed,
        loadPattern: loadPattern,


*/

  return {
       
        gamename:  gamename,
        initSgContext: initSgContext,

      
        save_state:    save_state,
        load_state:  load_state
    };


}());