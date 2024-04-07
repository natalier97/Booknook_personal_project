from BookNooKProj.settings import env
import requests
from rest_framework.status import HTTP_404_NOT_FOUND






def fetch_book_from_google_books_api(book_title_or_author):
        api_key = env.get("GOOGLE_API_KEY")
        auth = (api_key, '')
        endpoint = f"https://www.googleapis.com/books/v1/volumes?q={book_title_or_author}&maxResults=5"
    
        response = requests.get(endpoint, auth=auth)
        json_response = response.json()
        
        if json_response.get("items"):
            return (json_response.get("items")[0]['volumeInfo'].get('description'))
            # return Response([json_response.get("items")[x]['volumeInfo']['title'] for x in range(3)] )
        print(f"ERROR {json_response}")
        return None
    
    ##if putting in book name & json_response.get("items"):
        ##information -- json_response.get("items")[0]['volumeInfo'] --> 'title', [authors], 'description', 'averageRating', 'pageCount', [categories], imageLinks{'smallThumbnail', "thumbnail"}
            #-- json_response.get("items")[0] ---> "kind": 'books#volume', 
        #if items[0]['volumeInfo'] doesnt have certain info, try items[1][volumeInfo]

        #.get("items")[0]['selfLink'] ---> has more images
