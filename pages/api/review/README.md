#### Reviews API

##### Structure of a review object:
```
{
   'id': (String) id of the product,
   'name': (String) name of the product,
   'username': (String) person who left review,
   'country': (String) country of person who left review,
   'rating': (Integer) number of stars person left as review,
   'text': (String) review text,
   'date': (String) date review was left,
   'useful': (Integer) number of other users who found this review useful,
   'useless': (Integer) number of other user who found this review NOT useful,
   'images': [
      // Array of image urls
   ],
}
```

##### GET
- Finds reviews by product id.
- Runs an aggregation to count review ratings
- Returns an array of objects describing counts of reviews and the reviews themselves.
- Sample return value:
```
[
   {_id: 5, count: (Integer)},
   {_id: 4, count: (Integer)},
   {_id: 3, count: (Integer)},
   {_id: 2, count: (Integer)},
   {_id: 1, count: (Integer)},
   {
      _id: 0, 
      reviews: [
         // array of reviews returned
      ]
   }
]
```

##### POST
- Creates and inserts new review.

#### META
- Runs an aggregation to get metadata about reviews.
- Used on products page and product detail page.
- Not sent as a prop from products to product detail page.
   - Expected behavior is direct navigation to product detail page.
   - Product detail page must be able to have this information on its own.
- Sample return value:
```
[
   {_id: (String), avg: (Float), count: (Integer)},
   // ... for each product id
]
```

##### TODO
- Images only used if already existing in Mongo
   - No logic exists to update 'images'
   - No front end capability to prompt upload of images
- Currently unused review fields:
   - country
   - useful
   - useless