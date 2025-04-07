import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Template } from 'aws-cdk-lib/assertions';
import { StandardizedLambda } from '../lib/index';

describe('StandardizedLambda Snapshot', () => {
  test('Matches snapshot with default role', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'SnapshotWithDefaultRole');

    new StandardizedLambda(stack, 'LambdaWithDefaultRole', {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline('exports.handler = async () => {};'),
    });

    const template = Template.fromStack(stack).toJSON();
    expect(template).toMatchSnapshot();
    

  });
});
