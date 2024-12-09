import init, {World} from "snake_game";

init().then(_ => {
    const CELL_SIZE = 10;
    const world = World.new();
    console.log("{}", world.get_width())
    const worldWidth = world.get_width();
    const canvas = document.getElementById("snake-canvas");
    const ctx = canvas.getContext("2d")
    canvas.height = worldWidth * CELL_SIZE;
    canvas.width = worldWidth * CELL_SIZE;

    function drawWorld() {
        ctx.beginPath();
        for (let column = 0; column < worldWidth + 1; column++) {
            ctx.moveTo(CELL_SIZE * column, 0);
            ctx.lineTo(CELL_SIZE * column, worldWidth * CELL_SIZE);

        }
        for (let row = 0; row < worldWidth + 1; row++) {
            ctx.moveTo(0, CELL_SIZE * row);
            ctx.lineTo(worldWidth * CELL_SIZE, CELL_SIZE * row);

        }
        ctx.stroke();
    }

    function drawSnake() {
        const snakeIdx = world.snake_head_idx();
        const col = snakeIdx % worldWidth;
        const row = Math.floor(snakeIdx / worldWidth);
        ctx.beginPath();
        ctx.fillRect(
            col * CELL_SIZE,
            row * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
        ctx.stroke();


    }

    function paint() {
        drawWorld();
        drawSnake();
    }

    function update() {
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            world.update();
            paint();
            requestAnimationFrame(update);
        }, 100)
    }

    paint();
    update();
})