import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //  lambda function definition
    const lambdaFunction = new lambda.Function(this, 'lambda-function', {
      runtime: lambda.Runtime.PYTHON_3_9,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: 'lambda_function.lambda_handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src/lambda-code/python-code')),
      environment: {
        REGION: cdk.Stack.of(this).region,
        AVAILABILITY_ZONES: JSON.stringify(
          cdk.Stack.of(this).availabilityZones,
        ),
      },
    });
 }
}