var calculator = (function(){
    var expression = "";
    var result = "";
    //cache DOM
    var $calc = $(".calc");
    var $display = $calc.find(".display");
    var $buttons = $calc.find(".buttons");

    var $result = $display.find(".result");
    var $expression = $display.find(".expression");

    var $numButtons = $buttons.find(".num");
    var $operButtons = $buttons.find(".operation");
    var $delButtons = $buttons.find(".del");

    var $point = $buttons.find(".point");
    render();
    //bind events
    $numButtons.on("click", addNum);
    $operButtons.on("click", addOperation);
    $delButtons.on("click", del);
    $point.on("click", addNum);

    //event Handlers
    function addNum(){
        expression += $(this).val();
        render();
    };
    function addOperation(){
        if($(this).val() != "="){
            if(isLastCharOperation(expression) == false){
                expression += $(this).val();
                render();
            }
        }
        else{
            result = Math.round(eval(expression) * 100) / 100;
            render();
            if(result != 0)
                expression = result;
            else
                expression = "";
            result = "";
            
        }                
    };
    function isLastCharOperation(string){
        string = string.toString();
        if(string.length == 0)
            return true;
        var lastChar = string.charAt(string.length - 1);
        var opers = ["+", "-", "*", "/"];
        if(opers.indexOf(lastChar) != -1)
            return true;
        return false;
    };
    function del(){
        if($(this).val()=="AC")
            expression = expression.slice(0, -1);
        else{
            result = "";
            expression = "";
        }
        render();
    }

    
    //render DOM
    function render(){
        $expression.text(expression);
        $result.text(result);
    };

})();