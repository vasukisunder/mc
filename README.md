# Dante Project

## Google Maps API Setup

The project uses Google Maps Street View API for the interactive map experience.

1. **Get a Google Maps API Key**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Navigate to "APIs & Services" > "Library"
   - Search for and enable the following APIs:
     * Maps JavaScript API
     * Street View Static API
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your new API key

2. **Replace the API Key in the Code**:
   - Open `09.html` in your code editor
   - Find the script tag that loads the Google Maps API:
     ```html
     <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
     ```
   - Replace `YOUR_API_KEY` with the API key you copied
   - Save the file

Note: The Google Maps API has usage limits and may require billing information to be set up. 

## Google Form Setup

The project uses a custom Google Form for the form experience. 

1. **Create a New Google Form**:
   - Go to [Google Forms](https://forms.google.com)

2. **Create Sectioned Questions**:
   - Click the "+" button to add a new section
   - For each question you want on its own screen:
     * Click "Add section" (the two rectangles icon)
     * Add your question in the new section
     * Set the question type (text, multiple choice, etc.)
     * Customize the question settings as needed
   - Repeat for each question you want on a separate screen

3. **Get the Form Embed Code**:
   - Click the "Send" button in the top right
   - Click the "<>" (embed) tab
   - Copy the provided iframe code

4. **Replace the Form in the Code**:
   - Open `14.html` in your code editor
   - Find the iframe element:
     ```html
     <iframe src="YOUR_FORM_URL" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
     ```
   - Replace `YOUR_FORM_URL` with your form's embed URL
   - Save the file

Note: Make sure your form's sharing settings are set to "Anyone with the link can respond" for it to work properly when embedded.

## Project Structure

### Main Components
- `index.html`: Main landing page with links to all experiences
- `inventory.js`: Manages the collection system for keywords and items
- `inventory.css`: Styles for the collection panel
- `styles.css`: Global styles for the project

### Interactive Experiences

1. **Grid & Video Experience** (`01.html`)
   - CSS Grid implementation with dynamic cell sizing
   - Video manipulation using Canvas API for blur and scramble effects
   - Intersection Observer for lazy loading video elements

2. **Meandering Path** (`02.html`)
   - SVG path generation with Bezier curves
   - Text excavation using DOM manipulation and CSS transforms
   - Event delegation for path interaction

3. **Masonry Grid** (`03.html`)
   - Custom masonry layout using CSS Grid and JavaScript
   - Video/text toggle with state management
   - Dynamic text generation using template literals

4. **Draggable Popups** (`04.html`)
   - Custom drag implementation using MouseEvents
   - Z-index management for window stacking
   - Event propagation control for nested interactions

5. **Browser Popups** (`05.html`)
   - Window.open() API implementation
   - Popup sequence using Promise-based timing
   - Cross-window communication using postMessage

6. **Fading Popups** (`06.html`)
   - CSS animation system with keyframes
   - Queue-based popup management
   - Intersection Observer for trigger points

7. **Hidden Verses** (`07.html`)
   - Text scrambling using character manipulation
   - CSS transform matrix for text effects
   - Event-based verse reveal system

8. **Space Tunnel** (`08.html`)
   - CSS transform3d for perspective effects
   - Scroll event throttling for performance
   - Parallax calculation using scroll position

9. **Interactive Map** (`09.html`)
   - SVG coordinate system implementation
   - Path finding algorithm for navigation
   - Event handling for map interactions

10. **Twitter Feed** (`10.html`)
    - Infinite scroll implementation
    - Dynamic content loading with Intersection Observer
    - Feed state management

11. **CAPTCHA** (`11.html`)
    - Image Flip CAPTCHA: Grid of 9 squares that flip between two images when clicked
    - Elevation Path CAPTCHA: Drag and drop interface to arrange items by elevation
    - Verification States:
      * Image Flip: Select the 5 squares that should be flipped (marked with data-light="true")
      * Elevation Path: Arrange items in ascending order (1 → 2 → 3)
    - Unlocks keyword "ascension" when both CAPTCHAs are completed

12. **ASCII Gravity** (`12.html`)
    - Physics engine implementation
    - Character-based rendering system
    - Collision detection algorithm
    - (Secret word is set to "wave")

13. **Unfold** (`13.html`)
    - CSS transform origin manipulation
    - Animation timing system
    - State management for fold/unfold

14. **Google Form** (`14.html`)
    - Google Forms API integration
    - Form state management
    - Custom form validation

15. **Native Form** (`15.html`)
    - HTML5 form validation
    - Custom form control styling
    - Form submission handling

16. **Circle Tunnel** (`16.html`)
    - Canvas-based circular rendering
    - Animation frame management
    - Perspective calculation

## Collection System
The project includes a persistent collection system that allows users to:
- Collect keywords and items throughout the experiences
- View collected items in a collapsible panel
- Clear collection data
- Persist collection data between sessions

Each experience can be accessed independently through the main index page, and the collection system works across all pages. 