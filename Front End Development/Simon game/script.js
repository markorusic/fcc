var simonGame = (function(){
    const sec = 1000;
    const win = 20;
    var isGameRunning = false;
    var strictMode = false;
    var count = 0;
    var audio = document.createElement("audio");

    //cache DOM
    var $wrapper = $(".wrapper");
    var $game = $wrapper.find(".game");
    var $control = $game.find(".control");

    var $btnBoxes = $game.find(".btnBox");
    var $count = $control.find(".count");
    var $buttonStart = $control.find(".start");
    var $buttonStrict = $control.find(".strict");
    var $buttonRestart = $control.find(".restart").hide();

    //Bind events
    $buttonStart.on("click", startNewGame);
    $buttonStrict.on("click", enableStrictMode);   
    
    //Event handlers
    
    function startNewGame(){
        
        $buttonRestart.on("click", function(){
            restartGame(sec, renderCount);
        });
        count = 0;
        isGameRunning = !isGameRunning;
        renderCount();

        var ligthHistory = [];
        var userLigthHistory = [];
        var currClick = 0;
        var timeOuts = [];

        if(isGameRunning){
            $buttonStart.html("Stop");
            startGame();
            $buttonRestart.show();            
        }
        else{
            $buttonStart.html("Start");
            (function stopGame(){
                $count.text("--");
                $btnBoxes.off();
                stopAllTimeouts();
                count = 0;
                currClick = 0;
                ligthHistory = [];
                userLigthHistory = [];
                $buttonRestart.hide();                
            })();
        }
        //User click handler
        function userClick(){   
            currClick++;
            var className = $(this).attr("class");
            var index = className.slice(className.length - 1);
            index = parseInt(index);          
            userLigthHistory.push(index);
            userLight(index);
            if(arraysEqual(ligthHistory, userLigthHistory)){                
                setTimeout(function(){
                    lightRememberd(lightRandom);
                }, sec*2);
                userLigthHistory = [];
                currClick = 0;
                count++;
                renderCount();                  
                if(count == win){                    
                    restartGame(sec*5, renderWin);
                    return false;
                } 
            }
                
            else if(index != ligthHistory[currClick-1] && !arraysEqual(ligthHistory, userLigthHistory)){
                if($buttonStrict.hasClass("active")){                    
                    ligthHistory = [];
                    userLigthHistory = [];
                    currClick = 0;
                    renderStrictError();
                    setTimeout(lightRandom, sec*4);                    
                }
                else{                    
                    setTimeout(lightRememberd, sec*2);                    
                    userLigthHistory = [];
                    currClick = 0;
                    renderError();
                }
            }            
        }
        //lighting functions
        function light(i){
            audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound" + parseInt(i+1) + ".mp3";
            audio.play();
            var $this = $btnBoxes.eq(i);      
            $this.addClass("active");
            setTimeout(function(){
                $this.removeClass("active");
            },  500);             
        }

        function userLight(i){
            audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound" + parseInt(i+1) + ".mp3";
            audio.play();
            var $this = $btnBoxes.eq(i);      
            $this.addClass("activeUser");
            setTimeout(function(){
                $this.removeClass("activeUser");               
            },  500);                      
        }

        function lightRandom(callback){
            var rand = Math.floor(Math.random() * 4);
            light(rand);
            ligthHistory.push(rand);

            if(typeof callback == "function")
                setTimeout(callback, sec);
        };

        function lightRememberd(callback){            
            ligthHistory.map(function(element, index){
                setTimeout(function(){
                    light(element);
                }, index*sec);                

                if(index == ligthHistory.length-1 && typeof callback == "function")
                    setTimeout(callback, (index+1)*sec);                       
            });
        } 
        function stopTracked(){
            for(var i=0; i<timeOuts.length; i++)
                clearTimeout(timeOuts[i]);
            timeOuts = [];
        }
        function stopAllTimeouts()
        {
            var id = window.setTimeout(null,0);
            while (id--) 
            {
                window.clearTimeout(id);
            }
        }

        //start/restart
        function restartGame(kurcina, callback){
            ligthHistory = [];
            userLigthHistory = [];
            currClick = 0;
            count = 0;            
            stopAllTimeouts();
            renderCount();
            $btnBoxes.off();
            
            callback();
            setTimeout(startGame, kurcina);            
        }
        function startGame(){
            setTimeout(function(){
                lightRandom(function(){
                    $btnBoxes.on("click", userClick);
                });
            }, sec);
        }             
    }

    function enableStrictMode(){
        strictMode = !strictMode;
        if(strictMode)
            $buttonStrict.addClass("active");
        else
           $buttonStrict.removeClass("active");        
    }

    //render
    function renderCount(){
        $count.text(count);
    }
    function renderError(){
        $count.text("Wrong!");
        setTimeout(renderCount, sec);
    }
    function renderStrictError(){
        $count.text("Wrong, game restarts");
        if($buttonStrict.hasClass("active"))
            count = 0;
        setTimeout(renderCount, sec*3);
    }
    function renderWin(){
        $count.text("You won!");
        setTimeout(function(){
            $count.text("New Game");
        }, sec*4);
        setTimeout(renderCount, sec*5);
    }
    //helper function
    function arraysEqual(arr1, arr2) {
        if(arr1.length !== arr2.length)
            return false;
        for(var i = arr1.length; i--;) {
            if(arr1[i] !== arr2[i])
                return false;
        }
        return true;
    }
})();