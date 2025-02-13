
# Literary Garden

An interactive web app that utilizes a flower garden plot, the Google Books API, and a review space to track and reflect on your yearly reading journey—your literary garden.

## Problem Statement
Tracking yearly reading progress can be boring and tedious. This web app allows users to create a personalized "literary garden” to track their reading journey by planting flower plots. Each plot will link to a book details page, where the Google Books API will be used to fill in details, and users can leave a star and text review. This app offers a fun, visual way to track reading progress and reflection while simplifying data entry.

## API Key
This app uses Google's Books API. Creating a [Google API key](https://console.cloud.google.com/apis) key is required to run this web app. After creating a key, enable the [Books API](https://console.cloud.google.com/marketplace/product/google/books.googleapis.com). Users will then need to create a [dotenv](https://www.npmjs.com/package/dotenv) file, and add an API key to the file: `API_KEY = 'stringOfYourGoogleAPIkey'`.

## Minimum Viable Product (MVP)
- Uses personalized garden plot visualization to track reading progress.
- Pulls details from Google Books API to minimize manual data entry and ensure accuracy.
- Allows for user input of comments and stars for ownership and reflection.

## User Stories

    As a user, I want to see a garden with a sign displaying the year and my name, so that I have a visual representation of my personal annual reading journey.

    As a user, I want to see a sprout lot when I mark a book as “started”, and a flower lot when I mark a book as “completed”, so I can track my reading progress.

    As a user, I want to click on a sprout or flower lot to pull up book details, so that I can mark my progress or leave a review.

    As a user, I want to see the book’s title, author, description, and genre pulled from the Google Books API, so that I don’t have to enter details manually.

    As a user, I want to leave a star rating and comments on a book’s detail page, so that I can reflect on and remember my thoughts.

## KanBan
[Link to Notion KanBan](https://poised-singer-cab.notion.site/1993d40b29328061863bcb43d3202dad?v=1993d40b2932808999c0000cc88184c6&pvs=4)

## WireFrame

![](https://file.notion.so/f/f/1c1f1302-e4ef-46ee-91ef-28fa5493fa2d/635addc3-8a8d-4f15-9fd2-25b96efc021b/1.png?table=block&id=1993d40b-2932-8011-9547-c95190c68d5f&spaceId=1c1f1302-e4ef-46ee-91ef-28fa5493fa2d&expirationTimestamp=1739512800000&signature=4SrkwBvocNZPCm6tfCkPBPJ2hkoOS73U5OCfWTpFXWo&downloadName=1.png)

![](https://file.notion.so/f/f/1c1f1302-e4ef-46ee-91ef-28fa5493fa2d/cbb507a6-27db-4f81-9eb1-2688db545599/2.png?table=block&id=1993d40b-2932-8030-bb10-d523d66c43cc&spaceId=1c1f1302-e4ef-46ee-91ef-28fa5493fa2d&expirationTimestamp=1739512800000&signature=9EOXccOrvaou10MIrfxzIT0tsUI_tMRqDwbBF9JlQD0&downloadName=2.png)

![](https://file.notion.so/f/f/1c1f1302-e4ef-46ee-91ef-28fa5493fa2d/04a7e7bf-019d-4b99-a129-bd5b6c636004/3.png?table=block&id=1993d40b-2932-8070-ba14-e9d37d2f7db6&spaceId=1c1f1302-e4ef-46ee-91ef-28fa5493fa2d&expirationTimestamp=1739512800000&signature=EeiQ0B4sCkVqOO-xosthgyBFRdcQBRtSlMkWISLeWPY&downloadName=3.png)

![](https://file.notion.so/f/f/1c1f1302-e4ef-46ee-91ef-28fa5493fa2d/c75eba5b-80c3-464e-8849-5ec54e047674/5.png?table=block&id=1993d40b-2932-8089-baa3-f41d96bd5ca6&spaceId=1c1f1302-e4ef-46ee-91ef-28fa5493fa2d&expirationTimestamp=1739512800000&signature=MbDVDKxS3IjlUqqFgJwWuM_h5dsbcrg94Aj0SgtQvO0&downloadName=5.png)