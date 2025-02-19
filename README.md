
# Literary Garden

An interactive web app that utilizes a flower garden plot, the Google Books API, and a review space to track and reflect on your yearly reading journey—your literary garden.

## Problem Statement
Tracking yearly reading progress can be boring and tedious. This web app allows users to create a personalized "literary garden” to track their reading journey by planting flower plots. Each plot will link to a book details page, where the Google Books API will be used to fill in details, and users can leave a star and text review. This app offers a fun, visual way to track reading progress and reflection while simplifying data entry.

## API Key
This app uses Google's Books API. Creating a [Google API key](https://console.cloud.google.com/apis) key is required to run this web app. After creating a key, enable the [Books API](https://console.cloud.google.com/marketplace/product/google/books.googleapis.com). Users will then need to create a [dotenv](https://www.npmjs.com/package/dotenv) file, and add an API key to the file: `API_KEY = 'stringOfYourGoogleAPIkey'`.

## Minimum Viable Product (MVP)
- Uses personalized garden plot visualization to track reading progress.
- Pulls details from Google Books API to minimize manual data entry and ensure accuracy.
- Allows for user input of stars for ownership and reflection.

## User Stories

    As a user, I want to see a garden with a sign displaying the year and my name, so that I have a visual representation of my personal annual reading journey.

    As a user, I want to see a sprout lot when I mark a book as “started”, and a flower lot when I mark a book as “completed”, so I can track my reading progress.

    As a user, I want to click on a sprout or flower lot to pull up book details, so that I can mark my progress or leave a review.

    As a user, I want to see the book’s title, author, description, and genre pulled from the Google Books API, so that I don’t have to enter details manually.

    As a user, I want to leave a star rating on a book’s detail page, so that I can reflect on and remember my thoughts.

## KanBan
[Link to Notion KanBan](https://poised-singer-cab.notion.site/1993d40b29328061863bcb43d3202dad?v=1993d40b2932808999c0000cc88184c6&pvs=4)

## WireFrame
[Link to Notion WireFrame](https://poised-singer-cab.notion.site/Wireframe-1993d40b293280f59906d175be1395a9?pvs=4)

## Audio License
[Link to Audio Source](https://freesound.org/people/mikemunkie/sounds/66878/)
click1.wav by mikemunkie -- [https://freesound.org/s/66878/](https://freesound.org/s/66878/) -- License: Creative Commons 0