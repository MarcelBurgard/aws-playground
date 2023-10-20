import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import { Handler } from "aws-lambda";

let response;

export const lambdaHandler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // const ret = await axios(url);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "hello world from tsx",
        // location: ret.data.trim()
      }),
    };
  } catch (err) {
    console.log(err);
    throw err;
  }

  return response;
};
