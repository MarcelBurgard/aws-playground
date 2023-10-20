"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaHandler = void 0;
const AWS = __importStar(require("aws-sdk"));
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const lambdaHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (event.httpMethod === 'POST') {
        // Handle the POST request, i.e., create a new entry
        return addEmployee(event);
    }
    else if (event.httpMethod === 'GET') {
        // Handle the GET request, i.e., retrieve entries
        return getEmployees(event);
    }
    // Send a default response for any other requests
    return {
        statusCode: 405,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Method Not Allowed',
    };
});
exports.lambdaHandler = lambdaHandler;
const addEmployee = (event) => __awaiter(void 0, void 0, void 0, function* () {
    // Your logic for adding an employee
    // You will parse the 'event.body' to get the employee details
    var _a;
    return {
        statusCode: 500,
        body: (_a = event === null || event === void 0 ? void 0 : event.body) !== null && _a !== void 0 ? _a : '',
    };
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
});
const getEmployees = (event) => __awaiter(void 0, void 0, void 0, function* () {
    // Your logic for retrieving employees
    // Example of retrieving all employees:
    const params = {
        TableName: 'Employees',
    };
    try {
        const data = yield dynamoDb.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ employees: data.Items }),
        };
    }
    catch (error) {
        // handle potential errors
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
});
