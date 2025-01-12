# Rate My Professor USF - Chrome-Extension

Professor Rating Chrome Extension
This Chrome extension allows students to view professor ratings from Rate My Professors directly on the course catalog page of the University of San Francisco (USF). It appends a div next to each professor's name containing the rating and a link to the Rate My Professors profile.

Features
Extracts professor names from the USF course catalog page.
Removes unwanted text (e.g., '(P)' for lecturers).
Appends a div next to each professor's name, which will contain the professor's rating and a link to their Rate My Professors profile.
Ratings are color-coded based on the professor's rating:
Green for ratings 4.0 and above.
Yellow for ratings between 3.0 and 4.0.
Red for ratings below 3.0.
The extension fetches ratings from a backend server and dynamically updates the ratings on the page.
Installation
To install and use the extension locally:

Clone or download the repository to your local machine.
Open Chrome and go to chrome://extensions/.
Enable Developer mode by toggling the switch in the top right.
Click Load unpacked and select the directory where the extension's source code is stored.
The extension will now be installed and active in your Chrome browser.
How It Works
Extracting Professor Data: The extension collects professor names from the USF course catalog page and removes unnecessary information (like (P) for lecturers).

Backend Integration: The list of professor names is sent to a backend server, which returns the professor's rating and link to their Rate My Professors page.

Updating the DOM: For each professor, a div is created next to their name. The rating is displayed inside this div, and the background color of the div is updated based on the rating.

Dynamic Updates: The extension dynamically updates the professor's rating and link after fetching the data from the backend server.

Backend Integration
The extension communicates with a backend server running at http://localhost:8000/get-professors. The server should accept a list of professor names and return an array of professor objects, each containing:

name (string)
rating (number)
link (string)
