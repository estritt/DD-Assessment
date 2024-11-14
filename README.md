# DD Assessment

This project consists of a set of image data presented in a table and a text input to query Gemini about said data. It was made as part of an application for DroneDeploy. 

## Installation

1. Clone the repo
2. Navigate to the backend
3. Set GEMINI_API_KEY to a (free) key you've acquired available at [here](https://aistudio.google.com/app/apikey)
4. Run `pipenv install` to get dependencies
5. Run `pipenv run flask run` to start the backend
6. In another terminal, go to the frontend directory and run `npm install` to get dependencies
7. Run `ng serve` to start the frontend, then navigate to http://localhost:4200/

## Notes

The table is sortable - just click a column header. Image data is stored in the backend since that seemed a little more realistic. There are some files and comments in the background having to do with mongoDB because I thought it would be fun to persist chats with Gemini there and access them from the UI. This would still be a very barebones feature without users being implemnted and making a whole app. I also intended to have Gemini respond in JSON with columns, rows, or cells that it might highlight based on the question, which would have involved more complicated state management. I ended up not having time for these, but I didn't want to get rid of them. 