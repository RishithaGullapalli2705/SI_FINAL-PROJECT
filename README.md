# SI_FINAL-PROJECT

## Azure AI Language API - Sentiment Analysis

The sentiment analysis feature provides sentiment labels (such as "negative", "neutral" and "positive") based on the highest confidence score found by the service at a sentence and document-level. This feature also returns confidence scores between 0 and 1 for each document & sentences within it for positive, neutral, and negative sentiment.

Azure AI Language API provides sentiment analysis capabilities, allowing you to analyze text data and determine the sentiment expressed in it. This can be particularly useful for understanding the overall sentiment of customer reviews, social media posts, and other types of text data. This README file provides a guide on how to use the Sentiment Analysis API, obtain API keys, and integrate it into your applications.

**Note**: This SDK targets Azure Cognitive Service for Language API version 2023-04-01.

**ref**: https://learn.microsoft.com/en-us/azure/architecture/example-scenario/ai/nifi-sentiment-analysis-face-recognition

**ref**: https://learn.microsoft.com/en-us/azure/ai-services/language-service/sentiment-opinion-mining/how-to/call-api

https://learn.microsoft.com/en-us/javascript/api/overview/azure/ai-language-text-readme?view=azure-node-latest

## Getting Started
### Prerequisites

Before Using the Sentiment Analysis API, ensure the following:
•	Microsoft Azure subscription: Sign up to the Microsoft Azure portal, obtain the subscription key and endpoint from the portal.
•	Nodejs: Ensure you have nodejs installed to make API requests.

### API Key and Endpoint

•	Sign in to the [Azure AI Portal](https://azure.microsoft.com/en-us/products/ai-services/ai-language)

•	Navigate to the “AI + Machine Learning” section.

•	Create the appropriate resource for the language API.

•	Obtain the subscription key and endpoint.

## Service Capabilities

This service analyzes the sentiment of provided text data and categorizes it into positive, negative, or neutral sentiments.

## Development
### Environment And Libraries Used
### Sentiment Analysis:

•	Protocol used: HTTP

•	language: Node.js - Express.js

•	Libraries: @azure/ai-text-analytics

•	API Checker: Postman

## Functionality

The sentiment analysis service analyzes the sentiment of provided text data using Microsoft Azure Text Analytics API. It categorizes the sentiment into positive, negative, or neutral sentiments, providing valuable insights into the emotional tone of the text.

## Data Validation

Before sending a request to the Sentiment Analysis API, ensure that the data provided in the request body is properly formatted and meets the following criteria:

1.	**Request Body Format**: The request body must be in JSON format.
2.	**Document Structure**: The request body should contain an array of documents, where each document should have the 
      following fields:
  	
         •	language: The language of the text data. This should be a valid language code (e.g., "en" for English).
  	
         •	id: An identifier for the document. This can be any unique identifier.
  	
         •	text: The text data to be analyzed for sentiment. This should be a string of text.
  	
4.	**Language**: Ensure that the language specified for each document is supported by the Sentiment Analysis API. Refer to 
      the API documentation for a list of supported languages.
5.	**Text Length**: There may be limitations on the length of text that can be analyzed in a single request. Ensure that 
      the text data provided for analysis does not exceed any specified limits.
6.	**Character Encoding**: Text data should be encoded using UTF-8 or another compatible character encoding to ensure 
      proper handling of special characters and symbols.
7.	**Authentication**: If the API requires authentication, ensure that you provide the necessary authentication 
      credentials (e.g., API key) in the request headers.
8.	**Error Handling**: Implement error handling to gracefully handle any validation errors or exceptions that may occur 
      during the request processing.
  	
By validating the data before sending the request to the Sentiment Analysis API, you can ensure that the analysis is performed accurately and efficiently.

To validate the API, I used Postman.

I have verified by giving an empty string:






I have verified by giving the string:

![Screenshot 2024-05-01 194909](https://github.com/RishithaGullapalli2705/SI_FINAL-PROJECT/assets/143982076/f370b4fb-6191-4f36-a73c-5178dbad9bb1)

![Screenshot 2024-05-01 195029](https://github.com/RishithaGullapalli2705/SI_FINAL-PROJECT/assets/143982076/ef68eaed-1240-471c-ab9f-75f66df0c234)

![Screenshot 2024-05-01 195055](https://github.com/RishithaGullapalli2705/SI_FINAL-PROJECT/assets/143982076/90a46bd7-6fd5-4d9c-8577-0e1099e45d59)

![Screenshot 2024-05-01 195127](https://github.com/RishithaGullapalli2705/SI_FINAL-PROJECT/assets/143982076/4f96069d-1c01-46e9-a825-c50199ba954b)


## Try Out

To test and evaluate the functionality of the sentiment analysis API, it's hosted on the following Digital Ocean droplet server:

**Server Endpoint**
http://104.236.70.250:3000/

**API Endpoint**
http://104.236.70.250:3000/sentiment

### Sample Post Request Body
>application/json                                    Array of strings

```json
{ 
 "documents": [
    {
      "language": "en",
      "id": "1",
      "text": "I absolutely loved the new product. It exceeded my expectations!"
    },
    {
      "language": "en",
      "id": "2",
      "text": "The service was terrible. I won't be coming back again."
    }
```

## Document Error Handling

In the collection returned by an operation, errors are distinguished from successful responses by the presence of the error property, which contains the inner TextAnalysisError object if an error was encountered. For successful result objects, this property is always undefined.
For example, to filter out all errors, you could use the following filter:

const results = await client.analyze("SentimentAnalysis", documents);
const onlySuccessful = results.filter((result) => result.error === undefined);

**Note**: TypeScript users can benefit from better type-checking of result and error objects if compilerOptions.strictNullChecks is set to true in the tsconfig.json configuration. For example:

```json
const [result] = await client.analyze("SentimentAnalysis", ["Hello world!"]);

if (result.error !== undefined) {
  // In this if block, TypeScript will be sure that the type of `result` is
  // `TextAnalysisError` if compilerOptions.strictNullChecks is enabled in
  // the tsconfig.json

  console.log(result.error);
}
```

**Possible Responses**:

| Response Code | Description                               |
|---------------|-------------------------------------------|
| 200           | Sentiment analysis was successful         |
| 500           | Internal Server Error                     |


## Output:
The API analyzes the sentiment of the provided text and categorizes it into positive, negative, or neutral sentiments.

## Setup in Local
1.	Create an [Azure Language Service](https://azure.microsoft.com/en-us/products/ai-services/ai-language/#overview) and copy the Key and Endpoint.
2.	Set the Key and Endpoint as environment variables with the variable names LANGUAGE_KEY and LANGUAGE_ENDPOINT respectively.
3.	Ensure that you have Node.js installed. If not, download and install the latest version of Node.js.
4.	Clone the repository to your local machine.
5.	Open a terminal and navigate to the project's directory, then run the command npm install to install the required dependencies.
6.	To start the server locally, use the command nodemon app.js in the terminal.
7.	Test the server by accessing the following endpoint in your browser: http://localhost:3000/.
8.	To test the API, send a POST request to the following endpoint: http://104.236.70.250:3000/sentiment, with the corresponding post body and analyze the sentiment.

## Usage:
### Document Sentiment Analysis
### Testing Sentiment Analysis using Postman

To test the sentiment analysis functionality of the Sentiment Analysis API using Postman, follow the steps below:
1. **Open Postman**
If you don't have Postman installed, you can download it from here.
2. **Set Up Post Request**
   • Set the request method to ‘POST’.
   •	Enter the API endpoint URL for sentiment analysis provided: ‘http://104.236.70.250:3000/sentiment’.
   •	Set the request body to ‘application/json’.
3. **Add Request Body**
Add the request body containing the text data you want to analyze. The body should be in JSON format with an array of documents. Each document should contain the ‘language’, ‘id’, and ‘text’ fields.
4. **Send Request**
Click on the "Send" button to send the POST request to the API endpoint.
5. **Analyze Response**
     •	Upon successful analysis, you will receive a response with HTTP 
        status code 200.
     •	The response body will contain the sentiment analysis results for 
        each document in the same format as the request body, with an 
         additional sentiment field indicating the sentiment of the text (e.g., "positive", "negative", "neutral").
6. **Interpret Results**
Analyze the sentiment results returned in the response body to interpret the sentiment of the provided text data.

## Swagger Documentation
Document your API using Swagger for easy reference. Include information on how users can access the Swagger documentation.

### URL: Swagger Documentation

![Screenshot 2024-05-01 183601](https://github.com/RishithaGullapalli2705/SI_FINAL-PROJECT/assets/143982076/a362dc87-5bba-4982-947a-5b8213684119)


![Screenshot 2024-05-01 183642](https://github.com/RishithaGullapalli2705/SI_FINAL-PROJECT/assets/143982076/b2ca3d63-c26b-4b57-839e-b3bd1182cdae)


![Screenshot 2024-05-01 184425](https://github.com/RishithaGullapalli2705/SI_FINAL-PROJECT/assets/143982076/41d92fc8-0c8d-49cd-a0ad-12a723be0b63)


![Screenshot 2024-05-01 184607](https://github.com/RishithaGullapalli2705/SI_FINAL-PROJECT/assets/143982076/f7b228c6-844d-46e0-b71a-106f8bb8ed5a)


![Screenshot 2024-05-01 184654](https://github.com/RishithaGullapalli2705/SI_FINAL-PROJECT/assets/143982076/d7dd3c67-fe3d-4576-aa2c-dc2275d99748)


**Summary**
The Sentiment Analysis API allows users to analyze the sentiment of text data by categorizing it into positive, negative, or neutral sentiments. Accessed via the base URL http://example.com/sentiment, the API endpoint /analyze accepts POST requests with a JSON body containing the text to be analyzed. Upon successful analysis, the API returns a JSON response with the detected sentiment. Authentication is required, and rate limiting measures are implemented to ensure fair usage. An example request and response demonstrate the API's functionality, providing a straightforward solution for sentiment analysis needs. By following the steps outlined in this README, users can quickly get started, obtain keys, and integrate the Sentiment Analysis API into their applications. The provided Swagger documentation adds an extra layer of convenience for users to have reference and explore the API functionalities easily.




