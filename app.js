process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { AzureKeyCredential, TextAnalyticsClient } = require("@azure/ai-text-analytics");
require("dotenv").config();

const app = express();
const port = 3000;

// Replace these values with your Azure API endpoint and key
const azureApiEndpoint = process.env.AZURE_API_ENDPOINT;
const apiKey = process.env.AZURE_API_KEY;

app.use(bodyParser.json());

// Endpoint for sentiment analysis
/**
 * @swagger
 * /sentiment:
 *   post:
 *     summary: Analyze sentiment of input text
 *     parameters:
 *       - in: body
 *         name: text
 *         required: true
 *         description: The text to be analyzed
 *         schema:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *               description: The text to be analyzed for sentiment
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               sentiment: "positive"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "An error occurred."
 */
app.post('/sentiment', async (req, res) => {
    try {
        console.log("== Sentiment Analysis API Endpoint ==");

        const client = new TextAnalyticsClient(azureApiEndpoint, new AzureKeyCredential(apiKey));
        const text = req.body.text;

        const sentimentResult = await client.analyzeSentiment([text]);
      //const sentiment = sentimentResult[0].sentiment;

        res.json({ sentimentResult });
    } catch (err) {
        console.error("An error occurred:", err);
        res.status(500).json({ error: err.message });
    }
});
// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'SENTIMENT ANALYSIS',
            version: '1.0.0',
            description: 'API',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: [__filename], // Assumes this file (app.js) contains your API routes
    paths: {
        '/sentiment': {
            post: {
                summary: 'Analyze sentiment of input text',
                parameters: [
                    {
                        in: 'body',
                        name: 'text',
                        description: 'The text to be analyzed',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                text: {
                                    type: 'string',
                                    description: 'The text to be analyzed for sentiment',
                                },
                            },
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                example: {
                                    sentiment: 'positive',
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Internal Server Error',
                        content: {
                            'application/json': {
                                example: {
                                    error: 'An error occurred.',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
