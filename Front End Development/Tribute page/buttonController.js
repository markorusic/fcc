var previousClick = "";

function ButtonControler(clickedItemID, textContent){
    clickedItem = $(clickedItemID);
    if(clickedItem.is("button") == true)
    {
        targetItem = jQuery("<p/>", {id:"hehe"}).appendTo("#textDiv");        
        clickedItem.on("click", toggleItem);
        function toggleItem(){
            if(previousClick == clickedItemID){
                $("div.image").hide();
                $("div.image").css("background-image", "url(./images/main.jpg)");
                $("div.image").fadeIn("slow");
                
                targetItem.fadeOut("1000", function(){
                    previousClick = "";
                });
            }
                
            else{
                targetItem.hide();
                targetItem.html(textContent);
                targetItem.fadeIn("1000");
                $("div.image").hide();
                $("div.image").css("background-image", "url(./images/"+ clickedItemID.slice(1) +".jpg)")
                $("div.image").fadeIn("slow");
            }
            previousClick = clickedItemID;
        }
    }
}






