import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class NewCdkClusterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const lambdaFunction = new lambda.Function(this, 'lambda-function', {
      runtime: lambda.Runtime.PYTHON_3_9,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: 'lambda_function.lambda_handler',
      code: lambda.Code.fromAsset("bin/lambda-code"),
      environment: {
        REGION: cdk.Stack.of(this).region,
        AVAILABILITY_ZONES: JSON.stringify(
          cdk.Stack.of(this).availabilityZones,
        ),
      },
    });
  }
  
    /* Uncomment the next line if you know exactly what Account and Region you
     * want to deploy the stack to. */
    // env: { account: '123456789012', region: 'us-east-1' },
  
    /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
  

    // example resource
    // const queue = new sqs.Queue(this, 'NewCdkClusterQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }

