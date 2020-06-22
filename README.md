# UserEvents
RESTful Api for user management and user event logging.

# Dependencies
The following are the versions I had on my machine.  You might be able to use earlier versions
* node v12.18.0
* tsc v3.9.5

# Build
```
tsc 
```

# Run
You can use the following from the root directory
```
node .
```

# General Notes
This project had several first for me.  Some of my firsts included
* Node app
* RESTful Api using Node
* KOA webservice framework
* TypeScipt

# Improvements and Future Considerations
* Swagger or something similar for route documentation
* Auth middleware to handle auth of who you are.
* Authz middleware to handle authorization of what you are allowed access to.
* Password should be hashed and salted. Preferable to use a well know library that is secure.
* Why are we even saving password and phone in an app about user event logging? 
* UTC in milliseconds since epoch used for date, which is best for internationalization (i18n) and is better for use between different tech stacks or 3rd parties.
* Add unit tests.  I attempted to build this with dependency injection (DI) in mind.  I spent time learning KOA and typescript and so I didn't get around to adding unit tests.  I'd use the jest framework.
* User validator object that can be injected in UserService to mock
* I relied on my past coding with breaking up the backend into Controller, Service, Repository layers while working in C# and Java. I attempted to mimic that with my lack of TypeScript "best practices".  Typically I follow the conventions of the code base where I add code.
* I prefer detailed method names that allow the code to be readable. I assume that using TypeScript over JavaScript means you care about code readablity, maintainability and compile time error checking.
