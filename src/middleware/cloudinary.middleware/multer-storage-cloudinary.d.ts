// multer-storage-cloudinary.d.ts
declare module 'multer-storage-cloudinary' {
    import { Cloudinary } from 'cloudinary';
    import { StorageEngine } from 'multer';

    export interface CloudinaryStorageOptions {
        cloudinary: Cloudinary;
        params?: {
            folder?: string;
            format?: (req: any, file: any) => Promise<string> | string;
            public_id?: (req: any, file: any) => Promise<string> | string;
            [key: string]: any;
        };
    }

    export class CloudinaryStorage implements StorageEngine {
        constructor(options: CloudinaryStorageOptions);
        _handleFile(req: any, file: any, cb: (error: any, file?: any) => void): void;
        _removeFile(req: any, file: any, cb: (error: any) => void): void;
    }
}