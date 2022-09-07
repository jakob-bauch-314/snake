

console.log("hello  (:");

$(document).ready(function(){

    var dir = 2;


    document.onkeydown = function(e){
        if (
            e.keyCode <=40 &&
            e.keyCode >= 37 &&
            !(e.keyCode == 37 && dir == 2) &&
            !(e.keyCode == 39 && dir == 0) &&
            !(e.keyCode == 38 && dir == 3) &&
            !(e.keyCode == 40 && dir == 1)
        ) dir = e.keyCode - 37;
    }

    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = 512;
    canvas.width = 512;

    const size_x = 16;
    const size_y = 16;

    const cell_width = 32;
    const cell_height = 32;

    const line_width = 24;

    snake = [];
    for (var x = 0; x < size_x; x++){
        for (var y = 0; y < size_y; y++){
            snake[x + y * size_y] = [x, y]
        }
    }
    var head_index = 3;
    var tail_index = 6;

    var apple_x = 7;
    var apple_y = 5;

    alive = true;

    requestAnimationFrame(function Update(){

        var x = parseInt(snake[head_index][0]); //update snake
        var y = parseInt(snake[head_index][1]);

        head_index++;
        if (head_index == snake.length){head_index = 0;}
        
        switch(dir){
            case 0:
                x--;
                break;
            case 1:
                y--;
                break;
            case 2:
                x++;
                break;
            case 3:
                y++;
                break;
        }

        if (x == apple_x && y == apple_y){
            var invalid_apple = true;  // update apple
            while(invalid_apple){
                apple_x = Math.floor(Math.random() * size_x);
                apple_y = Math.floor(Math.random() * size_y);
                var invalid_apple = false;
                for(segment of snake){
                    if (segment[0] == apple_x && segment[1] == apple_y) invalid_apple = true;
                }
            }

            snake.splice(head_index, 0, [x, y]);
        } else {
            snake[head_index]=[x, y];
        }

        for (var i = 0; i < snake.length; i++){
            if (i != head_index){
                var segment = snake[i];
                if (segment[0] == x && segment[1] == y) alive = false;
            }
        }

        if (x < 0 || x >= size_x || y < 0 || y >= size_y){
            alive = false;
        }


        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas

        if (alive) ctx.strokeStyle = "red"; //draw snake
        else ctx.strokeStyle = "orange";

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = line_width;
        ctx.beginPath();
        ctx.moveTo((snake[tail_index][0] + 0.5) * cell_width, (snake[tail_index][1] + 0.5) * cell_height);
        for (
            var i = tail_index;i <= head_index + 1;i++){
            if (i == size_x * size_y) i = 0;
            ctx.lineTo((snake[i][0] + 0.5) * cell_width, (snake[i][1] + 0.5) * cell_height);
        }

        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = "green"; //draw apple

        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc((apple_x + 0.5) * cell_width, (apple_y + 0.5) * cell_height, line_width/2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();



        if (alive) setTimeout(()=>requestAnimationFrame(Update), 3);

        // AI

        var tile = (x + y) % 2;
        if (dir == 1 || dir == 3) tile = 1 - tile;

        if (tile == 0) dir_0 = (dir + 3)%4;
        else dir_0 = (dir + 5)%4;
        dir_1 = dir;

        // check dir_0

        var x = snake[head_index][0];
        var y = snake[head_index][1];

        switch(dir_0){
            case 0:
                x--;
                break;
            case 1:
                y--;
                break;
            case 2:
                x++;
                break;
            case 3:
                y++;
                break;
        }

        var check_0 = 1;

        if ( // check if apple would be nearer
            Math.abs(x - apple_x) < Math.abs(snake[head_index][0] - apple_x) ||
            Math.abs(y - apple_y) < Math.abs(snake[head_index][1] - apple_y)
            ) check_0 = 2;


        for (var segment of snake){ // check would be dead
            if (segment[0] == x && segment[1] == y) check_0 = 0;
        }
        if (x < 0 || x >= size_x || y < 0 || y >= size_y){
            check_0 = 0;
        }

        // check dir_1

        var x = snake[head_index][0];
        var y = snake[head_index][1];

        switch(dir_1){
            case 0:
                x--;
                break;
            case 1:
                y--;
                break;
            case 2:
                x++;
                break;
            case 3:
                y++;
                break;
        }

        var check_1 = 1;

        if ( // check if apple would be nearer
            Math.abs(x - apple_x) < Math.abs(snake[head_index][0] - apple_x) ||
            Math.abs(y - apple_y) < Math.abs(snake[head_index][1] - apple_y)
            ) check_1 = 2;


        for (var segment of snake){ // check would be dead
            if (segment[0] == x && segment[1] == y) check_1 = 0;
        }
        if (x < 0 || x >= size_x || y < 0 || y >= size_y){
            check_1 = 0;
        }

        if (check_1 < check_0) dir = dir_0
        else dir = dir_1
    });
})