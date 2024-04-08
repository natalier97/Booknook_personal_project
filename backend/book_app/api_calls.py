from BookNooKProj.settings import env
import requests
from rest_framework.status import HTTP_404_NOT_FOUND
import re

##TODO - add more than 1 author for a book? 

book_info = {
      'title': None,
      'author': None,
      'description': None,
      'api_rating': None,
      'page_count': None,
      'genre': [],
      'img_url': None
}

def remove_html_tags(text):
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text)

def fetch_book_from_google_books_api(book_title_or_author):
        api_key = env.get("GOOGLE_API_KEY")
        auth = (api_key, '')
        endpoint = f"https://www.googleapis.com/books/v1/volumes?q={book_title_or_author}&maxResults=5"
        
        initial_response = requests.get(endpoint, auth=auth)
        print(initial_response)
        if initial_response == None:
             return None
        json_response = initial_response.json()


        if json_response.get("items"):
            json_info = json_response.get("items")[0]['volumeInfo']
              
            book_info['title'] = json_info.get('title')
            book_info['author'] = json_info.get('authors')[0]
            # book_info['description'] = json_info.get('description')
            book_info['page_count'] = json_info.get('pageCount')
            book_info['api_rating'] = json_info.get('averageRating')

            ###---------------------------EDGE CASES---------------------------------------------------
            ##api_rating missing
            if book_info['api_rating'] == None:
                book_info['api_rating'] = json_response.get("items")[1]['volumeInfo'].get('averageRating')

            ##multiple genres
            categories = [json_info.get('categories')]
            if categories:
                i = 0
                for i in range(min(len(categories), 4)):
                    book_info['genre'] += categories[i]

            ##img_url
            img_endpoint = json_response.get("items")[0].get('selfLink')
            self_link_response = requests.get(img_endpoint)
            json_self_link_response = self_link_response.json()
            self_link_info = json_self_link_response['volumeInfo']

            # print("JSON image LINKS", json_self_link_response['volumeInfo'].get('imageLinks'))

            img_info = self_link_info.get('imageLinks') ##has following options {'smallThumbnail', 'thumbnail','small', 'medium', 'large'}
            book_info['img_url'] = img_info.get('small')


            ###description cleaning
            dirty_description = self_link_info.get('description')
            clean_description = remove_html_tags(dirty_description)
            book_info['description'] = clean_description

            return book_info
        print(f"ERROR {json_response}")
        return None


        # if json_response.get("items"):
        #     return (json_response.get("items")[0]['volumeInfo']['imageLinks'].get('thumbnail'))
        #     # return Response([json_response.get("items")[x]['volumeInfo']['title'] for x in range(3)] )
        # print(f"ERROR {json_response}")
        # return None
    
    ##if putting in book name & json_response.get("items"):
        ##information -- json_response.get("items")[0]['volumeInfo'] --> 'title', [authors], 'description', 'averageRating', 'pageCount', [categories], imageLinks{'smallThumbnail', "thumbnail"}
            #-- json_response.get("items")[0] ---> "kind": 'books#volume', 

        #if items[0]['volumeInfo'] doesnt have certain info, try items[1][volumeInfo]

        #.get("items")[0]['selfLink'] ---> has more images

