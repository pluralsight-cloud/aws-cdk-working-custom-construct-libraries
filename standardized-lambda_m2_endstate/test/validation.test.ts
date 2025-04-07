import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { StandardizedLambda } from '../lib/index';

describe('Standardized Lambda Validation Tests', () => {
  test('throws an error for unsupported Lambda runtime', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'ValidationStack');

    expect(() =>
      new StandardizedLambda(stack, 'InvalidLambda', {
        runtime: lambda.Runtime.DOTNET_6, // Not allowed
        handler: 'index.handler',
        code: lambda.Code.fromInline('exports.handler = async () => {};'),
      })
    ).toThrow(/Invalid runtime/);

  });

  test('does not throw for allowed runtime', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'ValidationStack');
  
    expect(() =>
      new StandardizedLambda(stack, 'ValidLambda', {
        runtime: lambda.Runtime.PYTHON_3_13,
        handler: 'index.handler',
        code: lambda.Code.fromInline('exports.handler = async () => {};'),
      })
    ).not.toThrow();
  });  
  
});
