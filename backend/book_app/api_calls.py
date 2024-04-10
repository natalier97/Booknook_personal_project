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
      'img_url': None, 
      'isbn' : None,
}

def is_duplicate_isbn(book_info, book_array):
     ## returns true if at least 1 elem of array evaluates to truthy
     return any(book_info['isbn'] == book['isbn'] for book in book_array)


def remove_html_tags(text):
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text)

def fetch_book_from_google_books_api(book_title_or_author):
        api_key = env.get("GOOGLE_API_KEY")
        auth = (api_key, '')
        endpoint = f"https://www.googleapis.com/books/v1/volumes?q={book_title_or_author}&maxResults=5"
        
        initial_response = requests.get(endpoint, auth=auth)
        if initial_response == None:
             return None
        

        json_response = initial_response.json()

        first_five_books = []

        if json_response.get("items"):
            for item in json_response.get("items"):
                book_info = {
                            'title': None,
                            'author': None,
                            'description': None,
                            'api_rating': None,
                            'page_count': None,
                            'genre': [],
                            'img_url': None, 
                            'isbn' : None,
                        }
                # json_info = json_response.get("items")[item#]['volumeInfo']
                json_info = item.get("volumeInfo")
            
                book_info['title'] = json_info.get('title')
                book_info['author'] = json_info.get('authors')[0] if json_info.get('authors') else None
                # book_info['description'] = json_info.get('description')
                book_info['page_count'] = json_info.get('pageCount')
                book_info['api_rating'] = json_info.get('averageRating')


                ###---------------------------EDGE CASES---------------------------------------------------
                ##isbn 10 or 13
                industry_identifiers = json_info['industryIdentifiers']
                for identifier in industry_identifiers:
                    if identifier["type"] == "ISBN_13":
                        book_info['isbn'] = identifier["identifier"]
                        break

                # ###more than one author, up to 3
                # for author in json_info.get('authors'):
                #     book_info['author'] += author
                #     if len(book_info['author']) == 3:
                #          break


                ##api_rating missing
                if book_info['api_rating'] is None:
                    next_item = json_response.get("items")[1]
                    if next_item:
                        next_json_info = next_item.get("volumeInfo")
                        book_info['api_rating'] = next_json_info.get('averageRating')



                #-----------------------using self Link to get more detailed information
                ## json_info = json_response.get("items")[item#]['volumeInfo']
                self_link_endpoint = item.get('selfLink')
                self_link_response = requests.get(self_link_endpoint)
                json_self_link_response = self_link_response.json()
                self_link_info = json_self_link_response['volumeInfo']

                #img_info
                img_info = self_link_info.get('imageLinks') ##has following options {'smallThumbnail', 'thumbnail','small', 'medium', 'large'}
                book_info['img_url'] = img_info.get('small')

                if book_info['img_url'] is None:
                    book_info['img_url'] = json_info.get('imageLinks')['thumbnail']


                ###multiple genres
                categories = [self_link_info.get('categories')]
                if categories:
                    i = 0
                    for i in range(min((len(categories)), 4)):
                        book_info['genre'] += categories[i]
        
                ### getting & cleaning description 
                dirty_description = self_link_info.get('description')
                clean_description = remove_html_tags(dirty_description)
                book_info['description'] = clean_description

                if not is_duplicate_isbn(book_info, first_five_books):
                    first_five_books.append(book_info)
                # first_five_books.append(book_info)

            return first_five_books
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




##------------------------------------------------------------

        # if json_response.get("items"):
        #     for item in json_response.get("items"):
                 
        #         # json_info = json_response.get("items")[0]['volumeInfo']
        #         json_info = item.get("volumeInfo")
              
        #     book_info['title'] = json_info.get('title')
        #     book_info['author'] = json_info.get('authors')[0]
        #     # book_info['description'] = json_info.get('description')
        #     book_info['page_count'] = json_info.get('pageCount')
        #     book_info['api_rating'] = json_info.get('averageRating')

        #     ###---------------------------EDGE CASES---------------------------------------------------
        #     ##isbn 10 or 13
        #     industry_identifiers = json_info['industryIdentifiers']
        #     for identifier in industry_identifiers:
        #          if identifier["type"] == "ISBN_13":
        #               book_info['isbn'] = identifier["identifier"]
        #               break

            
        #     ##api_rating missing
        #     if book_info['api_rating'] == None:
        #         book_info['api_rating'] = json_response.get("items")[1]['volumeInfo'].get('averageRating')

        #     ##multiple genres
        #     categories = [json_info.get('categories')]
        #     if categories:
        #         i = 0
        #         for i in range(min(len(categories), 4)):
        #             book_info['genre'] += categories[i]

        #     ##img_url
        #     img_endpoint = json_response.get("items")[0].get('selfLink')
        #     self_link_response = requests.get(img_endpoint)
        #     json_self_link_response = self_link_response.json()
        #     self_link_info = json_self_link_response['volumeInfo']

        #     # print("JSON image LINKS", json_self_link_response['volumeInfo'].get('imageLinks'))

        #     img_info = self_link_info.get('imageLinks') ##has following options {'smallThumbnail', 'thumbnail','small', 'medium', 'large'}
        #     book_info['img_url'] = img_info.get('small')

        #     # book_info['isbn'] = self_link_info.get('industryIndentifiers')[0].get("identifier")

        #     ###description cleaning
        #     dirty_description = self_link_info.get('description')
        #     clean_description = remove_html_tags(dirty_description)
        #     book_info['description'] = clean_description

        #     return book_info
        # print(f"ERROR {json_response}")
        # return None

