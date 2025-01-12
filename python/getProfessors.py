import requests
from bs4 import BeautifulSoup

# Function to fetch and parse professor data
def getProfessors(query_name):
    # URL to search for the professor specifically with USF as the school {1262}
    url = "https://www.ratemyprofessors.com/search/professors/1262?q=" + query_name
    response = requests.get(url)

    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find all parent <a> tags containing professor information with the specific class they use 
    professor_cards = soup.select('a[class*="TeacherCard__StyledTeacherCard"]')

    # Object to store professor details and return
    professor_object = {}

    # Iterate through all the cards we found and find the one that matches the query 
    for card in professor_cards:
        # Extract professor name
        name_div = card.select_one('div[class^="CardName__StyledCardName"]')
        professor_name = name_div.text.strip()
        
        # Extract first initial and last name
        first_initial, last_name = professor_name[0], professor_name.split()[-1]
        
        # Match the query with the professor's name
        if query_name[0] == first_initial and query_name.split()[-1] == last_name:
            professor_object['name'] = query_name
            
            # Extract the rating
            rating_div = card.select_one('div[class^="CardNumRating__CardNumRatingNumber"]')
            professor_object['rating'] = rating_div.text.strip() if float(rating_div.text.strip()) > 0 else None
            
            # Extract the link (href)
            professor_object['link'] = "https://www.ratemyprofessors.com" + card['href']
            
            break  # Stop after finding the first match

    return professor_object
