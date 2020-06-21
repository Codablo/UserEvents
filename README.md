# UserEvents
RESTful Api for user management and user event logging.

# Dependencies
node v12.18.0
tsc v3.9.5

# Build
tsc 
node . 

# General Notes
This is my first time creating a RESTful Api using Node.  Also my first time really using TypeScipt.

* User validator object that can be injected in UserService
* Swagger or something similar for route documentation
* Auth middleware to handle auth of who you are.
* Authz middleware to handle authorization of what you are allowed access to.
* password should be hashed and salted. Preferable to use a well know library that is secure.
* Why are we even saving password and phone in an app about user event logging? 
* bigint used for dates. UTC in milliseconds which is best for internationalization (i18n) and is better for use between different tech stacks or 3rd parties.
* unit tests



