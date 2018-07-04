import { Callback, Context, SNSEvent, SNSEventRecord } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as delay from 'delay';

exports.handler = async (event: SNSEvent, context: Context, callback: Callback) => {
  const snsClient = new AWS.SNS();

  await delay(parseInt(process.env.DELAY_MS, 10));

  await Promise.all(event.Records.map((record: SNSEventRecord) => {
    return snsClient.publish({
      Message: record.Sns.Message,
      Subject: record.Sns.Subject,
      TopicArn: process.env.TOPIC_ARN
    }).promise();
  }));

  callback();
};
