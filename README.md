# Snake AI 🐍

The best snake ai algorithm you will ever see in your life.
the snake will cover the entire space like a madman until there are no apples left.

## How the Snake AI Works

### Core Logic

1. **Direction Alternation**:
   - The snake alternates between turning left or right based on its current position. The direction is determined by the parity of `(x + y) % 2`, where `x` and `y` are the head's coordinates.
   - If the parity is `0`, the snake prioritizes a left turn (`(dir + 3) % 4`).
   - If the parity is `1`, it prioritizes a right turn (`(dir + 5) % 4`).
   - This ensures that there is always a direct way from the snakes head to its tail, and when enough apples are collected, this will automatically determine an epicycle for the entire board.

2. **Safety and Apple Proximity Checks**:
   - For both the prioritized turn direction (`dir_0`) and the straight direction (`dir_1`), the AI evaluates:
     - **Collision Avoidance**: Checks if moving in the direction would hit the snake's body or the grid boundaries.
     - **Apple Proximity**: Determines if the direction brings the snake closer to the apple (using Manhattan distance).

3. **Decision Making**:
   - Each direction is assigned a score:
     - `0`: Unsafe (collision or out-of-bounds).
     - `1`: Safe but not closer to the apple.
     - `2`: Safe and closer to the apple.
   - The AI selects the direction with the higher score. If scores are equal, it defaults to the straight direction (`dir_1`).

### Winning Strategy
- The snake fills the grid systematically by alternating turns, ensuring no space is left unvisited.
- By prioritizing safety first and apple proximity second, the AI avoids traps and dead-ends.
- The apple respawns in a valid empty space, guaranteeing the snake can always reach it until the grid is fully occupied.

## Requirements
- Modern web browser (Chrome, Firefox, Edge).
- jQuery (included in the project files).

## How to Run
- just click on the file, you can do it.