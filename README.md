# Water Jug Problem Solver - Documentation (Front)

This code provides a responsive web-based solution to the water jug problem. Users can input the capacities of two jugs and a target amount of water to measure. The solution steps are calculated through an API, and the steps are displayed visually with animations that simulate the filling, transferring, and emptying of the jugs.

## Live demo 
https://maferrep.github.io/WaterJug.github.io/

## Overview

- HTML Structure: Creates a form for user input and containers for animated jug elements.
- JavaScript Functions: Handles form submission, sends data to the backend, receives solution steps, and updates the UI with animated steps.

### Features

- User Input Form: Accepts jug capacities and the target amount of water to measure.
- API Integration: Sends data to a backend that calculates the solution steps.
- Animated Visualization: Displays each step of the solution with animations.

#### 1. Input Jug Capacities and Target Amount:
- Enter capacities for Jug A ```(x)```, Jug B ```(y)```, and the amount to measure ```(z)```.
- Click the "Solve" button to initiate the process.

#### 2. View Solution:

- The steps to achieve the target amount are displayed below the form.
- Each action is animated with visual effects on the jug elements.

## JavaScript Functions

### 1. ```submit``` Event Listener
 ```document.getElementById('waterJugForm').addEventListener('submit', function(event) { ... }); ```

- Purpose: Handles form submission, preventing default behavior and initiating the solution process.

- Process:
   1. Retrieves the values for ```x, y,``` and ```z``` from the form.
   2. Calls ```resetState()``` to clear previous results and reset the jugs.
   3. Sends a ```POST``` request to the backend API with the input values.
   4. If the response contains steps, it calls displayResult() to show them. Otherwise, it displays an error message.

### 2. ```resetState()```
```function resetState() { ... }```

- Purpose: Resets the jugs and clears any previous solution steps.
- 
- Process:
   1. Resets the water levels in both jugs to zero.
   2. Removes any animation classes from the jugs.
   3. Clears the solution steps displayed on the screen.

### 3. ```updateJug(jugElement, percent)```
```function updateJug(jugElement, percent) { ... }```

- Purpose: Adjusts the water level in a jug based on a percentage.
- Parameters:
    - ```jugElement```: The HTML element representing the jug.
    - ```percent```: The percentage of the jug's capacity that should be filled.
- Process: Creates and updates a ```.water-surface``` element within the jug to visually show the current water level.

### 4. ```displayResult(steps, x, y)```
```function displayResult(steps, x, y) { ... }```

- Purpose: Animates the solution steps in sequence.
- 
- Parameters:
    - ```steps```: An array of actions returned by the API.
    - ```x```: Capacity of Jug A.
    - ```y```: Capacity of Jug B.
    - 
- Process:
   1. Iterates through the steps, displaying each action with a short delay.
   2. For each step, adds appropriate animations (e.g., filling, emptying, transferring) to the jugs.
   3. Updates the water level for each jug based on the current action.

### 5. ```addFallingDrops(jugElement)```
```function addFallingDrops(jugElement) { ... }```

Purpose: Adds a visual effect of falling water drops to a jug, used when filling a jug.

## API Integration

```fetch('https://waterjugbackend-production.up.railway.app/api/v1/waterjug/solve', { ... });```

Request Body: Sends ```x```, ```y```, and ```z``` as JSON data.
Response: Expects a JSON object containing either a ```steps``` array (solution steps) or an error message.
Error Handling: If the API returns an error, the user is informed with a message in red text.

## Dependencies

- Backend API: The solution relies on an external API to calculate the steps for the water jug problem. Ensure that the API is accessible at ```https://waterjugbackend-production.up.railway.app.```

# Styling and Visual Effects

### - Body
  - Centers content and adds a gradient background.
  - Hides overflow to prevent scrollbars.

### - Container
  - Card-like layout with rounded corners, shadow, and a semi-transparent background.
  - Limits width and height for responsiveness; adds scrollbars as needed.
  - Customizes scrollbar appearance.

### - Inputs & Buttons
  - Inputs: Rounded, with subtle shadow and transition effects.
  - Buttons: Gradient background with hover effect, making it interactive.

### - Jugs & Water Effects
  - Layout: Flexbox for responsiveness and spacing between jugs.
  - Jug Style: Solid borders, gradient background, and shadow for a 3D look.
  - Water Level: Dynamic height for simulating fill level.
  - Stream: Used for transferring water with animated opacity and rotation.

### - Wave Footer
  - Fixed at the bottom with a parallax animation for a moving wave effect. SVGs are used at the bottom of the page for decorative wave effects.

### - Responsive Design
The media queries in the provided CSS code are designed to adapt the layout for screens with a width of 768 pixels or less.



