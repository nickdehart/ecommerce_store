#### API's

- Client performs some basic form validation
- Client also disables submit buttons after use, must reload to re-submit
- Server runs mongo sanitize on all user inputs prior to insertion

##### CONTACT
- Inserts a single contact object into the contact collection
- Structure of contact object:
```
{
   'name': (String) name entered on contact page,
   'email': (String) email entered on contact page,
   'phone': (String) phone entered on contact page,
   'message': (String) message entered on contact page,
   'date': (Date) system generated
}
```

##### SUBSCRIBE
- Inserts a single subscribe object into the subscribe collection
- Structure of subscribe object:
```
{
   'email': email entered on contact page,
   'date': (Date) system generated
}
```

#### REVIEWS
- See README in review directory.

#### PAYPAL
- See README in paypal directory.