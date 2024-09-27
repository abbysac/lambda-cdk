import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { Tags } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class NewCdkClusterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  cdk.Tags.of(this).add('environment', 'dev'); 


       // Create a VPC
       const vpc = new ec2.Vpc(this, 'MyVpc', {
        maxAzs: 2, // Default is all AZs in the region
      });
  
      // Create a security group
      const securityGroup = new ec2.SecurityGroup(this, 'InstanceSecurityGroup', {
        vpc,
        allowAllOutbound: true,   // Allows all outbound traffic
      });
  
      // Allow SSH access
      securityGroup.addIngressRule(
        ec2.Peer.anyIpv4(), // Allows SSH access from anywhere
        ec2.Port.tcp(22),
        'Allow SSH access from anywhere'
      );
  
      // Create an EC2 instance
      new ec2.Instance(this, 'MyInstance', {
        vpc,
        instanceType: new ec2.InstanceType('t2.micro'), // Change as needed
        machineImage: ec2.MachineImage.latestAmazonLinux(), // Use the latest Amazon Linux AMI
        securityGroup,
      });
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

