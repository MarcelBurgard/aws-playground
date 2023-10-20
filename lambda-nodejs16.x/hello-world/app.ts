import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { v4 } from 'uuid'; // Importing the UUID v4 function
import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const lambdaHandler: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod === 'POST') {
    // Handle the POST request, i.e., create a new entry
    return addEmployee(event);
  } else if (event.httpMethod === 'GET') {
    // Handle the GET request, i.e., retrieve entries
    return getEmployees(event);
  }

  // Send a default response for any other requests
  return {
    statusCode: 405,
    headers: { 'Content-Type': 'text/plain' },
    body: 'Method Not Allowed',
  };
};

const addEmployee = async (event: APIGatewayProxyEvent) => {
  // Your logic for adding an employee
  // You will parse the 'event.body' to get the employee details

  return {
    statusCode: 500,
    body: event?.body ?? '',
  }

  // // Example of adding an employee:
  // const requestBody = JSON.parse(event?.body ?? '');
  // const params = {
  //   TableName: 'Employees', // the name of your DynamoDB table
  //   Item: {
  //     employeeId: v4(), // Generating a new UUID for each employee
  //     // ... other employee details like name, role, etc.
  //     employeeName: requestBody.employeeName,
  //     // other attributes...
  //   },
  // };

  // try {
  //   await dynamoDb.put(params).promise();
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({ message: 'Employee added successfully' }),
  //   };
  // } catch (error) {
  //   // handle potential errors
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({ message: 'Internal Server Error' }),
  //   };
  // }
};

const getEmployees = async (event: APIGatewayProxyEvent) => {
  // Your logic for retrieving employees

  // Example of retrieving all employees:
  const params = {
    TableName: 'Employees',
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ employees: data.Items }),
    };
  } catch (error) {
    // handle potential errors
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
