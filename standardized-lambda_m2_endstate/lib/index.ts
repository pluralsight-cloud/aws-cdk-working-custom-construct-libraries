import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

const allowedRuntimes = [
  lambda.Runtime.NODEJS_22_X,
  lambda.Runtime.NODEJS_20_X,
  lambda.Runtime.PYTHON_3_13,
  lambda.Runtime.PYTHON_3_12
];

export interface StandardizedLambdaProps {
  runtime: lambda.Runtime;
  handler: string;
  code: lambda.Code;
  role?: iam.IRole;
  managedPolicies?: iam.IManagedPolicy[];
}

export class StandardizedLambda extends Construct {
  public readonly function: lambda.Function;

  constructor(scope: Construct, id: string, props: StandardizedLambdaProps) {
    super(scope, id);

    if (!allowedRuntimes.includes(props.runtime)) {
      throw new Error(`Invalid runtime. Allowed runtimes: ${allowedRuntimes.map(r => r.name).join(', ')}`);
    }    

    const role = props.role ?? new iam.Role(this, 'LambdaExecutionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        ...(props.managedPolicies || []), // User-defined policies
      ],
    });

    this.function = new lambda.Function(this, 'LambdaFunction', {
      runtime: props.runtime,
      handler: props.handler,
      code: props.code,
      role: role,
    });    

  }
}
