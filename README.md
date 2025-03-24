# Snake AI Project 🐍

This project features an AI-controlled snake that can navigate the game grid efficiently and win every time by systematically covering the entire space without collisions. Below is an explanation of how the AI logic works.

## How the Snake AI Works

### Core Logic
The AI uses a deterministic algorithm that combines **path safety checks** and **apple proximity optimization** to ensure the snake never collides with itself or the walls while moving toward the apple. Here's the breakdown:

1. **Direction Alternation**:
   - The snake alternates between turning left or right based on its current position. The direction is determined by the parity of `(x + y) % 2`, where `x` and `y` are the head's coordinates.
   - If the parity is `0`, the snake prioritizes a left turn (`(dir + 3) % 4`).
   - If the parity is `1`, it prioritizes a right turn (`(dir + 5) % 4`).

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