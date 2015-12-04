 var sg_save_load = (function () {

 function save_state(state) {

        var jsn1 = JSON.stringify(state);

        jsn = JSON.stringify({
          'username' : currentUname,
          'gamename': "gol",
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

    function load_state() {
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
                    obj = JSON.parse(data2);


                    game_state_json = obj.savedGames.gol.state;
                    //console.log(game_state_json);
                    //gm_state = game_state_json.substr(1, game_state_json.length - 2);
                    //var state = var json = JSON.parse("[" + value + "]");
                    var state = JSON.parse(game_state_json);
                    console.log(state);
                    
                    //var arr = $.map(game_state_json, function(el) { return el; });

                    // try at fix
                    //life.initUniverse(graphics.canvasSelector);
                    //$(graphics.canvasSelector).unbind('mousedown');
                    //life.initUniverse(graphics.canvasSelector);
                    //life.clear();
                    //life.prev = state;

                    //graphics.paint();


                    graphics.initCanvas(graphics.canvasSelector);
                    life.xCells = Math.floor((graphics.canvas.width - 1) / graphics.cellSize);
                    life.yCells = Math.floor((graphics.canvas.height - 1) / graphics.cellSize);
                    graphics.ctx.fillStyle = graphics.offColour;
                    graphics.ctx.fillRect(0, 0, life.xCells * graphics.cellSize, life.yCells * graphics.cellSize);
                    // below deletion, gets rid of grid look.
                    //graphics.ctx.fillStyle = graphics.gridColour;

                    for (x = 0; x < life.xCells; x++) {
                        life.prev[x] = state[x];
                        life.next[x] = [];
                        graphics.ctx.fillRect(x * graphics.cellSize, 0, 1, life.yCells * graphics.cellSize);
                        for (y = 0; y < life.yCells; y++) {
                            life.prev[x][y] = state[x][y];
                        }
                    }
                    graphics.ctx.fillRect(life.xCells * graphics.cellSize, 0, 1, life.yCells * graphics.cellSize);
                    for (y = 0; y < life.yCells; y++) {
                        graphics.ctx.fillRect(0, y * graphics.cellSize, life.xCells * graphics.cellSize, 1);
                    }
                    graphics.ctx.fillRect(0, life.yCells * graphics.cellSize, life.xCells * graphics.cellSize, 1);
                    /*
                    $(graphics.canvasSelector).mousedown(graphics.handleMouse);
                    
                    $('body').mouseup(function (e) {
                        $(graphics.canvasSelector).unbind('mousemove');
                    });
                    */
                    graphics.paint();

                    //life.initUniverse(graphics.canvasSelector);
                    //life.prev = arr;
                    console.log("device control succeeded");
                },
                error: function(){
                //console.log(data);
                    console.log("Device control failed");
                },
            });


}());