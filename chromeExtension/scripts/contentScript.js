

/* This script is injected by chrome to the usf page and it will collect the professor names by targetting a specific table with specific tags which only professor names have. When we get these
tags we will extract the professor names and create a div element for each professor name to hold the rating. We create a map to match the professors to each of their respective divs.
We will then send the professor names to the backend to get the ratings and then we will append the ratings to the div elements we created earlier. The ratings will be displayed as a link to 
the RMP page of the professor. The div elements will have a background color based on the rating of the professor. If the rating is greater than or equal to 4.0 then the background color will 
be green, if the rating is greater than or equal to 3.0 then the background color will be orange and if the rating is less than 3.0 then the background color will be red.
*/



// This map will hold each professors name as a key and an array of divs associated with the professor as the value. These divs will be used to display the rating of the professor
const nameToID = new Map();// Of the form {professorName: [divID1, divID2, ...]}
let idCounter = 0;// Counter for unique IDs


// Select all <td> elements with the class `dddefault`
const professorTDs = Array.from(document.querySelectorAll('tbody td.dddefault'));

// Filter for <td> elements containing an `<abbr>` tag which are the ones with the professor names
const professorNameElements = professorTDs.filter(td => {
    const abbr = td.querySelector('abbr')

    return abbr && abbr.getAttribute('title') !== 'To Be Announced';//we only want the td tags that have an abbr tag with a title attribute that is not 'To Be Announced' because those are the TBA professors

});

/****************************Extracting portion*********************************/

// Extract the text content (professor names)
const professorNames = professorNameElements.map(td => {
    let name = td.textContent.trim()//remove leading and trailing whitespace
    name = name.slice(0, -3).trim(); // Remove the last 3 characters and trim whitespace which USF adds to the end of the name to signify the professor is a lecturer or similar
    td.style.width = '10%';// Set the width of the td to 50% to make space for the rating div
    if(!name){// If the name is empty then return
        return null;
    }

    // Create a div element to hold the rating
    const ratingDiv = document.createElement('div');
    ratingDiv.id = idCounter; // Set the id of the div to the length of the professorNames array
    idCounter++; // Increment the id counter
    ratingDiv.style.display = 'inline-block'; // Add some margin to the left of the div
    ratingDiv.style.marginLeft = '8px'; // Add some margin to the left of the div
    ratingDiv.style.paddingLeft = '5px'; // Add some padding to the div
    ratingDiv.style.paddingRight = '5px'; // Add some padding to the div
    ratingDiv.style.borderRadius = '5px'; // Add some border radius to the div
    td.appendChild(ratingDiv); // Append the div to the professor name element


    // Map the professor name to the div id but first check if the name is already in the map, if not then we create an empty array for the name then at the end the div will be appended
    if(!nameToID.has(name)){
        nameToID.set(name, []);
    }
    nameToID.get(name).push(ratingDiv.id);// Append the div id to the array for the professor name

    return name;

})
    .filter(name => name !== null); // Filter out any null values (empty names) from the array


/****************************Fetching portion*********************************/
// Send the professor names to the backend to get the ratings
fetch('http://localhost:8000//get-professors', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({professorNames})
})
.then(response => response.json())
.then(data => {// Data is received in the format of an array with professor objects of which each object has a name, a rating and link to RMP
    console.log(data);
    data.forEach(professor => {// Iterate through each professor object
        if(Object.entries(professor).length === 0){
            return;
        }
        let divs = nameToID.get(professor.name);// Get the divs associated with the professor name
        divs.forEach(divID =>{
            const div = document.getElementById(divID);// Get the div element
            const linkTag = document.createElement('a');// Create an anchor tag to link to the RMP page
            linkTag.href = professor.link;// Set the href attribute to the RMP link
            linkTag.textContent = professor.rating;// Set the text content of the anchor tag to the rating 
            linkTag.target = '_blank';// Open the link in a new tab
            linkTag.style.textDecoration = 'none';// Remove the underline from the link
            linkTag.style.color = 'inherit';// Set the color of the link to the default color

            if(professor.rating >= 4.0){// If the rating is greater than or equal to 4.0 then set the color to green
                div.style.backgroundColor = '#7FF6C3';
            }
            else if(professor.rating >= 3.0){// If the rating is greater than or equal to 3.0 then set the color to orange
                div.style.backgroundColor = '#FFF170';
            }
            else{// If the rating is less than 3.0 then set the color to red
                div.style.backgroundColor = '#FF9C9C';
            }
            
            div.appendChild(linkTag);// Append the anchor tag to the div
        });
    });
});



