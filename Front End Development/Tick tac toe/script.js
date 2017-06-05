var game = (function(){
    var resultPlayer = 0;
    var resultAi = 0;
    var player = "";
    var $pg = $(".playground1");

    var choose = function(callback){
    //Choosing Stage
        //Making DOM elements to choose between X or O
        var choiceUl = jQuery("<ul/>",{class:"choice"}).appendTo($pg);
        var choiceX = jQuery("<li/>",{class:"lic", text:"X"}).appendTo(choiceUl);
        var or = jQuery("<li/>",{text:"or"}).appendTo(choiceUl);
        var choiceO = jQuery("<li/>",{class:"lic", text:"O"}).appendTo(choiceUl);

        //Binding events
        choiceX.on("click", loadBoard);
        choiceO.on("click", loadBoard); 

        //Event Handler
        function loadBoard(){
            choiceX.off();
            choiceO.off();
            player = $(this).text();
            choiceUl.fadeOut("1000", function(){
                $(this).remove();
                $pg.addClass("playground2").removeClass("playground1");
            });
            for(var i = 0; i < 9; i++)
                jQuery("<div/>", {class:"field f" + i + ""}).appendTo($pg);
            callback();            
        }
    };

    var play = function(){
    //Playing Stage           
        //board filed values
        var fieldArr = ["", "", "", "", "", "", "", "", ""];

        //Cache DOM
        var $fields = $pg.find("div");

        //Determing Ai player
        var AiPlayer = "";
        if(player == "X")
            AiPlayer = "O";
        else if(player == "O"){
            AiPlayer = "X";
            AiRandomMove();
        }

        //Bind events
        $fields.on("click", tick);

        //Event Handlers
        function tick(){
            var fieldClass = $(this).attr("class");
            var fieldId = fieldClass.slice(fieldClass.length-1);
            if(fieldArr[fieldId] == ""){
                fieldArr[fieldId] = (player);
                render();
                if(isOver()){
                    return;
                }
                    
                AiRandomMove();
            }
        } 

        //render DOM
        function render(){
            for(var i = 0; i < $fields.length; i++){
                if(fieldArr[i] != "")
                    $fields[i].innerHTML = fieldArr[i];
            }
        }
        //AI
        function AiRandomMove(){
            var freeSpots = findFreeSpots(fieldArr);
            var rand = freeSpots[Math.floor(Math.random() * freeSpots.length)];//random free value
            fieldArr[rand] = AiPlayer;
            render();
            if(isOver()){
                return;
            }
                
        }
        
        //Helper function, getting free spots at Board
        function findFreeSpots(arr){
            var freeSpots = [];
            for(var i=0; i<arr.length; i++)
                if(arr[i] == "")
                    freeSpots.push(i);
            return freeSpots;
        }

        //checks if there's a winner
        function isOver(){
            var firstRow = fieldArr.slice(0, -6);
            var secondRow = fieldArr.slice(3).slice(0, -3);
            var thirdRow = fieldArr.slice(6);

            var firstColumn = fieldArr.map(function(element, index){
                if(index % 3 == 0)
                    return element;
            }).filter(function(element){
                if(element !== undefined)
                    return true;
            });

            var secondColumn = fieldArr.map(function(element, index){
                if(index % 3 == 1)
                    return element;
            }).filter(function(element){
                if(element !== undefined)
                    return true;
            });

            var thirdColumn = fieldArr.map(function(element, index){
                if(index % 3 == 2)
                    return element;
            }).filter(function(element){
                if(element !== undefined)
                    return true;
            });

            var leftDiagonal = fieldArr.map(function(element, index){
                if(index % 4 == 0)
                    return element;
            }).filter(function(element){
                if(element !== undefined)
                    return true;
            });

            var rightDiagonal = fieldArr.map(function(element, index){
                if(index  == 2)
                    return element;
                if(index  == 4)
                    return element;
                if(index  == 6)
                    return element;
            }).filter(function(element){
                if(element !== undefined)
                    return true;
            });

            var winningComboes = [];
            winningComboes.push(firstRow);
            winningComboes.push(secondRow);
            winningComboes.push(thirdRow);
            winningComboes.push(firstColumn);
            winningComboes.push(secondColumn);
            winningComboes.push(thirdColumn);
            winningComboes.push(leftDiagonal);
            winningComboes.push(rightDiagonal);

            var playerWin = [player, player, player];
            var AiWin = [AiPlayer, AiPlayer, AiPlayer];

            for(var i = 0; i < winningComboes.length; i++){
                if(arraysEqual(winningComboes[i], playerWin)){
                    resultPlayer++;
                    stop(1);
                    setTimeout(reset, 4000);    
                    return true;
                }
                    
                else if(arraysEqual(winningComboes[i], AiWin)){
                    resultAi++;
                    stop(2);
                    setTimeout(reset, 4000);
                    return true;
                }
                
                else if($fields.text().length == 9 && i == winningComboes.length-1){
                    stop(3);
                    setTimeout(reset, 4000);
                    return false;
                }
                    
            }

            function arraysEqual(arr1, arr2) {
                if(arr1.length !== arr2.length)
                    return false;
                for(var i = arr1.length; i--;) {
                    if(arr1[i] !== arr2[i])
                        return false;
                }

                return true;
            }

        }
        //stop game
        function stop(winner){
            if(winner == 1){
                $fields.addClass("endGame1");
                $(".info").text("You win!");
            }
                
            else if(winner == 2){
                $fields.addClass("endGame2");
                $(".info").text("Ai wins!");
            }
            else if(winner == 3){
                $fields.addClass("endGame3");
                $(".info").text("Draw!");
            }
            $fields.off();

            $(".count").text(resultPlayer + ":" + resultAi);

        }
        
        //reset game
        function reset(){
            $fields.text("");
            $(".info").text("Tick tac toe");
            fieldArr = ["", "", "", "", "", "", "", "", ""];
            $fields.removeClass("endGame1").removeClass("endGame2").removeClass("endGame3");
            $fields.on("click", tick);
        }
    };

    choose(play);
 
})();
