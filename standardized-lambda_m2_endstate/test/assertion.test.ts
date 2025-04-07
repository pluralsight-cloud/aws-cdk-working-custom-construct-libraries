import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Template } from 'aws-cdk-lib/assertions';
import { StandardizedLambda } from '../lib/index';

describe('StandardizedLambda Library Assertion Tests', () => {
  test('synthesizes a Lambda function with expected runtime and handler', () => {

    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'AssertStack');

    new StandardizedLambda(stack, 'TestLambda', {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline('exports.handler = async () => {};'),
    });

    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs22.x',
      Handler: 'index.handler',
    });    

    template.resourceCountIs('AWS::IAM::Role', 1);

  });  
});