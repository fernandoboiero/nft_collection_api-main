import AWS, {AWSError} from "aws-sdk"
import {ListBucketsOutput} from "aws-sdk/clients/s3"

abstract class ExternalStorageBucketBase {
    abstract init(): Promise<Boolean>

    abstract store(name: String, data: String): Promise<string>

}


export default class BucketManager implements ExternalStorageBucketBase {
    ID = 'AKIAXYYCK2GLAMLLOUK2';
    SECRET = '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';
    BUCKET_NAME = 'retia-mae-dev-nft';

    private bucket: any = new AWS.S3({
        region: 'us-east-1',
        accessKeyId: this.ID,
        secretAccessKey: this.SECRET
    });

    async init(): Promise<Boolean> {
        return await this.exists(this.BUCKET_NAME);
    }


    private async exists(name: String): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            this.bucket.listBuckets((err: AWSError, res: ListBucketsOutput) => {
                if (err) reject(err)
                let matches = res.Buckets?.filter((bucket: any) => bucket.Name === name)
                if (matches == null) reject(false)
                else resolve(matches.length > 0)
            })
        })

    }

    async store(name: string, file: string): Promise<string> {
        const base64Data = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        let uploadParams = {
            Bucket: this.BUCKET_NAME,
            Key: name,
            Body: base64Data,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: `image/png`
        };

        return new Promise((resolve, reject) => {
            this.bucket.upload(uploadParams, (err: AWSError, data: any) => {
                if (err) reject(err)
                resolve(data.Location)
            })
        })
    }

    async delete(name: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.bucket.deleteObject({
                Bucket: this.BUCKET_NAME,
                Key: name
            }, (err: AWSError, _: any) => {
                if (err) reject(err)
                resolve(true)
            })
        })
    }

}
