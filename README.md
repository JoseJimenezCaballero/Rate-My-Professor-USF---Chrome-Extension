# Rate My Professor USF - Chrome-Extension

This Chrome extension allows students to view professor ratings from Rate My Professors directly on the course catalog page of the University of South Florida (USF). It appends a div next to each professor's name containing the rating and a link to the Rate My Professors profile.

## Features

- Extracts professor names from the USF course catalog page.
- Removes unwanted text (e.g., '(P)' for lecturers).
- Appends a `div` next to each professor's name, which will contain the professor's rating and a link to their Rate My Professors profile.
- Ratings are color-coded based on the professor's rating:
  - **Green** for ratings 4.0 and above.
  - **Yellow** for ratings between 3.0 and 4.0.
  - **Red** for ratings below 3.0.
- The extension fetches ratings from a backend server and dynamically updates the ratings on the page.

## Installation

To install and use the extension locally:

1. Clone or download the repository to your local machine.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** by toggling the switch in the top right.
4. Click **Load unpacked** and select the directory where the extension's source code is stored.
5. The extension will now be installed and active in your Chrome browser.

## How It Works

1. **Extracting Professor Data**:
   The extension collects professor names from the USF course catalog page and removes unnecessary information (like `(P)` for lecturers).
   
2. **Backend Integration**:
   The list of professor names is sent to a backend server, which returns the professor's rating and link to their Rate My Professors page.

3. **Updating the DOM**:
   For each professor, a `div` is created next to their name. The rating is displayed inside this `div`, and the background color of the `div` is updated based on the rating.

4. **Dynamic Updates**:
   The extension dynamically updates the professor's rating and link after fetching the data from the backend server.

## Backend Integration

The extension communicates with a backend server running at `http://localhost:8000/get-professors`. The server should accept a list of professor names and return an array of professor objects, each containing:
- `name` (string)
- `rating` (number)
- `link` (string)

### Example Response from Backend:
```json
[
  {
    "name": "Dr. John Doe",
    "rating": 4.5,
    "link": "https://www.ratemyprofessors.com/Professor?name=John-Doe"
  },
  {
    "name": "Dr. Jane Smith",
    "rating": 3.2,
    "link": "https://www.ratemyprofessors.com/Professor?name=Jane-Smith"
  }
]
